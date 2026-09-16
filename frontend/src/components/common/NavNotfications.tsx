
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "../MainButton"
import { Bell } from 'lucide-react'
import { ScrollArea } from "./ScrollArea"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "../database/perfumeDetails/dropdownMenu"
  
import { useUser } from "../../auth"
import { getUserNotifications, markUserNotificationsAsRead } from "../../lib/allauth"
import { useAuthInfo } from "../../auth/hooks" 
import moment from "moment"
import { Link } from "react-router-dom"

    
export default function NavNotifications() {
    const user = useUser()
    const authStatus = useAuthInfo()
    const [notifications, setNotifications] = useState([])
    const [unreadNotificationsTotal, setUnreadNotificationsTotal] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    let currentDate = moment()
  
    const fetchNotifications = async () => {
        if (authStatus.isAuthenticated){
            getUserNotifications({user:user.profile}).then((resp) => {
                console.log(resp)
                if (resp['error']){
                    console.log('error')
                }else{
                  console.log(resp)
                  setNotifications(resp)
                }

            }).catch((e) => {
                console.error(e)
                window.alert(e)
              }).then(() => {
                console.log('cool')
              
              })
        }
       
    }
  
    const markNotificationsAsRead = () => {
        if (authStatus.isAuthenticated){
          markUserNotificationsAsRead({user:user.profile}).then((resp) => {
              console.log(resp)
              if (resp['error']){
                  console.log('error')
              }else{
                  setUnreadNotificationsTotal(0)
              }
             
  
          }).catch((e) => {
              console.error(e)
              window.alert(e)
            }).then(() => {
              console.log('cool')
              // setResponse((r) => { return { ...r, fetching: false } })
              
            })
        }
      }
  
    useEffect(() => {
        const wsScheme = window.location.protocol === 'https:' ? 'wss' : 'ws'
        const wsPath = `${wsScheme}://${window.location.host}/ws/notifications/`
        const ws = new WebSocket('ws://localhost:9000/ws/notifications/')
        
        
        ws.onopen = () => {
          console.log('WebSocket connected');
          if (authStatus.isAuthenticated){
            fetchNotifications()
          }else{
            console.log('user not logged in closing ws')
            ws.close()
          }
          
        }
        
        console.log('connected')
        ws.onmessage = (event) => {
            console.log('on message')
            const data = JSON.parse(event.data)
            console.log(data)
            // setNotifications((prev) => {
            //   const filtered = prev.filter((n) => n.id !== data.id)
            //   return [data, ...filtered]
            // })
        }
  
        ws.onclose = () => {
            console.log('websocket closed')
        }
        return () => {
            ws.close()
        }
      }, [])

    const handleToggle = () => {
      setIsOpen(!isOpen)
    }
  
    useEffect(() => {
      if (notifications.length > 0){
        notifications.map((notification) => {
          console.log(notification)
          if(notification.unread === true){
              console.log('read')
              setUnreadNotificationsTotal(unreadNotificationsTotal + 1)
          }else{
              console.log('read')
          }
      })
      }
    },[notifications])

    return(
     
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative w-10 h-10 sm:w-12 sm:h-12 touch-manipulation"
              onClick={handleToggle}>
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800 dark:text-gray-100" />
                {unreadNotificationsTotal > 0  
                    ? <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full " />
                    : null
                }
                
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={5} className="w-screen sm:w-80 max-w-md bg-white dark:bg-gray-800 p-4 rounded-md shadow-lg">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-gray-900 dark:text-gray-100">Notifications</p>
                  <p className="text-xs leading-none text-muted-foreground text-gray-900 dark:text-gray-100">
                    You have {unreadNotificationsTotal} unread messages
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <ScrollArea className="h-[300px] overflow-y-auto">

                {notifications.length > 0
                    ? notifications.map((notification, index) => {
                        return(
                            <>
                                <motion.div
                                    key={notification.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <DropdownMenuItem className="flex items-center p-3 sm:p-4">
                                    <div className="flex items-center space-x-3 sm:space-x-4">
                                        <div className={`w-2 h-2 rounded-full ${notification.unread ? 'bg-blue-500' : 'bg-gray-300'}`} />
                                        <div className="space-y-1">
                                        {notification.actors.length - 1 === 0
                                            ? 
                                            <Link to={`/database/perfumes/${notification.target}`}>
                                              <p className="text-xs sm:text-sm font-medium leading-tight text-gray-900 dark:text-gray-100">{notification.actors[0].actor.user.username}{notification.message} on {notification.target}</p>
                                            </Link>
                                            
                                            : (notification.actors.length - 1 === 1
                                                ?
                                                  <Link to={`/database/perfumes/${notification.target}`}>
                                                    <p className="text-xs sm:text-sm font-medium leading-tight text-gray-900 dark:text-gray-100">{notification.actors[0].actor.user.username} and {notification.actors.length -1} other {notification.message} on {notification.target}</p>
                                                  </Link>
                                                
                                                :
                                                <Link to={`/database/perfumes/${notification.target}`}>
                                                  <p className="text-xs text-gray-500 dark:text-gray-400">{notification.actors[0].actor.user.username} and {notification.actors.length -1} others {notification.message} on {notification.target}</p>
                                                </Link>
                                                
                                            )
                                        }
                                        {/* <p className="text-sm font-medium leading-none"></p> */}
                                        
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{moment.duration(currentDate.diff(notification.actors[0].timestamp)).humanize()} ago</p>
                                        </div>
                                    </div>
                                </DropdownMenuItem>
                                </motion.div>
                            </>
                        )
                    })
                    : null
                }


                
              </ScrollArea>
              
              <DropdownMenuSeparator />
              <DropdownMenuItem className="w-full text-center">
                <Button variant="ghost" className="w-full text-sm text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300">View all notifications</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

 
    )
    

}