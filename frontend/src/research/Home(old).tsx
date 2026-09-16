import { Button, Flowbite } from "flowbite-react"
import ResearchHeader from "./Header"
// import { ProposeResearchModal } from "../components/research/ProposeResearch";
import ReviewResearch from "./ReviewResearch";
import ProposeResearch from "../components/research/ProposeResearch";


export default function ResearchHome(){
    return(
        <section>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
                
                <ResearchHeader/>
                

                {/* <div className="grid col-span-1 h-auto gap-0 rounded-xl shadow p-3 dark:bg-text  scale-x-90 scale-y-75 opacity-50 ">
                    {/* <Button href="/research/propose" color='primary' className="absolute bottom-0 opacity-90 ">Propose Perfums</Button> */}
                    <ProposeResearch />
                    {/* <ProposeResearchModal/> */}
                {/* </div > */} 
                
                <div className=" col-span-2 gap-0 rounded-xl shadow ">
                    <ReviewResearch/>
                </div>
                {/* <ResearchHeader/> */}
                
                
           
          
            </div>
        </section>
    )
}

// gap-16 px-4 py-8 lg:grid lg:grid-cols-2 lg:px-6 lg:py-16

// div className="grid gap-6 sm:grid-cols-2">
//               <div className="grid grid-cols-1 gap-2"></div>