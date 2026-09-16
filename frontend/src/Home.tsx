// import { Button } from "flowbite-react";
// import { motion } from 'framer-motion';
// import GoogleOneTap from "./socialaccount/GoogleOneTap";
// import React from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { Search, Send, Users, ChevronDown, Sun, Moon, Droplets, Heart, ArrowRight, Star, Sparkles } from "lucide-react"
import { useRef, useEffect, useState } from "react"
import { Button } from "./components/MainButton"
import { Input } from "./components/Input"
import TextLogo from "../public/TextLogo.png"
import DarkModeTextLogo from "../public/DarkModeTextLogo.png"
import { Link } from "react-router-dom"

export default function Home(){

  const heroRef = useRef<HTMLDivElement>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  useEffect(() => {
          const theme = localStorage.getItem("theme")
          setIsDarkMode(theme === "dark")
      }, [])

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const heroOpacity = useTransform(smoothProgress, [0, 1], [1, 0])
  const heroScale = useTransform(smoothProgress, [0, 1], [1, 0.9])
  const heroY = useTransform(smoothProgress, [0, 1], [0, 100])

    // Track mouse position for gradient effect
  useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
          x: e.clientX,
          y: e.clientY,
      })
      }

      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // will update images to the most popular perfumes
  const images = [
    "/placeholder.svg?height=600&width=400",
    "/placeholder.svg?height=600&width=400",
    "/placeholder.svg?height=600&width=400",
    "/placeholder.svg?height=600&width=400",
  ]
  // Rotate through images

  useEffect(() => {
    const interval = setInterval(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
}, [])

// Set loaded state
// useEffect(() => {
//     setIsLoaded(true)
//     const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
//     setIsDarkMode(prefersDark)

//     if (prefersDark) {
//     document.documentElement.classList.add("dark")
//     }
// }, [])

return(
  <div className="min-h-screen bg-light-background dark:bg-dark-background overflow-hidden">
{/* Theme Toggle Button */}
{/* <motion.button
  // onClick={toggleTheme}
  className="fixed top-6 right-6 z-50 p-3 rounded-full bg-light-surface dark:bg-dark-surface shadow-lg text-light-text-primary dark:text-dark-text-primary"
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
>
  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
</motion.button> */}

{/* Interactive Background */}
<div className="absolute inset-0 pointer-events-none overflow-hidden">
  <motion.div
    className="absolute opacity-30"
    style={{
      background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(74, 144, 226, 0.3) 0%, rgba(244, 91, 105, 0.1) 50%, rgba(0, 0, 0, 0) 80%)`,
      width: "100%",
      height: "100%",
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
  {[...Array(8)].map((_, i) => (
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
</div>

{/* Hero Section */}
<motion.section
  ref={heroRef}
  className="relative min-h-screen flex items-center overflow-hidden"
  style={{
    opacity: heroOpacity,
    scale: heroScale,
    y: heroY,
  }}
>
  <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center relative z-10">
    {/* Left Content */}
    <div className="space-y-8">

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-6"
      >
        <img
          src={isDarkMode ? DarkModeTextLogo : TextLogo}
          alt="FragranceFindr Logo"
          className="h-12 md:h-16"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-block px-4 py-1 rounded-full bg-light-primary/10 dark:bg-dark-primary/20 text-light-primary dark:text-dark-primary font-medium text-sm"
      >
        Discover Your Signature Scent
      </motion.div>

      <motion.h1
        className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-light-text-primary dark:text-dark-text-primary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Find Your <span className="text-light-primary dark:text-dark-primary">Perfect</span> Scent
      </motion.h1>

      <motion.p
        className="text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Discover fragrances tailored to your preferences using our advanced database and community insights.
      </motion.p>

      <motion.div
        className="flex flex-wrap gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="lg"
            className="bg-light-primary hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 text-white font-medium px-8"
          >
            Explore Now
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              className="ml-2"
            >
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="lg"
            variant="outline"
            className="border-light-primary text-light-primary hover:bg-light-primary/10 dark:border-dark-primary dark:text-dark-primary dark:hover:bg-dark-primary/10 font-medium"
          >
            <Search className="w-5 h-5 mr-2" />
            Search Database
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="flex items-center gap-6 pt-4"
      >
        <div className="flex -space-x-3">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="w-10 h-10 rounded-full border-2 border-light-surface dark:border-dark-surface overflow-hidden"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
            >
              <img
                src={`/placeholder.svg?height=40&width=40&text=${i + 1}`}
                alt={`User ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
        <div>
          <div className="flex items-center text-light-text-secondary dark:text-dark-text-secondary">
            <Star className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" />
            <span className="font-medium">4.9</span>
            <span className="mx-1">•</span>
            <span>2k+ active users</span>
          </div>
        </div>
      </motion.div>
    </div>

    {/* Right Content - Fragrance Image */}
    <div className="relative">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-light-primary/20 to-light-secondary/20 dark:from-dark-primary/20 dark:to-dark-secondary/20 rounded-2xl blur-3xl"
        animate={{
          opacity: [0.5, 0.7, 0.5],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={images[currentImageIndex] || "/placeholder.svg"}
              alt={`Fragrance ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Floating elements */}
        <motion.div
          className="absolute top-4 right-4 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-full px-3 py-1 text-sm font-medium text-light-text-primary dark:text-dark-text-primary flex items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Heart className="w-4 h-4 text-light-secondary dark:text-dark-secondary mr-1" fill="currentColor" />
          Popular Pick
        </motion.div>

        <motion.div
          className="absolute bottom-4 left-4 right-4 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-lg p-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
            {currentImageIndex === 0 && "Aventus by Creed"}
            {currentImageIndex === 1 && "Baccarat Rouge 540 by MFK"}
            {currentImageIndex === 2 && "Bleu de Chanel by Chanel"}
            {currentImageIndex === 3 && "Oud Wood by Tom Ford"}
          </div>
          <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary flex items-center mt-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 text-yellow-500" fill="currentColor" />
              ))}
            </div>
            <span className="ml-1">4.9 (2,345 reviews)</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </div>

  <motion.div
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.4, duration: 0.8 }}
  >
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      className="flex flex-col items-center cursor-pointer"
      onClick={() => {
        const databaseSection = document.getElementById("database-section")
        databaseSection?.scrollIntoView({ behavior: "smooth" })
      }}
    >
      <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">
        Scroll to explore
      </span>
      <ChevronDown className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
    </motion.div>
  </motion.div>
</motion.section>

{/* Database Section */}
<section id="database-section" className="py-24 bg-light-surface dark:bg-dark-surface relative overflow-hidden">
  <div className="absolute inset-0 pointer-events-none">
    <motion.div
      className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-light-primary/5 dark:bg-dark-primary/5"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      }}
    />
    <motion.div
      className="absolute bottom-20 -left-20 w-80 h-80 rounded-full bg-light-secondary/5 dark:bg-dark-secondary/5"
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{
        duration: 10,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      }}
    />
  </div>

  <div className="container mx-auto px-4 relative z-10">
    <div className="max-w-3xl mx-auto text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
        className="inline-block px-4 py-1 rounded-full bg-light-primary/10 dark:bg-dark-primary/20 text-light-primary dark:text-dark-primary font-medium text-sm mb-4"
      >
        Extensive Collection
      </motion.div>

      <motion.h2
        className="text-4xl font-bold mb-6 text-light-text-primary dark:text-dark-text-primary"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        Comprehensive Fragrance Database
      </motion.h2>

      <motion.p
        className="text-xl text-light-text-secondary dark:text-dark-text-secondary mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        Access detailed information about thousands of fragrances, including notes, longevity, and user reviews.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-light-text-secondary dark:text-dark-text-secondary" />
          </div>
          <Input
            placeholder="Search fragrances..."
            className="pl-10 bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary h-12"
          />
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="bg-light-primary hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 text-white h-12 px-6">
            Search
          </Button>
        </motion.div>
      </motion.div>
    </div>

    {/* Feature Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          icon: Droplets,
          title: "10,000+ Fragrances",
          description: "Explore our vast collection of perfumes from designers to niche houses.",
          delay: 0.2,
        },
        {
          icon: Users,
          title: "Community Reviews",
          description: "Read authentic reviews from our passionate fragrance community.",
          delay: 0.4,
        },
        {
          icon: Sparkles,
          title: "Note Breakdown",
          description: "Detailed analysis of top, middle, and base notes for each fragrance.",
          delay: 0.6,
        },
      ].map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: feature.delay, duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
          className="bg-light-background dark:bg-dark-background rounded-xl p-6 border border-light-border dark:border-dark-border"
        >
          <div className="w-12 h-12 rounded-full bg-light-primary/10 dark:bg-dark-primary/20 flex items-center justify-center mb-4">
            <feature.icon className="w-6 h-6 text-light-primary dark:text-dark-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">
            {feature.title}
          </h3>
          <p className="text-light-text-secondary dark:text-dark-text-secondary">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* Research Section */}
<section className="py-24 bg-light-background dark:bg-dark-background relative overflow-hidden">
  <div className="container mx-auto px-4 relative z-10">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Left side - Image */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
        className="relative"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-light-secondary/20 to-light-primary/20 dark:from-dark-secondary/20 dark:to-dark-primary/20 rounded-2xl blur-3xl"
          animate={{
            opacity: [0.5, 0.7, 0.5],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <div className="relative rounded-2xl overflow-hidden aspect-video">
          <img
            src="/placeholder.svg?height=400&width=600&text=Research"
            alt="Fragrance Research"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Right side - Content */}
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="inline-block px-4 py-1 rounded-full bg-light-secondary/10 dark:bg-dark-secondary/20 text-light-secondary dark:text-dark-secondary font-medium text-sm"
        >
          Contribute
        </motion.div>

        <motion.h2
          className="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          Propose New Research
        </motion.h2>

        <motion.p
          className="text-xl text-light-text-secondary dark:text-dark-text-secondary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          Contribute to our growing database by proposing new fragrance research and analysis. Help us build the
          most comprehensive fragrance resource.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to='/research'>
              <Button
                onClick={() => window.scrollTo(0, 0)}
                size="lg"
                className="bg-light-secondary hover:bg-light-secondary/90 dark:bg-dark-secondary dark:hover:bg-dark-secondary/90 text-white"
              >
                <Send className="w-5 h-5 mr-2" />
                Submit Research Proposal
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </div>
</section>

{/* Community Section */}
<section className="py-24 bg-light-surface dark:bg-dark-surface relative overflow-hidden">
  <div className="absolute inset-0 pointer-events-none">
    <motion.div
      className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-light-primary/5 dark:bg-dark-primary/5"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      }}
    />
  </div>

  <div className="container mx-auto px-4 relative z-10">
    <div className="max-w-3xl mx-auto text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
        className="inline-block px-4 py-1 rounded-full bg-light-primary/10 dark:bg-dark-primary/20 text-light-primary dark:text-dark-primary font-medium text-sm mb-4"
      >
        Connect
      </motion.div>

      <motion.h2
        className="text-4xl font-bold mb-6 text-light-text-primary dark:text-dark-text-primary"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        Join Our Community
      </motion.h2>

      <motion.p
        className="text-xl text-light-text-secondary dark:text-dark-text-secondary mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        Connect with fragrance enthusiasts, share your experiences, and learn from others in our active forums.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
          <Button
            size="lg"
            variant="outline"
            className="border-light-primary text-light-primary hover:bg-light-primary/10 dark:border-dark-primary dark:text-dark-primary dark:hover:bg-dark-primary/10 font-medium"
          >
            <Users className="w-5 h-5 mr-2" />
            Visit Forums
          </Button>
        </motion.div>
      </motion.div>
    </div>

    {/* Testimonials */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          name: "Sarah Johnson",
          role: "Fragrance Enthusiast",
          avatar: "/placeholder.svg?height=80&width=80&text=SJ",
          quote:
            "FragranceFindr has completely transformed how I discover new scents. The community recommendations are spot on!",
          delay: 0.2,
        },
        {
          name: "Michael Chen",
          role: "Perfume Collector",
          avatar: "/placeholder.svg?height=80&width=80&text=MC",
          quote:
            "The detailed note breakdowns and longevity information have helped me find fragrances that truly last all day.",
          delay: 0.4,
        },
        {
          name: "Olivia Martinez",
          role: "Beauty Blogger",
          avatar: "/placeholder.svg?height=80&width=80&text=OM",
          quote:
            "As someone who reviews fragrances professionally, I rely on FragranceFindr for accurate information and community insights.",
          delay: 0.6,
        },
      ].map((testimonial, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: testimonial.delay, duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
          className="bg-light-background dark:bg-dark-background rounded-xl p-6 border border-light-border dark:border-dark-border"
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
              <img
                src={testimonial.avatar || "/placeholder.svg"}
                alt={testimonial.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary">
                {testimonial.name}
              </h3>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                {testimonial.role}
              </p>
            </div>
          </div>
          <p className="text-light-text-secondary dark:text-dark-text-secondary italic">"{testimonial.quote}"</p>
          <div className="mt-4 flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* Scroll to top button */}
<motion.button
  className="fixed bottom-8 right-8 p-3 rounded-full bg-light-surface dark:bg-dark-surface shadow-lg text-light-text-primary dark:text-dark-text-primary z-50"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1 }}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
>
  <ChevronDown className="w-5 h-5 rotate-180" />
</motion.button>
</div>
)


}