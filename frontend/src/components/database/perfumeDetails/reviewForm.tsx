
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Youtube, Star, Plus } from 'lucide-react'
import { Button } from "./button"
import { Input } from "../../Input"
import { Label } from "../../Label"
import { Textarea } from "../../TextArea"
import { Badge } from "./badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"
import { getUserPerfumeReview, postUserPerfumeReview, updateUserPerfumeReview } from "../../../lib/allauth"
import { useUser } from "../../../auth"
import { useAuthInfo } from "../../../auth/hooks"
import { list } from "postcss"

export default function ReviewForm({ isOpen = false, onClose, reviewData, perfumeId, refreshData }: { isOpen?: boolean, onClose?: () => void, reviewData?: Object, perfumeId?: Object, refreshData?: () => void }) {
  const [title, setTitle] = useState(null)
  const [review, setReview] = useState(null)
  const [scentTags, setScentTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })
  
  // const [scentAssociations, setScentAssociations] = useState(null)
  const userAuthStatus = useAuthInfo()
  const user = useUser()

  console.log(scentTags)


  useEffect(() => {
    if (reviewData !== null && reviewData !== undefined){
      setTitle(reviewData[0].title)
      setReview(reviewData[0].review)
      setScentTags(reviewData[0].scent_associations)
    }

  },[reviewData])



  const handleReviewSubmit = () =>{
    if (userAuthStatus.isAuthenticated){
      if (reviewData !== null && reviewData !== undefined){
        // Need to add composedReview etc and have it set to the review data retrived in order to insure the put keeps the correct data if it isnt changed
        console.log('ran put')
            
        updateUserPerfumeReview({reviewed_perfume: reviewData[0].reviewed_perfume.id, posted_by: reviewData[0].posted_by.id, title:title, review:review, scent_associations:scentTags}).then((resp) => {
            console.log(resp)
            if (resp.status === '200'){
                console.log(resp)
                setTitle(resp.title)
                setReview(review.title)
                setScentTags(review.scent_associations)
                refreshData(true)
                
            }
        }).catch((e) => {
            console.error(e)
            window.alert(e)
          }).then(() => {
            setResponse((r) => { return { ...r, fetching: false } })
            
          })
      }else{
        console.log('ran post')
            // console.log(perfumeId.perfumeId)
            postUserPerfumeReview({reviewed_perfume:perfumeId.perfumeId, posted_by:user.profile, review:review, title:title, scent_associations:scentTags}).then((resp) => {
                console.log(resp)
                if (resp.status === '200'){
                    // setUserReviewData(resp)
                    
                    refreshData(true)
                    
                    
                }else{
                    // setUserReviewData(null)
                    console.log('ran else')
                }
            }).catch((e) => {
                console.error(e)
                window.alert(e)
              }).then(() => {
                setResponse((r) => { return { ...r, fetching: false } })
                
              })
      }


    }


  }
  // console.log(userAuthStatus)
  

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault()
      setScentTags([...scentTags, newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setScentTags(scentTags.filter(tag => tag !== tagToRemove))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 "
        >
          {/* <div className="absolute inset-full bg-[#2B2D30]" onClick={onClose} /> */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-auto rounded-lg shadow-lg bg-gray-200"
          >
            <Card className="border-gray-200 dark:border-gray-700">
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold">Write Review</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={onClose}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </div>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                  Please follow our Rules for Perfume Reviews. For questions or general discussion use the Forum.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title / Summary</Label>
                  {title !== null 
                    ? <Input
                        id="title"
                        defaultValue={title}
                        className="border-gray-200 dark:border-gray-700"
                        onChange={(event) => setTitle(event.target.value)}
                      />
                    : <Input
                        id="title"
                        placeholder='Enter a concise title or summary for your review'
                        className="border-gray-200 dark:border-gray-700"
                        onChange={(event) => setTitle(event.target.value)}
                      />

                  }
                  
                </div>
                <div className="space-y-2">
                  <Label htmlFor="review">Review</Label>
                  {review !== null 
                    ? <Textarea
                        id="review"
                        defaultValue={review}
                        className="min-h-[200px] border-gray-200 dark:border-gray-700"
                        onChange={(event) => setReview(event.target.value)}
                      />
                    : <Textarea
                        id="review"
                        placeholder="Share your experience with this fragrance..."
                        className="min-h-[200px] border-gray-200 dark:border-gray-700"
                        onChange={(event) => setReview(event.target.value)}
                      />

                  }
                  
                </div>
                {/* <div className="space-y-2">
                  <Label>Rating</Label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Button
                        key={rating}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:text-yellow-500"
                      >
                        <Star className="h-5 w-5" />
                        <span className="sr-only">Rate {rating} stars</span>
                      </Button>
                    ))}
                  </div>
                </div> */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Label>Scent associations</Label>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      What does this perfume remind you of?
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {scentTags !== null && scentTags !== undefined 
                      ? scentTags.map((tag) => (
                        <Badge
                        key={tag}
                        variant="secondary"
                        className="flex items-center gap-1 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
                      >
                        {tag}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 rounded-full hover:bg-blue-500/20"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove {tag}</span>
                        </Button>
                      </Badge>
                      ))
                      : null
                    }
                    {/* {scentTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="flex items-center gap-1 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
                      >
                        {tag}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 rounded-full hover:bg-blue-500/20"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove {tag}</span>
                        </Button>
                      </Badge>
                    ))} */}
                    <div className="flex-1">
                      <Input
                        placeholder="Add a scent association (press Enter)"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={handleAddTag}
                        className="border-gray-200 dark:border-gray-700"
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 border-dashed border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-800/50"
                  >
                    <Youtube className="h-4 w-4" />
                    Add YouTube Video
                  </Button>
                </div> */}
              </CardContent>
              <CardFooter className="flex justify-between gap-2">
                <Button
                  variant="ghost"
                  className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button onClick={() => handleReviewSubmit()} className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600">
                  Post Review
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}