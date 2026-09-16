

import { motion } from "framer-motion"
import { Star, TrendingUp, Sparkles, ThumbsDown, Network, Copy, CircleDot, ChevronRight, UserIcon as Male, UserIcon as Female, BookOpen, Users, MessageSquare, Award, HelpCircle, Clock } from 'lucide-react'
import { cn } from '../../lib/utils'
import { useEffect, useState } from "react"
import { listPerfumes } from "../../lib/allauth"

interface Perfume {
    id: string
    name: string
    image: string
    gender: "male" | "female" | "unisex"
    isNew?: boolean
  }
  
  interface NavItem {
    icon: React.ReactNode
    label: string
    description?: string
    href: string
  }
  
  const tabs = [
    { icon: <CircleDot className="h-4 w-4" />, label: "New" },
    { icon: <Star className="h-4 w-4" />, label: "Discover" },
    { icon: <TrendingUp className="h-4 w-4" />, label: "Top" },
    { icon: <ThumbsDown className="h-4 w-4" />, label: "Flop" },
    { icon: <Sparkles className="h-4 w-4" />, label: "Trends" },
    { icon: <Network className="h-4 w-4" />, label: "Associations" },
    { icon: <Copy className="h-4 w-4" />, label: "Dupes" },
  ]

export default function PerfumeList(){
    const [activeTab, setActiveTab] = useState("New")
    const [hoveredItem, setHoveredItem] = useState<string | null>(null)
    const [perfumeData, setPerfumeData] = useState(null)
    const [status, setStatus] = useState()
    const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })

    useEffect(() => {
      setResponse((r) => { return { ...r, fetching: true } })
                listPerfumes().then((resp) => {
                  console.log(resp)
                  if (resp.status === '200') {
                      setPerfumeData(resp.data)
                  }
              }).catch((e) => {
                  console.error(e)
                  window.alert(e)
                }).then(() => {
                  setResponse((r) => { return { ...r, fetching: false } })
                })
    }, [])


    const perfumes: Perfume[] = [
        { id: "1", name: "Arabian Pearl", image: "/placeholder.svg?height=400&width=400", gender: "male", isNew: true },
        { id: "2", name: "Emerald Creek", image: "/placeholder.svg?height=400&width=400", gender: "male" },
        { id: "3", name: "Essence of the Emirates", image: "/placeholder.svg?height=400&width=400", gender: "male" },
        { id: "4", name: "Velvet Kiss", image: "/placeholder.svg?height=400&width=400", gender: "female" },
        { id: "5", name: "Opus Reborn", image: "/placeholder.svg?height=400&width=400", gender: "male" },
        { id: "6", name: "Old Lavender", image: "/placeholder.svg?height=400&width=400", gender: "male" },
    ]

    const navItems: NavItem[] = [
        {
          icon: <BookOpen className="h-4 w-4" />,
          label: "Perfume Brands",
          description: "All Brands from A - Z",
          href: "#"
        },
        {
          icon: <Users className="h-4 w-4" />,
          label: "Perfumers",
          description: "The Noses Behind the Scents",
          href: "#"
        },
        {
          icon: <MessageSquare className="h-4 w-4" />,
          label: "Reviews",
          description: "New User Reviews",
          href: "#"
        },
        {
          icon: <Award className="h-4 w-4" />,
          label: "Top Rated Reviews",
          description: "The Best Reviews",
          href: "#"
        },
        {
          icon: <HelpCircle className="h-4 w-4" />,
          label: "Reviews wanted",
          description: "Unreviewed Perfumes",
          href: "#"
        },
        {
          icon: <Clock className="h-4 w-4" />,
          label: "Years of Release",
          href: "#"
        },
        {
          icon: <Copy className="h-4 w-4" />,
          label: "Dupes",
          href: "#"
        }
    ]

    return(

        <div className="min-h-screen bg-[#F4F5F7] dark:bg-[#1E1F21]">
      {/* Breadcrumb */}
      <div className="px-6 py-4">
        <nav className="flex items-center space-x-2 text-sm text-[#707070] dark:text-[#A0A0A0]">
          <a href="#" className="hover:text-[#4A90E2] transition-colors">HOME</a>
          <ChevronRight className="h-4 w-4" />
          <a href="#" className="hover:text-[#4A90E2] transition-colors">PERFUMES</a>
          <ChevronRight className="h-4 w-4" />
          <span className="text-[#4A90E2]">NEW PERFUMES</span>
        </nav>
      </div>

      <div className="px-6 pb-8">
        <div className="flex flex-col lg:flex-row-reverse gap-6">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-72 shrink-0"
          >
            <div className="sticky top-6 bg-white dark:bg-[#2B2D30] rounded-lg p-4">
              {/* Discover Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center mb-8"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="w-16 h-16 mb-2"
                >
                  <Star className="w-full h-full text-[#4A90E2]" />
                </motion.div>
                <h2 className="text-xl font-semibold text-[#2E2E2E] dark:text-[#ECECEC]">
                  Discover
                </h2>
              </motion.div>

              {/* Navigation Links */}
              <nav className="space-y-1">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "group relative flex flex-col p-3 rounded-lg transition-colors",
                      "hover:bg-[#F4F5F7] dark:hover:bg-[#393B3F]"
                    )}
                    onMouseEnter={() => setHoveredItem(item.label)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{
                          color: hoveredItem === item.label ? "#4A90E2" : "#707070",
                        }}
                        className="dark:text-[#A0A0A0] dark:group-hover:text-[#4A90E2]"
                      >
                        {item.icon}
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-[#2E2E2E] dark:text-[#ECECEC] group-hover:text-[#4A90E2]">
                            {item.label}
                          </span>
                          <ChevronRight 
                            className={cn(
                              "h-4 w-4 transition-transform",
                              "text-[#707070] dark:text-[#A0A0A0]",
                              "group-hover:text-[#4A90E2] group-hover:translate-x-1"
                            )}
                          />
                        </div>
                        {item.description && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hoveredItem === item.label ? 1 : 0.7 }}
                            className="text-xs text-[#707070] dark:text-[#A0A0A0] mt-0.5"
                          >
                            {item.description}
                          </motion.p>
                        )}
                      </div>
                    </div>
                    
                    {/* Animated highlight bar */}
                    <motion.div
                      initial={false}
                      animate={{
                        width: hoveredItem === item.label ? "3px" : "0px",
                        opacity: hoveredItem === item.label ? 1 : 0
                      }}
                      className="absolute right-0 top-0 bottom-0 bg-[#4A90E2] rounded-r-lg"
                    />
                  </motion.a>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="mb-8">
              <div className="bg-white dark:bg-[#2B2D30] rounded-lg p-2 flex flex-wrap gap-2">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.label}
                    onClick={() => setActiveTab(tab.label)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                      activeTab === tab.label
                        ? "bg-[#4A90E2] text-white"
                        : "text-[#707070] dark:text-[#A0A0A0] hover:bg-[#F4F5F7] dark:hover:bg-[#393B3F]"
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {tab.icon}
                    {tab.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-[#2E2E2E] dark:text-[#ECECEC]">
                  New at Parfumo
                </h1>
                <button className="text-[#4A90E2] hover:text-[#2563EB] text-sm font-medium transition-colors">
                  More
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {perfumes.map((perfume) => (
                  <motion.div
                    key={perfume.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="group relative bg-white dark:bg-[#2B2D30] rounded-lg overflow-hidden"
                    >
                      {perfume.isNew && (
                        <div className="absolute top-2 left-2 px-2 py-1 bg-[#F45B69] rounded text-xs font-medium text-white">
                          New
                        </div>
                      )}
                      <div className="relative aspect-square">
                        <img
                          src={perfume.image || "/placeholder.svg"}
                          alt={perfume.name}
                          className="object-cover w-full h-full transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-medium text-[#2E2E2E] dark:text-[#ECECEC] line-clamp-1">
                            {perfume.name}
                          </h3>
                          {perfume.gender === "male" ? (
                            <Male className="h-4 w-4 text-[#4A90E2]" />
                          ) : perfume.gender === "female" ? (
                            <Female className="h-4 w-4 text-[#F45B69]" />
                          ) : (
                            <div className="flex -space-x-1">
                              <Male className="h-4 w-4 text-[#4A90E2]" />
                              <Female className="h-4 w-4 text-[#F45B69]" />
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}