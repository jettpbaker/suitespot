import { seedAction } from '@/actions/seed'

export default function Sandbox() {
  return (
    <div>
      <h1>Sandbox</h1>
      <br />
      <form action={seedAction}>
        <button type="submit">Seed</button>
      </form>
    </div>
  )
}
