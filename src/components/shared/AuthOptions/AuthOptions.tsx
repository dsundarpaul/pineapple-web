import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react"
import { Link } from "@tanstack/react-router"

type AuthOptionsProps = {
  inLanginPage?: boolean
}

const AuthOptions = ({ inLanginPage = false }: AuthOptionsProps) => {
  const { user } = useUser()
  return (
    <div className='flex space-x-4'>
      <SignedIn>
        <div className="flex items-center gap-4">
          {user?.fullName}
          <UserButton />
          {inLanginPage && <Link to='/dashboard'><Button>Dashboard</Button></Link> }
        </div>
      </SignedIn>
      <SignedOut>
        <p>You are signed out</p>
        <SignInButton />
      </SignedOut>
    </div>
  )
}

export default AuthOptions