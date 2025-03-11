import { getHello } from '@/api/hello'
import { getTest } from '@/api/test'
import { BlogList } from '@/components/blog/blog-list'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { use } from 'react'

export default function Home() {
  const fetchData = async () => {
    const hello = await getHello()
    const test = await getTest()
    return { hello, test }
  }

  const { hello, test } = use(fetchData())

  const t = useTranslations('HomePage')
  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>{t('title')}</div>
      <div>{t('goto about')}</div>
      <div>{JSON.stringify(hello)}</div>
      <div>{JSON.stringify(test)}</div>
      <Button variant="link" asChild>
        <Link href="/components">Components</Link>
      </Button>
      <BlogList />
    </div>
  )
}
