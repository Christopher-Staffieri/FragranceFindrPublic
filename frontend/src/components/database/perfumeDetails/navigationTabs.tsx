import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"
import { Card, CardContent } from "./card"
import { Button } from "./button"
import { useCallback, useState } from "react"
import { renderChart } from "./renderChart"
import { Clock, Calendar, Droplet, Flame, PieChartIcon, Activity } from 'lucide-react'
export default function NavigationTabs({activeTab, setActiveTab}){
    // const [activeTab, setActiveTab] = useState("info")
    const [scentProfileChartType, setScentProfileChartType] = useState<"pie" | "radar">("radar")
    const scentProfileData = [
        { attribute: "Sweet", value: 80 },
        { attribute: "Spicy", value: 65 },
        { attribute: "Woody", value: 90 },
        { attribute: "Fresh", value: 45 },
        { attribute: "Floral", value: 30 },
        { attribute: "Oriental", value: 85 },
      ]

    const handleTabChange = useCallback((event) => {
      console.log(event)
      setActiveTab(event)
    }, [setActiveTab])

    return(
        <>
                <TabsList className="w-full h-auto p-0 bg-transparent grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {[
                    { id: "info", label: "INFO", count: null },
                    { id: "inspiration", label: "INSPIRATION", count: null },
                    { id: "reviews", label: "REVIEWS", count: "58" },
                    { id: "statements", label: "STATEMENTS", count: "87" },
                    { id: "photos", label: "PHOTOS", count: "247" },
                    { id: "chart", label: "CHART", count: null },
                  ].map(({ id, label, count }) => (
                    <TabsTrigger
                      key={id}
                      value={id}
                      className="px-4 py-3 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <span>{label}</span>
                      {count && <span className="ml-1 opacity-80 text-xs">({count})</span>}
                    </TabsTrigger>
                  ))}
                </TabsList>



        </>
    )
}


