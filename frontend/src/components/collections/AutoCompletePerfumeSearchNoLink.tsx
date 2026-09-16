import { getPerfumes } from "../../lib/allauth";
import debounce from 'lodash/debounce';
import { Autocomplete, TextField } from "@mui/material";
import { useCallback, useState } from "react";

export default function AutoCompletePerfumeSearchNoLink({setSearchData}){

    // const navigate = useNavigate()
    const [options, setOptions] = useState([]);
    // const [inputValue, setInputValue] = useState('')
    const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })
    console.log(options)
    const fetchOptions = useCallback(
        debounce(async (inputValue) => {
            
                getPerfumes({input:inputValue}).then((resp) => {
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
                setSearchData(value)
                // navigate('/database/perfumes/value')
                // navigate(`/database/perfumes/${value.perfume}`)
            }
        }
    
    
    

    return(
        <Autocomplete
            onChange={(event, value) => {
                handlePerfumeSelect(event, value)
            }}
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