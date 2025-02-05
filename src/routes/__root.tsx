import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent
})

function RootComponent() {
  return (
    <>
      <div className='text-lg'>This is __root Pineapple AI 🍍</div>
      <div className='flex space-x-4 px-4'>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/event-analyzer'>/event-analyzer</Link>
        <Link to='/product-registration'>/product-registration</Link>
      </div>
      <Outlet />
    </>
  )
}
