import { useState } from 'react'

// 실습 16 문제 2
// ─────────────────────────────────────────────
// key와 initialValue를 받아 [storedValue, setValue]를 반환하는 Hook을 만드세요.
// 새로고침 후에도 값이 유지되어야 합니다.
// ─────────────────────────────────────────────
// TODO 2-1: useState를 Lazy 초기화(() => ...)로 선언하세요. (실습 8 복습!)
//   - try 안에서 window.localStorage.getItem(key)로 읽기
//   - 값이 있으면 JSON.parse, 없으면 initialValue 반환
//   - 에러 시에도 initialValue 반환
// TODO 2-2: setValue 함수를 만들어 storedValue를 업데이트하고 localStorage에도 저장하세요.
//   - value가 함수이면(value instanceof Function) storedValue를 넣어 호출 (함수형 업데이트 지원)
//   - JSON.stringify로 직렬화해서 localStorage.setItem(key, ...)
// TODO 2-3: [storedValue, setValue]를 배열로 반환하세요. (useState와 동일한 사용감)
// ─────────────────────────────────────────────
function useLocalStorage(key, initialValue) {
  // 여기에 구현하세요
  const [storedValue, setStoredValue] = useState(initialValue)

  function setValue(value) {
    // 여기에 구현하세요
  }

  return [storedValue, setValue]
}

export default useLocalStorage
