import { useState } from "react"
import { updateUserPerfumeStatement } from "../../lib/allauth"
import { Label, Textarea, Button } from "flowbite-react"

export default function StatementAlreadyProposed({reviewData, refreshData}){
    console.log(reviewData)
    const unpackedReviewData = reviewData[0]
    const [statement, setStatement] = useState(unpackedReviewData.statement)
    const [scentAssociations, setScentAssociations] = useState(unpackedReviewData.scent_associations)
    const [status, setStatus] = useState('')
    const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })

    
    // Might just have it so a user can enter a tag it will save clear the text box and they can continue to enter this way every time they hit enter or space it saves the tag 
                                                // to the list/array and allows the user to continue entering tags
    const handleSubmit = () => {
            // Need to add composedReview etc and have it set to the review data retrived in order to insure the put keeps the correct data if it isnt changed
            console.log('ran put')
            updateUserPerfumeStatement({statement_perfume:unpackedReviewData.statement_perfume.id, posted_by:unpackedReviewData.posted_by.id, statement:statement, scent_associations:scentAssociations}).then((resp) => {
                console.log(resp)
                if (resp.status === '200'){
                    console.log(resp)
                    setStatement(resp.statement)
                    setScentAssociations(resp.scent_associations)
                    setStatus('200')
                    refreshData(true)
                    
                }
            }).catch((e) => {
                console.error(e)
                window.alert(e)
              }).then(() => {
                setResponse((r) => { return { ...r, fetching: false } })
                
              })
 
      }

    return(

        <section>

            <div>
                <Label>Statement</Label>
                <Textarea placeholder={statement} onChange={(statement) => setStatement(statement.target.value)}></Textarea>
            </div>

            <div>
                <Label>Scent Associations</Label>
                <Textarea placeholder={scentAssociations} onChange={(associations) => setScentAssociations(associations.target.value)}></Textarea>
            </div>

            <Button onClick={() => {handleSubmit()}}> Submit statement</Button>

        </section>
        // <section>
        //     <div>
        //         <Label>Statement</Label>
        //         <Textarea placeholder={statement} onChange={(statement) => setStatement(statement.target.value)}></Textarea>
        //     </div>

        //     <div>
        //         <Label>Scent Associations</Label>
        //         <Textarea placeholder={scentAssociations} onChange={(associations) => setScentAssociations(associations.target.value)}></Textarea>
        //     </div>

        //     <Button onClick={() => {handleSubmit()}}> Submit Statement</Button>

        // </section>
    )
}