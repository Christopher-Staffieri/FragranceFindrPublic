import { Avatar, Button, RangeSlider } from 'flowbite-react'
import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { FileInput, Label } from "flowbite-react"; 
import ChangeProfilePicture from '../components/common/ChangeProfilePicture';
import { levelColors } from "../json/LevelColors";
import UserNotifications from './UserNotifications';
export default function OwnedProfile(profile){
    console.log(profile.profile)
    return(
        <section>
            <ChangeProfilePicture profile={profile}/>
            <Avatar img={profile.profile.profile_picture} rounded bordered color={levelColors[profile.profile.level]}/>
            <UserNotifications/>
        </section>
    )
}