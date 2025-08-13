import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
        <div className="mb-4 text-center">
          <h1 className="text-xl font-semibold tracking-tight text-white">
            Sign in
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Access your SuiteSpot lists
          </p>
        </div>
        <SignIn
          appearance={{
            elements: {
              card: 'bg-transparent shadow-none',
              formButtonPrimary: 'rounded-lg',
            },
          }}
        />
      </div>
    </div>
  )
}
