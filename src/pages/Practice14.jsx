import { useRef, useState } from 'react'

function Practice14() {
  return (
    <div className="page">
      <h1>실습 14: useRef 기초</h1>
      <p className="page-subtitle">챕터 3-5. useRef 기초 학습 후</p>

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
// 문제 1: useRef로 DOM에 직접 접근 — input focus
// ─────────────────────────────────────────────
// input에 ref를 달고, 버튼 클릭 시 ref.current.focus()를 호출해 포커스를 이동하세요.
// ─────────────────────────────────────────────
function Problem1() {
  // TODO 1-1: useRef(null)로 inputRef를 만드세요.
  //   HINT: const inputRef = useRef(null)

  function handleFocus() {
    // TODO 1-2: inputRef.current.focus()를 호출하세요.
  }

  return (
    <div className="exercise">
      <h3>문제 1: 버튼을 누르면 input에 포커스 주기</h3>
      <p>"포커스" 버튼을 누르면 아래 input으로 커서가 이동해야 합니다.</p>

      <div className="toolbar">
        {/* TODO 1-3: input에 ref={inputRef}를 연결하세요. */}
        <input type="text" placeholder="여기에 포커스가 이동합니다" style={{ flex: 1 }} />
        <button onClick={handleFocus}>포커스</button>
      </div>

      <p className="expected">
        기대 결과: "포커스" 클릭 시 input에 커서가 자동으로 이동하고, 바로 타이핑할 수 있습니다.
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────
// 문제 2: useRef로 타이머 ID 저장하기
// ─────────────────────────────────────────────
// setInterval이 반환하는 ID는 화면에 보여줄 값이 아니므로 State로 관리할 이유가 없습니다.
// useRef에 저장하면 리렌더링 없이 값을 유지할 수 있습니다.
// ─────────────────────────────────────────────
function Problem2() {
  const [seconds, setSeconds] = useState(0)

  // TODO 2-1: useRef(null)로 timerRef를 만드세요. (타이머 ID를 저장할 곳)

  function start() {
    // TODO 2-2: 이미 실행 중이면(timerRef.current가 null이 아니면) 중복 실행하지 않도록 early return.
    // TODO 2-3: setInterval로 1초마다 setSeconds(prev => prev + 1)을 호출하고,
    //           반환된 id를 timerRef.current에 저장하세요.
  }

  function stop() {
    // TODO 2-4: timerRef.current에 저장된 타이머를 clearInterval로 멈추고,
    //           다시 timerRef.current = null로 초기화하세요.
  }

  function reset() {
    stop()
    setSeconds(0)
  }

  return (
    <div className="exercise">
      <h3>문제 2: 시작/정지 가능한 타이머 (타이머 ID는 useRef에)</h3>
      <p>
        이벤트 핸들러가 분리된 구조라 setInterval ID를 컴포넌트 어디서든 꺼낼 수 있어야 합니다.
        useRef에 저장하면 리렌더링 없이 유지됩니다.
      </p>

      <div className="practice-card" style={{ fontSize: 28, textAlign: 'center' }}>
        {seconds}초
      </div>

      <div className="toolbar" style={{ marginTop: 12 }}>
        <button onClick={start}>시작</button>
        <button onClick={stop}>정지</button>
        <button onClick={reset}>리셋</button>
      </div>

      <p className="expected">
        기대 결과: "시작"을 여러 번 눌러도 속도가 빨라지지 않고 1초에 1씩 증가합니다.
        "정지" 후 다시 "시작" 가능, "리셋"은 0으로 초기화합니다.
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────
// 문제 3: useRef로 DOM 스크롤 제어
// ─────────────────────────────────────────────
// 긴 목록의 특정 위치로 스크롤할 때 해당 DOM 요소에 ref를 달고 scrollIntoView를 호출하세요.
// ─────────────────────────────────────────────
function Problem3() {
  // TODO 3-1: useRef(null)로 bottomRef를 만드세요.

  function scrollToBottom() {
    // TODO 3-2: bottomRef.current?.scrollIntoView({ behavior: 'smooth' })를 호출하세요.
  }

  return (
    <div className="exercise">
      <h3>문제 3: "맨 아래로" 버튼으로 스크롤 이동</h3>
      <p>버튼 클릭 시 아래 목록의 마지막 항목까지 부드럽게 스크롤되어야 합니다.</p>

      <div className="toolbar">
        <button onClick={scrollToBottom}>맨 아래로</button>
      </div>

      <div
        style={{
          maxHeight: 220,
          overflowY: 'auto',
          border: '1px solid var(--border)',
          borderRadius: 8,
          padding: 12,
          background: 'var(--bg)',
        }}
      >
        {Array.from({ length: 30 }, (_, i) => i + 1).map((n) => (
          <p key={n} style={{ margin: '6px 0', fontSize: 14 }}>
            항목 {n}번
          </p>
        ))}
        {/* TODO 3-3: 이 div에 ref={bottomRef}를 연결하세요. 목록의 맨 끝 표시용입니다. */}
        <div />
      </div>

      <p className="expected">
        기대 결과: 버튼 클릭 시 목록이 부드럽게 맨 아래까지 스크롤됩니다.
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────
// 문제 4: useRef vs useState — 리렌더링 차이 체험
// ─────────────────────────────────────────────
// 같은 "클릭 시 +1" 로직도 useState는 화면이 바뀌고, useRef는 값만 쌓이고 화면은 그대로입니다.
// ref가 바뀔 때 화면을 강제로 갱신하려면 어쩔 수 없이 별도의 state를 변경해야 합니다.
// ─────────────────────────────────────────────
function Problem4() {
  const [stateCount, setStateCount] = useState(0)
  // TODO 4-1: useRef(0)로 refCount를 만드세요.
  //   HINT: const refCount = useRef(0)

  function incrementRef() {
    // TODO 4-2: refCount.current를 1 증가시키고, console.log로 값을 찍어보세요.
    //   (화면에는 즉시 반영되지 않는 것을 체험하는 게 목적입니다.)
  }

  function forceRender() {
    // 상태를 바꿔 강제 리렌더링 → 이때 비로소 refCount.current 값이 화면에 반영됩니다.
    setStateCount((prev) => prev + 1)
  }

  return (
    <div className="exercise">
      <h3>문제 4: useState는 리렌더링, useRef는 조용히</h3>
      <p>
        왼쪽 버튼은 state를 증가시켜 화면이 즉시 갱신됩니다. 오른쪽 버튼은 ref만 증가시키므로
        화면이 바뀌지 않습니다. "강제 리렌더링" 버튼을 누르면 그동안 쌓인 ref 값이 화면에 반영됩니다.
      </p>

      <div className="practice-card" style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 18 }}>state count: {stateCount}</p>
        <p style={{ fontSize: 18 }}>
          ref count (렌더링 시점):{/* TODO 4-3: 아래에 refCount.current를 표시하세요. */}
        </p>
      </div>

      <div className="toolbar" style={{ marginTop: 12 }}>
        <button onClick={() => setStateCount((prev) => prev + 1)}>
          state +1 (리렌더링 O)
        </button>
        <button onClick={incrementRef}>ref +1 (리렌더링 X)</button>
        <button onClick={forceRender}>강제 리렌더링</button>
      </div>

      <p className="expected">
        기대 결과: "ref +1"만 여러 번 눌러도 화면의 ref count는 그대로이고, 콘솔에만 값이 증가합니다.
        "강제 리렌더링"을 누르면 그동안 쌓인 ref 값이 화면에 표시됩니다.
      </p>
    </div>
  )
}

export default Practice14
