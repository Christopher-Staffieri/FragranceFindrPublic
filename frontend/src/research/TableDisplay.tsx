
import { useEffect, useState } from "react";

import * as allauth from '../lib/allauth'
import ReviewTableItem from "../components/research/common/ReviewTableItem";
import { EditProposal } from "../components/research/forms/EditProposal";
import { ProposeResearchModal } from "../components/research/ProposeResearch";
import { motion } from 'framer-motion'
import { Search, Filter, Settings, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "../components/MainButton"
import { Input } from "../components/Input"

  
  export function TableDisplay(auditorStatus) {
    const [filterView, setFilterView] = useState('all')
    const [currentPage, setCurrentPage] = useState(1);
    // const [getProposalsResponse, setGetProposalsResponse] =  useState({ fetching: false, content: { status: 200, data: [] } })
    // const [ proposalStatus, setProposalStatus] = useState()
    const [proposals, setProposals] = useState()
    const [totalResults, setTotalResults] = useState(0)
    const baseUrl ='http://localhost:10000/_allauth/browser/v1/account'
    const [status, setStatus] = useState()
    const [editStatus, setEditStatus] = useState(false)
    const [currentProposal, setCurrentProposal] = useState('none')
    const pages = []

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

    for (let i = 0; i<= totalResults; i++){
      let count = 0
      let test = totalResults
      if (totalResults <= 10){
        pages.push(<Button variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200">{count + 1}</Button>)
        break
      }
      if (totalResults > 10){
        let test2 = totalResults/2
        console.log(test2)
        for(let i = 0; i<= test2; i++){
          pages.push(<Button variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200">{count + 1}</Button>)
          count = count + 1
        }

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
    console.log(proposals)
   
    return (
      <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >

        {/* Task Management Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">All Tasks</h2>
            
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 flex gap-2">
                <Input 
                  placeholder="Search tasks..." 
                  className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 dark:border-gray-600"
                />
                <Button className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200">
                  <Settings className="w-4 h-4 mr-2" />
                  Configurations
                </Button>
              </div>
            </div>

            {/* View Filters */}
            <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
              <Button 
                variant={filterView === 'all' ? "default" : "ghost"}
                onClick={() => setFilterView('all')}
                className={filterView === 'all' ? "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700" : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"}
              >
                All
              </Button>
              <Button 
                variant={filterView === 'completed' ? "default" : "ghost"}
                onClick={() => setFilterView('completed')}
                className={filterView === 'completed' ? "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700" : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"}
              >
                Completed tasks
              </Button>
              <Button 
                variant={filterView === 'in-progress' ? "default" : "ghost"}
                onClick={() => setFilterView('in-progress')}
                className={filterView === 'in-progress' ? "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700" : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"}
              >
                Tasks in progress
              </Button>
              <Button 
                variant={filterView === 'in-review' ? "default" : "ghost"}
                onClick={() => setFilterView('in-review')}
                className={filterView === 'in-review' ? "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700" : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"}
              >
                Tasks in review
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-600 dark:text-gray-400">
                    <th className="pb-4 font-medium">PERFUME</th>
                    <th className="pb-4 font-medium">STATUS</th>
                    <th className="pb-4 font-medium">USERS</th>
                    <th className="pb-4 font-medium">PROGRESS</th>
                    <th className="pb-4 font-medium">PROPOSED BY</th>
                    <th className="pb-4 font-medium">TIME TRACKING</th>
                    <th className="pb-4 font-medium">PROPOSED</th>
                    <th className="pb-4 font-medium"></th>
                  </tr>
                </thead>
                  {
                  status === '200' 
                  // <ReviewTableItem onEditClick={onEditClick} key={proposal.id} name={proposal.perfume} status={proposal.status} data={proposal} auditorStatus={auditorStatus} filter={filterView}></ReviewTableItem>
                  ? proposals.map((proposal) =>  {
                    if (filterView === "all"){
                      return <ReviewTableItem onEditClick={onEditClick} key={proposal.id} name={proposal.perfume} status={proposal.status} data={proposal} auditorStatus={auditorStatus}/>
                    }else if (filterView === 'completed'){
                      if (proposal.confirmed !== null){
                        return <ReviewTableItem onEditClick={onEditClick} key={proposal.id} name={proposal.perfume} status={proposal.status} data={proposal} auditorStatus={auditorStatus}/>
                      }
                    }
                  }) 
                  : null
                  }
                </table>
                
            </div>

            

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {currentPage}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                {pages.map((page) => {
                  return page
                })}
                {/* <Button variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200">1</Button>
                <Button variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200">2</Button>
                <Button variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200">3</Button> */}
                <Button variant="outline" size="icon" className="border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      </>
      
     
    );
  }
  