import { ChangeEvent, useState, FormEvent } from "react";
import { postFragranceNote } from '../lib/allauth'

export default function useProposeNote() {

    const [formData, setFormData] = useState({
        note: '',
        status: 'pending',
        category: '',
        description: '',
        image: null,
        proposed_by: '',
        
    });

    // const [password2Errors, setPassword2Errors] = useState([])
    const [response, setResponse] = useState({ fetching: false, content: null })

    const {note, status, category, description, image, proposed_by} = formData;

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
        postFragranceNote({note: note , status: status, category: category, description: description, image: image, proposed_by: proposed_by,}).then((content) => {
        setResponse((r) => { return { ...r, content } })
        }).catch((e) => {
        console.error(e)
        // window.alert(e)
        }).then(() => {
        setResponse((r) => { return { ...r, fetching: false } })
        })
  }

  return { 
    note, 
    status, 
    category, 
    description, 
    image, 
    proposed_by, 
    response,
    onChange,
    onSubmit,
    setUser,
 
  }

}