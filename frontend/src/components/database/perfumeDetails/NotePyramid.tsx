import { Card, CardContent } from "./card"
import {
    Tooltip as UITooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "./tooltip"
import { Badge } from "./badge"

export default function NotePyramid(perfume){
  console.log(perfume)
    return(
        <Card>
              <CardContent className="p-6">
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Fragrance Pyramid</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Top Notes</h4>
                    <div className="flex flex-wrap gap-2">
                      <TooltipProvider>
                        {['Lavender', 'Bergamot', 'Lemon'].map((note) => (
                          <UITooltip key={note}>
                            <TooltipTrigger asChild>
                              <Badge variant="secondary">{note}</Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{note} description goes here.</p>
                            </TooltipContent>
                          </UITooltip>
                        ))}
                      </TooltipProvider>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Heart Notes</h4>
                    <div className="flex flex-wrap gap-2">
                      <TooltipProvider>
                        {['Honey', 'Cashmere', 'Spices'].map((note) => (
                          <UITooltip key={note}>
                            <TooltipTrigger asChild>
                              <Badge variant="secondary">{note}</Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{note} description goes here.</p>
                            </TooltipContent>
                          </UITooltip>
                        ))}
                      </TooltipProvider>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Base Notes</h4>
                    <div className="flex flex-wrap gap-2">
                      <TooltipProvider>
                        {['Tobacco', 'Tonka Bean', 'Vanilla'].map((note) => (
                          <UITooltip key={note}>
                            <TooltipTrigger asChild>
                              <Badge variant="secondary">{note}</Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{note} description goes here.</p>
                            </TooltipContent>
                          </UITooltip>
                        ))}
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
    )
}