import { ChangeEvent, useState, FormEvent } from "react";
import { composeEdits } from '../lib/allauth'

export default function useComposeEdits() {

    const [formData, setFormData] = useState({
        selected_perfume: '',
        edited_perfume: '',
        edited_brand: '',
        edited_release_data: '',
        edited_gender: '',
        edited_availability: '',
        edited_limited: '',
        edited_varient: '',
        edited_collectors: '',
        edited_interesting_facts: '',
        edited_sources: '',
        edited_additional_information: '',
        edited_youtube_link: '',
        edited_additional_link: '',
        edited_status: '',
        edited_by: '',
    });

    const [password2Errors, setPassword2Errors] = useState([])
    const [response, setResponse] = useState({ fetching: false, content: null })

    const {selected_perfume, edited_perfume, edited_brand, edited_release_data, edited_gender, edited_availability, edited_limited, edited_varient, edited_collectors, edited_interesting_facts,
            edited_youtube_link, edited_additional_link, edited_status, edited_by
     } = formData;

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        
        setFormData({...formData, [name]: value});
        console.log(formData)
    }

    const setData = (name, value) => {
        setFormData({...formData, [name]: value});
        console.log(formData)
    }

    const setSelected = (id, userId) => {
        console.log(id)
        console.log(userId)
        
        // setData('edited_by', userId)
        // setFormData({...formData, ['edited_by']: userId});
        setFormData({...formData, ['selected_perfume']: id, ['edited_by']: userId});
        console.log(formData)
    }
   

    const onSubmit = () => {
        // event.preventDefault();
        // if (re_password !== password) {
        //     setPassword2Errors([{ param: 're_password', message: 'Password does not match.' }])
        //     return
        // }
        // setPassword2Errors([])
        setResponse({ ...response, fetching: true })
        composeEdits({selected_perfume:selected_perfume, edited_perfume: edited_perfume , edited_brand: edited_brand,  edited_release_data: edited_release_data, edited_gender: edited_gender, edited_availability: edited_availability, edited_limited: edited_limited, edited_varient: edited_varient, 
            edited_collectors: edited_collectors, edited_interesting_facts: edited_interesting_facts, edited_youtube_link:edited_youtube_link, edited_additional_link:edited_additional_link, edited_status:edited_status, edited_by:edited_by
        }).then((content) => {
        setResponse((r) => { return { ...r, content } })
        }).catch((e) => {
        console.error(e)
        window.alert(e)
        }).then(() => {
        setResponse((r) => { return { ...r, fetching: false } })
        })
  }

  return { 
    selected_perfume,
    edited_perfume, 
    edited_brand, 
    edited_release_data, 
    edited_gender, 
    edited_availability, 
    edited_limited, 
    edited_varient, 
    edited_collectors, 
    edited_interesting_facts,
    edited_youtube_link, 
    edited_additional_link, 
    edited_status,
    edited_by,
    response,
    onChange,
    onSubmit,
    setSelected,
  }

}