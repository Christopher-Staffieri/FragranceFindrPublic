import { Autocomplete, TextField } from "@mui/material";
import { useCallback, useState } from "react";
// import debounce from "@mui/material";
import * as allauth from '../../lib/allauth'
// import { debounce } from "lodash";
import debounce from 'lodash/debounce';
import { TextInput } from "flowbite-react";
import { Router, useNavigate } from "react-router-dom";

export default function AutoCompletePerfumeSearch(){
    const navigate = useNavigate()
    const [options, setOptions] = useState([]);
    // const [inputValue, setInputValue] = useState('')
    const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })
    console.log(options)
    const fetchOptions = useCallback(
        debounce(async (inputValue) => {
            
                allauth.getPerfumes({input:inputValue}).then((resp) => {
                    console.log(resp)
                    if (resp.message){
                        console.log('got message')
                        console.log(resp.data)
                        setOptions(resp.data)
                    }else{
                        setOptions(resp)
                    }
                    
                }).catch((e) => {
                    console.error(e)
                    window.alert(e)
                  }).then(() => {
                    setResponse((r) => { return { ...r, fetching: false } })
                    
                  })
        }, 300),
        []
    )
    

        const handlePerfumeSelect = (event, value) => {
            
            if (value){
                console.log(value)
                // navigate('/database/perfumes/value')
                navigate(`/database/perfumes/${value.perfume}`)
            }
        }
    
    
    

    return(
        <Autocomplete
            onChange={handlePerfumeSelect}
            options={options}
            getOptionLabel={(option) => option.perfume}
            onInputChange={(event, newValue) => {
                if (newValue){
                    fetchOptions(newValue)
                }
            }}
            renderInput={(params) => <TextField {...params}/>}
        />
    )
}