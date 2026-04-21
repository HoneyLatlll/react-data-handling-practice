import { createContext, useContext, useState } from 'react'

// 실습 17 문제 3
// ─────────────────────────────────────────────
// 장바구니 전역 상태를 관리하는 Context입니다.
// Practice17 페이지의 Problem3는 이 파일에 구현된 CartProvider와 useCart를 사용합니다.
// ─────────────────────────────────────────────

// TODO 3-1: createContext로 CartContext를 만드세요.
//   - 기본값은 null로 두세요. (Provider 바깥에서 사용하면 에러를 띄울 용도)
const CartContext = createContext(null)

// TODO 3-2: CartProvider 컴포넌트를 export 하도록 완성하세요.
//   - children을 받습니다.
//   - useState로 cart 상태(배열)를 만드세요. 초기값은 [].
//   - addToCart(product): 이미 cart에 같은 id의 상품이 있으면 quantity만 +1,
//     없으면 { ...product, quantity: 1 }로 새 항목 추가. (map + 스프레드 / [...prev, ...] 활용)
//   - removeFromCart(productId): cart에서 해당 id를 filter로 제거.
//   - clearCart(): cart를 []로 초기화.
//   - totalPrice: cart.reduce로 item.price * item.quantity 합계를 "렌더링 시점에 계산" (state X).
//   - value 객체에 { cart, addToCart, removeFromCart, clearCart, totalPrice }를 담아 Provider로 제공.
// HINT: reduce 예시 → cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  function addToCart(product) {
    // 여기에 구현하세요
  }

  function removeFromCart(productId) {
    // 여기에 구현하세요
  }

  function clearCart() {
    // 여기에 구현하세요
  }

  const totalPrice = 0 // TODO: reduce로 계산하세요

  const value = { cart, addToCart, removeFromCart, clearCart, totalPrice }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// TODO 3-3: useCart 커스텀 훅을 완성하세요.
//   - useContext(CartContext)로 컨텍스트 값을 꺼내고,
//   - 값이 null(= Provider 바깥에서 호출)이면 throw new Error('useCart는 CartProvider 안에서만 사용할 수 있어요')
//   - 문제 없으면 context를 그대로 return.
// HINT: if (!context) throw new Error(...)
export function useCart() {
  const context = useContext(CartContext)
  // 여기에 검증 후 반환 코드를 작성하세요
  return context
}
