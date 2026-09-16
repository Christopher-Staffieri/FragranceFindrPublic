
import { useState, useEffect, memo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Filter,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Beaker,
  Flag as Flask,
  Plus,
  ArrowRight,
  Database,
  AlertCircle,
  TrendingUp,
  Users,
  Clock,
  Eye,
} from "lucide-react"
import { Button } from "../components/MainButton"
import { Input } from "../components/Input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/database/perfumeDetails/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/database/perfumeDetails/tooltip"
import ProposeResearch from "../components/research/ProposeResearch";
import { useAuth, useAuthStatus, useConfig, useUser } from "../auth"
import { Link, useNavigate } from "react-router-dom"
import { getAllDatabaseBrandsCount, getAllDatabaseFragranceCount, getRecentlyPostedFragrances } from "../lib/allauth"
import ReviewResearch from "./ReviewResearch"

// Memoized progress bar component to prevent re-renders
const ProgressBar = memo(({ progress }: { progress: number }) => {
  return (
    <div className="w-full bg-light-background dark:bg-dark-background/50 rounded-full h-2 overflow-hidden">
      <div
        className={`h-2 rounded-full transition-all duration-1000 ease-out ${
          progress === 100 ? "bg-green-500 dark:bg-green-600" : "bg-light-primary dark:bg-dark-primary"
        }`}
        style={{ width: `${progress}%` }}
      />
    </div>
  )
})
ProgressBar.displayName = "ProgressBar"

// Memoized status badge component
const StatusBadge = memo(({ status }: { status: string }) => {
  let color = ""
  switch (status) {
    case "Approved":
      color = "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      break
    case "In Progress":
      color = "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      break
    case "Review":
      color = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      break
    default:
      color = "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
  }

  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>{status}</span>
})
StatusBadge.displayName = "StatusBadge"

// Memoized table row component to prevent re-renders
const TaskRow = memo(({ task, index }: { task: any; index: number }) => {
  return (
    <motion.tr
      key={task.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ backgroundColor: "rgba(74, 144, 226, 0.05)" }}
      className="border-t border-light-border dark:border-dark-border transition-colors cursor-pointer"
    >
      <td className="py-3 px-4 text-light-text-primary dark:text-dark-text-primary font-medium">{task.perfume}</td>
      <td className="py-3 px-4">
        <StatusBadge status={task.status} />
      </td>
      <td className="py-3 px-4 text-light-text-primary dark:text-dark-text-primary">{task.users}</td>
      <td className="py-3 px-4 w-32">
        <div className="flex items-center gap-2">
          <ProgressBar progress={task.progress} />
          <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{task.progress}%</span>
        </div>
      </td>
      <td className="py-3 px-4 text-light-text-primary dark:text-dark-text-primary">{task.proposedBy}</td>
      <td className="py-3 px-4 text-light-text-primary dark:text-dark-text-primary">{task.timeTracking}</td>
      <td className="py-3 px-4 text-light-text-primary dark:text-dark-text-primary">{task.proposed}</td>
    </motion.tr>
  )
})
TaskRow.displayName = "TaskRow"

export default function ResearchPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()
  const user = useAuthStatus()
  const [totalFragrances, setTotalFragrances] = useState(0)
  const [totalBrands, setTotalBrands] = useState(0)
  const [recentlyPostedFragrances, setRecentlyPostedFragrances] = useState([])

