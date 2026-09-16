
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import * as allauth from '../lib/allauth'
import { Button } from "flowbite-react";
import RevisedDataTable from "../components/research/common/RevisedDataTable";
import OriginalDataTable from "../components/research/common/OriginalDataTable";
import RevisionDisplay from "../components/research/common/RevisionDisplay";
import { NotFound } from "../components/NotFound";
import { useUser } from "../auth";
import ProposalAuditorView from "./ProposalAuditorView";
import ProposalManagerView from "./ProposalManagerView";
import ConfirmedByDisplay from "../components/research/common/ConfirmedByDisplay";
import { TableHeaderWithTabs } from "./test";
import AddSource from "../components/research/common/AddSource";
import ListSources from "../components/research/common/ListSources";
import ProposeDiscussion from "../components/research/common/ProposeDiscussion";

export default function ViewProposedPerfume(){
    const location = useLocation();
    // const data = location.state?.data
    const [data, setData] = useState()
    const [status, setStatus] = useState('')
    const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })
    const [editedData, setEditedData] = useState(null)
    const [confirmedBy, setConfirmedBy] = useState(null)
    const [informationState, setInformationState] = useState('revised')
    const [totalRevisions, setTotalRevisions] = useState(0)
    const revisions = []
    const [userIsAuditor, setUserIsAuditor] = useState(false)
    const [userIsManager, setUserIsManager] = useState(false)
    const [response2, setResponse2] = useState({ fetching: false, content: { status: 200, data: [] } })
    const user = useUser()
    const [userProfile, setUserProfile] = useState(null)
    const [confirmedByProfile, setConfirmedByProfile] = useState(null)
    const [confirmationStatus, setConfirmationStatus] = useState(null)
    const [pageStatus, setPageStatus] = useState('Overview')
    const [editedByProfiles, setEditedByProfiles] = useState([])
    const [userProfileData, setUserProfileData] = useState()
    
    // const userProfile = allauth.getUserProfile()
    
    // console.log(data.id)
    const handleConfirm = () => {
        // post request to update models status, status_key to approved, and all the edits pushed
        if (editedData!== null){
            setResponse({ ...response, fetching: true })
            allauth.confirmPerfume({perfume: editedData[0].edited_perfume , brand: editedData[0].edited_brand,  release_data: editedData[0].edited_release_data, gender: editedData[0].edited_gender, availability: editedData[0].edited_availability, limited: editedData[0].edited_limited, varient: editedData[0].edited_varient, 
                collectors: editedData[0].edited_collectors, interesting_facts: editedData[0].edited_interesting_facts, youtube_link:editedData[0].edited_youtube_link, additional_link:editedData[0].edited_additional_link, status:'approved', confirmed_by:user.id
            }, data.id).then((content) => {
            setResponse((r) => { return { ...r, content } })
            }).catch((e) => {
            console.error(e)
            window.alert(e)
            }).then(() => {
            setResponse((r) => { return { ...r, fetching: false } })
            })
    }
    }
    console.log(editedByProfiles)
    function getUserProfile(userData){
        console.log(data)
        console.log(userData)
        let userProfileDataa
        if (userData !== null){
            // allauth.getUserProfile(userData).then((resp) => {return resp})
            const test = allauth.getUserProfile(userData)
            // await allauth.getUserProfile(userData).then((resp) => {
            //     // setUserProfile(resp)
            //     console.log(resp)
            //     userProfileDataa = resp
                
            //     // return resp
            // })
            // return userProfileDataa
            console.log(test)
            return test
            // return userProfileDataa
            // return allauth.getUserProfile(userData).
        }else{
            return null
        }
        
    }

    function handlePageClick(page){
        setPageStatus(page)
        console.log(pageStatus)
    }

    useEffect(() => {
        setResponse((r) => { return { ...r, fetching: true } })
        allauth.isResearchManager(user.email).then((resp) => {
            console.log(resp)
            if (resp.status === '200') {
                // setStatus(resp.status)
                console.log('is manager')
                setUserIsManager(true)

            }
        }).catch((e) => {
            console.error(e)
            window.alert(e)
          }).then(() => {
            setResponse((r) => { return { ...r, fetching: false } })
          })
        if (userIsManager === false){
            console.log('not manager checking for auditor')
            allauth.isResearchAuditor(user.email).then((resp) => {
                console.log(resp)
                if (resp.status === '200') {
                    // setStatus(resp.status)
                    console.log('is auditor')
                    setUserIsAuditor(true)

                }
            }).catch((e) => {
                console.error(e)
                window.alert(e)
            }).then(() => {
                setResponse((r) => { return { ...r, fetching: false } })
            })
        }
      }, [])
   

    useEffect(() => {
        setResponse((r) => { return { ...r, fetching: true } })
        if (data === undefined){
            allauth.checkPerfumeEditsWithID(location.pathname.split('/')[3]).then((resp) => {
                console.log(resp)
                // Currently if an edit isnt foun the entire function is fucked so If i get an error skip all this
                if (resp.error){
                    setEditedData(null)
                }else{
                    setData(resp.original_data[0])
                    setEditedData(resp.edited_data)
                    // console.log(getUserProfile(resp.edited_data[0].edited_by.id))
                    for (let i in resp.edited_data){
                        console.log(resp.edited_data[i])
                        console.log(getUserProfile(resp.edited_data[i].edited_by.id))
                        let something
                        getUserProfile(resp.edited_data[i].edited_by.id)?.then((resp) => {something = resp})
                        setEditedByProfiles(
                            [
                                ...editedByProfiles,
                                {
                                    id: resp.edited_data[i].edited_by.id,
                                    profileData: something,
                                }
                            ]
                        )
                    }
                    // userData[0].edited_by.id
                    
                    setConfirmationStatus(resp.original_data[0].confirmed_by)
                    setStatus('200')
                }
                
            }).catch((e) => {
                console.error(e)
                window.alert(e)
              }).then(() => {
                setResponse((r) => { return { ...r, fetching: false } })
              })
        
        }
      }, [])
      console.log(editedByProfiles)
      useEffect(() => {
        console.log(confirmationStatus)
        console.log('ran')
        console.log(data)
        if (confirmationStatus !== null){
            allauth.getUserProfile(confirmationStatus).then((resp) => {
                setConfirmedByProfile(resp)
                console.log(resp)
            })
        }
        
      }, [editedData])

    useEffect(() => {
        setTotalRevisions(revisions.length)
    }, [revisions])

    function handleReviseClick(){
        setInformationState('revised')
    }

    function handleOriginalClick(){
        setInformationState('original')
    }

    const checkForRevisions = () => {
        // const revisions = []
        // setTotalRevisions(0)

        
        if (editedData !== null && editedData[0] !== undefined){
            console.log(editedData)
            // Need to check if there are multiple users who edited if there is, get their id from the array and if the edited_by id matches the user in the list use that user to display the edit
            // Same thing with editedData I need to have a way to store edits and then read them and check the edited_by id while also getting all changes from the edits
            // Need to have some way to make it so when you goto edit the data and maybe change something someone else edited already to display both users changes 
            // (this might already happen depending if im thinking right or it will only display the one users new edit which is also fine)
            for (let i in editedData){
                if (data.perfume !== editedData[i].edited_perfume){
                    // console.log(editedByProfiles)
                    revisions.push(<RevisionDisplay originalData={data.perfume} revisedData={editedData[0].edited_perfume} editedBy={editedByProfiles[i]}/>)
                }
                if (data.perfume !== editedData[i].edited_perfume){
                    
                    revisions.push(<RevisionDisplay originalData={data.perfume} revisedData={editedData[0].edited_perfume} editedBy={editedByProfiles[i]}/>)
                }
                if (data.brand !== editedData[i].edited_brand){
                    revisions.push(<RevisionDisplay originalData={data.brand} revisedData={editedData[0].edited_brand} editedBy={editedByProfiles[i]}/>)
                }
                if (data.release_data !== editedData[i].edited_release_data){
                    revisions.push(<RevisionDisplay originalData={data.release_data} revisedData={editedData[0].edited_release_data} editedBy={editedByProfiles[i]}/>)
                }
            }
                
            
            
        }else{
            return revisions
        }
        return revisions
        
        
        
        
    }
    // console.log(confirmedByProfile)
    return(
        <section>
            {status === '404' ? <NotFound/> : <div></div>}
            {checkForRevisions().map((test) => (test))}

            {/* {userIsManager} */}

            
            
            <div>total changes: {totalRevisions}</div>
            {totalRevisions === 0 ? <div></div> : <Button onClick={handleReviseClick}>Revised</Button>}
            
            <Button onClick={handleOriginalClick}>Original</Button>
            <Button onClick={() => {
                handlePageClick('Overview')
            }}>Overview</Button>
            <Button onClick={() => {
                handlePageClick('Sources')
            }}>Sources</Button>
            <Button onClick={() => {
                handlePageClick('Discussion')
            }}>Discussion</Button>
            {/* <TableHeaderWithTabs handlePageClick={handlePageClick}/> */}
            <ProposeDiscussion perfume={data}/>
            {/* <AddSource perfume={data} posted_by={confirmedByProfile}/> */}
            {pageStatus === "Overview" ? <div>Info</div> : (pageStatus === 'Sources' ? <ListSources perfume={data}/> : <div></div>)}
            {informationState === 'revised' ? <RevisedDataTable data={data}/> : <OriginalDataTable data={editedData}/>}
            {confirmationStatus !== null ? (confirmedByProfile === null) ? <div>null profile</div> : <ConfirmedByDisplay confirmed_by={confirmedByProfile}/> : <div>null</div>}
            {confirmationStatus === null ? (userIsManager) ? <ProposalManagerView handleClick={handleConfirm}/> : (userIsAuditor) ? <ProposalAuditorView handleClick={handleConfirm}/> : <div></div> : <div></div>}
            
            
            {/* <Button onClick={handlePageClick('Sources')}>Sources</Button>
            <Button onClick={handlePageClick('Discussion')}>Discussion</Button> */}
            
            
            {/* <ConfirmedByDisplay confirmed_by={userProfile}/> */}
            {/* {userIsManager ? <ProposalManagerView handleClick={handleConfirm}/> : (userIsAuditor) ? <ProposalAuditorView handleClick={handleConfirm}/> : <div></div>} */}
        </section>
    )
}

// checkPerfumeEdits