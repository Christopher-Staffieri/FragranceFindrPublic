import { Label } from "flowbite-react"
import { Link } from "react-router-dom"
import AddFragranceToCollection from "./AddFragranceToCollection"
import DeleteFragranceFromCollection from "./DeleteFragranceFromCollection"


export default function CollectionsDisplay({currentCollectionData, currentCollection, editStatus, userData, refreshData}){


    return(
        <section>
            <div>
                {/* <Label>I have:</Label> */}
                {currentCollection === 'currently_own' ? <Label>I Own</Label>: null}
                {currentCollection === 'owned_before' ? <Label>I Owned</Label>: null}
                {currentCollection === 'wish_list' ? <Label>Wish List</Label>: null}
                {currentCollection === 'watching' ? <Label>Watching</Label>: null}
                {currentCollection === 'tested' ? <Label>Tested</Label>: null}
                {currentCollection === 'decants' ? <Label>Decants</Label>: null}
                {/* {currentCollection === 'custom' ? <Label>Decants</Label>: null} */}

                {editStatus ? <AddFragranceToCollection currentCollection={currentCollection} userData={userData} refreshData={refreshData} customCollection={null}/> : null}
                {/* {editStatus ? <DeleteFragranceFromCollection currentCollection={currentCollection} userData={userData} refreshData={refreshData}/> : null} */}
                
                <ul>
                    {currentCollectionData.map((fragrance) => {
                        return(
                            // Will change this to display the name, the image, and the link to the perfumes page
                            <div>
                                <li key={fragrance.id}>
                                    <Link to={`/database/perfumes/${fragrance.perfume}`}>{fragrance.perfume}</Link>
                                    {editStatus ? <DeleteFragranceFromCollection fragrance={fragrance} currentCollection={currentCollection} userData={userData} refreshData={refreshData}/> : null}
                                    
                                </li>
                                
                            </div>
                        )
                        
                    })}
                </ul>
            </div>
        </section>
    )
}