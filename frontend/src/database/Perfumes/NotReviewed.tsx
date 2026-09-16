import { Label, Textarea, Button } from "flowbite-react"
import { postUserPerfumeReview } from "../../lib/allauth"
import { useState } from "react"

export default function NotReviewed({user, perfumeId, refreshData}){

    // Need to figure out how I am changing the view from this to already reviewed when a user succesfully posts a review
    const [title, setTitle] = useState(null)
    const [review, setReview] = useState(null)
    const [scentAssociations, setScentAssociations] = useState(['test', 'coolll'])
    const [status, setStatus] = useState('')
    const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })
    console.log(perfumeId.perfumeId)
    const handleSubmit = () => {
            console.log('ran post')
            // console.log(perfumeId.perfumeId)
            postUserPerfumeReview({reviewed_perfume:perfumeId.perfumeId, posted_by:user.profile, review:review, title:title, scent_associations:scentAssociations}).then((resp) => {
                console.log(resp)
                if (resp.status === '200'){
                    // setUserReviewData(resp)
                    setStatus('200')
                    refreshData(true)
                    
                    
                }else{
                    // setUserReviewData(null)
                    console.log('ran else')
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
                <Textarea onChange={(title) => setTitle(title.target.value)}></Textarea>
            </div>

            <div>
                <Label>Review</Label>
                <Textarea onChange={(review) => setReview(review.target.value)}></Textarea>
            </div>

            <div>
                <Label>Scent Associations</Label>
                <Textarea onChange={(associations) => setScentAssociations(associations.target.value)}></Textarea>
            </div>

            <Button onClick={() => {handleSubmit()}}> Submit review</Button>

        </section>
    )
}