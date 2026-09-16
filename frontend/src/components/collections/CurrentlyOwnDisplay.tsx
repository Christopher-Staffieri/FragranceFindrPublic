import { Button, Label } from "flowbite-react";
import { Link } from "react-router-dom";
import AddFragranceToCollection from "./AddFragranceToCollection";


export default function CurrentlyOwnDisplay({currentlyOwnData, editStatus, userData, refreshData}){

    console.log(currentlyOwnData)
    console.log(editStatus)
    console.log(userData)
    return(
        <section>
            <div>
                <Label>I have:</Label>
                {editStatus ? <AddFragranceToCollection currentCollection={'currently_own'} userData={userData} refreshData={refreshData} customCollection={null}/> : null}
                
                <ul>
                    {currentlyOwnData.map((fragrance) => {
                        return(
                            // Will change this to display the name, the image, and the link to the perfumes page
                            <div>
                                <li key={fragrance.id}>
                                    <Link to={`/database/perfumes/${fragrance.perfume}`}>{fragrance.perfume}</Link>
                                </li>
                                
                            </div>
                        )
                        
                    })}
                </ul>
            </div>
        </section>
    )
}