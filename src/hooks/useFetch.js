import { useEffect, useState } from 'react'

// 실습 16 문제 1
// ─────────────────────────────────────────────
// url을 받아 { data, loading, error }를 반환하는 커스텀 Hook을 만드세요.
// ─────────────────────────────────────────────
// TODO 1-1: data, loading, error를 각각 useState로 선언하세요.
//   - data 초기값: null
//   - loading 초기값: true
//   - error 초기값: null
// TODO 1-2: useEffect 안에서 fetch를 실행하세요.
//   - 시작 시 setLoading(true), setError(null)
//   - try: fetch(url) → res.ok 체크 → json → setData
//   - catch: setError(err.message)
//   - finally: setLoading(false)
// TODO 1-3: 의존성 배열은 [url] — url이 바뀌면 다시 fetch 합니다.
// TODO 1-4: { data, loading, error } 객체를 return 하세요.
// ─────────────────────────────────────────────
function useFetch(url) {
  // 여기에 구현하세요
  return { data: null, loading: false, error: null }
}

export default useFetch
