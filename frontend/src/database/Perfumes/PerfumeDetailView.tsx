import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
// import Image from "next/image"
import { Heart, Share2, Star, ThumbsUp, ThumbsDown, Clock, Calendar, Droplet, Flame, Camera, PieChartIcon, Activity, MessageCircle, PenLine, Lightbulb, ListFilter, FileText, LineChart, FlaskRoundIcon as Flask, Microscope, Bell, ChevronDown, Users, Medal, CircleDot, Info, Layers, NetworkIcon as Network2, Search, X } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

import { Button } from "../../components/database/perfumeDetails/button"
// import { Progress } from "../../components/database/perfumeDetails/progress"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/database/perfumeDetails/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/database/perfumeDetails/card"
// import { Avatar, AvatarFallback, AvatarImage } from "../../components/database/perfumeDetails/avatar"
import { Badge } from "../../components/database/perfumeDetails/badge"
import QuickActions from "../../components/database/perfumeDetails/quickActions"
import NavbarTabs from "../../components/database/perfumeDetails/navbarTabs"
import { SimilarFragrances } from "../../components/database/perfumeDetails/similarFragrances"
import { RatingCard } from "../../components/database/perfumeDetails/ratingCard"
import { CollectionsCard } from "../../components/database/perfumeDetails/collectionsCard"
import { ScrollArea, ScrollBar } from "../../components/database/perfumeDetails/scroll-area"
import { renderFragranceCard } from "../../components/database/perfumeDetails/renderFragranceCard"
import NavigationTabs from "../../components/database/perfumeDetails/navigationTabs"
import { renderChart } from "../../components/database/perfumeDetails/renderChart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/database/perfumeDetails/tabs"
import ReviewsSection from "../../components/database/perfumeDetails/reviewsSection"
import NotePyramid from "../../components/database/perfumeDetails/NotePyramid"
import { useUser } from "../../auth"
import StatementsSection from "../../components/database/perfumeDetails/statementsSection"
import { getPerfumeScentRating, getPerfumeTotalRatings } from "../../lib/allauth"
// import {
//   Tooltip as UITooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "../../components/database/perfumeDetails/tooltip"
// import { ScrollArea, ScrollBar } from "../../components/database/perfumeDetails/scroll-area"



// import ReviewsSection from "./reviews-section"


