import { useState } from 'react'
import type { SubmitEvent } from 'react'
import type { Post } from '../data/samplePosts'
import { supabase } from '../lib/supabase'

type PostDetailProps = {
  post: Post
  onBack: () => void
  onDeleted: () => void
}

function formatDate(createdAt: string) {
  return new Date(createdAt).toLocaleDateString('ko-KR')
}

function PostDetail({ post, onBack, onDeleted }: PostDetailProps) {
  const [isConfirming, setIsConfirming] = useState(false)
  const [password, setPassword] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // CSS 없이 줄바꿈을 살리기 위해 빈 줄 기준으로 문단을 나눔
  const paragraphs = post.content.split(/\n+/)

  function cancelDelete() {
    setIsConfirming(false)
    setPassword('')
    setErrorMessage(null)
  }

  async function handleDelete(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isDeleting) return

    if (!password) {
      setErrorMessage('비밀번호를 입력해 주세요')
      return
    }

    setErrorMessage(null)
    setIsDeleting(true)
    // 비밀번호가 맞으면 true, 틀리면 false 를 돌려줌
    const { data, error } = await supabase
      .rpc('delete_post', { p_post_id: post.id, p_password: password })
      .overrideTypes<boolean, { merge: false }>()
    setIsDeleting(false)

    if (error) {
      setErrorMessage(`삭제하지 못했습니다: ${error.message}`)
      return
    }
    if (!data) {
      setErrorMessage('비밀번호가 맞지 않습니다')
      return
    }
    onDeleted()
  }

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

      <div className="post-delete">
        {isConfirming ? (
          <form onSubmit={handleDelete} noValidate>
            <label>
              글 비밀번호
              <input
                type="password"
                value={password}
                autoComplete="current-password"
                autoFocus
                disabled={isDeleting}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            {errorMessage && <p role="alert">{errorMessage}</p>}
            <div className="post-delete-actions">
              <button type="button" onClick={cancelDelete} disabled={isDeleting}>
                취소
              </button>
              <button type="submit" disabled={isDeleting}>
                {isDeleting ? '삭제 중...' : '삭제하기'}
              </button>
            </div>
          </form>
        ) : (
          <button type="button" onClick={() => setIsConfirming(true)}>
            글 삭제
          </button>
        )}
      </div>
    </article>
  )
}

export default PostDetail
