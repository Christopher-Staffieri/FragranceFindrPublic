import { useEffect, useState } from "react"
import { useUser } from "../auth"
import { getUserCollections, getUserCustomCollections, getUserFromName } from "../lib/allauth"
import { useLocation } from "react-router-dom"
import { Button, Label } from "flowbite-react"
import CurrentlyOwnDisplay from "../components/collections/CurrentlyOwnDisplay"
import OwnedDisplay from "../components/collections/OwnedDisplay"
import WishListDisplay from "../components/collections/WishListDisplay"
import CustomCollectionDisplay from "../components/collections/CustomCollectionDisplay"
import CollectionsDisplay from "../components/collections/CollectionsDisplay"
// import { nav } from "framer-motion/m"
// import { col } from "framer-motion/client"


export default function ViewUserCollection(){
    const location = useLocation()
    const currentUser = location.pathname.split('/')[2]
    const user = useUser()
    const [customCollectionData, setCustomCollectionData] = useState(null)
    const [collectionData, setCollectionData] = useState(null)
    const [status, setStatus] = useState('')
    const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })
    const [viewedUserData, setViewedUserData] = useState(null)
    const [navStatus, setNavStatus] = useState('currently_own')
    const [editStatus, setEditStatus] = useState(false)
    const [effectControl, setEffectControl] = useState(false)

    console.log(location)
    console.log(location.pathname.split('/')[2])
    // currentlyOwnData={viewedUserData[0].currently_own}
    // console.log(viewedUserData[0].currently_own)
 

    useEffect(() => {

        setResponse((r) => { return { ...r, fetching: true } })
            getUserFromName({username:currentUser}).then((resp) => {
                console.log(resp)
                if (resp.error){
                    setViewedUserData(null)
                    console.log('eror')
                }else{
                    if(user !== null){
                        if (resp.id === user.id){
                            setEditStatus(true)
                            console.log('can edit')
                        }else{
                            console.log('cant edit')
                            setEditStatus(false)
                        }
                        
                    }
                    setEditStatus(false)
                    console.log('ran')
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
            getUserCollections({user:viewedUserData.id}).then((resp) => {
                console.log(resp)
                
                if (resp.error){
                    setCollectionData(null)
                    console.log('eror')
                }else{
                    
                    setCollectionData(resp)
                    // setUserCollection(resp)
                    // setStatus('200')
                }
                
    
            }).catch((e) => {
                console.error(e)
                window.alert(e)
            }).then(() => {
                setResponse((r) => { return { ...r, fetching: false } })
                
            })

            getUserCustomCollections({user:viewedUserData.id}).then((resp) => {
                console.log([resp])
                
                if (resp.error){
                    setCustomCollectionData(null)
                    console.log('eror')
                }else{
                    
                    setCustomCollectionData([resp])
                    // setUserCollection(resp)
                    // setStatus('200')
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
        
        
    }, [effectControl, viewedUserData])

    
    const handleDataRefresh = (data) => {
        console.log('ran data refresh')
        setEffectControl(data)
    }

    const handleClick = (status) => {
        setNavStatus(status)
    }

    console.log(viewedUserData)
    
    // console.log(collectionData[0].navStatus)
    if (collectionData !== null){
        console.log(collectionData[0][navStatus])
    }
    return (
        <section>
            <div>
                <Button.Group>
                    <Button onClick={() => handleClick('currently_own')}>I have</Button>
                    <Button onClick={() => handleClick('owned_before')}>I Had</Button>
                    <Button onClick={() => handleClick('wish_list')}>Wish List</Button>
                    <Button onClick={() => handleClick('watching')}>Watching</Button>
                    <Button onClick={() => handleClick('tested')}>Tested</Button>
                    <Button onClick={() => handleClick('decants')}>Decants</Button>
                    <Button onClick={() => handleClick('custom')}>Custom</Button>
                </Button.Group>
            </div>
            
            <div>
                {customCollectionData !== null && navStatus === 'custom' ? <CustomCollectionDisplay customCollectionData={customCollectionData} userData={viewedUserData} refreshData={handleDataRefresh} editStatus={editStatus}/> : null}
                {navStatus && collectionData !== null && navStatus !== 'custom' ? <CollectionsDisplay currentCollectionData={collectionData[0][navStatus]} currentCollection={navStatus} editStatus={editStatus} userData={viewedUserData} refreshData={handleDataRefresh}/> : null}
                {/* {navStatus === 'currently_own' && collectionData !== undefined && collectionData !== null ? <CurrentlyOwnDisplay currentlyOwnData={collectionData[0].currently_own} editStatus={editStatus} userData={viewedUserData} refreshData={handleDataRefresh}/> : null}
                {navStatus === 'owned_before' && collectionData !== undefined && collectionData !== null ? <OwnedDisplay ownedData={collectionData[0].owned_before} editStatus={editStatus} userData={viewedUserData} refreshData={handleDataRefresh}/> : null}
                {navStatus === 'wish_list' && collectionData !== undefined && collectionData !== null ? <WishListDisplay wishData={collectionData[0].wish_list} editStatus={editStatus} userData={viewedUserData} refreshData={handleDataRefresh}/> : null}
                {collectionData !== undefined && collectionData !== null ? <Label>{collectionData[0].navStatus}</Label> : null} */}
                
            </div>
            
        </section>
    )
}