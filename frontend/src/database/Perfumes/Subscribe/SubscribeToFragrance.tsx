import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useAuthStatus, useUser } from "../../../auth";
import { useAuthInfo } from "../../../auth/hooks";
import { checkUserPerfumeSubscriptions, subscribeToFragrance, unSubscribeFromFragrance } from "../../../lib/allauth";


export default function SubscribeToFragrance(perfumeId) {
    const userAuthStatus = useAuthInfo()
    const user = useUser()
    console.log(user)
    const [reviewStatus, setReviewStatus] = useState(false)
    const [statementStatus, setStatementStatus] = useState(false)
    const [photoStatus, setPhotoStatus] = useState(false)
    
    useEffect(() => {
        if (userAuthStatus.isAuthenticated){
            console.log('logged in')
            checkUserPerfumeSubscriptions({user: user.profile, subscription_type: ['reviews', 'statements', 'photos'], perfume_id: perfumeId.perfumeId}).then((resp) => {
                console.log(resp)
                // Here the error is thrown when the perfume isnt in the users collection already
                if (resp.error){
                    // Call the put request to add the perfume to the users collection with the selected field/category
                    // user, perfume, field, field_status
                   console.log('error')
                }else{
                    console.log(resp[0].reviews)
                    setReviewStatus(resp[0].reviews)
                    setStatementStatus(resp[1].statements)
                    setPhotoStatus(resp[2].photos)
                    console.log(resp)
                    // Should prob refresh data here 
                    // setCollectionCount(collectionCount + 1)
                    // refreshData(true)
                    // setChosenPerfume(null)
                    // setUserCollection(resp)
                    // setStatus('200')
                }
            })
        }
        // if (user.isAu)
    }, [])

    const handleSubscription = (type) =>  {
        if (userAuthStatus.isAuthenticated){
            console.log('logged in')
            subscribeToFragrance({user: user.profile, perfume_id: perfumeId.perfumeId, subscription_type: type}).then((resp) => {
                console.log(resp)
                setReviewStatus(true)
            })
        }
    }
    
    // console.log(user)
    // console.log()
    return(
        <section>
            <div>
                {userAuthStatus.isAuthenticated ?
                    <div>
                        {reviewStatus
                            ? <Button className="bg-backgroundDark-900" onClick={() => handleUnsub('reviews')}>Reviews</Button>
                            : <Button onClick={() => handleSubscription('reviews')}>Reviews</Button>
                        }
                        <Button>Statements</Button>
                        <Button>Photos</Button>
                    </div> 
                
                : null}
            </div>
        </section>
    )
}