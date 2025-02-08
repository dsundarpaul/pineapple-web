import SideNav from '@/components/shared/sidenav/SideNav'
import { Button } from '@/components/ui/button'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent
})

function RootComponent() {
  return (
    <div className='flex w-full h-screen'>
      <SideNav />
      <div className='flex flex-col w-full h-full p-4'>
        <div className='text-lg'>This is __root Pineapple AI 🍍</div>
        <div className='flex space-x-4 px-4'>
          <Link to='/'>
            <Button variant={'link'} size={'sm'}>
            Home
            </Button>
          </Link>
          <Link to='/dashboard'>Dashboard</Link>
          <Link to='/event-analyzer'>/event-analyzer</Link>
          <Link to='/product-registration'>/product-registration</Link>
        </div>
        <Outlet />
      </div>
    </div>
  )
}
