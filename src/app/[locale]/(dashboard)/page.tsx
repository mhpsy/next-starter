import { Link } from '@/components/common/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Button variant="link" asChild>
        <Link href="/handle_excel">handleExcel</Link>
      </Button>
      <Button variant="link" asChild>
        <Link href="/login">Login</Link>
      </Button>
      <Button variant="link" asChild>
        <Link href="/register">Register</Link>
      </Button>
    </div>
  )
}
