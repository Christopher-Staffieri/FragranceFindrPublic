import { useState, useEffect } from "react";
import { updateUserPerfumeRating } from "../../../lib/allauth";
import { Tooltip } from "flowbite-react";

export default function StarRatingEdit({perfumeId, user, ratingData, categoryToRate}){
    const [rating, setRating] = useState(ratingData); // Selected rating
    const [hoverRating, setHoverRating] = useState(0); // Hovered rating
    const totalStars = 5
    const [status, setStatus] = useState()
    const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })
    const [ratingFormStatus, setRatingFormStatus] = useState(false)
    console.log(ratingData)
    console.log(categoryToRate)
    // console.log(user)
    // console.log(perfumeId.perfumeId)

    // useEffect(() => {
    //     setResponse((r) => { return { ...r, fetching: true } })
    //         checkUserPerfumeRating({perfume_id:perfumeId.perfumeId, user_id:user.profile}).then((resp) => {
    //         console.log(resp)
    //         if (resp.status === '200') {
    //             setStatus(resp.status)
    //         }
    //     }).catch((e) => {
    //         console.error(e)
    //         window.alert(e)
    //       }).then(() => {
    //         setResponse((r) => { return { ...r, fetching: false } })
    //       })
    // },[])

    // Change this to a put request
    // console.log({[categoryToRate]: rating})
    const postRating = (newRating) => {
        setResponse((r) => { return { ...r, fetching: true } })
        
        updateUserPerfumeRating({[categoryToRate]: newRating, perfume_id:perfumeId.perfumeId, user_id:user.id}).then((resp) => {
            console.log(resp)
            if (resp.status === '200') {
                setStatus(resp.status)
            }
        }).catch((e) => {
            console.error(e)
            window.alert(e)
          }).then(() => {
            setResponse((r) => { return { ...r, fetching: false } })
          })
    }

    const calculateFraction = (event,index) => {
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
        const { left, width } = event.target.getBoundingClientRect();
        const relativeX = event.clientX - left
        const fraction = relativeX / width
        // Without the multiplication the base value would be 1 which is fine for 5 stars but if the rating should goto 10 the base needs to be multiplied
        // This is so the count can be consitent and actually continue counting the way it should 
        // Now each star has a value of 2 incrementing by .50 instead of having a value of 1 
        if (fraction <= 0.25) return (index * 2) + .50;
        if (fraction <= 0.5) return (index * 2) + 1;
        if (fraction <= 0.75) return (index * 2) + 1.5;
        return (index * 2) + 2
    }

    const handleMouseMove = (event, index) => {
        const newRating = calculateFraction(event, index)
        setHoverRating(newRating)
        return (
            <div>
                <Tooltip content={newRating}></Tooltip>
            </div>
        )
    }

    const handleClick = (newRating) => {
        setRating(newRating)
        postRating(newRating)
    }

    const handleMouseLeave = () => {
        setHoverRating(0)
    }

    const renderStars = () => {
        return [...Array(totalStars)].map((_, index) => {
            const value = hoverRating || rating
            const fullValue = (index + 1) * 2
     
            let fill = 'empty'
           
            if (value >= fullValue){
                fill = 'full'
            }else if(value >= fullValue - 0.5){
                fill = 'three-quarters'
            }else if (value >= fullValue - 1){
                fill = 'half'
            }else if(value >= fullValue - 1.5){
                fill = 'quarter'
            }

            return (
                <section>
                    <Tooltip content={hoverRating} placement="bottom">
                    <div
                        key={index}
                        className={`star ${fill}`}
                        onMouseMove={(event) => handleMouseMove(event, index)}
                        onClick={() => handleClick(calculateFraction(event, index))}
                        onMouseLeave={handleMouseLeave}
                        
                        >
                        ★   
                    </div>
                    </Tooltip>
                </section>
                
            )
        })
    }

    return(
        <section>
            <div className='star-rating'>
                {renderStars()}
                <p>Selected Rating: {rating}</p>

            </div>
            

        </section>
    )
}
    

