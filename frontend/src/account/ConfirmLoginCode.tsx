import { useEffect, useRef, useState } from 'react'
import FormErrors from '../components/FormErrors'
import { confirmLoginCode, Flows } from '../lib/allauth'
import { Link, Navigate } from 'react-router-dom'
import Button from '../components/Button'
import { useAuthStatus } from '../auth'
import { motion } from 'framer-motion'
import { Loader2, KeyRound, ArrowLeft, Check } from 'lucide-react'

export default function ConfirmLoginCode () {
  const [, authInfo] = useAuthStatus()
  const [code, setCode] = useState('')
  const [displayCode, setDisplayCode] = useState(['', '', '', '', '', ''])
  const [response, setResponse] = useState({ fetching: false, content: null })

  const inputs = useRef<(HTMLInputElement | null)[]>([])
  const [isSuccess, setIsSuccess] = useState(false)
  const [timeLeft, setTimeLeft] = useState(180) // 5 minutes in seconds


  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }else{
      <Navigate to='/account/login/code'/>
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

    const newCode = [...displayCode]
    newCode[index] = value
    setDisplayCode(newCode)
    console.log(displayCode)
    
    setCode(newCode.join(''))
    console.log(code)
    // add value to the code string
    

    // Move to next input if value is entered
    if (value && index < 5) {
      inputs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !displayCode[index] && index > 0) {
      inputs.current[index - 1]?.focus()
    }
  }

  const submit = async (event) => {
    event.preventDefault()
    setResponse({ ...response, fetching: true })
    confirmLoginCode(code).then((content) => {
      if (content.status === 400){
        setIsSuccess(false)
        console.log('sert false')
      }else{
        setIsSuccess(true)
        console.log(content)
      }
      
      setResponse((r) => { return { ...r, content } })
    // Delay in milliseconds
      
      
    }).catch((e) => {
      console.error(e)
      window.alert(e)
      
    }).then(() => {
      setResponse((r) => { return { ...r, fetching: false } })
    })
  }
  // function submit () {
  //   setResponse({ ...response, fetching: true })
  //   confirmLoginCode(code).then((content) => {
  //     setResponse((r) => { return { ...r, content } })
  //   }).catch((e) => {
  //     console.error(e)
  //     window.alert(e)
  //   }).then(() => {
  //     setIsSuccess(true)
  //     setResponse((r) => { return { ...r, fetching: false } })
  //   })
  // }

  if (response.content?.status === 409 || authInfo.pendingFlow?.id !== Flows.LOGIN_BY_CODE) {
    
    return <Navigate to='/account/login/code' />
 
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

          {!isSuccess ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="space-y-2 mb-8">
                <h1 className="text-2xl font-bold text-[#2E2E2E] dark:text-[#ECECEC]">
                  Enter Sign-In Code
                </h1>
                {timeLeft > 0 
                  ? <>
                  <p className="text-[#707070] dark:text-[#A0A0A0]">
                    The code expires shortly, so please enter it soon.{' '}
                    <span className={`font-medium ${timeLeft < 60 ? 'text-[#F45B69]' : ''}`}>
                      ({formatTime(timeLeft)})
                    </span>
                  </p>
                  <FormErrors errors={response.content?.errors} />
                  </>
                : 
                  <>
                    {/* <Link  to='/account/login/code'>
                      <button
                        type="button"
                        className="text-[#707070] dark:text-[#A0A0A0] hover:text-[#4A90E2] dark:hover:text-[#4A90E2] transition-colors"
                      >
                        The code has expired. Please click the text to receive another code.
                        <span className={`font-medium ${timeLeft < 60 ? 'text-[#F45B69]' : ''}`}>
                          ({formatTime(timeLeft)})
                        </span>
                      </button>
                      <FormErrors errors={response.content?.errors} />

                    </Link> */}
                    <Link to='/account/login/code'>
                      <p className="text-[#707070] dark:text-[#A0A0A0] hover:text-[#4A90E2] dark:hover:text-[#4A90E2]">
                      The code has expired. Please click here to receive another code.{' '}
                      <span className={`font-medium ${timeLeft < 60 ? 'text-[#F45B69]' : ''}`}>
                        ({formatTime(timeLeft)})
                      </span>
                      </p>
                    <FormErrors errors={response.content?.errors} />
                  </Link>
                    {/* <p className="text-[#707070] dark:text-[#A0A0A0]">
                    The code has expired. Please get a new one <Link to='/account/login/code'>here</Link>{' '}
                    <span className={`font-medium ${timeLeft < 60 ? 'text-[#F45B69]' : ''}`}>
                      ({formatTime(timeLeft)})
                    </span>
                  </p>
                  <FormErrors errors={response.content?.errors} /> */}
                  </>
                
                }
                
              </div>

              <motion.form
                onSubmit={submit}
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="space-y-2">
                  <label 
                    className="block text-sm font-medium text-[#2E2E2E] dark:text-[#ECECEC]"
                  >
                    Code
                  </label>
                  <div className="flex gap-2 justify-between">
                    {displayCode.map((digit, index) => (
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
                  <FormErrors errors={response.content?.errors} />
                </div>

                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={response.fetching || displayCode.some(digit => !digit)}
                    className="w-full py-2.5 rounded-lg bg-[#4A90E2] hover:bg-[#2563EB] text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {response.fetching ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        <KeyRound className="h-5 w-5" />
                        Sign In
                      </>
                    )}
                  </motion.button>

                  <Link 
                    to="/login"
                    className="block w-full text-center text-sm text-[#707070] dark:text-[#A0A0A0] hover:text-[#4A90E2] dark:hover:text-[#4A90E2] transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4 inline-block mr-1" />
                    Back to login
                  </Link>
                </div>
              </motion.form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-xl font-semibold text-[#2E2E2E] dark:text-[#ECECEC]">
                Successfully verified
              </h2>
              <p className="text-[#707070] dark:text-[#A0A0A0]">
                You will be redirected to your account shortly.
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}