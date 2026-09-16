import { motion, AnimatePresence } from "framer-motion"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts"
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"

const renderChart = (data: any[], chartType: "pie" | "radar", colorKey: string = "color") => (
  <AnimatePresence mode="wait">
      <motion.div
        key={chartType}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="h-[300px] w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "pie" ? (
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                nameKey="attribute"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 60%)`} />
                ))}
              </Pie>
              <RechartsTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center gap-2">
                            <div
                              className="h-2 w-2 rounded-full"
                              style={{ background: payload[0].payload.fill }}
                            />
                            <span className="font-medium">{payload[0].name}</span>
                          </div>
                          <div className="text-right font-medium">
                            {payload[0].value}
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                formatter={(value, entry: any) => (
                  <span className="text-sm text-muted-foreground">
                    {value} ({entry.payload.value})
                  </span>
                )}
              />
            </PieChart>
          ) : (
            <RadarChart data={data}>
              <PolarGrid className="text-gray-400" />
              <PolarAngleAxis
                dataKey="attribute"
                tick={{ fill: 'currentColor' }}
                className="text-gray-600 dark:text-gray-400"
              />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Value"
                dataKey="value"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.2}
              />
              <RechartsTooltip />
            </RadarChart>
          )}
        </ResponsiveContainer>

        
      </motion.div>
    </AnimatePresence>

  )

export { renderChart }