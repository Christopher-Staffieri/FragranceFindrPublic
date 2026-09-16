import * as allauth from '../lib/allauth'
// import * as requests from '../lib/requests'
import { useUser } from '../auth'
import { useState, useEffect } from 'react'
import { NotFound } from '../components/NotFound'
import { Label } from 'flowbite-react'
import { TableDisplay } from './TableDisplay'
import { AuditorDisplay } from './AuditorDisplay'
// import { Tab } from '@mui/material'

function Loading () {
    return <div>Starting...</div>
  }

export default function ReviewResearch(){
    const [status, setStatus] = useState()
    const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })
    const user = useUser()

    useEffect(() => {
        setResponse((r) => { return { ...r, fetching: true } })
        allauth.isResearchAuditor(user.email).then((resp) => {
            // console.log(resp)
            if (resp.status === '200') {
                setStatus(resp.status)
            }
        }).catch((e) => {
            console.error(e)
            window.alert(e)
          }).then(() => {
            setResponse((r) => { return { ...r, fetching: false } })
          })
      }, [])

    return (
        <div>
            
            {response.fetching
                ? <Loading />
                : <TableDisplay auditorStatus={status}/>      
            }
        </div>
    )


   
}