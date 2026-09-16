import { Label } from "flowbite-react";
import AutoCompletePerfumeSearchNoLink from "./AutoCompletePerfumeSearchNoLink";
import { useEffect, useState } from "react";
import { addFragranceToCustomCollection, checkForPerfumeInUserCollection, checkForPerfumeInUserCustomCollection, updateUserCollection } from "../../lib/allauth";
// import { update } from "lodash";


export default function AddFragranceToCollection({currentCollection, userData, refreshData, customCollection}){
    // Display the auto complete search get the selected value and the collection its in then send a put request to backend updating the collection with the new perfume
    const [chosenPerfume, setChosenPerfume] = useState(null)
    const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })
    const [chosenPerfumeStatus, setChosenPerfumeStatus] = useState(false)
    console.log(customCollection)
    useEffect(() => {
        if (chosenPerfume !== null){
            if(currentCollection === 'custom'){
                checkForPerfumeInUserCustomCollection({user: userData.id, perfume:chosenPerfume.id}).then((resp) => {
                    console.log(resp)
                    if (resp.error){
                        setChosenPerfume(null)
                        console.log('eror')
                    }else{
                        console.log(resp)
                        addFragranceToCustomCollection({user:userData.id, perfume:chosenPerfume.id, collection_id:customCollection.id}).then((resp) => {
                            console.log(resp)
                            if (resp.status === '200'){
                                console.log('got 200 on collection update')
                                console.log(resp)
                                refreshData(chosenPerfume.id)
                                // setTitle(resp.title)
                                // setReview(review.title)
                                // setScentAssociations(review.scent_associations)
                                // setStatus('200')
                                // refreshData(true)
                                
                            }
                        }).catch((e) => {
                            console.error(e)
                            window.alert(e)
                          }).then(() => {
                            setResponse((r) => { return { ...r, fetching: false } })
                            
                          })

                        // setUserCollection(resp)
                        // setStatus('200')
                    }
                    
        
                }).catch((e) => {
                    console.error(e)
                    window.alert(e)
                }).then(() => {
                    setResponse((r) => { return { ...r, fetching: false } })
                    
                })
            }else{
                checkForPerfumeInUserCollection({user: userData.id, perfume:chosenPerfume.id, fields: [currentCollection]}).then((resp) => {
                    console.log(resp)
                    // Here the error is thrown when the perfume isnt in the users collection already
                    if (resp.error){
                        // Call the put request to add the perfume to the users collection with the selected field/category
                        // user, perfume, field, field_status
                        updateUserCollection({user:userData.id, perfume:chosenPerfume.id, field:currentCollection, field_status:true}).then((resp) => {
                            console.log(resp)
                            if (resp.status === '200'){
                                console.log('got 200 on collection update')
                                console.log(resp)
                                refreshData(chosenPerfume.id)
                                // setTitle(resp.title)
                                // setReview(review.title)
                                // setScentAssociations(review.scent_associations)
                                // setStatus('200')
                                // refreshData(true)
                                
                            }
                        }).catch((e) => {
                            console.error(e)
                            window.alert(e)
                          }).then(() => {
                            setResponse((r) => { return { ...r, fetching: false } })
                            
                          })
                    }else{
                        console.log(resp)
                        setChosenPerfume(null)
                        // setUserCollection(resp)
                        // setStatus('200')
                    }
                    
        
                }).catch((e) => {
                    console.error(e)
                    window.alert(e)
                }).then(() => {
                    setResponse((r) => { return { ...r, fetching: false } })
                    
                })
            }
            
        }
        
    },[chosenPerfume])
    console.log(userData)
    console.log(chosenPerfume)
    console.log(currentCollection)
    // const setSearchResponse = (query) => {
    //     setChosenPerfume(query)
    // }
    // function setSearchResponse(query){
    //     setChosenPerfume(query)
    // }

    return(
        <section>
            <div>
                <Label>Please enter the name of the perfume you would like to add to the collection</Label>
                <AutoCompletePerfumeSearchNoLink setSearchData={setChosenPerfume}/>
                {/* {chosenPerfume !== null && chosenPerfumeStatus ? }  */}
            </div>

        </section>
    )
}