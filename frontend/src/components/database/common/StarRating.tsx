import { useEffect, useState } from "react";
import './stars.css'
import { checkUserPerfumeRating, postUserPerfumeRating, updateUserPerfumeRating } from "../../../lib/allauth";
import { useUser } from "../../../auth";

export default function StarRating({perfumeId, user, ratedData, categoryToRate}){
    const [rating, setRating] = useState(0); // Selected rating
    const [hoverRating, setHoverRating] = useState(0); // Hovered rating
    const totalStars = 5
    const [status, setStatus] = useState()
    const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })
    const [ratingFormStatus, setRatingFormStatus] = useState(false)
    const [ratingDataStatus, setRatingDataStatus] = useState(false)
    const [ratingData, setRatingData] = useState(ratedData)
    console.log(ratedData)
    useEffect(() => {
        setRatingData(ratedData)
        if (ratingData !== null){
            setRating(ratedData)
            setRatingDataStatus(true)
            console.log('found rating data')
        }else if (ratedData !== null){
            setRating(ratedData)
            setRatingDataStatus(true) 
            console.log('found rating data')
        }else{
            setRating(0)
            setRatingDataStatus(false)
            console.log('didnt find rating data')
        }

    }, [ratedData])
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

    const postRating = (newRating) => {
        console.log('ran post')
        setResponse((r) => { return { ...r, fetching: true } })
        postUserPerfumeRating({[categoryToRate]: newRating, rated_perfume:perfumeId.perfumeId, rated_by:user.id}).then((resp) => {
            console.log(resp)
            if (resp.status === '200') {
                setStatus(resp.status)
                setRatingData(resp)
                setRatingDataStatus(true)
            }
        }).catch((e) => {
            console.error(e)
            window.alert(e)
          }).then(() => {
            setResponse((r) => { return { ...r, fetching: false } })
          })
    }

    const updateRating = (newRating) => {
        console.log('ran put')
        setResponse((r) => { return { ...r, fetching: true } })
        
        updateUserPerfumeRating({[categoryToRate]: newRating, perfume_id:perfumeId.perfumeId, user_id:user.id}).then((resp) => {
            console.log(resp)
            if (resp.status === '200') {
                console.log('rannnn')
                setStatus(resp.status)
                setRatingData(resp)
                setRatingDataStatus(true)
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
    }

    const handleClick = (newRating) => {
        setRating(newRating)
        if (ratingDataStatus){
            updateRating(newRating)
        }else{
            postRating(newRating)
        }
        
    }

    const handleMouseLeave = () => {
        setHoverRating(0)
    }

    const renderStars = () => {
        return [...Array(totalStars)].map((_, index) => {
            const value = hoverRating || rating
            const fullValue = (index + 1) * 2
            console.log(value)
            console.log(fullValue)
     
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
                <div
                    key={index}
                    className={`star ${fill}`}
                    onMouseMove={(event) => handleMouseMove(event, index)}
                    onClick={() => handleClick(calculateFraction(event, index))}
                    onMouseLeave={handleMouseLeave}
                    
                    >
                    ★   
                </div>
            )
        })
    }

    return(
        <section>
            <div className='star-rating'>
                {renderStars()}

            </div>
            <div>
                {rating != hoverRating && hoverRating != 0 ? <p>{Number(hoverRating).toFixed(2)}</p> : <p>{Number(rating).toFixed(2)}</p>}
            </div>
            

        </section>
    )
}