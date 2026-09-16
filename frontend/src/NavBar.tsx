import { useState, useEffect } from "react"
// import { usePathname } from "next/navigation"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Globe,
  Sun,
  Moon,
  Bell,
  User,
  Menu,
  X,
  Settings,
  LayoutDashboard,
  UserCircle,
  HelpCircle,
  LogOut,
  Check,
} from "lucide-react"
import { Button } from "./components/MainButton"
import { cn } from "./lib/utils"
import { useUser } from "./auth"
import LogoDarkMode from '../public/LogoDarkMode.png'
import LogoLightMode from '../public/LogoLightMode.png'
import DarkModeTextLogo from '../public/DarkModeTextLogo.png'
import TextLogo from '../public/TextLogo.png'

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Fragrances", href: "/fragrances" },
  { name: "Community", href: "/community" },
  { name: "Forum", href: "/forum" },
  { name: "Research", href: "/research" },
  { name: "Directory", href: "/directory" },
]

const languages = [
  { code: "en", name: "English" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
]



export default function NavBar() {
    const pathname = useLocation()
    console.log(pathname)
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState("en")
    const [languageOpen, setLanguageOpen] = useState(false)
    const [accountOpen, setAccountOpen] = useState(false)
    const [notificationsOpen, setNotificationsOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [unreadCount] = useState(0)
    const currentUser = useUser()
    const [currentUserName, setCurrentUserName] = useState(null)
    

    const accountMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/account/dashboard" },
    { icon: Settings, label: "Settings", href: "/account/account-details" },
    { icon: HelpCircle, label: "Support", href: "/support" },
]
 
    useEffect(() => {
        const theme = localStorage.getItem("theme")
        setIsDarkMode(theme === "dark")
    }, [])

    const toggleTheme = () => {
        const newTheme = isDarkMode ? "light" : "dark"
        setIsDarkMode(!isDarkMode)
        localStorage.setItem("theme", newTheme)
        document.documentElement.classList.toggle("dark")
    }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-light-border dark:border-dark-border bg-light-surface/95 dark:bg-dark-surface/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center shadow-lg"
            >
              <img
                src={isDarkMode ? LogoDarkMode : LogoLightMode}
                alt="FragranceFindr Logo"
                
              />
            </motion.div>
            <img
              src={isDarkMode ? DarkModeTextLogo : TextLogo}
              className="sm:block self-center h-6 sm:h-8"
            />
            {/* <span className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary group-hover:text-light-primary dark:group-hover:text-dark-primary transition-colors">
              FragranceFindr
            </span> */}
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navigationLinks.map((link) => {
              const isActive = pathname.pathname === link.href
              return (
                <Link key={link.name} to={link.href}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all relative",
                      isActive
                        ? "text-light-primary dark:text-dark-primary"
                        : "text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary hover:bg-light-background dark:hover:bg-dark-background",
                    )}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              )
            })}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="relative hidden sm:block">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLanguageOpen(!languageOpen)}
                className="relative hover:bg-light-background dark:hover:bg-dark-background"
              >
                <Globe className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
              </Button>
              <AnimatePresence>
                {languageOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setLanguageOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-12 w-40 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg shadow-xl z-50 overflow-hidden"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setSelectedLanguage(lang.code)
                            setLanguageOpen(false)
                          }}
                          className="w-full px-4 py-2.5 text-left text-sm text-light-text-primary dark:text-dark-text-primary hover:bg-light-background dark:hover:bg-dark-background transition-colors flex items-center justify-between"
                        >
                          {lang.name}
                          {selectedLanguage === lang.code && (
                            <Check className="w-4 h-4 text-light-primary dark:text-dark-primary" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-light-background dark:hover:bg-dark-background"
            >
              <motion.div initial={false} animate={{ rotate: isDarkMode ? 180 : 0 }} transition={{ duration: 0.3 }}>
                {isDarkMode ? (
                  <Moon className="w-5 h-5 text-dark-text-secondary" />
                ) : (
                  <Sun className="w-5 h-5 text-light-text-secondary" />
                )}
              </motion.div>
            </Button>

            {/* Notifications */}
            {currentUser
              ? 
                <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative hover:bg-light-background dark:hover:bg-dark-background"
              >
                <Bell className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
                {unreadCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1 w-2 h-2 bg-light-secondary dark:bg-dark-secondary rounded-full"
                  />
                )}
              </Button>
              <AnimatePresence>
                {notificationsOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setNotificationsOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-12 w-80 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg shadow-xl z-50"
                    >
                      <div className="p-4 border-b border-light-border dark:border-dark-border">
                        <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary">
                          Notifications
                        </h3>
                        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">
                          You have {unreadCount} unread messages
                        </p>
                      </div>
                      <div className="p-4 min-h-[200px] flex items-center justify-center">
                        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                          No notifications yet
                        </p>
                      </div>
                      <div className="p-3 border-t border-light-border dark:border-dark-border">
                        <button className="w-full text-sm text-light-primary dark:text-dark-primary hover:underline font-medium">
                          View all notifications
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            : null
            }

            {/* User Account Menu */}
            {currentUser
              ?
                <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setAccountOpen(!accountOpen)}
                className="hover:bg-light-background dark:hover:bg-dark-background"
              >
                <User className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
              </Button>
              <AnimatePresence>
                {accountOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setAccountOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-12 w-56 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg shadow-xl z-50 overflow-hidden"
                    >
                      <div className="p-3 border-b border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background">
                        <p className="font-semibold text-sm text-light-text-primary dark:text-dark-text-primary">
                          My Account
                        </p>
                      </div>
                      <div className="py-2">
                        {currentUser
                          ? 
                            <Link key={'Profile'} to={`/profile/${currentUser.username}`} onClick={() => setAccountOpen(false)}>
                            <motion.button
                              whileHover={{ x: 4 }}
                              className="w-full px-4 py-2.5 text-left text-sm text-light-text-primary dark:text-dark-text-primary hover:bg-light-background dark:hover:bg-dark-background transition-colors flex items-center gap-3"
                            >
                              <UserCircle className="w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
                              {'Profile'}
                            </motion.button>
                            </Link>
                          : null
                        }
                         
                        

                        {accountMenuItems.map((item) => (
                          <Link key={item.label} to={item.href} onClick={() => setAccountOpen(false)}>
                            <motion.button
                              whileHover={{ x: 4 }}
                              className="w-full px-4 py-2.5 text-left text-sm text-light-text-primary dark:text-dark-text-primary hover:bg-light-background dark:hover:bg-dark-background transition-colors flex items-center gap-3"
                            >
                              <item.icon className="w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
                              {item.label}
                            </motion.button>
                          </Link>
                        ))}
                      </div>
                      <div className="p-2 border-t border-light-border dark:border-dark-border">
                        <motion.button
                          whileHover={{ x: 4 }}
                          className="w-full px-4 py-2.5 text-left text-sm text-light-secondary dark:text-dark-secondary hover:bg-light-background dark:hover:bg-dark-background transition-colors flex items-center gap-3 rounded-md"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign out
                        </motion.button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            : 
                 /* Login / Sign Up Buttons - Show when not logged in */
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="ghost"
                      className="text-light-text-primary dark:text-dark-text-primary hover:bg-light-background dark:hover:bg-dark-background font-medium"
                    >
                      Log in
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/signup">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary text-white font-medium shadow-lg hover:shadow-xl transition-shadow">
                      Sign up
                    </Button>
                  </motion.div>
                </Link>
              </div>
                
            }

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden hover:bg-light-background dark:hover:bg-dark-background"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
              ) : (
                <Menu className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface"
          >
            <div className="px-4 py-4 space-y-2">
              {navigationLinks.map((link) => {
                const isActive = pathname.pathname === link.href
                return (
                  <Link key={link.name} to={link.href} onClick={() => setMobileMenuOpen(false)}>
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "px-4 py-3 rounded-lg text-sm font-medium transition-all",
                        isActive
                          ? "bg-light-background dark:bg-dark-background text-light-primary dark:text-dark-primary"
                          : "text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-background dark:hover:bg-dark-background",
                      )}
                    >
                      {link.name}
                    </motion.div>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}