import { useState } from 'react'

function Practice3() {
  return (
    <div className="page">
      <h1>실습 3: 조건부 렌더링과 key의 중요성</h1>
      <p className="page-subtitle">
        챕터 1-4. key를 써야 하는 이유 · 1-5. 조건부 렌더링 패턴 학습 후
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
// 문제 1: 삼항 연산자 — 둘 중 하나 보여주기
// ─────────────────────────────────────────────
// "A 아니면 B"는 삼항 연산자 ? : 로 표현합니다.
// ─────────────────────────────────────────────
function Problem1() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="exercise">
      <h3>문제 1: 로그인 상태에 따라 버튼 바꾸기</h3>
      <p>
        <code>isLoggedIn</code>이 true면 "로그아웃" 버튼과 "환영합니다!" 메시지,
        false면 "로그인" 버튼과 "로그인이 필요합니다" 메시지를 보여주세요.
      </p>

      <div className="practice-card" style={{ marginBottom: 12 }}>
        {/* TODO 1-1: isLoggedIn 값에 따라 메시지를 삼항 연산자로 분기하세요. */}
        {/* HINT: {isLoggedIn ? '환영합니다!' : '로그인이 필요합니다'} */}
        <p>{/* 여기에 조건부 메시지 */}</p>
      </div>

      <div>
        {/* TODO 1-2: isLoggedIn 값에 따라 "로그아웃" / "로그인" 버튼을 삼항 연산자로 렌더링하세요. */}
        {/* HINT: 버튼 클릭 시 setIsLoggedIn(!isLoggedIn)으로 상태를 토글하세요. */}
        {/* 여기에 조건부 버튼 */}
      </div>

      <p className="expected">
        기대 결과: 버튼을 클릭할 때마다 "로그인" ↔ "로그아웃" 버튼이 교차하고, 메시지도 함께 바뀝니다.
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────
// 문제 2: && 연산자 — "있을 때만" 보여주기 (0 함정 주의!)
// ─────────────────────────────────────────────
// {count && <Badge />} 처럼 쓰면, count가 0일 때 화면에 숫자 "0"이 찍힙니다.
// && 왼쪽에는 반드시 "boolean"이 오도록 `count > 0` 식으로 명시적 비교를 쓰세요.
// ─────────────────────────────────────────────
function Problem2() {
  const [count, setCount] = useState(0)

  return (
    <div className="exercise">
      <h3>문제 2: 알림 뱃지 (0일 때 "0"이 찍히면 안 됨)</h3>
      <p>
        <code>count</code>가 0보다 클 때만 알림 뱃지를 표시하세요.
        ⚠️ <code>{`{count && ...}`}</code>처럼 쓰면 count가 0일 때 화면에 "0"이 그대로 찍히는 함정에 빠집니다.
      </p>

      <div className="toolbar">
        <button onClick={() => setCount(count + 1)}>+1</button>
        <button onClick={() => setCount(Math.max(0, count - 1))}>-1</button>
        <button onClick={() => setCount(0)}>0으로 리셋</button>
      </div>

      <div className="practice-card">
        <span>알림</span>
        {/* TODO 2-1: count가 0보다 클 때만 <span className="badge">{count}</span>을 표시하세요. */}
        {/* HINT: {count > 0 && <span className="badge">{count}</span>} */}
        {/* ❌ 잘못된 예: {count && <span className="badge">{count}</span>}  → count가 0일 때 "0"이 찍힙니다. */}
        {/* 여기에 조건부 뱃지 */}
      </div>

      <p className="expected">
        기대 결과: count가 1 이상일 때만 숫자 뱃지가 보이고, 0일 때는 뱃지 자체가 숨겨집니다. ("0" 글자도 보이면 안 됩니다)
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────
// 문제 3: early return — 예외 먼저 처리, 정상 케이스는 뒤로
// ─────────────────────────────────────────────
// 조건이 많으면 JSX 안에 삼항을 중첩하지 말고, 함수 첫머리에서 early return 하세요.
// ─────────────────────────────────────────────
function Problem3() {
  const [userIndex, setUserIndex] = useState(0)
  const users = [
    null, // 0: 사용자 없음
    { name: '홍길동', email: 'hong@example.com', isActive: true }, // 1: 정상
    { name: '김철수', email: 'kim@example.com', isActive: false }, // 2: 비활성
  ]
  const user = users[userIndex]

  return (
    <div className="exercise">
      <h3>문제 3: UserProfile을 early return으로 작성</h3>
      <p>
        아래 <code>UserProfile</code> 컴포넌트를 완성하세요. 예외 케이스부터 early return 하고, 정상 케이스는 맨 아래에 작성합니다.
      </p>

      <div className="toolbar">
        <button
          className={userIndex === 0 ? 'active' : ''}
          onClick={() => setUserIndex(0)}
        >
          user: null
        </button>
        <button
          className={userIndex === 1 ? 'active' : ''}
          onClick={() => setUserIndex(1)}
        >
          정상 사용자
        </button>
        <button
          className={userIndex === 2 ? 'active' : ''}
          onClick={() => setUserIndex(2)}
        >
          비활성 사용자
        </button>
      </div>

      <div className="practice-card">
        <UserProfile user={user} />
      </div>

      <p className="expected">
        기대 결과:
        <br />- user가 null이면 "사용자를 찾을 수 없습니다."
        <br />- isActive가 false면 "비활성화된 사용자입니다."
        <br />- 그 외에는 이름과 이메일을 표시합니다.
      </p>
    </div>
  )
}

function UserProfile({ user }) {
  // TODO 3-1: user가 null/undefined이면 "사용자를 찾을 수 없습니다." 메시지를 return하세요.
  // HINT: if (!user) return <p>사용자를 찾을 수 없습니다.</p>

  // TODO 3-2: user.isActive가 false면 "비활성화된 사용자입니다." 메시지를 return하세요.

  // TODO 3-3: 정상 케이스에서 user.name과 user.email을 표시하세요.
  //   (예: <h4>{user.name}</h4><p>{user.email}</p>)
  return <p style={{ color: 'var(--accent)' }}>TODO: UserProfile을 구현하세요.</p>
}

// ─────────────────────────────────────────────
// 문제 4: id key vs index key — 리스트 버그 체험
// ─────────────────────────────────────────────
// TodoItem은 자체적으로 checked 상태를 가집니다.
// key를 index로 쓰면 항목이 추가/삭제될 때 체크 상태가 엉뚱한 항목에 남는 버그가 생깁니다.
// key를 todo.id로 바꾸면 문제가 해결됩니다.
// ─────────────────────────────────────────────
function Problem4() {
  const [todos, setTodos] = useState([
    { id: 1, text: '운동하기' },
    { id: 2, text: '책 읽기' },
    { id: 3, text: '코딩하기' },
  ])

  function addFirst() {
    const newId = Math.max(0, ...todos.map((t) => t.id)) + 1
    setTodos([{ id: newId, text: `새 할 일 #${newId}` }, ...todos])
  }

  function removeFirst() {
    setTodos(todos.slice(1))
  }

  return (
    <div className="exercise">
      <h3>문제 4: key를 올바르게 설정해서 체크 상태 버그 고치기</h3>
      <p>
        아래 목록의 체크박스 중 하나를 체크한 뒤, "맨 앞에 추가" 또는 "맨 앞 삭제" 버튼을 눌러 보세요.
        지금은 체크 상태가 엉뚱한 항목으로 옮겨갑니다. key를 고쳐서 버그를 해결하세요.
      </p>

      <div className="toolbar">
        <button onClick={addFirst}>맨 앞에 추가</button>
        <button onClick={removeFirst}>맨 앞 삭제</button>
      </div>

      <ul className="practice-list">
        {/* TODO 4-1: 아래 map의 key를 index에서 todo.id로 바꾸세요. */}
        {/* HINT: key={index}  →  key={todo.id} */}
        {todos.map((todo, index) => (
          <TodoItem key={index} todo={todo} />
        ))}
      </ul>

      <p className="expected">
        기대 결과: key를 todo.id로 바꾸면, 항목이 추가·삭제돼도 체크 상태가 원래 항목에 그대로 유지됩니다.
      </p>
    </div>
  )
}

function TodoItem({ todo }) {
  const [checked, setChecked] = useState(false)

  return (
    <li>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <span>{todo.text}</span>
      </label>
      {checked && <span className="badge">체크됨</span>}
    </li>
  )
}

export default Practice3
