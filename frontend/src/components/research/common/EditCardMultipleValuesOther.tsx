import { Edit3 } from "lucide-react";
import { Card } from "../../database/perfumeDetails/card";
import dayjs from 'dayjs'
import relatveTime from "dayjs/plugin/relativeTime"
dayjs.extend(relatveTime)

export default function EditCardMultipleValuesOther({editedIdx, editedInfo, originalData, subEdits, field, dataField}) {
    console.log(editedInfo)
    console.log(subEdits)
    console.log(originalData)
    console.log(dataField)
    console.log(editedInfo[editedIdx])
    console.log(subEdits[dataField])
    console.log(subEdits)
    // console.log(subEdits)
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
                                  {originalData[dataField].length > 0 && editedInfo[editedIdx][dataField].length < 1
                                    ? <span className="text-red-600 dark:text-red-400">(REMOVED)</span>
                                    : null
                                }
                              </span>
                            </div>

                            {/* Edit Change */}
                            <div className="flex items-center gap-3 flex-wrap">
                              {originalData[dataField] && (
                                <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary line-through">
                                  {originalData[dataField]
                                    ? (originalData[dataField].map((data) => {
                                        return <p>{data}, </p>
                                    }))
                                    : null
                                  }
                                  
                                </span>
                              )}
                              {!editedInfo[editedIdx].isRemoved && originalData[dataField] && (
                                <span className="text-light-text-secondary dark:text-dark-text-secondary">→</span>
                              )}
                              {!editedInfo[editedIdx].isRemoved && editedInfo[editedIdx] && (
                                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                                    {editedInfo[editedIdx][dataField].length > 0
                                        ? (editedInfo[editedIdx][dataField].map((data) => {
                                            return <>{data}, </>
                                        }))
                                        : <span className="text-red-600 dark:text-red-400">(REMOVED)</span>
                                    }
                                </span>
                              )}
                            </div>

                            {/* Sub-edits */}
                            {subEdits && subEdits.length > 0 &&  (
                              <div className="mt-4 ml-6 space-y-3 border-l-2 border-light-border dark:border-dark-border pl-4">
                                {subEdits.map((subEdit, idx) => (
                                  <div key={idx} className="space-y-1">
                                    <div className="flex items-center gap-2 text-xs text-light-text-secondary dark:text-dark-text-secondary">
                                      <span className="font-medium">{subEdit.edited_by.username}</span>
                                      <span>{dayjs(subEdit.created_at).fromNow()}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      {idx < 1
                                        ? (editedInfo[editedIdx][dataField] && (
                                          <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary line-through">
                                            {editedInfo[editedIdx][dataField]
                                              ? (editedInfo[editedIdx][dataField].length > 0
                                                ? editedInfo[editedIdx][dataField].map((data) => {
                                                    return <>{data}, </>
                                                  })
                                                : <>No Data</>
                                              )
                                              : null
                                            }
                                          </span>
                                        ))
                                        : (subEdits[idx - 1][dataField] && (
                                          <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary line-through">
                                            {subEdits[idx - 1][dataField]
                                              ? (subEdits[idx - 1][dataField].length > 0
                                                ? subEdits[idx - 1][dataField].map((data) => {
                                                    return <>{data}</>
                                                  })
                                                : <>No data</>

                                              )
                                              : null
                                            }
                                          </span>

                                        ))
                                      
                                      }
                                      <span className="text-light-text-secondary dark:text-dark-text-secondary">→</span>
                                      <span className="text-sm font-medium text-green-600 dark:text-green-400">

                                        {subEdit[dataField].length > 0
                                            ? (subEdit[dataField].map((data) => {
                                                return <>{data}, </>
                                            }))
                                            : <span className="text-red-600 dark:text-red-400">(REMOVED)</span>
                                        }
  
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