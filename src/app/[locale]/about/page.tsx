import { getHello } from '@/app/api/hello'
import { getTest } from '@/app/api/test'
import { useTranslations } from 'next-intl'
import { use } from 'react'

export default function AboutPage() {
  const fetchData = async () => {
    const hello = await getHello()
    const test = await getTest()
    return { hello, test }
  }

  const { hello, test } = use(fetchData())

  const t = useTranslations('HomePage')
  return (
    <div>
      About
      <div>
        <div>{t('title')}</div>
        <div>{t('goto about')}</div>
        <div>{JSON.stringify(hello)}</div>
        <div>{JSON.stringify(test)}</div>

      </div>

    </div>
  )
}
