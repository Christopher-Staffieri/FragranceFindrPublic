import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { getUserPerfumeReview, postUserPerfumeReview, updateUserPerfumeReview } from "../../lib/allauth";
import { useUser } from "../../auth";
import AlreadyReviwed from "./AlreadyReviewed";
import NotReviewed from "./NotReviewed";

export default function Reviews(perfumeId){
    const user = useUser()
    const [status, setStatus] = useState('')
    const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })
    const [userReviewData, setUserReviewData] = useState(null)
    const [composedReview, setComposedReview] = useState('')
    const [reviewTitle, setReviewTitle] = useState('')
    const [scentAssociations, setScentAssociations] = useState(['test','cool'])
    const [control, setControl] = useState(false)
    console.log(user)
    console.log(perfumeId.perfumeId)
    console.log(userReviewData)
    useEffect(() => {
        console.log('ran effect')
        setResponse((r) => { return { ...r, fetching: true } })
            getUserPerfumeReview({reviewed_perfume:perfumeId.perfumeId, posted_by:user.profile}).then((resp) => {
                console.log(resp)
                if (resp.error){
                    setUserReviewData(null)
                }else{
                    setUserReviewData(resp)
                    setStatus('200')
                }
                

            }).catch((e) => {
                console.error(e)
                window.alert(e)
              }).then(() => {
                setResponse((r) => { return { ...r, fetching: false } })
                
              })

      }, [control])

      const handleDataRefresh = (data) => {
        console.log('ran refresh')
        setControl(data)
      }

    //   const handleSubmit = () => {
    //     if (userReviewData === null){
    //         // Use poat request
    //         console.log('ran post')
    //         console.log(perfumeId.perfumeId)
    //         postUserPerfumeReview({reviewed_perfume:perfumeId.perfumeId, posted_by:user.profile, review:composedReview, title:reviewTitle, scent_associations:scentAssociations}).then((resp) => {
    //             console.log(resp)
    //             if (resp.status === '200'){
    //                 setUserReviewData(resp)
    //                 setStatus('200')
                    
    //             }else{
    //                 setUserReviewData(null)
    //             }
    //         }).catch((e) => {
    //             console.error(e)
    //             window.alert(e)
    //           }).then(() => {
    //             setResponse((r) => { return { ...r, fetching: false } })
                
    //           })
    //     }else{
    //         // Need to add composedReview etc and have it set to the review data retrived in order to insure the put keeps the correct data if it isnt changed
    //         console.log('ran put')
    //         updateUserPerfumeReview({reviewed_perfume:perfumeId.perfumeId, posted_by:user.profile}).then((resp) => {
    //             console.log(resp)
    //             if (resp.status === '200'){
    //                 setUserReviewData(resp)
    //                 setStatus('200')
                    
    //             }else{
    //                 setUserReviewData(null)
    //             }
    //         }).catch((e) => {
    //             console.error(e)
    //             window.alert(e)
    //           }).then(() => {
    //             setResponse((r) => { return { ...r, fetching: false } })
                
    //           })
    //         // use put request
    //     }
    //   }

    // const submitReview = () => {

    // }

    return(
        <section>
            <div> 
                {/* Fill the : with the review data if it is found and only allow editing not posting a new one/ put instead of post */}
                {userReviewData === null ? <NotReviewed user={user} perfumeId={perfumeId} refreshData={handleDataRefresh}/> : <AlreadyReviwed reviewData={userReviewData} refreshData={handleDataRefresh}/>}
                {/* <Label>Title</Label>
                {userReviewData === null ? <TextInput onChange={(title) => setReviewTitle(title.target.value)}/> : <TextInput onChange={(title) => setReviewTitle(title.target.value)}/>}
                <Label>Review</Label>
                {userReviewData === null ? <Textarea onChange={(review) => setComposedReview(review.target.value)}></Textarea> : <Textarea onChange={(review) => setComposedReview(review.target.value)}></Textarea>} */}
                {/* <Textarea></Textarea> */}

                {/* <Textarea></Textarea> */}

                {/* <Button onClick={() => {handleSubmit()}}> Submit review</Button> */}
            </div>
            
        </section>
    )
}