import { ExternalLink } from "lucide-react";
import { Card } from "../../database/perfumeDetails/card";
import { Badge } from "./StatusBadge";
import { getUserProfile } from "../../../lib/allauth";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relatveTime from "dayjs/plugin/relativeTime"

export default function SourcesCard({sourceData}) {
    const [userProfile, setUserProfile] = useState(null)

    // const dateProposed = new Date(data.date_posted)
    dayjs.extend(relatveTime)
    // const timeTracking = dayjs(dateProposed).fromNow()

   

    console.log(sourceData)

    useEffect(() => {
        getUserProfile(sourceData.posted_by.id)
        .then((resp) => {
            console.log(resp)
            if (resp.error){
                setUserProfile(null)
            }else{
                setUserProfile(resp)
            }
        })
    }, [])

   
    return (
        <>
             <Card
               key={sourceData.id}
               className="p-6 bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border hover:shadow-lg transition-all duration-300"
             >
                        {/* Source Header */}
                        <div className="flex items-start gap-4 mb-4">
                            {userProfile
                                ? 
                                    <img
                                        src={userProfile.profile_picture|| "/placeholder.svg"}
                                        alt={userProfile.user.username}
                                        className="w-10 h-10 rounded-full border-2 border-light-border dark:border-dark-border"
                                    />
                                : null
                            }
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                {userProfile
                                    ? 
                                        <span className="font-bold text-light-text-primary dark:text-dark-text-primary">
                                            {userProfile.user.username}
                                        </span>
                                    : null
                                }
                              
                              {/* {source.user.isVerifier && (
                                <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 text-xs">
                                  Verifier
                                </Badge>
                              )} */}
                              {sourceData
                                ?   <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                        {dayjs(sourceData.date_posted).fromNow()}
                                    </span>
                                : null
                              }
                              
                            </div>
                            
                            {/* Tags */}
                            {sourceData
                                ?
                                    <div className="flex flex-wrap gap-2">
                                    {sourceData.tags.map((tag, idx) => (
                                        <Badge
                                        key={idx}
                                        className="bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary border-light-primary/20 dark:border-dark-primary/20 text-xs"
                                        >
                                        {tag}
                                        </Badge>
                                    ))}
                                    </div>
                                : null
                            }
                            
                          </div>
                        </div>

                        {/* Description */}
                        {sourceData
                            ?
                                <p className="text-sm text-light-text-primary dark:text-dark-text-primary mb-4">
                                    {sourceData.info}
                                </p>
                            : null
                        }
                        

                        {/* URL */}
                        {sourceData
                            ?
                                <a
                                    href={sourceData.source_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 hover:underline mb-4 break-all"
                                    >
                                    {sourceData.source_url}
                                    <ExternalLink className="w-4 h-4 flex-shrink-0" />
                                </a>
                            : null
                        }
                        

                        {/* Images */}
                        {/* {source.images.length > 0 && (
                          <div className="flex flex-wrap gap-3">
                            {source.images.map((image, idx) => (
                              <div
                                key={idx}
                                className="w-24 h-24 rounded-lg overflow-hidden border border-light-border dark:border-dark-border hover:scale-105 transition-transform duration-200 cursor-pointer"
                              >
                                <img
                                  src={image || "/placeholder.svg"}
                                  alt={`Source image ${idx + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        )} */}
                      </Card>
        </>
    )
}