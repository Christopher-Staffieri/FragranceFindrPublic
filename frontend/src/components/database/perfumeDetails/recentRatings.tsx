
import { motion } from "framer-motion"
import { Avatar, AvatarImage, AvatarFallback } from "./avatar"
import { Star } from "lucide-react"
import { useEffect, useState } from "react"
import { getRecentPerfumeRatings } from "../../../lib/allauth"
import TimeAgo from 'react-timeago'

function RecentRatings({perfume, type}) {
  const [recentRatings, setRecentRatings] = useState(null)
    console.log(perfume)

    useEffect(( ) => {
      getRecentPerfumeRatings({perfume:perfume.id, type:type}).then((resp) => {
        console.log(resp)
        // Here the error is thrown when the perfume isnt in the users collection already
        if (resp.error){
            // Call the put request to add the perfume to the users collection with the selected field/category
            // user, perfume, field, field_status
           console.log('error')
        }else{
          setRecentRatings(resp)
          console.log(resp)
        }
      })
    },[])
    // const recentRatings = [
    //     { user: "Jaxbagja", rating: 9.0, avatar: "/placeholder.svg", time: "10 minutes ago" },
    //     { user: "Xyvee", rating: 9.0, avatar: "/placeholder.svg", time: "21 minutes ago" },
    //     { user: "Jetty", rating: 10, avatar: "/placeholder.svg", time: "2 hours ago" },
    //     { user: "Pierre1111", rating: 7.5, avatar: "/placeholder.svg", time: "2 hours ago" },
    //   ]

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-3 mt-4"
      >
        <h4 className="text-sm font-medium text-gray-400">Recent Ratings</h4>
        <div className="space-y-2">

          {recentRatings !== null
            ? (recentRatings.map((rating, index) => 

              <motion.div
              key={rating.rated_by.user.username}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={rating.rated_by.profile_picture} />
                  <AvatarFallback>{rating.rated_by.user.username}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                  {rating.rated_by.user.username}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />

                  {type === "SCENT"
                    ? <span className="ml-1 text-sm font-medium">{rating.scent_rating}</span>
                    : null
                  }
                  {type === "LONGEVITY"
                    ? <span className="ml-1 text-sm font-medium">{rating.longevity_rating}</span>
                    : null
                  }
                  {type === "SILLAGE"
                    ? <span className="ml-1 text-sm font-medium">{rating.sillage_rating}</span>
                    : null
                  }
                  {type === "BOTTLE"
                    ? <span className="ml-1 text-sm font-medium">{rating.bottle_rating}</span>
                    : null
                  }
                  {type === "PRICE"
                    ? <span className="ml-1 text-sm font-medium">{rating.price_rating}</span>
                    : null
                  }
    
                </div>
                <span className="text-xs text-gray-500">
                  <TimeAgo date={rating.time_rated}/>
                </span>
              </div>


            </motion.div>
            ))
            : <div className="flex items-center gap-2">
                
                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                  No Recent Ratings Found
                </span>
          </div>
          }


          {/* {recentRatings.map((rating, index) => (
            <motion.div
              key={rating.user}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between group"
            >
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={rating.avatar} />
                  <AvatarFallback>{rating.user[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                  {rating.user}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm font-medium">{rating.rating}</span>
                </div>
                <span className="text-xs text-gray-500">{rating.time}</span>
              </div>
            </motion.div>
          ))} */}
        </div>
      </motion.div>
    )
  }

export { RecentRatings }