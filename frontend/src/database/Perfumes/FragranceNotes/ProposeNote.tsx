
import {
    Avatar,
    Button,
    Checkbox,
    Label,
    Modal,
    Select,
    TextInput,
    Textarea,
    ToggleSwitch,
    Tooltip,
    theme,
  } from "flowbite-react";
  import { useEffect, useState } from "react";
  import {
    HiCalendar,
    HiCode,
    HiCog,
    HiDownload,
    HiEmojiHappy,
    HiInformationCircle,
    HiLocationMarker,
    HiPaperClip,
    HiPhotograph,
    HiPlus,
    HiX,
  } from "react-icons/hi";
  import { twMerge } from "tailwind-merge";
  import { NoteCategories } from "./NoteCategories";
import useProposeNote from "../../../hooks/use-propose-note";
import { useUser } from "../../../auth";
  
  export default function ProposeNote() {
    const [showModal, setShowModal] = useState(false);
    const [isUserStatus, setUserStatus] = useState(false);
    const user = useUser()
    const {
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
      } = useProposeNote();

    useEffect(() => {
        setUser(user.profile)
    }, [])
  
    return (
      <>
        <div className="m-5 flex justify-center">
          <Button onClick={() => setShowModal(true)}>Create product</Button>
        </div>
        <Modal onClose={() => setShowModal(false)} show={showModal}>
          <Modal.Body className="relative rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-5">
            <div className="mb-4 flex items-center justify-between rounded-t border-b pb-4 dark:border-gray-600 sm:mb-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add new user
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="absolute right-5 top-[18px] ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <HiX className="h-5 w-5" />
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form action="#" onSubmit={onSubmit}>
              <div className="mb-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <Label
                    htmlFor="note"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Note
                  </Label>
                  <TextInput
                    id="note"
                    name="note"
                    placeholder="John"
                    onChange={onChange}
                    required
                  />
                </div>
                
                <div>
                  <Label
                    htmlFor="category"
                    className="mb-2 inline-flex items-center text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Note Catergory&nbsp;
                    <Tooltip
                      content="User permissions, part of the overall user management process, are access granted to users to specific resources such as files, applications, networks, or devices."
                      theme={{
                        content: twMerge(theme.tooltip.content, "w-64"),
                      }}
                    >
                      <HiInformationCircle className="h-4 w-4 cursor-pointer text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white" />
                      <span className="sr-only">Details</span>
                    </Tooltip>
                  </Label>
                  <Select id="category" name="category" onChange={onChange}>
                    {NoteCategories.map((category) => (
                        <option key={category}>{category}</option>
                    ))}
                    {/* <option selected>Operational</option>
                    <option value="NO">Non Operational</option> */}
                  </Select>
                </div>
                
                <div className="sm:col-span-2">
                  <Label
                    htmlFor="description"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Short Note Description
                  </Label>
                  <div className="w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
                    <div className="flex items-center justify-between border-b px-3 py-2 dark:border-gray-600">
                      <div className="flex flex-wrap items-center divide-gray-200 dark:divide-gray-600 sm:divide-x">
                        <div className="flex items-center space-x-1 sm:pr-4">
                         
                        </div>
                        
                      </div>
                      
                    </div>
                    <div className="rounded-b-lg bg-white px-4 py-2 dark:bg-gray-800">
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Write a message here"
                        required
                        onChange={onChange}
                        rows={8}
                        className="block w-full border-0 bg-white px-0 text-sm text-gray-800 focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <Label
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="image"
                  >
                    Upload Note Image
                  </Label>
                  <div className="w-full items-center sm:flex">
                    <Avatar
                      alt=""
                      img="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png"
                      rounded
                      size="lg"
                      className="mb-4 sm:mb-0 sm:mr-4 [&_img]:max-w-none"
                    />
                    <div className="w-full">
                      <input
                        aria-describedby="file_input_help"
                        id="image"
                        name="image"
                        type="file"
                        onChange={onChange}
                        className="w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400"
                      />
                      <p
                        className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-300"
                        id="file_input_help"
                      >
                        SVG, PNG, JPG or GIF (MAX. 800x400px).
                      </p>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  
                  <div>
                    <Label
                        htmlFor="first-name"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Link to Image
                    </Label>
                    <TextInput
                        id="first-name"
                        name="first-name"
                        placeholder="John"
                        required
                    />
                </div>
                  
                </div>
                <div>
                  
                  
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  size="lg"
                  type="submit"
                  className="inline-flex w-full [&>span]:text-sm"
                >
                  <HiPlus className="h-4 w-4 sm:mr-2" />
                  Add new user
                </Button>
                <Button
                  color="gray"
                  onClick={() => setShowModal(false)}
                  outline
                  size="lg"
                  className="inline-flex w-full [&>span]:text-sm [&>span]:text-gray-500 hover:[&>span]:text-gray-900 [&>span]:dark:bg-gray-700 dark:[&>span]:enabled:hover:bg-gray-600"
                >
                  Discard
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
  