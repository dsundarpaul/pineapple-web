import { createFileRoute } from '@tanstack/react-router'

const productRegistation = () => {
  return <div>index</div>
}

export const Route = createFileRoute('/product-registration/')({
  component: productRegistation,
})
