export default function BlogPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div className="p-4">
      <h1>博客文章</h1>
      <p>
        文章ID:
        {params.id}
      </p>
    </div>
  )
}
