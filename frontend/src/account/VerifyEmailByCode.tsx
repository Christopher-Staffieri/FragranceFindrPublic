import React, { useEffect, useRef, useState } from 'react'
import FormErrors from '../components/FormErrors'
import {
  Link,
  Navigate
} from 'react-router-dom'
import { verifyEmail } from '../lib/allauth'
import Button from '../components/Button'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '../lib/utils'

export default function VerifyEmail () {
  const [code, setCode] = useState('')
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', ''])
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [timeLeft, setTimeLeft] = useState(180) // 5 minutes in seconds
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  const [response, setResponse] = useState({ fetching: false, content: null })

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleInput = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[value.length - 1]
    }

    const newCode = [...verificationCode]
    newCode[index] = value
    setVerificationCode(newCode)
    setCode(newCode.join(''))

    // Move to next input if value is entered
    if (value && index < 5) {
      inputs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = (e) => {
    console.log('hit email verify')
    console.log(code)
    e.preventDefault()
    setResponse({ ...response, fetching: true })
    verifyEmail(code).then((content) => {
      setStatus('success')
      setResponse((r) => { return { ...r, content } })
    }).catch((e) => {
      console.error(e)
      window.alert(e)
    }).then(() => {
      setResponse((r) => { return { ...r, fetching: false } })
    })
  }

  function submit () {
    setResponse({ ...response, fetching: true })
    verifyEmail(code).then((content) => {
      setResponse((r) => { return { ...r, content } })
    }).catch((e) => {
      console.error(e)
      window.alert(e)
    }).then(() => {
      setResponse((r) => { return { ...r, fetching: false } })
    })
  }

  if ([200, 401].includes(response.content?.status)) {
    return <Navigate to='/account/email' />
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F4F5F7] dark:bg-[#1E1F21] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-[#2B2D30] rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2 mb-8"
          >
            <div className="w-8 h-8 rounded-lg bg-[#4A90E2] flex items-center justify-center">
              <div className="w-3 h-3 border-2 border-white rounded-full" />
            </div>
            <span className="text-xl font-semibold text-[#2E2E2E] dark:text-[#ECECEC]">
              FragranceFindr
            </span>
          </motion.div>

          <AnimatePresence mode="wait">
            {status === 'idle' ? (
              <motion.div
                key="verification-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-2 mb-8">
                  <h1 className="text-2xl font-bold text-[#2E2E2E] dark:text-[#ECECEC]">
                    Confirm Email Address
                  </h1>
                  <FormErrors errors={response.content?.errors} />
                  <p className="text-[#707070] dark:text-[#A0A0A0]">
                    Please enter the verification code sent to your email.{' '}
                    <span className={`font-medium ${timeLeft < 60 ? 'text-[#F45B69]' : ''}`}>
                      ({formatTime(timeLeft)})
                    </span>
                  </p>
                </div>

                <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
                  <div className="space-y-2">
                    <label 
                      className="block text-sm font-medium text-[#2E2E2E] dark:text-[#ECECEC]"
                    >
                      Code
                    </label>
                    <div className="flex gap-2 justify-between">
                      {verificationCode.map((digit, index) => (
                        <motion.input
                          key={index}
                          ref={el => inputs.current[index] = el}
                          type="text"
                          inputMode="numeric"
                          pattern="(\d*[a-zA-Z]*)"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleInput(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          className="w-12 h-12 text-center text-lg font-semibold rounded-lg border border-[#E1E1E1] dark:border-[#393B3F] bg-white dark:bg-[#2B2D30] text-[#2E2E2E] dark:text-[#ECECEC] focus:outline-none focus:ring-2 focus:ring-[#4A90E2] transition-all"
                          required
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      disabled={response.fetching || verificationCode.some(digit => !digit)}
                      className="w-full py-2.5 rounded-lg bg-[#4A90E2] hover:bg-[#2563EB] text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {response.fetching ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        'Confirm'
                      )}
                    </motion.button>

                    <div className="flex flex-col items-center gap-4">
                      {/* <button
                        type="button"
                        onClick={handleResendCode}
                        disabled={timeLeft > 0}
                        className="text-sm text-[#4A90E2] hover:text-[#2563EB] disabled:text-[#707070] dark:disabled:text-[#A0A0A0] transition-colors"
                      >
                        Resend verification code
                      </button> */}

                      <Link 
                        to="/login"
                        className="text-sm text-[#707070] dark:text-[#A0A0A0] hover:text-[#2E2E2E] dark:hover:text-[#ECECEC] transition-colors flex items-center gap-1"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back to login
                      </Link>
                    </div>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="verification-result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="text-center space-y-4"
              >
                <div className={cn(
                  "w-16 h-16 rounded-full mx-auto flex items-center justify-center",
                  status === 'success' 
                    ? "bg-green-100 dark:bg-green-900/20" 
                    : "bg-red-100 dark:bg-red-900/20"
                )}>
                  {status === 'success' ? (
                    <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                  ) : (
                    <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <h2 className="text-xl font-semibold text-[#2E2E2E] dark:text-[#ECECEC]">
                  {status === 'success' ? 'Email Verified' : 'Verification Failed'}
                </h2>
                <p className="text-[#707070] dark:text-[#A0A0A0]">
                  {status === 'success' 
                    ? 'Your email has been successfully verified. You can now proceed to your account.'
                    : 'There was an error verifying your email. Please try again.'}
                </p>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  // onClick={() => status === 'success' ? window.location.href = '/account/dashboard' : setStatus('idle')}
                  className="w-full py-2.5 rounded-lg bg-[#4A90E2] hover:bg-[#2563EB] text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:ring-offset-2"
                >
                  {status === 'success' ? 'Go to Dashboard' : 'Try Again'}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}