import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { addSource } from "../../../lib/allauth";
import { useState } from "react";
import { useUser } from "../../../auth";

export default function AddSource({perfume, posted_by}){
    const [response, setResponse] = useState({ fetching: false, content: null })
    const [info, setInfo] = useState('')
    const [tag, setTag] = useState('test')
    const [sourceUrl, setSourceUrl] = useState('')
    const postedBy = useUser()
    // console.log(postedBy)
    console.log(posted_by.id)
    console.log(perfume.id)

    function submit(){
        setResponse({ ...response, fetching: true })
        addSource({info:info, tag:tag, source_url:sourceUrl, selected_perfume:perfume.id, posted_by:posted_by.id}).then((content) => {
        setResponse((r) => { return { ...r, content } })
    }).catch((e) => {
      console.error(e)
      window.alert(e)
    }).then(() => {
      setResponse((r) => { return { ...r, fetching: false } })
    })
    }

    return(
        // <section>
        <>
            <form className="mt-4 space-y-6 sm:mt-6" action="#">
                <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                        <Label>Info</Label>
                        <Textarea onChange={(e) => setInfo(e.target.value)}/>
                    </div>
                    <div>
                        <Label>Info</Label>
                        <Textarea onChange={(e) => setInfo(e.target.value)}/>
                    </div>

                    <div>
                        <Label>Info</Label>
                        <TextInput onChange={(e) => setSourceUrl(e.target.value)}/>
                    </div>

                </div>

                <Button onClick={() => submit()}>Post Source</Button>   
            </form>

        </>
        // </section>
    )
}