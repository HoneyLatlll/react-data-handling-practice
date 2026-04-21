import { useEffect, useState } from 'react'

function Practice9() {
  return (
    <div className="page">
      <h1>실습 9: 로딩 + 에러 처리 4단계 렌더링</h1>
      <p className="page-subtitle">
        챕터 2-8. 로딩 상태 관리 · 2-9. 에러 처리 학습 후
      </p>

      <Problem1 />
      <hr style={{ margin: '32px 0', border: 0, borderTop: '1px solid var(--border)' }} />
      <Problem2 />
      <hr style={{ margin: '32px 0', border: 0, borderTop: '1px solid var(--border)' }} />
      <Problem3 />
      <hr style={{ margin: '32px 0', border: 0, borderTop: '1px solid var(--border)' }} />
      <Problem4 />
    </div>
  )
}

// ─────────────────────────────────────────────
// 문제 1: 로딩 state + try/finally 패턴
// ─────────────────────────────────────────────
// 데이터를 불러오는 동안 "로딩 중..." 문구를 표시하고, 로딩 해제는 반드시 finally에서 하세요.
// (try 블록 안에서만 setIsLoading(false)를 하면 에러 발생 시 영원히 로딩 중 상태에 빠집니다.)
// ─────────────────────────────────────────────
function Problem1() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function load() {
      // TODO 1-1: try/finally 구조로 감싸세요.
      //   - try: fetch로 /users를 가져와 setUsers에 저장
      //   - finally: setIsLoading(false)로 로딩 해제
      // URL: https://jsonplaceholder.typicode.com/users
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await res.json()
      setUsers(data)
      setIsLoading(false)
    }
    load()
  }, [])

  // TODO 1-2: isLoading이 true일 때 <div>⏳ 로딩 중...</div>을 early return 하세요.
  // HINT: if (isLoading) return <div className="exercise">⏳ 로딩 중...</div>

  return (
    <div className="exercise">
      <h3>문제 1: 로딩 중 표시하기 (try/finally)</h3>
      <p>데이터를 받는 동안 "로딩 중..." 메시지를 표시하고, try/finally로 로딩 상태를 안전하게 해제하세요.</p>

      <ul className="practice-list">
        {users.map((user) => (
          <li key={user.id}>
            <span>{user.name}</span>
            <span style={{ color: 'var(--text)', fontSize: 13 }}>{user.email}</span>
          </li>
        ))}
      </ul>

      <p className="expected">
        기대 결과: 페이지 진입 시 "⏳ 로딩 중..."이 먼저 보이고, 응답이 도착하면 사용자 10명이 표시됩니다.
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────
// 문제 2: response.ok 체크 + 에러 state
// ─────────────────────────────────────────────
// fetch는 404/500을 에러로 취급하지 않습니다! 반드시 response.ok를 확인해 직접 throw 하세요.
// 아래에서는 "정상 URL"과 "잘못된 URL"을 버튼으로 전환하며 에러 처리를 체험합니다.
// ─────────────────────────────────────────────
function Problem2() {
  const [useValidUrl, setUseValidUrl] = useState(true)
  const [post, setPost] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      setError(null)
      setPost(null)
      try {
        const url = useValidUrl
          ? 'https://jsonplaceholder.typicode.com/posts/1'
          : 'https://jsonplaceholder.typicode.com/invalid-endpoint-404'

        const res = await fetch(url)

        // TODO 2-1: res.ok가 false이면 throw new Error(...)로 에러를 던지세요.
        //   HINT: if (!res.ok) throw new Error(`요청 실패 (status: ${res.status})`)

        const data = await res.json()
        setPost(data)
      } catch (err) {
        // TODO 2-2: err.message를 setError에 저장해서 아래 에러 UI가 보이게 하세요.
      }
    }
    load()
  }, [useValidUrl])

  return (
    <div className="exercise">
      <h3>문제 2: 잘못된 URL에서 response.ok 체크하기</h3>
      <p>
        "정상 URL"에서는 1번 게시글을 보여주고, "잘못된 URL"로 전환하면 에러 메시지가 표시돼야 합니다.
      </p>

      <div className="toolbar">
        <button
          className={useValidUrl ? 'active' : ''}
          onClick={() => setUseValidUrl(true)}
        >
          ✅ 정상 URL
        </button>
        <button
          className={!useValidUrl ? 'active' : ''}
          onClick={() => setUseValidUrl(false)}
        >
          ❌ 잘못된 URL
        </button>
      </div>

      {error && (
        <div
          className="practice-card"
          style={{ borderColor: 'crimson', color: 'crimson' }}
        >
          ⚠️ {error}
        </div>
      )}

      {post && (
        <div className="practice-card">
          <h4 style={{ margin: '0 0 6px' }}>{post.title}</h4>
          <p style={{ fontSize: 14 }}>{post.body}</p>
        </div>
      )}

      <p className="expected">
        기대 결과: 정상 URL → 게시글 1번 표시, 잘못된 URL → "⚠️ 요청 실패 (status: 404)" 에러 메시지 표시.
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────
// 문제 3: 4단계 렌더링 (로딩 / 에러 / 빈 / 정상)
// ─────────────────────────────────────────────
// 실무 표준 패턴입니다. early return 순서는: ① 로딩 ② 에러 ③ 빈 데이터 ④ 정상
// ─────────────────────────────────────────────
function Problem3() {
  const [mode, setMode] = useState('success') // 'success' | 'error' | 'empty'
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      setIsLoading(true)
      setError(null)
      setPosts([])
      try {
        let url = 'https://jsonplaceholder.typicode.com/posts?_limit=5'
        if (mode === 'error') url = 'https://jsonplaceholder.typicode.com/invalid-404'
        if (mode === 'empty') url = 'https://jsonplaceholder.typicode.com/posts?userId=9999'

        const res = await fetch(url)
        if (!res.ok) throw new Error(`요청 실패 (status: ${res.status})`)
        const data = await res.json()
        setPosts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [mode])

  return (
    <div className="exercise">
      <h3>문제 3: 4단계 early return 완성하기</h3>
      <p>버튼으로 시나리오를 전환해 보세요. 아래 Content 영역에서 4단계 early return을 구현하세요.</p>

      <div className="toolbar">
        <button
          className={mode === 'success' ? 'active' : ''}
          onClick={() => setMode('success')}
        >
          ✅ 정상 (5개)
        </button>
        <button
          className={mode === 'error' ? 'active' : ''}
          onClick={() => setMode('error')}
        >
          ❌ 에러
        </button>
        <button
          className={mode === 'empty' ? 'active' : ''}
          onClick={() => setMode('empty')}
        >
          📭 빈 데이터
        </button>
      </div>

      <Content posts={posts} isLoading={isLoading} error={error} />

      <p className="expected">
        기대 결과:
        <br />- 정상: 5개 게시글 표시
        <br />- 에러: "⚠️ 요청 실패..." 메시지
        <br />- 빈 데이터: "📭 게시글이 없습니다" 메시지
        <br />- 전환 시 먼저 "⏳ 로딩 중..." 이 잠깐 보여야 함.
      </p>
    </div>
  )
}

function Content({ posts, isLoading, error }) {
  // TODO 3-1: isLoading이 true이면 <p>⏳ 로딩 중...</p>을 return 하세요.
  // TODO 3-2: error가 있으면 <p>⚠️ {error}</p>를 return 하세요.
  // TODO 3-3: posts.length === 0이면 <p>📭 게시글이 없습니다</p>를 return 하세요.
  // TODO 3-4: 마지막으로 posts를 ul > li로 렌더링 하세요.

  return <p style={{ color: 'var(--accent)' }}>TODO: Content를 완성하세요.</p>
}

// ─────────────────────────────────────────────
// 문제 4: 버튼 연타 방지 (disabled)
// ─────────────────────────────────────────────
// 네트워크 요청이 진행 중일 때는 버튼을 disabled 처리해서 중복 요청을 막으세요.
// ─────────────────────────────────────────────
function Problem4() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  async function loadUsers() {
    // TODO 4-1: 시작 시 setIsLoading(true), 끝(finally)에서 setIsLoading(false) 하세요.
    // TODO 4-2: try 안에서 fetch('https://jsonplaceholder.typicode.com/users?_limit=5')
    //            → json() → setUsers
    // (일부러 약간의 지연을 만들고 싶다면 await new Promise(r => setTimeout(r, 800)) 추가)
  }

  return (
    <div className="exercise">
      <h3>문제 4: 로딩 중엔 버튼 비활성화</h3>
      <p>
        "사용자 불러오기" 버튼을 연타해도 한 번에 하나의 요청만 보내지도록 disabled로 막으세요.
      </p>

      <div className="toolbar">
        {/* TODO 4-3: 버튼에 disabled={isLoading}과, 로딩 중엔 "불러오는 중..."으로 바뀌도록 작성하세요. */}
        {/* HINT: <button onClick={loadUsers} disabled={isLoading}>
                     {isLoading ? '불러오는 중...' : '사용자 불러오기'}
                 </button> */}
        <button onClick={loadUsers}>사용자 불러오기</button>
      </div>

      <ul className="practice-list">
        {users.map((user) => (
          <li key={user.id}>
            <span>{user.name}</span>
          </li>
        ))}
      </ul>

      <p className="expected">
        기대 결과: 버튼 클릭 시 "불러오는 중..."으로 바뀌며 비활성화되고, 응답 도착 후에야 다시 활성화됩니다.
      </p>
    </div>
  )
}

export default Practice9
