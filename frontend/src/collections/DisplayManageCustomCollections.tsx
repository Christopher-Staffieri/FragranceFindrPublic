import { Button, Label } from "flowbite-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import CreateCustomCollection from "./CreateCustomCollection"
import EditCustomCollection from "./EditCustomCollection"
import DeleteCustomCollection from "./DeleteCustomCollection"


export default function DisplayManageCustomCollections({collectionData, userData, refreshData}){
    console.log(collectionData)
    console.log( userData)
    // const [addPerfume]
    const [addCollectionStatus, setAddCollectionStatus] = useState(false)
    const [collectionCount, setCollectionCount] = useState(0)
    // const handleClick = () => {
    //     if (addCollectionStatus){
    //         console.log('tesstt')
    //         setAddCollectionStatus(false)
    //     }else{
    //         setAddCollectionStatus(true) 
    //     }
    // }
    
    
    
    return (
        <section>

            <div>
  
                {/* {addCollectionStatus ? <CreateCustomCollection currentState={true}/> : null} */}
                {collectionData !== null ? <Label>Custom Collections:</Label> : <Label>Sorry we couldnt find any custom collections try adding one!</Label>}
                <ul>
                    {collectionData !== null ? (collectionData.map((collection) => {
                        // console.log(collection)
                        return(
                            // Will change this to display the name, the image, and the link to the perfumes page
                            <div>
                                <li key={collection.id}>
                                    <Label>{collection.collection_name}</Label>
                                     
                                </li>
                                <EditCustomCollection collectionData={collection} userData={userData} refreshData={refreshData}/>
                                <DeleteCustomCollection customCollection={collection} userData={userData} refreshData={refreshData}/>
                                
                            </div>
                        )
                        
                    })) : null}
                    
                   
                </ul>
                {collectionData !== null ? <CreateCustomCollection currentState={true} count={collectionData.length} refreshData={refreshData}/> : null }
                
            </div>

        </section>
    )
}