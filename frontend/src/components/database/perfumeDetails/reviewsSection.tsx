import { useEffect, useState } from "react"
import { Trophy, MessageCircle, Bell, ThumbsUp, ThumbsDown, Share2, Info, Star, PenLine} from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "./button"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Progress } from "./progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdownMenu"
import { useUser } from "../../../auth/hooks"
import { getFragranceReviews, getUserPerfumeReview, getUserReviewsTotal, updateReviewAwards, updateReviewDislikes, updateReviewLikes } from "../../../lib/allauth"
import ReviewForm from "./reviewForm"
import { useAuthInfo } from "../../../auth/hooks"
import { ActionButton } from "../../common/actionButton"
import { Link } from "react-router-dom"

// interface Review {
//   id: number
//   author: string
//   avatar: string
//   rating: number
//   date: string
//   title: string
//   content: string
//   likes: number
//   dislikes: number
// }



// const reviews: Review[] = [
//   {
//     id: 1,
//     author: "Emily Johnson",
//     avatar: "/placeholder.svg?height=40&width=40",
//     rating: 5,
//     date: "2 days ago",
//     title: "Absolutely stunning fragrance!",
//     content: "Naxos is a masterpiece. The blend of tobacco, honey, and vanilla creates a warm, inviting scent that lasts all day. It's perfect for cooler weather and special occasions. Definitely worth the investment!",
//     likes: 42,
//     dislikes: 3,
//   },
//   {
//     id: 2,
//     author: "Michael Smith",
//     avatar: "/placeholder.svg?height=40&width=40",
//     rating: 4,
//     date: "1 week ago",
//     title: "Great scent, but a bit strong",
//     content: "I love the overall smell of Naxos, but I find it can be a bit overwhelming if over-applied. The tobacco note is prominent and beautifully done. Longevity is excellent, lasting well over 8 hours on my skin.",
//     likes: 28,
//     dislikes: 5,
//   },
//   {
//     id: 3,
//     author: "Sophia Lee",
//     avatar: "/placeholder.svg?height=40&width=40",
//     rating: 5,
//     date: "2 weeks ago",
//     title: "My new signature scent!",
//     content: "I can't get enough of Naxos. It's sophisticated, unique, and always garners compliments. The way the fragrance develops over time is truly remarkable. It starts off with a burst of citrus and lavender, then settles into a rich, creamy tobacco and honey base.",
//     likes: 56,
//     dislikes: 1,
//   },
// ]

export default function ReviewsSection(perfume) {
  const [expandedReviews, setExpandedReviews] = useState<number[]>([])
  const [reviews, setReviews] = useState([])
  const currentUser = useUser()
  const userAuthStatus = useAuthInfo()
  const [userLikedReview, setUserLikedReview] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [control, setControl] = useState(false)
  const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })
  const [userReviewData, setUserReviewData] = useState(null)
  const [status, setStatus] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHelpful, setIsHelpful] = useState<boolean | null>(null)
  // const [likedStatus, setLikedStatus] = useState(false)
 
  console.log(currentUser)
  console.log(userAuthStatus)

  useEffect(() => {

    getFragranceReviews({perfume:perfume.perfume}).then((resp) => {
        console.log(resp)
        // Here the error is thrown when the perfume isnt in the users collection already
        if (resp.error){
            // Call the put request to add the perfume to the users collection with the selected field/category
            // user, perfume, field, field_status
           console.log('error')
        }else{
            setReviews(resp)
            console.log(resp)
        }
    })
}, [])

// const getUserReviewTotalFunc = (currentReviewUser) => {
//   getUserReviewsTotal({current_user:currentReviewUser}).then((resp) => {
//     console.log(resp)
//     // Here the error is thrown when the perfume isnt in the users collection already
//     if (resp.error){
//         // Call the put request to add the perfume to the users collection with the selected field/category
//         // user, perfume, field, field_status
//        console.log('error')
//     }else{
//         setReviews(resp)
//         console.log(resp)
//     }
// })
// }

