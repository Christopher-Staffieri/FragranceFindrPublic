import { motion } from "framer-motion"
import { ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"


function RatingDistributionChart({ data }: { data: typeof distributionData.SCENT }) {
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 300 }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full overflow-hidden"
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-700" />
            <XAxis 
              dataKey="rating" 
              className="text-gray-400"
              tick={{ fill: 'currentColor' }}
            />
            <YAxis 
              className="text-gray-400"
              tick={{ fill: 'currentColor' }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-background border rounded-lg p-2 shadow-lg">
                      <p className="text-sm font-medium">Rating: {payload[0].payload.rating}</p>
                      <p className="text-sm text-muted-foreground">Count: {payload[0].payload.count}</p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar
              dataKey="count"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    )
  }

export { RatingDistributionChart }