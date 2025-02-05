import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/event-analyzer/')({
  component: EventAnalyzer,
})

function EventAnalyzer() {
  return <div> Events here </div>
}