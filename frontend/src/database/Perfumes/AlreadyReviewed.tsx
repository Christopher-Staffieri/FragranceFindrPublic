import { Button, Label, Textarea } from "flowbite-react"
import { useState } from "react"
import { updateUserPerfumeReview } from "../../lib/allauth"

export default function AlreadyReviwed({reviewData, refreshData}){
    console.log(reviewData)
    const unpackedReviewData = reviewData[0]
    // if (reviewData.reviewData !== null || undefined){
    //     setUnpackedReviewData(reviewData.reviewData)
        
    // }else{
    //     setUnpackedReviewData(reviewData.reviewData[0])
    // }
    
    // console.log(unpackedReviewData.posted_by.id)
    const [title, setTitle] = useState(unpackedReviewData.title)
    const [review, setReview] = useState(unpackedReviewData.review)
    const [scentAssociations, setScentAssociations] = useState(unpackedReviewData.scent_associations)
    const [status, setStatus] = useState('')
    const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })
    console.log(unpackedReviewData.reviewed_perfume.id)
    console.log(unpackedReviewData.posted_by.id)

    // Might just have it so a user can enter a tag it will save clear the text box and they can continue to enter this way every time they hit enter or space it saves the tag 
                                                // to the list/array and allows the user to continue entering tags
    const handleSubmit = () => {
            // Need to add composedReview etc and have it set to the review data retrived in order to insure the put keeps the correct data if it isnt changed
            console.log('ran put')
            
            updateUserPerfumeReview({reviewed_perfume: unpackedReviewData.reviewed_perfume.id, posted_by: unpackedReviewData.posted_by.id, title:title, review:review, scent_associations:scentAssociations}).then((resp) => {
                console.log(resp)
                if (resp.status === '200'){
                    console.log(resp)
                    setTitle(resp.title)
                    setReview(review.title)
                    setScentAssociations(review.scent_associations)
                    setStatus('200')
                    refreshData(true)
                    
                }
            }).catch((e) => {
                console.error(e)
                window.alert(e)
              }).then(() => {
                setResponse((r) => { return { ...r, fetching: false } })
                
              })
 
      }

    return(
        <section>

            <div>
                <Label>Title</Label>
                <Textarea placeholder={title} onChange={(title) => setTitle(title.target.value)}></Textarea>
            </div>

            <div>
                <Label>Review</Label>
                <Textarea placeholder={review} onChange={(review) => setReview(review.target.value)}></Textarea>
            </div>

            <div>
                <Label>Scent Associations</Label>
                <Textarea placeholder={scentAssociations} onChange={(associations) => setScentAssociations(associations.target.value)}></Textarea>
            </div>

            <Button onClick={() => {handleSubmit()}}> Submit review</Button>

        </section>
    )
}