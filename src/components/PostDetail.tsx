import type { Post } from '../data/samplePosts'

type PostDetailProps = {
  post: Post
  onBack: () => void
}

function formatDate(createdAt: string) {
  return new Date(createdAt).toLocaleDateString('ko-KR')
}

function PostDetail({ post, onBack }: PostDetailProps) {
  // CSS 없이 줄바꿈을 살리기 위해 빈 줄 기준으로 문단을 나눔
  const paragraphs = post.content.split(/\n+/)

  return (
    <article>
      <button type="button" onClick={onBack}>
        목록으로
      </button>
      <h2>{post.title}</h2>
      <p>
        {post.author} · {formatDate(post.created_at)}
      </p>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </article>
  )
}

export default PostDetail
