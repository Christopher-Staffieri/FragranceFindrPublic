// Display for all revisions made at the top of the page Revised Data Table is to show all the revised data
import { useEffect, useState } from "react"
import * as allauth from '../lib/allauth'

export default function RevisionDisplay({originalData, revisedData, editedBy}){
    console.log(originalData)
    console.log(revisedData)
    console.log(editedBy)
   
    

    return(
        <>
            <div>{`${originalData} > ${revisedData}`}</div>
        </>
    )
}