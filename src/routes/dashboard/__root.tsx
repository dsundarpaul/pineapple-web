import SideNav from '@/components/shared/sidenav/SideNav'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { SignedIn, SignedOut, SignInButton, useAuth, UserButton } from '@clerk/clerk-react'
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RouteComponent,
})

function RouteComponent() {
  
  const { isSignedIn } = useAuth()

  const renderAuthOption = () => (
    <div className='flex space-x-4'>
      <SignedIn>
        <p>You are signed in</p>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <p>You are signed out</p>
        <SignInButton />
      </SignedOut>
    </div>
  )

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
            {renderAuthOption()}
          </div>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
