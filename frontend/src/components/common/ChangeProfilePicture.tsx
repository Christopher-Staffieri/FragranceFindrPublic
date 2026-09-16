import { Button, RangeSlider } from 'flowbite-react'
import { useState, useCallback, useEffect } from 'react'
import Cropper from 'react-easy-crop'
import { FileInput, Label } from "flowbite-react"; 
import { changePFP } from '../../lib/allauth';

export default function ChangeProfilePicture(profile){
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [currentImage, setCurrentImage] = useState('https://imgur.com/kpY2JeY.png') // Set image to profile image
    const [imagePath, setImagePath] = useState()
    const [croppedData, setCroppedData] = useState()
    const [cropperStatus, setCropperStatus] = useState(false)
    const [status, setStatus] = useState('')
    const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })
    const [canChangeStatus, setCanChangeStatus] = useState(true)
    // const [uploadedImage, setUploadedImage] = useState()
    console.log(profile.profile.profile.id)
    
    const profileChangePeriod = () => {
        const currentDate = new Date()
        const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`
        const updatedLast = new Date(profile.profile.profile.last_profile_picture_change)
        const timeDiff = currentDate - updatedLast
        const daysDifference = timeDiff / (1000 * 3600 * 24);
        return daysDifference
    }

    useEffect(() => {
        if (profile.profile.profile.level >= 150){
            setCanChangeStatus(true)
        }
        else if (profileChangePeriod !== null && profileChangePeriod() !== 14){
            setCanChangeStatus(false) 
        }else{
            setCanChangeStatus(true)
        }
    }, profile)

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedData(croppedAreaPixels)
        console.log(croppedArea, croppedAreaPixels)
      }

    
    const onFileChange = (event) => {

        profileChangePeriod()
        if (event.target.value && event.target.value.length > 0){
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0])
            reader.addEventListener('load', () => {
                setImagePath(reader.result)
                setCurrentImage(reader.result.replace("data:", ""))
            })
            setCropperStatus(true)
    }
    }

    const handleConfirm = () => {
        // All logic for django request
        const currentDate = new Date()
        const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`
       
        
        setResponse({ ...response, fetching: true })
            console.log('ran')
            changePFP({user: profile.profile.profile.id , profile_picture: currentImage,  last_profile_picture_change: formattedDate})
            .then((content) => {
                setCropperStatus(false)
                setResponse((r) => { return { ...r, content } })
            }).catch((e) => {
            console.error(e)
            window.alert(e)
            }).then(() => {
            setResponse((r) => { return { ...r, fetching: false } })
            })
    }
    

    return(
        <section>
            <div>
                
                {cropperStatus ? <Cropper
                    image={imagePath}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    cropShape={'round'}
                    /> : <div> </div>}
                
                {cropperStatus ? <RangeSlider max={3} min={1} step={0.1} value={zoom} onChange={(event) => setZoom(event.target.value)}/> : <div></div>}
                
                {cropperStatus ? <Button onClick={handleConfirm}>Confirm</Button> : <div></div>}
            </div>
            <div className="mb-2 block">
                <Label htmlFor="file-upload" value="Upload file" />
            </div>
            {canChangeStatus ? (profile.profile.profile.level >= 200) ? <FileInput accept='image/*' id="file-upload" onChange={onFileChange}/> : <FileInput accept='image/.jpg,.png,.svg' id="file-upload" onChange={onFileChange}/> : <FileInput disabled id="file-upload" onChange={onFileChange}/>}
            
        </section>
    )
}