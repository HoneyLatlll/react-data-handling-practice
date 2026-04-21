import { useState } from 'react'

// 실습 16 문제 3
// ─────────────────────────────────────────────
// initialValues를 받아 { values, handleChange, reset }을 반환하는 Hook을 만드세요.
// 하나의 handleChange로 text/checkbox 모두 다룰 수 있어야 합니다.
// ─────────────────────────────────────────────
// TODO 3-1: useState(initialValues)로 values 상태를 만드세요.
// TODO 3-2: handleChange(e) 함수를 구현하세요.
//   - e.target에서 { name, value, type, checked }를 구조분해하세요.
//   - type이 'checkbox'이면 checked를, 그 외에는 value를 사용해 해당 필드를 업데이트 하세요.
//   - ⚠️ 스프레드로 기존 values를 꼭 보존하세요.
//   HINT:
//     setValues({ ...values, [name]: type === 'checkbox' ? checked : value })
// TODO 3-3: reset 함수를 구현해 values를 initialValues로 되돌리세요.
// TODO 3-4: { values, handleChange, reset }를 객체로 반환하세요.
// ─────────────────────────────────────────────
function useForm(initialValues) {
  // 여기에 구현하세요
  const [values, setValues] = useState(initialValues)

  function handleChange() {
    // 여기에 구현하세요
  }

  function reset() {
    // 여기에 구현하세요
  }

  return { values, handleChange, reset }
}

export default useForm
