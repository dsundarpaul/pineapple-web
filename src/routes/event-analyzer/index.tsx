import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { NumberTicker } from '@/components/ui/number-ticker'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { AttendeeTable } from './-components/AttendeeTable'

export const Route = createFileRoute('/event-analyzer/')({
  component: EventAnalyzer,
})

const MOCK_STATS = {
  totalEvents: 1000,
  totalUniqueAttendeeance: 500,
  locations: 5,
  liveFroms: 5,
  livemeetups: 5,
  totalResponses: 400
}

const chartData = [
  { month: "January", registered: 286, attended: 80 },
  { month: "February", registered: 180, attended: 90 },
  { month: "March", registered: 237, attended: 120 },
  { month: "April", registered: 173, attended: 95 },
  { month: "May", registered: 150, attended: 110 },
  { month: "June", registered: 121, attended: 85 },
  { month: "July", registered: 214, attended: 140 },
  { month: "August", registered: 198, attended: 130 },
  { month: "September", registered: 175, attended: 120 },
  { month: "October", registered: 214, attended: 140 },
  { month: "November", registered: 190, attended: 125 },
  { month: "December", registered: 100, attended: 50 },
];

  const chartConfig = {
    registered: {
      label: "Registered",
      color: "hsl(var(--primary))",
    },
    attended: {
      label: "Attended",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig

function EventAnalyzer() {
  return (
    <div className=''> 
      {/* Event stats */}

      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Event Analyzer</h1>
        <Link to={'/event-analyzer/addedit/$eventId'} params={{ eventId: 'new' }}>
          <Button className='font-semibold'>Add Event</Button>
        </Link>
      </div>
      <div className='py-3'>
        <div className='flex w-full justify-evenly gap-3'>
          {Object.entries(MOCK_STATS).map(([key, value]) => (
            <div key={key} className='p-4 rounded-lg dark:bg-gray-800 dark:text-white flex flex-col items-center w-full border-slate-200 border shadow-sm'>
              <h2 className='text-lg font-bold'>{key}</h2>
              <NumberTicker
                value={value}
                className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white"
                />
            </div>
          ))}
        </div>
      </div>
      
      <div className='flex gap-3'>
      <Card className='w-full'>
        <CardHeader>
          <div className='flex justify-between items-center'>
            <CardTitle>City wise event registration - attendee ratio</CardTitle>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Pune</SelectItem>
                <SelectItem value="dark">Hyderabad</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="max-h-[400px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <Bar dataKey="registered" fill="var(--color-registered)" radius={4} />
              <Bar dataKey="attended" fill="var(--color-attended)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className='w-full p-3'>
        <AttendeeTable />
      </Card>
      </div>
    
    </div>
  )
}
