import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { NotFound } from "../../components/NotFound";
import { getPerfume } from "../../lib/allauth";
import PerfumeView from "./PerfumeView";
import LoadingPage from "../../components/common/loadingPage";

export default function PerfumeViewCheck(){
    const location = useLocation();
    const [status, setStatus] = useState('')
    const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })
    const [perfumeData, setPerfumeData] = useState()
    useEffect(() => {
       console.log(location.pathname.split('/')[3])
       console.log(location.pathname)
        setResponse((r) => { return { ...r, fetching: true } })
 
            getPerfume(location.pathname.split('/')[3]).then((resp) => {
                console.log(resp)
                setPerfumeData(resp)
                
                if (resp.error){
                    setStatus('204') 
                }else{
                    setStatus('200')
                }

            }).catch((e) => {
                console.error(e)
                window.alert(e)
              }).then(() => {
                setResponse((r) => { return { ...r, fetching: false } })
                
              })

      }, [])

    return(
        <section>
            {response.fetching
                ? <LoadingPage/>
                : (status === '200'
                    ? <PerfumeView perfumeData={perfumeData}/>
                    : <NotFound/>
                )
            }
           
        </section>
    )
}