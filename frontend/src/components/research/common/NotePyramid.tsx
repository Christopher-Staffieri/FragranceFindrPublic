import { Label, Textarea } from "flowbite-react"

export default function NotePyramid(){
    return(
        <>
            <div className="col-span-2 sm:col-span-1">
                            <Label htmlFor="top-notes" className="mb-2 block">
                            Top Notes
                            </Label>
                            <Textarea
                            id="top-notes"
                            name="top-notes"
                            placeholder="e.g. GMT-6"
                            required
                            />
            </div>

            <div className="col-span-2 sm:col-span-1">
                            <Label htmlFor="heart-notes" className="mb-2 block">
                            Heart Notes
                            </Label>
                            <Textarea
                            id="heart-notes"
                            name="heart-notes"
                            placeholder="e.g. GMT-6"
                            required
                            />
            </div>

            <div className="col-span-2 sm:col-span-1">
                            <Label htmlFor="base-notes" className="mb-2 block">
                            Base Notes
                            </Label>
                            <Textarea
                            id="base-notes"
                            name="base-notes"
                            placeholder="e.g. GMT-6"
                            required
                            />
            </div>
        </>
    )
}