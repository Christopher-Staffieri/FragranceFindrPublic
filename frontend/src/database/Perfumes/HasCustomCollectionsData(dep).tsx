import { Button } from "flowbite-react"
import { addFragranceToCustomCollection, removeFragranceFromCustomCollection, updateUserCustomCollection } from "../../lib/allauth"
import DeleteFragranceFromCustomCollection from "../../components/collections/DeleteFragranceFromCustomCollection"
import { useState } from "react"


export default function HasCustomCollectionsData({collectionData, perfumeId, user, refreshData}){
    console.log(collectionData)
    console.log(perfumeId)
    console.log(user)
    const [customCollectionState, setCustomCollectionState] = useState(false)

    const handleClick = (collectionId) => {
        addFragranceToCustomCollection({user: user.id, collection_id: collectionId, perfume: perfumeId.perfumeId}).then((resp) => {
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

    const handleCollectionButtonClick = () => {
        if (customCollectionState){
            setCustomCollectionState(false)
        }else{
            setCustomCollectionState(true)
        }
    }
    

    // return(
    //     <section>
         
    //         {customCollectionState ? 
                
    //             collectionData.map((collection) => {
    //                 console.log(collection)
    //                 for (var perfume in collection.perfumes){
    //                     console.log(perfume)
    //                     console.log(collection.perfumes[perfume].id)
    //                     if (collection.perfumes[perfume].id === perfumeId.perfumeId){
    //                         return(
    //                             <div>
    //                                 <Button className="bg-backgroundDark-600"> {collection.collection_name}</Button>
    //                                 <DeleteFragranceFromCustomCollection fragrance={perfumeId.perfumeId} customCollection={collection} userData={user} refreshData={refreshData}/>
    //                             </div>
                                
    //                         )
                            
    //                     }

    //                 }

    //                 return(
    //                     <div>
    //                         {}
    //                         <Button onClick={() => handleClick(collection.id)}>{collection.collection_name}</Button>
    //                     </div>
    //                 )
    //             })
    //         :
    //         null
    //         }
    //         {customCollectionState ? <Button onClick={() => handleCollectionButtonClick()}>Close Custom Collections</Button> : <Button onClick={() => handleCollectionButtonClick()}>Custom Collections</Button>}
        
           

    //     </section>
    // )
}