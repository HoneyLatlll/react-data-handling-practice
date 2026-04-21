import { createContext, useContext, useState } from 'react'
import { CartProvider, useCart } from '../contexts/CartContext.jsx'

function Practice17() {
  return (
    <div className="page">
      <h1>실습 17: Context API로 전역 상태 다루기</h1>
      <p className="page-subtitle">
        챕터 5-1~5-4. Props Drilling · Context · State 결합 · 파일 분리 학습 후
      </p>

      <Problem1 />
      <hr style={{ margin: '32px 0', border: 0, borderTop: '1px solid var(--border)' }} />
      <Problem2 />
      <hr style={{ margin: '32px 0', border: 0, borderTop: '1px solid var(--border)' }} />
      <Problem3 />
    </div>
  )
}

// ─────────────────────────────────────────────
// 문제 1: Props Drilling → useContext로 리팩토링
// ─────────────────────────────────────────────
// Problem1 → Layout → Sidebar → UserBadge 3단계 구조에서,
// 지금은 user를 props로 계속 내려주고 있습니다. Context로 바꿔서
// 중간 컴포넌트(Layout, Sidebar)가 user를 모르게 만드세요.
// ─────────────────────────────────────────────

// TODO 1-1: createContext(null)로 UserContext를 만드세요.
//   HINT: const UserContext = createContext(null)

function Problem1() {
  const [user] = useState({ name: '홍길동', role: '관리자' })

  return (
    <div className="exercise">
      <h3>문제 1: Props Drilling 제거하기</h3>
      <p>
        현재는 user를 Layout과 Sidebar를 거쳐 UserBadge에 전달합니다. Context로 바꿔서
        Layout / Sidebar의 props를 완전히 제거하세요.
      </p>

      {/* TODO 1-2: 아래 <Layout user={user} />를 <UserContext.Provider value={user}>로 감싸고,
                    Layout은 props 없이 그냥 <Layout />으로 호출되게 하세요. */}
      <Layout user={user} />

      <p className="expected">
        기대 결과: 화면 결과는 변하지 않되, Layout과 Sidebar 컴포넌트에서 props가 완전히 사라집니다.
        UserBadge는 useContext(UserContext)로 user를 직접 가져옵니다.
      </p>
    </div>
  )
}

function Layout({ user }) {
  // TODO 1-3: 위 Problem1이 Provider로 감쌌다면, 이 컴포넌트는 더 이상 user props가 필요 없습니다.
  //   - 함수 시그니처를 function Layout()으로 바꾸고,
  //   - <Sidebar user={user} />도 <Sidebar />로 바꾸세요.
  return (
    <div className="practice-card" style={{ marginBottom: 12 }}>
      <p style={{ fontSize: 13, color: 'var(--text)', marginBottom: 6 }}>
        Layout (중간 컴포넌트 — 원래는 user가 필요 없음)
      </p>
      <Sidebar user={user} />
    </div>
  )
}

function Sidebar({ user }) {
  // TODO 1-4: 이 컴포넌트도 user props가 더 이상 필요하지 않습니다.
  //   - function Sidebar()로 바꾸고 <UserBadge user={user} />도 <UserBadge />로 바꾸세요.
  return (
    <div className="practice-card">
      <p style={{ fontSize: 13, color: 'var(--text)', marginBottom: 6 }}>
        Sidebar (중간 컴포넌트 — 원래는 user가 필요 없음)
      </p>
      <UserBadge user={user} />
    </div>
  )
}

function UserBadge({ user }) {
  // TODO 1-5: user props를 제거하고, useContext(UserContext)로 user를 꺼내 쓰세요.
  //   HINT: const user = useContext(UserContext)
  return (
    <p style={{ margin: 0 }}>
      👤 <strong>{user?.name}</strong>{' '}
      <span className="badge">{user?.role}</span>
    </p>
  )
}

// ─────────────────────────────────────────────
// 문제 2: Context value에 State + 업데이트 함수 함께 제공
// ─────────────────────────────────────────────
// value에는 단일 값뿐 아니라 객체({ theme, toggleTheme })를 넣어
// 자식 컴포넌트가 상태 읽기 + 업데이트 함수 모두 사용할 수 있게 하세요.
// ─────────────────────────────────────────────

// TODO 2-1: createContext(null)로 ThemeContext를 만드세요.
const ThemeContext = createContext(null)

