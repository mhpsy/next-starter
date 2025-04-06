import { Link } from '@/components/common/link'
import { Button } from '@/components/ui/button'
import { redirect } from '@/i18n/navigation'
import { auth } from '@/server/lib/auth'
import { use } from 'react'
import { SignButton } from './sign-button'

export default function Home() {
  const session = use(auth())
  if (!session) {
    redirect({ href: '/login', locale: 'en' })
  }
  return (
    <div className="items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Button variant="link" asChild>
        <Link href="/login">Login</Link>
      </Button>
      <Button variant="link" asChild>
        <Link href="/signup">Signup</Link>
      </Button>
      <div>
        session:
        {' '}
        <pre>
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
      <SignButton />
    </div>
  )
}
