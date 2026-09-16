import { Button } from "flowbite-react";


export default function AddFragranceToCustomCollection(){

    const handleClick = () => {
        updateUserCustomCollection({user: userData.id, collection_id: collectionData.id, user_collection: collectionData.user_collection.id, collection_name:collectionName, collection_icon: collectionIcon, description:description}).then((resp) => {
            console.log(resp)
            // Here the error is thrown when the perfume isnt in the users collection already
            if (resp.error){
                // Call the put request to add the perfume to the users collection with the selected field/category
                // user, perfume, field, field_status
               console.log('error')
            }else{
                console.log(resp)
                // Should prob refresh data here 
                // setCollectionCount(collectionCount + 1)
                refreshData(true)
                // setChosenPerfume(null)
                // setUserCollection(resp)
                // setStatus('200')
            }
        })
    }

    return(
        <section>
            <Button>

            </Button>
        </section>
    )
}