useEffect(() => {
  console.log('ran effect')
  if (currentUser){
    setResponse((r) => { return { ...r, fetching: true } })
      getUserPerfumeReview({reviewed_perfume:perfume.perfume, posted_by:currentUser.profile}).then((resp) => {
          console.log(resp)
          if (resp.error){
              setUserReviewData(null)
          }else{
              setUserReviewData(resp)
              setStatus('200')
          }
          

      }).catch((e) => {
          console.error(e)
          window.alert(e)
        }).then(() => {
          setResponse((r) => { return { ...r, fetching: false } })
          
        })
  }
  
}, [control, currentUser])

const handleDataRefresh = (data) => {
  console.log('ran refresh')
  setControl(data)
}


const handleAwardClick = (review_posted_by, like_status) => {
  if (userAuthStatus.isAuthenticated){
    updateReviewAwards({review_posted_by:review_posted_by, perfume:perfume.perfume, awarded_by:currentUser.profile, award_status:like_status}).then((resp) => {
      console.log(resp)
      // Here the error is thrown when the perfume isnt in the users collection already
      if (resp.error){
          // Call the put request to add the perfume to the users collection with the selected field/category
          // user, perfume, field, field_status
         console.log('error')
      }else{
          // setReviews(resp)
          console.log(resp)
          // Should prob refresh data here 
          // setCollectionCount(collectionCount + 1)
          // setChosenPerfume(null)
          // setUserCollection(resp)
          // setStatus('200')
      }
  })
  }
  
}

const handleLikeClick = (review_posted_by, like_status) => {
  if (userAuthStatus.isAuthenticated){
    updateReviewLikes({review_posted_by:review_posted_by, perfume:perfume.perfume, liked_by:currentUser.profile, like_status:like_status}).then((resp) => {
      console.log(resp)
      // Here the error is thrown when the perfume isnt in the users collection already
      if (resp.error){
          // Call the put request to add the perfume to the users collection with the selected field/category
          // user, perfume, field, field_status
         console.log('error')
      }else{
          // setReviews(resp)
          console.log(resp)
          // Should prob refresh data here 
          // setCollectionCount(collectionCount + 1)
          // setChosenPerfume(null)
          // setUserCollection(resp)
          // setStatus('200')
      }
  })
  }
  
}

