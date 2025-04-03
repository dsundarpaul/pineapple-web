import { Particles } from '@/components/magicui/particles'
import AuthOptions from '@/components/shared/AuthOptions/AuthOptions'
import SideNav from '@/components/shared/sidenav/SideNav'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useZustandStore } from '@/store/context'
import { useAuth } from '@clerk/clerk-react'
import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router'

export const Route = createFileRoute('/home')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isSignedIn } = useAuth()
  const selectedProduct = useZustandStore(state => state.selectedProduct)

  const location = useLocation()

  console.log(location.pathname)
  
  return (
    <SidebarProvider className=''>
      { isSignedIn && <SideNav /> }
      <SidebarInset>
        {/* <div className='bg-gradient-to-tr from-slate-50 via-slate-50 to-yellow-100 h-full'> */}
        <div>
          <div className='px-4 py-2'>
            <div className='flex w-full justify-between items-center pb-2'>
              <div className='flex'>
                { isSignedIn && <SidebarTrigger className="-ml-1" />}
                <div className='text-lg'>Pineapple AI 🍍</div>
                {selectedProduct}
              </div>
              <AuthOptions hideProductSelect={location.pathname === '/HOME'} />
            </div>
          </div>
          <Separator />
          <div className='p-4'>
            <Outlet />
          </div>
          <Particles
            className="absolute inset-0 z-0"
            quantity={100}
            ease={10}
            color={'#f9fafb'}
            refresh
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
