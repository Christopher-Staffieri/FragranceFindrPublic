
import { Combobox } from "@headlessui/react"
import { motion, AnimatePresence } from "framer-motion"
import { debounce } from "lodash"
import { Search, ChevronDown } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { getBrands, getSearchedBrands, getSearchedPerfumers, getSearchedFragranceCollections } from "../../lib/allauth"

// Sample data with more realistic fragrances
const fragrances = [
  {
    id: 1,
    name: "Spicebomb Extreme",
    brand: "Viktor & Rolf",
    year: "2015",
    type: "EAU DE PARFUM",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-h08dN53qhun1Br6savMe1P5fUjEvJm.png",
  },
  {
    id: 2,
    name: "Angels' Share",
    brand: "Kilian",
    year: "2020",
    type: "EAU DE PARFUM",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-h08dN53qhun1Br6savMe1P5fUjEvJm.png",
  },
  {
    id: 3,
    name: "The One for Men",
    brand: "Dolce & Gabbana",
    year: "2015",
    type: "EAU DE PARFUM",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-h08dN53qhun1Br6savMe1P5fUjEvJm.png",
  },
  {
    id: 4,
    name: "Light Blue pour Homme Eau Intense",
    brand: "Dolce & Gabbana",
    year: "2017",
    type: "EAU DE PARFUM",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-h08dN53qhun1Br6savMe1P5fUjEvJm.png",
  },
  {
    id: 5,
    name: "Pacific Rock Moss",
    brand: "Goldfield & Banks",
    year: "2016",
    type: "PARFUM",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-h08dN53qhun1Br6savMe1P5fUjEvJm.png",
  },
  {
    id: 6,
    name: "Spicebomb",
    brand: "Viktor & Rolf",
    year: "2012",
    type: "EDT",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-h08dN53qhun1Br6savMe1P5fUjEvJm.png",
  },
]

interface Fragrance {
  id: number
  name: string
  brand: string
  year: string
  type: string
  image: string
}

export default function ResearchAutoComplete({selected, setSelected, category}) {
  // const [selected, setSelected] = useState<Fragrance | null>(null)/
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [retreivedData, setRetreivedData] = useState(null)
  console.log(selected)

  const fetchData = useCallback(
    debounce(async(searchTerm) => {
      // if (searchTerm.length > 0){
        if (category === 'brand'){
          getSearchedBrands(searchTerm).then((resp) => {
            console.log(resp)
            if (resp.error){
              console.log('error')
            }else{
              setRetreivedData(resp)
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
              setRetreivedData(resp)
            }

          }).catch((e) => {
            console.error(e)
            window.alert(e)
          }).then(() => {
            console.log('cool')
            // setResponse((r) => { return { ...r, fetching: false } })
            
          })
        }else if (category === 'fragrance_collection'){
          getSearchedFragranceCollections(searchTerm).then((resp) => {
            console.log(resp)
            if (resp.error){
              console.log('error')
            }else{
              setRetreivedData(resp)
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

  useEffect(() => {
    fetchData(query)
  }, [query, fetchData])

  // const filteredFragrances =
  //   query === ""
  //     ? retreivedData
  //     : retreivedData
  // console.log(filteredFragrances)
      

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  }

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.98,
      transformOrigin: "top center",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.98,
      transition: {
        duration: 0.2,
      },
    },
  }
  // console.log(selected[category])

  return (
    <div className="w-full">
      {/* setFormData((prev) => ({ ...prev, viewType: view })) */}
      
      

      
        <Combobox value={selected[category]} onChange={(event) => {
        console.log(event)
        {event
          ? setSelected((prev) => ({...prev, [category]: event}))
          // Replace with top 10 brands or something
          : 'No brands found'
        }
        
      }}>
       
      
        {({ open }) => (
          <div className="relative">
            <motion.div
              className="relative"
              animate={isFocused ? { scale: 1.01 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Combobox.Input
                className="w-full h-12 pl-12 pr-4 text-base rounded-lg border bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                onChange={(event) => setQuery(event.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                displayValue={(fragrance: Fragrance) => fragrance?.name || ""}
                placeholder={`Search ${category}s...`}
                required
              />
              
              <motion.div
                animate={isFocused || query ? { scale: 1.1, color: "#4A90E2" } : { scale: 1, color: "#707070" }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="absolute left-4 top-3.5 -translate-y-1/2"
              >
                <Search className="w-5 h-5" />
              </motion.div>
              
              <Combobox.Button className="absolute right-0 top-0 h-full px-3 flex items-center">
                <motion.div
                  animate={{
                    rotate: open ? 180 : 0,
                    scale: isFocused ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
                </motion.div>
              </Combobox.Button>
            </motion.div>

            <AnimatePresence>
              {open && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute z-10 mt-2 w-full rounded-lg bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border shadow-lg overflow-hidden"
                >
                  <Combobox.Options static className="max-h-[400px] overflow-auto py-2">
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit">
                      {retreivedData !== null && retreivedData !== undefined
                        ? (retreivedData.length === 0 && query !== "" ? (
                          <motion.div
                            variants={itemVariants}
                            className="px-4 py-3 text-light-text-secondary dark:text-dark-text-secondary"
                          >
                            No {category}s found.
                          </motion.div>
                        ) : (
                          retreivedData.map((fragrance) => (
                            <Combobox.Option
                              key={fragrance.id}
                              value={fragrance}
                              className={({ active }) =>
                                `relative cursor-pointer select-none py-3 px-4 transition-colors ${
                                  active
                                    ? "bg-primary/10 dark:bg-primary/20"
                                    : "hover:bg-light-background dark:hover:bg-dark-background"
                                }`
                              }
                            >
                              {({ selected, active }) => (
                                <motion.div
                                  variants={itemVariants}
                                  whileHover={{ x: 5 }}
                                  className="flex items-center gap-4"
                                >
                                  <motion.div
                                    className="w-12 h-12 rounded-md overflow-hidden bg-light-background dark:bg-dark-background flex-shrink-0"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                  >
                                    <img
                                      src={fragrance.image || "/placeholder.svg"}
                                      alt={fragrance.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </motion.div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                      <motion.p
                                        animate={selected ? { scale: 1.02, color: "#4A90E2" } : {}}
                                        className={`text-base font-medium truncate ${
                                          active ? "text-primary" : "text-light-text-primary dark:text-dark-text-primary"
                                        }`}
                                      >
                                        {fragrance.name}
                                        {selected && (
                                          <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="ml-2 text-primary"
                                          >
                                            ✓
                                          </motion.span>
                                        )}
                                      </motion.p>
                                      <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary ml-2 flex-shrink-0">
                                        {fragrance.year}
                                      </span>
                                    </div>
                                    <div className="flex items-center justify-between mt-1">
                                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary truncate">
                                        
                                        {fragrance.brand}
                                        
                                      </p>
                                      <motion.span
                                        whileHover={{ scale: 1.1 }}
                                        className="text-xs text-light-text-secondary dark:text-dark-text-secondary ml-2 flex-shrink-0 px-2 py-0.5 rounded-full bg-light-background dark:bg-dark-background"
                                      >
                                        {fragrance.type}
                                      </motion.span>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </Combobox.Option>
                          ))
                        ))
                        : <motion.div
                        variants={itemVariants}
                        className="px-4 py-3 text-light-text-secondary dark:text-dark-text-secondary"
                      >
                        No {category}s found.
                      </motion.div>
                      }
                    </motion.div>
                  </Combobox.Options>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </Combobox>
    </div>
  )
}

