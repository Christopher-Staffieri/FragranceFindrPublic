import { useState } from 'react'
import { AlertCircle, CheckCircle2, Clock, User, Sparkles, Eye, ChevronDown, ChevronUp, ArrowLeft, FileText, Link2, MessageSquare, Edit3, Plus, ExternalLink, X, ImageIcon, Tag, Send } from 'lucide-react'
import { Badge } from '../components/research/common/StatusBadge'
import { Button } from '../components/MainButton'
import { Card } from '../components/database/perfumeDetails/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/common/dialog'
import { Textarea } from '../components/TextArea'
import { Input } from '../components/Input'
import { Label } from '../components/Label'



export default function ViewProposedPerfumeOverview({proposalData, originalInfo, editedInfo}){

    console.log(proposalData)
    console.log(originalInfo)
    console.log(editedInfo)
    
    

    function CollapsibleSection({ title, children, defaultOpen = true }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  
  return (
    <Card className="overflow-hidden bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-light-primary/10 to-transparent dark:from-dark-primary/10 hover:from-light-primary/20 dark:hover:from-dark-primary/20 transition-all duration-300"
      >
        <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary uppercase tracking-wide">
          {title}
        </h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary transition-transform duration-300" />
        ) : (
          <ChevronDown className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary transition-transform duration-300" />
        )}
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="p-6">
          {children}
        </div>
      </div>
    </Card>
  )
}

