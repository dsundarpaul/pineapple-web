import { useParams } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import { AttendeeTable } from '../-components/AttendeeTable'

export const Route = createFileRoute('/dashboard/event-analyzer/attendee/$eventId/')({
  component: RouteComponent,
})

function RouteComponent() {

  const { eventId } = useParams({ from: '/dashboard/event-analyzer/attendee/$eventId/' })

  if(!eventId || eventId === "undefined") return <div>Event not found (Attendee List)</div>

  return (
    <div>
      <h2 className='text-xl font-bold'>Attendees</h2>
      <AttendeeTable />
    </div>
  )
}
