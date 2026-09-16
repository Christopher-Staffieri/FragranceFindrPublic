

import { useRef, useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

import {
  LayoutDashboard,
  Grid3X3,
  Inbox,
  Heart,
  Star,
  FileText,
  ImageIcon,
  BarChart2,
  Rss,
  Settings,
  BookOpen,
  User,
  HelpCircle,
  ChevronDown,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
  Bell,
  Search,
  PanelLeft,
} from "lucide-react"

import { Button } from "../components/MainButton"
import { Avatar, AvatarFallback, AvatarImage } from "../components/database/perfumeDetails/avatar"
import { Badge } from "../components/database/perfumeDetails/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/database/perfumeDetails/tooltip"
import { useUser } from "../auth"


interface NavItemProps {
  icon: React.ElementType
  label: string
  href: string
  badge?: number
  isActive: boolean
  isCollapsed: boolean
  onClick?: () => void
}

export default function DashboardSideNavbar({
  children,
}: {
  children: React.ReactNode
}){

  const currentUser = useUser()
  const location = useLocation()
  const pathname = location.pathname
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  // Check for dark mode preference
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark")
    setIsDarkMode(isDark)
  }, [])

   // Close mobile menu when path changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const NavItem = ({ icon: Icon, label, href, badge, isActive, isCollapsed, onClick }: NavItemProps) => {
    return (
      <Link to={href} onClick={onClick}>
        <motion.div
          className={`
            flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer
            ${
              isActive
                ? "bg-light-primary/10 text-light-primary dark:bg-dark-primary/20 dark:text-dark-primary"
                : "text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-background dark:hover:bg-dark-background"
            }
            ${isCollapsed ? "justify-center" : ""}
            transition-all duration-200
          `}
          whileHover={{ x: isCollapsed ? 0 : 4 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative">
            <Icon className={`${isCollapsed ? "w-5 h-5" : "w-5 h-5"}`} />
            {badge && (
              <Badge
                className="absolute -top-2 -right-2 h-5 min-w-5 flex items-center justify-center p-0 text-xs bg-light-secondary dark:bg-dark-secondary text-white"
                variant="secondary"
              >
                {badge}
              </Badge>
            )}
          </div>
          {!isCollapsed && <span className="text-sm font-medium">{label}</span>}
        </motion.div>
      </Link>
    )
  }

  const sidebarVariants = {
    expanded: { width: "240px" },
    collapsed: { width: "72px" },
  }

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/account/dashboard" },
    { icon: Grid3X3, label: "Collection", href: "/dashboard/collection" },
    { icon: Inbox, label: "Inbox", href: "/dashboard/inbox", badge: 3 },
    { icon: Heart, label: "My Favorites", href: "/dashboard/favorites" },
    { icon: Star, label: "Reviews", href: "/dashboard/reviews" },
    { icon: FileText, label: "Statements", href: "/dashboard/statements" },
    { icon: ImageIcon, label: "Fragrance Photos", href: "/dashboard/photos" },
    { icon: BarChart2, label: "My Ratings", href: "/dashboard/ratings" },
    { icon: Rss, label: "Feed", href: "/dashboard/feed" },
  ]

  const secondaryNavItems = [
    { icon: BookOpen, label: "Blog", href: "/blog" },
    { icon: User, label: "Profile Stats", href: "/dashboard/profile" },
    { icon: HelpCircle, label: "Help", href: "/help" },
  ]

  return (
    <div className="flex h-screen bg-light-background dark:bg-dark-background">
      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`
          fixed top-0 left-0 z-50 h-full bg-light-surface dark:bg-dark-surface border-r border-light-border dark:border-dark-border
          flex flex-col overflow-hidden lg:relative
        `}
        initial={false}
        animate={isMobileMenuOpen ? "expanded" : isCollapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)" }}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-light-border dark:border-dark-border">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-light-primary dark:bg-dark-primary flex items-center justify-center">
                  <Droplets className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-light-text-primary dark:text-dark-text-primary">
                  FragranceFindr
                </span>
              </motion.div>
            )}
            {isCollapsed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="w-8 h-8 rounded-full bg-light-primary dark:bg-dark-primary flex items-center justify-center mx-auto"
              >
                <Droplets className="w-4 h-4 text-white" />
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="lg:flex hidden text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-background dark:hover:bg-dark-background"
          >
            <PanelLeft className={`w-5 h-5 transition-transform duration-200 ${isCollapsed ? "rotate-180" : ""}`} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden text-light-text-secondary dark:text-dark-text-secondary"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                href={item.href}
                badge={item.badge}
                isActive={pathname === item.href}
                isCollapsed={isCollapsed}
              />
            ))}

            {/* Settings with dropdown */}
            <div className="relative">
              <motion.div
                className={`
                  flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer
                  ${
                    pathname.includes("/account/account-details")
                      ? "bg-light-primary/10 text-light-primary dark:bg-dark-primary/20 dark:text-dark-primary"
                      : "text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-background dark:hover:bg-dark-background"
                  }
                  ${isCollapsed ? "justify-center" : ""}
                  transition-all duration-200
                `}
                whileHover={{ x: isCollapsed ? 0 : 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => !isCollapsed && setSettingsOpen(!settingsOpen)}
              >
                <Settings className={`${isCollapsed ? "w-5 h-5" : "w-5 h-5"}`} />
                {!isCollapsed && (
                  <>
                    <Link to='/account/account-details'>
                      <span className="text-sm font-medium flex-1">Settings</span>
                    </Link>
                    
                  </>
                )}
              </motion.div>

              {/* Settings dropdown */}
              {/* <AnimatePresence>
                {settingsOpen && !isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-9 mt-1 space-y-1 overflow-hidden"
                  >
                    <Link to="/dashboard/settings/account">
                      <motion.div
                        className="text-sm py-2 px-2 rounded-md text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-background dark:hover:bg-dark-background"
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Account
                      </motion.div>
                    </Link>
                    <Link to="/dashboard/settings/preferences">
                      <motion.div
                        className="text-sm py-2 px-2 rounded-md text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-background dark:hover:bg-dark-background"
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Preferences
                      </motion.div>
                    </Link>
                    <Link to="/dashboard/settings/notifications">
                      <motion.div
                        className="text-sm py-2 px-2 rounded-md text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-background dark:hover:bg-dark-background"
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Notifications
                      </motion.div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence> */}
            </div>
          </nav>

          {/* Divider */}
          <div className="my-4 border-t border-light-border dark:border-dark-border" />

          {/* Secondary Navigation */}
          <nav className="space-y-1">
            {secondaryNavItems.map((item) => (
              <NavItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                href={item.href}
                isActive={pathname === item.href}
                isCollapsed={isCollapsed}
              />
            ))}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-light-border dark:border-dark-border">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Avatar className="h-8 w-8 border border-light-border dark:border-dark-border">
                  <AvatarImage src="/placeholder.svg?height=32&width=32&text=JD" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    {currentUser.username}
                  </span>
                  {/* <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Premium</span> */}
                </div>
              </motion.div>
            )}

            <div className="flex gap-1">
              <TooltipProvider>
                {isCollapsed && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Avatar className="h-8 w-8 border border-light-border dark:border-dark-border">
                        <AvatarImage src="/placeholder.svg?height=32&width=32&text=JD" alt="User" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>John Doe (Premium)</p>
                    </TooltipContent>
                  </Tooltip>
                )}

                <Tooltip>
                  <TooltipTrigger asChild>
                    {/* <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleTheme}
                      className="text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-background dark:hover:bg-dark-background"
                    >
                      {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </Button> */}
                  </TooltipTrigger>
                  {/* <TooltipContent side={isCollapsed ? "right" : "top"}>
                    <p>{isDarkMode ? "Light mode" : "Dark mode"}</p>
                  </TooltipContent> */}
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-background dark:hover:bg-dark-background"
                    >
                      <LogOut className="w-5 h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side={isCollapsed ? "right" : "top"}>
                    <p>Logout</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-[240px]">
        {/* Top Navigation */}
        {/* <header className="h-16 border-b border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-light-text-secondary dark:text-dark-text-secondary"
            >
              <Menu className="w-5 h-5" />
            </Button>

            <div className="relative w-64 hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-9 pl-9 pr-4 rounded-lg bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-background dark:hover:bg-dark-background"
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-light-secondary dark:bg-dark-secondary text-white text-[10px] flex items-center justify-center">
                      3
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="h-8 w-8 rounded-full overflow-hidden border border-light-border dark:border-dark-border">
              <img
                src="/placeholder.svg?height=32&width=32&text=US"
                alt="Language"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header> */}

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}

// Helper component for the Droplets icon
function Droplets(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
      <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
    </svg>
  )
}