const handleDownvoteClick = (review_posted_by, downvote_status) => {
  if (userAuthStatus.isAuthenticated){
    updateReviewDislikes({review_posted_by:review_posted_by, perfume:perfume.perfume, downvoted_by:currentUser.profile, downvote_status:downvote_status}).then((resp) => {
      console.log(resp)
      // Here the error is thrown when the perfume isnt in the users collection already
      if (resp.error){
          // Call the put request to add the perfume to the users collection with the selected field/category
          // user, perfume, field, field_status
         console.log('error')
      }else{
          // setReviews(resp)
          console.log(resp)
          // Should prob refresh data here 
          // setCollectionCount(collectionCount + 1)
          // setChosenPerfume(null)
          // setUserCollection(resp)
          // setStatus('200')
      }
  })
  }
  
}
  console.log(reviews)

  const toggleReviewExpansion = (reviewId: number) => {
    setExpandedReviews(prev =>
      prev.includes(reviewId)
        ? prev.filter(id => id !== reviewId)
        : [...prev, reviewId]
    )
  }

  // const calculateAverageRating = () => {
  //   const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
  //   return (sum / reviews.length).toFixed(1)
  // }

  // const calculateRatingPercentages = () => {
  //   const counts = [0, 0, 0, 0, 0]
  //   reviews.forEach(review => counts[review.rating - 1]++)
  //   return counts.map(count => (count / reviews.length) * 100)
  // }

  return (
    <>
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold">Customer Reviews</h2>
          <div className="flex items-center gap-4">
            {/* <div className="text-5xl font-bold">{calculateAverageRating()}</div> */}
            {/* <div>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(Number(calculateAverageRating()))
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">Based on {reviews.length} reviews</p>
            </div> */}
          </div>
        </div>
        <div className="flex-1 space-y-2">
          {/* {calculateRatingPercentages()
            .reverse()
            .map((percentage, index) => (
              <div key={5 - index} className="flex items-center gap-2">
                <span className="text-sm font-medium w-6">{5 - index}</span>
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <Progress value={percentage} className="h-2 flex-1" />
                <span className="text-sm text-muted-foreground w-12">{Math.round(percentage)}%</span>
              </div>
            ))} */}
          {userAuthStatus.isAuthenticated
            ? <Button
                onClick={() => setIsFormOpen(true)}
                className="bg-[#4A90E2] hover:bg-[#3B82F6] text-white mb-4 flex items-center gap-2"
              >
                <PenLine className="w-4 h-4" />
                Write a Review
              </Button>
            : <span>Please <Link to={'/login'}>login</Link> or <Link to={'/signup'}>signup</Link> to rate this perfume</span>
          }
          {/* <Button
            onClick={() => setIsFormOpen(true)}
            className="bg-[#4A90E2] hover:bg-[#3B82F6] text-white mb-4 flex items-center gap-2"
          >
          <PenLine className="w-4 h-4" />
          Write a Review
        </Button> */}

      
          <ReviewForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} reviewData={userReviewData} perfumeId={perfume.perfume} refreshData={handleDataRefresh}/>
          
        
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => {
          // const [likedStatus, setLikedStatus] = useState(false)
          let likedStatus = false
          let dislikeStatus = false
          let awardStatus = false
          // console.log('user liked')
          console.log(currentUser)
          
          // const test = getUserReviewTotalFunc(review.posted_by.id)
          // console.log(test)

          if (currentUser !== null){
            console.log(currentUser)
            console.log('ran')
              if (review.posted_by.id === currentUser.profile){
                  likedStatus = true
                  dislikeStatus = true
                  awardStatus = true
              }else{
                  review.up_votes.map((test) => {
                      console.log(test)
                      if (test.id === currentUser.profile){
                          console.log('user Liked')
                          likedStatus = true
                      }
                      
                  })

                  review.down_votes.map((test) => {
                    console.log(test)
                    if (test.id === currentUser.profile){
                        console.log('user Liked')
                        dislikeStatus = true
                    }
                    
                })

                review.awards.map((test) => {
                  console.log(test)
                  if (test.id === currentUser.profile){
                      console.log('user Liked')
                      awardStatus = true
                  }
                  
              })
              }
          }
          console.log(review)
          // console.log(review.sillage_rating)
        return(
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden"
          >


      <div className="p-6">
        <div className="flex gap-6">
          {/* Left Column - Avatar and User Info */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center gap-2"
          >
            <p className="text-sm text-muted-foreground mb-2">Posted on {new Date(review.date_posted).toLocaleDateString()}</p>
            <div className="h-16 w-16 rounded-full overflow-hidden bg-muted">
              {review.posted_by.profile_picture ? (
                <img 
                  src={review.posted_by.profile_picture} 
                  alt={review.posted_by.user.username}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary text-xl font-semibold">
                  {review.posted_by.user.username}
                </div>
              )}
            </div>
            <div className="text-center">
              <div className="font-medium text-sm">{review.posted_by.user.username}</div>
              {review.user_total_reviews > 0 && (
                <div className="text-xs text-muted-foreground">{review.user_total_reviews} Reviews</div>
              )}
              
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1 space-y-4">
            {/* Header with Metrics */}
            <div className="flex justify-between items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center gap-2"
              >
                {review.awards.length > 0 && (
                  <div className="flex items-center gap-1 text-amber-500">
                    <Trophy className="h-4 w-4" />
                    <span className="text-sm font-medium">{review.awards.length}</span>
                </div>
                )
                  
                }
                {/* {review.awards.length > 0 (
                  <div className="flex items-center gap-1 text-amber-500">
                    <Trophy className="h-4 w-4" />
                    <span className="text-sm font-medium">{review.awards}</span>
                  </div>
                )} */}
              </motion.div>
              
              {/* Metrics */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center gap-4 text-sm"
              >
                
                {review.scent_rating !== null && review.scent_rating !== undefined
                  ? <motion.div
                      key={'scent'}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + 1 * 0.1 }}
                      // className={'text-[#4FD1C5]'}
                    >
                      <div className="text-[#4FD1C5] font-bold">{review.scent_rating}</div>
                      <div className="text-xs text-muted-foreground">{'Scent'}</div>
                </motion.div>
                  : null
                }

                {review.longevity_rating !== null && review.longevity_rating !== undefined
                  ? <motion.div
                      key={'longevity'}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + 2 * 0.1 }}
                      // className={`text-[#F6AD55]`}
                    >
                      <div className="text-[#F6AD55] font-bold">{review.longevity_rating}</div>
                      <div className="text-xs text-muted-foreground">{'Longevity'}</div>
                    </motion.div>
                  : null
                }

                {review.sillage_rating !== null && review.sillage_rating !== undefined
                  ? <motion.div
                      key={'sillage'}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + 3 * 0.1 }}
                      // className={`text-[#63B3ED]`}
                    >
                  <div className="text-[#63B3ED] font-bold">{review.sillage_rating}</div>
                  <div className="text-xs text-muted-foreground">{'Sillage'}</div>
                </motion.div>
                  : null
                }

                {review.bottle_rating !== null && review.bottle_rating !== undefined
                  ? (
                    <>
                      <motion.div
                      key={'bottle'}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + 4 * 0.1 }}
                      // className={`text-[#B794F4]`}
                      >
                        <div className="text-[#B794F4] font-bold">{review.bottle_rating}</div>
                        <div className="text-xs text-muted-foreground">{'Bottle'}</div>
                      </motion.div>

                    
                    </>
                  )
                  : null
                }

                {review.price_rating !== null && review.price_rating !== undefined
                  ? (
                    <>
                      <motion.div
                      key={'pricing'}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + 5 * 0.1 }}
                      // className={`text-[#FC8181]`}
                      >
                        <div className="text-[#FC8181] font-bold">{review.price_rating}</div>
                        <div className="text-xs text-muted-foreground">{'Pricing'}</div>
                      </motion.div>

                    
                    </>
                  )
                  : null
                }

                
              </motion.div>
            </div>

            {/* Review Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="text-lg font-semibold mb-2">{review.title}</h3>
              <div className="text-sm text-muted-foreground mb-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isExpanded ? 'expanded' : 'collapsed'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isExpanded ? review.review : `${review.review.slice(0, 280)}...`}
                  </motion.div>
                </AnimatePresence>
                {review.review.length > 280 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="ml-1 text-primary hover:underline focus:outline-none"
                  >
                    {isExpanded ? "Show less" : "Read more"}
                  </button>
                )}
              </div>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-2"
            >
              {review.scent_associations !== null && review.scent_associations !== undefined 
                ? review.scent_associations.map((tag, index) => (
                  <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                  className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary"
                >

                  #{tag}
                </motion.span>
                ))
                : null 
              }
              {/* // {review.scent_associations.map((tag, index) => (
              //   <motion.span
              //     key={tag}
              //     initial={{ opacity: 0, scale: 0.8 }}
              //     animate={{ opacity: 1, scale: 1 }}
              //     transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
              //     className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary"
              //   >
              //     #{tag}
              //   </motion.span>
              // ))} */}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex items-center gap-4 pt-4 border-t"
            >
              {/* <ActionButton icon={<Trophy className="h-4 w-4" />} label="Award" /> */}
              {currentUser === null ? null : (review.posted_by.id === currentUser.profile) ? null : (awardStatus) ? 
                  <ActionButton
                  icon={<Trophy className="h-4 w-4" />}
                  label="Award"
                  onClick={() => {
                    handleAwardClick(review.posted_by.id, false),
                    awardStatus = false
                  }}
                  // onClick={() => setlike(true)}
                  active={awardStatus == true}
                  activeColor="text-yellow-500"
                  />
                                        // <Button variant="outline" size="sm" onClick={() => {
                                        //     handleLikeClick(review.posted_by.id, false)
                                        // }}>
                                        //   <ThumbsUp className="w-4 h-4 mr-2 text-primary" />
                                        //   Helpful ({review.up_votes.length})</Button> 

                : 
                  <ActionButton
                  icon={<Trophy className="h-4 w-4" />}
                  label="Award"
                  onClick={() => {
                    handleAwardClick(review.posted_by.id, true),
                    awardStatus = true
                  }}
                  // onClick={() => setlike(true)}
                  // active={likedStatus === false}
                  activeColor="text-yellow-500"
                  />
                }

              {/* <ActionButton icon={<MessageCircle className="h-4 w-4" />} label="Comment" /> */}
              {/* <ActionButton icon={<Bell className="h-4 w-4" />} label="Subscribe" /> */}

              <div className="flex items-center gap-2 ml-auto">
                {currentUser === null ? null : (review.posted_by.id === currentUser.profile) ? null : (likedStatus) ? 
                  <ActionButton
                  icon={<ThumbsUp className="h-4 w-4" />}
                  label="Helpful"
                  onClick={() => {
                    handleLikeClick(review.posted_by.id, false),
                    likedStatus = false
                  }}
                  // onClick={() => setlike(true)}
                  active={likedStatus == true}
                  activeColor="text-green-500"
                  />
                                        // <Button variant="outline" size="sm" onClick={() => {
                                        //     handleLikeClick(review.posted_by.id, false)
                                        // }}>
                                        //   <ThumbsUp className="w-4 h-4 mr-2 text-primary" />
                                        //   Helpful ({review.up_votes.length})</Button> 

                : 
                  <ActionButton
                  icon={<ThumbsUp className="h-4 w-4" />}
                  label="Helpful"
                  onClick={() => {
                    handleLikeClick(review.posted_by.id, true),
                    likedStatus = true
                  }}
                  // onClick={() => setlike(true)}
                  // active={likedStatus === false}
                  activeColor="text-green-500"
                  />
                }

