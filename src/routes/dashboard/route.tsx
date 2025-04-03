import AuthOptions from '@/components/shared/AuthOptions/AuthOptions'
import SideNav from '@/components/shared/sidenav/SideNav'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useZustandStore } from '@/store/context'
import { useAuth } from '@clerk/clerk-react'
import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isSignedIn } = useAuth()
  const selectedProduct = useZustandStore(state => state.selectedProduct)

  const location = useLocation()

  console.log(location.pathname)
  
  return (
    <SidebarProvider className='bg-red-700'>
      { isSignedIn && <SideNav /> }
      <SidebarInset>
        <div className='p-4 bg-gradient-to-tr from-slate-50 via-slate-50 to-yellow-100 h-full'>
          <div className='flex w-full justify-between items-center pb-2'>
            <div className='flex'>
              { isSignedIn && <SidebarTrigger className="-ml-1" />}
              <div className='text-lg'>Pineapple AI 🍍</div>
              {selectedProduct}
            </div>
            <AuthOptions hideProductSelect={location.pathname === '/dashboard'} />
          </div>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
