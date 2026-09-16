import * as React from "react"
import { motion } from "framer-motion"

interface ActionButtonProps {
  icon: React.ReactNode
  label?: string
  onClick?: () => void
  active?: boolean
  activeColor?: string
}

export function ActionButton({ 
  icon, 
  label, 
  onClick, 
  active = false, 
  activeColor = "text-primary"
}: ActionButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center gap-2 text-sm ${
        active ? activeColor : "text-muted-foreground hover:text-primary"
      }`}
      onClick={onClick}
    >
      {icon}
      {label}
    </motion.button>
  )
}