import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { NumberTicker } from '@/components/ui/number-ticker'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
// import { AttendeeTable } from './-components/AttendeeTable'
import { hasPermission } from '@/utils/permissions/rbac'
import { EventTable } from './-components/EventTable/EventTable'
import { VIEW_MODE } from '@/utils/constants'
import { useQuery } from '@tanstack/react-query'
import { adminApi } from '@/api'
import { useState } from 'react'
import { EventStat } from '@/utils/types'

export const Route = createFileRoute('/home/$productId/event-analyzer/')({
  component: EventAnalyzer,
})

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
  const { productId } = useParams({ from: '/home/$productId/event-analyzer/' })

  const [queryParams, setQueryParams] = useState({
    search: '',
    startDate: undefined,
    endDate: undefined,
    location: '',
    venue: '',
    sortBy: '',
    sortOrder: 'asc',
  });
  const [statNumbers, setStatNumbers] = useState<EventStat[]>([]);

  const { data } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await adminApi.get(`/events/products/${productId}`, {
        params: {
          // search: queryParams.search,
          // startDate: queryParams.startDate?.toISOString(),
          // endDate: queryParams.endDate?.toISOString(),
          // location: queryParams.location,
          // venue: queryParams?.venue,
          // sortBy: queryParams.sortBy,
          // sortOrder: queryParams.sortOrder,
          page: 1,
          limit: 10,
        },
      });
      
      setStatNumbers(response.data.stats);
      return response.data;
    },
  });

  console.log(data)

  return (
    <div className=''> 
      {/* Event stats */}

      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Event Analyzer</h1>
        {hasPermission({roles: ['admin'], id: '1', blockedBy: []}, "eventAnalyzer", "create") && (
          <Link to={'/home/$productId/event-analyzer/addedit/$eventId'} params={{ eventId: 'new' }}>
            <Button className='font-semibold'>Add Event</Button>
          </Link>
        )}
      </div>
      <div className='py-3'>
        <div className='flex w-full justify-evenly gap-0 flex-wrap'>
            {statNumbers.map((item, idx) => (
            <div key={idx} className='dark:bg-gray-800 dark:text-white p-4 rounded flex flex-col w-1/3 max-md:w-1/2 max-sm:w-full border-slate-500 border shadow-lg'>
              <h2 className='text-lg font-bold'>{item.label}</h2>
              <NumberTicker
              value={item.value}
              className="whitespace-pre-wrap text-4xl font-medium tracking-tighter text-white"
              />
              <p>{item.percentageChange}% from last month</p>
            </div>
            ))}
        </div>
      </div>
      
      <div className='flex gap-3 max-lg:flex-col'>
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
          <EventTable viewMode={VIEW_MODE.COMPACT} data={data?.events} />
        </Card>
      </div>
    
    </div>
  )
}
