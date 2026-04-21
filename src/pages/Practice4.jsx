import { useState } from 'react'

function Practice4() {
  return (
    <div className="page">
      <h1>실습 4: 여러 State 관리와 불변성</h1>
      <p className="page-subtitle">
        챕터 1-6. 배열 불변성 유지하기 · 1-7. 여러 State 관리하기 학습 후
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
// 문제 1: 불변성 지키며 배열에 추가하기
// ─────────────────────────────────────────────
// push/unshift는 원본을 수정하므로 React state에서는 절대 쓰지 않습니다.
// 스프레드 연산자로 새 배열을 만들어서 setState에 넘기세요.
// ─────────────────────────────────────────────
function Problem1() {
  const [items, setItems] = useState(['사과', '바나나', '오렌지'])
  const [input, setInput] = useState('')

  // TODO 1-1: addLast 함수를 완성하세요.
  //   - input이 빈 문자열이면 아무 것도 하지 않음
  //   - 스프레드로 기존 items 뒤에 input을 붙여 새 배열을 만들어 setItems에 전달
  //   - 마지막에 setInput('')으로 입력창을 비웁니다.
  // HINT: setItems([...items, input])
  function addLast() {
    // 여기에 구현하세요
  }

  // TODO 1-2: addFirst 함수를 완성하세요.
  //   - 새 항목을 맨 앞에 붙이세요.
  // HINT: setItems([input, ...items])
  function addFirst() {
    // 여기에 구현하세요
  }

  return (
    <div className="exercise">
      <h3>문제 1: 배열에 항목 추가 (앞/뒤, 불변성 유지)</h3>
      <p>
        입력한 값을 배열의 맨 뒤 또는 맨 앞에 추가하세요.
        ⚠️ <code>items.push(...)</code>처럼 원본을 수정하면 React는 변경을 감지하지 못합니다.
      </p>

      <div className="toolbar">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="과일 이름"
        />
        <button onClick={addLast}>맨 뒤에 추가</button>
        <button onClick={addFirst}>맨 앞에 추가</button>
      </div>

      <ul className="practice-list">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <p className="expected">
        기대 결과: "맨 뒤에 추가"는 리스트 끝에, "맨 앞에 추가"는 리스트 시작 부분에 새 항목이 추가됩니다.
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────
// 문제 2: 불변성 지키며 항목 수정 (토글)
// ─────────────────────────────────────────────
// 수정도 원본을 바꾸면 안 됩니다.
// map + 스프레드로 "해당 항목만 새 객체로, 나머지는 그대로"를 만드세요.
// ─────────────────────────────────────────────
function Problem2() {
  const [todos, setTodos] = useState([
    { id: 1, text: '운동하기', done: false },
    { id: 2, text: '책 읽기', done: false },
    { id: 3, text: '코딩하기', done: true },
    { id: 4, text: '청소하기', done: false },
  ])

  // TODO 2-1: toggleTodo 함수를 완성하세요.
  //   - map으로 배열을 순회하면서
  //   - todo.id가 인자 id와 같으면 { ...todo, done: !todo.done }로 새 객체를 만들고
  //   - 그 외에는 todo를 그대로 반환하세요.
  // HINT:
  //   setTodos(
  //     todos.map(todo =>
  //       todo.id === id ? { ...todo, done: !todo.done } : todo
  //     )
  //   )
  function toggleTodo(id) {
    // 여기에 구현하세요
  }

  return (
    <div className="exercise">
      <h3>문제 2: 할 일 완료/미완료 토글</h3>
      <p>체크박스를 클릭하면 해당 항목의 <code>done</code> 값만 바뀌고, 나머지는 그대로 유지돼야 합니다.</p>

      <ul className="practice-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
              />
              <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
                {todo.text}
              </span>
            </label>
          </li>
        ))}
      </ul>

      <p className="expected">
        기대 결과: 체크박스를 누르면 해당 항목의 취소선이 토글되고, 다른 항목은 건드리지 않습니다.
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────
// 문제 3: 파생 상태 — "계산할 수 있는 값은 State로 만들지 말 것"
// ─────────────────────────────────────────────
// 검색 결과, 총합, 개수 같은 값은 useState 없이 렌더링 시점에 계산하세요.
// 이렇게 해야 원본(products/searchTerm)이 바뀔 때 자동으로 따라서 갱신됩니다.
// ─────────────────────────────────────────────
function Problem3() {
  const [products] = useState([
    { id: 1, name: '노트북', price: 1200000 },
    { id: 2, name: '마우스', price: 30000 },
    { id: 3, name: '키보드', price: 80000 },
    { id: 4, name: '모니터', price: 350000 },
    { id: 5, name: '이어폰', price: 120000 },
  ])
  const [searchTerm, setSearchTerm] = useState('')

  // TODO 3-1: filteredProducts를 계산하세요.
  //   - searchTerm이 빈 문자열이면 products 전체
  //   - 아니면 product.name에 searchTerm이 포함된 것만
  // HINT: products.filter(p => p.name.includes(searchTerm))
  // ⚠️ useState로 만들지 말 것! 일반 const 변수로 계산하세요.
  const filteredProducts = [] // 이 줄을 수정하세요

  // TODO 3-2: totalPrice를 계산하세요.
  //   - filteredProducts의 price들을 모두 더합니다.
  // HINT: filteredProducts.reduce((sum, p) => sum + p.price, 0)
  // ⚠️ useState로 만들지 말 것!
  const totalPrice = 0 // 이 줄을 수정하세요

  return (
    <div className="exercise">
      <h3>문제 3: 검색 결과와 총합 (파생 상태)</h3>
      <p>
        상품 이름 검색 결과와 그 총 가격을 표시하세요.
        ⚠️ 이 두 값은 <code>useState</code>로 만들면 안 됩니다. 원본이 바뀔 때 동기화가 어긋나요.
      </p>

      <div className="toolbar">
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="상품 이름 검색"
          style={{ flex: 1, minWidth: 160 }}
        />
        <span style={{ alignSelf: 'center' }}>
          총 {filteredProducts.length}개 / {totalPrice.toLocaleString()}원
        </span>
      </div>

      <ul className="practice-list">
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <span>{product.name}</span>
            <span>{product.price.toLocaleString()}원</span>
          </li>
        ))}
      </ul>

      <p className="expected">
        기대 결과: 검색어를 입력할 때마다 목록, 개수, 총 가격이 자동으로 함께 갱신됩니다.
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────
// 문제 4: 객체 State — 폼을 하나의 객체로 관리
// ─────────────────────────────────────────────
// 관련 있는 값들을 하나의 객체 state로 묶고, 업데이트 시엔 반드시 스프레드로 기존 값을 보존하세요.
// ─────────────────────────────────────────────
function Problem4() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  // TODO 4-1: handleChange 함수를 완성하세요.
  //   - input의 name 속성을 key로, value를 값으로 사용해서
  //   - form 객체의 해당 필드만 업데이트하세요.
  //   - 스프레드로 기존 값들을 꼭 보존할 것!
  // HINT:
  //   const { name, value } = e.target
  //   setForm({ ...form, [name]: value })
  function handleChange(e) {
    // 여기에 구현하세요
  }

  function handleReset() {
    // TODO 4-2: form을 초기값 { name: '', email: '', message: '' }로 되돌리세요.
  }

  return (
    <div className="exercise">
      <h3>문제 4: 문의 폼 (객체 state + 부분 업데이트)</h3>
      <p>
        각 입력 필드에 <code>onChange</code>를 연결해서 하나의 핸들러로 form 객체의 해당 필드만 갱신하세요.
        ⚠️ <code>setForm({'{ name: ... }'})</code>처럼 스프레드 없이 쓰면 다른 필드가 전부 날아갑니다.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 420 }}>
        {/* TODO 4-3: 각 input에 name 속성과 value, onChange를 연결하세요. */}
        <input
          type="text"
          placeholder="이름"
          // name="name", value={form.name}, onChange={handleChange} 를 추가하세요
        />
        <input
          type="text"
          placeholder="이메일"
          // name="email", value={form.email}, onChange={handleChange} 를 추가하세요
        />
        <input
          type="text"
          placeholder="메시지"
          // name="message", value={form.message}, onChange={handleChange} 를 추가하세요
        />
      </div>

      <div className="toolbar" style={{ marginTop: 12 }}>
        <button onClick={handleReset}>초기화</button>
      </div>

      <div className="practice-card" style={{ marginTop: 12 }}>
        <p style={{ fontSize: 13, color: 'var(--text)' }}>현재 form 상태:</p>
        <pre style={{ margin: 0, fontSize: 13 }}>{JSON.stringify(form, null, 2)}</pre>
      </div>

      <p className="expected">
        기대 결과: 어느 필드를 입력해도 다른 필드 값이 사라지지 않고,
        아래 "현재 form 상태"에 실시간으로 반영됩니다. "초기화" 버튼을 누르면 모든 필드가 빈 값으로 돌아옵니다.
      </p>
    </div>
  )
}

export default Practice4
