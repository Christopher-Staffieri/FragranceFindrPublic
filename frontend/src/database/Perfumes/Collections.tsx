import { useState, useEffect } from "react"
import { checkForPerfumeInUserCollection, getUserCustomCollections } from "../../lib/allauth"
import { useUser } from "../../auth"
import HasCollectionData from "./HasCollectionData"
import NoCollectionData from "./NoCollectionData"
import { Button } from "flowbite-react"
import NoCustomCollectionData from "./NoCustomCollectionData"
import HasCustomCollectionsData from "./HasCustomCollectionsData"

export default function Collections({perfumeId, isCollectionOpen, setIsCollectionOpen}){
    const user = useUser()
   
    const [status, setStatus] = useState('')
    const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })
    const [userCollection, setUserCollection] = useState(null)
    const [customCollectionData, setCustomCollectionData] = useState(null)
    const [control, setControl] = useState(false)
    console.log(perfumeId)
    useEffect(() => {
        console.log('ran effect')
        setResponse((r) => { return { ...r, fetching: true } })
            checkForPerfumeInUserCollection({user:user.id, perfume:perfumeId.perfumeId, fields:['currently_own', 'owned_before', 'wish_list', 'watching', 'tested', 'decants']}).then((resp) => {
                console.log(resp)
                if (resp.error){
                    setUserCollection(null)
                }else{
                    setUserCollection(resp)
                    setStatus('200')
                }
                

            }).catch((e) => {
                console.error(e)
                window.alert(e)
              }).then(() => {
                setResponse((r) => { return { ...r, fetching: false } })
                
              })


              getUserCustomCollections({user:user.id, perfume:perfumeId.perfumeId}).then((resp) => {
                console.log(resp)
                if (resp.error){
                    setCustomCollectionData(null)
                    console.log('eror')
                }else{
                    setCustomCollectionData(resp)
                    // setUserCollection(resp)
                    // setStatus('200')
                }
                

            }).catch((e) => {
                console.error(e)
                window.alert(e)
              }).then(() => {
                setResponse((r) => { return { ...r, fetching: false } })
                
              })

      }, [control])

      console.log(customCollectionData)

      const handleDataRefresh = (data) => {
        console.log('ran refresh')
        setControl(data)
      }

    //   console.log(userCollection.data)

    return(
        <section>  
            {userCollection !== null || undefined ? <HasCollectionData collectionData={userCollection} perfumeId={perfumeId} user={user} refreshData={handleDataRefresh} isCollectionOpen={isCollectionOpen} setIsCollectionOpen={setIsCollectionOpen}/> : <NoCollectionData perfumeId={perfumeId} user={user} refreshData={handleDataRefresh}/>}
            {customCollectionData !== null ? <HasCustomCollectionsData collectionData={customCollectionData} perfumeId={perfumeId} user={user} refreshData={handleDataRefresh}/>: <NoCustomCollectionData/>}



        </section>
    )
}