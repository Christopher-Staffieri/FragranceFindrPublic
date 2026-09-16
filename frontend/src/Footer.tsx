import { useState } from "react"
// import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Heart, Instagram, Facebook, Twitter, ArrowUp, Droplets, Smartphone } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer(){
  const [isHoveringSupport, setIsHoveringSupport] = useState(false)
  const [isHoveringScrollTop, setIsHoveringScrollTop] = useState(false)

  const scrollToTop = () => {
      window.scrollTo({
      top: 0,
      behavior: "smooth",
      })
  }

  const footerLinks = {
      about: [
        { name: "Perfume", href: "/perfume" },
        { name: "Perfume Brands", href: "/brands" },
        { name: "Perfumers", href: "/perfumers" },
        { name: "Fragrance Notes", href: "/notes" },
        { name: "Similar Perfumes", href: "/similar" },
      ],
      company: [
        { name: "Community Rules", href: "/rules" },
        { name: "Our Team", href: "/team" },
        { name: "Help Center", href: "/help" },
        { name: "Mobile App", href: "/app" },
      ],
      legal: [
        { name: "Language", href: "/language" },
        { name: "Sitemap", href: "/sitemap" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Cookie Settings", href: "/cookies" },
        { name: "About Us", href: "/about" },
      ],
    }

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
    { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
  ]

  const container = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    }
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }
  

  return(
      <footer className="bg-light-surface dark:bg-dark-surface border-t border-light-border dark:border-dark-border relative">
    {/* Decorative elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
      <motion.div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-light-primary/5 dark:bg-dark-primary/5"
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
        className="absolute bottom-20 -left-20 w-80 h-80 rounded-full bg-light-secondary/5 dark:bg-dark-secondary/5"
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

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
      {/* Top section with description */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
            FragranceFindr
          </h2>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
            The home for all fragrance connoisseurs & enthusiasts! Discover new perfumes, organize your collection,
            connect with other fragrance lovers and much more!
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
            <button
              className="inline-flex items-center px-6 py-3 rounded-full bg-light-primary dark:bg-dark-primary text-white font-medium transition-all duration-300 relative overflow-hidden group"
              onMouseEnter={() => setIsHoveringSupport(true)}
              onMouseLeave={() => setIsHoveringSupport(false)}
            >
              <motion.span
                animate={{
                  scale: isHoveringSupport ? [1, 1.2, 1] : 1,
                  color: isHoveringSupport ? "#F45B69" : "#FFFFFF",
                }}
                transition={{ duration: 0.5 }}
                className="mr-2"
              >
                <Heart className="w-5 h-5" />
              </motion.span>
              Support FragranceFindr
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Main footer links */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
      >
        {/* About section */}
        <motion.div variants={item}>
          <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4 flex items-center">
            <Droplets className="w-5 h-5 mr-2 text-light-primary dark:text-dark-primary" />
            ALL ABOUT PERFUME
          </h3>
          <ul className="space-y-2">
            {footerLinks.about.map((link) => (
              <motion.li
                key={link.name}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link
                  to={link.href}
                  className="text-light-text-secondary dark:text-dark-text-secondary hover:text-light-primary dark:hover:text-dark-primary transition-colors duration-200"
                >
                  {link.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Company section */}
        <motion.div variants={item}>
          <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4 flex items-center">
            <span className="w-5 h-5 mr-2 text-light-primary dark:text-dark-primary">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            FRAGRANCEFINDR
          </h3>
          <ul className="space-y-2">
            {footerLinks.company.map((link) => (
              <motion.li
                key={link.name}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link
                  to={link.href}
                  className="text-light-text-secondary dark:text-dark-text-secondary hover:text-light-primary dark:hover:text-dark-primary transition-colors duration-200"
                >
                  {link.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Social section */}
        <motion.div variants={item}>
          <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4 flex items-center">
            <Smartphone className="w-5 h-5 mr-2 text-light-primary dark:text-dark-primary" />
            SOCIAL & APP
          </h3>
          <div className="flex space-x-4 mb-6">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-light-background dark:bg-dark-background flex items-center justify-center text-light-text-secondary dark:text-dark-text-secondary hover:text-light-primary dark:hover:text-dark-primary transition-colors duration-200"
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          <div className="space-y-4">
            <motion.a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center px-4 py-2 rounded-lg bg-light-background dark:bg-dark-background text-light-text-primary dark:text-dark-text-primary hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 transition-colors duration-200"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                <path d="M17.0399 21.75C16.0699 22.75 15.0999 22.65 14.1599 22.25C13.1599 21.85 12.2799 21.85 11.2499 22.25C9.9399 22.75 9.1699 22.65 8.2999 21.75C3.5999 16.95 4.2999 9.45 9.6999 9.15C10.9999 9.25 11.8999 9.85 12.6499 9.9C13.7499 9.65 14.7999 9.05 16.0499 9.2C17.6499 9.4 18.7999 10.05 19.4999 11.25C16.3999 12.85 17.0999 17.05 19.9999 17.95C19.4499 19.45 18.6499 20.85 17.0399 21.75ZM12.4999 9C12.3499 6.85 14.0999 5.05 16.1499 4.85C16.4499 7.35 13.9499 9.25 12.4999 9Z" />
              </svg>
              App Store
            </motion.a>

            <motion.a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center px-4 py-2 rounded-lg bg-light-background dark:bg-dark-background text-light-text-primary dark:text-dark-text-primary hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 transition-colors duration-200"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                <path d="M12.954 11.616l2.957-2.957L6.36 3.17c-.633-.342-1.226-.39-1.746-.016l8.34 8.462zm3.461 3.462l3.074-1.729c.6-.336.929-.812.929-1.34 0-.527-.329-1.004-.928-1.34l-2.783-1.563-3.133 3.132 2.841 2.84zM4.1 4.002c-.064.197-.1.417-.1.658v14.705c0 .381.084.709.236.97l8.097-8.098L4.1 4.002zm8.854 8.855L4.902 20.91c.154.059.32.09.495.09.312 0 .637-.092.968-.276l9.255-5.197-2.666-2.67z" />
              </svg>
              Google Play
            </motion.a>
          </div>
        </motion.div>

        {/* Legal section */}
        <motion.div variants={item}>
          <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
            LEGAL & INFO
          </h3>
          <ul className="space-y-2">
            {footerLinks.legal.map((link) => (
              <motion.li
                key={link.name}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link
                  to={link.href}
                  className="text-light-text-secondary dark:text-dark-text-secondary hover:text-light-primary dark:hover:text-dark-primary transition-colors duration-200"
                >
                  {link.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      {/* Bottom section with copyright */}
      <div className="border-t border-light-border dark:border-dark-border pt-8 flex flex-col md:flex-row justify-between items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex items-center mb-4 md:mb-0"
        >
          <Heart className="w-4 h-4 text-light-secondary dark:text-dark-secondary mr-2" />
          <span className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
            SMELLING GREAT SINCE 2023
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-sm text-light-text-secondary dark:text-dark-text-secondary"
        >
          © {new Date().getFullYear()} FragranceFindr. All rights reserved.
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          onMouseEnter={() => setIsHoveringScrollTop(true)}
          onMouseLeave={() => setIsHoveringScrollTop(false)}
          className="w-10 h-10 rounded-full bg-light-background dark:bg-dark-background flex items-center justify-center text-light-text-secondary dark:text-dark-text-secondary hover:text-light-primary dark:hover:text-dark-primary transition-colors duration-200 mt-4 md:mt-0"
          aria-label="Scroll to top"
        >
          <motion.div
            animate={{ y: isHoveringScrollTop ? -3 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.div>
        </motion.button>
      </div>
    </div>
  </footer>
  )
}