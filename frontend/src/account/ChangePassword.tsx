import { useState } from 'react'
import FormErrors from '../components/FormErrors'
import { changePassword } from '../lib/allauth'
import { Navigate } from 'react-router-dom'
import { useUser } from '../auth'
import { motion, AnimatePresence } from "framer-motion"
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Shield,
  User,
  Bell,
  LogOut,
  Smartphone,
  ExternalLink,
  Check,
} from "lucide-react"
import { Button } from "../components/MainButton"
import { Input } from "../components/Input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/database/perfumeDetails/card"
import { Label } from "../components/Label"
import PasswordChangeSuccessPopup from '../components/common/PasswordChangedPopup'

export default function ChangePassword () {
  const hasCurrentPassword = useUser().has_usable_password
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [newPassword2Errors, setNewPassword2Errors] = useState([])
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [response, setResponse] = useState({ fetching: false, content: null })
  const [showPassword, setShowPassword] = useState(false)
  const [passwordChanged, setPasswordChanged] = useState(false)
  const [errors, setErrors] = useState('')

  // function submit () {
  //   if (newPassword !== newPassword2) {
  //     setNewPassword2Errors([{ param: 'new_password2', message: 'Password does not match.' }])
  //     return
  //   }
  //   setNewPassword2Errors([])
  //   setResponse({ ...response, fetching: true })
  //   changePassword({ current_password: currentPassword, new_password: newPassword }).then((resp) => {
  //     setResponse((r) => { return { ...r, content: resp } })
  //   }).catch((e) => {
  //     console.error(e)
  //     window.alert(e)
  //   }).then(() => {
  //     setResponse((r) => { return { ...r, fetching: false } })
  //   })
  // }

  // const handleSavePassword = () => {
  //   // In a real app, you would call your API here
  //   setIsChangingPassword(false)
  //   setCurrentPassword("")
  //   setNewPassword("")
  //   setConfirmPassword("")
  // }

  // if ([201, 401].includes(resp?.status)) {
  //   console.log('got to here')
  //   setTimeout(() => {
  //     navigate('/login') 
  //   }, 3000)
  // }

  // (
  //             <motion.div
  //               initial={{ opacity: 0, y: 10 }}
  //               animate={{ opacity: 1, y: 0 }}
  //               transition={{ duration: 0.5 }}
  //               className="text-center space-y-4"
  //             >
  //               <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-6">
  //                 <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
  //               </div>
  //               <h2 className="text-xl font-semibold text-[#2E2E2E] dark:text-[#ECECEC]">
  //                 Successfully verified
  //               </h2>
  //               <p className="text-[#707070] dark:text-[#A0A0A0]">
  //                 You will be redirected to your account shortly.
  //               </p>
  //             </motion.div>

  const submitPasswordChange = async () => {
    if (newPassword !== confirmNewPassword) {
      setNewPassword2Errors([{ param: 'new_password2', message: 'Password does not match.' }])
      return
    }
    setNewPassword2Errors([])
    setResponse({ ...response, fetching: true })
    setResponse({ ...response, fetching: true })
    changePassword({ current_password: currentPassword, new_password: newPassword }).then((resp) => {
      setResponse((r) => { return { ...r, content: resp } })
      console.log(resp)
      if (resp?.status === 200){
        setIsChangingPassword(false)
        console.log('got to here')
        setTimeout(() => {
          setPasswordChanged(false)
        }, 5000)
      }else{
        if (resp.errors[0].code === "enter_current_password"){
          setErrors('Current password is incorrect please try again.')
        }
      }
    }).catch((e) => {
      console.error(e)
      window.alert(e)
    }).then(() => {
      setResponse((r) => { return { ...r, fetching: false } })
      
    })
  }

  const hasMinLength = newPassword.length >= 8
  const hasUppercase = /[A-Z]/.test(newPassword)
  const hasLowercase = /[a-z]/.test(newPassword)
  const hasNumber = /[0-9]/.test(newPassword)
  const hasSpecialChar = /[^A-Za-z0-9]/.test(newPassword)
  const passwordsMatch = newPassword === confirmNewPassword && newPassword !== ""

  const passwordStrength = [hasMinLength, hasUppercase, hasLowercase, hasNumber, hasSpecialChar].filter(Boolean).length

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

  

  

  return(
    <>
      <Card>
          <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-light-primary dark:text-dark-primary" />
                  Password
                </CardTitle>
                <CardDescription>Update your password to keep your account secure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <AnimatePresence mode="wait">
                  {!isChangingPassword ? (
                    <motion.div
                      key="password-summary"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center justify-between p-3 rounded-md bg-light-background dark:bg-dark-background">
                        <div className="flex items-center gap-2">
                          <Lock className="h-5 w-5 text-light-text-secondary dark:text-dark-text-secondary" />
                          <span className="text-light-text-primary dark:text-dark-text-primary">••••••••</span>
                        </div>
                        <Button
                          variant="ghost"
                          onClick={() => setIsChangingPassword(true)}
                          className="text-light-primary dark:text-dark-primary"
                        >
                          Change Password
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="password-form"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      {/* Current Password */}
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary" />
                          <Input
                            id="current-password"
                            type={showPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="pl-10 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
                              <li
                                className={`flex items-center ${!errors ? "text-green-500" : "text-light-text-secondary dark:text-dark-text-secondary"}`}
                              >
                                <CheckCircle
                                  className={`h-3 w-3 mr-2 ${!errors ? "opacity-100" : "opacity-50"}`}
                                />
                                {errors}
                              </li>
                              
                            </ul>
                      </div>

                      {/* New Password */}
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary" />
                          <Input
                            id="new-password"
                            type={showPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="pl-10 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>

                        {/* Password strength meter */}
                        {newPassword && (
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
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
                              <li
                                className={`flex items-center ${hasMinLength ? "text-green-500" : "text-light-text-secondary dark:text-dark-text-secondary"}`}
                              >
                                <CheckCircle
                                  className={`h-3 w-3 mr-2 ${hasMinLength ? "opacity-100" : "opacity-50"}`}
                                />
                                At least 8 characters
                              </li>
                              <li
                                className={`flex items-center ${hasUppercase ? "text-green-500" : "text-light-text-secondary dark:text-dark-text-secondary"}`}
                              >
                                <CheckCircle
                                  className={`h-3 w-3 mr-2 ${hasUppercase ? "opacity-100" : "opacity-50"}`}
                                />
                                Uppercase letter
                              </li>
                              <li
                                className={`flex items-center ${hasLowercase ? "text-green-500" : "text-light-text-secondary dark:text-dark-text-secondary"}`}
                              >
                                <CheckCircle
                                  className={`h-3 w-3 mr-2 ${hasLowercase ? "opacity-100" : "opacity-50"}`}
                                />
                                Lowercase letter
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
                                <CheckCircle
                                  className={`h-3 w-3 mr-2 ${hasSpecialChar ? "opacity-100" : "opacity-50"}`}
                                />
                                Special character
                              </li>
                            </ul>
                          </motion.div>
                        )}
                      </div>

                      {/* Confirm Password */}
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary" />
                          <Input
                            id="confirm-password"
                            type={showPassword ? "text" : "password"}
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            className={`pl-10 pr-10 ${
                              confirmNewPassword && !passwordsMatch ? "border-red-500 dark:border-red-500" : ""
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                        {confirmNewPassword && !passwordsMatch && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs text-red-500 mt-1"
                          >
                            Passwords do not match
                          </motion.p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <Button
                          // onClick={handleSavePassword}
                          onClick={submitPasswordChange}
                          disabled={
                            !currentPassword ||
                            !newPassword ||
                            !confirmNewPassword ||
                            !passwordsMatch ||
                            passwordStrength < 3
                          }
                        >
                          Update Password
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setPasswordChanged(false)
                            setIsChangingPassword(false)
                            setCurrentPassword("")
                            setNewPassword("")
                            setConfirmNewPassword("")
                          }}
                        >
                          Cancel
                        </Button>
                        <AnimatePresence>
                          {passwordChanged && <PasswordChangeSuccessPopup onClose={() => setPasswordChanged(false)} />}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
        </Card>
    </>
  )
}
