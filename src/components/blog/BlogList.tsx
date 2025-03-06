import { Link } from '@/i18n/navigation'

export function BlogList() {
  return (
    <div>
      {
        Array.from({ length: 10 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>
            <Link href={`/blog/${index}`}>
              Blog
              {index}
            </Link>
          </div>
        ))
      }
    </div>
  )
}

export default BlogList
