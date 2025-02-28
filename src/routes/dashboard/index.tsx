import { createFileRoute } from '@tanstack/react-router'
import SideNav from '@/components/shared/sidenav/SideNav'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useAuth } from '@clerk/clerk-react'
import AuthOptions from '@/components/shared/AuthOptions/AuthOptions'

export const Route = createFileRoute('/dashboard/')({
  component: Dashboard,
})

function Dashboard() {
  const { isSignedIn } = useAuth()

  return (
    <SidebarProvider>
      { isSignedIn && <SideNav /> }
      <SidebarInset>
        <div className='p-4'>
          <div className='flex w-full justify-between items-center'>
            <div className='flex'>
              { isSignedIn && <SidebarTrigger className="-ml-1" />}
              <div className='text-lg'>Pineapple AI 🍍</div>
            </div>
            <AuthOptions />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}