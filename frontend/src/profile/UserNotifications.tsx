import { useEffect, useState } from "react"
import { useUser } from "../auth"
import { getUserNotifications, markUserNotificationsAsRead } from "../lib/allauth"
import { Button, Label } from "flowbite-react"

export default function UserNotifications() {
    // const user = useUser()
    // const [notifications, setNotifications] = useState([])
    // const [unreadNotificationsTotal, setUnreadNotificationsTotal] = useState(0)

    // const fetchNotifications = async () => {
    //     getUserNotifications({user:user.profile}).then((resp) => {
    //         console.log(resp)
    //         if (resp['error']){
    //             console.log('error')
    //         }else{
    //             setNotifications(resp)
    //         }
           

    //     }).catch((e) => {
    //         console.error(e)
    //         window.alert(e)
    //       }).then(() => {
    //         console.log('cool')
    //         // setResponse((r) => { return { ...r, fetching: false } })
            
    //       })
    // }

    // useEffect(() => {
    //     fetchNotifications()

    //     const ws = new WebSocket('ws://localhost:9000/ws/notifications/')
    //     console.log('connected')
    //     ws.onmessage = (event) => {
    //         console.log('on message')
    //         const data = JSON.parse(event.data)
    //         setNotifications((prev) => [data, ...prev])
    //     }

    //     ws.onclose = () => {
    //         console.log('websocket closed')
    //     }
    //     return () => {
    //         ws.close()
    //     }
    // }, [])

    // useEffect(() => {
    //     if (notifications !== null && notifications.length > 0){
    //         notifications.map((notification) => {
    //             console.log(notification)
    //             if(notification.unread){
    //                 console.log('read')
    //                 setUnreadNotificationsTotal(unreadNotificationsTotal + 1)
    //             }else{
    //                 console.log('read')
    //             }
    //         })
    //     }
    // },[notifications])

    // const markNotificationsAsRead = () => {
    //     markUserNotificationsAsRead({user:user.profile}).then((resp) => {
    //         console.log(resp)
    //         if (resp['error']){
    //             console.log('error')
    //         }else{
    //             setUnreadNotificationsTotal(0)
    //         }
           

    //     }).catch((e) => {
    //         console.error(e)
    //         window.alert(e)
    //       }).then(() => {
    //         console.log('cool')
    //         // setResponse((r) => { return { ...r, fetching: false } })
            
    //       })
    // }

    
    
    // console.log(unreadNotificationsTotal)
    return(
        <section>
            <div>
                {/* <Label> Notifications</Label>
                {notifications.map((notification) => (
                    <div key={notification.id}> 
                        <Label>{notification.actor.id} {notification.verb} </Label>
                    </div>
                ))}
                <Label>{unreadNotificationsTotal}</Label>
                <Button onClick={() => markNotificationsAsRead()}>Test</Button> */}
            </div>
        </section>
    )
}