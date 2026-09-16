import { Label, Button } from "flowbite-react"
import { getUserCustomCollections } from "../../lib/allauth"
import { Link } from "react-router-dom"
import AddFragranceToCollection from "./AddFragranceToCollection"
import DeleteFragranceFromCustomCollection from "./DeleteFragranceFromCustomCollection"


export default function CustomCollectionDisplay({customCollectionData, userData, editStatus, refreshData}){

    console.log(customCollectionData)
    return(
        <section>
            <div>
                {customCollectionData !== null ? <Label>Custom Collections:</Label> : null}
                
               
                {/* {customCollectionData !== null ? (editStatus ? <Button>Add perfume to collection</Button> : null) : null} */}
                {/* {editStatus ? <AddFragranceToCollection currentCollection={'custom'} userData={userData} refreshData={refreshData}/> : null} */}
                
                <ul>
                    {customCollectionData !== null ? (customCollectionData[0].map((customCollection) => {
                        console.log(customCollection)
                        console.log(customCollection.perfumes.length)
                        return(
                            // Will change this to display the name, the image, and the link to the perfumes page
                            
                            <div>
                                <li key={customCollection.id}>
                                    <Label>{customCollection.collection_name}</Label>
                                    {/* <Link to={`/database/perfumes/${fragrance.perfume}`}>{fragrance.perfume}</Link> */}
                                </li>
                                
                                {editStatus ? <AddFragranceToCollection currentCollection={'custom'} userData={userData} refreshData={refreshData} customCollection={customCollection}/> : null}
                                {customCollection.perfumes.length !== 0 ? (customCollection.perfumes.map((fragrance) => {
                                    // console.log(fragrance)
                                    // console.log(fragrance)
                                    return(
                                        <div>
                                            <li key={fragrance.id}>
                                                <Label>
                                                    {fragrance.perfume}
                                                </Label>
                                            </li>
                                            {editStatus ? <DeleteFragranceFromCustomCollection fragrance={fragrance.id} customCollection={customCollection} userData={userData} refreshData={refreshData}/> : null}
                                            
                                        </div>
                                    )
                                    
                                })) : <Label>Sorry, we couldnt find any perfumes in this collection.</Label>}
                            </div>
                            
                        )
                        
                        
                    })) : null}
                    
                    {/* {customCollectionData.map((fragrance) => {
                        return(
                            // Will change this to display the name, the image, and the link to the perfumes page
                            <div>
                                <li key={fragrance.id}>
                                    <Link to={`/database/perfumes/${fragrance.perfume}`}>{fragrance.perfume}</Link>
                                </li>
                                
                            </div>
                        )
                        
                    })} */}
                </ul>
            </div>
        </section>
    )
}