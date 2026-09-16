
import { useEffect, useState } from 'react'
import { AlertCircle, CheckCircle2, Clock, User, Sparkles, Eye, ChevronDown, ChevronUp, ArrowLeft, FileText, Link2, MessageSquare, Edit3, Plus, ExternalLink, X, ImageIcon, Tag, Send } from 'lucide-react'
import { Badge } from '../components/research/common/StatusBadge'
import { Button } from '../components/MainButton'
import { Card } from '../components/database/perfumeDetails/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/common/dialog'
import { Textarea } from '../components/TextArea'
import { Input } from '../components/Input'
import { Label } from '../components/Label'
import ViewProposedPerfumeOverview from './ViewProposedPerfumeOverview'
import ViewProposedPerfumeSources from './ViewProposedPerfumeSources'
import ViewProposedPerfumeDiscussion from './ViewProposedPerfumeDiscussion'
import ViewProposedPerfumeEdits from './ViewProposedPerfumeEdits'
import { Link, useAsyncError, useLocation } from 'react-router-dom'
import { useUser } from '../auth'
import { checkPerfumeEditsWithID, getFragranceProposal, getPerfume, getSourcesCount, isResearchAuditor, isResearchManager } from '../lib/allauth'
import EditProposalModal from '../components/research/forms/EditProposal'
import dayjs from 'dayjs'
import relatveTime from "dayjs/plugin/relativeTime"
import LoadingSpinner from '../components/common/loadingSpinner'

// Mock data - replace with actual data fetching
const proposalData = {
  id: '1',
  perfumeName: 'Amber & Vetiver',
  brand: 'Mancave',
  brandIsCustom: false,
  gender: 'Unisex',
  yearOfRelease: 2025,
  availability: 'In Production',
  isVegan: true,
  isLimited: false,
  limitedEditionName: '',
  perfumers: [
    { name: 'John Smith', isCustom: false }
  ],
  customPerfumers: ['Jane Doe'],
  designers: [],
  customDesigners: ['Custom Designer Name'],
  notes: {
    top: ['Cypress', 'Herbal Notes'],
    heart: ['Amber'],
    base: ['Vetiver'],
    linear: []
  },
  notesStructure: 'pyramid', // or 'linear'
  bottleDesigner: '',
  interestingFactsGerman: '',
  interestingFactsEnglish: '',
  germanTranslation: '',
  youtubeLink: '',
  vimeoLink: '',
  proposedBy: {
    username: 'SEGEL',
    avatar: '/placeholder.svg?height=40&width=40'
  },
  proposedAt: '2025-01-15T10:30:00Z',
  confirmations: [
    {
      username: 'Segel',
      avatar: '/placeholder.svg?height=40&width=40',
      confirmedAt: '2025-01-18T14:22:00Z'
    }
  ],
  sourcesCount: 2,
  discussionCount: 1,
  editsCount: 7
}


function getTimeAgo(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  
  if (diffInDays === 0) return 'today'
  if (diffInDays === 1) return '1 day ago'
  return `${diffInDays} days ago`
}


