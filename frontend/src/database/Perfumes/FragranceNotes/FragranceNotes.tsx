import { Button } from "flowbite-react";
import ProposeNote from "./ProposeNote";


export default function FragranceNotes(perfumeId) {
    // auto complete component to show each fragrance note and then a link to a page to propose a new note or just a pop up that is then sent to moderation to approve it. 

    return(
        <section>
            
            <Button >
                Propose a new fragrance note. 
            </Button>
            <ProposeNote/>
        </section>
    )
}