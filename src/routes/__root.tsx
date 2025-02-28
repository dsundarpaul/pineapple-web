import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent
})

function RootComponent() {
  return (
    <div>
      <div className='p-3'>
        <Outlet />
      </div>
    </div>
  )
}