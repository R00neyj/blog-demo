import { useEffect, useState } from 'react'
import PostDetail from './components/PostDetail'
import PostForm from './components/PostForm'
import PostList from './components/PostList'
import type { Post } from './data/samplePosts'
import { supabase } from './lib/supabase'
import './App.css'

function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [isWriting, setIsWriting] = useState(false)
  // 값이 바뀔 때마다 목록을 다시 불러옴
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    // 화면이 사라진 뒤 응답이 오면 state 를 바꾸지 않도록 표시
    let ignore = false

    async function loadPosts() {
      const { data, error } = await supabase
        .from('posts')
        .select()
        .order('created_at', { ascending: false })
        .overrideTypes<Post[], { merge: false }>()

      if (ignore) return
      if (error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage(null)
        setPosts(data)
      }
      setIsLoading(false)
    }

    loadPosts()
    return () => {
      ignore = true
    }
  }, [reloadKey])

  function renderContent() {
    if (selectedPost) {
      return <PostDetail post={selectedPost} onBack={() => setSelectedPost(null)} />
    }
    return (
      <>
        {isWriting ? (
          <PostForm
            onSaved={() => setReloadKey((key) => key + 1)}
            onClose={() => setIsWriting(false)}
          />
        ) : (
          <button type="button" className="write-button" onClick={() => setIsWriting(true)}>
            글쓰기
          </button>
        )}
        {renderPosts()}
      </>
    )
  }

  function renderPosts() {
    if (isLoading) return <p>불러오는 중...</p>
    if (errorMessage) return <p>{errorMessage}</p>
    if (posts.length === 0) return <p>아직 글이 없습니다</p>
    return <PostList posts={posts} onSelect={setSelectedPost} />
  }

  return (
    <>
      <header>
        <h1>노트 한 장</h1>
        <p>공부하며 정리한 개념과 메모를 모아두는 곳</p>
      </header>

      <main>{renderContent()}</main>
    </>
  )
}

export default App
