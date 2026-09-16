import type React from "react"

import { useEffect, useState } from "react"
import { Eye, EyeOff, Mail, Lock, MessageSquare } from "lucide-react"
import { useConfig } from "../auth"
import { login } from "../lib/allauth"
import { Link, useNavigate } from "react-router-dom"
import WebAuthnLoginButton from "../mfa/WebAuthnLoginButton"
import ProviderList from "../socialaccount/ProviderList"
import LogoLightMode from '../../public/LogoLightMode.png'
import LogoDarkMode from '../../public/LogoDarkMode.png'

export default function Login() {
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)
    const [response, setResponse] = useState({ fetching: false, content: null })
    const config = useConfig()
    const navigate = useNavigate()

    const [isDarkMode, setIsDarkMode] = useState(false)
    
        useEffect(() => {
            const savedTheme = localStorage.getItem('theme')
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
            if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
              setIsDarkMode(true)
              document.documentElement.classList.add('dark')
            }
            
          }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
                setResponse({ ...response, fetching: true })
                setIsLoading(true)
                console.log('ran here')
                login({ email, password }).then((content) => {
                  setResponse((r) => { return { ...r, content } })
                }).catch((e) => {
                  console.error(e)
                  window.alert(e)
                }).then(() => {
                    setTimeout(() => setIsLoading(false), 2000)
                    console.log('got hereee')
                    setResponse((r) => { return { ...r, fetching: false } })
                })
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-background dark:bg-dark-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="mb-6 flex justify-center">
            {/* Logo placeholder - user can customize */}
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br flex items-center justify-center shadow-lg">
              {/* <span className="text-white font-bold text-xl">F</span> */}
              <img
                    src={isDarkMode ? LogoDarkMode : LogoLightMode}
                    alt="Login Illustration"
                    className="flex items-center">

                   </img>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2">Welcome back</h1>
          <p className="text-light-text-secondary dark:text-dark-text-secondary">Sign in to your account to continue</p>
        </div>

        {/* Login Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-light-surface dark:bg-dark-surface rounded-2xl shadow-lg p-8 space-y-6 animate-slide-up"
        >
          {/* Email Field */}
          <div className="space-y-3">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
            >
              Email address
            </label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary group-focus-within:text-light-primary dark:group-focus-within:text-blue-500 transition-colors" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-light-text-primary dark:text-dark-text-primary placeholder-light-text-secondary dark:placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
              >
                Password
              </label>
              <Link
                to="/account/password/reset"
                className="text-sm text-light-primary dark:text-blue-500 hover:underline transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary group-focus-within:text-light-primary dark:group-focus-within:text-blue-500 transition-colors" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-light-text-primary dark:text-dark-text-primary placeholder-light-text-secondary dark:placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-light-primary dark:text-blue-500 focus:ring-2 focus:ring-light-primary dark:focus:ring-blue-500 cursor-pointer transition-all"
            />
            <label
              htmlFor="remember"
              className="ml-2.5 text-sm text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary cursor-pointer transition-colors"
            >
              Remember me
            </label>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-light-primary to-blue-600 dark:from-blue-500 dark:to-blue-700 text-white font-semibold py-2.5 rounded-lg hover:shadow-lg hover:shadow-light-primary/30 dark:hover:shadow-blue-500/30 transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Sign in
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-light-border dark:border-dark-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-light-surface dark:bg-dark-surface text-light-text-secondary dark:text-dark-text-secondary">
                or continue with
              </span>
            </div>
          </div>

          {/* OAuth Buttons */}
          {/* <button
            type="button"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-light-text-primary dark:text-dark-text-primary hover:bg-light-primary/5 dark:hover:bg-blue-500/10 transition-colors duration-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4A90E2"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#F45B69"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#4A90E2"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#F45B69"
              />
            </svg>
            <span className="font-medium">Google</span>
          </button> */}

          
          <ProviderList callbackURL='/account/provider/callback' />
                   
          {config.data.account.login_by_code_enabled
            ?
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-light-text-primary dark:text-dark-text-primary hover:bg-light-primary/5 dark:hover:bg-blue-500/10 transition-colors duration-200"
                onClick={() => navigate('/account/login/code')}
              >
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">Mail me a sign-in code</span>
          </button>
            : null
          
          }
          
          <WebAuthnLoginButton>Sign in with a passkey</WebAuthnLoginButton>

          {/* Sign Up Link */}
          <p className="text-center text-light-text-secondary dark:text-dark-text-secondary">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-light-primary dark:text-blue-500 hover:underline transition-colors"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slideUp 0.6s ease-out 0.1s backwards;
        }
      `}</style>
    </div>
  )
}
