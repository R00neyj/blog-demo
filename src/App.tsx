import { useEffect, useState } from 'react'
import PostDetail from './components/PostDetail'
import PostList from './components/PostList'
import type { Post } from './data/samplePosts'
import { supabase } from './lib/supabase'
import './App.css'

function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

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
        setPosts(data)
      }
      setIsLoading(false)
    }

    loadPosts()
    return () => {
      ignore = true
    }
  }, [])

  function renderContent() {
    if (selectedPost) {
      return <PostDetail post={selectedPost} onBack={() => setSelectedPost(null)} />
    }
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
