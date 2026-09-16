import { useState } from 'react'
import FormErrors from '../components/FormErrors'
import { getPasswordReset, resetPassword } from '../lib/allauth'
import { Navigate, useNavigate, Link, useLoaderData, useLocation } from 'react-router-dom'
import { motion } from "framer-motion"
import { ArrowLeft, KeyRound, Eye, EyeOff, Lock, Loader2, CheckCircle } from "lucide-react"
import { Button } from "../components/MainButton"
import { Input } from "../components/Input"

export async function resetPasswordByLinkLoader ({ params }) {
  const key = params.key
  const resp = await getPasswordReset(key)
  return { resetKey: key, resetKeyResponse: resp }
}

export default function ResetPassword ({ resetKey, resetKeyResponse }) {
  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [password2Errors, setPassword2Errors] = useState([])
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const [isHoveringLink, setIsHoveringLink] = useState(false)

  const hasMinLength = password.length >= 12
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password)
  const passwordsMatch = password === confirmPassword && password !== ""

  const passwordStrength = [hasMinLength, hasUppercase, hasLowercase, hasNumber, hasSpecialChar].filter(Boolean).length

  const [response, setResponse] = useState({ fetching: false, content: null })

  const getStrengthLabel = () => {
    if (passwordStrength <= 2) return "Weak"
    if (passwordStrength <= 4) return "Medium"
    return "Strong"
  }

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500"
    if (passwordStrength <= 4) return "bg-yellow-500"
    return "bg-green-500"
  }

  // function submit () {
  //   if (password !== confirmPassword) {
  //     setPassword2Errors([{ param: 'confirmPassword', message: 'Password does not match.' }])
  //     return
  //   }
  //   setPassword2Errors([])
  //   setResponse({ ...response, fetching: true })
  //   resetPassword({ key: resetKey, password: password }).then((resp) => {
  //     setResponse((r) => { return { ...r, content: resp } })
  //   }).catch((e) => {
  //     console.error(e)
  //     window.alert(e)
  //   }).then(() => {
  //     setResponse((r) => { return { ...r, fetching: false } })
  //   })
  // }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    if (passwordStrength < 3) {
      setError("Password is too weak")
      return
    }
    setError("")
    setIsSubmitting(true)
    resetPassword({ key: resetKey, password: password }).then((resp) => {
      setResponse((r) => { return { ...r, content: resp } })
      setIsSuccess(true)
      console.log(resp?.status)
      if ([201, 401].includes(resp?.status)) {
        console.log('got to here')
        setTimeout(() => {
          navigate('/login') 
        }, 3000)
      }
    }).catch((e) => {
      console.error(e)
      window.alert(e)
      setError("Failed to reset password. Please try again.")
    }).then(() => {
      setIsSubmitting(false)
      setResponse((r) => { return { ...r, fetching: false } })
    })
  }

  // if ([200, 401].includes(response.content?.status)) {
  //   setTimeout(() => {
  //     return <Navigate to='/login' />
  //   }, 3000)
    
  // }

  let body
    if (resetKeyResponse.status !== 200) {
      body = <FormErrors param='key' errors={resetKeyResponse.errors} />
    } else if (response.content?.errors?.filter(e => e.param === 'key')) {
      body = <FormErrors param='key' errors={response.content?.errors} />
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-background dark:bg-dark-background p-4">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Decorative elements */}
        <motion.div
          className="absolute top-[20%] right-[10%] w-64 h-64 rounded-full bg-light-primary/5 dark:bg-dark-primary/5"
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
          className="absolute bottom-[20%] left-[10%] w-80 h-80 rounded-full bg-light-secondary/5 dark:bg-dark-secondary/5"
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-light-surface dark:bg-dark-surface rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, 0] }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2,
                }}
                className="w-16 h-16 rounded-full bg-light-primary/10 dark:bg-dark-primary/20 flex items-center justify-center"
              >
                <KeyRound className="w-8 h-8 text-light-primary dark:text-dark-primary" />
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}>
              <h1 className="text-2xl font-bold text-center text-light-text-primary dark:text-dark-text-primary mb-2">
                Reset Your Password
              </h1>
              <p className="text-light-text-secondary dark:text-dark-text-secondary text-center mb-6">
                Create a new password for your account
              </p>
            </motion.div>

            {!isSuccess ? (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-light-text-secondary dark:text-dark-text-secondary" />
                    </div>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10 pr-10 bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary"
                    />
                    <FormErrors param='password' errors={response.content?.errors} />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-light-text-secondary dark:text-dark-text-secondary" />
                      ) : (
                        <Eye className="h-5 w-5 text-light-text-secondary dark:text-dark-text-secondary" />
                      )}
                    </button>
                  </div>

                  {/* Password strength meter */}
                  {password && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-2 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                          Password strength: {getStrengthLabel()}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-light-border dark:bg-dark-border rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${getStrengthColor()}`}
                          initial={{ width: "0%" }}
                          animate={{ width: `${(passwordStrength / 5) * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <ul className="space-y-1 text-xs">
                        <li
                          className={`flex items-center ${hasMinLength ? "text-green-500" : "text-light-text-secondary dark:text-dark-text-secondary"}`}
                        >
                          <CheckCircle className={`h-3 w-3 mr-2 ${hasMinLength ? "opacity-100" : "opacity-50"}`} />
                          At least 12 characters
                        </li>
                        <li
                          className={`flex items-center ${hasUppercase ? "text-green-500" : "text-light-text-secondary dark:text-dark-text-secondary"}`}
                        >
                          <CheckCircle className={`h-3 w-3 mr-2 ${hasUppercase ? "opacity-100" : "opacity-50"}`} />
                          Uppercase letter
                        </li>
                        <li
                          className={`flex items-center ${hasNumber ? "text-green-500" : "text-light-text-secondary dark:text-dark-text-secondary"}`}
                        >
                          <CheckCircle className={`h-3 w-3 mr-2 ${hasNumber ? "opacity-100" : "opacity-50"}`} />
                          Number
                        </li>
                        <li
                          className={`flex items-center ${hasSpecialChar ? "text-green-500" : "text-light-text-secondary dark:text-dark-text-secondary"}`}
                        >
                          <CheckCircle className={`h-3 w-3 mr-2 ${hasSpecialChar ? "opacity-100" : "opacity-50"}`} />
                          Special character
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-light-text-secondary dark:text-dark-text-secondary" />
                    </div>
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className={`pl-10 pr-10 bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary ${
                        confirmPassword && !passwordsMatch ? "border-red-500 dark:border-red-500" : ""
                      }`}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-light-text-secondary dark:text-dark-text-secondary" />
                      ) : (
                        <Eye className="h-5 w-5 text-light-text-secondary dark:text-dark-text-secondary" />
                      )}
                    </button>
                  </div>

                  {confirmPassword && !passwordsMatch && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-500 mt-1">
                      Passwords do not match
                    </motion.p>
                  )}
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full bg-light-primary hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 text-white"
                    disabled={isSubmitting || !passwordsMatch || passwordStrength < 3}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Resetting...
                      </>
                    ) : (
                      "Reset Password"
                      
                    )}
                  </Button>
                  {body}
                </motion.div>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/10 dark:bg-green-500/20 rounded-lg p-6 text-center space-y-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto"
                >
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </motion.div>

                <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">
                  Password Reset Successful!
                </h3>

                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  Your password has been reset successfully. You will be redirected to the login page shortly.
                </p>

                <motion.div className="w-full bg-light-border dark:bg-dark-border h-1 rounded-full mt-4 overflow-hidden">
                  <motion.div
                    className="h-full bg-green-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3 }}
                  />
                </motion.div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-6 text-center"
            >
              <Link
                to="/login"
                className="inline-flex items-center text-light-primary dark:text-dark-primary hover:underline"
                onMouseEnter={() => setIsHoveringLink(true)}
                onMouseLeave={() => setIsHoveringLink(false)}
              >
                <motion.span
                  animate={{ x: isHoveringLink ? -4 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </motion.span>
                Remember your password? Back to login
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function ResetPasswordByLink () {
  const { resetKey, resetKeyResponse } = useLoaderData()
  return <ResetPassword resetKey={resetKey} resetKeyResponse={resetKeyResponse} />
}

export function ResetPasswordByCode () {
  const { state } = useLocation()
  if (!state || !state.resetKey || !state.resetKeyResponse) {
    return <Navigate to='/account/password/reset' />
  }
  return <ResetPassword resetKey={state.resetKey} resetKeyResponse={state.resetKeyResponse} />
}
