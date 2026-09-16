import { useEffect, useState } from "react"
import { getFragranceReviews, updateReviewLikes } from "../../lib/allauth"
import { Button, Label } from "flowbite-react"
import { useUser } from "../../auth"
// updateReviewLikes

export default function DisplayReviews(perfume) {
    console.log(perfume)
    const [reviews, setReviews] = useState([])
    const currentUser = useUser()
    const [userLikedReview, setUserLikedReview] = useState(false)
    useEffect(() => {

        getFragranceReviews({perfume:perfume.perfume}).then((resp) => {
            console.log(resp)
            // Here the error is thrown when the perfume isnt in the users collection already
            if (resp.error){
                // Call the put request to add the perfume to the users collection with the selected field/category
                // user, perfume, field, field_status
               console.log('error')
            }else{
                setReviews(resp)
                console.log(resp)
                // Should prob refresh data here 
                // setCollectionCount(collectionCount + 1)
                // setChosenPerfume(null)
                // setUserCollection(resp)
                // setStatus('200')
            }
        })
    }, [])
    console.log(currentUser)
    const handleLikeClick = (review_posted_by, like_status) => {
        updateReviewLikes({review_posted_by:review_posted_by, perfume:perfume.perfume, liked_by:currentUser.profile, like_status:like_status}).then((resp) => {
            console.log(resp)
            // Here the error is thrown when the perfume isnt in the users collection already
            if (resp.error){
                // Call the put request to add the perfume to the users collection with the selected field/category
                // user, perfume, field, field_status
               console.log('error')
            }else{
                // setReviews(resp)
                console.log(resp)
                // Should prob refresh data here 
                // setCollectionCount(collectionCount + 1)
                // setChosenPerfume(null)
                // setUserCollection(resp)
                // setStatus('200')
            }
        })
    }

    return(
        <section>

            {reviews !== null ? (reviews.map((review) => {
                let likedStatus = false
                // console.log('user liked')
                if (currentUser !== null){
                    if (review.posted_by.id === currentUser.profile){
                        likedStatus = true
                    }else{
                        review.up_votes.map((test) => {
                            console.log(test)
                            if (test.id === currentUser.profile){
                                console.log('user Liked')
                                likedStatus = true
                            }
                            
                        })
                    }
                }
                
                
                return(
                    <div>

                        <Label>{review.review} </Label>
                        {currentUser === null ? null : (review.posted_by.id === currentUser.profile) ? null : (likedStatus) ? 
                                        <Button onClick={() => {
                                            handleLikeClick(review.posted_by.id, false)
                                        }}>Unlike Post</Button> 

                                    : 
                                        <Button onClick={() => {
                                            handleLikeClick(review.posted_by.id, true)
                                        }}>Like Post</Button>}
                        {/* {review.posted_by.id !== currentUser.profile 
                            ? <Button onClick={() => {
                                handleLikeClick(review.posted_by.id)
                            }}>Like Post</Button>
                            : (likedStatus ? <Button>Unlike</Button> : <Button>Like</Button>)} */}
                        <Label>Likes: {review.up_votes.length}</Label>
                    </div>
                    
                    
                )
            }))
            
            : null}

        </section>
    )
}