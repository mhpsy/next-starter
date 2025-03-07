import { BlogList } from '@/components/blog/blog-list'

// 注意：文件路径需要改为 [id]/page.tsx
export default function BlogPage() {
  return (
    <div className="p-4">
      <h1>博客文章</h1>
      <BlogList />
    </div>
  )
}
