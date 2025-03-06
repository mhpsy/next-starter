import { getHello } from '@/api/hello'
import { getTest } from '@/api/test'
import { BlogList } from '@/components/blog/BlogList'
import Image from 'next/image'

export default async function Home() {
  const hello = await getHello()
  const test = await getTest()
  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>{JSON.stringify(hello)}</div>
      <div>{JSON.stringify(test)}</div>
      <BlogList />
    </div>
  )
}
