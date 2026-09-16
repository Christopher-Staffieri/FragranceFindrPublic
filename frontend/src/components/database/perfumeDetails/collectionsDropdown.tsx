import { AnimatePresence, motion } from "framer-motion";
import { X, FileText, ChevronRight, Check } from "lucide-react";
import { cn } from "../../../lib/utils";
import { useState, useEffect } from "react";
import { useUser } from "../../../auth";
import HasCollectionData from "../../../database/Perfumes/HasCollectionData";
import HasCustomCollectionsData from "../../../database/Perfumes/HasCustomCollectionsData";
import NoCollectionData from "../../../database/Perfumes/NoCollectionData";
import NoCustomCollectionData from "../../../database/Perfumes/NoCustomCollectionData";
import { addFragranceToCustomCollection, checkForPerfumeInUserCollection, getUserCustomCollections, removeFragranceFromCustomCollection, updateUserCollection } from "../../../lib/allauth";
import { useAuthInfo } from "../../../auth/hooks";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../common/loadingSpinner";


export default function CollectionsDropdown({perfume, isCollectionOpen, setIsCollectionOpen}){
    const user = useUser()
    const authStatus = useAuthInfo()
    console.log(authStatus)
       
    const [status, setStatus] = useState('')
    const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })
    const [visibleCount, setVisibleCount] = useState(5)
    const [ownedStatus, setOwnedStatus] = useState(false)
    const [currentlyOwnStatus, setCurrentlyOwnStatus] = useState(false)
    const [wishStatus, setWishStatus] = useState(false)
    const [watchingStatus, setWatchingStatus] = useState(false)
    const [decantsStatus, setDecantsStatus] = useState(false)
    const [testedStatus, setTestedStatus] = useState(false)
    const [userCollection, setUserCollection] = useState(null)
    const [customCollectionData, setCustomCollectionData] = useState(null)
    const [collectionControl, setCollectionControl] = useState(false)
    const [customCollectionControl, setCustomCollectionControl] = useState(false)
    const [isCollectionDataLoading, setIsCollectionDataLoading] = useState({ fetching: false, content: { status: 200, data: [] } })
    const [isCustomCollectionDataLoading, setIsCustomCollectionDataLoading] = useState({ fetching: false, content: { status: 200, data: [] } })
    // const unpackedCollectionData = collectionData.data
    console.log(perfume.perfume.id)
    
    
    useEffect(() => {
        if (authStatus.isAuthenticated){
            console.log('ran effect')
            setIsCollectionDataLoading((r) => { return { ...r, fetching: true } })
            checkForPerfumeInUserCollection({user:user.id, perfume:perfume.perfume.id, fields:['currently_own', 'owned_before', 'wish_list', 'watching', 'tested', 'decants']}).then((resp) => {
                console.log(resp)
                if (resp.error){
                    setUserCollection(null)
                }else{
                    setUserCollection(resp)
                    setStatus('200')
                }
                

            }).catch((e) => {
                console.error(e)
                // window.alert(e)
              }).then(() => {
                setIsCollectionDataLoading((r) => { return { ...r, fetching: false } })
                
              })

              
        }else{
            setUserCollection(null)
        }
        
      }, [collectionControl])

      useEffect(() => {
        if (authStatus.isAuthenticated){
            setIsCustomCollectionDataLoading((r) => { return { ...r, fetching: true } })
              getUserCustomCollections({user:user.id, perfume:perfume.perfume.id}).then((resp) => {
                console.log(resp)
                if (resp.error){
                    setCustomCollectionData(null)
                    console.log('eror')
                }else{
                    setCustomCollectionData(resp)
                    console.log(resp)
                    // setUserCollection(resp)
                    // setStatus('200')
                }
                

            }).catch((e) => {
                console.error(e)
                // window.alert(e)
              }).then(() => {
                setIsCustomCollectionDataLoading((r) => { return { ...r, fetching: false } })
                
              })

        }else{
            setCustomCollectionData(null)
        }
        
      }, [customCollectionControl])

    //   console.log(userCollection)

      useEffect(() => {
        if (typeof userCollection !== 'undefined' && userCollection !== null){
            console.log(userCollection.data)
            for (const data in userCollection.data){
                console.log(data)
                const collection = userCollection.data[data][0]
                console.log(collection)
                console.log(collection.field)
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
        }
        
    }, [userCollection])

      const handleDataRefresh = ({data, action}) => {
        console.log('ran refresh')
        if (action === 'collections'){
            setCollectionControl(data)
        }else if (action === 'custom'){
            setCustomCollectionControl(data)
        }
        // setControl(data)
      }

      const updateCollection = ({field, field_status}) => {
        console.log(field_status)
        updateUserCollection({user:user.id, perfume:perfume.perfume.id, field:field, field_status:field_status}).then((resp) => {
            console.log(resp)
            if (resp.status === '200'){
                console.log(resp)
                handleDataRefresh({data: true, action: 'collections'})
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

    const handleCustomCollectionClick = ({action, perfumeId, collectionId}) => {
        console.log(perfumeId)
        if (action === 'delete'){
            removeFragranceFromCustomCollection({user:user.id, perfume:perfumeId, collection_id:collectionId}).then((resp) => {
                console.log(resp)
                if (resp.status === '200'){
                    console.log('got 200 on collection perfume delete')
                    console.log(resp)
                    handleDataRefresh({data: 'delete', action:'custom'})
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
                // setResponse((r) => { return { ...r, fetching: false } })
                
              })
        }else{
            addFragranceToCustomCollection({user: user.id, collection_id: collectionId, perfume: perfumeId}).then((resp) => {
                console.log(resp)
                // Here the error is thrown when the perfume isnt in the users collection already
                if (resp.error){
                    // Call the put request to add the perfume to the users collection with the selected field/category
                    // user, perfume, field, field_status
                   console.log('error')
                }else{
                    console.log(resp)
                    // Should prob refresh data here 
                    // setCollectionCount(collectionCount + 1)
                    handleDataRefresh({data: 'add', action:'custom'})
                    // setChosenPerfume(null)
                    // setUserCollection(resp)
                    // setStatus('200')
                }
            })
        }
    }

      

    
    

    return(
        <div>
            {/* <div className="relative"> */}
                <AnimatePresence>
                {isCollectionOpen && (
                <>
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="fixed inset-0 bg-black z-40"
                    onClick={() => setIsCollectionOpen(false)}
                    />
                    <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ 
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                        mass: 1
                    }}
                    className="fixed left-1/2 top-1/3  transform -translate-x-1/2 w-[90%] max-w-[400px] max-h-[90vh] overflow-y-auto p-6 bg-[#2B2D30] rounded-xl shadow-xl z-50 modal-container"
                    style={{
                        // top: `${clickPosition.top}px`,
                        // left: `${clickPosition.left}px`,
                        transform: 'translate(-50%, 20px)',
                    }}
                    >
                    <div className="flex items-start justify-between mb-2">
                        <div>
                        <h3 className="text-lg font-semibold text-[#ECECEC]">
                            Collection
                        </h3>
                        <p className="text-sm text-[#A0A0A0]">
                            Add the perfume to your collections
                        </p>
                        </div>
                        <button
                        onClick={() => setIsCollectionOpen(false)}
                        className="text-[#A0A0A0] hover:text-[#ECECEC] transition-colors"
                        >
                        <X className="h-5 w-5" />
                        </button>
                    </div>
                    {isCollectionDataLoading.fetching 
                        ? <LoadingSpinner showText/>
                        :
                        (authStatus.isAuthenticated
                            ? <div className="space-y-6 mt-6">
                            <div className="grid grid-cols-2 gap-2">
                                <motion.button
                                    key={'currently_own'}
                                    onClick={() => handleClick('currently_own')}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all",
                                        "text-sm font-medium w-full",
                                        currentlyOwnStatus
                                        ? "bg-[#4A90E2] text-white"
                                        : "bg-[#393B3F] text-[#A0A0A0] hover:text-[#ECECEC] hover:bg-[#4A90E2]/20"
                                    )}
                                    whileHover={{ scale: 1.01, y: -1 }}
                                    whileTap={{ scale: 0.99, y: 1 }}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ 
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 25,
                                        mass: 0.8,
                                        delay: 1 * 0.02 
                                    }}
                                    >
                                    <Check className="h-4 w-4" />
                                    <span>Currently Own</span>
                                    </motion.button>
    
                                <motion.button
                                    key={'owned_before'}
                                    onClick={() => handleClick('owned_before')}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all",
                                        "text-sm font-medium w-full",
                                        ownedStatus
                                        ? "bg-[#4A90E2] text-white"
                                        : "bg-[#393B3F] text-[#A0A0A0] hover:text-[#ECECEC] hover:bg-[#4A90E2]/20"
                                    )}
                                    whileHover={{ scale: 1.01, y: -1 }}
                                    whileTap={{ scale: 0.99, y: 1 }}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ 
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 25,
                                        mass: 0.8,
                                        delay: 2 * 0.02 
                                    }}
                                    >
                                    <Check className="h-4 w-4" />
                                    <span>Owned</span>
                                </motion.button>
    
                                <motion.button
                                    key={'wish_list'}
                                    onClick={() => handleClick('wish_list')}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all",
                                        "text-sm font-medium w-full",
                                        wishStatus
                                        ? "bg-[#4A90E2] text-white"
                                        : "bg-[#393B3F] text-[#A0A0A0] hover:text-[#ECECEC] hover:bg-[#4A90E2]/20"
                                    )}
                                    whileHover={{ scale: 1.01, y: -1 }}
                                    whileTap={{ scale: 0.99, y: 1 }}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ 
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 25,
                                        mass: 0.8,
                                        delay: 3 * 0.02 
                                    }}
                                    >
                                    <Check className="h-4 w-4" />
                                    <span>Wish List</span>
                                </motion.button>
    
                                <motion.button
                                    key={'watching'}
                                    onClick={() => handleClick('watching')}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all",
                                        "text-sm font-medium w-full",
                                        watchingStatus
                                        ? "bg-[#4A90E2] text-white"
                                        : "bg-[#393B3F] text-[#A0A0A0] hover:text-[#ECECEC] hover:bg-[#4A90E2]/20"
                                    )}
                                    whileHover={{ scale: 1.01, y: -1 }}
                                    whileTap={{ scale: 0.99, y: 1 }}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ 
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 25,
                                        mass: 0.8,
                                        delay: 3 * 0.02 
                                    }}
                                    >
                                    <Check className="h-4 w-4" />
                                    <span>Watching</span>
                                </motion.button>
    
                                <motion.button
                                    key={'tested'}
                                    onClick={() => handleClick('tested')}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all",
                                        "text-sm font-medium w-full",
                                        testedStatus
                                        ? "bg-[#4A90E2] text-white"
                                        : "bg-[#393B3F] text-[#A0A0A0] hover:text-[#ECECEC] hover:bg-[#4A90E2]/20"
                                    )}
                                    whileHover={{ scale: 1.01, y: -1 }}
                                    whileTap={{ scale: 0.99, y: 1 }}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ 
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 25,
                                        mass: 0.8,
                                        delay: 3 * 0.02 
                                    }}
                                    >
                                    <Check className="h-4 w-4" />
                                    <span>Tested</span>
                                </motion.button>
    
                                <motion.button
                                    key={'decants'}
                                    onClick={() => handleClick('decants')}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all",
                                        "text-sm font-medium w-full",
                                        decantsStatus
                                        ? "bg-[#4A90E2] text-white"
                                        : "bg-[#393B3F] text-[#A0A0A0] hover:text-[#ECECEC] hover:bg-[#4A90E2]/20"
                                    )}
                                    whileHover={{ scale: 1.01, y: -1 }}
                                    whileTap={{ scale: 0.99, y: 1 }}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ 
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 25,
                                        mass: 0.8,
                                        delay: 3 * 0.02 
                                    }}
                                    >
                                    <Check className="h-4 w-4" />
                                    <span>Decanted</span>
                                </motion.button>
                            </div>
    
                            <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium text-[#ECECEC]">My Shelves</h4>
                                <button className="text-[#4A90E2] hover:text-[#2563EB] text-sm">
                                Add New
                                </button>
                            </div>
                            {isCustomCollectionDataLoading.fetching 
                                ? <LoadingSpinner showText/>
                            
                                : (typeof customCollectionData !== 'undefined' && customCollectionData !== null
                                    ?
                                    (customCollectionData.slice(0, visibleCount).map((item, index) => {
                                        console.log(item)
                                        console.log(index)
                                        if (item.perfumes.length < 1){
                                            return (
                                                <motion.button
                                                whileHover={{ scale: 1.01 }}
                                                whileTap={{ scale: 0.99 }}
                                                onClick={() => handleCustomCollectionClick({action:'add', perfumeId: perfume.perfume.id, collectionId: item.id})}
                                                className={cn(
                                                    "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all",
                                                    "text-sm font-medium w-full",
                                                    "bg-[#393B3F] text-[#A0A0A0] hover:text-[#ECECEC] hover:bg-[#4A90E2]/20"
                                                )}
                                                >
                                                    <FileText className="h-4 w-4" />
                                                    <span className="text-sm">{item.collection_name}</span>
                                                </motion.button> 
                                            )
                                        }else{
                                            for ( var currentPerfume in item.perfumes ){
                                                // console.log(perfume)
                                                // console.log(item.perfumes[perfume].id)
                                                return (
                                                    <motion.button
                                                    whileHover={{ scale: 1.01 }}
                                                    whileTap={{ scale: 0.99 }}
                                                    onClick={item.perfumes[currentPerfume].id === perfume.perfume.id ? () => handleCustomCollectionClick({action:'delete', perfumeId: perfume.perfume.id, collectionId: item.id}) : () => handleCustomCollectionClick({action:'add', perfumeId: perfume.perfume.id, collectionId: item.id})}
                                                    className={cn(
                                                        "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all",
                                                        "text-sm font-medium w-full",
                                                        item.perfumes[currentPerfume].id === perfume.perfume.id
                                                        ? "bg-[#4A90E2] text-white"
                                                        : "bg-[#393B3F] text-[#A0A0A0] hover:text-[#ECECEC] hover:bg-[#4A90E2]/20"
                                                    )}
                                                    >
                                                        <FileText className="h-4 w-4" />
                                                        <span className="text-sm">{item.collection_name}</span>
                                                    </motion.button> 
                                                )
                                            }
                                        }
                                        
                                    }))
                                    : <span>No Collection Data</span>
                                )
                            
                            }
                        
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                className="w-full flex items-center justify-between p-3 rounded-lg bg-[#393B3F] text-[#A0A0A0] hover:text-[#ECECEC] transition-colors"
                            >
                                <span className="text-sm">Manage My Shelves</span>
                                <ChevronRight className="h-4 w-4" />
                            </motion.button>
                            </div>
                        </div>
                        : <span>
                            <p className="text-lg font-semibold text-[#ECECEC]">Please <Link to='/login' className="relative md:font-bold text-lg font-medium text-[#ECECEC] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100">login</Link> to use this feature.</p>
                        </span>
                        
                        )
                    }
                    
                
                    
                    </motion.div>
                </>
                )}
            </AnimatePresence>
        {/* </div> */}
      </div>
    )

}