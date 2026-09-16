import { Button, Label } from "flowbite-react";
import StarRating from "../../components/database/common/StarRating";
import { useUser } from "../../auth";
import { useState, useEffect } from "react";
import { checkUserPerfumeRating } from "../../lib/allauth";
import StarRatingEdit from "../../components/database/common/StarRatingEdit";


export default function RatePerfumeForm(perfumeId){
    const user = useUser()
    const [userRatingData, setUserRatingData] = useState(null)
    const [status, setStatus] = useState('')
    const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })
    console.log(perfumeId)
    console.log(user)

    useEffect(() => {
         setResponse((r) => { return { ...r, fetching: true } })
             checkUserPerfumeRating({perfume_id:perfumeId.perfumeId, user_id:user.profile}).then((resp) => {
                 console.log(resp)
                 setUserRatingData(resp)
                 setStatus('200')
 
             }).catch((e) => {
                 console.error(e)
                 window.alert(e)
               }).then(() => {
                 setResponse((r) => { return { ...r, fetching: false } })
                 
               })
 
       }, [])
    
    console.log(userRatingData)

    return(
        <section>
            <div>
                <Label>Scent</Label>
                {userRatingData === null || userRatingData === undefined || userRatingData.error ? <StarRating perfumeId={perfumeId} user={user} ratedData={null} categoryToRate='scent_rating'/> : <StarRating perfumeId={perfumeId} user={user} ratedData={userRatingData[0].scent_rating} categoryToRate='scent_rating'/>}
            </div>
            <div>
                <Label>Sillage</Label>
                {userRatingData === null || userRatingData === undefined || userRatingData.error ? <StarRating perfumeId={perfumeId} user={user} ratedData={null} categoryToRate='sillage_rating'/> : <StarRating perfumeId={perfumeId} user={user} ratedData={userRatingData[0].sillage_rating} categoryToRate='sillage_rating'/>}
            </div>
            <div>
                <Label>Longevity</Label>
                {userRatingData === null || userRatingData === undefined || userRatingData.error ? <StarRating perfumeId={perfumeId} user={user} ratedData={null} categoryToRate='longevity_rating'/> : <StarRating perfumeId={perfumeId} user={user} ratedData={userRatingData[0].longevity_rating} categoryToRate='longevity_rating'/>}
            </div>
            <div>
                <Label>Bottle</Label>
                {userRatingData === null || userRatingData === undefined || userRatingData.error ? <StarRating perfumeId={perfumeId} user={user} ratedData={null} categoryToRate='bottle_rating'/> : <StarRating perfumeId={perfumeId} user={user} ratedData={userRatingData[0].bottle_rating} categoryToRate='bottle_rating'/>}
            </div>
            <div>
                <Label>Price</Label>
                {userRatingData === null || userRatingData === undefined || userRatingData.error ? <StarRating perfumeId={perfumeId} user={user} ratedData={null} categoryToRate='price_rating'/> : <StarRating perfumeId={perfumeId} user={user} ratedData={userRatingData[0].price_rating} categoryToRate='price_rating'/>}
            </div>
        </section>
    )
}