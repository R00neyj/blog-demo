import type { Post } from '../data/samplePosts'

type PostListProps = {
  posts: Post[]
  onSelect: (post: Post) => void
}

const EXCERPT_LENGTH = 60

function getExcerpt(content: string) {
  const text = content.replace(/\s+/g, ' ').trim()
  return text.length > EXCERPT_LENGTH ? `${text.slice(0, EXCERPT_LENGTH)}…` : text
}

function formatDate(createdAt: string) {
  return new Date(createdAt).toLocaleDateString('ko-KR')
}

function PostList({ posts, onSelect }: PostListProps) {
  // 최신순: created_at 이 늦은 글이 위로
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  )

  return (
    <ul>
      {sortedPosts.map((post) => (
        <li key={post.id}>
          <button type="button" onClick={() => onSelect(post)}>
            <h2>{post.title}</h2>
            <p>
              {post.author} · {formatDate(post.created_at)}
            </p>
            <p>{getExcerpt(post.content)}</p>
          </button>
        </li>
      ))}
    </ul>
  )
}

export default PostList
