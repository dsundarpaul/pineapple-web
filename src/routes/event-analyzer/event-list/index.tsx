import { createFileRoute, Link } from '@tanstack/react-router'
import { EventTable } from '../-components/EventTable/EventTable'
import { VIEW_MODE } from '@/utils/constants'
import { Button } from '@/components/ui/button'
import { hasPermission } from '@/utils/permissions/rbac'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/event-analyzer/event-list/')({
  component: EventList,
})

function EventList() {
  return (
  <div>
    <div className='flex justify-between items-center'>
      <div className='flex'> 
        <Link to={'/event-analyzer'}>
          <Button variant='ghost' className='font-semibold rounded'>
            <ArrowLeft className='h-5 w-5' />
          </Button>
        </Link>
        <h1 className='text-2xl font-semibold'>Event List</h1>
      </div>
      {hasPermission({roles: ['admin'], id: '1', blockedBy: []}, "eventAnalyzer", "create") && (
        <Link to={'/event-analyzer/addedit/$eventId'} params={{ eventId: 'new' }}>
          <Button className='font-semibold'>Add Event</Button>
        </Link>
      )}
    </div>
    <EventTable viewMode={VIEW_MODE.FULL} />
  </div>
  )
}
