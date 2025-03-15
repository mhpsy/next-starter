import { Link } from '@/i18n/navigation'
import { Button } from '../ui/button'

export function BlogList() {
  return (
    <div>
      {
        Array.from({ length: 10 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>
            <Button variant="link" asChild>
              <Link href={`/blog/${index}`}>
                Blog
                {index}
              </Link>
            </Button>
          </div>
        ))
      }
    </div>
  )
}

export default BlogList
