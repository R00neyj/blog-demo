import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { supabase } from '../lib/supabase'

type PostFormProps = {
  onSaved: () => void
  onClose: () => void
}

// DB 의 insert 정책과 같은 글자 수 제한
const TITLE_MAX = 100
const AUTHOR_MAX = 30
const CONTENT_MAX = 5000

function PostForm({ onSaved, onClose }: PostFormProps) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSaved, setIsSaved] = useState(false)

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSaving) return

    setErrorMessage(null)
    setIsSaved(false)

    // 공백만 입력한 칸도 빈 칸으로 봄
    const trimmedTitle = title.trim()
    const trimmedAuthor = author.trim()
    const trimmedContent = content.trim()

    const emptyFields: string[] = []
    if (!trimmedTitle) emptyFields.push('제목')
    if (!trimmedAuthor) emptyFields.push('닉네임')
    if (!trimmedContent) emptyFields.push('내용')

    if (emptyFields.length > 0) {
      setErrorMessage(`빈 칸이 있습니다: ${emptyFields.join(', ')}`)
      return
    }

    setIsSaving(true)
    const { error } = await supabase
      .from('posts')
      .insert({ title: trimmedTitle, content: trimmedContent, author: trimmedAuthor })
    setIsSaving(false)

    if (error) {
      setErrorMessage(`저장하지 못했습니다: ${error.message}`)
      return
    }

    setTitle('')
    setAuthor('')
    setContent('')
    setIsSaved(true)
    onSaved()
  }

  return (
    <form className="post-form" onSubmit={handleSubmit} noValidate>
      <h2>새 글 쓰기</h2>

      <label>
        제목
        <input
          type="text"
          value={title}
          maxLength={TITLE_MAX}
          disabled={isSaving}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>

      <label>
        닉네임
        <input
          type="text"
          value={author}
          maxLength={AUTHOR_MAX}
          disabled={isSaving}
          onChange={(event) => setAuthor(event.target.value)}
        />
      </label>

      <label>
        내용
        <textarea
          value={content}
          rows={12}
          maxLength={CONTENT_MAX}
          disabled={isSaving}
          onChange={(event) => setContent(event.target.value)}
        />
      </label>
      <p className="post-form-count">
        {content.length} / {CONTENT_MAX}
      </p>

      {errorMessage && (
        <p className="post-form-error" role="alert">
          {errorMessage}
        </p>
      )}
      {isSaved && (
        <p className="post-form-saved" role="status">
          저장했습니다
        </p>
      )}

      <div className="post-form-actions">
        <button type="button" onClick={onClose} disabled={isSaving}>
          닫기
        </button>
        <button type="submit" disabled={isSaving}>
          {isSaving ? '저장 중...' : '저장'}
        </button>
      </div>
    </form>
  )
}

export default PostForm
