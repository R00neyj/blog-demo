import { createClient } from '@supabase/supabase-js'

// .env.local 에서 읽음 (Vite 는 VITE_ 로 시작하는 변수만 브라우저에 노출)
// import.meta.env 의 값은 타입이 정해져 있지 않아서 string | undefined 로 명시
const supabaseUrl: string | undefined = import.meta.env.VITE_SUPABASE_URL
const supabaseKey: string | undefined = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

const missing: string[] = []
if (!supabaseUrl) missing.push('VITE_SUPABASE_URL')
if (!supabaseKey) missing.push('VITE_SUPABASE_PUBLISHABLE_KEY')

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    `.env.local 에 값이 비어 있습니다: ${missing.join(', ')}. 값을 채운 뒤 개발 서버를 다시 시작하세요.`,
  )
}

export const supabase = createClient(supabaseUrl, supabaseKey)
