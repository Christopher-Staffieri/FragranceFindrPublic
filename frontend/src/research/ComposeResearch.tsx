import { Button, Label, TextInput } from "flowbite-react";
import { addResearch } from "../lib/allauth";
import { useEffect, useState } from "react";
import { getPerfumes } from "../lib/requests";
import { Autocomplete, TextField } from "@mui/material";
// import { ProposeResearchModal } from "../components/research/ProposeResearch";

import ProposeResearchModal from "../components/research/ProposeResearch";

export default function ComposeResearch(){

    const [response, setResponse] = useState({ fetching: false, content: null })
    const [compose, setTest] = useState('')
    const [test2, setTest2] = useState('')
    const [perfumes, setPerfumes] = useState('')
    // console.log(perfumes.name)
    
    const [arr, setArr] = useState([])

    useEffect(() => {
        async function setPers() {
            const data = await getPerfumes()
            setPerfumes(data)
        }
        if (!perfumes){
            setPers();
        }


        if (perfumes){
            for (let i in perfumes){
                setArr((oldArray) => [...oldArray, perfumes[i]])
            } 
        }
    },  [perfumes])
    // for (let i in perfumes){
    //     setArr((oldArray) => [...oldArray, perfumes[i]])
    // }
    console.log('array' )
    console.log(arr )
    // console.log(perfumes)
    // useEffect(() => {
    //     for (let i in perfumes){
    //         setArr((oldArray) => [...oldArray, perfumes[i]])
    //     }
        
    // })
    
    // console.log(perfumes)

    function submit () {
        setResponse({ ...response, fetching: true })
        console.log({name:compose})
        addResearch({name:compose}).then((content) => {
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

            <ProposeResearchModal/>



            <Label> Test Field </Label>
            <TextInput onChange={(e) => setTest(e.target.value)}></TextInput>
            <TextInput onChange={(e) => setTest2(e.target.value)}></TextInput>
            <Button onClick={() => submit()}> test</Button>
            
            {/* <form className="mb-3 flex w-full items-center gap-3 md:hidden">
            <div className="flex-1">
              <Label htmlFor="search-bar" className="sr-only">
                Search
              </Label>
              <TextInput
                icon={HiSearch}
                id="search-bar"
                placeholder="Search for anything..."
                type="search"
                className="py-1.5"
              />
            </div>
            <Button type="submit">
              <HiSearch className="mr-2 h-5 w-5 text-gray-100" />
              Search
            </Button>
            
          </form> */}

            <form className="mb-3 flex w-full items-center gap-3 md:hidden">
            
                <Autocomplete 
                        className='mr-2 block [&_input]:py-2'
                        disablePortal
                        id="auto-complete"
                        options= {arr}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="Search" />}
                    />
            </form>
            

            

        </section>

     
    );

}