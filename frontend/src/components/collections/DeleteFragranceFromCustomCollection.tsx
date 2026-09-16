import { Button } from "flowbite-react"
import { removeFragranceFromCustomCollection } from "../../lib/allauth"
import { useState } from "react"


export default function DeleteFragranceFromCustomCollection({fragrance, customCollection, userData, refreshData}){

    const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })
    // const [chosenPerfumeStatus, setChosenPerfumeStatus] = useState(false)
    console.log(fragrance)
    console.log(customCollection)

    const handleDelete = () => {
        removeFragranceFromCustomCollection({user:userData.id, perfume:fragrance, collection_id:customCollection.id}).then((resp) => {
            console.log(resp)
            if (resp.status === '200'){
                console.log('got 200 on collection perfume delete')
                console.log(resp)
                refreshData(fragrance.id)
                // setTitle(resp.title)
                // setReview(review.title)
                // setScentAssociations(review.scent_associations)
                // setStatus('200')
                // refreshData(true)
                
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
                <Button onClick={() => handleDelete()}> Remove fragrance</Button>
            </div>
        </section>
    )
}