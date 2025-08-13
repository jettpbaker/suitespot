import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import TopBar from '@/components/home/TopBar'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'suitespot',
  description: 'Transform your WFH space into an inspiring workspace',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-full min-h-screen min-w-full`}
        >
          {/* <header className="p-4 flex gap-3 items-center border-b border-neutral-800">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header> */}

          <div className="flex-1 w-full h-full min-h-screen min-w-full z-10 bg-black rounded-lg">
            <TopBar />
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
