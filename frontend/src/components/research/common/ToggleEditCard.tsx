import { Edit3 } from "lucide-react";
import { Card } from "../../database/perfumeDetails/card";
import dayjs from 'dayjs'
import relatveTime from "dayjs/plugin/relativeTime"
dayjs.extend(relatveTime)

export default function ToggleEditCard({editedIdx, editedInfo, originalData, subEdits, field, dataField}) {

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
                              </span>
                            </div>

                            {/* Edit Change */}
                            <div className="flex items-center gap-3 flex-wrap">
                              {originalData[dataField] && (
                                <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary line-through">

                                    {dataField === 'availability'
                                      ? (originalData[dataField]
                                        ? "Availabile"
                                        : "Not Availabile"
                                      )
                                      : null
                                    }

                                    {dataField === 'is_varient'
                                      ? (originalData[dataField]
                                        ? "Flanker"
                                        : "Original"
                                      )
                                      : null
                                    }

                                    {dataField === 'is_limited'
                                      ? (originalData[dataField]
                                        ? "Limited"
                                        : "Original"
                                      )
                                      : null
                                    }

                                    {dataField === 'is_collectors'
                                      ? (originalData[dataField]
                                        ? "Collectors Edition"
                                        : "Original"
                                      )
                                      : null
                                    }

                                </span>
                              )}
                            
                              {!editedInfo[editedIdx].isRemoved
                                ? <span className="text-light-text-secondary dark:text-dark-text-secondary">→</span>
                                : null
                              }
                                {dataField === 'availability'
                                  ? (editedInfo[editedIdx][dataField]
                                    ? "Availabile"
                                    : "Not Availabile"
                                  )
                                  : null
                                }

                                {dataField === 'is_varient'
                                  ? (editedInfo[editedIdx][dataField]
                                    ? "Flanker"
                                    : "Original"
                                  )
                                  : null
                                }

                                {dataField === 'is_limited'
                                  ? (editedInfo[editedIdx][dataField]
                                    ? "Limited"
                                    : "Original"
                                  )
                                  : null
                                }

                                {dataField === 'is_collectors'
                                  ? (editedInfo[editedIdx][dataField]
                                    ? "Collectors Edition"
                                    : "Original"
                                  )
                                  : null
                                }

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

                                          {dataField === 'availability'
                                            ? (subEdits.length > 1 && idx > 0
                                              ? (subEdits[idx - 1][dataField]
                                                ? "Avaliable"
                                                : "Not Avaliable"
                                              )
                                              : (editedInfo[editedIdx][dataField]
                                                ? "Avaliable"
                                                : "Not Avaliable"
                                              )
                                            )
                                            : null
                                          }

                                          {dataField === 'is_varient'
                                            ? (subEdits.length > 1 && idx > 0
                                              ? (subEdits[idx - 1][dataField]
                                                ? "Flanker"
                                                : "Original"
                                              )
                                              : (editedInfo[editedIdx][dataField]
                                                ? "Flanker"
                                                : "Original"
                                              )
                                            )
                                            : null
                                          }

                                          {dataField === 'is_limited'
                                            ? (subEdits.length > 1 && idx > 0
                                              ? (subEdits[idx - 1][dataField]
                                                ? "Limited"
                                                : "Original"
                                              )
                                              : (editedInfo[editedIdx][dataField]
                                                ? "Limited"
                                                : "Original"
                                              )
                                            )
                                            : null
                                          }

                                          {dataField === 'is_collectors'
                                            ? (subEdits.length > 1 && idx > 0
                                              ? (subEdits[idx - 1][dataField]
                                                ? "Collectors Edition"
                                                : "Original"
                                              )
                                              : (editedInfo[editedIdx][dataField]
                                                ? "Collectors Edition"
                                                : "Original"
                                              )
                                            )
                                            : null
                                          }

                                            
                                        </span>
                                      )}
                                      <span className="text-light-text-secondary dark:text-dark-text-secondary">→</span>

                                      <span className="text-sm font-medium text-green-600 dark:text-green-400">

                                        
                                      {dataField === 'availability'
                                        ? (subEdit[dataField]
                                          ? <>Avaliable</>
                                          : <>Not Avaliable</>
                                        )
                                        : null
                                      }

                                      {dataField === 'is_varient'
                                        ? (subEdit[dataField]
                                          ? <>Flanker</>
                                          : <>Original</>
                                        )
                                        : null
                                      }

                                      {dataField === 'is_limited'
                                        ? (subEdit[dataField]
                                          ? <>Limited</>
                                          : <>Original</>
                                        )
                                        : null
                                      }

                                      {dataField === 'is_collectors'
                                        ? (subEdit[dataField]
                                          ? <>Collectors Edition</>
                                          : <>Original</>
                                        )
                                        : null
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