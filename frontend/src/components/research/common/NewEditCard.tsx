import { Edit3 } from "lucide-react";
import { Card } from "../../database/perfumeDetails/card";
import dayjs from 'dayjs'
import relatveTime from "dayjs/plugin/relativeTime"
dayjs.extend(relatveTime)

export default function NewEditCard({editedIdx, editedInfo, originalData, subEdits, field, dataField}) {

    console.log('got edit card')
    console.log(editedInfo)
    console.log(originalData)
    console.log(field)
    console.log(dataField)
    console.log(originalData[dataField])
    console.log(subEdits)
    console.log(subEdits.length)
    console.log(editedInfo[editedIdx])
    
    return (
                <Card
                    key={editedIdx}
                    className="p-6 bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border hover:shadow-lg transition-all duration-300"
                >
                        {/* Edit Header */}
                        <div className="flex items-start gap-4 mb-4">
                          <img
                            // src={edit.user.avatar || "/placeholder.svg"}
                            alt={editedInfo[editedIdx].edited_by.username}
                            className="w-10 h-10 rounded-full border-2 border-light-border dark:border-dark-border"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-bold text-light-text-primary dark:text-dark-text-primary">
                                {editedInfo[editedIdx].edited_by.username}
                              </span>
                              {/* {edit.user.isAuditor && (
                                <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 text-xs">
                                  Auditor
                                </Badge>
                              )} */}
                              <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                {dayjs(editedInfo[editedIdx].created_at).fromNow()}
                              </span>
                            </div>
                            
                            {/* Field Name */}
                            <div className="mb-3">
                              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary font-semibold text-sm">
                                <Edit3 className="w-3.5 h-3.5" />
                                  {field}
                                  {dataField !== 'brand' && dataField !== 'parent_company' && dataField !== 'fragrance_collection'
                                    ? (String(originalData[dataField]).length > 0 && String(editedInfo[editedIdx][dataField]).length < 1 
                                      ? <span className="text-red-600 dark:text-red-400">(REMOVED)</span>
                                      : null
                                    )
                                    : (originalData[dataField]?.name.length > 1 && editedInfo[editedIdx][dataField] === null
                                        ? <span className="text-red-600 dark:text-red-400">(REMOVED)</span>
                                        : null

                                    )
                                  }
                                  {/* {originalData[dataField].length > 0 && editedInfo[editedIdx][dataField].length < 1
                                    ? <span className="text-red-600 dark:text-red-400">(REMOVED)</span>
                                    : null
                                  } */}
                                {/* {edit.isRemoved && (
                                  <span className="text-red-600 dark:text-red-400">(REMOVED)</span>
                                )} */}
                              </span>
                            </div>

                            {/* Edit Change */}
                            <div className="flex items-center gap-3 flex-wrap">
                              {originalData[dataField] && (
                                <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary line-through">
                                  {dataField !== 'brand' && dataField !== 'parent_company' && dataField !== 'fragrance_collection'
                                    ? (String(originalData[dataField]).length > 1
                                        ? String(originalData[dataField])
                                        : null
                                    )
                                    : (originalData[dataField].name.length > 1
                                        ? originalData[dataField].name
                                        : null
                                    )
                                  }
                                </span>
                              )}

                              {dataField !== 'brand' && dataField !== 'parent_company' && dataField !== 'fragrance_collection'
                                ? (!editedInfo[editedIdx].isRemoved && String(originalData[dataField]).length > 1 
                                    ? <span className="text-light-text-secondary dark:text-dark-text-secondary">→</span>
                                    : null
                                )
                                : (!editedInfo[editedIdx].isRemoved && originalData[dataField]?.name.length > 1 
                                    ? <span className="text-light-text-secondary dark:text-dark-text-secondary">→</span>
                                    : null
                                )
                              }
                              {/* {!editedInfo[editedIdx].isRemoved && originalData[dataField] && (
                                <span className="text-light-text-secondary dark:text-dark-text-secondary">→</span>
                              )} */}

                              {dataField !== 'brand' && dataField !== 'parent_company' && dataField !== 'fragrance_collection'
                                ? (!editedInfo[editedIdx].isRemoved && String(editedInfo[editedIdx][dataField]).length > 1
                                    ? String(editedInfo[editedIdx][dataField])
                                    : <span className="text-red-600 dark:text-red-400">(REMOVED)</span>
                                )
                                : (!editedInfo[editedIdx].isRemoved && editedInfo[editedIdx][dataField]?.name.length > 1
                                    ? editedInfo[editedIdx][dataField].name
                                    : <span className="text-red-600 dark:text-red-400">(REMOVED)</span>
                                )
                              }
                              {dataField !== 'brand' && dataField !== 'parent_company' && dataField !== 'fragrance_collection'
                                ? (String(originalData[dataField]).length < 1 || !originalData[dataField] && String(editedInfo[editedIdx][dataField]).length > 0
                                  ? <span className="text-green-600 dark:text-green-400">(ADDED)</span>
                                  : null
                                )
                                : (originalData[dataField]?.name.length < 1 || !originalData[dataField]?.name  && editedInfo[editedIdx][dataField]?.name.length > 0
                                  ? <span className="text-green-600 dark:text-green-400">(ADDED)</span>
                                  : null
                                )
                              }

                              {/* {!editedInfo[editedIdx].isRemoved && editedInfo[editedIdx][dataField] && (
                                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                                  
                                  {dataField !== 'brand'
                                    ? editedInfo[editedIdx][dataField]
                                    : editedInfo[editedIdx][dataField].name
                                  }
                                </span>
                              )} */}
                            </div>

                            {/* Sub-edits */}
                            {subEdits && subEdits.length > 0 && (
                              <div className="mt-4 ml-6 space-y-3 border-l-2 border-light-border dark:border-dark-border pl-4">
                                {subEdits.map((subEdit, idx) => (
                                  <div key={idx} className="space-y-1">
                                    <div className="flex items-center gap-2 text-xs text-light-text-secondary dark:text-dark-text-secondary">
                                      <span className="font-medium">{subEdit.edited_by.username}</span>
                                      <span>{dayjs(subEdit.created_at).fromNow()}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      {editedInfo[editedIdx] && (
                                        <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary line-through">
                                          
                                          {subEdits.length > 1 && idx > 0
                                            ? (dataField !== 'brand' && dataField !== 'parent_company' && dataField !== 'fragrance_collection'
                                              ? (String(subEdits[idx - 1][dataField]).length > 1
                                                ? String(subEdits[idx - 1][dataField])
                                                : null
                                              )
                                              : (subEdits[idx - 1][dataField]?.name.length > 1
                                                ? subEdits[idx - 1][dataField].name
                                                : null
                                              )

                                            )
                                            : (dataField !== 'brand' && dataField !== 'parent_company' && dataField !== 'fragrance_collection'
                                              ? (String(editedInfo[editedIdx][dataField]).length > 1
                                                ? String(editedInfo[editedIdx][dataField])
                                                : null
                                              )
                                              : (editedInfo[editedIdx][dataField]?.name.length > 1
                                                ? editedInfo[editedIdx][dataField].name
                                                : null
                                              )
                                            )
                                          }
                                          {/* {dataField !== 'brand'
                                            ? (editedInfo[editedIdx][dataField].length > 1
                                                ? editedInfo[editedIdx][dataField]
                                                : null
                                            )
                                            : (editedInfo[editedIdx][dataField]?.name.length > 1
                                                ? editedInfo[editedIdx][dataField].name
                                                : null
                                            )
                                          } */}
                                        </span>
                                      )}
                                      <span className="text-light-text-secondary dark:text-dark-text-secondary">→</span>
                                      {/* {dataField !== 'brand'
                                        ? (subEdit[dataField].length > 1 && (
                                          <span className="text-light-text-secondary dark:text-dark-text-secondary">→</span>
                                        ))
                                        : (subEdit[dataField]?.name.length > 1 && (
                                          <span className="text-light-text-secondary dark:text-dark-text-secondary">→</span>
                                        ))
                                      } */}

                                      
                                      <span className="text-sm font-medium text-green-600 dark:text-green-400">

                                        

                                        {dataField !== 'brand' && dataField !== 'parent_company' && dataField !== 'fragrance_collection'
                                          ? (String(subEdit[dataField]).length > 0
                                             ? <>{String(subEdit[dataField])}</>
                                             : <span className="text-red-600 dark:text-red-400">(REMOVED)</span>
                                          )
                                          : (subEdit[dataField] !== null
                                            ? (subEdit[dataField]?.name.length > 0
                                              ? <>{subEdit[dataField]?.name}</>
                                              : <span className="text-red-600 dark:text-red-400">(REMOVED)</span>
                                            )
                                            : <span className="text-red-600 dark:text-red-400">(REMOVED)</span>
                                          )
                                          // : (subEdit[dataField] !== null
                                          //   // && subEdit[dataField]?.name.length > 0
                                          //     ? <>{subEdit[dataField]?.name}</>
                                          //     : <span className="text-red-600 dark:text-red-400">(REMOVED)</span>

                                          // )
                                          
                                        }
                                        
                                        {/* {dataField !== 'brand'
                                          ? subEdit[dataField]
                                          : subEdit[dataField]?.name
                                        } */}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
    )
}