export default function ViewProposedPerfume() {
    const [activeTab, setActiveTab] = useState('overview')
    const user = useUser()
    const [loadingOriginalData, setLoadingOriginalData] = useState(true)
    const [loadingEditedData, setLoadingEditedData] = useState(true)

    const [hasCustomFields, setHasCustomFields] = useState(false)
 
    const location = useLocation();
      // const data = location.state?.data
    const [originalData, setOriginalData] = useState(null)
    const [editedData, setEditedData] = useState(null)
    const [allEditData, setAllEditData] = useState(null)
    const [sourcesCount, setSourcesCount] = useState(0)
    const [userIsAuditor, setUserIsAuditor] = useState(false)
    const [userIsManager, setUserIsManager] = useState(false)

    // const dateProposed = new Date(originalData.date_posted || null)
    
    dayjs.extend(relatveTime)
    
    // const timeTracking = dayjs(dateProposed).fromNow()
    // const timeTracking = dayjs(dateProposed).fromNow()


    useEffect(() => {
        // console.log(typof location.pathname.split('/')[3])
        console.log(typeof parseInt(location.pathname.split('/')[3]))
        console.log(location.pathname.split('/')[3])
        setLoadingOriginalData(true)
        getFragranceProposal(parseInt(location.pathname.split('/')[3]))
        .then((resp) => {
            console.log(resp)
            if (resp.error){
                console.log('no perfume found')
            }else{
                setOriginalData(resp)
                // setDateProposed(new Date(resp.date_proposed))
                // setTimeTracking(dayjs(resp.date_proposed).fromNow())
                if (resp.bottle_designer_other.length >= 1 || resp.brand_other.length > 1 || resp.fragrance_collection_other.length > 1
                    || resp.parent_company_other.length > 1 || resp.perfumers_other.length >= 1
                ){
                  setHasCustomFields(true)
                }
            }
        })
        .finally(() => {
          setLoadingOriginalData(false)
        })
    }, [])

    useEffect(() => {
      setLoadingEditedData(true)
      checkPerfumeEditsWithID(parseInt(location.pathname.split('/')[3]))
      .then((resp) => {
        console.log(resp)
        if (resp.error){
          console.log('No edits')
          // setEditedData([])
        }else{
          setEditedData(resp[0])
          setAllEditData(resp)
          console.log(resp[0])
          console.log(resp[0].bottle_designer_other.length)
          if (resp[0].bottle_designer_other.length >= 1 || resp[0].brand_other.length > 1 || resp[0].fragrance_collection_other.length > 1
                    || resp[0].parent_company_other.length > 1 || resp[0].perfumers_other.length >= 1
                ){
                  console.log('got to heree')
                  setHasCustomFields(true)
                }
          
        }
      })
      .finally(() => {
        setLoadingEditedData(false)
      })
    }, [])

    useEffect(() => {
      if (originalData){
        console.log(originalData)
        getSourcesCount(originalData.id)
        .then((resp) => {
          setSourcesCount(resp.source_count)
          console.log(resp)
          console.log('logged sources count')
        })
      }
    }, [originalData])

    useEffect(() => {
      isResearchManager(user.email)
      .then((resp) => {
        console.log(resp)
        if (resp.status === '200'){
          console.log('is manager')
          setUserIsManager(true)
        }else{
          console.log('not a manager')
        }
      })

      if (userIsManager === false){
        console.log('checking for auditor')
        isResearchAuditor(user.email)
        .then((resp) => {
          console.log(resp)
          if (resp.status === '200'){
            console.log('is auditor ')
            setUserIsAuditor(true)
          }else{
            console.log('not audit')
          }
        })
      }
    }, [])
    
    console.log(hasCustomFields)
    console.log(originalData)
    if (originalData !== null){
      console.log(originalData)
      console.log(editedData)
    }

    console.log(user)
    console.log('logged user')
    console.log(editedData)


  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header with breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-light-text-secondary dark:text-dark-text-secondary animate-fade-in mb-6">
          <a href="/" className="hover:text-light-primary dark:hover:text-dark-primary transition-colors">Home</a>
          <span>/</span>
          <a href="/research" className="hover:text-light-primary dark:hover:text-dark-primary transition-colors">Research</a>
          <span>/</span>
          <span className="text-light-text-primary dark:text-dark-text-primary">Proposal</span>
        </div>

        {/* Navigation Bar with Back Button and Tabs */}
        <div className="-mx-6 px-6 py-4 bg-light-surface/95 dark:bg-dark-surface/95 backdrop-blur-lg border-y border-light-border dark:border-dark-border shadow-sm mb-8">
          <div className="flex items-center gap-4">
            {/* Back Button */}
            <button
              onClick={() => window.history.back()}
              className="p-2 rounded-lg hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 transition-all duration-200 group"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary group-hover:text-light-primary dark:group-hover:text-dark-primary transition-colors" />
            </button>

            {/* Navigation Tabs */}
            <nav className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === 'overview'
                    ? 'bg-light-primary dark:bg-dark-primary text-white shadow-lg shadow-light-primary/20 dark:shadow-dark-primary/20'
                    : 'text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 hover:text-light-primary dark:hover:text-dark-primary'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span className="font-medium">Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('sources')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === 'sources'
                    ? 'bg-light-primary dark:bg-dark-primary text-white shadow-lg shadow-light-primary/20 dark:shadow-dark-primary/20'
                    : 'text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 hover:text-light-primary dark:hover:text-dark-primary'
                }`}
              >
                <Link2 className="w-4 h-4" />
                <span className="font-medium">Sources</span>
                {sourcesCount > 0 && (
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                    activeTab === 'sources'
                      ? 'bg-white/20'
                      : 'bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary'
                  }`}>
                    {sourcesCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('discussion')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === 'discussion'
                    ? 'bg-light-primary dark:bg-dark-primary text-white shadow-lg shadow-light-primary/20 dark:shadow-dark-primary/20'
                    : 'text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 hover:text-light-primary dark:hover:text-dark-primary'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span className="font-medium">Discussion</span>
                {proposalData.discussionCount > 0 && (
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                    activeTab === 'discussion'
                      ? 'bg-white/20'
                      : 'bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary'
                  }`}>
                    {proposalData.discussionCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('edits')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === 'edits'
                    ? 'bg-light-primary dark:bg-dark-primary text-white shadow-lg shadow-light-primary/20 dark:shadow-dark-primary/20'
                    : 'text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 hover:text-light-primary dark:hover:text-dark-primary'
                }`}
              >
                <Edit3 className="w-4 h-4" />
                <span className="font-medium">Edits</span>
                {allEditData
                  ? allEditData.length > 0 && (
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                      activeTab === 'edits'
                        ? 'bg-white/20'
                        : 'bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary'
                    }`}>
                      {allEditData.length}
                    </span>
                  )
                  : 
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                      activeTab === 'edits'
                        ? 'bg-white/20'
                        : 'bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary'
                    }`}>
                      0
                    </span>
                }
                {/* {proposalData.editsCount > 0 && (
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                    activeTab === 'edits'
                      ? 'bg-white/20'
                      : 'bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary'
                  }`}>
                    {proposalData.editsCount}
                  </span>
                )} */}
              </button>
            </nav>
          </div>
        </div>

        {/* Title Section */}
        <div className="space-y-2 animate-slide-up">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary">
        
              {originalData
                ? (editedData === null
                  ? originalData.perfume
                  : editedData.perfume
                )
                : null
              }
              
            </h1>
            {originalData
              ? (editedData === null
                  ? (originalData.brand_other.length > 1
                    ? 
                      <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20">
                        {originalData.brand_other} (Custom)
                      </Badge>
                    : 
                      <span className="text-2xl italic text-light-text-secondary dark:text-dark-text-secondary">
                        - {originalData.brand.name}
                      </span>
                  )
                  : (editedData.brand_other.length > 1
                    ?
                      <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20">
                      {editedData.brand_other} (Custom)
                    </Badge>

                    :
                      <span className="text-2xl italic text-light-text-secondary dark:text-dark-text-secondary">
                      - {editedData.brand.name}
                    </span>
                  )
              )
              : null
            }
           
          </div>
          
          <div className="flex items-center gap-4 text-sm text-light-text-secondary dark:text-dark-text-secondary">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {originalData
                ? <span>Proposed by <Link to={`/profile/${originalData.proposed_by.username}`}><span className="font-semibold text-light-primary dark:text-dark-primary">{originalData.proposed_by.username}</span></Link></span>
                : null
              }
              
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />\
              {originalData
                ? <span>{dayjs(originalData.date_posted).fromNow()}</span>
                : null
              
              }
              {/* <span>{}</span> */}
            </div>
          </div>
        </div>

        {/* Custom Fields Warning */}
        {hasCustomFields && (
          <Card className="border-red-500/50 bg-red-500/5 animate-fade-in">
            <div className="p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-red-600 dark:text-red-400">
                  Administrator Support Required
                </p>
                {originalData !== null 

                  ? (editedData === null
                      ? 
                        <p className="text-sm text-red-600/80 dark:text-red-400/80">
                          This proposal contains custom fields that are not in the database and may require verification or addition to the system.
                          {originalData.brand_other.length > 1 && ' A new brand needs to be added.'}
                          {originalData.parent_company_other.length > 1 && ' A new parent company needs to be added.'}
                          {originalData.perfumers_other.length > 0 && ` ${originalData.perfumers_other.length} custom perfumer(s) need to be added.`}
                          {originalData.bottle_designer_other.length > 0 && ` ${originalData.bottle_designer_other.length} custom designer(s) need to be added.`}
                          {originalData.fragrance_collection_other.length > 1 && ` A new fragrance collection needs to be added.`}
                        </p>
                      :
                        <p className="text-sm text-red-600/80 dark:text-red-400/80">
                          This proposal contains custom fields that are not in the database and may require verification or addition to the system.
                          {editedData.brand_other.length > ' A new brand needs to be added.'}
                          {editedData.parent_company_other.length > 1 && ' A new parent company needs to be added.'}
                          {editedData.perfumers_other.length > 0 && ` ${editedData.perfumers_other.length} custom perfumer(s) need to be added.`}
                          {editedData.bottle_designer_other.length > 0 && ` ${editedData.bottle_designer_other.length} custom designer(s) need to be added.`}
                          {editedData.fragrance_collection_other.length > 1 && ` A new fragrance collection needs to be added.`}
                        </p>
                  )
                  : null
                }
                
                
              </div>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'overview' && (
              (!loadingOriginalData && !loadingEditedData

                ? <ViewProposedPerfumeOverview proposalData={proposalData} originalInfo={originalData} editedInfo={editedData}/>
                : <LoadingSpinner/>

              )
              
            )}

            {activeTab === 'sources' && (
              <ViewProposedPerfumeSources originalData={originalData} isAuditor={userIsAuditor} isManager={userIsManager}/>
            )}

            {activeTab === 'discussion' && (
              <ViewProposedPerfumeDiscussion/>
            )}

            
            {activeTab === 'edits' && (
              <ViewProposedPerfumeEdits originalData={originalData} editedInfo={allEditData}/>
              // (allEditData
              //   ? <ViewProposedPerfumeEdits originalData={originalData} editedInfo={allEditData}/>
              //   : <LoadingSpinner/>
              // )
              
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info Card */}
            <Card className="p-5 bg-gradient-to-br from-light-primary/5 to-transparent dark:from-dark-primary/5 border-light-border dark:border-dark-border animate-fade-in">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-light-primary dark:text-dark-primary flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary">
                    Proposal Under Review
                  </p>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                    This is a proposal for a fragrance which is not yet listed in FragranceFindr. Join the discussion and add sources to help verify the information.
                  </p>
                </div>
              </div>
            </Card>

            {/* Confirmations */}
            <Card className="p-5 bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border animate-slide-left">
              <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Confirmations
              </h3>

              {originalData
              
                ? (originalData.confirmed_by !== null && originalData.confirmed_by.length > 0 

                    ?
                      <div className="space-y-3">
                        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-3">
                          The following users have confirmed all information as correct and complete:
                        </p>
                        {originalData.confirmed_by.map((confimation, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 p-3 rounded-lg bg-green-500/5 border border-green-500/20 transition-all duration-300 hover:bg-green-500/10"
                          >
                            <img
                            src={confirmation.avatar || "/placeholder.svg"}
                            alt={confirmation.username}
                            className="w-10 h-10 rounded-full border-2 border-green-500/50"
                            />
                            <div className="flex-1">
                              <p className="font-semibold text-light-text-primary dark:text-dark-text-primary flex items-center gap-2">
                                {confirmation.username}
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                              </p>
                              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                                {getTimeAgo(confirmation.confirmedAt)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    : 
                        <div className="flex flex-col items-center justify-center py-6 text-center">
                          <Clock className="w-12 h-12 text-light-text-secondary/40 dark:text-dark-text-secondary/40 mb-3" />
                          <p className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-1">
                            Awaiting Confirmation
                          </p>
                          <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                            No users have confirmed this proposal yet.
                          </p>
                        </div>
                )
                : null
              }
              
             

              <Button className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white transition-all duration-300">
                Confirm Information
              </Button>
            </Card>

            {/* Action Buttons */}
            <Card className="p-5 bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border">
              <div className="space-y-3">
                {userIsAuditor || userIsManager
                
                ?
                  // <Button className="w-full bg-light-primary hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 text-white transition-all duration-300">
                  //   Edit Proposal
                  // </Button>
                  (originalData !== null
                    ? (editedData !== null && originalData !== null
                        ? <EditProposalModal originalFragranceData={originalData} editData={editedData}/>
                        : <EditProposalModal originalFragranceData={originalData} editData={null}/>

                    )
                    : null
                  )
                : null
                }
               
                {/* <Button variant="outline" className="w-full border-light-border dark:border-dark-border hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 transition-all duration-300">
                  Add to Discussion
                </Button>
                <Button variant="outline" className="w-full border-red-500/50 text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-all duration-300">
                  Report Issue
                </Button> */}
              </div>
            </Card>
          </div>
        </div>
      </div>

      
    </div>
  )
}
