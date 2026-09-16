Here's the updated `perfume-detail.tsx` file with the resized sections:

```tsx project="Perfume Detail" file="perfume-detail.tsx" type="react"
"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Heart, Share2, Star, ThumbsUp, ThumbsDown, Clock, Calendar, Droplet, Flame, Camera, PieChartIcon, Activity, MessageCircle, PenLine, Lightbulb, ListFilter, FileText, LineChart, FlaskRoundIcon as Flask, Microscope, Bell, ChevronDown, Users, Medal, CircleDot, Info, Layers, NetworkIcon as Network2, Search, X } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

import ReviewsSection from "./reviews-section"







function SimilarFragrances() {
  const [activeTab, setActiveTab] = useState("similar")
  const [activeFilter, setActiveFilter] = useState("top")
  const [selectedFragrance, setSelectedFragrance] = useState<SimilarFragrance | null>(null)

  const similarFragrances: SimilarFragrance[] = [
    {
      id: 1,
      name: "A*Men Pure Havane",
      brand: "Mugler",
      image: "/placeholder.svg?height=200&width=200",
      similarity: 85,
      attributes: [
        { name: "Sweet", color: "rgba(156, 163, 175, 0.2)" },
        { name: "Gourmand", color: "rgba(239, 68, 68, 0.2)" },
        { name: "Spicy", color: "rgba(16, 185, 129, 0.2)" }
      ],
      ratings: {
        up: 334,
        down: 109
      }
    },
    {
      id: 2,
      name: "Honey Tobacco",
      brand: "Guerlain",
      image: "/placeholder.svg?height=200&width=200",
      similarity: 82,
      attributes: [
        { name: "Sweet", color: "rgba(156, 163, 175, 0.2)" },
        { name: "Tobacco", color: "rgba(245, 158, 11, 0.2)" }
      ],
      ratings: {
        up: 245,
        down: 82
      }
    },
    {
      id: 3,
      name: "Insurrection II Wild",
      brand: "Reyane Tradition",
      image: "/placeholder.svg?height=200&width=200",
      similarity: 78,
      attributes: [
        { name: "Sweet", color: "rgba(156, 163, 175, 0.2)" },
        { name: "Tobacco", color: "rgba(245, 158, 11, 0.2)" },
        { name: "Vanilla", color: "rgba(236, 72,153,0.2)" }
      ],
      ratings: {
        up: 189,
        down: 67
      }
    },
    {
      id: 4,
      name: "King Tobacco",
      brand: "Oud Elite",
      image: "/placeholder.svg?height=200&width=200",
      similarity: 75,
      attributes: [
        { name: "Tobacco", color: "rgba(245, 158,11,0.2)" },
        { name: "Woody", color: "rgba(120,53,15,0.2)" }
      ],
      ratings: {
        up: 156,
        down: 58
      }
    },
    {
      id: 5,
      name: "1981X PARFUM EXTRACT",
      brand: "Roja Parfums",
      image: "/placeholder.svg?height=200&width=200",
      similarity: 72,
      attributes: [
        { name: "Sweet", color: "rgba(156,163,175,0.2)" },
        { name: "Spicy", color: "rgba(16,185,129,0.2)" },
        { name: "Woody", color: "rgba(120,53,15,0.2)" }
      ],
      ratings: {
        up: 201,
        down: 79
      }
    },
    {
      id: 6,
      name: "Noble Night",
      brand: "Oud Elite",
      image: "/placeholder.svg?height=200&width=200",
      similarity: 70,
      attributes: [
        { name: "Woody", color: "rgba(120,53,15,0.2)" },
        { name: "Spicy", color: "rgba(16,185,129,0.2)" }
      ],
      ratings: {
        up: 134,
        down: 52
      }
    }
  ]

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Smells similar</h3>
          <span className="text-sm text-muted-foreground">What the fragrance is similar to</span>
        </div>

        <div className="space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger
                value="similar"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2"
              >
                <Info className="w-4 h-4" />
                Similar
              </TabsTrigger>
              <TabsTrigger
                value="layer"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2"
              >
                <Layers className="w-4 h-4" />
                Layer
              </TabsTrigger>
              <TabsTrigger
                value="associations"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2"
              >
                <Network2 className="w-4 h-4" />
                Associations
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Button
              variant={activeFilter === "top" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveFilter("top")}
              className="text-sm"
            >
              Top
            </Button>
            <Button
              variant={activeFilter === "all" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveFilter("all")}
              className="text-sm"
            >
              All 30
            </Button>
            <Button
              variant={activeFilter === "suggestions" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveFilter("suggestions")}
              className="text-sm flex items-center gap-2"
            >
              <span className="size-2 bg-primary rounded-full" />
              My suggestions
            </Button>
          </div>

          <ScrollArea className="w-full">
            <div className="flex space-x-4 pb-4">
              <AnimatePresence mode="popLayout">
                {similarFragrances.map((fragrance) => (
                  <motion.div
                    key={fragrance.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                    className="relative group"
                  >
                    <TooltipProvider>
                      <UITooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => setSelectedFragrance(fragrance)}
                            className="block w-[120px] text-center focus:outline-none"
                          >
                            <div className="relative size-[120px] rounded-full overflow-hidden mb-3 bg-muted group-hover:ring-2 ring-primary transition-all">
                              <Image
                                src={fragrance.image}
                                alt={fragrance.name}
                                fill
                                className="object-cover transition-transform group-hover:scale-110"
                              />
                              <motion.div
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                className="absolute inset-0 bg-black/40 flex items-center justify-center"
                              >
                                <span className="text-white font-semibold">
                                  {fragrance.similarity}% Similar
                                </span>
                              </motion.div>
                            </div>
                            <motion.span
                              className="text-sm text-muted-foreground group-hover:text-primary transition-colors line-clamp-2"
                              whileHover={{ y: -2 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              {fragrance.name}
                            </motion.span>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View {fragrance.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {fragrance.similarity}% similarity score
                          </p>
                        </TooltipContent>
                      </UITooltip>
                    </TooltipProvider>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </CardContent>
      {selectedFragrance && (
        <FragranceModal
          fragrance={selectedFragrance}
          isOpen={!!selectedFragrance}
          onClose={() => setSelectedFragrance(null)}
        />
      )}
    </Card>
  )
}

export default function PerfumeDetail() {
  const [isLiked, setIsLiked] = useState(false)
  const [activeTab, setActiveTab] = useState("info")
  const [scentProfileChartType, setScentProfileChartType] = useState<"pie" | "radar">("radar")

  const scentProfileData = [
    { attribute: "Sweet", value: 80 },
    { attribute: "Spicy", value: 65 },
    { attribute: "Woody", value: 90 },
    { attribute: "Fresh", value: 45 },
    { attribute: "Floral", value: 30 },
    { attribute: "Oriental", value: 85 },
  ]

  const stats = {
    rating: 8.9,
    reviews: 8466,
    statements: 45,
    photos: 23,
    likes: 256,
    wearers: 89,
    wishlists: 167,
  }

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
    { id: 5, name: "Nio", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sere9UiGd2avns9S51rXMoi4KdHn8v.png" },
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
    { 
      id: 5, 
      name: "Layton", 
      brand: "Parfums de Marly",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-z3tgpbSNmHK81LQdnZlYKIgyED1FqW.png" 
    },
  ]

  const renderChart = (data: any[], chartType: "pie" | "radar", colorKey: string = "color") => (
    <AnimatePresence mode="wait">
      <motion.div
        key={chartType}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="h-[300px] w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "pie" ? (
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                nameKey="attribute"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry[colorKey] || `hsl(${index * 45}, 70%, 60%)`} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center gap-2">
                            <div
                              className="h-2 w-2 rounded-full"
                              style={{ background: payload[0].payload.fill }}
                            />
                            <span className="font-medium">{payload[0].name}</span>
                          </div>
                          <div className="text-right font-medium">
                            {payload[0].value}
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                formatter={(value, entry: any) => (
                  <span className="text-sm text-muted-foreground">
                    {value} ({entry.payload.value})
                  </span>
                )}
              />
            </PieChart>
          ) : (
            <RadarChart data={data}>
              <PolarGrid className="text-gray-400" />
              <PolarAngleAxis
                dataKey="attribute"
                tick={{ fill: 'currentColor' }}
                className="text-gray-600 dark:text-gray-400"
              />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Value"
                dataKey="value"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.2}
              />
              <Tooltip />
            </RadarChart>
          )}
        </ResponsiveContainer>
      </motion.div>
    </AnimatePresence>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Pills */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href="/fragrances" className="hover:text-foreground">Fragrances</Link>
          <span>/</span>
          <Link href="/brands/xerjoff" className="hover:text-foreground">Xerjoff</Link>
          <span>/</span>
          <span className="text-foreground">Naxos</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-card shadow-md mb-8">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full h-auto p-0 bg-transparent grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {[
                { id: "info", label: "INFO", count: null },
                { id: "inspiration", label: "INSPIRATION", count: null },
                { id: "reviews", label: "REVIEWS", count: "58" },
                { id: "statements", label: "STATEMENTS", count: "87" },
                { id: "photos", label: "PHOTOS", count: "247" },
                { id: "chart", label: "CHART", count: null },
              ].map(({ id, label, count }) => (
                <TabsTrigger
                  key={id}
                  value={id}
                  className="px-4 py-3 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-transparent text-foreground hover:bg-muted transition-colors"
                >
                  <span>{label}</span>
                  {count && <span className="ml-1 opacity-80 text-xs">({count})</span>}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-6xl">
        <Tabs value={activeTab} className="w-full">
          <TabsContent value="info">
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Left Column - Image and Quick Stats */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative aspect-square rounded-2xl overflow-hidden bg-card shadow-lg"
                  >
                    <Image
                      src="/placeholder.svg"
                      alt="Naxos Perfume"
                      fill
                      className="object-cover"
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
                      className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary group relative overflow-hidden transition-all duration-300"
                      onClick={() => {
                        // Add price viewing functionality
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-300"
                        initial={false}
                      />
                      <span className="relative flex items-center justify-center gap-2 text-lg font-medium">
                        <motion.span
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                          className="flex items-center gap-2"
                        >
                          <Search className="w-5 h-5" />
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
                            className="bg-white/20 hover:bg-white/30 transition-colors"
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

                <RatingCard />

                {/* Quick Action Buttons */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
                    >
                      {quickActions.map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Button
                            variant="outline"
                            className="w-full h-full flex flex-col items-center justify-center gap-2 p-4 rounded-xl hover:bg-muted transition-all duration-300 ease-in-out"
                            onClick={() => {
                              // Add functionality here
                            }}
                          >
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {item.icon}
                            </motion.div>
                            <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
                          </Button>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
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
                      href="/collections/1861"
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
                    <h1 className="text-4xl font-bold text-foreground">Naxos</h1>
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
                    <span className="text-lg font-semibold">{stats.rating}</span>
                    <span className="text-sm">({stats.reviews.toLocaleString()} ratings)</span>
                  </motion.div>
                </div>

                {/* Scent Profile */}
                <Card>
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
                </Card>

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
                          <Image
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
                          <Image
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
                            <Image
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
            <ReviewsSection />
          </TabsContent>

          {/* Add other TabsContent for inspiration, statements, photos, and chart as needed */}
        </Tabs>
      </div>
    </div>
  )