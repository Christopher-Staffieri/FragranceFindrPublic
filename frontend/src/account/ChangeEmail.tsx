import { useState, useEffect } from 'react'
import * as allauth from '../lib/allauth'
import FormErrors from '../components/FormErrors'
import { useConfig } from '../auth/hooks'
import { Navigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { Input } from '../components/Input'
import { Label } from '../components/Label'
import { Badge } from '../components/database/perfumeDetails/badge'
import { Button } from '../components/MainButton'

export default function ChangeEmail () {
  const config = useConfig()
  const [email, setEmail] = useState('')
  const [emailAddresses, setEmailAddresses] = useState([])
  const [isEditingEmail, setIsEditingEmail] = useState(false)
  const [newEmail, setNewEmail] = useState("")
  const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })
  const [redirectToVerification, setRedirectToVerification] = useState(false)



  useEffect(() => {
    setResponse((r) => { return { ...r, fetching: true } })
    allauth.getEmailAddresses().then((resp) => {
      if (resp.status === 200) {
        setEmailAddresses(resp.data)
      }
    }).then(() => {
      setResponse((r) => { return { ...r, fetching: false } })
    })
  }, [])

  function requestRedirectToVerification () {
    if (config.data.account.email_verification_by_code_enabled) {
      setRedirectToVerification(true)
    }
  }

   // const handleSaveEmail = () => {
  //   if (newEmail) {
  //     setEmail(newEmail)
  //     setNewEmail("")
  //   }
  //   setIsEditingEmail(false)
  // }

  const changeEmail = async () => {
    setResponse({ ...response, fetching: true })
    allauth.addEmail(newEmail).then((resp) => {
      setResponse((r) => { return { ...r, content: resp } })
      if (resp.status === 200) {
        setEmailAddresses(resp.data)
        setNewEmail('')
        requestRedirectToVerification()
      }
      setIsEditingEmail(false)
    }).catch((e) => {
      console.error(e)
      window.alert(e)
    }).then(() => {
      setResponse((r) => { return { ...r, fetching: false } })
    })
  }

  function requestEmailVerification (email) {
    setResponse({ ...response, fetching: true })
    allauth.requestEmailVerification(email).then((resp) => {
      if (resp.status === 200) {
        requestRedirectToVerification()
      }
    }).catch((e) => {
      console.error(e)
      window.alert(e)
    }).then(() => {
      setResponse((r) => { return { ...r, fetching: false } })
    })
  }

  function deleteEmail (email) {
    setResponse({ ...response, fetching: true })
    allauth.deleteEmail(email).then((resp) => {
      setResponse((r) => { return { ...r, content: resp } })
      if (resp.status === 200) {
        setEmailAddresses(resp.data)
      }
    }).catch((e) => {
      console.error(e)
      window.alert(e)
    }).then(() => {
      setResponse((r) => { return { ...r, fetching: false } })
    })
  }

  function markAsPrimary (email) {
    setResponse({ ...response, fetching: true })
    allauth.markEmailAsPrimary(email).then((resp) => {
      setResponse((r) => { return { ...r, content: resp } })
      if (resp.status === 200) {
        setEmailAddresses(resp.data)
      }
    }).catch((e) => {
      console.error(e)
      window.alert(e)
    }).then(() => {
      setResponse((r) => { return { ...r, fetching: false } })
    })
  }

  if (redirectToVerification) {
    return <Navigate to='/account/verify-email' />
  }

  console.log(emailAddresses)

  return(
    <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <Label htmlFor="email" className="text-base font-medium">
                        Email Address
                      </Label>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">
                        Your primary email address for account notifications
                      </p>
                    </div>
                    {!isEditingEmail && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsEditingEmail(true)}
                        className="self-start sm:self-center text-light-primary dark:text-dark-primary"
                      >
                        Change Email
                      </Button>
                    )}
                  </div>

                  <AnimatePresence mode="wait">
                    {!isEditingEmail ? (
                      <motion.div
                        key="current-email"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative"
                      >
                        <div className="flex items-center gap-2 p-3 rounded-md bg-light-background dark:bg-dark-background">
                          <Mail className="h-5 w-5 text-light-text-secondary dark:text-dark-text-secondary" />
                          <span className="text-light-text-primary dark:text-dark-text-primary">{emailAddresses[0]?.email}</span>
                          
                          <Badge variant="outline" className="ml-2">
                            Primary
                          </Badge>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="edit-email"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter new email address"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                          onClick={changeEmail} 
                          disabled={!newEmail}
                          
                          >
                            Save Changes
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => {
                              setIsEditingEmail(false)
                              setNewEmail("")
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
  )
  
}
