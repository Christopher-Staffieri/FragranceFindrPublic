import { useAuth, useAuthStatus, useUser } from './auth'
import DashboardSideNavbar from './layouts/navbar-sidebar'
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  BarChart,
  Heart,
  Star,
  Calendar,
  Clock,
  Droplets,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
  NotebookPen,
} from "lucide-react"

import { Button } from "./components/MainButton"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/database/perfumeDetails/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/database/perfumeDetails/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "./components/database/perfumeDetails/avatar"
import { Progress } from "./components/database/perfumeDetails/progress"
import { getUserDashboardInfo, getUserProfile } from './lib/allauth'

export default function UserDashboard () {
  const user = useUser()
  const [activeTab, setActiveTab] = useState("overview")
  const [userData, setUserData] = useState(null)
  console.log(user)

  // useConfig, useAuth, useUser, useAuthStatus

//  try {
//       console.log('got here')
//       const content = await mfaReauthenticate(code)
//       if (content?.errors){
//         setResponse((r) => { return { ...r, content } })
//         throw 'There was an error proccesing the request'
//       }
//       setResponse((r) => { return { ...r, content } })
//       setIsSubmitting(false)
//       setIsSuccess(true)
//       setTimeout(() => {
//         setResponse((r) => { return { ...r, fetching: false } })
//       }, 3000)
//     } catch (error) {
//       setError("Authentication failed. Please try again.")
//       setIsSubmitting(false)
//       setVerificationCode(['', '', '', '', '', ''])
//       setCode('')
//       console.error(error)
//     }
  useEffect(() => {
    try{
      const content = getUserDashboardInfo({user_id: user.id, user_profile_id: user.profile})
      setUserData(content)
      console.log(content)
    } catch {
      console.log('error')
    }
  }, [])
  // useEffect(() => {
  //   try{
  //     console.log('got here')
  //     const content = getUserDashboardInfo()
  //   }
  //   getUserDashboardInfo
  // })

  return (
      <DashboardSideNavbar>
      <div className="space-y-8">
        
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">Dashboard</h1>
          <p className="text-light-text-secondary dark:text-dark-text-secondary">
            Welcome back, {user.username}! Here's an overview of your fragrance journey.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Calendar className="mr-2 h-4 w-4" />
            Last 30 days
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {userData !== null && userData !== undefined
          ? <>
            {[
            {
              title: "Collection Size",
              value: userData.collection_size,
              change: "+5",
              trend: "up",
              description: "fragrances",
              icon: Droplets,
              color: "light-primary",
            },
            {
              title: "Favorites",
              value: "16",
              change: "+2",
              trend: "up",
              description: "fragrances",
              icon: Heart,
              color: "light-secondary",
            },
            {
              title: "Reviews",
              value: userData.user_reviews,
              change: "+8",
              trend: "up",
              description: "total reviews",
              icon: NotebookPen,
              color: "yellow-400",
            },
            {
              title: "Avg. Rating",
              value: userData.avg_scent_rating,
              change: "-0.1",
              trend: "down",
              description: "out of 5",
              icon: BarChart,
              color: "green-500",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                    {stat.title}
                  </CardTitle>
                  <div className={`w-8 h-8 rounded-full bg-${stat.color}/10 flex items-center justify-center`}>
                    <stat.icon className={`h-4 w-4 text-${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
                    {stat.value === null || stat.value === undefined
                      ? 'NaN'
                      : stat.value
                    }
                    
                  </div>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">
                    {stat.description}
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <div className={`flex items-center text-xs ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                    )}
                    <span>{stat.change} this month</span>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
          </>
          
          : null
        }
      </div>
      

      {/* Tabs Section */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="collection">Collection</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Recent Additions */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Recent Additions</CardTitle>
                  <CardDescription>Your latest fragrance acquisitions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      name: "Aventus",
                      brand: "Creed",
                      date: "2 days ago",
                      image: "/placeholder.svg?height=60&width=60&text=Aventus",
                    },
                    {
                      name: "Baccarat Rouge 540",
                      brand: "Maison Francis Kurkdjian",
                      date: "1 week ago",
                      image: "/placeholder.svg?height=60&width=60&text=BR540",
                    },
                    {
                      name: "Oud Wood",
                      brand: "Tom Ford",
                      date: "2 weeks ago",
                      image: "/placeholder.svg?height=60&width=60&text=Oud+Wood",
                    },
                  ].map((fragrance, index) => (
                    <motion.div
                      key={fragrance.name}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-light-background dark:hover:bg-dark-background transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                      whileHover={{ x: 4 }}
                    >
                      <div className="w-12 h-12 rounded-md overflow-hidden">
                        <img
                          src={fragrance.image || "/placeholder.svg"}
                          alt={fragrance.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-light-text-primary dark:text-dark-text-primary truncate">
                          {fragrance.name}
                        </h4>
                        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                          {fragrance.brand}
                        </p>
                      </div>
                      <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {fragrance.date}
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Fragrances
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Top Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Top Categories</CardTitle>
                  <CardDescription>Your fragrance preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Woody", percentage: 35 },
                    { name: "Fresh", percentage: 25 },
                    { percentage: 35 },
                    { name: "Fresh", percentage: 25 },
                    { name: "Oriental", percentage: 20 },
                    { name: "Aromatic", percentage: 15 },
                    { name: "Citrus", percentage: 5 },
                  ].map((category, index) => (
                    <motion.div
                      key={category.name}
                      className="space-y-1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-light-text-primary dark:text-dark-text-primary">
                          {category.name}
                        </span>
                        <span className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                          {category.percentage}%
                        </span>
                      </div>
                      <Progress value={category.percentage} className="h-2" />
                    </motion.div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full">
                    View Detailed Breakdown
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {[
                    {
                      user: "You",
                      action: "added a review for",
                      target: "Bleu de Chanel",
                      time: "2 hours ago",
                      avatar: "/placeholder.svg?height=32&width=32&text=JD",
                    },
                    {
                      user: "Sarah",
                      action: "commented on your review of",
                      target: "Aventus",
                      time: "Yesterday",
                      avatar: "/placeholder.svg?height=32&width=32&text=SL",
                    },
                    {
                      user: "Michael",
                      action: "liked your photo of",
                      target: "Oud Wood",
                      time: "2 days ago",
                      avatar: "/placeholder.svg?height=32&width=32&text=MJ",
                    },
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      className="relative pl-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                    >
                      {index !== 2 && (
                        <div className="absolute left-4 top-4 bottom-0 w-px bg-light-border dark:bg-dark-border" />
                      )}
                      <div className="absolute left-0 top-1">
                        <Avatar className="h-8 w-8 border border-light-border dark:border-dark-border">
                          <AvatarImage src={activity.avatar} alt={activity.user} />
                          <AvatarFallback>{activity.user.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-light-text-primary dark:text-dark-text-primary">
                          <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                          <span className="font-medium text-light-primary dark:text-dark-primary">
                            {activity.target}
                          </span>
                        </p>
                        <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                          {activity.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="collection" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-light-text-primary dark:text-dark-text-primary">
              Your Collection (42)
            </h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search collection..."
                  className="w-full h-9 pl-9 pr-4 rounded-lg bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-light-surface dark:bg-dark-surface rounded-lg overflow-hidden border border-light-border dark:border-dark-border"
              >
                <div className="aspect-[3/4] relative">
                  <img
                    src={`/placeholder.svg?height=300&width=225&text=Fragrance+${index + 1}`}
                    alt={`Fragrance ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 bg-white/80 dark:bg-black/50 text-light-secondary dark:text-dark-secondary hover:text-light-secondary dark:hover:text-dark-secondary rounded-full"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-light-text-primary dark:text-dark-text-primary truncate">
                    {
                      [
                        "Aventus",
                        "Baccarat Rouge 540",
                        "Bleu de Chanel",
                        "Oud Wood",
                        "Tobacco Vanille",
                        "Y Eau de Parfum",
                        "Sauvage",
                        "Light Blue",
                      ][index]
                    }
                  </h4>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    {
                      [
                        "Creed",
                        "Maison Francis Kurkdjian",
                        "Chanel",
                        "Tom Ford",
                        "Tom Ford",
                        "YSL",
                        "Dior",
                        "Dolce & Gabbana",
                      ][index]
                    }
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < 4 ? "text-yellow-500 fill-yellow-500" : "text-gray-300 dark:text-gray-600"}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary ml-1">(4.0)</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Button>Load More</Button>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Feed</CardTitle>
              <CardDescription>Your recent interactions and community activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {[...Array(5)].map((_, index) => (
                <motion.div
                  key={index}
                  className="relative pl-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {index !== 4 && (
                    <div className="absolute left-4 top-4 bottom-0 w-px bg-light-border dark:bg-dark-border" />
                  )}
                  <div className="absolute left-0 top-1">
                    <Avatar className="h-8 w-8 border border-light-border dark:border-dark-border">
                      <AvatarImage
                        src={`/placeholder.svg?height=32&width=32&text=${["JD", "SL", "MJ", "AK", "TP"][index]}`}
                        alt="User"
                      />
                      <AvatarFallback>{["JD", "SL", "MJ", "AK", "TP"][index]}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-light-text-primary dark:text-dark-text-primary">
                      <span className="font-medium">{["You", "Sarah", "Michael", "Alex", "Taylor"][index]}</span>{" "}
                      {
                        [
                          "added a review for",
                          "commented on your review of",
                          "liked your photo of",
                          "followed you",
                          "mentioned you in a comment",
                        ][index]
                      }{" "}
                      {index < 3 && (
                        <span className="font-medium text-light-primary dark:text-dark-primary">
                          {["Bleu de Chanel", "Aventus", "Oud Wood"][index]}
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                      {["2 hours ago", "Yesterday", "2 days ago", "3 days ago", "1 week ago"][index]}
                    </p>
                    {index === 1 && (
                      <div className="mt-2 p-3 rounded-lg bg-light-background dark:bg-dark-background text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        Great review! I also love this fragrance. Have you tried the Eau de Parfum version?
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">
                View Full Activity History
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </DashboardSideNavbar>
    
  )
}
