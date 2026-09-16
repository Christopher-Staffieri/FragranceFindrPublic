import { useEffect, useState } from "react"
import { Button } from "./button"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Progress } from "./progress"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { RatingDistributionChart } from "./ratingDistributionChart"
import { RecentRatings } from "./recentRatings"
import { getPerfumeAvgRatings } from "../../../lib/allauth"


function RatingCard(perfume) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [perfumeAvgRatings, setPerfumeAvgRatings] = useState(null)
  const [ratings, setRatings] = useState([])
  console.log(perfume.perfume)

  useEffect(() => {
    getPerfumeAvgRatings({perfume:perfume.perfume.id}).then((resp) => {
      console.log(resp)
      // Here the error is thrown when the perfume isnt in the users collection already
      if (resp.error){
          // Call the put request to add the perfume to the users collection with the selected field/category
          // user, perfume, field, field_status
         console.log('error')
      }else{
          // setReviews(resp)\
          setPerfumeAvgRatings(resp)

          setRatings(
            [
              {
                label: "SCENT", 
                score: resp.scent_ratings.scent_ratings_avg, 
                count: resp.scent_ratings.scent_ratings_total, 
                color: "bg-blue-500",
                distribution: [
                  { rating: 0, count: resp.scent_ratings.individual_value_count[0]},
                  { rating: 1, count: resp.scent_ratings.individual_value_count[1] },
                  { rating: 2, count: resp.scent_ratings.individual_value_count[2] },
                  { rating: 3, count: resp.scent_ratings.individual_value_count[3] },
                  { rating: 4, count: resp.scent_ratings.individual_value_count[4] },
                  { rating: 5, count: resp.scent_ratings.individual_value_count[5] },
                  { rating: 6, count: resp.scent_ratings.individual_value_count[6] },
                  { rating: 7, count: resp.scent_ratings.individual_value_count[7] },
                  { rating: 8, count: resp.scent_ratings.individual_value_count[8] },
                  { rating: 9, count: resp.scent_ratings.individual_value_count[9] },
                  { rating: 10, count: resp.scent_ratings.individual_value_count[10] },
                ]
                
                //     // details: [
                //     //   { label: "Fresh", percentage: 85 },
                //     //   { label: "Sweet", percentage: 70 },
                //     //   { label: "Woody", percentage: 90 },
                //     // ]
              },
              { 
                label: "LONGEVITY", 
                score: resp.longevity_ratings.longevity_ratings_avg, 
                count: resp.longevity_ratings.longevity_ratings_total, 
                color: "bg-pink-500",
                distribution: [
                  { rating: 0, count: resp.longevity_ratings.individual_value_count[0]},
                  { rating: 1, count: resp.longevity_ratings.individual_value_count[1] },
                  { rating: 2, count: resp.longevity_ratings.individual_value_count[2] },
                  { rating: 3, count: resp.longevity_ratings.individual_value_count[3] },
                  { rating: 4, count: resp.longevity_ratings.individual_value_count[4] },
                  { rating: 5, count: resp.longevity_ratings.individual_value_count[5] },
                  { rating: 6, count: resp.longevity_ratings.individual_value_count[6] },
                  { rating: 7, count: resp.longevity_ratings.individual_value_count[7] },
                  { rating: 8, count: resp.longevity_ratings.individual_value_count[8] },
                  { rating: 9, count: resp.longevity_ratings.individual_value_count[9] },
                  { rating: 10, count: resp.longevity_ratings.individual_value_count[10] },
                ]
                
                //     details: [
                //       { label: "6-8 hours", percentage: 45 },
                //       { label: "8-12 hours", percentage: 35 },
                //       { label: "12+ hours", percentage: 20 },
                //     ]
              },
              { 
                label: "SILLAGE", 
                score: resp.sillage_ratings.sillage_ratings_avg, 
                count: resp.sillage_ratings.sillage_ratings_total, 
                color: "bg-purple-500",
                distribution: [
                  { rating: 0, count: resp.sillage_ratings.individual_value_count[0]},
                  { rating: 1, count: resp.sillage_ratings.individual_value_count[1] },
                  { rating: 2, count: resp.sillage_ratings.individual_value_count[2] },
                  { rating: 3, count: resp.sillage_ratings.individual_value_count[3] },
                  { rating: 4, count: resp.sillage_ratings.individual_value_count[4] },
                  { rating: 5, count: resp.sillage_ratings.individual_value_count[5] },
                  { rating: 6, count: resp.sillage_ratings.individual_value_count[6] },
                  { rating: 7, count: resp.sillage_ratings.individual_value_count[7] },
                  { rating: 8, count: resp.sillage_ratings.individual_value_count[8] },
                  { rating: 9, count: resp.sillage_ratings.individual_value_count[9] },
                  { rating: 10, count: resp.sillage_ratings.individual_value_count[10] },
                ]
                //     details: [
                //       { label: "Moderate", percentage: 40 },
                //       { label: "Strong", percentage: 45 },
                //       { label: "Very Strong", percentage: 15 },
                //     ]
              },
              { 
                    label: "BOTTLE", 
                    score: resp.bottle_ratings.bottle_ratings_avg, 
                    count: resp.bottle_ratings.bottle_ratings_total, 
                    color: "bg-emerald-500",
                    distribution: [
                      { rating: 0, count: resp.bottle_ratings.individual_value_count[0]},
                      { rating: 1, count: resp.bottle_ratings.individual_value_count[1] },
                      { rating: 2, count: resp.bottle_ratings.individual_value_count[2] },
                      { rating: 3, count: resp.bottle_ratings.individual_value_count[3] },
                      { rating: 4, count: resp.bottle_ratings.individual_value_count[4] },
                      { rating: 5, count: resp.bottle_ratings.individual_value_count[5] },
                      { rating: 6, count: resp.bottle_ratings.individual_value_count[6] },
                      { rating: 7, count: resp.bottle_ratings.individual_value_count[7] },
                      { rating: 8, count: resp.bottle_ratings.individual_value_count[8] },
                      { rating: 9, count: resp.bottle_ratings.individual_value_count[9] },
                      { rating: 10, count: resp.bottle_ratings.individual_value_count[10] },
                    ]
                //     details: [
                //       { label: "Design", percentage: 95 },
                //       { label: "Quality", percentage: 90 },
                //       { label: "Functionality", percentage: 85 },
                //     ]
              },
              { 
                label: "VALUE FOR MONEY", 
                score: resp.price_ratings.price_ratings_avg, 
                count: resp.price_ratings.price_ratings_total, 
                color: "bg-cyan-500",
                distribution: [
                  { rating: 0, count: resp.price_ratings.individual_value_count[0]},
                  { rating: 1, count: resp.price_ratings.individual_value_count[1] },
                  { rating: 2, count: resp.price_ratings.individual_value_count[2] },
                  { rating: 3, count: resp.price_ratings.individual_value_count[3] },
                  { rating: 4, count: resp.price_ratings.individual_value_count[4] },
                  { rating: 5, count: resp.price_ratings.individual_value_count[5] },
                  { rating: 6, count: resp.price_ratings.individual_value_count[6] },
                  { rating: 7, count: resp.price_ratings.individual_value_count[7] },
                  { rating: 8, count: resp.price_ratings.individual_value_count[8] },
                  { rating: 9, count: resp.price_ratings.individual_value_count[9] },
                  { rating: 10, count: resp.price_ratings.individual_value_count[10] },
                ]
                //     details: [
                //       { label: "Price/Performance", percentage: 75 },
                //       { label: "Uniqueness", percentage: 85 },
                //       { label: "Versatility", percentage: 80 },
                //     ]
              },

            ]
          )
          
          
          console.log(resp)
      }
  })

  },[])

 console.log(ratings)
    

    return (
      <>
      <Card>
      <CardHeader>
        <CardTitle>Ratings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {ratings.length > 0 && (
          (ratings.map((rating, index) => (
            <motion.div
              key={rating.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {rating.label}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({rating.count.toLocaleString()} RATINGS)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{rating.score.toFixed(1)}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto"
                      onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    >
                      <motion.div
                        animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </Button>
                  </div>
                </div>
                <div className="relative pt-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${rating.score * 10}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="w-full"
                  >
                    <Progress
                      value={rating.score * 10}
                      className={`h-2 ${rating.color}`}
                    />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 space-y-6">
                        <RatingDistributionChart data={rating.distribution} />
                        <div className="space-y-3">
                          {/* {rating.details.map((detail, detailIndex) => (
                            <motion.div
                              key={detail.label}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: detailIndex * 0.1 }}
                              className="space-y-1"
                            >
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">{detail.label}</span>
                                <span className="font-medium">{detail.percentage}%</span>
                              </div>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${detail.percentage}%` }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className={`h-1 rounded-full ${rating.color} opacity-50`}
                              />
                            </motion.div>
                          ))} */}
                          
                        </div>
                        <RecentRatings perfume={perfume.perfume} type={rating.label}/>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )))
          
        )
          
        }
        
          
          
        
      </CardContent>
    </Card>
    </>
  )
    
  }
  

export { RatingCard }