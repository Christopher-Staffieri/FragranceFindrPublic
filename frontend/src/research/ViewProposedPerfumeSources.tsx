import { useEffect, useState } from 'react'
import { AlertCircle, CheckCircle2, Clock, User, Sparkles, Eye, ChevronDown, ChevronUp, ArrowLeft, FileText, Link2, MessageSquare, Edit3, Plus, ExternalLink, X, ImageIcon, Tag, Send, Circle } from 'lucide-react'
import { Badge } from '../components/research/common/StatusBadge'
import { Button } from '../components/MainButton'
import { Card } from '../components/database/perfumeDetails/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/common/dialog'
import { Textarea } from '../components/TextArea'
import { Input } from '../components/Input'
import { Label } from '../components/Label'
import ViewProposedPerfumeOverview from './ViewProposedPerfumeOverview'
import { addSource, confirmSource, getSource, removeSourceConfirmation } from '../lib/allauth'
import { useUser } from '../auth'
import SourcesCard from '../components/research/common/SourcesCard'



const sourceChecklist = {
  availability: [
    { username: 'Segel', avatar: '/placeholder.svg?height=32&width=32' },
    { username: 'Frankie', avatar: '/placeholder.svg?height=32&width=32' }
  ],
  yearOfRelease: [
    { username: 'Segel', avatar: '/placeholder.svg?height=32&width=32' },
    { username: 'Frankie', avatar: '/placeholder.svg?height=32&width=32' }
  ],
  fragranceNotes: [
    { username: 'Segel', avatar: '/placeholder.svg?height=32&width=32' }
  ]
}

