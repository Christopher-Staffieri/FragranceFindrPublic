import { AnimatePresence, motion } from "framer-motion";
import { X, Star, Clock, DollarSign, Droplets, Wind, Wine } from "lucide-react";
import { cn } from "../../../lib/utils";
import { useEffect, useState } from "react";
import { checkUserPerfumeRating } from "../../../lib/allauth";
import { useUser } from "../../../auth";
import '../common/stars.css'
import LoadingSpinner from "../../common/loadingSpinner";
import { useAuthInfo } from "../../../auth/hooks";
import { Link } from "react-router-dom";

interface RatingCategory {
    id: string
    label: string
    icon: React.ReactNode
    iconColor: string
    value: number
}


export default function RateDropdown({perfume, isRatingOpen, setIsRatingOpen}){
    const user = useUser()
    const userAuthStatus = useAuthInfo()
    // const [rating, setRating] = useState(0); // Selected rating
    const [hoverRating, setHoverRating] = useState(0); // Hovered rating
    const [longevityHoverRating, setLongevityHoverRating] = useState(0)
    const [scentHoverRating, setScentHoverRating] = useState(0)
    // const [rating, setRating] = useState(0)
    const totalStars = 5
        // This is so the count can be consitent and actually continue counting the way it should 
    const [status, setStatus] = useState()
    const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })
    const [ratingFormStatus, setRatingFormStatus] = useState(false)
    const [ratingDataStatus, setRatingDataStatus] = useState(false)
    const [userRatingData, setUserRatingData] = useState(null)
    console.log(perfume)
    console.log(userAuthStatus)
    // const [ratingData, setRatingData] = useState(ratedData)

    useEffect(() => {
      if (userAuthStatus.isAuthenticated){
        setResponse((r) => { return { ...r, fetching: true } })
            checkUserPerfumeRating({perfume_id:perfume.perfume.id, user_id:user.profile}).then((resp) => {
                console.log(resp)
                setUserRatingData(resp)
                // setStatus('200')

            }).catch((e) => {
                console.error(e)
                window.alert(e)
              }).then(() => {
                setResponse((r) => { return { ...r, fetching: false } })
                
              })
      }
        

      }, [])

    const ratingCategories: RatingCategory[] = [
      { 
        id: 'scent_rating', 
        label: 'Scent', 
        icon: <Droplets className="h-4 w-4" />, 
        iconColor: 'text-[#4A90E2]',
        value: null
      },
      { 
        id: 'longevity_rating', 
        label: 'Longevity', 
        icon: <Clock className="h-4 w-4" />, 
        iconColor: 'text-[#F45B69]',
        value: null
      },
      { 
        id: 'sillage_rating', 
        label: 'Sillage', 
        icon: <Wind className="h-4 w-4" />, 
        iconColor: 'text-[#8E44AD]',
        value: null
      },
      { 
        id: 'bottle_rating', 
        label: 'Bottle', 
        icon: <Wine className="h-4 w-4" />, 
        iconColor: 'text-[#2ECC71]',
        value: null
      },
      { 
        id: 'price_rating', 
        label: 'Value for money', 
        icon: <DollarSign className="h-4 w-4" />, 
        iconColor: 'text-[#9CA3AF]',
        value: null
      }
    ]

    if (!response.fetching){
        if (userRatingData){
            ratingCategories.map((item) => {
                console.log(item)
                item.value = userRatingData[0][item.id]
            })
        }
    }

    const calculateFraction = (event,index) => {
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
        // console.log(event)
        const { left, width } = event.target.getBoundingClientRect();
        const relativeX = event.clientX - left
        const fraction = relativeX / width
        // Without the multiplication the base value would be 1 which is fine for 5 stars but if the rating should goto 10 the base needs to be multiplied
        // This is so the count can be consitent and actually continue counting the way it should 
        // Now each star has a value of 2 incrementing by .50 instead of having a value of 1 
        if (fraction <= 0.25) return (index * 2) + .50;
        if (fraction <= 0.5) return (index * 2) + 1;
        if (fraction <= 0.75) return (index * 2) + 1.5;
        return (index * 2) + 2
    }

    const handleMouseLeave = (category) => {
        if (category === 'scent_rating'){
          setScentHoverRating(0)
        }else if (category === 'longevity_rating'){
          setLongevityHoverRating(0)
        }
        
    }

    const handleMouseMove = (event, index, category) => {
        const newRating = calculateFraction(event, index)
        if (category === 'scent_rating'){
          setScentHoverRating(newRating)
        }else if(category === 'longevity_rating'){
          setLongevityHoverRating(newRating)
        }
        
    }

    const handleClick = (newRating) => {
        // setRating(newRating)
        // if (ratingDataStatus){
        //     updateRating(newRating)
        // }else{
        //     postRating(newRating)
        // }
        
    }

    const renderStars = (ratingData) => {
        return [...Array(totalStars)].map((_, index) => {
            console.log(ratingData)
            let rating = 0
            if (ratingData.rating.value !== null){
                rating = ratingData.rating.value
            }
            console.log(rating)
            // console.log(index)
            // const value = hoverRating || rating
            // const [value, setValue] = useState(hoverRating || rating)
            let value = hoverRating || rating
            if (ratingData.rating.id === 'scent_rating'){
              value = (scentHoverRating || rating)
            }else if(ratingData.rating.id === 'longevity_rating'){
              value = (longevityHoverRating || rating)
            }
            const fullValue = (index + 1) * 2
            // console.log(value)
            // console.log(fullValue)
     
            let fill = 'empty'
           
            if (value >= fullValue){
                fill = 'full'
            }else if(value >= fullValue - 0.5){
                fill = 'three-quarters'
            }else if (value >= fullValue - 1){
                fill = 'half'
            }else if(value >= fullValue - 1.5){
                fill = 'quarter'
            }

            return (
               
                <div
                    key={ratingData.rating.id + '-star'}
                    className={`${ratingData.rating.id}-star ${fill}`}
                    onMouseMove={(event) => handleMouseMove(event, index, ratingData.rating.id)}
                    onClick={() => handleClick(calculateFraction(event, index))}
                    onMouseLeave={() => handleMouseLeave(ratingData.rating.id)}
                    
                    >
                    ★
                </div>
                
            )
        })
    }

    

    console.log(ratingCategories)
    console.log(userRatingData)

    return(
        <AnimatePresence>
          {userAuthStatus.isAuthenticated 
            ? (isRatingOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="fixed inset-0 bg-black z-40"
                  onClick={() => setIsRatingOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 400,
                    damping: 30
                  }}
                  className="fixed left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[400px] max-h-[90vh] overflow-y-auto p-6 bg-[#2B2D30] rounded-xl shadow-xl z-50 modal-container"
                  style={{
                  //   top: `${clickPosition.top}px`,
                  //   left: `${clickPosition.left}px`,
                    transform: 'translate(-50%, 20px)',
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[#ECECEC]">
                        Rate
                      </h3>
                      <p className="text-sm text-[#A0A0A0]">
                        Submit your rating for the perfume
                      </p>
                    </div>
                    <button
                      onClick={() => setIsRatingOpen(false)}
                      className="text-[#A0A0A0] hover:text-[#ECECEC] transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
  
                  <div className="space-y-6">
                    {ratingCategories.map((category) => (
                      <div key={category.id} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className={cn("transition-colors", category.iconColor)}>
                            {category.icon}
                          </div>
                          <span className="text-sm font-medium text-[#ECECEC]">
                            {category.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-0">
                              <div className="star-rating"> 
                                  {renderStars({rating: category})}
                              </div>
                              
                            {/* {[1, 2, 3, 4, 5].map((rating) => (
                              renderStars()
                              // <motion.button
                              //   key={rating}
                              // //   onHoverStart={() => handleRatingHover(category.id, rating)}
                              // //   onHoverEnd={() => handleRatingLeave(category.id)}
                              // //   onClick={() => handleRatingSet(category.id, rating)}
                              //   whileHover={{ scale: 1.1 }}
                              //   whileTap={{ scale: 0.9 }}
                              //   className="p-0.5"
                              // >
                              //   <Star 
                              //     className={cn(
                              //       "w-6 h-6 transition-colors",
                              //     //   (hoveredRatings[category.id] || ratings[category.id]) >= rating
                              //     //     ? "fill-[#4A90E2] text-[#4A90E2]"
                              //     //     : "fill-transparent text-[#393B3F]"
                              //     )}
                              //   />
                              // </motion.button>
                            ))} */}
                          </div>
                          <span className="text-sm text-[#A0A0A0] min-w-[2ch]">
                              {category.id === 'scent_rating'
  
                                ? (category.value !== scentHoverRating && scentHoverRating != 0
                                  ? scentHoverRating.toFixed(2)
                                  : category.value
                                )
                                : 0.0
                              }
  
                              {category.id === 'longevity_rating'
  
                              ? (category.value !== longevityHoverRating && longevityHoverRating != 0
                                ? longevityHoverRating.toFixed(2)
                                : category.value
                              )
                              : 0.0
                              }
                            {/* {category.value === null 
                              ? hoverRating.toFixed(2)
                              : (category.value !== hoverRating && hoverRating != 0
                                ? hoverRating.toFixed(2)
                                : category.value
                              )
                            } */}
                            {/* {category.value !== hoverRating && hoverRating != 0
                              ? hoverRating.toFixed(2)
                              : category.value.toFixed(2)
                            } */}
                          </span>
                        </div>
                      </div>
                    ))}
  
                    {/* <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-2.5 mt-6 rounded-lg bg-[#4A90E2] text-white font-medium hover:bg-[#2563EB] transition-colors"
                    >
                      Submit Rating
                    </motion.button> */}
                  </div>
                </motion.div>
              </>
            ))
            : <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsRatingOpen(false)}
            />
            <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 400,
                    damping: 30
                  }}
                  className="fixed left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[400px] max-h-[90vh] overflow-y-auto p-6 bg-[#2B2D30] rounded-xl shadow-xl z-50 modal-container"
                  style={{
                  //   top: `${clickPosition.top}px`,
                  //   left: `${clickPosition.left}px`,
                    transform: 'translate(-50%, 20px)',
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[#ECECEC]">
                        Please <Link to='/login' className="relative md:font-bold text-lg font-medium text-[#ECECEC] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100">login</Link> to use this feature.
                      </h3>
                    </div>
                    <button
                      onClick={() => setIsRatingOpen(false)}
                      className="text-[#A0A0A0] hover:text-[#ECECEC] transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                    </div>


                </motion.div>

          
            </>
              
          }
          
        </AnimatePresence>

    )



}