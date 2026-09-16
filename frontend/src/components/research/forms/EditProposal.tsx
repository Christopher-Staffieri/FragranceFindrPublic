
import * as React from "react"
import {
  X,
  ChevronDown,
  Search,
  Plus,
  Check,
  ArrowLeft,
  Calendar,
  ShoppingBag,
  Archive,
  Youtube,
  Info,
  Sparkles,
  Tag,
  Star,
  Send,
  Layers,
  Building2,
  Factory,
  Package,
  Users,
  Palette,
  Crown,
} from "lucide-react"
import { Label } from "../../Label"
import { Textarea } from "../../TextArea"
import { Input } from "../../Input"
import { Button } from "../../MainButton"
import { Switch } from "../../common/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../common/dialog"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "../../../lib/utils"
import { ProposeResearchAutoComplete } from "../common/ProposeResearchAutoComplete"
import { useEffect, useState } from "react"
// import { addResearch } from "../../lib/allauth"
import { useUser } from "../../../auth"
import { proposeProposalEdits } from "../../../lib/allauth"


export default function EditProposalModal({originalFragranceData, editData}) {
  // State for form data
  const originalData = originalFragranceData
  console.log(originalFragranceData)
  console.log(originalData)
  console.log('logged og data')
  const [formData, setFormData] = useState({
    perfume: originalData.perfume,
    brand: originalData.brand,
    brand_other: originalData.brand_other,
    fragrance_collection: originalData.fragrance_collection,
    fragrance_collection_other: originalData.fragrance_collection_other,
    parent_company: originalData.parent_company,
    parent_company_other: originalData.parent_company_other,
    gender: originalData.gender,
    perfumers: originalData.perfumers, // Only database perfumers
    perfumers_other: [] as object[], // Custom perfumers in separate field
    bottle_designer: originalData.bottle_designer, // Only database designers
    bottle_designer_other: [] as object[], // Custom designers in separate field
    // notes: {
    //   top: [] as string[],
    //   heart: [] as string[],
    //   base: [] as string[],
    //   linear: [] as string[],
    // },
    notes: originalData.notes,
    release_year: originalData.release_year,
    description: originalData.description,
    availability: originalData.availability,
    is_varient: originalData.is_varient,

    varient_original_perfume: originalData.varient_original_perfume, // Done
    is_limited: originalData.is_limited, // Done
    limited_original_perfume: originalData.limited_original_perfume, // Done
    is_collectors: originalData.is_collectors, // Done
    collectors_original_perfume: originalData.collectors_original_perfume, // Not Done
    interesting_facts: originalData.interesting_facts, // Done
    additional_information: originalData.additional_information, // Done
    youtube_link: originalData.youtube_link, // Done
  })

  // State for UI controls
  const [open, setOpen] = useState(false)
  const [isHoveringPropose, setIsHoveringPropose] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [activeSection, setActiveSection] = useState<"linear" | "pyramid">("linear")
  const [showYearPicker, setShowYearPicker] = useState(false)
  const [linearNotesInput, setLinearNotesInput] = useState("")
  const [pyramidNotes, setPyramidNotes] = useState({
    top: "",
    heart: "",
    base: "",
  })
  
  const [yearHovered, setYearHovered] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const user = useUser()

  

  // Errors
  const [perfumeNameError, setPerfumeNameError] = useState(false)
  const [brandErorr, setBrandError] = useState(false)


  // Generate years for the year picker (current year down to 1900)
  const currentYear = new Date().getFullYear()
  const years = React.useMemo(() => {
    const result = []
    for (let year = currentYear; year >= 1900; year--) {
      result.push(year)
    }
    return result
  }, [currentYear])


  // Gender options
  const genderOptions = ["Male", "Female", "Unisex"]

  // Steps configuration
  const steps = [
    { number: 1, title: "Basic Info", icon: Info },
    { number: 2, title: "Brand & Company", icon: Building2 },
    { number: 3, title: "Fragrance Notes", icon: Layers },
    { number: 4, title: "Additional Details", icon: Sparkles },
  ]

  // Animation variants
  const animations = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    slideIn: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -50 },
    },
    buttonIcon: {
      initial: { scale: 1 },
      hover: { scale: 1.15, rotate: 90, transition: { duration: 0.2 } },
      active: { scale: 0.95, rotate: 0, transition: { duration: 0.1 } },
    },
    checkIcon: {
      hidden: { scale: 0, opacity: 0 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 500,
          damping: 15,
        },
      },
    },
    backIcon: {
      hidden: { x: -20, opacity: 0 },
      visible: {
        x: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 500,
          damping: 25,
        },
      },
    },
    yearPicker: {
      hidden: { opacity: 0, y: 10, scale: 0.95 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 500,
          damping: 30,
        },
      },
    },
    yearItem: {
      initial: { backgroundColor: "rgba(0, 0, 0, 0)" },
      hover: { backgroundColor: "rgba(74, 144, 226, 0.1)" },
      selected: { backgroundColor: "rgba(74, 144, 226, 0.2)" },
    },
    availabilityIcon: {
      initial: { scale: 1, rotate: 0 },
      animate: (availability: boolean) => ({
        scale: [1, 1.2, 1],
        rotate: availability ? [0, 10, 0] : [0, -10, 0],
        transition: {
          duration: 0.5,
          ease: "easeInOut",
        },
      }),
    },
    expandSection: {
      hidden: { height: 0, opacity: 0 },
      visible: {
        height: "auto",
        opacity: 1,
        transition: {
          height: { duration: 0.3 },
          opacity: { duration: 0.3, delay: 0.1 },
        },
      },
    },
    iconPulse: {
      initial: { scale: 1 },
      pulse: {
        scale: [1, 1.2, 1],
        transition: { duration: 0.5 },
      },
    },
    submitButton: {
      initial: { scale: 1 },
      hover: { scale: 1.05 },
      tap: { scale: 0.95 },
      submitting: {
        scale: [1, 0.95, 1],
        transition: {
          repeat: Number.POSITIVE_INFINITY,
          duration: 1.5,
        },
      },
      success: {
        scale: [1, 1.2, 1],
        backgroundColor: ["#4A90E2", "#6ee293", "#4A90E2"],
        transition: {
          duration: 1,
          ease: "easeInOut",
        },
      },
    },
  }

  console.log(formData)
  console.log(currentStep)
  console.log(steps.length)
  console.log('logged form data')

  
  useEffect(() => {
    originalData.perfumers_other.map((item) => {
        console.log(item)
        console.log('logged perfumer custom')
        formData.perfumers_other.push({name: item, isCustom: true})
    })

    originalData.bottle_designer_other.map((item) => {
        console.log(item)
        formData.bottle_designer_other.push({name: item, isCustom: true})
    })

    if (originalData.notes.hasOwnProperty('linear')){
        setFormData((prev) => ({
            ...prev,
            notes: {
                ...prev.notes,
                top: [],
                heart: [],
                base: [],
            }
        }))
    }else{
        setFormData((prev) => ({
            ...prev,
            notes: {
                ...prev.notes,
                linear: [],
            }
        }))
    }
    console.log(formData.perfumers_other)
  }, [])

  // Handle linear notes input
  const handleLinearNotesInput = (value: string) => {
    setLinearNotesInput(value)

    if (value.endsWith(",")) {
      const newTag = value.slice(0, -1).trim()
      if (newTag) {
        setFormData((prev) => ({
          ...prev,
          notes: {
            ...prev.notes,
            linear: [...prev.notes.linear, newTag],
            top: [],
            heart: [],
            base: [],
          },
        }))
        setLinearNotesInput("")
      }
    }
  }

  // Remove a linear note tag
  const removeLinearNote = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      notes: {
        ...prev.notes,
        linear: prev.notes.linear.filter((_, i) => i !== indexToRemove),
      },
    }))
  }

  // Handle pyramid note input
  const handlePyramidNoteInput = (section: "top" | "heart" | "base", value: string) => {
    setPyramidNotes((prev) => ({ ...prev, [section]: value }))

    if (value.endsWith(",")) {
      const newTag = value.slice(0, -1).trim()
      if (newTag) {
        setFormData((prev) => ({
          ...prev,
          notes: {
            ...prev.notes,
            [section]: [...prev.notes[section], newTag],
            linear: []
          },
        }))
        setPyramidNotes((prev) => ({ ...prev, [section]: "" }))
      }
    }
  }

  // Remove a pyramid note tag
  const removePyramidNote = (section: "top" | "heart" | "base", indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      notes: {
        ...prev.notes,
        [section]: prev.notes[section].filter((_, i) => i !== indexToRemove),
      },
    }))
  }

  // Handle brand selection
  const handleBrandChange = (brand) => {
    // Check if it's a custom brand (not in the predefined list)
    const isCustom = !brand.hasOwnProperty('id')
    console.log(brand)
    console.log(isCustom)
    console.log(' logged brand ')

    if (isCustom) {
      // Custom brand goes to brand_other, clear brand
      setFormData((prev) => ({ ...prev, brand: "", brand_other: brand }))
    } else {
      // Regular brand goes to brand, clear brand_other
      setFormData((prev) => ({ ...prev, brand, brand_other: "" }))
    }
  }

  // Handle collection selection
  const handleCollectionChange = (fragrance_collection) => {

    const isCustom = !fragrance_collection.hasOwnProperty('id')
    console.log(fragrance_collection)
    
    if (isCustom){
      setFormData((prev) => ({ ...prev, fragrance_collection: "", fragrance_collection_other: fragrance_collection }))
    }else{
      setFormData((prev) => ({ ...prev, fragrance_collection, fragrance_collection_other: "" }))
    }

  }

  // Handle parent company selection
  const handleParentCompanyChange = (parent_company) => {

    const isCustom = !parent_company.hasOwnProperty('id')

    if (isCustom){
      setFormData((prev) => ({ ...prev, parent_company: "", parent_company_other: parent_company }))
    }else{
      setFormData((prev) => ({ ...prev, parent_company, parent_company_other: "" }))
    }

  }

  // Handle gender selection
  const handleGenderChange = (gender: string) => {
    setFormData((prev) => ({ ...prev, gender }))
  }

  const handlePerfumersChange = (selectedPerfumers) => {
    const databasePerfumers: object[] = []
    const customPerfumers: object[] = []
    console.log(selectedPerfumers)
    console.log(typeof selectedPerfumers)


    Object.values(selectedPerfumers).forEach((item) => {
      console.log(item)
      if (item.hasOwnProperty('id')) {
        databasePerfumers.push(item)
      }else{
        console.log('ran custom')
        customPerfumers.push(item)
      }

    })
    

    setFormData((prev) => ({
      ...prev,
      perfumers: databasePerfumers,
      perfumers_other: customPerfumers,
    }))
  }

  const handleDesignersChange = (selectedDesigners) => {
    const databaseDesigners: object[] = []
    const customDesigners: object[] = []

    // selectedDesigners.forEach((name) => {
    //   if (designers.includes(name)) {
    //     databaseDesigners.push(name)
    //   } else {
    //     customDesigners.push(name)
    //   }
    // })

    Object.values(selectedDesigners).forEach((item) => {
      console.log(item)
      if (item.hasOwnProperty('id')){
        databaseDesigners.push(item)
      }else{
        customDesigners.push(item)
      }
    })

    setFormData((prev) => ({
      ...prev,
      bottle_designer: databaseDesigners,
      bottle_designer_other: customDesigners,
    }))
  }

  const getAllPerfumers = () => {
    // console.log(formData.perfumers.map((name) => name))
    formData.perfumers.map((obj) => {
      console.log(obj)
      obj.isCustom = false
      console.log(obj)
    })

    console.log(formData.perfumers_other.map((name) => name))
    formData.perfumers_other.map((obj) => {
      console.log(obj)
      obj.isCustom = true
      console.log(obj)
    })
    return [
      // ...formData.perfumers.map((obj) => {
      //   console.log(obj)
      //   obj.isCustom = false
      // }),
      ...formData.perfumers.map((obj) => (obj)),
      // ...formData.custom_perfumers.map((obj) => {
      //   obj.isCustom = true
      // }),
      ...formData.perfumers_other.map((obj) => (obj)),
    ]
  }

  const getAllDesigners = () => {

    formData.bottle_designer.map((obj) => {
      console.log(obj)
      obj.isCustom = false
      console.log(obj)
    })

    formData.bottle_designer_other.map((obj) => {
      console.log(obj)
      obj.isCustom = true
      console.log(obj)
    })

    return [
      ...formData.bottle_designer.map((obj) => (obj)),
      ...formData.bottle_designer_other.map((obj) => (obj)),
    ]
  }

  const removePerfumer = (name: string, isCustom: boolean) => {
    console.log(name)
    if (isCustom) {
      setFormData((prev) => ({
        ...prev,
        perfumers_other: prev.perfumers_other.filter((p) => p.name !== name),
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        perfumers: prev.perfumers.filter((p) => p.name !== name),
      }))
    }
  }

  const removeDesigner = (name: string, isCustom: boolean) => {
    if (isCustom) {
      setFormData((prev) => ({
        ...prev,
        bottle_designer_other: prev.bottle_designer_other.filter((d) => d.name !== name),
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        bottle_designer: prev.bottle_designer.filter((d) => d.name !== name),
      }))
    }
  }

  // Handle year selection
  const handleYearSelect = (year: number) => {
    setFormData((prev) => ({ ...prev, release_year: year.toString() }))
    setShowYearPicker(false)
  }

  // Handle availability toggle
  const handleAvailabilityToggle = () => {
    setFormData((prev) => ({ ...prev, availability: !prev.availability }))
  }

  // Handle variant toggle
  const handleVariantToggle = () => {
    setFormData((prev) => ({ ...prev, is_varient: !prev.is_varient }))
  }

  // Handle limited toggle
  const handleLimitedToggle = () => {
    setFormData((prev) => ({ ...prev, is_limited: !prev.is_limited }))
  }

  // Handle collectors toggle
  const handleCollectorsToggle = () => {
    setFormData((prev) => ({ ...prev, is_collectors: !prev.is_collectors }))
  }

  // Handle form submission
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   if (currentStep < steps.length){
  //     setIsSubmitting(false)
  //     setCurrentStep(currentStep + 1)
  //     return
  //   }



  //   setIsSubmitting(true)

  //   setTimeout(() => {
  //     setIsSubmitting(false)
  //     setSubmitSuccess(true)

  //     setTimeout(() => {
  //       setSubmitSuccess(false)
  //       setOpen(false)
  //       setCurrentStep(1)
  //     }, 2000)

  //     console.log("Form submitted:", formData)
  //   }, 2000)
  // }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (currentStep < steps.length){
      setIsSubmitting(false)
      setCurrentStep(currentStep + 1)
      return
    }

    const perfumerIds = []
    const customPerfumerNames = []
    const bottleDesignerIds = []
    const customBottleDesignerNames = []

    if (!formData.perfumers.length < 1){
      formData.perfumers.map((item) => {
        perfumerIds.push(item.id)
      })
    }

    if (!formData.perfumers_other.length < 1){
      formData.perfumers_other.map((item) => {
        console.log(item)
        customPerfumerNames.push(item.name)
      })
    }
    
    if (!formData.bottle_designer.length < 1){
        formData.bottle_designer.map((item) => {
          bottleDesignerIds.push(item.id)
        })
    }

    if (!formData.bottle_designer_other.length < 1){
      formData.bottle_designer_other.map((item) => {
        customBottleDesignerNames.push(item.name)
      })
    }

    const clensedNotes = {}

    if (formData.notes.linear.length > 0){
      clensedNotes.linear = formData.notes.linear
      console.log(formData.notes)
    }else{
      clensedNotes.top = formData.notes.top
      clensedNotes.heart = formData.notes.heart
      clensedNotes.base = formData.notes.base
      console.log(formData.notes)
      console.log(clensedNotes)
    }

    const checkedBrand = formData.brand ? formData.brand.id : null
    const checkedCollection = formData.fragrance_collection ? formData.fragrance_collection.id : null
    const checkedParentCompany = formData.parent_company ? formData.parent_company.id : null
    
    

    console.log(formData)
    console.log(formData.brand_other)
    console.log(formData.parent_company_other)
    console.log(formData.fragrance_collection_other)

    setIsSubmitting(true)
    proposeProposalEdits({selected_perfume: originalData.id, perfume: formData.perfume, bottle_designer: bottleDesignerIds, bottle_designer_other: customBottleDesignerNames,
                brand: checkedBrand, brand_other: formData.brand_other, fragrance_collection: checkedCollection,
                parent_company: checkedParentCompany, parent_company_other: formData.parent_company_other, description: formData.description,
                fragrance_collection_other: formData.fragrance_collection_other, perfumers: perfumerIds, perfumers_other: customPerfumerNames,
                notes: clensedNotes, release_year: formData.release_year, gender: formData.gender, availability: formData.availability,
                is_limited: formData.is_limited, limited_original_perfume: formData.limited_original_perfume, is_varient: formData.is_varient,
                varient_original_perfume: formData.varient_original_perfume, is_collectors: formData.is_collectors, collectors_original_perfume: formData.collectors_original_perfume,
                interesting_facts: formData.interesting_facts, additional_information: formData.additional_information,
                youtube_link: formData.youtube_link, edited_by: user.id, status: 'pending'
    }).then((response) => {
      console.log(response)
    }).catch((e) => {
      console.error(e)

    }).then(() => {
      setIsSubmitting(false)
      setOpen(false)
      setCurrentStep(1)
    })
    

  }

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement


      if (!target.closest(".year-picker") && !target.closest(".year-input")) {
        setShowYearPicker(false)
      }

    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Group years by decade for the year picker
  const yearsByDecade = React.useMemo(() => {
    const decades: Record<string, number[]> = {}

    years.forEach((year) => {
      const decade = Math.floor(year / 10) * 10
      if (!decades[decade]) {
        decades[decade] = []
      }
      decades[decade].push(year)
    })

    return Object.entries(decades).sort((a, b) => Number(b[0]) - Number(a[0]))
  }, [years])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="default"
          className="w-full bg-light-primary hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 text-white transition-all duration-300"
          onMouseEnter={() => setIsHoveringPropose(true)}
          onMouseLeave={() => setIsHoveringPropose(false)}
        >
          <motion.div
            className="flex items-center gap-2"
            animate={{
              x: isHoveringPropose ? 2 : 0,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <motion.div
              animate={{
                scale: isHoveringPropose ? 1.1 : 1,
                rotate: isHoveringPropose ? 90 : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <Plus className="w-5 h-5" />
            </motion.div>
            Edit Proposal
          </motion.div>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden p-0 bg-light-background dark:bg-dark-background border-2 border-light-border dark:border-dark-border">
        <div className="flex h-full max-h-[90vh]">
          {/* Left sidebar - Progress indicator */}
          <div className="w-64 bg-light-surface dark:bg-dark-surface border-r-2 border-light-border dark:border-dark-border p-6 overflow-y-auto">
            <DialogHeader className="mb-8">
              <DialogTitle className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary">
                Edit Proposal
              </DialogTitle>
              <DialogDescription className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Help us expand our database
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = currentStep === step.number
                const isCompleted = currentStep > step.number

                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <motion.button
                      type="button"
                      onClick={() => setCurrentStep(step.number)}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300",
                        isActive
                          ? "bg-light-primary dark:bg-dark-primary text-white shadow-lg"
                          : isCompleted
                            ? "bg-statusColors-approved/10 dark:bg-statusColors-approvedDark/10 text-statusColors-approved dark:text-statusColors-approvedDark"
                            : "hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 text-light-text-secondary dark:text-dark-text-secondary",
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className={cn(
                          "flex items-center justify-center w-8 h-8 rounded-full transition-all",
                          isActive
                            ? "bg-white/20"
                            : isCompleted
                              ? "bg-statusColors-approved/20 dark:bg-statusColors-approvedDark/20"
                              : "bg-light-primary/10 dark:bg-dark-primary/10",
                        )}
                        animate={isCompleted ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                      </motion.div>
                      <div className="flex-1 text-left">
                        <div className="text-xs opacity-80">Step {step.number}</div>
                        <div className="text-sm font-medium">{step.title}</div>
                      </div>
                    </motion.button>

                    {index < steps.length - 1 && (
                      <motion.div
                        className={cn(
                          "absolute left-7 top-full h-4 w-0.5 transition-colors",
                          isCompleted
                            ? "bg-statusColors-approved dark:bg-statusColors-approvedDark"
                            : "bg-light-border dark:bg-dark-border",
                        )}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      />
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Right content area - Now with proper scrolling */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
              {/* Scrollable content area */}
              <div className="flex-1 overflow-y-auto p-8">
                <AnimatePresence mode="wait">
                  {/* Step 1: Basic Info */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      variants={animations.slideIn}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2">
                          Basic Information
                        </h3>
                        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                          Let's start with the essential details about the fragrance
                        </p>
                      </div>

                      <div className="grid gap-6">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-2"
                        >
                          <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                            <Package className="w-4 h-4 text-light-primary dark:text-dark-primary" />
                            Fragrance Name *
                          </Label>
                          <Input
                            id="fragrance"
                            required
                            value={formData.perfume}
                            onChange={(e) => setFormData((prev) => ({ ...prev, perfume: e.target.value }))}
                            placeholder="e.g., Bleu de Chanel"
                            className="h-12 bg-light-surface dark:bg-dark-background border-2 border-light-border dark:border-dark-border focus-visible:ring-light-primary dark:focus-visible:ring-dark-primary rounded-lg"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 }}
                          className="grid md:grid-cols-2 gap-4"
                        >
                          {/* Release Year */}
                          <div className="space-y-2">
                            <Label htmlFor="year" className="text-sm font-medium flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-light-primary dark:text-dark-primary" />
                              Release Year
                            </Label>
                            <div className="relative">
                              <div
                                className="flex items-center border-2 rounded-lg border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-background cursor-pointer transition-all hover:border-light-primary dark:hover:border-dark-primary year-input h-12"
                                onClick={() => setShowYearPicker(true)}
                              >
                                <Input
                                  id="release_year"
                                  required
                                  value={formData.release_year}
                                  onChange={(e) => setFormData((prev) => ({ ...prev, release_year: e.target.value }))}
                                  placeholder="Select or enter year"
                                  className="border-0 bg-transparent pr-10 focus-visible:ring-0"
                                />
                                <motion.div
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary"
                                  animate={{ rotate: showYearPicker ? 180 : 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <ChevronDown className="h-4 w-4" />
                                </motion.div>
                              </div>

                              <AnimatePresence>
                                {showYearPicker && (
                                  <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    variants={animations.yearPicker}
                                    className="absolute z-50 mt-2 w-full bg-light-surface dark:bg-dark-surface border-2 border-light-border dark:border-dark-border rounded-lg shadow-xl max-h-60 overflow-hidden year-picker"
                                  >
                                    <div className="sticky top-0 bg-light-surface dark:bg-dark-surface p-3 border-b border-light-border dark:border-dark-border">
                                      <div className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                                        Select Year
                                      </div>
                                    </div>
                                    <div className="max-h-48 overflow-y-auto p-2">
                                      {yearsByDecade.map(([decade, decadeYears]) => (
                                        <div key={decade} className="mb-4">
                                          <div className="text-xs font-semibold text-light-text-secondary dark:text-dark-text-secondary mb-2 px-1">
                                            {decade}s
                                          </div>
                                          <div className="grid grid-cols-5 gap-1">
                                            {decadeYears.map((year) => (
                                              <motion.button
                                                key={year}
                                                type="button"
                                                initial="initial"
                                                whileHover="hover"
                                                animate={formData.release_year === year.toString() ? "selected" : "initial"}
                                                variants={animations.yearItem}
                                                onMouseEnter={() => setYearHovered(year)}
                                                onMouseLeave={() => setYearHovered(null)}
                                                onClick={(e) => {
                                                  e.preventDefault()
                                                  handleYearSelect(year)
                                                }}
                                                className={cn(
                                                  "text-sm py-2 px-2 rounded-md transition-colors",
                                                  formData.release_year === year.toString()
                                                    ? "bg-light-primary/20 dark:bg-dark-primary/30 text-light-primary dark:text-dark-primary font-medium"
                                                    : "text-light-text-primary dark:text-dark-text-primary hover:bg-light-primary/10 dark:hover:bg-dark-primary/20",
                                                  yearHovered === year && "bg-light-primary/10 dark:bg-dark-primary/20",
                                                )}
                                              >
                                                {year}
                                              </motion.button>
                                            ))}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>

                          {/* Gender */}
                          <div className="space-y-2">
                            <Label htmlFor="gender" className="text-sm font-medium flex items-center gap-2">
                              <Users className="w-4 h-4 text-light-primary dark:text-dark-primary" />
                              Gender
                            </Label>
                            <div className="relative">
                              <select
                                id="gender"
                                required
                                value={formData.gender}
                                onChange={(e) => handleGenderChange(e.target.value)}
                                className="w-full h-12 px-3 bg-light-surface dark:bg-dark-background border-2 border-light-border dark:border-dark-border rounded-lg text-light-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary transition-all hover:border-light-primary dark:hover:border-dark-primary appearance-none cursor-pointer"
                              >
                                <option value="">Select gender...</option>
                                {genderOptions.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-light-text-secondary dark:text-dark-text-secondary pointer-events-none" />
                            </div>
                          </div>
                        </motion.div>

                        {/* Perfumer(s) */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="space-y-2"
                        >
                          <Label htmlFor="perfumer" className="text-sm font-medium flex items-center gap-2">
                            <Star className="w-4 h-4 text-light-primary dark:text-dark-primary" />
                            Perfumer(s)
                          </Label>

                          <ProposeResearchAutoComplete
                            label="Perfumer(s)"
                            required={true}
                            error="You must add atleast 1 perfumer."
                            // items={perfumers}
                            category='perfumer'
                            selectedItems={[...formData.perfumers, ...formData.perfumers_other]}
                            multiple={true}
                            onSelectionChange={handlePerfumersChange}
                            placeholder="Search and select perfumer(s)"
                            allowCustom={true}
                            customItemLabel="Perfumer not shown"
                            icon={Star}
                          />

                          {getAllPerfumers().length > 0 && (
                            <div className="mt-3">
                              <Label className="text-xs text-light-text-secondary dark:text-dark-text-secondary mb-2 block">
                                Selected ({formData.perfumers.length} database, {formData.perfumers_other.length}{" "}
                                custom)
                              </Label>
                              <div className="flex flex-wrap gap-2">
                                {getAllPerfumers().map((perfumer, index) => (
                                  
                                  <motion.span
                                    key={`${perfumer.name}-${index}`}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className={cn(
                                      "inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full border-2 font-medium",
                                      perfumer.isCustom
                                        ? "bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border-purple-300 dark:border-purple-700"
                                        : "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border-blue-300 dark:border-blue-700",
                                    )}
                                  >
                                    {perfumer.isCustom && <Plus className="w-3 h-3" />}
                                    {perfumer.name}

                                    <button
                                      type="button"
                                      onClick={() => removePerfumer(perfumer.name, perfumer.isCustom)}
                                      className="ml-1 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </motion.span>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>

                        {/* Designer(s) */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 }}
                          className="space-y-2"
                        >
                          <Label htmlFor="designer" className="text-sm font-medium flex items-center gap-2">
                            <Palette className="w-4 h-4 text-light-primary dark:text-dark-primary" />
                            Designer(s)
                          </Label>

                          <ProposeResearchAutoComplete
                            label="Designer(s)"
                            category="bottle-designer"
                            selectedItems={[...formData.bottle_designer, ...formData.bottle_designer_other]}
                            multiple={true}
                            onSelectionChange={handleDesignersChange}
                            placeholder="Search and select designer(s)"
                            allowCustom={true}
                            customItemLabel="Designer not shown"
                            icon={Palette}
                          />

                          {getAllDesigners().length > 0 && (
                            <div className="mt-3">
                              <Label className="text-xs text-light-text-secondary dark:text-dark-text-secondary mb-2 block">
                                Selected ({formData.bottle_designer.length} database, {formData.bottle_designer_other.length}{" "}
                                custom)
                              </Label>
                              <div className="flex flex-wrap gap-2">
                                {getAllDesigners().map((designer, index) => (
                                  <motion.span
                                    key={`${designer.name}-${index}`}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className={cn(
                                      "inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full border-2 font-medium",
                                      designer.isCustom
                                        ? "bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border-purple-300 dark:border-purple-700"
                                        : "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border-blue-300 dark:border-blue-700",
                                    )}
                                  >
                                    {designer.isCustom && <Plus className="w-3 h-3" />}
                                    {designer.name}
                                    <button
                                      type="button"
                                      onClick={() => removeDesigner(designer.name, designer.isCustom)}
                                      className="ml-1 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </motion.span>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="grid md:grid-cols-2 gap-4"
                        >
                          {/* Availability Toggle */}
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Availability Status</Label>
                            <div className="flex items-center justify-between p-4 border-2 rounded-lg border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface transition-all hover:border-light-primary dark:hover:border-dark-primary">
                              <div className="flex items-center gap-3">
                                <motion.div
                                  animate="animate"
                                  custom={formData.availability}
                                  variants={animations.availabilityIcon}
                                  className={cn(
                                    "p-2 rounded-lg",
                                    formData.availability
                                      ? "bg-statusColors-approved/20 dark:bg-statusColors-approvedDark/20"
                                      : "bg-light-secondary/20 dark:bg-dark-secondary/20",
                                  )}
                                >
                                  {formData.availability ? (
                                    <ShoppingBag className="h-5 w-5 text-statusColors-approved dark:text-statusColors-approvedDark" />
                                  ) : (
                                    <Archive className="h-5 w-5 text-light-secondary dark:text-dark-secondary" />
                                  )}
                                </motion.div>
                                <div>
                                  <div className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                                    {formData.availability ? "Available" : "Discontinued"}
                                  </div>
                                  <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                                    {formData.availability ? "In production" : "No longer made"}
                                  </div>
                                </div>
                              </div>
                              <Switch
                                id="availability"
                                checked={formData.availability}
                                onCheckedChange={handleAvailabilityToggle}
                              />
                            </div>
                          </div>

                          {/* Variant Toggle */}
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Fragrance Type</Label>
                            <div className="flex items-center justify-between p-4 border-2 rounded-lg border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface transition-all hover:border-light-primary dark:hover:border-dark-primary">
                              <div className="flex items-center gap-3">
                                <motion.div
                                  animate={formData.is_varient ? "pulse" : "initial"}
                                  variants={animations.iconPulse}
                                  className={cn(
                                    "p-2 rounded-lg",
                                    formData.is_varient
                                      ? "bg-light-primary/20 dark:bg-dark-primary/20"
                                      : "bg-gray-200/50 dark:bg-gray-700/30",
                                  )}
                                >
                                  <Tag
                                    className={cn(
                                      "h-5 w-5",
                                      formData.is_varient
                                        ? "text-light-primary dark:text-dark-primary"
                                        : "text-gray-400 dark:text-gray-500",
                                    )}
                                  />
                                </motion.div>
                                <div>
                                  <div className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                                    {formData.is_varient ? "Variant" : "Original"}
                                  </div>
                                  <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                                    {formData.is_varient ? "Flanker edition" : "Original release"}
                                  </div>
                                </div>
                              </div>
                              <Switch id="variant" checked={formData.is_varient} onCheckedChange={handleVariantToggle} />
                            </div>
                          </div>
                        </motion.div>

                        {/* Linked Fragrance Input */}
                        <AnimatePresence>
                          {formData.is_varient && (
                            <motion.div
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                              variants={animations.expandSection}
                            >
                              <div className="p-4 bg-light-primary/5 dark:bg-dark-primary/5 rounded-lg border-2 border-light-primary/20 dark:border-dark-primary/20">
                                <Label htmlFor="varient_original_perfume" className="text-sm font-medium mb-2 block">
                                  Parent Fragrance
                                </Label>
                                <Input
                                  id="varient_original_perfume"
                                  value={formData.varient_original_perfume}
                                  onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, varient_original_perfume: e.target.value }))
                                  }
                                  placeholder="Enter the name of the original fragrance"
                                  className="bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border"
                                />
                                <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-2">
                                  Enter the name of the original fragrance this is a variant of
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.25 }}
                          className="grid md:grid-cols-2 gap-4"
                        >
                          {/* Limited Edition Toggle */}
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Limited Edition</Label>
                            <div className="flex items-center justify-between p-4 border-2 rounded-lg border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface transition-all hover:border-light-primary dark:hover:border-dark-primary">
                              <div className="flex items-center gap-3">
                                <motion.div
                                  animate={formData.is_limited ? "pulse" : "initial"}
                                  variants={animations.iconPulse}
                                  className={cn(
                                    "p-2 rounded-lg",
                                    formData.is_limited
                                      ? "bg-light-primary/20 dark:bg-dark-primary/20"
                                      : "bg-gray-200/50 dark:bg-gray-700/30",
                                  )}
                                >
                                  <Crown
                                    className={cn(
                                      "h-5 w-5",
                                      formData.is_limited
                                        ? "text-light-primary dark:text-dark-primary"
                                        : "text-gray-400 dark:text-gray-500",
                                    )}
                                  />
                                </motion.div>
                                <div>
                                  <div className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                                    {formData.is_limited ? "Limited" : "Standard"}
                                  </div>
                                  <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                                    {formData.is_limited ? "Limited production" : "Regular release"}
                                  </div>
                                </div>
                              </div>
                              <Switch id="limited" checked={formData.is_limited} onCheckedChange={handleLimitedToggle} />
                            </div>
                          </div>

                          {/* Collectors Edition Toggle */}
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Special Edition</Label>
                            <div className="flex items-center justify-between p-4 border-2 rounded-lg border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface transition-all hover:border-light-primary dark:hover:border-dark-primary">
                              <div className="flex items-center gap-3">
                                <motion.div
                                  animate={formData.is_collectors ? "pulse" : "initial"}
                                  variants={animations.iconPulse}
                                  className={cn(
                                    "p-2 rounded-lg",
                                    formData.is_collectors
                                      ? "bg-light-primary/20 dark:bg-dark-primary/20"
                                      : "bg-gray-200/50 dark:bg-gray-700/30",
                                  )}
                                >
                                  <Star
                                    className={cn(
                                      "h-5 w-5",
                                      formData.is_collectors
                                        ? "text-light-primary dark:text-dark-primary"
                                        : "text-gray-400 dark:text-gray-500",
                                    )}
                                  />
                                </motion.div>
                                <div>
                                  <div className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                                    {formData.is_collectors ? "Collector's Item" : "Standard"}
                                  </div>
                                  <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                                    {formData.is_collectors ? "Collector's edition" : "Regular release"}
                                  </div>
                                </div>
                              </div>
                              <Switch
                                id="collectors"
                                checked={formData.is_collectors}
                                onCheckedChange={handleCollectorsToggle}
                              />
                            </div>
                          </div>
                        </motion.div>

                        {/* Limited Edition Name Input */}
                        <AnimatePresence>
                          {formData.is_limited && (
                            <motion.div
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                              variants={animations.expandSection}
                            >
                              <div className="p-4 bg-light-primary/5 dark:bg-dark-primary/5 rounded-lg border-2 border-light-primary/20 dark:border-dark-primary/20">
                                <Label htmlFor="limited_original_perfume" className="text-sm font-medium mb-2 block">
                                  Limited Edition Name
                                </Label>
                                <Input
                                  id="limited_original_perfume"
                                  value={formData.limited_original_perfume}
                                  onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, limited_original_perfume: e.target.value }))
                                  }
                                  placeholder="e.g., Holiday 2023, Summer Edition"
                                  className="bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border"
                                />
                                <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-2">
                                  Enter the specific name of this limited edition
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Collection Name Input */}
                        <AnimatePresence>
                          {formData.is_collectors && (
                            <motion.div
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                              variants={animations.expandSection}
                            >
                              <div className="p-4 bg-light-primary/5 dark:bg-dark-primary/5 rounded-lg border-2 border-light-primary/20 dark:border-dark-primary/20">
                                <Label htmlFor="collectors_original_perfume" className="text-sm font-medium mb-2 block">
                                  Edition Name
                                </Label>
                                <Input
                                  id="collectors_original_perfume"
                                  value={formData.collectors_original_perfume}
                                  onChange={(e) => setFormData((prev) => ({ ...prev, collectors_original_perfume: e.target.value }))}
                                  placeholder="e.g., Anniversary Edition, Exclusive Collection"
                                  className="bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border"
                                />
                                <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-2">
                                  Enter the specific name of this collector's edition
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Brand & Company */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      variants={animations.slideIn}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2">
                          Brand & Company
                        </h3>
                        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                          Tell us about the brand and company behind this fragrance
                        </p>
                      </div>

                      
                      
                      <div className="grid gap-6">
                        <Label htmlFor={'brand'} className="text-sm font-medium flex translate-y-4 items-center gap-2 ">
                        {/* {Icon && <Icon className="w-4 h-4 text-light-primary dark:text-dark-primary" />} */}
                        <Building2 className="w-4 h-4 text-light-primary dark:text-dark-primary"/>
                        {'Brand'}
                      </Label>
                        <ProposeResearchAutoComplete
                          label="Brand"
                          category="brand"
                          selectedItem={formData.brand}
                          multiple={false}
                          onSingleSelectionChange={handleBrandChange}
                          placeholder="Search or select a brand"
                          allowCustom={true}
                          customItemLabel="Brand not shown"
                          icon={Building2}
                        />
                        
                        <Label htmlFor={'Fragrance-Collection'} className="text-sm font-medium flex translate-y-4 items-center gap-2 ">
                          {/* {Icon && <Icon className="w-4 h-4 text-light-primary dark:text-dark-primary" />} */}
                          <Layers className="w-4 h-4 text-light-primary dark:text-dark-primary"/>
                          {'Fragrance Collection'}
                        </Label>
                        <ProposeResearchAutoComplete
                          label="Fragrance Collection"
                          category="fragrance-collection"
                          selectedItem={formData.fragrance_collection}
                          multiple={false}
                          onSingleSelectionChange={handleCollectionChange}
                          placeholder="Select or search a collection"
                          allowCustom={true}
                          customItemLabel="Collection not shown"
                          icon={Layers}
                        />

                        <Label htmlFor={'Parent-Company'} className="text-sm font-medium flex translate-y-4 items-center gap-2 ">
                          {/* {Icon && <Icon className="w-4 h-4 text-light-primary dark:text-dark-primary" />} */}
                          <Factory className="w-4 h-4 text-light-primary dark:text-dark-primary"/>
                          {'Parent Company'}
                        </Label>
                        <ProposeResearchAutoComplete
                          label="Parent Company"
                          category="parent-company"
                          selectedItem={formData.parent_company}
                          multiple={false}
                          onSingleSelectionChange={handleParentCompanyChange}
                          placeholder="Select or search a parent company"
                          allowCustom={true}
                          customItemLabel="Parent company not shown"
                          icon={Factory}
                        />

                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Fragrance Notes */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      variants={animations.slideIn}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2">
                          Fragrance Notes
                        </h3>
                        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                          Add the fragrance notes (separate with commas)
                        </p>
                      </div>

                      <div className="flex gap-2 p-1 bg-light-surface dark:bg-dark-surface rounded-lg border-2 border-light-border dark:border-dark-border">
                        <Button
                          type="button"
                          variant={activeSection === "linear" ? "default" : "ghost"}
                          onClick={() => setActiveSection("linear")}
                          className={cn(
                            "flex-1 transition-all",
                            activeSection === "linear"
                              ? "bg-light-primary text-white hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 shadow-md"
                              : "hover:bg-light-primary/10 dark:hover:bg-dark-primary/10",
                          )}
                        >
                          Linear Notes
                        </Button>
                        <Button
                          type="button"
                          variant={activeSection === "pyramid" ? "default" : "ghost"}
                          onClick={() => setActiveSection("pyramid")}
                          className={cn(
                            "flex-1 transition-all",
                            activeSection === "pyramid"
                              ? "bg-light-primary text-white hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 shadow-md"
                              : "hover:bg-light-primary/10 dark:hover:bg-dark-primary/10",
                          )}
                        >
                          Pyramid View
                        </Button>
                      </div>

                      <AnimatePresence mode="wait">
                        {activeSection === "linear" ? (
                          <motion.div
                            key="linear"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-4"
                          >
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="space-y-2"
                            >
                              <Label className="text-sm font-medium">All Notes</Label>
                              <Textarea
                                value={linearNotesInput}
                                onChange={(e) => handleLinearNotesInput(e.target.value)}
                                placeholder="Enter all fragrance notes separated by commas (e.g., Bergamot, Jasmine, Vanilla, Musk...)"
                                className="min-h-[120px] bg-light-background dark:bg-dark-background border-2 border-light-border dark:border-dark-border focus-visible:ring-light-primary dark:focus-visible:ring-dark-primary rounded-lg resize-none"
                              />

                              {formData.notes.linear.length > 0 && (
                                <div className="mt-3">
                                  <Label className="text-xs text-light-text-secondary dark:text-dark-text-secondary mb-2 block">
                                    Current notes
                                  </Label>
                                  <div className="flex flex-wrap gap-2">
                                    {formData.notes.linear.map((note, noteIndex) => (
                                      <motion.span
                                        key={noteIndex}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-full bg-light-primary/10 text-light-primary dark:bg-dark-primary/20 dark:text-dark-primary border border-light-primary/20 dark:border-dark-primary/30"
                                      >
                                        {note}
                                        <button
                                          type="button"
                                          onClick={() => removeLinearNote(noteIndex)}
                                          className="ml-1 hover:text-red-500 transition-colors"
                                        >
                                          <X className="w-3 h-3" />
                                        </button>
                                      </motion.span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="pyramid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                          >
                            {(["top", "heart", "base"] as const).map((level, index) => (
                              <motion.div
                                key={level}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="space-y-2"
                              >
                                <Label className="capitalize text-sm font-medium">{level} Notes</Label>
                                <Textarea
                                  value={pyramidNotes[level]}
                                  onChange={(e) => handlePyramidNoteInput(level, e.target.value)}
                                  placeholder={`${level.charAt(0).toUpperCase() + level.slice(1)} notes...`}
                                  className="min-h-[100px] bg-light-background dark:bg-dark-background border-2 border-light-border dark:border-dark-border focus-visible:ring-light-primary dark:focus-visible:ring-dark-primary rounded-lg resize-none"
                                />
                                {formData.notes[level].length > 0 && (
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-wrap gap-2 mt-2"
                                  >
                                    {formData.notes[level].map((note, noteIndex) => (
                                      <motion.span
                                        key={noteIndex}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-light-primary/10 text-light-primary dark:bg-dark-primary/20 dark:text-dark-primary border border-light-primary/20 dark:border-dark-primary/30"
                                      >
                                        {note}
                                        <button
                                          type="button"
                                          onClick={() => removePyramidNote(level, noteIndex)}
                                          className="ml-1 hover:text-red-500 transition-colors"
                                        >
                                          <X className="w-3 h-3" />
                                        </button>
                                      </motion.span>
                                    ))}
                                  </motion.div>
                                )}
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}

                  {/* Step 4: Additional Details */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      variants={animations.slideIn}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-20">
                          Additional Details
                        </h3>
                        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                          Add any extra information you have about this fragrance
                        </p>
                      </div>

                      <div className="grid gap-6">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-2"
                        >
                          {/* <Label className="text-sm font-medium flex items-center gap-2">
                            <Info className="w-4 h-4 text-light-primary dark:text-dark-primary" />
                            Something Else
                          </Label> */}
                          {/* <Input
                            placeholder="e.g., Launched in a limited run, part of a special collection"
                            className="bg-light-background dark:bg-dark-background border-2 border-light-border dark:border-dark-border focus-visible:ring-light-primary dark:focus-visible:ring-dark-primary rounded-lg"
                          /> */}
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 }}
                          className="space-y-2"
                        >
                          <Label htmlFor="description" className="text-sm font-medium flex items-center gap-2">
                            <Info className="w-4 h-4 text-light-primary dark:text-dark-primary" />
                            Description
                          </Label>
                          <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                            placeholder="A brief description of the fragrance..."
                            className="min-h-[150px] bg-light-background dark:bg-dark-background border-2 border-light-border dark:border-dark-border focus-visible:ring-light-primary dark:focus-visible:ring-dark-primary rounded-lg"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="space-y-2"
                        >
                          <Label htmlFor="interesting_facts" className="text-sm font-medium flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-light-primary dark:text-dark-primary" />
                            Interesting Facts
                          </Label>
                          <Textarea
                            id="interesting_facts"
                            value={formData.interesting_facts}
                            onChange={(e) => setFormData((prev) => ({ ...prev, interesting_facts: e.target.value }))}
                            placeholder="Any interesting facts about the fragrance, its history, or inspiration..."
                            className="min-h-[100px] bg-light-background dark:bg-dark-background border-2 border-light-border dark:border-dark-border focus-visible:ring-light-primary dark:focus-visible:ring-dark-primary rounded-lg"
                          />
                        </motion.div>

                        

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="space-y-2"
                        >
                          <Label htmlFor="additional_information" className="text-sm font-medium flex items-center gap-2">
                            <Info className="w-4 h-4 text-light-primary dark:text-dark-primary" />
                            Additional Information
                          </Label>
                          <Textarea
                            id="additional_information"
                            value={formData.additional_information}
                            onChange={(e) => setFormData((prev) => ({ ...prev, additional_information: e.target.value }))}
                            placeholder="Any other relevant information..."
                            className="min-h-[100px] bg-light-background dark:bg-dark-background border-2 border-light-border dark:border-dark-border focus-visible:ring-light-primary dark:focus-visible:ring-dark-primary rounded-lg"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.25 }}
                          className="space-y-2"
                        >
                          <Label htmlFor="youtube_link" className="text-sm font-medium flex items-center gap-2">
                            <Youtube className="w-4 h-4 text-light-primary dark:text-dark-primary" />
                            YouTube Link (optional)
                          </Label>
                          <Input
                            id="youtube_link"
                            value={formData.youtube_link}
                            onChange={(e) => setFormData((prev) => ({ ...prev, youtube_link: e.target.value }))}
                            placeholder="https://www.youtube.com/watch?v=..."
                            className="bg-light-background dark:bg-dark-background border-2 border-light-border dark:border-dark-border focus-visible:ring-light-primary dark:focus-visible:ring-dark-primary rounded-lg"
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer with navigation and submit button */}
              <div className="p-8 border-t-2 border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="border-2 border-light-border dark:border-dark-border text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-surface/50 dark:hover:bg-dark-surface/50 bg-transparent"
                      onClick={() => setCurrentStep((prev) => prev - 1)}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div
                        key="submitting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        variants={animations.submitButton}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold shadow-md"
                      >
                        <div className="h-3 w-3 rounded-full bg-white/50 animate-pulse"></div>
                        Submitting...
                      </motion.div>
                    ) : submitSuccess ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        variants={animations.submitButton}
                        className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg font-semibold shadow-md"
                      >
                        <Check className="h-5 w-5" />
                        Submitted!
                      </motion.div>
                    ) : (
                      <Button
                        type="submit"
                        size="lg"
                        className="px-8 py-3 font-semibold shadow-md"
                        animate={isSubmitting ? "submitting" : "initial"}
                        whileHover="hover"
                        whileTap="tap"
                        variants={animations.submitButton}
                        disabled={isSubmitting || submitSuccess}
                      >
                        {currentStep === steps.length ? "Submit" : "Next"}
                        {currentStep < steps.length && <Send className="h-4 w-4 ml-2" />}
                      </Button>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