export default function ViewProposedPerfumeSources({originalData, isAuditor, isManager}){

  const [isAddSourceOpen, setIsAddSourceOpen] = useState(false)
  const [sourceDescription, setSourceDescription] = useState('')
  const [sourceUrl, setSourceUrl] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sourceData, setSourceData] = useState(null)
  const [checklistAvailability, setChecklistAvailability] = useState([])
  const [checklistReleaseYear, setChecklistReleaseYear] = useState([])
  const [checklistNotes, setChecklistNotes] = useState([])
  const user = useUser()
  // console.log(originalData.id)
  console.log(user)
  console.log(isAuditor)

   const availableTags = [
    'Gender', 'Year', 'Notes', 'Perfumer', 'Availability', 
    'Parent company', 'Collection', 'Concentration', 'Limited',
    'Vegan', 'Bottle design', 'Images', 'Website', 'Video',
    'PR', 'Screenshot', 'Translation', 'Brand', 'Facts'
  ]

  const handleConfirmSource = (checklistItem) => {
    confirmSource({checklist: checklistItem, source: sourceData[0].id, user: user.id})
          .then((resp) => {
            console.log(resp)
            if (checklistItem === "availability"){
               setChecklistAvailability(prev => {
                if (prev.some(userData => userData.id === user.id)) return prev
                return [...prev, user]
              })
            }else if (checklistItem === "year_of_release"){
              setChecklistReleaseYear(prev => {
                if (prev.some(userData => userData.id === user.id)) return prev
                return [...prev, user]
              })
            }else{
              setChecklistNotes(prev => {
                if (prev.some(userData => userData.id === user.id)) return prev
                return [...prev, user]
              })
            }
           
          })
  }

  const handleRemoveSourceConfirmation = (checklistItem) => {
    removeSourceConfirmation({checklist: checklistItem, source: sourceData[0].id, user: user.id})
        .then((resp) => {
          console.log(resp)
          if (checklistItem === "availability"){
               setChecklistAvailability(prev => prev.filter(userData => userData.id !== user.id))
            }else if (checklistItem === "year_of_release"){
              setChecklistReleaseYear(prev => prev.filter(userData => userData.id !== user.id))
            }else{
              setChecklistNotes(prev => prev.filter(userData => userData.id !== user.id))
            }
          
        })
  }

  const handleToggleChecklist = (checklistItem) => {
    if (checklistItem === 'availability'){
      if (checklistAvailability.length < 1){
        handleConfirmSource(checklistItem)
      }
      checklistAvailability.forEach((userData) => {
        if (user.id === userData.id){
          handleRemoveSourceConfirmation(checklistItem)
        }else{
          handleConfirmSource(checklistItem)
        }
      })

    }else if (checklistItem === "year_of_release"){
      if (checklistReleaseYear.length < 1){
        handleConfirmSource(checklistItem)
      }
      checklistReleaseYear.forEach((userData) => {
        if (user.id === userData.id){
          handleRemoveSourceConfirmation(checklistItem)
        }else{
          handleConfirmSource(checklistItem)
        }
      })

    }else{
      if (checklistNotes.length < 1){
        handleConfirmSource(checklistItem)
      }
      checklistNotes.forEach((userData) => {
        if (user.id === userData.id){
          handleRemoveSourceConfirmation(checklistItem)
        }else{
          handleConfirmSource(checklistItem)
        }
      })
    }
  }



  useEffect(() => {
    getSource(originalData.id)
    .then((resp) => {
      console.log(resp)
      if (resp.error){
        console.log('got resp error for source')
        setSourceData(null)
      }else{
        setSourceData(resp)
        console.log(resp[0])
        resp[0].availability_checklist.forEach((user) => {
          setChecklistAvailability((prev) => [...prev, user])
        })
        resp[0].year_of_release_checklist.forEach((user) => {
          setChecklistReleaseYear((prev) => [...prev, user])
        })
        resp[0].notes_checklist.forEach((user) => {
          setChecklistNotes((prev) => [...prev, user])
        })
      }
    })
  }, [])

  useEffect(() => {
    console.log(checklistAvailability)
  }, [checklistAvailability])

  const handleSubmit = () => {
    addSource({info: sourceDescription, tags: selectedTags, source_url: sourceUrl, selected_perfume: originalData.id, posted_by:user.id})
    .then((resp) => {
      console.log(resp)
    })
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

    return (
        <div className="space-y-6 animate-fade-in">
                {/* Sources Header with Add Button */}
                <Card className="p-6 bg-gradient-to-r from-green-500/10 to-transparent dark:from-green-500/5 border-green-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      {sourceData
                        ? 
                          <h2 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary mb-1">
                            SOURCES <span className="text-green-600 dark:text-green-400">{sourceData.length}</span>
                          </h2>
                        : null
                      }
                      
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        Community-provided sources to verify this proposal
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {/* <Button
                        variant="outline"
                        className="text-green-600 dark:text-green-400 border-green-500/50 hover:bg-green-500/10"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        OPEN ALL
                      </Button> */}
                      
                      {/* Add Source Dialog */}
                      <Dialog open={isAddSourceOpen} onOpenChange={setIsAddSourceOpen}>
                        <DialogTrigger asChild>
                          <Button className="bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/20">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Source
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
                              Add Source
                            </DialogTitle>
                          </DialogHeader>
                          
                          {/* Important Notice */}
                          <Card className="bg-red-500/10 border-red-500/50 p-4">
                            <div className="flex items-start gap-3">
                              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                              <div className="space-y-1">
                                <p className="font-semibold text-red-600 dark:text-red-400 text-sm">
                                  Important:
                                </p>
                                <p className="text-sm text-red-600/90 dark:text-red-400/90 leading-relaxed">
                                  A link to website or a picture document can serve as a source. Especially helpful are screenshots, photos of flacons and outer packaging. You have to state an URL if it is a source on the internet. In case of mere picture sources please compose a description first and add the pictures subsequently.
                                </p>
                              </div>
                            </div>
                          </Card>

                          <div className="space-y-6">
                            {/* Source Description */}
                            <div className="space-y-2">
                              <Label htmlFor="source-description" className="text-light-text-primary dark:text-dark-text-primary font-semibold">
                                Source Infos
                              </Label>
                              <Textarea
                                id="source-description"
                                placeholder="Give details of your source and use +tags. What information can be found there? You can add pictures afterwards."
                                value={sourceDescription}
                                onChange={(e) => setSourceDescription(e.target.value)}
                                className="min-h-[150px] bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border resize-none"
                                maxLength={1000}
                              />
                              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary text-right">
                                {1000 - sourceDescription.length} Characters left
                              </p>
                            </div>

                            {/* Tags */}
                            <div className="space-y-3">
                              <Label className="text-light-text-primary dark:text-dark-text-primary font-semibold">
                                What information does this source contain?
                              </Label>
                              <div className="flex flex-wrap gap-2">
                                {availableTags.map((tag) => (
                                  <button
                                    key={tag}
                                    onClick={() => toggleTag(tag)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                                      selectedTags.includes(tag)
                                        ? 'bg-light-primary dark:bg-dark-primary text-white shadow-lg'
                                        : 'bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-light-text-secondary dark:text-dark-text-secondary hover:border-light-primary dark:hover:border-dark-primary'
                                    }`}
                                  >
                                    +{tag}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* URL Input */}
                            <div className="space-y-2">
                              <Label htmlFor="source-url" className="text-light-text-primary dark:text-dark-text-primary font-semibold">
                                URL of the Source
                              </Label>
                              <Input
                                id="source-url"
                                type="url"
                                placeholder="Full URL"
                                value={sourceUrl}
                                onChange={(e) => setSourceUrl(e.target.value)}
                                className="bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border"
                              />
                              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                                Enter a <span className="font-semibold">complete</span> URL.
                              </p>
                            </div>

                            {/* Image Upload Notice */}
                            <div className="flex items-center gap-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                              <ImageIcon className="w-4 h-4" />
                              <span>You can attach images afterwards.</span>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                              <Button
                                className="flex-1 bg-light-primary hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 text-white"
                                onClick={() => {
                                  // Handle source submission
                                  handleSubmit()
                                  setIsAddSourceOpen(false)
                                  setSourceDescription('')
                                  setSourceUrl('')
                                  setSelectedTags([])
                                }}
                              >
                                Send
                              </Button>
                              <Button
                                variant="outline"
                                className="flex-1 border-light-border dark:border-dark-border"
                                onClick={() => {
                                  setIsAddSourceOpen(false)
                                  setSourceDescription('')
                                  setSourceUrl('')
                                  setSelectedTags([])
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </Card>

                {/* Sources Checklist */}
                <Card className="p-6 bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border">
                  <h3 className="text-lg font-bold text-light-text-primary dark:text-dark-text-primary mb-2 uppercase">
                    Sources Checklist
                  </h3>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-6">
                    Confirm, if a source has been entered for the respective information.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Availability */}

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase">
                          Availability
                        </h4>
                        {isAuditor
                          ? (sourceData
                            ? 
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleToggleChecklist("availability")}
                                // className='h-7 px-2 transition-all duration-200 text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'
                                className={`h-7 px-2 transition-all duration-200 ${
                                  checklistAvailability.some((c) => c.id === user.id)
                                    ? "bg-green-500/20 text-green-600 dark:text-green-400 hover:bg-green-500/30"
                                    : "text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-primary/10 dark:hover:bg-dark-primary/10"
                                }`}
                              >
                                {/* <CheckCircle2 className="w-4 h-4" /> */}
                                
                                {checklistAvailability.some((c) => c.id === user.id) ? (
                                  <CheckCircle2 className="w-4 h-4" />
                                ) : (
                                  <Circle className="w-4 h-4" />
                                )}
                              </Button>
                            : null
                          )
                          : null
                          
                        }
                      </div>
                      <div className="space-y-2">
                        {checklistAvailability.length > 0 ? (
                          checklistAvailability.map((user, idx) => (
                            <div key={idx} className="flex items-center gap-2 animate-fade-in">
                              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm text-light-text-primary dark:text-dark-text-primary font-medium">
                                {user.username}
                              </span>
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary italic">
                            No confirmations yet
                          </p>
                        )}
                      </div>
                  </div>

                    {/* Year of Release */}
                   
                      <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase">
                          Year of Release
                        </h4>
                        {isAuditor
                          ? (sourceData
                            ? 
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleToggleChecklist("year_of_release")}
                                // className='h-7 px-2 transition-all duration-200 text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'
                                className={`h-7 px-2 transition-all duration-200 ${
                                  checklistReleaseYear.some((c) => c.id === user.id)
                                    ? "bg-green-500/20 text-green-600 dark:text-green-400 hover:bg-green-500/30"
                                    : "text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-primary/10 dark:hover:bg-dark-primary/10"
                                }`}
                              >
                                {/* <CheckCircle2 className="w-4 h-4" /> */}
                                
                                {checklistReleaseYear.some((c) => c.id === user.id) ? (
                                  <CheckCircle2 className="w-4 h-4" />
                                ) : (
                                  <Circle className="w-4 h-4" />
                                )}
                              </Button>
                            : null
                          )
                          : null
                          
                        }
                      </div>
                      <div className="space-y-2">
                        {checklistReleaseYear.length > 0 ? (
                          checklistReleaseYear.map((user, idx) => (
                            <div key={idx} className="flex items-center gap-2 animate-fade-in">
                              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm text-light-text-primary dark:text-dark-text-primary font-medium">
                                {user.username}
                              </span>
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary italic">
                            No confirmations yet
                          </p>
                        )}
                      </div>
                  </div>
                      
                      

                    {/* Fragrance Notes */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase">
                          Fragrance Notes
                        </h4>
                        {isAuditor
                          ? (sourceData
                            ? 
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleToggleChecklist("notes")}
                                // className='h-7 px-2 transition-all duration-200 text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'
                                className={`h-7 px-2 transition-all duration-200 ${
                                  checklistNotes.some((c) => c.id === user.id)
                                    ? "bg-green-500/20 text-green-600 dark:text-green-400 hover:bg-green-500/30"
                                    : "text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-primary/10 dark:hover:bg-dark-primary/10"
                                }`}
                              >
                                {/* <CheckCircle2 className="w-4 h-4" /> */}
                                
                                {checklistNotes.some((c) => c.id === user.id) ? (
                                  <CheckCircle2 className="w-4 h-4" />
                                ) : (
                                  <Circle className="w-4 h-4" />
                                )}
                              </Button>
                            : null
                          )
                          : null
                          
                        }
                      </div>
                      <div className="space-y-2">
                        {checklistNotes.length > 0 ? (
                          checklistNotes.map((user, idx) => (
                            <div key={idx} className="flex items-center gap-2 animate-fade-in">
                              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm text-light-text-primary dark:text-dark-text-primary font-medium">
                                {user.username}
                              </span>
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary italic">
                            No confirmations yet
                          </p>
                        )}
                      </div>
                  </div>

                  </div>
                </Card>

                {/* Sources List */}
                <div className="space-y-4">
                  {sourceData
                  
                    ? (sourceData.map((source) => (
                        <SourcesCard sourceData={source}/>
                    )))
                    : <p>Sorry dosnt look like theres any sources posted.</p>
                  }
                  
                </div>
              </div>
    )
}