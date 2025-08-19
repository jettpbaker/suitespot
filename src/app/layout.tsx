import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import TopBar from '@/components/home/TopBar'
import { Toaster } from '@/components/ui/sonner'

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
      <html lang="en" className="dark h-full">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-full min-h-full min-w-full`}
          style={{ '--topbar-height': '93px' } as React.CSSProperties}
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

          <div className="w-full h-full min-h-full min-w-full bg-black">
            <TopBar />
            <main
              className="w-full h-full"
              style={{ paddingTop: 'var(--topbar-height)' }}
            >
              {children}
            </main>
            <Toaster />
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
