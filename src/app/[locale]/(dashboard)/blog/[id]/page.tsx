export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <div className="p-4">
      <h1>博客文章</h1>
      <p>
        文章ID:
        {id}
      </p>
    </div>
  )
}
