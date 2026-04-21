import { useEffect, useState } from 'react'

function Practice15() {
  return (
    <div className="page">
      <h1>실습 15: POST / PATCH / DELETE로 CRUD 완성</h1>
      <p className="page-subtitle">
        챕터 4-1. POST · 4-2. PUT/PATCH · 4-3. DELETE 학습 후
      </p>

      <div
        className="practice-card"
        style={{ marginBottom: 16, fontSize: 13, color: 'var(--text)' }}
      >
        💡 JSONPlaceholder는 실제로 서버 데이터를 바꾸지 않고 "성공 응답"만 돌려줍니다. 이 실습에서는
        응답 객체를 받아 로컬 state를 업데이트하는 패턴에 집중하세요.
      </div>

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
// 문제 1: POST로 생성 후 목록 맨 앞에 추가
// ─────────────────────────────────────────────
// 서버에서 돌려준 createdPost를 받아 setPosts(prev => [createdPost, ...prev])로
// 기존 목록 맨 앞에 추가하세요. 폼은 제출 후 초기화합니다.
// ─────────────────────────────────────────────
function Problem1() {
  const [posts, setPosts] = useState([])
  const [form, setForm] = useState({ title: '', body: '' })

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then((res) => res.json())
      .then(setPosts)
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()

    // TODO 1-1: fetch POST 요청을 보내세요.
    //   URL: https://jsonplaceholder.typicode.com/posts
    //   method: 'POST'
    //   headers: { 'Content-Type': 'application/json' }
    //   body: JSON.stringify({ ...form, userId: 1 })
    // TODO 1-2: res.ok 체크 후, 응답 JSON을 createdPost로 받으세요.
    // TODO 1-3: setPosts(prev => [createdPost, ...prev])로 목록 맨 앞에 추가하세요.
    // TODO 1-4: setForm({ title: '', body: '' })로 폼을 초기화하세요.
  }

  return (
    <div className="exercise">
      <h3>문제 1: 새 게시글 작성 → 목록 맨 앞에 추가</h3>
      <p>폼을 제출하면 서버가 돌려준 id(예: 101)를 포함한 새 게시글이 목록 맨 위에 즉시 표시되어야 합니다.</p>

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 520 }}
      >
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="제목"
          required
        />
        <textarea
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
          placeholder="내용"
          rows={3}
          style={{
            padding: 8,
            border: '1px solid var(--border)',
            borderRadius: 6,
            background: 'var(--bg)',
            color: 'var(--text-h)',
            fontFamily: 'inherit',
            fontSize: 14,
          }}
          required
        />
        <button type="submit">작성</button>
      </form>

      <ul className="practice-list" style={{ marginTop: 12 }}>
        {posts.map((post) => (
          <li key={post.id}>
            <span>
              <strong>#{post.id}</strong> {post.title}
            </span>
          </li>
        ))}
      </ul>

      <p className="expected">
        기대 결과: 작성 버튼 클릭 시 폼이 비워지고, id가 101인 새 게시글이 목록 맨 앞에 추가됩니다.
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────
// 문제 2: PATCH로 인라인 수정 (editingId + map)
// ─────────────────────────────────────────────
// 편집 중인 게시글 id를 editingId로 추적하고, 저장 시 map으로 해당 항목만 교체하세요.
// ─────────────────────────────────────────────
function Problem2() {
  const [posts, setPosts] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({ title: '', body: '' })

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then((res) => res.json())
      .then(setPosts)
  }, [])

  function startEdit(post) {
    setEditingId(post.id)
    setEditForm({ title: post.title, body: post.body })
  }

  function cancelEdit() {
    setEditingId(null)
  }

  async function saveEdit(postId) {
    // TODO 2-1: PATCH 요청을 보내세요.
    //   URL: https://jsonplaceholder.typicode.com/posts/${postId}
    //   method: 'PATCH'
    //   headers: { 'Content-Type': 'application/json' }
    //   body: JSON.stringify(editForm)
    // TODO 2-2: res.ok 체크 후, 응답 JSON을 updated로 받으세요.
    // TODO 2-3: map으로 해당 id의 게시글만 { ...post, ...updated }로 교체하세요.
    //   HINT: setPosts(prev => prev.map(post => post.id === postId ? { ...post, ...updated } : post))
    // TODO 2-4: setEditingId(null)로 수정 모드를 종료하세요.
  }

  return (
    <div className="exercise">
      <h3>문제 2: 게시글 인라인 수정 (PATCH + map)</h3>
      <p>각 게시글의 "수정" 버튼을 눌러 제목·본문을 편집하고 저장하세요. 저장 시 해당 항목만 업데이트됩니다.</p>

      <ul className="practice-list">
        {posts.map((post) =>
          editingId === post.id ? (
            <li
              key={post.id}
              style={{ flexDirection: 'column', alignItems: 'stretch', gap: 6 }}
            >
              <input
                type="text"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              />
              <textarea
                value={editForm.body}
                onChange={(e) => setEditForm({ ...editForm, body: e.target.value })}
                rows={2}
                style={{
                  padding: 6,
                  border: '1px solid var(--border)',
                  borderRadius: 6,
                  background: 'var(--bg)',
                  color: 'var(--text-h)',
                  fontFamily: 'inherit',
                  fontSize: 13,
                }}
              />
              <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={() => saveEdit(post.id)}>저장</button>
                <button onClick={cancelEdit}>취소</button>
              </div>
            </li>
          ) : (
            <li key={post.id}>
              <span style={{ flex: 1 }}>
                <strong>#{post.id}</strong> {post.title}
              </span>
              <button onClick={() => startEdit(post)}>수정</button>
            </li>
          ),
        )}
      </ul>

      <p className="expected">
        기대 결과: "수정" 클릭 시 해당 항목만 인라인 편집 폼으로 바뀌고, "저장" 시 목록의 해당 항목만 새 값으로 교체됩니다.
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────
// 문제 3: DELETE — filter 방식 (로컬에서만 제거)
// ─────────────────────────────────────────────
// 서버에 DELETE 요청을 보낸 뒤, 로컬 배열에서 filter로 해당 항목만 제거하는 방식입니다.
// 네트워크 요청 1번으로 끝나지만, 다른 사용자의 변경사항은 반영되지 않습니다.
// ─────────────────────────────────────────────
function Problem3() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then((res) => res.json())
      .then(setPosts)
  }, [])

  async function handleDelete(postId) {
    // TODO 3-1: window.confirm('정말 삭제하시겠습니까?')가 false면 early return.
    // TODO 3-2: DELETE 요청을 보내세요.
    //   URL: https://jsonplaceholder.typicode.com/posts/${postId}
    //   method: 'DELETE'
    // TODO 3-3: res.ok 체크 후, filter로 해당 id가 아닌 것만 남기세요.
    //   HINT: setPosts(prev => prev.filter(post => post.id !== postId))
  }

  return (
    <div className="exercise">
      <h3>문제 3: 삭제 — filter 방식</h3>
      <p>"삭제" 버튼 클릭 시 확인 창을 띄우고, DELETE 요청 성공 시 로컬 목록에서만 제거하세요.</p>

      <ul className="practice-list">
        {posts.map((post) => (
          <li key={post.id}>
            <span>
              <strong>#{post.id}</strong> {post.title}
            </span>
            <button onClick={() => handleDelete(post.id)}>삭제</button>
          </li>
        ))}
      </ul>

      <p className="expected">
        기대 결과: 확인 창에서 "확인"을 누르면 해당 항목이 목록에서 사라집니다. 네트워크 탭에서 DELETE 요청이 한 번 보내집니다.
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────
// 문제 4: DELETE — Refetch 방식 (loadPosts 재호출)
// ─────────────────────────────────────────────
// 초기 로드 함수를 useEffect 바깥에 별도로 분리해 두고, 삭제 후 재호출로 목록을 통째로 갱신합니다.
// 실무에선 이 패턴이 기본입니다.
// ⚠️ JSONPlaceholder는 서버 상태를 실제로 변경하지 않으므로 refetch 시 원본 목록이 돌아옵니다.
//    이 실습에서는 "같은 함수를 다시 호출한다"는 패턴을 익히는 데 집중하세요.
// ─────────────────────────────────────────────
function Problem4() {
  const [posts, setPosts] = useState([])
  const [loadCount, setLoadCount] = useState(0)

  // TODO 4-1: loadPosts 함수를 정의하세요.
  //   - /posts?_limit=5 를 fetch 해서 setPosts에 저장
  //   - 호출 횟수를 확인할 수 있도록 setLoadCount(prev => prev + 1)도 함께 호출하세요.
  // HINT:
  //   async function loadPosts() {
  //     const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
  //     const data = await res.json()
  //     setPosts(data)
  //     setLoadCount(prev => prev + 1)
  //   }
  async function loadPosts() {
    // 여기에 구현하세요
  }

  useEffect(() => {
    loadPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleDelete(postId) {
    if (!window.confirm('정말 삭제하시겠습니까?')) return

    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      { method: 'DELETE' },
    )
    if (!res.ok) return

    // TODO 4-2: filter 대신 loadPosts()를 await으로 호출해 목록을 통째로 갱신하세요.
  }

  return (
    <div className="exercise">
      <h3>문제 4: 삭제 — Refetch 방식</h3>
      <p>
        DELETE 요청 후 <code>loadPosts()</code>를 다시 호출해 목록을 통째로 새로 받아오세요.
      </p>

      <div className="toolbar">
        <button onClick={loadPosts}>🔄 수동 새로고침</button>
        <span style={{ alignSelf: 'center', fontSize: 13 }}>
          loadPosts 호출 횟수: {loadCount}
        </span>
      </div>

      <ul className="practice-list">
        {posts.map((post) => (
          <li key={post.id}>
            <span>
              <strong>#{post.id}</strong> {post.title}
            </span>
            <button onClick={() => handleDelete(post.id)}>삭제</button>
          </li>
        ))}
      </ul>

      <p className="expected">
        기대 결과: 삭제 시 DELETE + GET 두 요청이 나갑니다. 호출 횟수 카운터가 1씩 올라갑니다.
        (JSONPlaceholder 특성상 GET 응답은 원본 그대로 돌아옵니다.)
      </p>
    </div>
  )
}

export default Practice15
