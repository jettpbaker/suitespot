import { User } from '@clerk/nextjs/server'
import Link from 'next/link'

export default function Sidebar({ user }: { user: User }) {
  return (
    <div className="min-h-full border-r border-neutral-800 py-4 px-8">
      <div>
        <h2 className="text-2xl font-bold">Hello {user.firstName}</h2>
      </div>
      <div>
        <Link href="/add">Add Product</Link>
      </div>
    </div>
  )
}
