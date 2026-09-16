import { useEffect, useState } from 'react'
import * as allauth from '../../../lib/allauth'

export default function ListSources(perfume){
    const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })
    const [sources, setSources] = useState('')
    // console.log(perfume.perfume.id)
    useEffect(() => {
        allauth.getSource(perfume.perfume.id).then((resp) => {
            console.log(resp)
            setSources(resp)
            // console.log(data)
            // setEditedData(resp)
            // getUserProfile(resp)
            // setConfirmationStatus(data.confirmed_by)
        }).catch((e) => {
            console.error(e)
            window.alert(e)
          }).then(() => {
            setResponse((r) => { return { ...r, fetching: false } })
            
          })

    }, [])

    

    return(
        <section>

        </section>
    )
}