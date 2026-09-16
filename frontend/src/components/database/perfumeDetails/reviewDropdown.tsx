import { useEffect, useState } from "react";
import { getUserPerfumeReview } from "../../../lib/allauth";
import ReviewForm from "./reviewForm";
import { useUser } from "../../../auth";
import { useAuthInfo } from "../../../auth/hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"
import { Button } from "./button"

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "react-router-dom";


export default function ReviewDropdown({perfume, isReviewOpen, setIsReviewOpen}){

    const currentUser = useUser()
    const userAuthStatus = useAuthInfo()
    const [control, setControl] = useState(false)
    const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })
    const [userReviewData, setUserReviewData] = useState(null)
    console.log(perfume.perfume)
    
    useEffect(() => {
      console.log('ran effect')
      if (currentUser){
        setResponse((r) => { return { ...r, fetching: true } })
          getUserPerfumeReview({reviewed_perfume:perfume.perfume.id, posted_by:currentUser.profile}).then((resp) => {
              console.log(resp)
              if (resp.error){
                  setUserReviewData(null)
              }else{
                  setUserReviewData(resp)
                //   setStatus('200')
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

    return(

        <>
          {userAuthStatus.isAuthenticated 
            ? <ReviewForm isOpen={isReviewOpen} onClose={() => setIsReviewOpen(false)} reviewData={userReviewData} perfumeId={perfume.perfume.id} refreshData={handleDataRefresh}/>
            : <AnimatePresence>
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

                          onClick={() => setIsReviewOpen(false)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Close</span>
                        </Button>
                      </div>
                      <CardDescription className="text-gray-500 dark:text-gray-400">
                      Please <Link to='/login' className="relative md:font-bold text-lg font-medium text-[#ECECEC] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100">login</Link> to use this feature.
                      </CardDescription>
                    </CardHeader>
                    </Card>
                    </motion.div>
                    </motion.div>
                    </AnimatePresence>
          }
            
        </>
    )
}