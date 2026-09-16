import { useState } from "react"
import { deleteCustomCollection } from "../lib/allauth"
import { Button } from "flowbite-react"


export default function DeleteCustomCollection({userData, customCollection, refreshData}){

    const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })

    const handleDelete = () => {
        deleteCustomCollection({user:userData.id, collection_id:customCollection.id}).then((resp) => {
            console.log(resp)
            if (resp.success){
                console.log('got 200 on collection perfume delete')
                console.log(resp)
                refreshData(customCollection.id)
                // setTitle(resp.title)
                // setReview(review.title)
                // setScentAssociations(review.scent_associations)
                // setStatus('200')
                // refreshData(true)
                
            }
        })
    }

    return(
        <section>
            <div>
                <Button onClick={() => handleDelete()}>Delete</Button>
            </div>

        </section>
    )
}