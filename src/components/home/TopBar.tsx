import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function TopBar() {
  return (
    <div className="sticky top-0 z-50 mb-2 border border-white/10 bg-white/5 backdrop-blur-2xl">
      <div className="flex flex-col gap-4 py-4 px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-wider">suitespot</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Transform your WFH space into an inspiring workspace
          </p>
        </div>

        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  )
}
