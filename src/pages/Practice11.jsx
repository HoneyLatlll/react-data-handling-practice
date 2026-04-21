import { useRef, useState } from 'react'

function Practice11() {
  return (
    <div className="page">
      <h1>실습 11: 제어 / 비제어 컴포넌트</h1>
      <p className="page-subtitle">
        챕터 3-1. 제어 컴포넌트 · 3-2. 비제어 컴포넌트 학습 후
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
// 문제 1: 기본 제어 입력 + 실시간 반영
// ─────────────────────────────────────────────
// input의 value를 State에 묶고, onChange로 State를 업데이트하세요.
// 입력하는 즉시 아래 인사말에 반영되어야 합니다.
// ─────────────────────────────────────────────
function Problem1() {
  const [name, setName] = useState('')

  return (
    <div className="exercise">
      <h3>문제 1: 이름을 받아 실시간 인사하기</h3>
      <p>이름을 타이핑하면 아래 인사말에 즉시 반영되어야 합니다.</p>

      <div className="toolbar">
        {/* TODO 1-1: input에 value={name}과 onChange로 setName을 연결해 제어 컴포넌트로 만드세요. */}
        {/* HINT: onChange={(e) => setName(e.target.value)} */}
        <input type="text" placeholder="이름을 입력하세요" style={{ flex: 1 }} />
      </div>

      <div className="practice-card" style={{ marginTop: 12, fontSize: 18 }}>
        {/* TODO 1-2: name이 비어있을 때는 "이름을 입력해 주세요"를,
                     그 외에는 "안녕하세요, {name}님!"을 표시하세요. */}
        {/* HINT: 삼항 연산자 또는 early return 중 편한 쪽으로 */}
      </div>

      <p className="expected">
        기대 결과: "홍길동" 입력 시 "안녕하세요, 홍길동님!"이 실시간으로 표시됩니다.
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────
// 문제 2: checkbox / radio / select 제어 패턴
// ─────────────────────────────────────────────
// input 타입마다 "값을 읽는 속성"이 다릅니다.
//   - text / textarea: e.target.value
//   - checkbox: e.target.checked (boolean)
//   - radio: e.target.value (여러 개 중 선택)
//   - select: e.target.value
// ─────────────────────────────────────────────
function Problem2() {
  const [agreed, setAgreed] = useState(false)
  const [gender, setGender] = useState('')
  const [country, setCountry] = useState('korea')

  return (
    <div className="exercise">
      <h3>문제 2: 다양한 입력 타입 제어하기</h3>
      <p>
        체크박스, 라디오 버튼, 셀렉트 박스를 각각 제어 컴포넌트로 만들고, 아래 요약 영역에 현재 값을 표시하세요.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <label>
          {/* TODO 2-1: checked={agreed}와 onChange로 setAgreed(e.target.checked)를 연결하세요. */}
          {/* ⚠️ value가 아니라 checked를 씁니다. */}
          <input type="checkbox" /> 이용약관에 동의합니다
        </label>

        <div style={{ display: 'flex', gap: 16 }}>
          <label>
            {/* TODO 2-2: value="male", checked={gender === 'male'}, onChange={(e) => setGender(e.target.value)} */}
            <input type="radio" name="gender" value="male" /> 남성
          </label>
          <label>
            {/* TODO 2-3: value="female"로 위와 동일한 패턴으로 연결하세요. */}
            <input type="radio" name="gender" value="female" /> 여성
          </label>
        </div>

        <label>
          국가:&nbsp;
          {/* TODO 2-4: value={country}와 onChange={(e) => setCountry(e.target.value)}를 연결하세요. */}
          <select>
            <option value="korea">대한민국</option>
            <option value="usa">미국</option>
            <option value="japan">일본</option>
          </select>
        </label>
      </div>

      <div
        className="practice-card"
        style={{ marginTop: 12, fontFamily: 'var(--mono)', fontSize: 13 }}
      >
        {JSON.stringify({ agreed, gender, country }, null, 2)}
      </div>

      <p className="expected">
        기대 결과: 각 항목을 바꿀 때마다 위 JSON이 실시간으로 바뀝니다. agreed는 true/false, gender는 'male' 또는 'female'.
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────
// 문제 3: 실시간 검증 + 버튼 disabled
// ─────────────────────────────────────────────
// 제어 컴포넌트의 장점은 "입력값을 항상 알 수 있다"는 점입니다.
// 그 덕분에 실시간으로 검증 메시지를 띄우고, 버튼 활성화 여부를 제어할 수 있습니다.
// ─────────────────────────────────────────────
function Problem3() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // TODO 3-1: isValidEmail을 계산하세요. email에 '@'이 포함되어 있으면 true.
  //   HINT: email.includes('@')
  const isValidEmail = false // 이 줄을 수정하세요

  // TODO 3-2: isValidPassword를 계산하세요. password.length >= 8 이면 true.
  const isValidPassword = false // 이 줄을 수정하세요

  // TODO 3-3: canSubmit을 계산하세요. isValidEmail && isValidPassword 가 true일 때만 제출 가능.
  const canSubmit = false // 이 줄을 수정하세요

  return (
    <div className="exercise">
      <h3>문제 3: 실시간 검증하며 버튼 활성화하기</h3>
      <p>
        이메일에 @가 포함되고 비밀번호가 8자 이상일 때만 "가입하기" 버튼이 활성화되어야 합니다.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            style={{ width: '100%' }}
          />
          {/* TODO 3-4: email이 비어있지 않고 isValidEmail이 false면
                       <p style={{ color: 'crimson', fontSize: 12 }}>@가 포함되어야 해요</p>를 표시하세요. */}
        </div>

        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 (8자 이상)"
            style={{ width: '100%' }}
          />
          {/* TODO 3-5: password가 비어있지 않고 isValidPassword가 false면
                       "비밀번호는 8자 이상이어야 해요" 메시지를 표시하세요. */}
        </div>

        {/* TODO 3-6: button에 disabled={!canSubmit}를 설정하세요. */}
        <button type="button">가입하기</button>
      </div>

      <p className="expected">
        기대 결과: 조건을 하나라도 못 채우면 버튼이 비활성화되고, 잘못된 값에는 빨간 에러 문구가 바로 표시됩니다.
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────
// 문제 4: 비제어 컴포넌트 (useRef + defaultValue)
// ─────────────────────────────────────────────
// 매 타이핑마다 리렌더링하지 않고, 제출 시점에만 DOM에서 값을 읽는 패턴입니다.
// value 대신 defaultValue를 쓰고, ref.current.value로 꺼내세요.
// (useRef는 실습 14에서 자세히 다루지만, 여기서는 "비제어 용도"만 맛봅니다)
// ─────────────────────────────────────────────
function Problem4() {
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const [submitted, setSubmitted] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    // TODO 4-1: nameRef.current.value와 emailRef.current.value를 읽어서
    //   { name, email } 객체로 setSubmitted에 저장하세요.
  }

  return (
    <div className="exercise">
      <h3>문제 4: 비제어 폼 — 제출 시점에만 값 읽기</h3>
      <p>
        아래 폼은 State를 전혀 쓰지 않습니다. value 대신 <code>defaultValue</code>로 초기값을 주고,
        제출 시 ref로 값을 꺼내세요.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 420 }}
      >
        {/* TODO 4-2: 이 input에 ref={nameRef}와 defaultValue="홍길동"을 설정하세요. */}
        {/* ⚠️ value를 쓰면 onChange가 없다는 경고가 콘솔에 뜹니다. defaultValue를 쓰세요. */}
        <input type="text" placeholder="이름" />

        {/* TODO 4-3: 이 input에 ref={emailRef}를 연결하세요. (defaultValue는 비워도 됩니다) */}
        <input type="email" placeholder="이메일" />

        <button type="submit">제출</button>
      </form>

      {submitted && (
        <div
          className="practice-card"
          style={{ marginTop: 12, fontFamily: 'var(--mono)', fontSize: 13 }}
        >
          제출된 값: {JSON.stringify(submitted)}
        </div>
      )}

      <p className="expected">
        기대 결과: 타이핑 중에는 아무것도 안 보이고, "제출" 클릭 시에만 현재 input 값이 아래에 표시됩니다.
      </p>
    </div>
  )
}

export default Practice11
