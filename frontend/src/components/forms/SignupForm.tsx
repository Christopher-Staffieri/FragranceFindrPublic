'use client'
// import { Button, Checkbox, Label, Select, TextInput } from "flowbite-react";
// import { useSignup } from '../../hooks/use-signup'
import useSignup from "../../hooks/use-signup";
// import { useSignup } from "@/hooks";
import {Countries} from '../../json/Countries';
import { useConfig } from '../../auth'
import ProviderList from '../../socialaccount/ProviderList'
import FormErrors from '../../components/FormErrors'
import { Loader2 } from 'lucide-react'
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../common/select"
import { Link } from "react-router-dom";
import { useState } from "react";

// import { googleAuth, facebookAuth } from "@/utils";

export default function SignupForm() {

    const config = useConfig()
    const hasProviders = config.data.socialaccount?.providers?.length > 0
    const [isLoading, setIsLoading] = useState(false)
    // const [response, setResponse] = useState({ fetching: false, content: null })
    
    const {
        first_name, 
        last_name, 
        username,
        email, 
        password, 
        re_password,
        country, 
        gender,
        response,
        onChange,
        onSubmit,
      } = useSignup();

    return (
        <>
          <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              onSubmit={onSubmit}
              className="space-y-6"
            >
              {/* Email & Username */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium text-[#2E2E2E] dark:text-[#ECECEC]"
                  >
                    Your email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={onChange}
                    className="w-full px-4 py-2 rounded-lg border border-[#E1E1E1] dark:border-[#393B3F] bg-white dark:bg-[#2B2D30] text-[#2E2E2E] dark:text-[#ECECEC] placeholder-[#707070] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4A90E2] transition-all"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label 
                    htmlFor="username" 
                    className="block text-sm font-medium text-[#2E2E2E] dark:text-[#ECECEC]"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={onChange}
                    className="w-full px-4 py-2 rounded-lg border border-[#E1E1E1] dark:border-[#393B3F] bg-white dark:bg-[#2B2D30] text-[#2E2E2E] dark:text-[#ECECEC] placeholder-[#707070] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4A90E2] transition-all"
                    placeholder="FragranceFindrshrimp"
                    required
                  />
                </div>
              </div>

              {/* First & Last Name */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label 
                    htmlFor="firstName" 
                    className="block text-sm font-medium text-[#2E2E2E] dark:text-[#ECECEC]"
                  >
                    First Name
                  </label>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    value={first_name}
                    onChange={onChange}
                    className="w-full px-4 py-2 rounded-lg border border-[#E1E1E1] dark:border-[#393B3F] bg-white dark:bg-[#2B2D30] text-[#2E2E2E] dark:text-[#ECECEC] placeholder-[#707070] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4A90E2] transition-all"
                    placeholder="e.g. Bonnie"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label 
                    htmlFor="lastName" 
                    className="block text-sm font-medium text-[#2E2E2E] dark:text-[#ECECEC]"
                  >
                    Last Name
                  </label>
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    value={last_name}
                    onChange={onChange}
                    className="w-full px-4 py-2 rounded-lg border border-[#E1E1E1] dark:border-[#393B3F] bg-white dark:bg-[#2B2D30] text-[#2E2E2E] dark:text-[#ECECEC] placeholder-[#707070] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4A90E2] transition-all"
                    placeholder="e.g. Green"
                    required
                  />
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label 
                    htmlFor="password" 
                    className="block text-sm font-medium text-[#2E2E2E] dark:text-[#ECECEC]"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onChange}
                    className="w-full px-4 py-2 rounded-lg border border-[#E1E1E1] dark:border-[#393B3F] bg-white dark:bg-[#2B2D30] text-[#2E2E2E] dark:text-[#ECECEC] placeholder-[#707070] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4A90E2] transition-all"
                    placeholder="••••••"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label 
                    htmlFor="passwordConfirm" 
                    className="block text-sm font-medium text-[#2E2E2E] dark:text-[#ECECEC]"
                  >
                    Password Again
                  </label>
                  <input
                    id="re_password"
                    name="re_password"
                    type="password"
                    value={re_password}
                    onChange={onChange}
                    className="w-full px-4 py-2 rounded-lg border border-[#E1E1E1] dark:border-[#393B3F] bg-white dark:bg-[#2B2D30] text-[#2E2E2E] dark:text-[#ECECEC] placeholder-[#707070] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4A90E2] transition-all"
                    placeholder="••••••"
                    required
                  />
                </div>
              </div>

              {/* Country & Gender */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label 
                    className="block text-sm font-medium text-[#2E2E2E] dark:text-[#ECECEC]"
                  >
                    Country
                  </label>
                  <Select name="country" onValueChange={(event) => onChange({'field': 'country', 'value': event})}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a country" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(Countries).map(entry => {
                        return(
                          <SelectItem value={entry[0]}>{entry[1]}</SelectItem>
                        )
                      })}
                      {/* <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="au">Australia</SelectItem> */}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label 
                    className="block text-sm font-medium text-[#2E2E2E] dark:text-[#ECECEC]"
                  >
                    Gender
                  </label>
                  <Select name="gender" onValueChange={(event) => onChange({'field': 'gender', 'value': event})}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="no-gender">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                {/* Terms & Updates */}
                <div className="space-y-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      // checked={acceptTerms}
                      // onChange={handleInputChange}
                      className="w-4 h-4 rounded border-[#E1E1E1] dark:border-[#393B3F] text-[#4A90E2] focus:ring-[#4A90E2] transition-colors"
                      required
                    />
                    <span className="text-sm text-[#707070] dark:text-[#A0A0A0]">
                      By signing up, you are creating a FragranceFindr account, and you agree to FragranceFindr's{" "}
                      <Link to="/terms" className="text-[#4A90E2] hover:text-[#2563EB] transition-colors">
                        Terms of Use
                      </Link>
                      {" "}and{" "}
                      <Link to="/privacy" className="text-[#4A90E2] hover:text-[#2563EB] transition-colors">
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="acceptUpdates"
                      // checked={formData.acceptUpdates}
                      // onChange={handleInputChange}
                      className="w-4 h-4 rounded border-[#E1E1E1] dark:border-[#393B3F] text-[#4A90E2] focus:ring-[#4A90E2] transition-colors"
                    />
                    <span className="text-sm text-[#707070] dark:text-[#A0A0A0]">
                      Email me about product updates and resources.
                    </span>
                  </label>
                </div>

                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 rounded-lg bg-[#4A90E2] hover:bg-[#2563EB] text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                    ) : (
                      "Create an account"
                    )}
                  </motion.button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#E1E1E1] dark:border-[#393B3F]" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white dark:bg-[#2B2D30] text-[#707070] dark:text-[#A0A0A0]">
                        or sign up with
                      </span>
                    </div>
                  </div>

                  {hasProviders
                    ? <>
                        <ProviderList callbackURL='/account/provider/callback' />
                      </>
                    : null}

                  {/* <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="button"
                    className="w-full py-2.5 rounded-lg border border-[#E1E1E1] dark:border-[#393B3F] bg-white dark:bg-[#2B2D30] text-[#2E2E2E] dark:text-[#ECECEC] font-medium hover:bg-gray-50 dark:hover:bg-[#393B3F] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4A90E2] focus:ring-offset-2 flex items-center justify-center gap-2"
                  >
                    <img
                      src="/google.svg"
                      alt="Google"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                    Sign in with Google
                  </motion.button> */}
                </div>
              </div>

            </motion.form>

        </>
    )
}