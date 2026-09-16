import { useEffect, useState } from "react"
import { getPerfumeRatings } from "../../lib/allauth"
import { Button, Label } from "flowbite-react"
import RatePerfumeForm from "./RatePerfumeForm"
import StarRating from "../../components/database/common/StarRating"
import Reviews from "./Reviews"
import Statements from "./Statements"
import Collections from "./Collections"
import ClassifyFragrance from "./Classifications/ClassifyFragrance"
import FragranceNotes from "./FragranceNotes/FragranceNotes"
import DisplayReviews from "./DisplayReviews"
import SubscribeToFragrance from "./Subscribe/SubscribeToFragrance"
import { useAuthInfo } from "../../auth/hooks"


export default function PerfumeInfoView(perfumeData){
    const userAuthStatus = useAuthInfo()
    // console.log(user)
    const requiredPerfumeData = perfumeData.perfumeData.perfumeData
    console.log(requiredPerfumeData)
    // console.log(requiredPerfumeData.release_data)
    const [status, setStatus] = useState()
    const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })
    const [ratingFormStatus, setRatingFormStatus] = useState(false)
    const [tabStatus, setTabStatus] = useState()

    useEffect(() => {
        setResponse((r) => { return { ...r, fetching: true } })
            getPerfumeRatings(requiredPerfumeData.id).then((resp) => {
            console.log(resp)
            if (resp.status === '200') {
                setStatus(resp.status)
            }
        }).catch((e) => {
            console.error(e)
            window.alert(e)
          }).then(() => {
            setResponse((r) => { return { ...r, fetching: false } })
          })
    },[])

    const handleRateClick = () => {
        if (ratingFormStatus){
            setRatingFormStatus(false)
        }else{
            setRatingFormStatus(true)
        }
    }

    const handleTabClick = (tab) => {
        setTabStatus(tab)
    }

    return(
        <section>
            <div id="relase-date">
                {requiredPerfumeData.release_data}
            </div>
            <div>
                {requiredPerfumeData.perfume}
            </div>
            <div id='brand'>
                {requiredPerfumeData.brand}
            </div>

            <div>
                <Button onClick={() => handleRateClick()}>Rate Perfume</Button>
            </div>

            <Button.Group>
                {}
                <Button onClick={() => setTabStatus('Subscribe')}>Subscribe</Button>
                <Button onClick={() => setTabStatus('User_Collection')}>Collection</Button>
                <Button onClick={() => setTabStatus('Rate_Perfume')}>Rate</Button>
                <Button onClick={() => setTabStatus('Review_Perfume')}>Review</Button>
                <Button onClick={() => setTabStatus('Perfume_Statement')}>Statement</Button>
                <Button>Photo</Button>
                <Button>Inspiration</Button>
                <Button onClick={() => setTabStatus('Classification')}>Classify</Button>
                <Button onClick={() => setTabStatus('Notes')}>Notes</Button>
                <Button>Research</Button>
            </Button.Group>
            {userAuthStatus.isAuthenticated 
                ? 
                    (tabStatus === 'Subscribe' ? <SubscribeToFragrance perfumeId={requiredPerfumeData.id}/> : null) ||
                    (tabStatus === 'Review_Perfume' ? <Reviews perfumeId={requiredPerfumeData.id}/> : null) ||
                    (tabStatus === 'Rate_Perfume' ? <RatePerfumeForm perfumeId={requiredPerfumeData.id}/> : null) ||
                    (tabStatus === 'Perfume_Statement' ? <Statements perfumeId={requiredPerfumeData.id}/> : null) ||
                    (tabStatus === 'User_Collection' ? <Collections perfumeId={requiredPerfumeData.id}/> : null) ||
                    (tabStatus === 'Classification' ? <ClassifyFragrance perfumeId={requiredPerfumeData.id}/> : null) ||
                    (tabStatus === 'Notes' ? <FragranceNotes perfumeId={requiredPerfumeData.id}/> : null) 
                :   (<Label>Please login</Label>)
            }
            {/* {tabStatus === 'Subscribe' ? <SubscribeToFragrance perfumeId={requiredPerfumeData.id}/> : null} */}
            
            <DisplayReviews perfume={requiredPerfumeData.id}/>
            {/* {ratingFormStatus ? <RatePerfumeForm perfumeId={requiredPerfumeData.id}/> : <div></div>} */}

        </section>
    )
}