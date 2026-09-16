import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { getUserCustomCollections, getUserFromName } from "../lib/allauth"
import { useUser } from "../auth"
import { Label } from "flowbite-react"
import { NotFound } from "../components/NotFound"
import CustomCollectionDisplay from "../components/collections/CustomCollectionDisplay"
import DisplayManageCustomCollections from "./DisplayManageCustomCollections"

export default function ManageCustomCollections(){
    const location = useLocation()
    const user = useUser()
    const currentUser = location.pathname.split('/')[2]
    const [status, setStatus] = useState('')
    const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })
    const [viewedUserData, setViewedUserData] = useState(null)
    const [canViewStatus, setCanViewStatus] = useState(false)
    const [customCollectionData, setCustomCollectionData] = useState(null)
    const [effectControl, setEffectControl] = useState(false)
    console.log(currentUser)

    useEffect(() => {

        setResponse((r) => { return { ...r, fetching: true } })
            getUserFromName({username:currentUser}).then((resp) => {
                console.log(resp)
                if (resp.error){
                    setViewedUserData(null)
                    console.log('eror')
                }else{
                    if (resp.id === user.id){
                        setCanViewStatus(true)
                        console.log('can edit')
                    }else{
                        setCanViewStatus(false)
                    }
                    setViewedUserData(resp)
                    // setUserCollection(resp)
                    // setStatus('200')
                }
                

            }).catch((e) => {
                console.error(e)
                window.alert(e)
            }).then(() => {
                setResponse((r) => { return { ...r, fetching: false } })
                
            })
        
    },[location])

    useEffect(() => {
        if (viewedUserData){

            getUserCustomCollections({user:viewedUserData.id}).then((resp) => {
                console.log(resp)
                
                if (resp.error){
                    setCustomCollectionData(null)
                    console.log('eror')
                }else{
                    
                    setCustomCollectionData(resp)
                }
                
    
            }).catch((e) => {
                console.error(e)
                window.alert(e)
            }).then(() => {
                setResponse((r) => { return { ...r, fetching: false } })
                
            })
        }else{
            console.log('passed')
        }
        
        
    }, [viewedUserData, effectControl])

    const handleDataRefresh = (data) => {
        console.log('ran data refresh')
        setEffectControl(data)
    }

    return(
        <section>
            {response.fetching ? <Label>Loading</Label> : (canViewStatus ? <DisplayManageCustomCollections collectionData={customCollectionData} userData={viewedUserData} refreshData={handleDataRefresh}/> : <NotFound/>)}
        </section>
    )
}