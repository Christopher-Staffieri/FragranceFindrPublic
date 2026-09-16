import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "./button"
import { ThumbsUp, ThumbsDown, NetworkIcon as Network2, Search, X } from 'lucide-react'
import { Badge } from "./badge"
import { motion, AnimatePresence } from "framer-motion"




interface SimilarFragrance {
    id: number
    name: string
    image: string
    similarity: number
    brand: string
    attributes: Array<{
      name: string
      color: string
    }>
    ratings: {
      up: number
      down: number
    }
  }
  
  function FragranceModal({ 
    fragrance, 
    isOpen, 
    onClose 
  }: { 
    fragrance: SimilarFragrance
    isOpen: boolean
    onClose: () => void 
  }) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-start gap-4">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="relative size-20 overflow-hidden rounded-full"
                >
                  <img
                    src={fragrance.image}
                    alt={fragrance.name}
                    
                    className="object-cover"
                  />
                </motion.div>
                <div className="flex-1 space-y-2">
                  <motion.h2
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl font-semibold"
                  >
                    {fragrance.name}
                  </motion.h2>
                  <motion.p
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="text-sm text-muted-foreground"
                  >
                    {fragrance.brand}
                  </motion.p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={onClose}
                >
                  <X className="size-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
  
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <div className="flex gap-2">
                  {fragrance.attributes.map((attr, index) => (
                    <motion.div
                      key={attr.name}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <Badge
                        variant="secondary"
                        className="rounded-full"
                        style={{ backgroundColor: attr.color }}
                      >
                        {attr.name}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
  
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    COMMUNITY CONSENSUS
                  </div>
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-sm"
                    >
                      <ThumbsUp className="size-4" />
                      <span>{fragrance.ratings.up}</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-sm"
                    >
                      <ThumbsDown className="size-4" />
                      <span>{fragrance.ratings.down}</span>
                    </motion.button>
                  </div>
                </div>
  
                <div className="text-sm">
                  <span className="font-medium">REMINDS OF</span>{" "}
                  <span className="text-muted-foreground">Naxos</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

export { FragranceModal }