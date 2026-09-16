import { Button, Label } from "flowbite-react";
import { useState } from "react";
import NoCustomCollectionDataDisplay from "../../components/database/common/NoCustomCollectionDataDisplay";


export default function NoCustomCollectionData(){
    const [customCollectionDisplay, setCustomCollectionDisplay] = useState(false)

    // const handleClick = () => {
    //     if (customCollectionDisplay){
    //         setCustomCollectionDisplay(false)
    //     }else{
    //         console.log('ran click')
    //         setCustomCollectionDisplay(true)
    //     }
    // }

    return(
        <section>
            {/* <div>
                <Button onClick={() => handleClick()}>Custom Collections</Button>
            </div> */}
            <div>
                <NoCustomCollectionDataDisplay/>
                {/* {customCollectionDisplay ? <NoCustomCollectionDataDisplay/> : null} */}
            </div>

        </section>
    )
}