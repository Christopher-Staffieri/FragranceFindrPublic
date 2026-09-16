import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "./button"
import {Info, Layers, NetworkIcon as Network2, Search, X } from 'lucide-react'

import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent} from "./card"
import { ScrollArea, ScrollBar } from "./scroll-area"
import { Tabs, TabsList, TabsTrigger } from "./tabs"
import {
    Tooltip as UITooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "./tooltip"
// import { Card, Tabs } from "flowbite-react"
import { FragranceModal } from "./fragranceModel"


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

  function SimilarFragrances() {
    const [activeTab, setActiveTab] = useState("similar")
    const [activeFilter, setActiveFilter] = useState("top")
    const [selectedFragrance, setSelectedFragrance] = useState<SimilarFragrance | null>(null)
  
    const similarFragrances: SimilarFragrance[] = [
      {
        id: 1,
        name: "A*Men Pure Havane",
        brand: "Mugler",
        image: "/placeholder.svg?height=200&width=200",
        similarity: 85,
        attributes: [
          { name: "Sweet", color: "rgba(156, 163, 175, 0.2)" },
          { name: "Gourmand", color: "rgba(239, 68, 68, 0.2)" },
          { name: "Spicy", color: "rgba(16, 185, 129, 0.2)" }
        ],
        ratings: {
          up: 334,
          down: 109
        }
      },
      {
        id: 2,
        name: "Honey Tobacco",
        brand: "Guerlain",
        image: "/placeholder.svg?height=200&width=200",
        similarity: 82,
        attributes: [
          { name: "Sweet", color: "rgba(156, 163, 175, 0.2)" },
          { name: "Tobacco", color: "rgba(245, 158, 11, 0.2)" }
        ],
        ratings: {
          up: 245,
          down: 82
        }
      },
      {
        id: 3,
        name: "Insurrection II Wild",
        brand: "Reyane Tradition",
        image: "/placeholder.svg?height=200&width=200",
        similarity: 78,
        attributes: [
          { name: "Sweet", color: "rgba(156, 163, 175, 0.2)" },
          { name: "Tobacco", color: "rgba(245, 158, 11, 0.2)" },
          { name: "Vanilla", color: "rgba(236, 72,153,0.2)" }
        ],
        ratings: {
          up: 189,
          down: 67
        }
      },
      {
        id: 4,
        name: "King Tobacco",
        brand: "Oud Elite",
        image: "/placeholder.svg?height=200&width=200",
        similarity: 75,
        attributes: [
          { name: "Tobacco", color: "rgba(245, 158,11,0.2)" },
          { name: "Woody", color: "rgba(120,53,15,0.2)" }
        ],
        ratings: {
          up: 156,
          down: 58
        }
      },
      {
        id: 5,
        name: "1981X PARFUM EXTRACT",
        brand: "Roja Parfums",
        image: "/placeholder.svg?height=200&width=200",
        similarity: 72,
        attributes: [
          { name: "Sweet", color: "rgba(156,163,175,0.2)" },
          { name: "Spicy", color: "rgba(16,185,129,0.2)" },
          { name: "Woody", color: "rgba(120,53,15,0.2)" }
        ],
        ratings: {
          up: 201,
          down: 79
        }
      },
      {
        id: 6,
        name: "Noble Night",
        brand: "Oud Elite",
        image: "/placeholder.svg?height=200&width=200",
        similarity: 70,
        attributes: [
          { name: "Woody", color: "rgba(120,53,15,0.2)" },
          { name: "Spicy", color: "rgba(16,185,129,0.2)" }
        ],
        ratings: {
          up: 134,
          down: 52
        }
      }
    ]
  
    return (
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Smells similar</h3>
            <span className="text-sm text-muted-foreground">What the fragrance is similar to</span>
          </div>
  
          <div className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger
                  value="similar"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2"
                >
                  <Info className="w-4 h-4" />
                  Similar
                </TabsTrigger>
                <TabsTrigger
                  value="layer"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2"
                >
                  <Layers className="w-4 h-4" />
                  Layer
                </TabsTrigger>
                <TabsTrigger
                  value="associations"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2"
                >
                  <Network2 className="w-4 h-4" />
                  Associations
                </TabsTrigger>
              </TabsList>
            </Tabs>
  
            <div className="flex items-center gap-2">
              <Button
                variant={activeFilter === "top" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveFilter("top")}
                className="text-sm"
              >
                Top
              </Button>
              <Button
                variant={activeFilter === "all" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveFilter("all")}
                className="text-sm"
              >
                All 30
              </Button>
              <Button
                variant={activeFilter === "suggestions" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveFilter("suggestions")}
                className="text-sm flex items-center gap-2"
              >
                <span className="size-2 bg-primary rounded-full" />
                My suggestions
              </Button>
            </div>
  
            <ScrollArea className="w-full">
              <div className="flex space-x-4 pb-4">
                <AnimatePresence mode="popLayout">
                  {similarFragrances.map((fragrance) => (
                    <motion.div
                      key={fragrance.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      className="relative group"
                    >
                      <TooltipProvider>
                        <UITooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => setSelectedFragrance(fragrance)}
                              className="block w-[120px] text-center focus:outline-none"
                            >
                              <div className="relative size-[120px] rounded-full overflow-hidden mb-3 bg-muted group-hover:ring-2 ring-primary transition-all">
                                <img
                                  src={fragrance.image}
                                  alt={fragrance.name}
                                  
                                  className="object-cover transition-transform group-hover:scale-110"
                                />
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  whileHover={{ opacity: 1 }}
                                  className="absolute inset-0 bg-black/40 flex items-center justify-center"
                                >
                                  <span className="text-white font-semibold">
                                    {fragrance.similarity}% Similar
                                  </span>
                                </motion.div>
                              </div>
                              <motion.span
                                className="text-sm text-muted-foreground group-hover:text-primary transition-colors line-clamp-2"
                                whileHover={{ y: -2 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                {fragrance.name}
                              </motion.span>
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View {fragrance.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {fragrance.similarity}% similarity score
                            </p>
                          </TooltipContent>
                        </UITooltip>
                      </TooltipProvider>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </CardContent>
        {selectedFragrance && (
          <FragranceModal
            fragrance={selectedFragrance}
            isOpen={!!selectedFragrance}
            onClose={() => setSelectedFragrance(null)}
          />
        )}
      </Card>
    )
  }

export { SimilarFragrances }