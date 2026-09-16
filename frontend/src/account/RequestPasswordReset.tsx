import { useState } from 'react'
import FormErrors from '../components/FormErrors'
import { requestPasswordReset, Flows } from '../lib/allauth'
import { Link, Navigate } from 'react-router-dom'
import { motion } from "framer-motion"
import { ArrowLeft, KeyRound, Mail, Loader2 } from "lucide-react"
import { Button } from "../components/MainButton"
import { Input } from "../components/Input"
// import Button from '../components/Button'

export default function RequestPasswordReset () {
  const [email, setEmail] = useState('')
  const [response, setResponse] = useState({ fetching: false, content: null })
  const [show, setShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isHoveringLink, setIsHoveringLink] = useState(false)

  function submit () {
    setResponse({ ...response, fetching: true })
    // if (!email) return
    setIsSubmitting(true)
    requestPasswordReset(email).then((content) => {
      setResponse((r) => { return { ...r, content } })
      setTimeout(() => {
        setIsSubmitting(false)
        setIsSubmitted(true)
      }, 800)
      
    }).catch((e) => {
      console.error(e)
      window.alert(e)
    }).then(() => {
      setResponse((r) => { return { ...r, fetching: false } })
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setResponse({ ...response, fetching: true })
    // if (!email) return
    setIsSubmitting(true)
    requestPasswordReset(email).then((content) => {
      setResponse((r) => { return { ...r, content } })
      setIsSubmitting(false)
      setIsSubmitted(true)
    }).catch((e) => {
      console.error(e)
      window.alert(e)
    }).then(() => {
      setResponse((r) => { return { ...r, fetching: false } })
    })
  }

 

  // if (response.content?.status === 200) {
  //   return (
  //     <PasswordResetPopup/>
  //   )
  // }
  if (response.content?.status === 401) {
    return <Navigate to='/account/password/reset/confirm' />
  }
  // if (response.content?.status === 200) {
  //   return (
  //     <div>
  //       <h1>Reset Password</h1>
  //       <p>Password reset sent.</p>
  //     </div>
  //   )
  // }

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
                Reset Password
              </h1>
              <p className="text-light-text-secondary dark:text-dark-text-secondary text-center mb-6">
                Enter your email and we'll send you instructions to reset your password
              </p>
            </motion.div>

            {!isSubmitted ? (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-light-text-secondary dark:text-dark-text-secondary" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary"
                    />
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full bg-light-primary hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                </motion.div>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-light-primary/10 dark:bg-dark-primary/20 rounded-lg p-4 text-center"
              >
                <p className="text-light-text-primary dark:text-dark-text-primary">
                  Check your email for a link to reset your password. If it doesn't appear within a few minutes, check
                  your spam folder.
                </p>
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
