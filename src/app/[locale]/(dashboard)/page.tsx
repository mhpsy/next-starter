import { Link } from '@/components/common/link'
import { Button } from '@/components/ui/button'
import { SignButton } from './sign-button'

export default function Home() {
  return (
    <div className="items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Button variant="link" asChild>
        <Link href="/login">Login</Link>
      </Button>
      <Button variant="link" asChild>
        <Link href="/signup">Signup</Link>
      </Button>
      <SignButton />
    </div>
  )
}
