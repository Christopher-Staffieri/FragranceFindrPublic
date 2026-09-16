import { useEffect, useRef, useState } from 'react'
import FormErrors from '../components/FormErrors'
import { mfaReauthenticate } from '../lib/allauth'
import ReauthenticateFlow from '../account/ReauthenticateFlow'
import { Button } from "../components/MainButton"
import { Input } from "../components/Input"
import { Label } from "../components/Label"
import { Alert, AlertDescription } from "../components/common/alert"
import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle, ArrowRight, CheckCircle, Fingerprint, Hash, Lock, RefreshCw } from 'lucide-react'


export default function ReauthenticateCode (pageMethod) {
  const [code, setCode] = useState('')
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', ''])
  const [response, setResponse] = useState({ fetching: false, content: null })
  const inputs = useRef<(HTMLInputElement | null)[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState("")
  console.log(pageMethod)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleCodeSubmission = async () => {
    if (pageMethod.pageMethod === 'mfa_reauthenticate:recovery_codes'){
      if (!code) {
        setError("Please enter a recovery code")
        return
      }
    }else{
      if (!code) {
        setError("Please enter a authenticator code")
        return
      }
    }

    setIsSubmitting(true)
    setError("")
    setResponse({ ...response, fetching: true })

    try {
      console.log('got here')
      const content = await mfaReauthenticate(code)
      if (content?.errors){
        setResponse((r) => { return { ...r, content } })
        throw 'There was an error proccesing the request'
      }
      setResponse((r) => { return { ...r, content } })
      setIsSubmitting(false)
      setIsSuccess(true)
      setTimeout(() => {
        setResponse((r) => { return { ...r, fetching: false } })
      }, 3000)
    } catch (error) {
      setError("Authentication failed. Please try again.")
      setIsSubmitting(false)
      setVerificationCode(['', '', '', '', '', ''])
      setCode('')
      console.error(error)
    }

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


  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
    pulse: {
      scale: [1, 1.05, 1],
      boxShadow: [
        "0 0 0 0 rgba(244, 91, 105, 0)",
        "0 0 0 10px rgba(244, 91, 105, 0.1)",
        "0 0 0 0 rgba(244, 91, 105, 0)",
      ],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      },
    },
  }
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-light-background dark:bg-dark-background p-4">
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 rounded-full bg-light-secondary/5 dark:bg-dark-secondary/5"
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
        className="absolute bottom-20 left-40 w-80 h-80 rounded-full bg-light-primary/5 dark:bg-dark-primary/5"
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
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <div className="relative bg-light-surface dark:bg-dark-surface rounded-xl shadow-lg overflow-hidden border border-light-border dark:border-dark-border">
        {/* Header with gradient accent */}
        <div className="h-2 bg-gradient-to-r from-light-secondary to-light-secondary/70 dark:from-dark-secondary dark:to-dark-secondary/70" />

        <div className="p-8">
          <div className="flex justify-center mb-6">
            <motion.div
              initial="hidden"
              animate={["visible", "pulse"]}
              variants={iconVariants}
              className="w-16 h-16 rounded-full bg-light-secondary/10 dark:bg-dark-secondary/20 flex items-center justify-center"
            >
              <RefreshCw className="w-8 h-8 text-light-secondary dark:text-dark-secondary" />
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div key="auth-form" initial="hidden" animate="visible" exit="exit" variants={containerVariants}>
                <motion.h1
                  variants={itemVariants}
                  className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2 text-center"
                >
                {pageMethod.pageMethod === "mfa_reauthenticate:recovery_codes"
                  ? 'Recovery Authentication'
                  : 'TOTP Authentication'
                }
                </motion.h1>
                <motion.p
                  variants={itemVariants}
                  className="text-light-text-secondary dark:text-dark-text-secondary mb-6 text-center"
                >
                  
                  {pageMethod.pageMethod === "mfa_reauthenticate:recovery_codes"
                    ? 'Please enter your recovery code to continue'
                    : 'Please enter your authenticator code to continue'
                  }
                </motion.p>

                <AnimatePresence mode="wait">
                  
                    <motion.div
                      key="recovery-method"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={containerVariants}
                      className="space-y-6"
                    >
                      <motion.div variants={itemVariants} className="space-y-2">
                        {/* <FormErrors errors={response.content?.errors} /> */}
                        <Label
                          htmlFor="recovery-code"
                          className="text-light-text-primary dark:text-dark-text-primary"
                        >
                          
                          {pageMethod.pageMethod === "mfa_reauthenticate:recovery_codes"
                            ? 'Enter your recovery code:'
                            : 'Enter your authenticator code:'
                          }
                        </Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            {pageMethod.pageMethod === "mfa_reauthenticate:recovery_codes"
                              ? <Hash className="h-5 w-5 text-light-text-secondary dark:text-dark-text-secondary" />
                              : null
                            
                            }
                          </div>
                          {pageMethod.pageMethod === "mfa_reauthenticate:recovery_codes"
                            ? <Input
                                id={"recovery-code"}
                                ref={inputRef}
                                type={"text"}
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="pl-10 bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border font-mono tracking-wider"
                                placeholder={"Enter your recovery code"}
                            
                          />
                            : <div className="flex gap-2 justify-between">
                            
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
                          }
                          
                        </div>
                        <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                          {pageMethod.pageMethod === "mfa_reauthenticate:recovery_codes"
                            ? 'Enter the recovery code you saved when setting up two-factor authentication'
                            : 'Enter the code generated by your authentication app to verify your identity. This code is time-sensitive and will expire shortly, so make sure to enter it before it becomes invalid.'
                          }
                          
                        </p>
                      </motion.div>
                    </motion.div>
                </AnimatePresence>
                
                
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 rounded-md p-3 text-sm "
                  >
                    <FormErrors errors={response.content?.errors} />
                    
                  </motion.div>
             
                

                <motion.div variants={itemVariants} className="mt-6">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="button"
                      onClick={handleCodeSubmission}
                      className='w-full h-12 text-white font-medium text-lg shadow-md bg-light-secondary hover:bg-light-secondary/90 dark:bg-dark-secondary dark:hover:bg-dark-secondary/90' 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <motion.div
                            className="h-5 w-5 rounded-full border-2 border-t-transparent border-white"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          />
                          <span className="ml-2">Verifying...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          {pageMethod === "recovery" ? (
                            <RefreshCw className="mr-2 h-5 w-5" />
                          ) : pageMethod === "password" ? (
                              <Lock className="mr-2 h-5 w-5" />
                          ) : (
                            <Fingerprint className="mr-2 h-5 w-5" />
                          )}
                          <span>
                            Confirm{" "}
                            {pageMethod.pageMethod === "mfa_reauthenticate:recovery_codes"
                              ? "Recovery Code"
                              : "Authenticator Code"
                            }
                          </span>
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </motion.div>

                <motion.div variants={itemVariants} className="mt-4 text-center">
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-light-text-secondary dark:text-dark-text-secondary hover:text-light-secondary dark:hover:text-dark-secondary"
                    // onClick={() => router.push("/dashboard/account?tab=security")}
                  >
                    Cancel
                  </Button>
                </motion.div>

                {/* Alternative Options */}
                <ReauthenticateFlow pageMethod={pageMethod.pageMethod}/>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4 text-center"
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
                  Authentication Successful
                </h3>

                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  Redirecting you to continue the process...
                </p>

                <motion.div className="w-full bg-light-border dark:bg-dark-border h-1 rounded-full mt-4 overflow-hidden">
                  <motion.div
                    className="h-full bg-green-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5 }}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Alert className="mt-4 bg-light-secondary/5 dark:bg-dark-secondary/10 border-light-secondary/20 dark:border-dark-secondary/20">
        <div className="flex items-start gap-2">
          <RefreshCw className="h-4 w-4 text-light-secondary dark:text-dark-secondary mt-0.5" />
          {pageMethod.pageMethod === "mfa_reauthenticate:recovery_codes"
            ? <AlertDescription className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                Recovery codes are single-use backup codes that can be used to access your account if you lose access to
                your primary authentication method. Each code can only be used once.
              </AlertDescription>
            : <AlertDescription className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                TOTP authentication provides an additional layer of security by generating time-sensitive codes for account access. 
                Each code is valid only for a short period and can be used only once. 
                Ensure that you have access to your authentication app to generate the code when prompted.
              </AlertDescription>
          }
          
        </div>
      </Alert>
    </motion.div>
  </div>
  )
}