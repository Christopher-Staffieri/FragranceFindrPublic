import { ChangeEvent, useState, FormEvent } from "react";
import { signUp } from '../lib/allauth'
import { 
    RegExpMatcher,
    englishDataset,
    englishRecommendedTransformers,
} from "obscenity";

export default function useSignup() {

    const matcher = new RegExpMatcher({
        ...englishDataset.build(),
        ...englishRecommendedTransformers,
    });

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: '',
        re_password: '',
        country: '',
        gender: '',
    });

    const [password2Errors, setPassword2Errors] = useState([])
    const [usernameErrors, setUsernameErrors] = useState([])
    const [response, setResponse] = useState({ fetching: false, content: null })

    const { first_name, last_name, email, username, password, re_password, country, gender } = formData;

    const onChange = (event) => {
        console.log(event)
        if (typeof event.target !== 'undefined'){
            const { name, value } = event.target;
            console.log(name)
            console.log(value)
        
            setFormData({...formData, [name]: value});
            console.log(formData)
        }else{
            const name = event.field
            const value = event.value
            setFormData({...formData, [name]: value});
            console.log(formData)
            
        }
        
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (re_password !== password) {
            setPassword2Errors([{ param: 're_password', message: 'Password does not match.' }])
            return
        }
        if (matcher.hasMatch(username)){
            setUsernameErrors([{param: 'username', message: 'Sorry profanity isnt allowed please try a different username'}])
            return usernameErrors
        }
        if (username.length < 4){
            setUsernameErrors([{param: 'username', message: 'Sorry usernames must be atleast 4 letters'}])
            return usernameErrors
        }

        setPassword2Errors([])
        setResponse({ ...response, fetching: true })
        signUp({ email, username: username,  password: password, first_name: first_name, last_name: last_name, gender: gender, country: country }).then((content) => {
        setResponse((r) => { return { ...r, content } })
        }).catch((e) => {
        console.error(e)
        window.alert(e)
        }).then(() => {
        setResponse((r) => { return { ...r, fetching: false } })
        })
  }
  return { 
    first_name, 
    last_name, 
    email, 
    username, 
    password, 
    re_password, 
    country, 
    gender,
    response,
    onChange,
    onSubmit,
  }

}