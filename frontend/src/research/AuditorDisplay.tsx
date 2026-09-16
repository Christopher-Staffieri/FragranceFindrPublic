

import {
    Avatar,
    Badge,
    Button,
    Checkbox,
    Dropdown,
    Label,
    Pagination,
    Progress,
    Radio,
    Table,
    TextInput,
    theme,
  } from "flowbite-react";
  import { useEffect, useState } from "react";
  import { HiSearch } from "react-icons/hi";
  import { twMerge } from "tailwind-merge";
  import * as allauth from '../lib/allauth'
  import ReviewTableItem from "../components/research/common/ReviewTableItem";
import { EditProposal } from "../components/research/forms/EditProposal";
import { ProposeResearchModal } from "../components/research/ProposeResearch";
  
  export function AuditorDisplay() {
    const [currentPage, setCurrentPage] = useState(1);
    // const [getProposalsResponse, setGetProposalsResponse] =  useState({ fetching: false, content: { status: 200, data: [] } })
    // const [ proposalStatus, setProposalStatus] = useState()
    const [proposals, setProposals] = useState()
    const [totalResults, setTotalResults] = useState(0)
    const baseUrl ='http://localhost:10000/_allauth/browser/v1/account'
    const [status, setStatus] = useState()
    const [editStatus, setEditStatus] = useState(false)
    const [currentProposal, setCurrentProposal] = useState('none')

    console.log(currentPage)


    useEffect(() => {
        fetchProposals(baseUrl + '/pending-approvals')
    }, [])

    function fetchProposals(url){
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            
            if (data.status === '200'){
                
                setProposals(data.results)
                setTotalResults(data.count)
                setStatus(data.status)

            }
            
        });
    }

   

    function onPageChange(page){
        console.log(page)
        console.log('logged')
        setCurrentPage(page)
        fetchProposals(baseUrl + `/pending-approvals/?page=${page}`)

    }

    function onEditClick(state, data){
      console.log(state)
      console.log(data)
      setEditStatus(state)
      if (data !== 'no'){
        setCurrentProposal(data)
      }else{
        setCurrentProposal("none")
      }
    }

    console.log(editStatus)
//    function handleOnChange(){
//     setGetProposalsResponse((r) => { return { ...r, fetching: true } })
//         allauth.getPendingProposals().then((resp) => {
//             console.log(resp.data)
//             console.log(resp)
//             if (resp.status === '200'){
//                 setProposalStatus(resp.status)
//                 setProposals(resp.data)
//                 setTotalResults(resp.count)
//             }
            

