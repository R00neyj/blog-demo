import { useState } from 'react'
import PostDetail from './components/PostDetail'
import PostList from './components/PostList'
import { samplePosts, type Post } from './data/samplePosts'
import './App.css'

function App() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  return (
    <>
      <header>
        <h1>노트 한 장</h1>
        <p>공부하며 정리한 개념과 메모를 모아두는 곳</p>
      </header>

      <main>
        {/* 선택된 글이 있으면 상세, 없으면 목록 */}
        {selectedPost ? (
          <PostDetail post={selectedPost} onBack={() => setSelectedPost(null)} />
        ) : (
          <PostList posts={samplePosts} onSelect={setSelectedPost} />
        )}
      </main>
    </>
  )
}

export default App
