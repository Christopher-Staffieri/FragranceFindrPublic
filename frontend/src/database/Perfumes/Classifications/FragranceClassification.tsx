import { Button, ButtonGroup, Label } from "flowbite-react";
// import { section } from "framer-motion/client";
// import { use } from "framer-motion/client";
import { useEffect, useState } from "react";
import { createUserPerfumeClassification, updateUserFragranceClassification } from "../../../lib/allauth";
import { fragranceCategorys, occasionCategorys, seassonCategorys, styleCategorys } from "./ClassificationOptions";

export default function FragranceClassification({user, perfumeId, classificationData, classificationStatus}){
    const [updateStatus, setUpdateStatus] = useState(classificationStatus)

    const [occasion, setOccasion] = useState([])
    const [season, setSeason] = useState([])
    const [style, setStyle] = useState([])
    const [fragranceCategory, setFragranceCategory] = useState([])
    
    const [callback, setCallback] = useState(false)
   
    useEffect(() => {
        if (callback){
            handleStateChange()
            setCallback(false)
        }
    }, [callback])

    useEffect(() => {
        if (classificationData !== null){
            setOccasion(classificationData.occasion ?? []) 
        }else{
            setOccasion([])
        }

        if (classificationData !== null){
            setSeason(classificationData.season ?? []) 
        }else{
            setSeason([])
        }

        if (classificationData !== null){
            setStyle(classificationData.style ?? []) 
        }else{
            setStyle([])
        }

        if (classificationData !== null){
            setFragranceCategory(classificationData.type ?? []) 
        }else{
            setFragranceCategory([])
        }

    },[])
    


    const handleClick = (section, value) => {
        switch(section){
            case 'Occasion':
                // console.log('ran')
                if(occasion.includes(value)){
                    // call update to remove so remove data then call update function. 
                    setOccasion(previousValues => {
                        // filters everything but the given value to ensure it is removed
                        return previousValues.filter(data => data !== value)
                    })
                    // console.log(occasion)
                    // console.log('removing')
                }else{
                    // console.log('ran')
                    setOccasion([...occasion, value])
                }
                // console.log('ran state change')
                setCallback(true)
                break
            case 'Fragrance Category':
                if(fragranceCategory.includes(value)){
                    // call update to remove so remove data then call update function. 
                    setFragranceCategory(previousValues => {
                        // filters everything but the given value to ensure it is removed
                        return previousValues.filter(data => data !== value)
                    })
                    // console.log(fragranceCategory)
                    // console.log('removing')
                }else{
                    console.log('ran')
                    setFragranceCategory([...fragranceCategory, value])
                }
                // console.log('ran state change')
                setCallback(true)
                break
            case 'season':
                if(season.includes(value)){
                    // call update to remove so remove data then call update function. 
                    setSeason(previousValues => {
                        // filters everything but the given value to ensure it is removed
                        return previousValues.filter(data => data !== value)
                    })
                    // console.log(season)
                    // console.log('removing')
                }else{
                    // console.log('ran')
                    setSeason([...season, value])
                }
                // console.log('ran state change')
                setCallback(true)
                break
            case 'Season':
                if(season.includes(value)){
                    // call update to remove so remove data then call update function. 
                    setSeason(previousValues => {
                        // filters everything but the given value to ensure it is removed
                        return previousValues.filter(data => data !== value)
                    })
                    // console.log(season)
                    // console.log('removing')
                }else{
                    // console.log('ran')
                    setSeason([...season, value])
                }
                // console.log('ran state change')
                setCallback(true)
                break
            case 'Style':
                if(style.includes(value)){
                    // call update to remove so remove data then call update function. 
                    setStyle(previousValues => {
                        // filters everything but the given value to ensure it is removed
                        return previousValues.filter(data => data !== value)
                    })
                    // console.log(style)
                    // console.log('removing')
                }else{
                    // console.log('ran')
                    setStyle([...style, value])
                }
                // console.log('ran state change')
                setCallback(true)
                break
            
            default:
                console.log('error')
                break
                
                
        }

    }

    const handleStateChange = () => {
        if (updateStatus){
            console.log('upadting')
            updateUserFragranceClassification({user: user.profile, perfume: perfumeId.perfumeId, occasion: occasion, season:season, style:style, type:fragranceCategory}).then((resp) => {
                console.log(resp)
                // Here the error is thrown when the perfume isnt in the users collection already
                if (!resp.error){
                    // setUpdateStatus(true)
                    console.log(resp)
                }else{
                    console.log('error') 
                }
            })
        
        }else{
            console.log('creating')
            // console.log(occasion)
            createUserPerfumeClassification({user: user.profile, perfume: perfumeId.perfumeId, occasion: occasion, season:season, style:style, type:fragranceCategory}).then((resp) => {
                console.log(resp)
                // Here the error is thrown when the perfume isnt in the users collection already
                if (!resp.error){
                    setUpdateStatus(true)
                    console.log(resp)
                }else{
                    console.log('error') 
                }
            })
        }
    }
    
    return(
        <section>
            
            <div>
                <Label>Occasion</Label>
                <ButtonGroup>
                    {occasionCategorys.map((category) => {
                        if (occasion.includes(category)){
                            return (
                                <Button className="bg-backgroundDark-500" key={category} onClick={() => handleClick('Occasion', category)}>{category}</Button>
                            )
                        }else{
                            return (
                                <Button key={category} onClick={() => handleClick('Occasion', category)}>{category}</Button>
                            )
                        }
                        
                    })}
                </ButtonGroup>
            </div>
            <div>
                <Label>Season</Label>
                    <ButtonGroup>
                        {seassonCategorys.map((category) => {
                        if (season.includes(category)){
                            return (
                                <Button className="bg-backgroundDark-500" key={category} onClick={() => handleClick('Season', category)}>{category}</Button>
                            )
                        }else{
                            return (
                                <Button key={category} onClick={() => handleClick('Season', category)}>{category}</Button>
                            )
                        }
                        
                        })}
                    </ButtonGroup>
            </div>
            <div>
                <Label>Style</Label>
                    <ButtonGroup>
                        {styleCategorys.map((category) => {
                            if (style.includes(category)){
                                return (
                                    <Button className="bg-backgroundDark-500" key={category} onClick={() => handleClick('Style', category)}>{category}</Button>
                                )
                            }else{
                                return (
                                    <Button key={category} onClick={() => handleClick('Style', category)}>{category}</Button>
                                )
                            }
                        
                        })}
                    </ButtonGroup>
            </div>
            <div>
                <Label>Fragrance Category</Label>
                <ButtonGroup>
                    {fragranceCategorys.map((category) => {
                        if (fragranceCategory.includes(category)){
                            return (
                                <Button className="bg-backgroundDark-500" key={category} onClick={() => handleClick('Fragrance Category', category)}>{category}</Button>
                            )
                        }else{
                            return (
                                <Button key={category} onClick={() => handleClick('Fragrance Category', category)}>{category}</Button>
                            )
                        }
                        
                    })}
                </ButtonGroup>
            </div>
        </section>
    )
}