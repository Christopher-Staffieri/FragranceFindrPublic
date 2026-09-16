import { useEffect, useState } from "react"
import { Trophy, MessageCircle, Bell, ThumbsUp, ThumbsDown, Share2, Info, Star, PenLine} from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "./button"
import { useUser } from "../../../auth/hooks"
import { checkUserPerfumeStatement, getFragranceStatements, updateStatementAwards } from "../../../lib/allauth"
import { useAuthInfo } from "../../../auth/hooks"
import { ActionButton } from "../../common/actionButton"
import { Link } from "react-router-dom"
import StatementsForm from "./statementForm"

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

export default function StatementsSection(perfume) {
  const [expandedStatements, setExpandedStatements] = useState<number[]>([])
  const [statements, setStatements] = useState([])
  const currentUser = useUser()
  const userAuthStatus = useAuthInfo()
  const [userLikedReview, setUserLikedReview] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [control, setControl] = useState(false)
  const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })
  const [userStatementData, setUserStatementData] = useState(null)
  const [status, setStatus] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHelpful, setIsHelpful] = useState<boolean | null>(null)
  // const [likedStatus, setLikedStatus] = useState(false)
 
  console.log(currentUser)
  console.log(userAuthStatus)

  useEffect(() => {

    getFragranceStatements({perfume:perfume.perfume}).then((resp) => {
        console.log(resp)
        // Here the error is thrown when the perfume isnt in the users collection already
        if (resp.error){
            // Call the put request to add the perfume to the users collection with the selected field/category
            // user, perfume, field, field_status
           console.log('error')
        }else{
            setStatements(resp)
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
      checkUserPerfumeStatement({statement_perfume:perfume.perfume, posted_by:currentUser.profile}).then((resp) => {
          console.log(resp)
          if (resp.error){
              setUserStatementData(null)
          }else{
            setUserStatementData(resp)
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


const handleAwardClick = (statement_posted_by, like_status) => {
  if (userAuthStatus.isAuthenticated){
    updateStatementAwards({statement_posted_by:statement_posted_by, perfume:perfume.perfume, awarded_by:currentUser.profile, award_status:like_status}).then((resp) => {
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
          <h2 className="text-3xl font-bold">Customer Statements</h2>
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
                Write a Statement
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

      
          <StatementsForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} statementData={userStatementData} perfumeId={perfume.perfume} refreshData={handleDataRefresh}/>
          
        
        </div>
      </div>

      <div className="space-y-6">
        {statements.map((statement) => {
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
              if (statement.posted_by.id === currentUser.profile){
                  likedStatus = true
                  dislikeStatus = true
                  awardStatus = true
              }else{

                statement.awards.map((test) => {
                  console.log(test)
                  if (test.id === currentUser.profile){
                      console.log('user awarded')
                      awardStatus = true
                  }
                  
              })
              }
          }
          console.log(statement)
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
            <p className="text-sm text-muted-foreground mb-2">Posted on {new Date(statement.date_posted).toLocaleDateString()}</p>
            <div className="h-16 w-16 rounded-full overflow-hidden bg-muted">
              {statement.posted_by.profile_picture ? (
                <img 
                  src={statement.posted_by.profile_picture} 
                  alt={statement.posted_by.user.username}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary text-xl font-semibold">
                  {statement.posted_by.user.username}
                </div>
              )}
            </div>
            <div className="text-center">
              <div className="font-medium text-sm">{statement.posted_by.user.username}</div>
              {statement.user_total_statements > 0 && (
                <div className="text-xs text-muted-foreground">{statement.user_total_statements} Statements</div>
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
                {statement.awards.length > 0 && (
                  <div className="flex items-center gap-1 text-amber-500">
                    <Trophy className="h-4 w-4" />
                    <span className="text-sm font-medium">{statement.awards.length}</span>
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
                
                {statement.scent_rating !== null && statement.scent_rating !== undefined
                  ? <motion.div
                      key={'scent'}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + 1 * 0.1 }}
                      // className={'text-[#4FD1C5]'}
                    >
                      <div className="text-[#4FD1C5] font-bold">{statement.scent_rating}</div>
                      <div className="text-xs text-muted-foreground">{'Scent'}</div>
                </motion.div>
                  : null
                }

                {statement.longevity_rating !== null && statement.longevity_rating !== undefined
                  ? <motion.div
                      key={'longevity'}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + 2 * 0.1 }}
                      // className={`text-[#F6AD55]`}
                    >
                      <div className="text-[#F6AD55] font-bold">{statement.longevity_rating}</div>
                      <div className="text-xs text-muted-foreground">{'Longevity'}</div>
                    </motion.div>
                  : null
                }

                {statement.sillage_rating !== null && statement.sillage_rating !== undefined
                  ? <motion.div
                      key={'sillage'}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + 3 * 0.1 }}
                      // className={`text-[#63B3ED]`}
                    >
                  <div className="text-[#63B3ED] font-bold">{statement.sillage_rating}</div>
                  <div className="text-xs text-muted-foreground">{'Sillage'}</div>
                </motion.div>
                  : null
                }

                {statement.bottle_rating !== null && statement.bottle_rating !== undefined
                  ? (
                    <>
                      <motion.div
                      key={'bottle'}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + 4 * 0.1 }}
                      // className={`text-[#B794F4]`}
                      >
                        <div className="text-[#B794F4] font-bold">{statement.bottle_rating}</div>
                        <div className="text-xs text-muted-foreground">{'Bottle'}</div>
                      </motion.div>

                    
                    </>
                  )
                  : null
                }

                {statement.price_rating !== null && statement.price_rating !== undefined
                  ? (
                    <>
                      <motion.div
                      key={'pricing'}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + 5 * 0.1 }}
                      // className={`text-[#FC8181]`}
                      >
                        <div className="text-[#FC8181] font-bold">{statement.price_rating}</div>
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
              {/* <h3 className="text-lg font-semibold mb-2">{statement.title}</h3> */}
              <div className="text-sm text-muted-foreground mb-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isExpanded ? 'expanded' : 'collapsed'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isExpanded ? statement.statement : `${statement.statement.slice(0, 280)}...`}
                  </motion.div>
                </AnimatePresence>
                {statement.statement.length > 280 && (
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
              {statement.scent_associations !== null && statement.scent_associations !== undefined 
                ? statement.scent_associations.map((tag, index) => (
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
              {currentUser === null ? null : (statement.posted_by.id === currentUser.profile) ? null : (awardStatus) ? 
                  <ActionButton
                  icon={<Trophy className="h-4 w-4" />}
                  label="Award"
                  onClick={() => {
                    handleAwardClick(statement.posted_by.id, false),
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
                    handleAwardClick(statement.posted_by.id, true),
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
        <Button>Load More Statements</Button>
      </div>
    </div>
    </>
  )
}

export { StatementsSection }