function InfoRow({ label, value, isCustom = false }: { label: string, value: React.ReactNode, isCustom?: boolean }) {
  return (
    <div className="grid grid-cols-3 gap-4 py-3 border-b border-light-border dark:border-dark-border last:border-b-0">
      <div className="font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase text-sm">
        {label}
      </div>
      <div className="col-span-2 text-light-text-primary dark:text-dark-text-primary flex items-center gap-2">
        {value}
        {isCustom && (
          <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20">
            Custom
          </Badge>
        )}
      </div>
    </div>
  )
}

    return(
        <>
                {/* General Information */}
                <CollapsibleSection title="General Information">
                  <div className="space-y-0">

                    {editedInfo
                      ? <InfoRow label="Perfume" value={editedInfo.perfume} />
                      : <InfoRow label="Perfume" value={originalInfo.perfume} />
                    }

                    {editedInfo !== null
                      ? (editedInfo.brand !== null
                          ? 
                            <InfoRow 
                              label="Brand" 
                              value={editedInfo.brand.name} 
                              isCustom={false}
                            />
                          : 
                            <InfoRow 
                              label="Brand" 
                              value={editedInfo.brand_other} 
                              isCustom={true}
                            />
                        )
                      : (originalInfo.brand !== null
                        ?
                          <InfoRow 
                              label="Brand" 
                              value={originalInfo.brand.name} 
                              isCustom={false}
                            />
                        : 
                          <InfoRow 
                              label="Brand" 
                              value={originalInfo.brand_other} 
                              isCustom={true}
                            />
                      ) 
                    }

                    {editedInfo
                      ? <InfoRow label="Gender" value={editedInfo.gender} />
                      : <InfoRow label="Gender" value={originalInfo.gender} />
                    }
                    
                   {editedInfo
                      ? <InfoRow label="Year of Release" value={editedInfo.edited_release_year} />
                      : <InfoRow label="Year of Release" value={originalInfo.release_year} />
                    }

                    {editedInfo
                     ? (editedInfo.availability
                        ? <InfoRow label="Availability" value={'In Production'} />
                        : <InfoRow label="Availability" value={'Discontinued'} />
                     )
                     : (originalInfo.availability
                        ? <InfoRow label="Availability" value={'In Production'} />
                        : <InfoRow label="Availability" value={'Discontinued'} />
                     )
                    
                    }
                    
                    {editedInfo
                      ? (editedInfo.perfumers.length > 0
                        ? 
                          <InfoRow 
                            label="Perfumer(s)" 
                            value={
                              <div className="flex flex-wrap gap-2">
                                {editedInfo.perfumers.map((perfumer, idx) => (
                                  <Badge key={idx} className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">
                                    {perfumer.name}
                                  </Badge>
                                ))}
                              </div>
                            }
                          />
                        : null
                      )
                      : (originalInfo.perfumers.length > 0
                        ? 
                          <InfoRow 
                            label="Perfumer(s)" 
                            value={
                              <div className="flex flex-wrap gap-2">
                                {originalInfo.perfumers.map((perfumer, idx) => (
                                  <Badge key={idx} className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">
                                    {perfumer.name}
                                  </Badge>
                                ))}
                              </div>
                            }
                          />
                        : null
                      )
                    }

                    {editedInfo
                      ? (editedInfo.perfumers_other.length > 0
                        ? 
                          <InfoRow 
                            label="Custom Perfumer(s)" 
                            value={
                              <div className="flex flex-wrap gap-2">
                                {editedInfo.perfumers_other.map((perfumer, idx) => (
                                  <Badge key={idx} className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20">
                                    {perfumer}
                                  </Badge>
                                ))}
                              </div>
                            }
                            isCustom
                          />
                        : null
                      )
                      : (originalInfo.perfumers_other.length > 0
                        ? 
                          <InfoRow 
                            label="Custom Perfumer(s)" 
                            value={
                              <div className="flex flex-wrap gap-2">
                                {originalInfo.perfumers_other.map((perfumer, idx) => (
                                  <Badge key={idx} className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20">
                                    {perfumer}
                                  </Badge>
                                ))}
                              </div>
                            }
                            isCustom
                          />
                        : null
                      )
                    }

                    {editedInfo 
                      ? (editedInfo.bottle_designer.length > 0
                          ? 
                            <InfoRow 
                              label="Bottle Designer(s)" 
                              value={
                                <div className="flex flex-wrap gap-2">
                                  {editedInfo.bottle_designer.map((designer, idx) => (
                                    <Badge key={idx} className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">
                                      {designer.name}
                                    </Badge>
                                  ))}
                                </div>
                              }
                            />
                          : null
                      )
                      
                      : (originalInfo.bottle_designer.length > 0
                          ? 
                            <InfoRow 
                              label="Bottle Designer(s)" 
                              value={
                                <div className="flex flex-wrap gap-2">
                                  {originalInfo.bottle_designer.map((designer, idx) => (
                                    <Badge key={idx} className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">
                                      {designer.name}
                                    </Badge>
                                  ))}
                                </div>
                              }
                            />
                          : null
                      )
                    
                    }
                    
                    {editedInfo
                      ? (editedInfo.bottle_designer_other.length > 0
                          ? 
                            <InfoRow 
                              label="Custom Bottle Designer(s)" 
                              value={
                                <div className="flex flex-wrap gap-2">
                                  {editedInfo.bottle_designer_other.map((designer, idx) => (
                                    <Badge key={idx} className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20">
                                      {designer}
                                    </Badge>
                                  ))}
                                </div>
                              }
                              isCustom
                            />
                          : null
                      )

                      : (originalInfo.bottle_designer_other.length > 0
                          ? 
                            <InfoRow 
                              label="Custom Bottle Designer(s)" 
                              value={
                                <div className="flex flex-wrap gap-2">
                                  {originalInfo.bottle_designer_other.map((designer, idx) => (
                                    <Badge key={idx} className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20">
                                      {designer}
                                    </Badge>
                                  ))}
                                </div>
                              }
                              isCustom
                            />
                          : null
                      )
                    
                    }

                    
                    {/* {proposalData.isVegan && (
                      <InfoRow 
                        label="Properties" 
                        value={
                          <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
                            Vegan
                          </Badge>
                        }
                      />
                    )} */}

                    {editedInfo
                      ? 
                        <InfoRow 
                          label="Limited Edition" 
                          value={editedInfo.is_limited && 'Yes'}
                        />
                      :
                        <InfoRow 
                          label="Limited Edition" 
                          value={originalInfo.is_limited && 'Yes'}
                        />
                    }

                    {editedInfo
                      ? (editedInfo.is_limited
                          ? 
                            <InfoRow 
                              label="Limited Edition Original" 
                              value={editedInfo.limited_original_perfume}
                            />
                          : null
                      )
                      : (originalInfo.is_limited
                          ? 
                            <InfoRow 
                              label="Limited Edition Original" 
                              value={originalInfo.limited_original_perfume}
                            />
                          : null
                      )
                    
                    }

                  </div>
                </CollapsibleSection>

                {/* Fragrance Notes */}
                <CollapsibleSection title="Fragrance Notes">
                  
                  {editedInfo
                    ? (Object.keys(editedInfo.notes).includes('top')
                  
                      ? 
                        <div className="space-y-4">
                          {editedInfo.notes.top.length > 0 && (
                            <div>
                              <h4 className="text-sm font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase mb-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                                Top Notes ({editedInfo.notes.top.length})
                              </h4>
                              <p className="text-light-text-primary dark:text-dark-text-primary">
                                {editedInfo.notes.top.join(', ')}
                              </p>
                            </div>
                          )}
                      
                          {editedInfo.notes.heart.length > 0 && (
                            <div>
                              <h4 className="text-sm font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase mb-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                                Heart Notes ({editedInfo.notes.heart.length})
                              </h4>
                              <p className="text-light-text-primary dark:text-dark-text-primary">
                                {editedInfo.notes.heart.join(', ')}
                              </p>
                            </div>
                          )}
                      
                          {editedInfo.notes.base.length > 0 && (
                            <div>
                              <h4 className="text-sm font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase mb-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                Base Notes ({editedInfo.notes.base.length})
                              </h4>
                              <p className="text-light-text-primary dark:text-dark-text-primary">
                                {editedInfo.notes.base.join(', ')}
                              </p>
                            </div>
                          )}
                    </div>
                      : 
                          <div>
                            <h4 className="text-sm font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase mb-2">
                              Linear Notes
                            </h4>
                            <p className="text-light-text-primary dark:text-dark-text-primary">
                              {editedInfo.notes.linear.join(', ') || 'No notes provided'}
                            </p>
                          </div>
                      )
                    : (Object.keys(originalInfo.notes).includes('top')
                  
                        ? 
                          <div className="space-y-4">
                          {originalInfo.notes.top.length > 0 && (
                            <div>
                              <h4 className="text-sm font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase mb-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                                Top Notes ({originalInfo.notes.top.length})
                              </h4>
                              <p className="text-light-text-primary dark:text-dark-text-primary">
                                {originalInfo.notes.top.join(', ')}
                              </p>
                            </div>
                          )}
                      
                          {originalInfo.notes.heart.length > 0 && (
                            <div>
                              <h4 className="text-sm font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase mb-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                                Heart Notes ({originalInfo.notes.heart.length})
                              </h4>
                              <p className="text-light-text-primary dark:text-dark-text-primary">
                                {originalInfo.notes.heart.join(', ')}
                              </p>
                            </div>
                          )}
                      
                          {originalInfo.notes.base.length > 0 && (
                            <div>
                              <h4 className="text-sm font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase mb-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                Base Notes ({originalInfo.notes.base.length})
                              </h4>
                              <p className="text-light-text-primary dark:text-dark-text-primary">
                                {originalInfo.notes.base.join(', ')}
                              </p>
                            </div>
                          )}
                        </div>

                        : 
                          <div>
                            <h4 className="text-sm font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase mb-2">
                              Linear Notes
                            </h4>
                            <p className="text-light-text-primary dark:text-dark-text-primary">
                              {originalInfo.notes.linear.join(', ') || 'No notes provided'}
                            </p>
                          </div>
                      )
                  }
 
                </CollapsibleSection>

                

                {/* Interesting Facts */}
                {editedInfo
                
                  ? (editedInfo.interesting_facts.length > 1

                    ?
                      <CollapsibleSection title="Interesting Facts" defaultOpen={false}>
                        <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase mb-2">
                                English
                              </h4>
                              <p className="text-light-text-primary dark:text-dark-text-primary">
                                {editedInfo.interesting_facts}
                              </p>
                            </div>
                        </div>
                      </CollapsibleSection>
                    : null
                  )
                  : (originalInfo.interesting_facts.length > 1

                    ? 
                      <CollapsibleSection title="Interesting Facts" defaultOpen={false}>
                        <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase mb-2">
                                English
                              </h4>
                              <p className="text-light-text-primary dark:text-dark-text-primary">
                                {originalInfo.interesting_facts}
                              </p>
                            </div>
                        </div>
                      </CollapsibleSection>
                    : null
                  )
                
                }

                
                {/* Video Links */}
                {(proposalData.youtubeLink || proposalData.vimeoLink) && (
                  <CollapsibleSection title="Video" defaultOpen={false}>
                    <div className="space-y-3">
                      {proposalData.youtubeLink && (
                        <div>
                          <h4 className="text-sm font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase mb-2">
                            YouTube Link
                          </h4>
                          <a 
                            href={proposalData.youtubeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-light-primary dark:text-dark-primary hover:underline"
                          >
                            {proposalData.youtubeLink}
                          </a>
                        </div>
                      )}
                      
                      {proposalData.vimeoLink && (
                        <div>
                          <h4 className="text-sm font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase mb-2">
                            Vimeo Link
                          </h4>
                          <a 
                            href={proposalData.vimeoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-light-primary dark:text-dark-primary hover:underline"
                          >
                            {proposalData.vimeoLink}
                          </a>
                        </div>
                      )}
                    </div>
                  </CollapsibleSection>
                )}
              </>
    )
}