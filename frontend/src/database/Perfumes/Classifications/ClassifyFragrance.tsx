import { useEffect, useState } from "react"
import { getUserFragranceClassification } from "../../../lib/allauth"
import { useUser } from "../../../auth"
import { Label } from "flowbite-react"
// import UpdateUserFragranceClassification from "./UpdateUserFragranceClassification"
import FragranceClassification from "./FragranceClassification"



export default function ClassifyFragrance(perfumeId){
    console.log(perfumeId)
    const user = useUser()
    const [classificationStatus, setClassificationStatus] = useState(null)
    const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })
    const [classificationData, setClassificationData] = useState(null)
    const [loggedInStatus, setLoggedInStatus] = useState(false)
    console.log(user)
    useEffect(() => {
        if (user !== null){
            setLoggedInStatus(true)
            getUserFragranceClassification({user:user.profile, perfume:perfumeId.perfumeId}).then((resp) => {
                console.log(resp)
                if (!resp.error){
                    if (resp[0]){
                        setClassificationData(resp[0])
                        setClassificationStatus(true)
                    }else{
                        setClassificationData(resp)
                        setClassificationStatus(true)
                    }
                    console.log(resp)
                    
                    
                    // refreshData(true)
                    // setTitle(resp.title)
                    // setReview(review.title)
                    // setScentAssociations(review.scent_associations)
                    // setStatus('200')
                    // refreshData(true)
                    
                }else{
                    setLoggedInStatus(false)
                    setClassificationStatus(false)
                }
            }).catch((e) => {
                console.error(e)
                window.alert(e)
              }).then(() => {
                setResponse((r) => { return { ...r, fetching: false } })
                
              })
        }else{
            setClassificationStatus(false) 
        }
        
    }, [])

    // Need to add a check to see if logged in if not link to another page if the user clicks or have a login text link pop up
    return(
        <section>
            
            {
                response.fetching ? <Label>Loading...</Label> : (classificationStatus !== null ? (classificationStatus) ? 
                <FragranceClassification user={user} perfumeId={perfumeId} classificationData={classificationData} classificationStatus={classificationStatus}/>:
                <FragranceClassification user={user} perfumeId={perfumeId} classificationData={classificationData} classificationStatus={classificationStatus}/>:
                <Label> Loading</Label> 
            )}
        </section>
    )
}
