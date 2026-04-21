import { useState } from 'react'

function Practice8() {
  return (
    <div className="page">
      <h1>실습 8: useState Lazy 초기화</h1>
      <p className="page-subtitle">챕터 2-7. useState 콜백 함수 - Lazy 초기화 학습 후</p>

      <Problem1 />
      <hr style={{ margin: '32px 0', border: 0, borderTop: '1px solid var(--border)' }} />
      <Problem2 />
      <hr style={{ margin: '32px 0', border: 0, borderTop: '1px solid var(--border)' }} />
      <Problem3 />
    </div>
  )
}

// ─────────────────────────────────────────────
// 문제 1: 비싼 계산을 Lazy 초기화로 최적화
// ─────────────────────────────────────────────
// useState(값)의 괄호 안은 "컴포넌트가 렌더링될 때마다" 평가됩니다.
// 결과는 2번째 렌더링부터는 버려지지만, 함수 호출 자체는 매번 일어나므로 낭비!
// useState(() => ...) 형태로 함수를 전달하면 최초 1번만 실행됩니다.
// ─────────────────────────────────────────────
function expensiveCalculation() {
  console.log('🧮 [Problem1] expensiveCalculation 실행됨!')
  let sum = 0
  for (let i = 0; i < 100_000; i++) sum += i
  return sum
}

function Problem1() {
  const [count, setCount] = useState(0)

  // TODO 1-1: 아래 useState를 Lazy 초기화(() => expensiveCalculation())로 바꾸세요.
  //   - 바꾸기 전: 버튼을 누를 때마다 콘솔에 "🧮 [Problem1]..." 로그가 찍힙니다.
  //   - 바꾼 후: 최초 1번만 찍히고, 이후 버튼을 눌러 리렌더링해도 더 이상 찍히지 않습니다.
  const [total] = useState(expensiveCalculation())

  return (
    <div className="exercise">
      <h3>문제 1: expensiveCalculation을 Lazy 초기화로 바꾸기</h3>
      <p>
        개발자 도구 → Console을 열고 "+1" 버튼을 여러 번 눌러 보세요.
        수정 전엔 리렌더링마다 로그가 찍히지만, 수정 후엔 처음 1번만 찍혀야 합니다.
      </p>

      <div className="practice-card" style={{ fontSize: 18, textAlign: 'center' }}>
        초기 계산 결과: {total.toLocaleString()}
        <br />
        <small style={{ fontSize: 13 }}>count: {count}</small>
      </div>

      <div className="toolbar" style={{ marginTop: 12 }}>
        <button onClick={() => setCount((prev) => prev + 1)}>+1 (리렌더링)</button>
      </div>

      <p className="expected">
        기대 결과: Console에 "🧮 [Problem1] expensiveCalculation 실행됨!" 로그가
        최초 1번(Strict Mode에선 2번)만 찍혀야 합니다.
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────
// 문제 2: localStorage 읽기 최적화
// ─────────────────────────────────────────────
// localStorage 접근은 동기 I/O라 예상보다 비쌉니다. useState 초기값으로 넣으면
// 매 렌더링마다 localStorage.getItem이 호출돼요. Lazy 초기화로 1번만 읽도록 하세요.
// ─────────────────────────────────────────────
const STORAGE_KEY = 'practice8_nickname'

function readNicknameFromStorage() {
  console.log('💾 [Problem2] localStorage에서 읽음!')
  return localStorage.getItem(STORAGE_KEY) ?? ''
}

function Problem2() {
  // TODO 2-1: 아래 useState를 Lazy 초기화로 바꾸세요.
  //   ❌ useState(readNicknameFromStorage())  → 리렌더링마다 localStorage 접근
  //   ✅ useState(() => readNicknameFromStorage())  → 첫 렌더링에만 접근
  const [nickname, setNickname] = useState(readNicknameFromStorage())

  function save() {
    localStorage.setItem(STORAGE_KEY, nickname)
    alert('저장되었습니다!')
  }

  function clearStorage() {
    localStorage.removeItem(STORAGE_KEY)
    setNickname('')
  }

  return (
    <div className="exercise">
      <h3>문제 2: localStorage 초기값을 Lazy 초기화로</h3>
      <p>
        닉네임을 저장하고 새로고침해 보세요. 입력할 때마다 Console에 "💾 [Problem2]..." 로그가 계속 찍히면
        아직 Lazy 초기화가 안 된 상태입니다. 수정 후에는 최초 1번만 찍혀야 합니다.
      </p>

      <div className="toolbar">
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임"
          style={{ flex: 1, minWidth: 200 }}
        />
        <button onClick={save}>저장</button>
        <button onClick={clearStorage}>삭제</button>
      </div>

      <p className="expected">
        기대 결과: 입력창에 타이핑해도 "💾 [Problem2] localStorage에서 읽음!" 로그가
        더 이상 찍히지 않습니다. (최초 진입 시에만 찍힘)
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────
// 문제 3: 큰 배열 초기화를 Lazy로
// ─────────────────────────────────────────────
// 10 x 10 격자를 만드는 초기화 로직도 리렌더링마다 새 배열을 만들면 낭비입니다.
// (결과는 버려지지만 GC 부담은 남음)
// ─────────────────────────────────────────────
function createGrid() {
  console.log('🟦 [Problem3] 10x10 그리드 생성!')
  return Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => 0))
}

function Problem3() {
  const [tick, setTick] = useState(0)

  // TODO 3-1: 아래 useState(createGrid())를 Lazy 초기화로 바꾸세요.
  const [grid] = useState(createGrid())

  return (
    <div className="exercise">
      <h3>문제 3: 10x10 그리드 초기화를 Lazy로</h3>
      <p>
        "리렌더링" 버튼을 눌러도 그리드는 그대로여야 합니다. 콘솔 로그로 createGrid 호출 횟수를 확인하세요.
      </p>

      <div
        className="practice-card"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(10, 20px)',
          gap: 2,
          justifyContent: 'center',
        }}
      >
        {grid.flat().map((cell, i) => (
          <div
            key={i}
            style={{
              width: 20,
              height: 20,
              background: 'var(--accent-bg)',
              borderRadius: 3,
            }}
          />
        ))}
      </div>

      <div className="toolbar" style={{ marginTop: 12 }}>
        <button onClick={() => setTick((prev) => prev + 1)}>
          리렌더링 ({tick})
        </button>
      </div>

      <p className="expected">
        기대 결과: 버튼을 여러 번 눌러도 Console에 "🟦 [Problem3] 10x10 그리드 생성!" 로그가
        더 이상 찍히지 않습니다.
      </p>
    </div>
  )
}

export default Practice8
