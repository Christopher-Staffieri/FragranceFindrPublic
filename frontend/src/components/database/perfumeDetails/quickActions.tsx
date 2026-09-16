import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Button } from "./button"
import { motion } from "framer-motion"
import { Heart, Star, MessageCircle, PenLine, Camera, Lightbulb, ListFilter, FileText, LineChart, FlaskRoundIcon as Flask, Microscope, Bell } from "lucide-react"
import SubscribeDropdown from "./subscribeDropdown"
import { useState } from "react"
import CollectionsDropdown from "./collectionsDropdown"
import RateDropdown from "./rateDropdown"
import StarRating from "../common/StarRating"
import ReviewForm from "./reviewForm"
import ReviewDropdown from "./reviewDropdown"
import StatementDropdown from "./statementDropdown"


{/* <StatementsForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} statementData={userStatementData} perfumeId={perfume.perfume} refreshData={handleDataRefresh}/> */}
export default function QuickActions(perfume){

    const [subscribeOpen, setSubscribeOpen] = useState(false)
    // const [clickPosition, setClickPosition] = useState({ top: 0, left: 0 });
    const [isCollectionOpen, setIsCollectionOpen] = useState(false)
    const [isRatingOpen, setIsRatingOpen] = useState(false)
    const [isReviewOpen, setIsReviewOpen] = useState(false)
    const [isStatementOpen, setIsStatmentOpen] = useState(false)

    // const handleActionClick = (label: string, event: React.MouseEvent) => {
    //   const rect = event.currentTarget.getBoundingClientRect();
    //   setClickPosition({ top: rect.bottom, left: rect.left + rect.width / 2 });
    // }

    const quickActions = [
        { icon: <Bell className="w-5 h-5 text-primary" />, label: "Subscribe" },
        { icon: <Heart className="w-5 h-5 text-pink-500" />, label: "Collection" },
        { icon: <Star className="w-5 h-5 text-yellow-500" />, label: "Rate" },
        { icon: <MessageCircle className="w-5 h-5 text-purple-500" />, label: "Review" },
        { icon: <PenLine className="w-5 h-5 text-blue-500" />, label: "Statement" },
        { icon: <Camera className="w-5 h-5 text-emerald-500" />, label: "Photo" },
        { icon: <Lightbulb className="w-5 h-5 text-orange-500" />, label: "Inspiration" },
        { icon: <ListFilter className="w-5 h-5 text-violet-500" />, label: "Classify" },
        { icon: <FileText className="w-5 h-5 text-red-500" />, label: "Notes" },
        { icon: <LineChart className="w-5 h-5 text-cyan-500" />, label: "Tracker" },
        // { icon: <Flask className="w-5 h-5 text-rose-500" />, label: "Souk 120" },
        { icon: <Microscope className="w-5 h-5 text-teal-500" />, label: "Research" },
      ]

    return(
        <>
        
            <Card>
                      <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
                        >
                          {quickActions.map((item, index) => (
                            <motion.div
                              key={item.label}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Button
                                variant="outline"
                                className="w-full h-full flex flex-col items-center justify-center gap-2 p-4 rounded-xl hover:bg-muted transition-all duration-300 ease-in-out"
                                onClick={() => {
                                  if (item.label === 'Subscribe'){
                                    setSubscribeOpen(true)
                                  }else if (item.label === 'Collection'){
                                    setIsCollectionOpen(true)
                                  }else if (item.label === 'Rate'){
                                    setIsRatingOpen(true)
                                  }else if (item.label === 'Review'){
                                    setIsReviewOpen(true)
                                  }else if (item.label === 'Statement'){
                                    setIsStatmentOpen(true)
                                  }
                                  
                                  // Add functionality here
                                }}
                              >
                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  {item.icon}
                                </motion.div>
                                <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
                              </Button>
                            </motion.div>
                          ))}
                          {subscribeOpen ? <SubscribeDropdown perfume={perfume} state={subscribeOpen} setState={setSubscribeOpen} /> : null}
                          {isCollectionOpen ? <CollectionsDropdown perfume={perfume} isCollectionOpen={isCollectionOpen} setIsCollectionOpen={setIsCollectionOpen}/> : null}
                          {isRatingOpen ? <RateDropdown perfume={perfume} isRatingOpen={isRatingOpen} setIsRatingOpen={setIsRatingOpen}/> : null}
                          {isReviewOpen ? <ReviewDropdown perfume={perfume} isReviewOpen={isReviewOpen} setIsReviewOpen={setIsReviewOpen}/>: null}
                          {isStatementOpen ? <StatementDropdown isStatementOpen={isStatementOpen} setIsStatementOpen={setIsStatmentOpen} perfume={perfume}/> : null}
                          
                          {/* {isReviewOpen ? <ReviewForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} reviewData={userReviewData} perfumeId={perfume.perfume} refreshData={handleDataRefresh}/> : null} */}
                          {/* {isReviewOpen ? } */}
                          {/* <ReviewForm */}
                          {/* <ReviewForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} reviewData={userReviewData} perfumeId={perfume.perfume} refreshData={handleDataRefresh}/> */}
                          {/* <StarRating/> */}
                        </motion.div>
                      </CardContent>
                    </Card>
        </>
    )
}