import {
    Accordion,
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
  import { HiInformationCircle, HiPlus, HiX } from "react-icons/hi";
  import { twMerge } from "tailwind-merge";
import { composeEdits } from "../../../lib/allauth";
import NotePyramid from "../common/NotePyramid";
import NoteLinear from "../common/NoteLinear";
import useComposeEdits from "../../../hooks/use-compose-edits";
import { useUser } from "../../../auth";


  export function EditProposal({state, data, onEditClick}) {
    const [showModal, setShowModal] = useState(state);
    const [limitedStatus, setLimitedStatus] = useState(data.limited);
    const [collectorsStatus, setCollectorsStatus] = useState(data.collectors);
    const [concentrationStatus, setConcentrationStatus] = useState(data.varient);
    const [pyramidStatus, setPyramidStatus] = useState(true);
    const [test, setTest] = useState(1);
    const user = useUser()
    // const [response, setResponse] = useState({ fetching: false, content: null })

    const { 
      selected_perfume,
      edited_perfume, 
      edited_brand, 
      edited_release_data, 
      edited_gender, 
      edited_availability, 
      edited_limited, 
      edited_varient, 
      edited_collectors, 
      edited_interesting_facts,
      edited_youtube_link, 
      edited_additional_link, 
      edited_status,
      edited_by,
      response,
      onChange,
      onSubmit,
      setSelected,
    } = useComposeEdits()

    useEffect(() => {
      console.log(data.id)
      console.log(user.id)
      setSelected(data.id, user.id)
     }, [])

    function handleClose(){ 
        setShowModal(false)
        onEditClick(state=false, data='no')
        setTest(1)
    }

    // function submit () {
    //   setResponse({ ...response, fetching: true })
    //   composeEdits({ email, password }).then((content) => {
    //     setResponse((r) => { return { ...r, content } })
    //   }).catch((e) => {
    //     console.error(e)
    //     window.alert(e)
    //   }).then(() => {
    //     setResponse((r) => { return { ...r, fetching: false } })
    //   })
    // }


    function clicked(){
        let buttons = [];
        // console.log(test)
        
        if (test != 1 ){
            for (let i = 1; i < test; i++){
                if (i >= 5){
                    return buttons
                }
                buttons.push(
                    <div key={i} className="col-span-2">
                        <Label htmlFor="skills" className="mb-2 block">
                            Perfumer {i + 1}
                        </Label>
                        <TextInput
                        id="skills"
                        name="skills"
                        placeholder="e.g. Figma, HTML, Javascript"
                        required
                        />
                  </div>
                )
    
            
            
        }
        console.log(buttons.length)
        return buttons
        }
            
        
    }
   

    // clicked()
    
    
    // const [userStatus, setUserStatus] = useState(false);
    // setSelected(data.id)
   
    
    
    return (
      <div className="absolute bottom-5 left-px opacity-90">
        {/* <Button color="primary" onClick={() => setShowModal(true)} className="mx-auto">
          Create user
        </Button> */}
        <Modal
          onClose={() => handleClose()}
          popup
          show={showModal}
          size="2xl"
        >
          <Modal.Body className="relative rounded-lg bg-white p-0 shadow dark:bg-backgroundDark-500">
            <div className="flex items-center justify-between rounded-t p-5">
              <h3 className="text-lg font-semibold text-textDark dark:text-textDark">
                Propose a new perfume
              </h3>
              <button
                onClick={() => handleClose()}
                className="absolute right-5 top-[18px] ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <HiX className="h-5 w-5" />
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form onSubmit={onSubmit} action="#">
              <Accordion flush className="divide-y-0 border-0">
                <Accordion.Panel>
                  <Accordion.Title
                    theme={{
                      base: "flex w-full items-center justify-between px-5 py-5 text-left font-medium text-gray-500 dark:text-textDark",
                      open: {
                        on: "dark:bg-primaryDark-700",
                        off: "border-b bg-gray-100 hover:bg-gray-200 dark:border-0 dark:dark:bg-backgroundDark-500 dark:hover:bg-gray-600",
                      },
                    }}
                  >
                    General Information
                  </Accordion.Title>
                  <Accordion.Content className="dark:bg-backgroundDark-500">
                    
                      <div>
                        <Label htmlFor="perfume" className="mb-2 block">
                          Perfume
                        </Label>
                        <TextInput
                          id="edited_perfume"
                          name="edited_perfume"
                          defaultValue={data.perfume}
                          onChange={onChange}
                          required
                          
                        />
                      </div>
                      <div>
                        <Label htmlFor="brand" className="mb-2 block">
                          Brand
                        </Label>
                        <TextInput
                          id="edited_brand"
                          name="edited_brand"
                          defaultValue={data.brand}
                          onChange={onChange}
                          required
                          
                        />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <Label className="mb-2 block" htmlFor="file_input">
                          Upload avatar
                        </Label>
                        <div className="w-full items-center sm:flex">
                          <img
                            alt="Helene avatar"
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png"
                            className="mb-4 h-20 w-20 rounded-full sm:mb-0 sm:mr-4"
                          />
                          <div className="w-full">
                            <input
                              className="w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-textDark dark:placeholder:text-gray-400"
                              aria-describedby="file_input_help"
                              id="file_input"
                              type="file"
                            />
                            <p
                              className="mb-3 mt-1 text-xs font-normal text-gray-500 dark:text-textDark"
                              id="file_input_help"
                            >
                              SVG, PNG, JPG or GIF (MAX. 800x400px).
                            </p>
                          </div>
                        </div>
                      </div>  
                      {/* <div>
                        <Label htmlFor="parent-company" className="mb-2 block">
                          Parent Company
                        </Label>
                        <TextInput
                          id="parent-company"
                          name="parent-company"
                          // defaultValue={data.parent_com}
                          required
                          type="parent-company"
                        />
                      </div> */}
                      <div>
                        <Label
                          htmlFor="edited_gender"
                          className="mb-2 inline-flex items-center"
                        >
                          Gender
                          <Tooltip
                            content="User permissions, part of the overall user management process, are access granted to users to specific resources such as files, applications, networks, or devices."
                            theme={{
                              base: twMerge(theme.tooltip.base, "w-96 text-xs"),
                            }}
                          >
                            <button className="ml-1">
                              <svg
                                aria-hidden
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-gray-400 hover:text-gray-900 dark:text-textDark dark:hover:text-white"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="sr-only">
                                User permission details
                              </span>
                            </button>
                          </Tooltip>
                        </Label>
                        <Select onChange={onChange} id="edited_gender" name="edited_gender">
                          <option selected>{data.gender}</option>
                          {/* <option value="male">Male</option> */}
                          <option value="female">Female</option>
                          <option value="unisex">Unisex</option>
                        </Select>
                      </div>
                     
                      <div>
                        <Label htmlFor="edited_release_data" className="mb-2 block">
                          Release Year
                        </Label>
                        <TextInput
                          id="edited_release_data"
                          name="edited_release_data"
                          defaultValue={data.release_data}
                          onChange={onChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label
                          htmlFor="edited_availability"
                          className="mb-2 inline-flex items-center"
                        >
                          Availability
                          <Tooltip
                            content="Flowbite provides 7 predefined roles: Owner, Admin, Editor, Contributor and Viewer. Assign the most suitable role to each user, giving them the most appropriate level of control."
                            theme={{
                              base: twMerge(theme.tooltip.base, "w-96 text-xs"),
                            }}
                          >
                            <button className="ml-1">
                              <HiInformationCircle className="ml-1 h-4 w-4 text-gray-400 hover:text-gray-900 dark:text-textDark dark:hover:text-white" />
                              <span className="sr-only">User role details</span>
                            </button>
                          </Tooltip>
                        </Label>
                        <Select onChange={onChange} id="edited_availability" name="edited_availability">
                          {data.availability === 'yes' ? <option value='available' selected>Available</option>  : <option selected>Discontinued</option>}
                          {data.availability === 'yes' ? <option value="discontinued">Discontinued</option> : <option value="available">Available</option>}
                          {/* <option selected>Available</option> */}
                          {/* <option value="discontinued">Discontinued</option> */}
                          
                        </Select>
                      </div>
                      
                      {/* <div className="sm:col-span-2">
                        <Label className="mb-2 block" htmlFor="role">
                          Assign Role
                        </Label>
                        <div className="space-y-4 sm:flex sm:space-y-0">
                          <div className="mr-4 flex items-center">
                            <Checkbox id="inline-checkbox" name="role" />
                            <Label
                              htmlFor="inline-checkbox"
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Administrator
                            </Label>
                          </div>
                          <div className="mr-4 flex items-center">
                            <Checkbox id="inline-2-checkbox" name="role" />
                            <Label
                              htmlFor="inline-2-checkbox"
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Member
                            </Label>
                          </div>
                          <div className="mr-4 flex items-center">
                            <Checkbox
                              defaultChecked
                              id="inline-checked-checkbox"
                              name="role"
                            />
                            <Label
                              htmlFor="inline-checked-checkbox"
                              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Viewer
                            </Label>
                          </div>
                        </div>
                      </div> */}
                      <div>
                        <div className="mb-2 text-sm dark:text-textDark">Limited?</div>
                        
                        <ToggleSwitch
                          checked={limitedStatus}
                          id="limited"
                          label={limitedStatus ? "Yes" : "No"}
                          name="limited"
                          onChange={() => setLimitedStatus(!limitedStatus)}
                        />
                      </div>
                    <div>
                        <div className="mb-2 text-sm dark:text-textDark">Collector's Edition Bottle</div>
                        <ToggleSwitch
                          checked={collectorsStatus}
                          id="collectors"
                          label={collectorsStatus ? "Yes" : "No"}
                          name="collectors"
                          onChange={() => setCollectorsStatus(!collectorsStatus)}
                        />
                    </div>

                    <div>
                        <div className="mb-2 text-sm dark:text-textDark">Fragrance Concentration Variant</div>
                        <ToggleSwitch
                          checked={concentrationStatus}
                          id="concentration-status"
                          label={concentrationStatus ? "Yes" : "No"}
                          name="concentration-status"
                          onChange={() => setConcentrationStatus(!concentrationStatus)}
                        />
                        {concentrationStatus ? <div>
                                                <Label htmlFor="release-year" className="mb-2 block">
                                                    Original Perfume
                                                </Label>
                                                <TextInput
                                                 id="release-year"
                                                 name="release-year"
                                                 placeholder="e.g. English"
                                                 required
                                                />
                                                </div>
                                                 : ""}
                        </div>
                    </div>
                  </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                  <Accordion.Title
                    theme={{
                      base: "flex w-full items-center justify-between px-5 py-5 text-left font-medium text-gray-500 dark:text-textDark",
                      open: {
                        on: "dark:bg-primaryDark-700",
                        off: "border-b bg-gray-100 hover:bg-gray-200 dark:border-0 dark:bg-secondaryDark-700 dark:hover:bg-gray-600",
                      },
                    }}
                  >
                    Perfumer & Bottle Designer
                  </Accordion.Title>
                  <Accordion.Content className="dark:bg-backgroundDark-500">
                    <div className="grid gap-4 sm:grid-cols-2">
                    
                      <div className="col-span-2">
                        <Label htmlFor="skills" className="mb-2 block">
                            Perfumer
                        </Label>
                        <TextInput
                          id="skills"
                          name="skills"
                          placeholder="e.g. Figma, HTML, Javascript"
                          required
                        />
                      </div>
                      {clicked()}
                      <Button onClick={() => {
                        setTest(test + 1)
                      }}> Additional Perfumer</Button>
                      
                        {/* {clicked()} */}
                        
                      
                      <div className="col-span-2">
                        <Label htmlFor="bottle-designer" className="mb-2 block">
                            Bottle Designer
                        </Label>
                         <TextInput
                           id="bottle-designer"
                          name="bottle-designer"
                          placeholder="Add a phone number"
                          required
                        />
                      </div>
                      
                    </div>
                  </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                  <Accordion.Title
                    theme={{
                      base: "flex w-full items-center justify-between px-5 py-5 text-left font-medium text-gray-500 dark:text-textDark",
                      open: {
                        off: "border-b bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-backgroundDark-500 dark:hover:bg-gray-600",
                      },
                    }}
                  >
                    Fragrance Notes
                  </Accordion.Title>
                    <Accordion.Content className="dark:bg-backgroundDark-500">
                    <Button onClick={() => {
                    setPyramidStatus(true)
                  }}> Pyramid</Button>
                  <Button onClick={() => {
                    setPyramidStatus(false)
                  }}> Linear</Button>
                        {pyramidStatus ? <NotePyramid/> : <NoteLinear/>}
                    </Accordion.Content>
                </Accordion.Panel>

              </Accordion>

              <div className="flex items-center space-x-4 px-4 py-6">
                <Button
                  size="lg"
                  type="submit"
                  className="inline-flex w-full [&>span]:text-sm"
                >
                  <HiPlus className="mr-2 h-4 w-4" />
                  Add new user
                </Button>
                <Button
                  color="gray"
                  onClick={() => 
                    handleClose()
                }
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
      </div>
    );
  }
  