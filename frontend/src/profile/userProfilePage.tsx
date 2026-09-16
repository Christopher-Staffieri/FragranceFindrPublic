
import { motion, AnimatePresence } from "framer-motion"
import { Search, Flag, Edit2, Star, ChevronDown, Globe, CircleDot, Mail, Link, Calendar, Award, BookOpen, Users, MessageSquare, Settings } from 'lucide-react'
// import { ProfilePictureUpload } from "./profile-picture-upload"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/database/perfumeDetails/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/database/perfumeDetails/dropdownMenu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/database/perfumeDetails/tabs"
import { useState } from "react"


interface UserProfile {
    username: string
    level: number
    joinDate: string
    country: string
    online: boolean
    parfumoPoints: number
    perfumeTag: number
    tested: number
    avatar?: string
    email: string
    website: string
    bio: string
    favoriteNotes: string[]
    recentActivity: { action: string; date: string }[]
    friends: { name: string; avatar: string }[]
  }

export default function UserProfilePage(){

    const [profile, setProfile] = useState<UserProfile>({
        username: "Hood47601",
        level: 4,
        joinDate: "05/12/2024",
        country: "USA",
        online: true,
        parfumoPoints: 4,
        perfumeTag: 1,
        tested: 1,
        avatar: "/placeholder.svg?height=200&width=200",
        email: "hood47601@example.com",
        website: "https://hood47601.com",
        bio: "Fragrance enthusiast and collector. Always on the hunt for the perfect scent!",
        favoriteNotes: ["Vanilla", "Oud", "Bergamot", "Rose"],
        recentActivity: [
          { action: "Reviewed Bleu de Chanel", date: "2 hours ago" },
          { action: "Added Dior Sauvage to collection", date: "1 day ago" },
          { action: "Commented on Tom Ford Noir review", date: "3 days ago" },
        ],
        friends: [
          { name: "Alice", avatar: "/placeholder.svg?height=50&width=50" },
          { name: "Bob", avatar: "/placeholder.svg?height=50&width=50" },
          { name: "Charlie", avatar: "/placeholder.svg?height=50&width=50" },
        ],
      })
    
      const handleImageChange = async (file: File) => {
        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        const url = URL.createObjectURL(file)
        setProfile(prev => ({ ...prev, avatar: url }))
      }

      return (
        <div className="min-h-screen bg-[#F4F5F7] dark:bg-[#1E1F21] text-[#2E2E2E] dark:text-[#ECECEC]">
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <motion.nav 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 text-sm text-[#707070] dark:text-[#A0A0A0] mb-8"
            >
              <a href="#" className="hover:text-[#4A90E2] transition-colors">HOME</a>
              <span>/</span>
              <a href="#" className="hover:text-[#4A90E2] transition-colors">COMMUNITY</a>
              <span>/</span>
              <span className="text-[#4A90E2]">{profile.username}</span>
            </motion.nav>
    
            {/* Profile Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-[#2B2D30] rounded-lg shadow-sm p-6 mb-8"
            >
              <div className="flex flex-col md:flex-row items-start gap-8">
                {/* Profile Picture Section */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                >
                  {/* <ProfilePictureUpload
                    currentImage={profile.avatar}
                    userLevel={profile.level}
                    onImageChange={handleImageChange}
                  /> */}
                </motion.div>
    
                {/* User Info Section */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <motion.h1 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-3xl font-bold"
                    >
                      {profile.username}
                    </motion.h1>
                    <div className="flex items-center gap-2">
                      <Flag className="w-4 h-4 text-[#707070] dark:text-[#A0A0A0]" />
                      <span className="text-sm">{profile.country}</span>
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: profile.online ? 1 : 0.5 
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                        className="w-2 h-2 rounded-full bg-green-500"
                      />
                    </div>
                  </div>
    
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
                  >
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-[#4A90E2]" />
                      <span className="text-sm">{profile.parfumoPoints} FragranceFindr Points</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-[#4A90E2]" />
                      <span className="text-sm">Member since {profile.joinDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CircleDot className="w-4 h-4 text-[#4A90E2]" />
                      <span className="text-sm">#{profile.perfumeTag} Perfume Tag</span>
                    </div>
                  </motion.div>
    
                  {/* Bio */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-[#707070] dark:text-[#A0A0A0] mb-4"
                  >
                    {profile.bio}
                  </motion.p>
    
                  {/* Contact Info */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-wrap gap-4 mb-4"
                  >
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#4A90E2]" />
                      <a href={`mailto:${profile.email}`} className="text-sm hover:underline">{profile.email}</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link className="w-4 h-4 text-[#4A90E2]" />
                      <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">{profile.website}</a>
                    </div>
                  </motion.div>
    
                  {/* Status Update */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative"
                  >
                    <input
                      type="text"
                      placeholder="Update your status..."
                      className="w-full px-4 py-2 rounded-lg bg-[#F4F5F7] dark:bg-[#1E1F21] border border-[#E1E1E1] dark:border-[#393B3F] focus:outline-none focus:ring-2 focus:ring-[#4A90E2] transition-all"
                    />
                    <Edit2 className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#707070] dark:text-[#A0A0A0]" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
    
            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="md:col-span-2 space-y-8">
                {/* Tabs */}
                <Tabs defaultValue="activity" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-[#2B2D30] rounded-lg shadow-sm">
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    <TabsTrigger value="collections">Collections</TabsTrigger>
                    <TabsTrigger value="friends">Friends</TabsTrigger>
                  </TabsList>
                  <TabsContent value="activity">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white dark:bg-[#2B2D30] rounded-lg shadow-sm p-6"
                    >
                      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                      <ul className="space-y-4">
                        {profile.recentActivity.map((activity, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between"
                          >
                            <span>{activity.action}</span>
                            <span className="text-sm text-[#707070] dark:text-[#A0A0A0]">{activity.date}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </TabsContent>
                  <TabsContent value="reviews">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white dark:bg-[#2B2D30] rounded-lg shadow-sm p-6"
                    >
                      <h2 className="text-xl font-semibold mb-4">Your Reviews</h2>
                      <p className="text-[#707070] dark:text-[#A0A0A0]">You haven't written any reviews yet.</p>
                    </motion.div>
                  </TabsContent>
                  <TabsContent value="collections">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white dark:bg-[#2B2D30] rounded-lg shadow-sm p-6"
                    >
                      <h2 className="text-xl font-semibold mb-4">Your Collections</h2>
                      <p className="text-[#707070] dark:text-[#A0A0A0]">You haven't created any collections yet.</p>
                    </motion.div>
                  </TabsContent>
                  <TabsContent value="friends">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white dark:bg-[#2B2D30] rounded-lg shadow-sm p-6"
                    >
                      <h2 className="text-xl font-semibold mb-4">Your Friends</h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {profile.friends.map((friend, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-2"
                          >
                            <img src={friend.avatar || "/placeholder.svg"} alt={friend.name} className="w-10 h-10 rounded-full" />
                            <span>{friend.name}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </TabsContent>
                </Tabs>
    
                {/* What are you wearing? */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-[#2B2D30] rounded-lg shadow-sm p-6"
                >
                  <h2 className="text-xl font-semibold mb-4">What are you wearing?</h2>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#707070] dark:text-[#A0A0A0]" />
                    <input
                      type="text"
                      placeholder="Search Perfume..."
                      className="w-full pl-12 pr-4 py-2 rounded-lg bg-[#F4F5F7] dark:bg-[#1E1F21] border border-[#E1E1E1] dark:border-[#393B3F] focus:outline-none focus:ring-2 focus:ring-[#4A90E2] transition-all"
                    />
                  </div>
                </motion.div>
    
                {/* Wall */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-[#2B2D30] rounded-lg shadow-sm p-6"
                >
                  <h2 className="text-xl font-semibold mb-4">Wall</h2>
                  <textarea
                    placeholder="Post to Wall..."
                    className="w-full px-4 py-2 rounded-lg bg-[#F4F5F7] dark:bg-[#1E1F21] border border-[#E1E1E1] dark:border-[#393B3F] focus:outline-none focus:ring-2 focus:ring-[#4A90E2] transition-all resize-none h-32"
                  />
                </motion.div>
              </div>
    
              {/* Right Column */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                {/* Fragrance Preferences */}
                <div className="bg-white dark:bg-[#2B2D30] rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Fragrance Preferences</h2>
                    <ChevronDown className="w-4 h-4 text-[#707070] dark:text-[#A0A0A0]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Favorite Notes:</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.favoriteNotes.map((note, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="px-2 py-1 bg-[#4A90E2] text-white text-xs rounded-full"
                        >
                          {note}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
    
                {/* Collections */}
                <div className="bg-white dark:bg-[#2B2D30] rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Collections</h2>
                  <p className="text-sm text-[#707070] dark:text-[#A0A0A0]">
                    {profile.username} hasn't created a Perfume Collection yet.
                  </p>
                </div>
    
                {/* Testing Stats */}
                <div className="bg-white dark:bg-[#2B2D30] rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Testing Stats</h2>
                  <div className="flex items-center gap-2">
                    <CircleDot className="w-4 h-4 text-[#4A90E2]" />
                    <span>Tested {profile.tested}</span>
                  </div>
                </div>
    
                {/* Achievements */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-[#2B2D30] rounded-lg shadow-sm p-6"
                >
                  <h2 className="text-xl font-semibold mb-4">Achievements</h2>
                  <div className="grid grid-cols-3 gap-4">
                    <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="flex flex-col items-center"
                        >
                          <Award className="w-8 h-8 text-[#4A90E2]" />
                          <span className="text-xs mt-1">Novice</span>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Reviewed 5 fragrances</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="flex flex-col items-center"
                        >
                          <BookOpen className="w-8 h-8 text-[#707070] dark:text-[#A0A0A0]" />
                          <span className="text-xs mt-1">Scholar</span>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Read 50 reviews (Locked)</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="flex flex-col items-center"
                        >
                          <Users className="w-8 h-8 text-[#707070] dark:text-[#A0A0A0]" />
                          <span className="text-xs mt-1">Socialite</span>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Make 20 friends (Locked)</p>
                      </TooltipContent>
                    </Tooltip>
                    </TooltipProvider>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      )
}