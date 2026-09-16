import { useState } from 'react'
import FormErrors from '../components/FormErrors'
import { requestLoginCode } from '../lib/allauth'
import { Link, Navigate } from 'react-router-dom'
import Button from '../components/Button'
import { motion } from 'framer-motion'
import { Loader2, Mail, ArrowLeft } from 'lucide-react'

export default function RequestLoginCode () {
  const [email, setEmail] = useState('')
  const [response, setResponse] = useState({ fetching: false, content: null }) 


  const submit = (event) => {
    event.preventDefault()
    setResponse({ ...response, fetching: true })
    requestLoginCode(email).then((content) => {
      setResponse((r) => { return { ...r, content } })
      // console.log(response)
    }).catch((e) => {
      console.error(e)
      console.log(e)
      window.alert(e)
    }).then(() => {
      setResponse((r) => { return { ...r, fetching: false } })
    })
  }
  // function submit() {
  //   setResponse({ ...response, fetching: true })
  //   requestLoginCode(email).then((content) => {
  //     setResponse((r) => { return { ...r, content } })
  //     // console.log(response)
  //   }).catch((e) => {
  //     console.error(e)
  //     console.log(e)
  //     window.alert(e)
  //   }).then(() => {
  //     setResponse((r) => { return { ...r, fetching: false } })
  //   })
  // }
  
  if (response.content?.status === 401) {
    // console.log(response.content)
    return <Navigate to='/account/login/code/confirm' />
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="space-y-2 mb-8">
              <h1 className="text-2xl font-bold text-[#2E2E2E] dark:text-[#ECECEC]">
                Mail me a sign-in code
              </h1>
              <p className="text-[#707070] dark:text-[#A0A0A0]">
                You will receive an email containing a special code for a password-free sign-in.
              </p>

              <FormErrors errors={response.content?.errors} />
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
                  htmlFor="email" 
                  className="block text-sm font-medium text-[#2E2E2E] dark:text-[#ECECEC]"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-[#E1E1E1] dark:border-[#393B3F] bg-white dark:bg-[#2B2D30] text-[#2E2E2E] dark:text-[#ECECEC] placeholder-[#707070] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4A90E2] transition-all"
                  placeholder="name@company.com"
                  required
                />
                <FormErrors param='email' errors={response.content?.errors} />
              </div>

              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={response.fetching}
                  className="w-full py-2.5 rounded-lg bg-[#4A90E2] hover:bg-[#2563EB] text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {response.fetching ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <Mail className="h-5 w-5" />
                      Request Code
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
      </div>
    </motion.div>
  </div>
  )
}
