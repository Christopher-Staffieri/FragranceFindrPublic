type NewValue = { name: string; isCustom: boolean };

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronDown, Plus, Search, Loader2, ArrowLeft, X } from "lucide-react"
import { cn } from "../../../lib/utils"
import { Input } from "../../Input"
import { Button } from "../../MainButton"
import { debounce } from "lodash"
import { useCallback, useEffect } from "react"
import { getSearchedBottleDesigners, getSearchedBrands, getSearchedFragranceCollections, getSearchedParentCompanies, getSearchedPerfumers } from "../../../lib/allauth"

export interface AutocompleteItem {
  name: string
  isCustom?: boolean
}

interface ModernAutocompleteProps {
  // Required props
  label: string
  category: string

  // Single or multi-select
  multiple?: boolean
  selectedItems?: string[]
  selectedItem?: string
  onSelectionChange?: (items) => void
  onSingleSelectionChange?: (item) => void

  // Optional props
  placeholder?: string
  allowCustom?: boolean
  customItemLabel?: string
  icon?: React.ElementType
  className?: string
  isLoading?: boolean
  emptyMessage?: string
  maxHeight?: string
  required?: boolean
  error?: string
}

export function ProposeResearchAutoComplete({
  label,
  multiple = true,
  selectedItems = [],
  selectedItem = "",
  onSelectionChange,
  onSingleSelectionChange,
  placeholder = "Search...",
  allowCustom = false,
  customItemLabel = "Add custom",
  icon: Icon,
  category,
  className,
  isLoading = false,
  emptyMessage = "No results found",
  maxHeight = "max-h-60",
  required = false,
  error = "",
}: ModernAutocompleteProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState("")
  const [showCustomInput, setShowCustomInput] = React.useState(false)
  const [customValue, setCustomValue] = React.useState("")
  const [isSearching, setIsSearching] = React.useState(false)
  const [items, setItems] = React.useState([])
  const [filteredItems, setFilteredItems] = React.useState([])
  const dropdownRef = React.useRef<HTMLDivElement>(null)



  const fetchData = useCallback(
      debounce(async(searchTerm) => {
        // if (searchTerm.length > 0){
          if (category === 'brand'){
            setIsSearching(true)
            getSearchedBrands(searchTerm).then((resp) => {
              console.log(resp)
              if (resp.error){
                console.log('error')
              }else{
                setFilteredItems(resp)
                setIsSearching(false)
              }
  
            }).catch((e) => {
              console.error(e)
              window.alert(e)
            }).then(() => {
              console.log('cool')
              // setResponse((r) => { return { ...r, fetching: false } })
              
            })
          }else if(category === 'perfumer'){
            getSearchedPerfumers(searchTerm).then((resp) => {
              console.log(resp)
              if (resp.error){
                console.log('error')
              }else{
                console.log(resp)
                setFilteredItems(resp)
              }
  
            }).catch((e) => {
              console.error(e)
              window.alert(e)
            }).then(() => {
              console.log('cool')
              // setResponse((r) => { return { ...r, fetching: false } })
              
            })
          }else if (category === 'parent-company'){
            getSearchedParentCompanies(searchTerm).then((resp) => {
              console.log(resp)
              if (resp.error){
                console.log('error')
              }else{
                setFilteredItems(resp)
              }
  
            }).catch((e) => {
              console.error(e)
              window.alert(e)
            }).then(() => {
              console.log('cool')
              // setResponse((r) => { return { ...r, fetching: false } })
              
            })

          }else if (category === 'bottle-designer'){
            getSearchedBottleDesigners(searchTerm).then((resp) => {
              console.log(resp)
              if (resp.error){
                console.log('error')
              }else{
                setFilteredItems(resp)
              }
  
            }).catch((e) => {
              console.error(e)
              window.alert(e)
            }).then(() => {
              console.log('cool')
              // setResponse((r) => { return { ...r, fetching: false } })
              
            })

          }else if (category === 'fragrance-collection'){
            getSearchedFragranceCollections(searchTerm).then((resp) => {
              console.log(resp)
              if (resp.error){
                console.log('error')
              }else{
                setFilteredItems(resp)
              }
  
            }).catch((e) => {
              console.error(e)
              window.alert(e)
            }).then(() => {
              console.log('cool')
              // setResponse((r) => { return { ...r, fetching: false } })
              
            })
          }
            
          
        // }
      }, 300),
      []
    )

  console.log(filteredItems)

  useEffect(() => {
      fetchData(searchValue)
    }, [searchValue, fetchData])


  const safeSelectedItems = React.useMemo(() => {
    if (multiple) {
      return Array.isArray(selectedItems) ? selectedItems : []
    }
    return selectedItem ? [selectedItem] : []
  }, [multiple, selectedItems, selectedItem])

  // const filteredItems = React.useMemo(() => {
  //   return items.filter((item) => item.toLowerCase().includes(searchValue.toLowerCase()))
  // }, [items, searchValue])

  const isSelected = (item: string) => {
    console.log(safeSelectedItems.includes(item))
    console.log(safeSelectedItems)
    console.log(item)
    // return safeSelectedItems.includes(item)
    console.log(safeSelectedItems.some(data => data.id === item.id))
    return safeSelectedItems.some(data => data.id === item.id)
  }

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (item: string) => {
    if (multiple && onSelectionChange) {
      if (safeSelectedItems.includes(item)) {
        onSelectionChange(safeSelectedItems.filter((i) => i !== item))
      } else {
        onSelectionChange([...safeSelectedItems, item])
      }
    } else if (!multiple && onSingleSelectionChange) {
      console.log('Ran non multiple')
      onSingleSelectionChange(item)
      setIsSearching(false)
      setIsOpen(false)
    }
    setSearchValue("")
  }

  console.log(selectedItems)
  console.log(customValue)
  console.log(showCustomInput)
  console.log(safeSelectedItems)

  const handleAddCustom = () => {
    const trimmedValue = customValue.trim()
    console.log(trimmedValue)
    if (!trimmedValue) return

    if (multiple && onSelectionChange) {
      if (!safeSelectedItems.includes(trimmedValue)) {
        onSelectionChange([...safeSelectedItems, {name: trimmedValue}])
      }
    } else if (!multiple && onSingleSelectionChange) {
      onSingleSelectionChange(trimmedValue)
      setIsSearching(false)
    }

    // setCustomValue("")
    // setShowCustomInput(false)
    setIsOpen(false)
  }

  const handleClearSingleSelection = () => {
    if (!multiple && onSingleSelectionChange) {
      onSingleSelectionChange("")
      setSearchValue("")
      setIsSearching(false)
    }
  }

  const inputDisplayValue = React.useMemo(() => {
    if (multiple) {
      return searchValue
    }
    if (isSearching) {
      return searchValue
    }
    return selectedItem || searchValue
  }, [multiple, isSearching, searchValue, selectedItem])

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.15 },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.03,
        duration: 0.2,
      },
    }),
  }

  const tagVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.15 },
    },
  }
  console.log(inputDisplayValue)
  return (
    <div className={cn("space-y-2", className)} ref={dropdownRef}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
          {/* {label} */}
          {required && <span className="text-light-primary dark:text-dark-primary ml-1">required*</span>}
        </label>
      </div>
      {!showCustomInput ? (
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-light-text-secondary dark:text-dark-text-secondary pointer-events-none z-10" />
            <Input
              value={inputDisplayValue.hasOwnProperty('name') ? inputDisplayValue.name : inputDisplayValue}
              onChange={(e) => {
                setSearchValue(e.target.value)
                if (!multiple) {
                  setIsSearching(true)
                }
                setIsOpen(true)
              }}
              onFocus={() => {
                if (!multiple && selectedItem) {
                  setIsSearching(true)
                  setSearchValue("")
                }
                setIsOpen(true)
              }}
              placeholder={placeholder}
              className={cn(
                "pl-10 pr-10",
                "bg-light-surface dark:bg-dark-surface",
                "text-light-text-primary dark:text-dark-text-primary",
                "placeholder:text-light-text-secondary dark:placeholder:text-dark-text-secondary",
                error
                  ? "border-red-500 dark:border-red-500 focus-visible:ring-red-500/20 dark:focus-visible:ring-red-500/20"
                  : "border-light-border dark:border-dark-border focus-visible:ring-light-primary/20 dark:focus-visible:ring-dark-primary/20",
                "border-light-border dark:border-dark-border",
                "hover:border-light-primary dark:hover:border-dark-primary",
                error ? "" : "focus-visible:border-light-primary dark:focus-visible:border-dark-primary",
                "focus-visible:ring-2",
                "transition-all duration-200",
                "h-12",
              )}
            />
            {!multiple && selectedItem && !isSearching ? (
              <motion.button
                type="button"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary cursor-pointer z-10 transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  handleClearSingleSelection()
                }}
              >
                <X className="h-4 w-4" />
              </motion.button>
            ) : (
              <motion.button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary cursor-pointer z-10"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsOpen(!isOpen)}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.button>
            )}
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="mt-1 text-xs text-red-500 dark:text-red-400"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className={cn(
                  "absolute z-50 mt-2 w-full rounded-lg shadow-2xl overflow-hidden",
                  "bg-light-surface dark:bg-dark-surface",
                  "border-2 border-light-border dark:border-dark-border",
                  maxHeight,
                )}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-light-primary dark:text-dark-primary" />
                  </div>
                ) : filteredItems.length === 0 ? (
                  <div className="px-4 py-8 text-center text-light-text-secondary dark:text-dark-text-secondary text-sm">
                    {emptyMessage}
                  </div>
                ) : (
                  <div className="overflow-y-auto max-h-48 py-1">
                    {filteredItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        custom={index}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className={cn(
                          "px-4 py-3 cursor-pointer transition-all duration-150",
                          "text-light-text-primary dark:text-dark-text-primary",
                          isSelected(item)
                            ? "bg-light-primary/10 dark:bg-dark-primary/20 text-light-primary dark:text-dark-primary font-medium"
                            : "hover:bg-light-primary/5 dark:hover:bg-dark-primary/10",
                        )}
                        onClick={() => handleSelect(item)}
                        whileHover={{ x: 4 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{item.name}</span>
                          
                          {isSelected(item) && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            >
                              <Check className="w-4 h-4" />
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 border-2 rounded-lg border-light-primary dark:border-dark-primary bg-light-background dark:bg-dark-background p-2"
        >
          <Input
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            placeholder="Enter custom value"
            className="border-0 bg-transparent focus-visible:ring-0"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleAddCustom()
              }
            }}
          />
          <Button
            type="button"
            size="sm"
            onClick={handleAddCustom}
            disabled={!customValue.trim()}
            className="bg-light-primary hover:bg-light-primary/90 text-white dark:bg-dark-primary dark:hover:bg-dark-primary/90"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </motion.div>
      )}

      {allowCustom && (
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant={showCustomInput ? "default" : "ghost"}
            size="sm"
            className={cn(
              "transition-all duration-300",
              showCustomInput
                ? "bg-light-primary text-white dark:bg-dark-primary dark:text-white hover:bg-light-primary/90 dark:hover:bg-dark-primary/90"
                : "text-light-primary dark:text-dark-primary hover:bg-light-primary/10 dark:hover:bg-dark-primary/20",
            )}
            onClick={() => {
              setShowCustomInput(!showCustomInput)
              setCustomValue("")
            }}
          >
            <AnimatePresence mode="wait">
              {showCustomInput ? (
                <motion.div
                  key="back"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center gap-1"
                >
                  <ArrowLeft className="h-3 w-3" />
                  Back to list
                </motion.div>
              ) : (
                <motion.div
                  key="add"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center gap-1"
                >
                  <Plus className="h-3 w-3" />
                  {customItemLabel}
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      )}
    </div>
  )
}
