import { Label, Textarea, Button } from "flowbite-react"
import { useState } from "react"
import { postUserPerfumeStatement } from "../../lib/allauth"

export default function NoStatement({user, perfumeId, refreshData}){
    const [statement, setStatement] = useState(null)
    const [scentAssociations, setScentAssociations] = useState(['test', 'coolll'])
    const [status, setStatus] = useState('')
    const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })
    const handleSubmit = () => {
            console.log('ran post')
            // console.log(perfumeId.perfumeId)
            postUserPerfumeStatement({statement_perfume:perfumeId.perfumeId, posted_by:user.profile, statement:statement, scent_associations:scentAssociations}).then((resp) => {
                console.log(resp)
                if (resp.status === '200'){
                    // setUserReviewData(resp)
                    setStatus('200')
                    refreshData(true)
                    
                    
                }else{
                    // setUserReviewData(null)
                    console.log('ran else')
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
                <Textarea onChange={(statement) => setStatement(statement.target.value)}></Textarea>
            </div>

            <div>
                <Label>Scent Associations</Label>
                <Textarea onChange={(associations) => setScentAssociations(associations.target.value)}></Textarea>
            </div>

            <Button onClick={() => {handleSubmit()}}> Submit Statement</Button>

        </section>
        // <section>
        //     <div>
        //         <Label>Statement</Label>
        //         <Textarea onChange={(review) => setStatement(review.target.value)}></Textarea>
        //     </div>

        //     <div>
        //         <Label>Scent Associations</Label>
        //         <Textarea onChange={(associations) => setScentAssociations(associations.split(','))}></Textarea>
        //     </div>

        //     <Button onClick={() => {handleSubmit()}}> Submit review</Button>
        // </section>
    )
}