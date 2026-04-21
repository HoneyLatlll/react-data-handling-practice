import { useState } from 'react'
import useFetch from '../hooks/useFetch.js'
import useLocalStorage from '../hooks/useLocalStorage.js'
import useForm from '../hooks/useForm.js'

function Practice16() {
  return (
    <div className="page">
      <h1>실습 16: 커스텀 Hook 만들기</h1>
      <p className="page-subtitle">챕터 4-4. 커스텀 Hook 학습 후</p>

      <div
        className="practice-card"
        style={{ marginBottom: 16, fontSize: 13, color: 'var(--text)' }}
      >
        💡 이번 실습은 아래 페이지 코드가 아닌 <code>src/hooks/</code>에 있는 훅 파일을 완성하는 것이 목표입니다.
        각 문제의 UI는 완성되어 있으니, 훅을 올바르게 구현하면 자연스럽게 동작합니다.
      </div>

      <Problem1 />
      <hr style={{ margin: '32px 0', border: 0, borderTop: '1px solid var(--border)' }} />
      <Problem2 />
      <hr style={{ margin: '32px 0', border: 0, borderTop: '1px solid var(--border)' }} />
      <Problem3 />
    </div>
  )
}

// ─────────────────────────────────────────────
// 문제 1: useFetch
// ─────────────────────────────────────────────
// src/hooks/useFetch.js 를 열어 TODO를 완성하세요.
// url을 받아 { data, loading, error }를 반환하는 훅입니다.
// ─────────────────────────────────────────────
function Problem1() {
  const { data: users, loading, error } = useFetch(
    'https://jsonplaceholder.typicode.com/users',
  )

  return (
    <div className="exercise">
      <h3>문제 1: useFetch로 사용자 목록 가져오기</h3>
      <p>
        <code>src/hooks/useFetch.js</code>를 완성하세요. 완성되면 페이지 진입 시
        로딩 표시 → 사용자 10명 목록이 자동으로 표시됩니다.
      </p>

      {loading && <p>⏳ 로딩 중...</p>}
      {error && <p style={{ color: 'crimson' }}>⚠️ {error}</p>}
      {users && (
        <ul className="practice-list">
          {users.map((user) => (
            <li key={user.id}>
              <span>
                <strong>{user.name}</strong>
                <span style={{ color: 'var(--text)', marginLeft: 8, fontSize: 13 }}>
                  {user.email}
                </span>
              </span>
              <span className="badge">{user.company?.name}</span>
            </li>
          ))}
        </ul>
      )}

      <p className="expected">
        기대 결과: 진입 시 "⏳ 로딩 중..."이 잠깐 보인 뒤, 사용자 10명의 목록이 표시됩니다.
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────
// 문제 2: useLocalStorage
// ─────────────────────────────────────────────
// src/hooks/useLocalStorage.js 를 열어 TODO를 완성하세요.
// useState와 동일한 사용감 + 새로고침 후에도 값이 유지되어야 합니다.
// ─────────────────────────────────────────────
function Problem2() {
  const [nickname, setNickname] = useLocalStorage('practice16_nickname', '')
  const [theme, setTheme] = useLocalStorage('practice16_theme', 'light')

  return (
    <div className="exercise">
      <h3>문제 2: useLocalStorage로 닉네임·테마 유지하기</h3>
      <p>
        <code>src/hooks/useLocalStorage.js</code>를 완성하세요. 저장 후 새로고침해도
        닉네임과 테마가 그대로 유지되어야 합니다.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 420 }}>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임"
        />

        <div className="toolbar" style={{ margin: 0 }}>
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            테마 변경
          </button>
          <span style={{ alignSelf: 'center', fontSize: 14 }}>
            현재 테마: <strong>{theme}</strong>
          </span>
        </div>
      </div>

      <div
        className="practice-card"
        style={{ marginTop: 12, fontFamily: 'var(--mono)', fontSize: 13 }}
      >
        저장된 값: {JSON.stringify({ nickname, theme })}
      </div>

      <p className="expected">
        기대 결과: 값을 바꾼 뒤 페이지를 새로고침(F5)해도 입력한 닉네임·테마가 그대로 유지됩니다.
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────
// 문제 3: useForm
// ─────────────────────────────────────────────
// src/hooks/useForm.js 를 열어 TODO를 완성하세요.
// 하나의 handleChange로 text/checkbox 모두 다룰 수 있어야 합니다.
// ─────────────────────────────────────────────
function Problem3() {
  const { values, handleChange, reset } = useForm({
    email: '',
    password: '',
    agree: false,
  })
  const [submitted, setSubmitted] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(values)
    reset()
  }

  return (
    <div className="exercise">
      <h3>문제 3: useForm으로 회원가입 폼 다루기</h3>
      <p>
        <code>src/hooks/useForm.js</code>를 완성하세요. 하나의 handleChange로 text/checkbox를 모두
        업데이트할 수 있어야 합니다.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 420 }}
      >
        <input
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          placeholder="이메일"
          required
        />
        <input
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          placeholder="비밀번호"
          required
        />
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            name="agree"
            type="checkbox"
            checked={values.agree}
            onChange={handleChange}
          />
          이용약관에 동의합니다
        </label>

        <div className="toolbar" style={{ margin: 0 }}>
          <button type="submit" disabled={!values.agree}>
            가입
          </button>
          <button type="button" onClick={reset}>
            초기화
          </button>
        </div>
      </form>

      <div
        className="practice-card"
        style={{ marginTop: 12, fontFamily: 'var(--mono)', fontSize: 13 }}
      >
        <p style={{ fontSize: 13, color: 'var(--text)' }}>현재 values:</p>
        <pre style={{ margin: 0 }}>{JSON.stringify(values, null, 2)}</pre>
      </div>

      {submitted && (
        <div
          className="practice-card"
          style={{ marginTop: 8, fontFamily: 'var(--mono)', fontSize: 13 }}
        >
          마지막 제출: {JSON.stringify(submitted)}
        </div>
      )}

      <p className="expected">
        기대 결과: 텍스트/체크박스 값이 실시간으로 현재 values에 반영되고, 제출 시 reset으로 폼이 초기화됩니다.
      </p>
    </div>
  )
}

export default Practice16
