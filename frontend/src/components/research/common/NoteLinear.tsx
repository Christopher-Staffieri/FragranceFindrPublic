import { Label, Textarea } from "flowbite-react"

export default function NoteLinear() {
    return(
        <div className="col-span-2 sm:col-span-1">
                        <Label htmlFor="timezone" className="mb-2 block">
                          Notes
                        </Label>
                        <Textarea
                          id="timezone"
                          name="timezone"
                          required
                        />
                      </div>
    )
}