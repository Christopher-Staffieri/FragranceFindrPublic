import { AnimatePresence, motion } from "framer-motion";
import { BellRing, X, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthInfo, useUser } from "../../../auth/hooks";
import { checkUserPerfumeSubscriptions, subscribeToFragrance, unSubscribeFromFragrance } from "../../../lib/allauth";
import { Link } from "react-router-dom";


export default function SubscribeDropdown({perfume, state, setState}){
    // const [isSubscribeOpen, setIsSubscribeOpen] = useState(true)
    const userAuthStatus = useAuthInfo()
    const user = useUser()
    console.log(user)
    console.log(perfume.perfume)
    const [reviewStatus, setReviewStatus] = useState(false)
    const [statementStatus, setStatementStatus] = useState(false)
    const [photoStatus, setPhotoStatus] = useState(false)

    useEffect(() => {
            if (userAuthStatus.isAuthenticated){
                console.log('logged in')
                checkUserPerfumeSubscriptions({user: user.profile, subscription_type: ['reviews', 'statements', 'photos'], perfume_id: perfume.perfume.id}).then((resp) => {
                    console.log(resp)
                    // Here the error is thrown when the perfume isnt in the users collection already
                    if (resp.error){
                        // Call the put request to add the perfume to the users collection with the selected field/category
                        // user, perfume, field, field_status
                       console.log('error')
                    }else{
                        console.log(resp[0].reviews)
                        setReviewStatus(resp[0].reviews)
                        setStatementStatus(resp[1].statements)
                        setPhotoStatus(resp[2].photos)
                        console.log(resp)
                        // Should prob refresh data here 
                        // setCollectionCount(collectionCount + 1)
                        // refreshData(true)
                        // setChosenPerfume(null)
                        // setUserCollection(resp)
                        // setStatus('200')
                    }
                })
            }
            // if (user.isAu)
        }, [])

    const handleSubscription = (type) =>  {
            if (userAuthStatus.isAuthenticated){
                console.log('logged in')
                subscribeToFragrance({user: user.profile, perfume_id: perfume.perfume.id, subscription_type: type}).then((resp) => {
                    console.log(resp)
                    setReviewStatus(true)
                })
            }
        }

    const handleUnsub = (type) =>  {
            if (userAuthStatus.isAuthenticated){
                console.log('logged in')
                unSubscribeFromFragrance({user: user.profile, perfume_id: perfume.perfume.id, subscription_type: type}).then((resp) => {
                    console.log(resp)
                    setReviewStatus(false)
    
                    
                })
            }
        }

    return(
    <div>
      <div className="relative">
        {/* Quick Actions Grid */}

        {/* Subscribe Dropdown */}
        <AnimatePresence>
          {state && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-40"
                onClick={() => setState(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[400px] p-6 bg-[#2B2D30] rounded-xl shadow-xl z-50"
              >
                {userAuthStatus.isAuthenticated ? 
                <>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[#ECECEC] flex items-center gap-2">
                      <BellRing className="h-5 w-5" />
                      Subscribe
                    </h3>
                    <p className="text-sm text-[#A0A0A0]">
                      Notifications about new content from the community
                    </p>
                  </div>
                  <button
                    onClick={() => setState(false)}
                    className="text-[#A0A0A0] hover:text-[#ECECEC] transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-[#A0A0A0] mb-2">Community</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {/* {["Reviews", "Statements", "Photos"].map((item) => (
                        <motion.button
                          key={item}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center justify-center gap-2 p-2 rounded-lg bg-[#393B3F] hover:bg-[#4A90E2] text-[#ECECEC] transition-colors"
                        >
                          <Bell className="h-4 w-4" />
                          <span className="text-sm">{item}</span>
                        </motion.button>
                      ))} */}
                      {reviewStatus
                        ? <motion.button
                            key={'Reviews'}
                            onClick={() => handleUnsub('reviews')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-center gap-2 p-2 rounded-lg bg-primaryDark-950 hover:bg-[#4A90E2] text-[#ECECEC] transition-colors"
                            >
                                <Bell className="h-4 w-4" />
                                <span className="text-sm">{'Reviews'}</span>
                        </motion.button>
                        : <motion.button
                            key={'Reviews'}
                            onClick={() => handleSubscription('reviews')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-center gap-2 p-2 rounded-lg bg-primaryDark-950 hover:bg-[#4A90E2] text-[#ECECEC] transition-colors"
                            >
                                <Bell className="h-4 w-4" />
                                <span className="text-sm">{'Reviews'}</span>
                            </motion.button>
                        }

                        {statementStatus
                        ? <motion.button
                            key={'Statements'}
                            onClick={() => handleUnsub('statements')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-center gap-2 p-2 rounded-lg bg-primaryDark-950 hover:bg-[#4A90E2] text-[#ECECEC] transition-colors"
                            >
                                <Bell className="h-4 w-4" />
                                <span className="text-sm">{'Statements'}</span>
                        </motion.button>
                        : <motion.button
                            key={'Statements'}
                            onClick={() => handleSubscription('statements')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-center gap-2 p-2 rounded-lg bg-primaryDark-950 hover:bg-[#4A90E2] text-[#ECECEC] transition-colors"
                            >
                                <Bell className="h-4 w-4" />
                                <span className="text-sm">{'Statements'}</span>
                            </motion.button>
                        }
                        {photoStatus
                        ? <motion.button
                            key={'Photos'}
                            onClick={() => handleUnsub('photos')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-center gap-2 p-2 rounded-lg bg-primaryDark-950 hover:bg-[#4A90E2] text-[#ECECEC] transition-colors"
                            >
                                <Bell className="h-4 w-4" />
                                <span className="text-sm">{'Photos'}</span>
                        </motion.button>
                        : <motion.button
                            key={'Photos'}
                            onClick={() => handleSubscription('photos')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-center gap-2 p-2 rounded-lg bg-primaryDark-950 hover:bg-[#4A90E2] text-[#ECECEC] transition-colors"
                            >
                                <Bell className="h-4 w-4" />
                                <span className="text-sm">{'Photos'}</span>
                            </motion.button>
                        }
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-[#A0A0A0] mb-2">Offers</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {["Souk", "Splits"].map((item) => (
                        <motion.button
                          key={item}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center justify-center gap-2 p-2 rounded-lg bg-[#393B3F] hover:bg-[#4A90E2] text-[#ECECEC] transition-colors"
                        >
                          <Bell className="h-4 w-4" />
                          <span className="text-sm">{item}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
                </>
                : 
                <>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[#ECECEC] flex items-center gap-2">
                      <BellRing className="h-5 w-5" />
                      Subscribe
                    </h3>
                    <p className="text-sm text-[#A0A0A0]">
                    Please <Link to='/login' className="relative md:font-bold text-lg font-medium text-[#ECECEC] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100">login</Link> to use this feature.
                    </p>
                  </div>
                  <button
                    onClick={() => setState(false)}
                    className="text-[#A0A0A0] hover:text-[#ECECEC] transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                </div>
                </>
                }
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
    )

}