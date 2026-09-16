// import * as React from "react"
import { motion } from "framer-motion"
import { Loader2, Check, ChevronDown } from 'lucide-react'
import { Link } from "react-router-dom"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/common/select"
import SignupForm from "../components/forms/SignupForm"
import { useEffect, useState } from "react"
import LogoLightMode from '../../public/LogoLightMode.png'
import LogoDarkMode from '../../public/LogoDarkMode.png'

export default function Signup() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirm: "",
    country: "",
    gender: "",
    acceptTerms: false,
    acceptUpdates: false
  })

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    }
    
  }, [])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    // Add your signup logic here
    setTimeout(() => setIsLoading(false), 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F4F5F7] dark:bg-[#1E1F21] p-4 md:p-8">
      <div className="w-full max-w-6xl grid lg:grid-cols-1 items-center">
        {/* Sign Up Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="bg-white dark:bg-[#2B2D30] rounded-2xl shadow-xl p-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-2 mb-8"
            >
              <div className="w-14 h-8 rounded-lg flex items-center justify-center">
                  <img
                    src={isDarkMode ? LogoDarkMode : LogoLightMode}
                    alt="Login Illustration"
                    className="w-full max-w-xl mx-auto">

                   </img>
              </div>
              <span className="text-xl font-semibold text-[#2E2E2E] dark:text-[#ECECEC]">
                FragranceFindr
              </span>
            </motion.div>

            {/* Welcome Text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-2 mb-8"
            >
              <h1 className="text-2xl font-bold text-[#2E2E2E] dark:text-[#ECECEC]">
                Create your Account
              </h1>
              <p className="text-[#707070] dark:text-[#A0A0A0]">
                Start your fragrance journey in seconds. Already have an account?{" "}
                <Link 
                  to="/login" 
                  className="text-[#4A90E2] hover:text-[#2563EB] transition-colors"
                >
                  Login here
                </Link>
              </p>
            </motion.div>

            <SignupForm/>
          </div>
        </motion.div>

        {/* Illustration */}
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hidden lg:block"
        >
          <img
            src="/signup-illustration.svg"
            alt="Signup Illustration"
            width={600}
            height={500}
            className="w-full max-w-xl mx-auto"
            // priority
          />
        </motion.div> */}
      </div>
    </div>
  )
}