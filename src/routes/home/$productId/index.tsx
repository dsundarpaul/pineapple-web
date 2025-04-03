import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/home/$productId/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      This product anaylytics

      <div>
        <Link from='/home/$productId/' to='/home/$productId/event-analyzer'>
          Event Analyzer
        </Link>
      </div>
    </div>
  )
}