{currentUser === null ? null : (review.posted_by.id === currentUser.profile) ? null : (dislikeStatus) ? 
                  <ActionButton
                  icon={<ThumbsDown className="h-4 w-4" />}
                  label="Not helpful"
                  // onClick={() => setIsHelpful(false)}
                  active={dislikeStatus == true}
                  onClick={() => {
                    handleDownvoteClick(review.posted_by.id, false)
                    dislikeStatus === true
                  }}
                  // active={isHelpful === false}
                  activeColor="text-red-500"
                />
                                        // <Button variant="outline" size="sm" onClick={() => {
                                        //     handleLikeClick(review.posted_by.id, false)
                                        // }}>
                                        //   <ThumbsUp className="w-4 h-4 mr-2 text-primary" />
                                        //   Helpful ({review.up_votes.length})</Button> 

                : 
                <ActionButton
                icon={<ThumbsDown className="h-4 w-4" />}
                label="Not helpful"
                onClick={() => {
                  handleDownvoteClick(review.posted_by.id, true)
                  dislikeStatus === false
                }}
                // active={isHelpful === false}
                activeColor="text-red-500"
              />
                }
                
                
                <ActionButton icon={<Info className="h-4 w-4" />} />
                <ActionButton icon={<Share2 className="h-4 w-4" />} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
            
          </motion.div>
        )
        })}
        
      </div>
      <div className="flex justify-center">
        <Button>Load More Reviews</Button>
      </div>
    </div>
    </>
  )
}

export { ReviewsSection }