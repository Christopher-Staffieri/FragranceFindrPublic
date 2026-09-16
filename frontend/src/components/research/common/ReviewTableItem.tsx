
import { useEffect, useState } from "react";
import { EditProposal } from "../forms/EditProposal";
import { Link } from "react-router-dom";
import { getUserProfile } from "../../../lib/allauth";
import { motion, AnimatePresence } from 'framer-motion'
import {MoreVertical, ExternalLink, Clock, Pause } from 'lucide-react'
import { Progress } from "./ProgressBar"
import { Avatar } from "./TableAvatar";
import { Badge } from "./StatusBadge";
import { Button } from "../../MainButton";
// import relativeTime from "dayjs/plugin/relativeTime"
import dayjs from "dayjs"
import relatveTime from "dayjs/plugin/relativeTime"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "./DropdownMenu"




export default function ReviewTableItem({name, status, onEditClick, data, auditorStatus}){
    const [response, setResponse] = useState({ fetching: false, content: null })
    const [userProfile, setUserProfile] = useState(null)
    const dateProposed = new Date(data.date_posted)
    dayjs.extend(relatveTime)
    const timeTracking = dayjs(dateProposed).fromNow()
    console.log(dateProposed)
    console.log(timeTracking)
    // const formatedProposedTime = d3.utcFormat
    const formattedDate = dateProposed.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
    
    console.log(auditorStatus)
    useEffect(() => {
        // setStatus('200')
        console.log(data
        )
        console.log('logged data id')
        getUserProfile(data.proposed_by).then((resp) => {
            console.log(resp)
            console.log('got profile')
            console.log(resp.user.username)
            setUserProfile(resp)
        }).catch((e) => {
            console.error(e)
            window.alert(e)
          }).then(() => {
            setResponse((r) => { return { ...r, fetching: false } })
            
          })
        
    }, [])
    
    console.log(data)
    console.log(status)
    console.log(userProfile)
    
    return(
        
        <>
      {/* <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >

        {/* Task Management Section */}
        {/* <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
        >  */}
            {/* Task Table */}
                <tbody>
                  <AnimatePresence>
                      <motion.tr 
                        // key={task.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-200 dark:border-gray-700"
                      >
                        <Link to={`/research/review/${data.id}`} state={{data: data}}>
                            <td className="py-4 text-gray-800 dark:text-gray-200">
                                {name}
                            </td>
                        </Link>
                        <td className="py-4">
                          <Badge variant={
                            status === 'processing' ? 'processing' : (status === 'approved') ? 'approved'
                                : (status === 'pending') ? 'pending' : (status === 'declined') ? 'declined' : ''
                            // status === 'Approved' ? 'success' :
                            // status === 'In Review' ? 'warning' :
                            // 'default'

                            // {status === 'processing' ? <Badge color='processing' className="w-fit">Processing</Badge> : (status === 'approved' ? <Badge color='approved' className="w-fit">Approved</Badge> : (status === 'pending') ? <Badge color='pending' className="w-fit">Pending Review</Badge> : (status === 'declined') ? <Badge color='declined' className="w-fit">Declined</Badge> : '')}
                          }>
                            {status === 'processing' ? 'Processing' : (status === 'approved') ? 'Approved'
                                : (status === 'pending') ? 'Pending' : (status === 'declined') ? 'Declined' : ''}
                          </Badge>
                        </td>
                        <td className="py-4">
                          <div className="flex -space-x-2">
                            {userProfile === null
                            
                            ? null
                              
                            : <Link to={`/profile/${userProfile.user.username}`}>
                              <Avatar
                                key={userProfile.id}
                                src={userProfile.profile_picture}
                                // alt={`User ${index + 1}`}
                                className="w-8 h-8 border-2 border-white dark:border-gray-800"
                              />
                            </Link>
                            }
                            
                            
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="w-32">
                            {/* <Progress value={task.progress} className="h-2 bg-gray-200 dark:bg-gray-700" indicatorColor="bg-blue-500" /> */}
                            {/* <Progress value={0} className="h-2 bg-gray-200 dark:bg-gray-700" indicatorColor="bg-blue-500" /> */}
                            {status === 'pending'
                              ? <Progress value={0} className="h-2 bg-gray-200 dark:bg-gray-700" indicatorColor="bg-blue-500" />
                              : (status === 'processing'
                                  ? <Progress value={50} className="h-2 bg-gray-200 dark:bg-gray-700" indicatorColor="bg-blue-500" />
                                  : (status === 'approved'
                                      ? <Progress value={100} className="h-2 bg-gray-200 dark:bg-gray-700" indicatorColor="bg-green-500" />
                                     : (status === 'denied'
                                        ? <Progress value={100} className="h-2 bg-gray-200 dark:bg-gray-700" indicatorColor="bg-red-500" />
                                        : null
                                     )
                                  )
                              )
                            }
                          </div>
                        </td>
                        <td className="py-4">
                          <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500">
                            <ExternalLink className="w-4 h-4 mr-2" />
                              {userProfile === null
                              
                              ? null
                              : <Link to={`/profile/${userProfile.user.username}`}> {userProfile.user.username} </Link>
                              }
                              {/* <Link to={`/profile/${userProfile.user.username}`}> {userProfile.user.username} </Link> */}
                              
                              
                          </Button>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Clock className="w-4 h-4" />
                              {timeTracking}
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                              {/* <Pause className="w-4 h-4" /> */}
                            </Button>
                          </div>
                        </td>
                        <td className="py-4 text-gray-600 dark:text-gray-400">
                          {formattedDate}
                        </td>
                        <td className="py-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                {auditorStatus.auditorStatus === '200' ? <DropdownMenuItem className="text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Edit</DropdownMenuItem>
                                : null}
                                {auditorStatus.auditorStatus === '200' ? <DropdownMenuItem className="text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Delete</DropdownMenuItem> 
                                    :null 
                                }

                              <DropdownMenuItem className="text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Archive</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </motion.tr>
                    
                  </AnimatePresence>
                </tbody>

          {/* </div> */}
        {/* </motion.div> */}
      {/* </motion.div> */}
      </>
    )
}