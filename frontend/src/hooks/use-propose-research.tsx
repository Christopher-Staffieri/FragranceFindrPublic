import { ChangeEvent, useState, FormEvent } from "react";
import { addResearch } from '../lib/allauth'

export default function useProposeResearch() {

    const [formData, setFormData] = useState({
        perfume: '',
        brand: '',
        brand_other: '',
        release_data: '',
        gender: '',
        availability: '',
        limited: '',
        varient: '',
        collectors: '',
        interesting_facts: '',
        sources: '',
        additional_information: '',
        youtube_link: '',
        additional_link: '',
        proposed_by: '',
        status: '',
        status_key: 1,
        pending: 1,
        
    });

    const [password2Errors, setPassword2Errors] = useState([])
    const [response, setResponse] = useState({ fetching: false, content: null })

    const {perfume, brand, brand_other, release_data, gender, availability, limited,  varient,  collectors,  interesting_facts,
             sources, additional_information, youtube_link,  additional_link, proposed_by, status, pending
     } = formData;

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        
        setFormData({...formData, [name]: value});
        console.log(formData)
    }
    const setUser = (id) => {
      setFormData({...formData, ['proposed_by']: id});
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
        addResearch({perfume:  perfume ,  brand:  brand,   release_data:  release_data,  gender:  gender,  availability:  availability,  limited:  limited,  varient:  varient, 
             collectors:  collectors,  interesting_facts:  interesting_facts,  youtube_link: youtube_link,  additional_link: additional_link, proposed_by: proposed_by, status: status, pending:pending
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

    perfume, 
    brand, 
    release_data, 
    gender, 
    availability, 
    limited, 
    varient, 
    collectors, 
    interesting_facts,
    youtube_link, 
    additional_link, 
    proposed_by,
    status,
    response,
    onChange,
    onSubmit,
    setUser,
 
  }

}