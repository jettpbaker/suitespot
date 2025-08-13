import { SignInButton } from '@clerk/nextjs'
import { Button } from './ui/button'

export default function SignInComponent() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <SignInButton>
        <Button className="cursor-pointer">Sign in</Button>
      </SignInButton>
    </div>
  )
}
