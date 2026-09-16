
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import * as allauth from '../lib/allauth'
import { Avatar, Button } from "flowbite-react";
import RevisedDataTable from "../components/research/common/RevisedDataTable";
import OriginalDataTable from "../components/research/common/OriginalDataTable";
import RevisionDisplay from "../components/research/common/RevisionDisplay";
import { NotFound } from "../components/NotFound";
import { levelColors } from "../json/LevelColors";
import { useUser } from "../auth";
import OwnedProfile from "./OwnedProfile";
import VisitingProfile from "./VistingProfile";

export default function UserProfile(){
    const location = useLocation();
    const [status, setStatus] = useState('')
    const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })
    const [profileData, setProfileData] = useState(null)
    const [informationState, setInformationState] = useState('revised')
    const [totalRevisions, setTotalRevisions] = useState(0)
    const revisions = []
    const currentUser = useUser()
    
    useEffect(() => {
       
        setResponse((r) => { return { ...r, fetching: true } })
 
            allauth.getUserProfile(location.pathname.split('/')[2]).then((resp) => {
                console.log(resp)
                setProfileData(resp)
                
                
                setStatus('200')

            }).catch((e) => {
                console.error(e)
                window.alert(e)
              }).then(() => {
                setResponse((r) => { return { ...r, fetching: false } })
                
              })

      }, [])


    return(
        <section>
            {status === '404' ? <NotFound/> : <div></div>}
            {currentUser !== null && profileData !== null && currentUser.username === profileData.user.username ? <OwnedProfile profile={profileData}/> : <VisitingProfile profile={profileData}/>}
            {/* {profileData !== null ? <div style={{color:levelColors[profileData.level]}} >Test </div>: <div></div>} */}
            {/* <Avatar img="/images/people/profile-picture-5.jpg" rounded bordered color={levelColors[profileData.level]}/> */}
            {/* <img src={profileData.profile_picture}></img> */}
           
            <div color="#bccee6">sdfsdf</div>
            
       
            
            
        </section>
    )
}