export default function PerfumeDetailView(perfumeData) {
    const [isLiked, setIsLiked] = useState(false)
    const [activeTab, setActiveTab] = useState("info")
    const [scentProfileChartType, setScentProfileChartType] = useState<"pie" | "radar">("radar")
    const unpackedFragranceData = perfumeData.perfumeData.perfumeData
    const currentUser = useUser()
    const [status, setStatus] = useState()
    const [totalRatings, setTotalRatings] = useState(0)
    const [perfumeRating, setPerfumeRating] = useState(0)
    const stats = {
      rating: 8.9,
      statements: 45,
      photos: 23,
      likes: 256,
      wearers: 89,
      wishlists: 167,
    }
    console.log(unpackedFragranceData)
    console.log(perfumeData)

    useEffect(() => {
      // setResponse((r) => { return { ...r, fetching: true } })
                  getPerfumeTotalRatings(unpackedFragranceData.id).then((resp) => {
                  console.log(resp)
                  if (resp.error) {
                      setStatus(false)
                  }else{
                    // stats.reviews = 100
                    setTotalRatings(resp.ratings_total)
                  }
              }).catch((e) => {
                  console.error(e)
                  window.alert(e)
                }).then(() => {
                  // setResponse((r) => { return { ...r, fetching: false } })
                })

                getPerfumeScentRating(unpackedFragranceData.id).then((resp) => {
                  console.log(resp.scent_rating.scent_rating__avg)
                  if (resp.error) {
                      setStatus(false)
                  }else{
                    // stats.reviews = 100
                    setPerfumeRating(resp.scent_rating.scent_rating__avg)
                  }
              }).catch((e) => {
                  console.error(e)
                  window.alert(e)
                }).then(() => {
                  // setResponse((r) => { return { ...r, fetching: false } })
                })
                // getPerfumeScentRating
    }, [])
  
    console.log(activeTab)
    const scentProfileData = [
      { attribute: "Sweet", value: 80 },
      { attribute: "Spicy", value: 65 },
      { attribute: "Woody", value: 90 },
      { attribute: "Fresh", value: 45 },
      { attribute: "Floral", value: 30 },
      { attribute: "Oriental", value: 85 },
    ]
  
    
    const newReleases = [
        { id: 1, name: "Alexandria III", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sere9UiGd2avns9S51rXMoi4KdHn8v.png" },
        { id: 2, name: "Nio", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sere9UiGd2avns9S51rXMoi4KdHn8v.png" },
        { id: 3, name: "Renaissance", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sere9UiGd2avns9S51rXMoi4KdHn8v.png" },
        { id: 4, name: "Uden", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sere9UiGd2avns9S51rXMoi4KdHn8v.png" },
        { id: 5, name: "Naxos", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sere9UiGd2avns9S51rXMoi4KdHn8v.png" },
      ]
    
    const popularFragrances = [
      { id: 1, name: "Alexandria II", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sere9UiGd2avns9S51rXMoi4KdHn8v.png" },
      { id: 2, name: "Erba Pura", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sere9UiGd2avns9S51rXMoi4KdHn8v.png" },
      { id: 3, name: "Lira", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sere9UiGd2avns9S51rXMoi4KdHn8v.png" },
      { id: 4, name: "Dama Bianca", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sere9UiGd2avns9S51rXMoi4KdHn8v.png" },
    ]
  
    const quickActions = [
      { icon: <Bell className="w-5 h-5 text-primary" />, label: "Subscribe" },
      { icon: <Heart className="w-5 h-5 text-pink-500" />, label: "Collection" },
      { icon: <Star className="w-5 h-5 text-yellow-500" />, label: "Rate" },
      { icon: <MessageCircle className="w-5 h-5 text-purple-500" />, label: "Review" },
      { icon: <PenLine className="w-5 h-5 text-blue-500" />, label: "Statement" },
      { icon: <Camera className="w-5 h-5 text-emerald-500" />, label: "Photo" },
      { icon: <Lightbulb className="w-5 h-5 text-orange-500" />, label: "Inspiration" },
      { icon: <ListFilter className="w-5 h-5 text-violet-500" />, label: "Classify" },
      { icon: <FileText className="w-5 h-5 text-red-500" />, label: "Notes" },
      { icon: <LineChart className="w-5 h-5 text-cyan-500" />, label: "Tracker" },
      { icon: <Flask className="w-5 h-5 text-rose-500" />, label: "Souk 120" },
      { icon: <Microscope className="w-5 h-5 text-teal-500" />, label: "Research" },
    ]
  
    const alsoLikeFragrances = [
      { 
        id: 1, 
        name: "Enigma Pour Homme", 
        brand: "Roja Parfums",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-z3tgpbSNmHK81LQdnZlYKIgyED1FqW.png" 
      },
      { 
        id: 2, 
        name: "Grand Soir", 
        brand: "Maison Francis Kurkdjian",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-z3tgpbSNmHK81LQdnZlYKIgyED1FqW.png" 
      },
      { 
        id: 3, 
        name: "Blessed Baraka", 
        brand: "Initio",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-z3tgpbSNmHK81LQdnZlYKIgyED1FqW.png" 
      },
      { 
        id: 4, 
        name: "Gentle Fluidity Silver", 
        brand: "Maison Francis Kurkdjian",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-z3tgpbSNmHK81LQdnZlYKIgyED1FqW.png" 
      },
    ]
    console.log(perfumeData.perfumeData.perfumeData)
    return (
        <div className="min-h-screen bg-background">
          {/* Top Navigation Pills */}
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Link to="/" className="hover:text-gray-900 dark:hover:text-gray-100">Home</Link>
              <span>/</span>
              <Link to="/fragrances" className="hover:text-gray-900 dark:hover:text-gray-100">Fragrances</Link>
              <span>/</span>
              <Link to="/brands/xerjoff" className="hover:text-gray-900 dark:hover:text-gray-100">Xerjoff</Link>
              <span>/</span>
              <span className="text-gray-900 dark:text-gray-100">{unpackedFragranceData.perfume}</span>
            </div>
          </div>
    
          {/* Navigation Tabs */}
          {/* <div className="bg-card shadow-md mb-8"> */}
          <div className="bg-white dark:bg-gray-800 shadow-md mb-8">          
            <div className="container mx-auto px-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full ">
                <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab}/>

                <TabsContent value="info" className="mt-6">
                  <div className="prose dark:prose-invert max-w-none">
                    <p>
                      Naxos is a masterful creation that captures the essence of Mediterranean luxury.
                      This fragrance opens with bright citrus notes of bergamot and lemon, complemented by aromatic lavender.
                      The heart reveals a rich blend of honey, cashmere, and exotic spices, while the base notes of tobacco,
                      tonka bean, and vanilla provide a warm, sophisticated finish that lingers on the skin.
                    </p>
                    <h3 className="text-xl font-semibold">Perfumer's Notes</h3>
                    <p>
                      "Naxos represents the perfect harmony between citrus freshness and oriental warmth.
                      It's a journey through the Mediterranean, capturing both its vibrant energy and its serene sophistication."
                    </p>
              </div>
            </TabsContent>

              </Tabs>
            </div>
          </div>
          
          
    
          {/* Main Content */}
          <div className="container mx-auto px-4 max-w-6xl">
            <Tabs value={activeTab} className="w-full">
              <TabsContent value="info">
                <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-8 mb-12">
                  {/* Left Column - Image and Quick Stats */}
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative aspect-square rounded-2xl overflow-hidden bg-card shadow-lg"
                      >
                        <img
                          src="/placeholder.svg"
                          alt="Naxos Perfume"
                        
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4 flex gap-2">
                          <Button
                            variant="secondary"
                            size="icon"
                            className="rounded-full bg-background/80 backdrop-blur-sm"
                            onClick={() => setIsLiked(!isLiked)}
                          >
                            <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                          </Button>
                          <Button
                            variant="secondary"
                            size="icon"
                            className="rounded-full bg-background/80 backdrop-blur-sm"
                          >
                            <Share2 className="w-5 h-5" />
                          </Button>
                        </div>
                      </motion.div>
                      
                      {/* New Price Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.5,
                          delay: 0.2
                        }}
                      >
                        <Button
                          variant="default"
                          size="lg"
                          className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary group relative overflow-hidden transition-all duration-300 px-3 py-2 sm:px-4 sm:py-3"
                          onClick={() => {
                            // Add price viewing functionality
                          }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-300"
                            initial={false}
                          />
                          <span className="relative flex items-center justify-center gap-2 text-sm sm:text-base md:text-lg font-medium">
                            <motion.span
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                              }}
                              className="flex items-center gap-1 sm:gap-2"
                            >
                              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                              View Retailers & Prices
                            </motion.span>
                            <motion.div
                              className="relative flex items-center"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              <Badge 
                                variant="secondary" 
                                className="bg-white/20 hover:bg-white/30 transition-colors text-xs sm:text-sm"
                              >
                                From $235
                              </Badge>
                            </motion.div>
                          </span>
                        </Button>
                      </motion.div>
                    </div>
    
                    <Card>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <div className="text-sm text-muted-foreground">Wearers</div>
                            <div className="font-medium">{stats.wearers}</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-sm text-muted-foreground">Wishlists</div>
                            <div className="font-medium">{stats.wishlists}</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-sm text-muted-foreground">Statements</div>
                            <div className="font-medium">{stats.statements}</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-sm text-muted-foreground">Photos</div>
                            <div className="font-medium">{stats.photos}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
    
                    <RatingCard perfume={unpackedFragranceData}/>
    
                    {/* Quick Action Buttons */}
                    <QuickActions perfume={unpackedFragranceData}/>
                  </div>
    
                  {/* Right Column - Details */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Link
                          to="/collections/1861"
                          className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium"
                        >
                          1861 Collection
                        </Link>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
                        >
                          <CircleDot className="w-4 h-4" />
                          Unisex
                        </motion.div>
                      </div>
                      
                      <div className="space-y-2">
                        <h1 className="text-4xl font-bold text-foreground">{unpackedFragranceData.perfume}</h1>
                        <div className="flex items-center gap-4">
                          <p className="text-xl text-muted-foreground">by Xerjoff</p>
                          <span className="text-sm text-muted-foreground">Released 2015</span>
                        </div>
                      </div>
    
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground"
                      >
                        <Star className="w-5 h-5 fill-current" />
                        <span className="text-lg font-semibold">{perfumeRating} / 10</span>
                        <span className="text-sm">({totalRatings.toLocaleString()} ratings)</span>
                      </motion.div>
                    </div>
                    <NotePyramid perfume={unpackedFragranceData}/>
    
                    {/* Scent Profile */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                          <span>Scent Profile</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setScentProfileChartType(scentProfileChartType === "pie" ? "radar" : "pie")}
                          >
                            {scentProfileChartType === "pie" ? <Activity className="w-4 h-4 mr-2" /> : <PieChartIcon className="w-4 h-4 mr-2" />}
                            Switch to {scentProfileChartType === "pie" ? "Radar" : "Pie"} Chart
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {renderChart(scentProfileData, scentProfileChartType)}
                      </CardContent>
                    </Card>
         
                    {/* <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Scent Profile</CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-9 p-0"
                          onClick={() => setScentProfileChartType(scentProfileChartType === "pie" ? "radar" : "pie")}
                        >
                          <PieChartIcon className="h-4 w-4" />
                          <span className="sr-only">Toggle chart type</span>
                        </Button>
                      </CardHeader>
                      <CardContent>
                        {renderChart(scentProfileData, scentProfileChartType)}
                      </CardContent>
                    </Card> */}
    
                    {/* Similar Fragrances */}
                    <SimilarFragrances />
    
                    {/* CollectionsCard component */}
                    <CollectionsCard />
                  </motion.div>
                </div>
    
                {/* New Releases */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">New Releases</h2>
                  <ScrollArea className="w-full whitespace-nowrap rounded-lg">
                    <div className="flex w-max space-x-4 p-4">
                      {newReleases.map((release) => (
                        <Card key={release.id} className="w-[150px] shrink-0">
                          <CardContent className="p-4">
                            <div className="aspect-square rounded-lg bg-muted mb-4 overflow-hidden">
                              <img
                                src={release.image}
                                alt={release.name}
                                width={150}
                                height={150}
                                className="object-cover w-full h-full transition-transform hover:scale-110"
                              />
                            </div>
                            <h3 className="font-medium text-sm truncate">
                              {release.name}
                            </h3>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
    
                {/* Popular Fragrances */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">Popular Fragrances</h2>
                  <ScrollArea className="w-full whitespace-nowrap rounded-lg">
                    <div className="flex w-max space-x-4 p-4">
                      {popularFragrances.map((fragrance) => (
                        <Card key={fragrance.id} className="w-[150px] shrink-0 group cursor-pointer hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="aspect-square rounded-lg bg-muted mb-4 overflow-hidden">
                              <img
                                src={fragrance.image}
                                alt={fragrance.name}
                                width={150}
                                height={150}
                                className="object-cover w-full h-full transition-transform group-hover:scale-110"
                              />
                            </div>
                            <h3 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                              {fragrance.name}
                            </h3>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
    
                {/* You Might Also Like */}
                <div className="mb-12">
                  <div className="flex items-center gap-2 mb-6">
                    <h2 className="text-2xl font-bold">You Might Also Like</h2>
                    <Badge variant="secondary" className="text-sm">Based on Naxos</Badge>
                  </div>
                  <ScrollArea className="w-full whitespace-nowrap rounded-lg">
                    <div className="flex w-max space-x-4 p-4">
                      {alsoLikeFragrances.map((fragrance) => (
                        <motion.div
                          key={fragrance.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * fragrance.id }}
                          whileHover={{ y: -5 }}
                          className="group w-[150px] shrink-0"
                        >
                          <Card className="overflow-hidden bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                            <CardContent className="p-4">
                              <div className="aspect-square rounded-lg overflow-hidden mb-3">
                                <img
                                  src={fragrance.image}
                                  alt={fragrance.name}
                                  width={150}
                                  height={150}
                                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                                />
                              </div>
                              <div className="space-y-1">
                                <h3 className="font-medium text-sm group-hover:text-primary transition-colors truncate">
                                  {fragrance.name}
                                </h3>
                                <p className="text-xs text-muted-foreground truncate">
                                  {fragrance.brand}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
              </TabsContent>
    
              {/* Reviews Section */}
              <TabsContent value="reviews" className="mt-6">
                <ReviewsSection perfume={unpackedFragranceData.id}/>
                
              </TabsContent>

              <TabsContent value="statements" className="mt-6">
                <StatementsSection perfume={unpackedFragranceData.id}/>
                
              </TabsContent>
              
              <TabsContent value="chart" className="mt-6 space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>Fragrance Type</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setScentProfileChartType(scentProfileChartType === "pie" ? "radar" : "pie")}
                        >
                          {scentProfileChartType === "pie" ? <Activity className="w-4 h-4 mr-2" /> : <PieChartIcon className="w-4 h-4 mr-2" />}
                          Switch to {scentProfileChartType === "pie" ? "Radar" : "Pie"} Chart
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {renderChart(scentProfileData, scentProfileChartType)}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* <TabsContent value="info" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="prose dark:prose-invert">
                          <p>
                            Naxos is a masterful creation that captures the essence of Mediterranean luxury.
                            This fragrance opens with bright citrus notes of bergamot and lemon, complemented by aromatic lavender.
                            The heart reveals a rich blend of honey, cashmere, and exotic spices, while the base notes of tobacco,
                            tonka bean, and vanilla provide a warm, sophisticated finish that lingers on the skin.
                          </p>
                          <h3>Perfumer's Notes</h3>
                          <p>
                            "Naxos represents the perfect harmony between citrus freshness and oriental warmth.
                            It's a journey through the Mediterranean, capturing both its vibrant energy and its serene sophistication."
                          </p>
                        </div>
                        <div className="relative aspect-video rounded-lg overflow-hidden">
                          <img
                            src="/placeholder.svg"
                            alt="Naxos Island"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent> */}

                {/* <TabsContent value="info" className="mt-6">
                  <div className="prose dark:prose-invert max-w-none">
                    <p>
                      Naxos is a masterful creation that captures the essence of Mediterranean luxury.
                      This fragrance opens with bright citrus notes of bergamot and lemon, complemented by aromatic lavender.
                      The heart reveals a rich blend of honey, cashmere, and exotic spices, while the base notes of tobacco,
                      tonka bean, and vanilla provide a warm, sophisticated finish that lingers on the skin.
                    </p>
                    <h3>Perfumer's Notes</h3>
                    <p>
                      "Naxos represents the perfect harmony between citrus freshness and oriental warmth.
                      It's a journey through the Mediterranean, capturing both its vibrant energy and its serene sophistication."
                    </p>
                  </div>
                </TabsContent> */}

                <TabsContent value="inspiration" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="prose dark:prose-invert">
                          <h3>The Story</h3>
                          <p>
                            Named after the Greek island of Naxos, this fragrance captures the essence of Mediterranean luxury
                            and the rich history of the region. The composition draws inspiration from the traditional
                            tobacco cultivation of the island, combined with local citrus groves and honey production.
                          </p>
                        </div>
                        <div className="relative aspect-video rounded-lg overflow-hidden">
                          <img
                            src="/placeholder.svg"
                            alt="Naxos Island"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
    
              {/* Add other TabsContent for inspiration, statements, photos, and chart as needed */}
            </Tabs>
          </div>
        </div>
      )
}