//   console.log(user)




  // Track mouse position for gradient effect with throttling
  useEffect(() => {
    let rafId: number | null = null
    let lastUpdate = 0
    const throttleMs = 50 // Only update every 50ms

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastUpdate > throttleMs) {
        if (rafId) cancelAnimationFrame(rafId)

        rafId = requestAnimationFrame(() => {
          setMousePosition({
            x: e.clientX,
            y: e.clientY,
          })
          lastUpdate = now
          rafId = null
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  useEffect(() => {
    getAllDatabaseFragranceCount().then((response) => {
          setTotalFragrances(response.total_fragrances)
        }).catch((e) => {
          console.error(e)
        })
    
    getAllDatabaseBrandsCount().then((response) => {
          setTotalBrands(response.total_brands)
        }).catch((e) => {
          console.error(e)
    
        })

    getRecentlyPostedFragrances().then((response) => {
          setRecentlyPostedFragrances(response)
          console.log(response)
        }).catch((e) => {
          console.error(e)
    
        })
    
  }, [])

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Sample data for the table
  const tasks = [
    {
      id: 1,
      perfume: "Aventus",
      status: "Approved",
      users: "John Doe",
      progress: 100,
      proposedBy: "Sarah Smith",
      timeTracking: "2 days",
      proposed: "01/15/2023",
    },
    {
      id: 2,
      perfume: "Sauvage",
      status: "In Progress",
      users: "Jane Smith",
      progress: 65,
      proposedBy: "Mike Johnson",
      timeTracking: "5 days",
      proposed: "02/20/2023",
    },
    {
      id: 3,
      perfume: "Bleu de Chanel",
      status: "Review",
      users: "Robert Brown",
      progress: 90,
      proposedBy: "Emily Davis",
      timeTracking: "1 day",
      proposed: "03/10/2023",
    },
    {
      id: 4,
      perfume: "Acqua di Gio",
      status: "Pending",
      users: "Lisa Wilson",
      progress: 30,
      proposedBy: "David Miller",
      timeTracking: "7 days",
      proposed: "04/05/2023",
    },
    {
      id: 5,
      perfume: "La Vie Est Belle",
      status: "Approved",
      users: "Emma Taylor",
      progress: 100,
      proposedBy: "James Anderson",
      timeTracking: "3 days",
      proposed: "05/12/2023",
    },
  ]

  const recentlyAdded = [
    {
      id: 1,
      name: "Midnight Rose",
      brand: "Maison Dior",
      year: 2025,
      image: "/luxury-perfume-bottle.png",
      addedBy: "Sarah M.",
      views: 1247,
    },
    {
      id: 2,
      name: "Ocean Breeze",
      brand: "Chanel",
      year: 2025,
      image: "/blue-perfume-bottle.jpg",
      addedBy: "John D.",
      views: 892,
    },
    {
      id: 3,
      name: "Amber Dreams",
      brand: "Tom Ford",
      year: 2025,
      image: "/amber-perfume-bottle.jpg",
      addedBy: "Emily R.",
      views: 1543,
    },
  ]

  // Filter tasks based on active tab
  const filteredTasks = tasks
    .filter((task) => {
      if (activeTab === "all") return true
      if (activeTab === "completed") return task.status === "Approved"
      if (activeTab === "progress") return task.status === "In Progress"
      if (activeTab === "review") return task.status === "Review" || task.status === "Pending"
      return true
    })
    .filter((task) => {
      if (!searchQuery) return true
      return (
        task.perfume.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.proposedBy.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background relative overflow-hidden">
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(74, 144, 226, 0.2) 0%, rgba(244, 91, 105, 0.1) 50%, rgba(0, 0, 0, 0) 80%)`,
        }}
        animate={{
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {/* Floating Particles */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-light-primary/10 dark:bg-dark-primary/10"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div> */}

      <div className="relative">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-light-primary/10 dark:bg-dark-primary/20 mb-6 border border-light-primary/20 dark:border-dark-primary/30"
            >
              <Sparkles className="w-4 h-4 text-light-primary dark:text-dark-primary" />
              <span className="text-sm font-medium text-light-primary dark:text-dark-primary">
                Collaborative Research Platform
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-light-text-primary dark:text-dark-text-primary leading-tight mb-4">
                Building the Global{" "}
                <span className="relative inline-block">
                  <span className="text-light-primary dark:text-dark-primary">Fragrance</span>
                  <motion.span
                    className="absolute inset-0 opacity-20 blur-lg"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                </span>{" "}
                Database
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-lg md:text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mb-8"
            >
              Contribute to our comprehensive fragrance database. Share your expertise, propose research, and help us
              build the most detailed fragrance resource.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowModal(true)}>
                <Button
                  size="lg"
                  className="bg-light-primary hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 text-white font-medium px-8 h-12 rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Propose Research
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    className="ml-2"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </Button>
              </motion.div> */}
              <ProposeResearch/>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12 max-w-6xl"
          >
            {/* Database Stats Card */}
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="lg:col-span-2 bg-light-surface dark:bg-dark-surface rounded-2xl p-6 shadow-xl border border-light-border/50 dark:border-dark-border/50 relative overflow-hidden"
            >
              <motion.div
                className="absolute top-0 right-0 w-48 h-48 opacity-5"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Database className="w-full h-full" />
              </motion.div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    className="p-3 bg-light-primary/10 dark:bg-dark-primary/20 rounded-xl"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Database className="w-6 h-6 text-light-primary dark:text-dark-primary" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-bold text-light-text-primary dark:text-dark-text-primary">
                      FragranceFindr Database
                    </h3>
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      Growing every day with your help
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    className="bg-light-background/50 dark:bg-dark-background/50 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Flask className="w-4 h-4 text-light-primary dark:text-dark-primary" />
                      <p className="text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wide">
                        Perfumes
                      </p>
                    </div>
                    <motion.p
                      className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      {totalFragrances}
                    </motion.p>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    className="bg-light-background/50 dark:bg-dark-background/50 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-light-secondary dark:text-dark-secondary" />
                      <p className="text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wide">
                        Brands
                      </p>
                    </div>
                    <motion.p
                      className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                    >
                      {totalBrands}
                    </motion.p>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.4 }}
                  className="mt-4 flex items-center gap-2 text-sm text-light-text-secondary dark:text-dark-text-secondary"
                >
                  <Users className="w-4 h-4" />
                  <span>Built by fragrance enthusiasts worldwide</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Alert Card */}
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-gradient-to-br from-light-primary/10 to-light-secondary/10 dark:from-dark-primary/20 dark:to-dark-secondary/20 rounded-2xl p-6 shadow-xl border border-light-primary/20 dark:border-dark-primary/30 relative overflow-hidden"
            >
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 bg-light-primary/10 dark:bg-dark-primary/10 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />

              <div className="relative z-10">
                <div className="flex items-start gap-3 mb-3">
                  <motion.div
                    animate={{ rotate: [0, 5, 0, -5, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <AlertCircle className="w-6 h-6 text-light-primary dark:text-dark-primary" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-bold text-light-text-primary dark:text-dark-text-primary mb-2">
                      Join the Research
                    </h3>
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                      An account is required to contribute to our fragrance database
                    </p>
                  </div>
                </div>
                
                {user[1].isAuthenticated
                    ? null
                    :
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-4 w-full py-2 px-4 bg-light-primary dark:bg-dark-primary text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
                        onClick={() => navigate('/signup')}
                    >
                        Sign Up Now
                    </motion.button>
                }
                
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-12 max-w-6xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-light-text-primary dark:text-dark-text-primary flex items-center gap-3">
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="text-light-primary dark:text-dark-primary"
                >
                  <Sparkles className="w-6 h-6" />
                </motion.span>
                Recently Added
              </h2>
              <Button
                variant="ghost"
                className="text-light-primary dark:text-dark-primary hover:bg-light-primary/10 dark:hover:bg-dark-primary/10"
              >
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                { !recentlyPostedFragrances.length < 1
                    ?
                    (recentlyPostedFragrances.map((fragrance, index) => (
                        <motion.div
                        key={fragrance.perfume}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => navigate(`/database/perfumes/${fragrance.perfume}`)}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="bg-light-surface dark:bg-dark-surface rounded-2xl overflow-hidden shadow-lg border border-light-border/50 dark:border-dark-border/50 cursor-pointer group"
                        >
                        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-light-primary/10 to-light-secondary/10 dark:from-dark-primary/20 dark:to-dark-secondary/20">
                            <motion.img
                            src={fragrance.perfume_image}
                            alt={fragrance.perfume}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.4 }}
                            />
                            <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={false}
                            >
                            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-white text-sm">
                                <Eye className="w-4 h-4" />
                                {/* <span>{fragrance.views} views</span> */}
                            </div>
                            </motion.div>
                        </div>

                        <div className="p-4">
                            <h3 className="text-lg font-bold text-light-text-primary dark:text-dark-text-primary mb-1 group-hover:text-light-primary dark:group-hover:text-dark-primary transition-colors">
                            {fragrance.perfume}
                            </h3>
                            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">
                            {fragrance.brand.name} ({fragrance.release_year})
                            </p>
                            <div className="flex items-center gap-2 pt-2 border-t border-light-border dark:border-dark-border">
                            <Clock className="w-3 h-3 text-light-text-secondary dark:text-dark-text-secondary" />
                            <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                                Added by <Link to={`/profile/${fragrance.proposed_by.username}`}>{fragrance.proposed_by.username}</Link>
                            </span>
                            </div>
                        </div>
                        </motion.div>
                    )))
                    : null

                }
              
            </div>
          </motion.div>
        </div>
      </div>

      

          <ReviewResearch/>

       
      
    </div>
  )
}
