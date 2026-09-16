import { Button } from "flowbite-react";


export default function ProposalAuditorView({ handleClick }){

    return(
        // Need an edit button, 
        <section>
            <Button onClick={handleClick}> Confirm </Button>
        </section>
        
    )
}