//             // if (resp.status === '200'){
//             //     console.log(resp.status)
//             //     setProposalStatus(resp.data)
//             // }
//         }).catch((e) => {
//             console.error(e)
//             window.alert(e) 
//         }).then(() => {
//             setGetProposalsResponse((r) => { return { ...r, fetching: false } })
//           })
//    }
  
   
    return (
      <section className="bg-gray-50 py-3 dark:bg-backgroundDark-500 sm:py-5">
        
         
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
        
          <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
          
            <div className="mx-4 border-b dark:border-gray-700">
            
              <div className="flex items-center justify-between space-x-4 pt-3">
              
                <div className="flex flex-1 items-center space-x-3">
                
                  <h5 className="font-semibold dark:text-white">All Tasks</h5>
                </div>
              </div>
              
              <div className="flex flex-col-reverse items-center justify-between py-3 md:flex-row md:space-x-4">
                <div className="flex w-full flex-col space-y-3 md:flex-row md:items-center md:space-y-0 lg:w-2/3">
                
                  <form className="w-full flex-1 md:mr-4 md:max-w-sm">
                    <Label
                      htmlFor="default-search"
                      className="sr-only text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Search
                    </Label>
                    <div className="relative">
                      <TextInput
                        icon={() => (
                          <HiSearch className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        )}
                        id="default-search"
                        name="default-search"
                        placeholder="Search..."
                        required
                        type="search"
                        className="[&_input]:py-2"
                      />
                      <Button
                        type="submit"
                        className="absolute inset-y-0 right-0 rounded-l-none rounded-r-lg"
                      >
                        Search
                      </Button>
                    </div>
                  </form>
                  <div className="flex items-center space-x-4">
                    <Dropdown
                      color="gray"
                      label={
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden
                            className="mr-2 h-4 w-4 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                            />
                          </svg>
                          Filter
                        </>
                      }
                    >
                      <div className="p-3">
                        <h6 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          By status
                        </h6>
                        <ul className="space-y-2 text-sm">
                          <li>
                            <Label className="flex w-full items-center rounded-md px-1.5 py-1 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">
                              <Checkbox
                                id="in-progress"
                                name="in-progress"
                                className="mr-2"
                              />
                              In progress
                            </Label>
                          </li>
                          <li>
                            <Label className="flex w-full items-center rounded-md px-1.5 py-1 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">
                              <Checkbox
                                id="in-review"
                                name="in-review"
                                className="mr-2"
                              />
                              In review
                            </Label>
                          </li>
                          <li>
                            <Label className="flex w-full items-center rounded-md px-1.5 py-1 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">
                              <Checkbox
                                id="completed"
                                name="completed"
                                className="mr-2"
                              />
                              Completed
                            </Label>
                          </li>
                          <li>
                            <Label className="flex w-full items-center rounded-md px-1.5 py-1 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">
                              <Checkbox
                                id="cancelled"
                                name="cancelled"
                                className="mr-2"
                              />
                              Cancelled
                            </Label>
                          </li>
                        </ul>
                        <h6 className="mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">
                          By number of users
                        </h6>
                        <ul className="space-y-2 text-sm">
                          <li>
                            <Label className="flex w-full items-center rounded-md px-1.5 py-1 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">
                              <Checkbox
                                id="people-1"
                                name="people-1"
                                className="mr-2"
                              />
                              5-10 people
                            </Label>
                          </li>
                          <li>
                            <Label className="flex w-full items-center rounded-md px-1.5 py-1 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">
                              <Checkbox
                                id="people-2"
                                name="people-2"
                                className="mr-2"
                              />
                              10+ people
                            </Label>
                          </li>
                          <li>
                            <Label className="flex w-full items-center rounded-md px-1.5 py-1 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">
                              <Checkbox
                                id="people-3"
                                name="people-3"
                                className="mr-2"
                              />
                              More than 10 people
                            </Label>
                          </li>
                        </ul>
                        <a
                          href="#"
                          className="ml-1.5 mt-4 flex items-center text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                        >
                          Apply to all projects
                        </a>
                      </div>
                    </Dropdown>
                    <Dropdown
                      color="gray"
                      label={
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="mr-2 h-4 w-4 text-gray-400"
                            aria-hidden
                          >
                            <path
                              fillRule="evenodd"
                              d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 01-.517.608 7.45 7.45 0 00-.478.198.798.798 0 01-.796-.064l-.453-.324a1.875 1.875 0 00-2.416.2l-.243.243a1.875 1.875 0 00-.2 2.416l.324.453a.798.798 0 01.064.796 7.448 7.448 0 00-.198.478.798.798 0 01-.608.517l-.55.092a1.875 1.875 0 00-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 01-.064.796l-.324.453a1.875 1.875 0 00.2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 01.796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 01.517-.608 7.52 7.52 0 00.478-.198.798.798 0 01.796.064l.453.324a1.875 1.875 0 002.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 01-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 001.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 01-.608-.517 7.507 7.507 0 00-.198-.478.798.798 0 01.064-.796l.324-.453a1.875 1.875 0 00-.2-2.416l-.243-.243a1.875 1.875 0 00-2.416-.2l-.453.324a.798.798 0 01-.796.064 7.462 7.462 0 00-.478-.198.798.798 0 01-.517-.608l-.091-.55a1.875 1.875 0 00-1.85-1.566h-.344zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Configurations
                        </>
                      }
                      theme={{
                        arrowIcon: "hidden",
                        floating: {
                          content: twMerge(theme.dropdown.content, "w-48"),
                        },
                      }}
                    >
                      <Dropdown.Item>By Category</Dropdown.Item>
                      <Dropdown.Item>By Brand</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item>Reset</Dropdown.Item>
                    </Dropdown>
                  </div>
                </div>
                <div className="mb-3 flex w-full shrink-0 flex-col items-stretch justify-end md:mb-0 md:w-auto md:flex-row md:items-center md:space-x-3">
                  <button
                    type="button"
                    className="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    <svg
                      className="mr-2 h-3.5 w-3.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      />
                    </svg>
                    Add new task
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mx-4 flex flex-wrap pb-3">
              <div className="mr-4 mt-3 hidden items-center text-sm font-medium text-gray-900 dark:text-white md:flex">
                Show only:
              </div>
              <div className="flex flex-wrap">
                <div className="mr-4 mt-3 flex items-center">
                  <Radio id="all-tasks" name="show-only" />
                  <Label
                    htmlFor="all-tasks"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    All
                  </Label>
                </div>
                <div className="mr-4 mt-3 flex items-center">
                  <Radio id="completed" name="show-only" />
                  <Label
                    htmlFor="completed"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Completed tasks
                  </Label>
                </div>
                <div className="mr-4 mt-3 flex items-center">
                  <Radio id="in-progress" name="show-only" />
                  <Label
                    htmlFor="in-progress"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Tasks in progress
                  </Label>
                </div>
                <div className="mr-4 mt-3 flex items-center">
                  <Radio id="in-review" name="show-only" />
                  <Label
                    htmlFor="in-review"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Tasks in review
                  </Label>
                </div>
                
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table
                theme={{
                  root: {
                    wrapper: "static",
                  },
                }}
                className="w-full text-left text-sm text-gray-500 dark:text-gray-400"
              >
                <Table.Head className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <Table.HeadCell scope="col" className="p-4">
                    <div className="flex items-center">
                      <Checkbox id="checkbox-all" name="checkbox-all" />
                      <Label htmlFor="checkbox-all" className="sr-only">
                        Check all
                      </Label>
                    </div>
                  </Table.HeadCell>
                  <Table.HeadCell scope="col" className="px-4 py-3">
                    Perfume
                  </Table.HeadCell>
                  <Table.HeadCell scope="col" className="px-4 py-3">
                    Status
                  </Table.HeadCell>
                  <Table.HeadCell scope="col" className="px-4 py-3">
                    Users
                  </Table.HeadCell>
                  <Table.HeadCell scope="col" className="min-w-56 px-4 py-3">
                    Progress
                  </Table.HeadCell>
                  <Table.HeadCell scope="col" className="px-4 py-3">
                    Proposed By
                  </Table.HeadCell>
                  <Table.HeadCell scope="col" className="px-4 py-3">
                    Time Tracking
                  </Table.HeadCell>
                  <Table.HeadCell scope="col" className="px-4 py-3">
                    Proposed
                  </Table.HeadCell>
                  <Table.HeadCell scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    
                  
                  {
                status === '200' ? proposals.map((proposal) => <ReviewTableItem onEditClick={onEditClick} key={1} name={proposal.perfume} status={proposal.status} data={proposal}></ReviewTableItem>) : ''
                // proposals.map((proposal) => <Label> {proposal}</Label>)
                }
                
                 
                </Table.Body>
              </Table>
            </div>
            
            
            <nav
              className="flex flex-col items-start justify-between space-y-3 p-4 md:flex-row md:items-center md:space-y-0"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Showing&nbsp;
                <span className="font-semibold text-gray-900 dark:text-white">
                  1-10
                </span>
                &nbsp;of&nbsp;
                <span className="font-semibold text-gray-900 dark:text-white">
                  {totalResults}
                </span>
              </span>
              
              <Pagination
                currentPage={currentPage}
                nextLabel=""
                onPageChange={(page) => onPageChange(page)}
                previousLabel=""
                showIcons
                totalPages={totalResults}
                theme={{
                  pages: {
                    base: twMerge(theme.pagination.pages.base, "mt-0"),
                    next: {
                      base: twMerge(
                        theme.pagination.pages.next.base,
                        "w-10 px-1.5 py-1.5",
                      ),
                      icon: "h-6 w-6",
                    },
                    previous: {
                      base: twMerge(
                        theme.pagination.pages.previous.base,
                        "w-10 px-1.5 py-1.5",
                      ),
                      icon: "h-6 w-6",
                    },
                    selector: {
                      base: twMerge(
                        theme.pagination.pages.selector.base,
                        "w-9 py-2 text-sm focus:border-blue-300",
                      ),
                    },
                  },
                }}
              />
              
            </nav>
            
            
          </div>
          {editStatus && currentProposal !== 'none' ? <EditProposal state={true} data={currentProposal} onEditClick={onEditClick}/> : ''}
        </div>
        
        
      </section>
      
     
    );
  }
  