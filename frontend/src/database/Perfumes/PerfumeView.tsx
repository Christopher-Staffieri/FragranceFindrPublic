import { Button } from "flowbite-react";
import { useState } from "react";
import PerfumeInfoView from "./PerfumeInfoView";
import { useUser } from "../../auth";
import Reviews from "./Reviews";
import PerfumeDetailView from "./PerfumeDetailView";

export default function PerfumeView(perfumeData){
    // const user = useUser()
    // console.log(user)
    const [navBarStatus, setNavBarStatus] = useState('Info')
    console.log(perfumeData)
    return(
        <section>
            {/* <Button.Group>
                <Button onClick={() => setNavBarStatus('Info')}>Info</Button>
                <Button onClick={() => setNavBarStatus('Inspiration')}>Inspiration</Button>
                <Button>Statements</Button>
                <Button>Reviews</Button>
                <Button>Photos</Button>
                <Button>Chart</Button>
            </Button.Group>
             */}
            
            <PerfumeDetailView perfumeData={perfumeData}/>
            {/* {navBarStatus === 'Info' ? <PerfumeDetailView perfumeData={perfumeData}/> : <div></div>} */}
            {/* {navBarStatus === 'Review_Perfume' ? <Reviews perfumeData={perfumeData}/> : <div></div>} */}

        </section>

        
    )
}