
import { motion } from "framer-motion"

const renderFragranceCard = (fragrance: any, index: number) => (
    <motion.div
      key={fragrance.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative group"
    >
      <div className="relative w-32 h-32 rounded-lg overflow-hidden mb-2">
        <img
          src={fragrance.image}
          alt={fragrance.name}
        //   fill
          className="object-cover transition-transform group-hover:scale-110"
        />
      </div>
      <h4 className="text-sm font-medium truncate">{fragrance.name}</h4>
      {fragrance.brand && (
        <p className="text-xs text-muted-foreground truncate">{fragrance.brand}</p>
      )}
    </motion.div>
  )

export { renderFragranceCard }