function Problem2() {
  const [theme, setTheme] = useState('light')

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className="exercise">
      <h3>문제 2: ThemeContext — value에 객체 전달</h3>
      <p>
        theme와 toggleTheme을 하나의 객체로 묶어 Provider value에 넣고, 두 자식 컴포넌트에서 꺼내 쓰세요.
      </p>

      {/* TODO 2-2: 아래 두 컴포넌트를 <ThemeContext.Provider value={{ theme, toggleTheme }}>로 감싸세요. */}
      <div>
        <ThemeHeader />
        <ThemeCard />
      </div>

      <p className="expected">
        기대 결과: "테마 변경" 버튼 클릭 시 Header 문구와 Card 배경색이 light/dark로 토글됩니다.
      </p>
    </div>
  )
}

function ThemeHeader() {
  // TODO 2-3: useContext(ThemeContext)로 { theme, toggleTheme }을 꺼내고,
  //   버튼 onClick에 toggleTheme을 연결하세요.
  //   HINT: const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <div className="practice-card" style={{ marginBottom: 8 }}>
      <span>현재 테마: (여기에 theme 값 표시)</span>
      <button style={{ marginLeft: 12 }}>테마 변경</button>
    </div>
  )
}

function ThemeCard() {
  // TODO 2-4: useContext(ThemeContext)로 theme만 꺼내 쓰세요.

  // TODO 2-5: 아래 div의 배경색을 theme === 'dark'이면 #1f2028, 아니면 #fff로 바꾸고,
  //   글자색도 각각 #f3f4f6 / #08060d로 지정하세요.
  const theme = 'light'
  const isDark = theme === 'dark'

  return (
    <div
      className="practice-card"
      style={{
        background: isDark ? '#1f2028' : '#fff',
        color: isDark ? '#f3f4f6' : '#08060d',
        transition: 'background 0.2s, color 0.2s',
      }}
    >
      <p>🎨 이 카드는 theme에 따라 배경색/글자색이 바뀝니다.</p>
    </div>
  )
}

// ─────────────────────────────────────────────
// 문제 3: Cart Context 파일 분리 + useCart 커스텀 훅
// ─────────────────────────────────────────────
// src/contexts/CartContext.jsx 를 열어 TODO를 먼저 완성하세요.
// 완성되면 아래 Problem3에서 상품을 담고/지우고 총액이 자동으로 계산됩니다.
// ─────────────────────────────────────────────
function Problem3() {
  return (
    <div className="exercise">
      <h3>문제 3: Cart Context (파일 분리 + 커스텀 훅)</h3>
      <p>
        <code>src/contexts/CartContext.jsx</code>의 CartProvider와 useCart를 완성하세요.
        아래 ProductList / CartView는 이미 훅을 사용하는 방식으로 작성되어 있습니다.
      </p>

      <CartProvider>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
          }}
        >
          <ProductList />
          <CartView />
        </div>
      </CartProvider>

      <p className="expected">
        기대 결과: 상품을 "담기" 클릭 시 장바구니에 추가/수량 증가, "삭제"로 개별 제거, "전체 비우기"로 초기화,
        총액이 수량·가격 변화에 따라 자동 계산됩니다.
      </p>
    </div>
  )
}

const PRODUCTS = [
  { id: 1, name: '노트북', price: 1200000 },
  { id: 2, name: '마우스', price: 30000 },
  { id: 3, name: '키보드', price: 80000 },
  { id: 4, name: '모니터', price: 350000 },
]

function ProductList() {
  const { addToCart } = useCart()

  return (
    <div className="practice-card">
      <h4 style={{ margin: '0 0 8px' }}>🛍 상품 목록</h4>
      <ul className="practice-list">
        {PRODUCTS.map((product) => (
          <li key={product.id}>
            <span>
              {product.name}
              <br />
              <span style={{ fontSize: 12, color: 'var(--text)' }}>
                {product.price.toLocaleString()}원
              </span>
            </span>
            <button onClick={() => addToCart(product)}>담기</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function CartView() {
  const { cart, removeFromCart, clearCart, totalPrice } = useCart()

  return (
    <div className="practice-card">
      <h4 style={{ margin: '0 0 8px' }}>🛒 장바구니</h4>
      {cart.length === 0 ? (
        <p style={{ fontSize: 13, color: 'var(--text)' }}>장바구니가 비어있습니다.</p>
      ) : (
        <>
          <ul className="practice-list">
            {cart.map((item) => (
              <li key={item.id}>
                <span>
                  {item.name} × {item.quantity}
                  <br />
                  <span style={{ fontSize: 12, color: 'var(--text)' }}>
                    {(item.price * item.quantity).toLocaleString()}원
                  </span>
                </span>
                <button onClick={() => removeFromCart(item.id)}>삭제</button>
              </li>
            ))}
          </ul>
          <div
            style={{
              marginTop: 10,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <strong>총액: {totalPrice.toLocaleString()}원</strong>
            <button onClick={clearCart}>전체 비우기</button>
          </div>
        </>
      )}
    </div>
  )
}

export default Practice17
