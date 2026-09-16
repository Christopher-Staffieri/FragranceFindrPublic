import { Button, Label, Textarea } from "flowbite-react"
import { useUser } from "../../../auth"
import { proposeDiscussion } from "../../../lib/allauth"
import { useState } from "react"

export default function ProposeDiscussion(perfume){

    const [response, setResponse] = useState({ fetching: false, content: null })
    const [post, setPost] = useState('')
    const postedBy = useUser()
    console.log(postedBy.id)
    

    function submit(){
        setResponse({ ...response, fetching: true })
        proposeDiscussion({post:post, selected_perfume:perfume.perfume.id, posted_by:postedBy.id}).then((content) => {
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
            <form>
                <div>
                    <Label>Post</Label>
                    <Textarea onChange={(e) => setPost(e.target.value)}/>
                </div>
                <Button onClick={() => submit()}>Post</Button>
            </form>

        </section>
    )
}