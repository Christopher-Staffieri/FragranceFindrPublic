
import { Button } from "flowbite-react"
import { useState, useEffect } from "react"
import { updateUserCollection } from "../../lib/allauth"
import { AnimatePresence, motion } from "framer-motion"
import { X, FileText, ChevronRight, Check } from "lucide-react"
import { cn } from "../../lib/utils"


export default function HasCollectionData({collectionData, perfumeId, user, refreshData, isCollectionOpen, setIsCollectionOpen}){
    console.log(collectionData)
    const [count, setCount] = useState(0)
    const [ownedStatus, setOwnedStatus] = useState(false)
    const [currentlyOwnStatus, setCurrentlyOwnStatus] = useState(false)
    const [wishStatus, setWishStatus] = useState(false)
    const [watchingStatus, setWatchingStatus] = useState(false)
    const [decantsStatus, setDecantsStatus] = useState(false)
    const [testedStatus, setTestedStatus] = useState(false)
    console.log(collectionData)
    const unpackedCollectionData = collectionData.data
    const [status, setStatus] = useState('')
    const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })
    useEffect(() => {
        for (const data in unpackedCollectionData){
            console.log(data)
            const collection = unpackedCollectionData[data][0]
            console.log(collection)
            if (collection.field === 'owned_before'){
                setOwnedStatus(true) 
            }else if (collection.field === 'currently_own'){
                setCurrentlyOwnStatus(true)
            }else if (collection.field === 'wish_list'){
                setWishStatus(true)
            }else if (collection.field === 'watching'){
                setWatchingStatus(true)
            }else if (collection.field === 'tested'){
                setTestedStatus(true)
            }else if (collection.field === 'decants'){
                setDecantsStatus(true)
            }
        }
    }, [])

    
    console.log(user)
    console.log(perfumeId)
    const updateCollection = ({field, field_status}) => {
        console.log(field_status)
        updateUserCollection({user:user.id, perfume:perfumeId.perfumeId, field:field, field_status:field_status}).then((resp) => {
            console.log(resp)
            if (resp.status === '200'){
                console.log(resp)
                refreshData(true)
                // setTitle(resp.title)
                // setReview(review.title)
                // setScentAssociations(review.scent_associations)
                // setStatus('200')
                // refreshData(true)
                
            }
        }).catch((e) => {
            console.error(e)
            window.alert(e)
          }).then(() => {
            setResponse((r) => { return { ...r, fetching: false } })
            
          })

    }

    const handleClick = (field) => {
        switch(field){
            case 'currently_own':
                console.log('ran currently own case')
                if (currentlyOwnStatus){
                    setCurrentlyOwnStatus(false)
                    updateCollection({field: field, field_status:false})
                }else{
                    setCurrentlyOwnStatus(true)
                    updateCollection({field: field, field_status:true})
                }
                break
            case 'owned_before':
                if (ownedStatus){
                    setOwnedStatus(false)
                    updateCollection({field: field, field_status:false})
                }else{
                    console.log('ran owned')
                    setOwnedStatus(true)
                    updateCollection({field: field, field_status:true})
                }
                
                break
            case 'wish_list':
                if (wishStatus){
                    setWishStatus(false)
                    updateCollection({field: field, field_status:false})
                }else{
                    setWishStatus(true)
                    updateCollection({field: field, field_status:true})
                }
                break
            case 'watching':
                if (watchingStatus){
                    setWatchingStatus(false)
                    updateCollection({field: field, field_status:false})
                }else{
                    setWatchingStatus(true)
                    updateCollection({field: field, field_status:true})
                }
                break
            case 'tested':
                if (testedStatus){
                    setTestedStatus(false)
                    updateCollection({field: field, field_status:false})
                }else{
                    setTestedStatus(true)
                    updateCollection({field: field, field_status:true})
                }
                break
            
            case 'decants':
                if (decantsStatus){
                    setDecantsStatus(false)
                    updateCollection({field: field, field_status:false})
                }else{
                    setDecantsStatus(true)
                    updateCollection({field: field, field_status:true})
                }
                break 
            
        }
    }

    return(
        <>
            {currentlyOwnStatus ? <Button className="bg-backgroundDark-600" onClick={() => handleClick('currently_own')}>Currently Own</Button> : <Button onClick={() => handleClick('currently_own')}>Currently Own</Button>}
                {ownedStatus ? <Button className="bg-backgroundDark-600" onClick={() => handleClick('owned_before')}>Owned</Button> : <Button onClick={() => handleClick('owned_before')}>Owned</Button>}
                {wishStatus ? <Button className="bg-backgroundDark-600" onClick={() => handleClick('wish_list')}>Wish List</Button> : <Button onClick={() => handleClick('wish_list')}>Wish List</Button>}
                {watchingStatus ? <Button className="bg-backgroundDark-600" onClick={() => handleClick('watching')}>Watch List</Button> : <Button onClick={() => handleClick('watching')}>Watching List</Button>}
                {testedStatus ? <Button className="bg-backgroundDark-600" onClick={() => handleClick('tested')}>Tested</Button> : <Button onClick={() => handleClick('tested')}>Tested</Button>}
                {decantsStatus ? <Button className="bg-backgroundDark-600" onClick={() => handleClick('decants')}>Decant</Button> : <Button onClick={() => handleClick('decants')}>Decant</Button>} */}

        </>
    )
}