import { useUser } from "../../auth"
import { checkUserPerfumeStatement } from "../../lib/allauth"
import { useState, useEffect } from "react"
import NoStatement from "./NoStatement"
import StatementAlreadyProposed from "./StatementAlreadyProposed"

export default function Statements(perfumeId){
    const user = useUser()
    const [status, setStatus] = useState('')
    const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })
    const [userStatementData, setUserStatementData] = useState(null)
    const [composedReview, setComposedReview] = useState('')
    const [reviewTitle, setReviewTitle] = useState('')
    const [scentAssociations, setScentAssociations] = useState(['test','cool'])
    const [control, setControl] = useState(false)
    console.log(user)
    useEffect(() => {
        console.log('ran effect')
        setResponse((r) => { return { ...r, fetching: true } })
            checkUserPerfumeStatement({statement_perfume:perfumeId.perfumeId, posted_by:user.profile}).then((resp) => {
                console.log(resp)
                if (resp.error){
                    setUserStatementData(null)
                }else{
                    setUserStatementData(resp)
                    setStatus('200')
                }
                

            }).catch((e) => {
                console.error(e)
                window.alert(e)
              }).then(() => {
                setResponse((r) => { return { ...r, fetching: false } })
                
              })

      }, [control])

      const handleDataRefresh = (data) => {
        console.log('ran refresh')
        setControl(data)
      }

    return(
        <section>
            {userStatementData === null ? <NoStatement user={user} perfumeId={perfumeId} refreshData={handleDataRefresh}/> : <StatementAlreadyProposed reviewData={userStatementData} refreshData={handleDataRefresh}/>}
        </section>
    )
}