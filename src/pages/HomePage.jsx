import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="page">
      <h1>React 데이터 핸들링 실습</h1>
      <p className="page-subtitle">
        챕터 1. 배열과 데이터 렌더링 · 챕터 2. 데이터 가져오기 · 챕터 3. 입력 폼 다루기 · 챕터 4. 데이터 전송하기 · 챕터 5. 전역 데이터 다루기
      </p>

      <h2 style={{ fontSize: 20, marginTop: 28, marginBottom: 8 }}>
        챕터 1. 배열과 데이터 렌더링
      </h2>
      <div className="home-grid">
        <Link to="/practice/1">
          <strong>실습 1</strong>
          <span>map으로 배열 렌더링하기</span>
        </Link>
        <Link to="/practice/2">
          <strong>실습 2</strong>
          <span>filter로 아이템 삭제하기</span>
        </Link>
        <Link to="/practice/3">
          <strong>실습 3</strong>
          <span>조건부 렌더링과 key의 중요성</span>
        </Link>
        <Link to="/practice/4">
          <strong>실습 4</strong>
          <span>여러 State 관리와 불변성</span>
        </Link>
      </div>

      <h2 style={{ fontSize: 20, marginTop: 28, marginBottom: 8 }}>
        챕터 2. 데이터 가져오기
      </h2>
      <div className="home-grid">
        <Link to="/practice/5">
          <strong>실습 5</strong>
          <span>useEffect + fetch로 초기 데이터 가져오기</span>
        </Link>
        <Link to="/practice/6">
          <strong>실습 6</strong>
          <span>페이지네이션 (Load More / 페이지 기반)</span>
        </Link>
        <Link to="/practice/7">
          <strong>실습 7</strong>
          <span>함수형 업데이트로 Stale State 해결</span>
        </Link>
        <Link to="/practice/8">
          <strong>실습 8</strong>
          <span>useState Lazy 초기화</span>
        </Link>
        <Link to="/practice/9">
          <strong>실습 9</strong>
          <span>로딩 + 에러 4단계 렌더링</span>
        </Link>
        <Link to="/practice/10">
          <strong>실습 10</strong>
          <span>쿼리 파라미터 (정렬/필터/검색)</span>
        </Link>
      </div>

      <h2 style={{ fontSize: 20, marginTop: 28, marginBottom: 8 }}>
        챕터 3. 입력 폼 다루기
      </h2>
      <div className="home-grid">
        <Link to="/practice/11">
          <strong>실습 11</strong>
          <span>제어 / 비제어 컴포넌트</span>
        </Link>
        <Link to="/practice/12">
          <strong>실습 12</strong>
          <span>onSubmit + 검증 + 제출 중 상태</span>
        </Link>
        <Link to="/practice/13">
          <strong>실습 13</strong>
          <span>파일 인풋 + FormData</span>
        </Link>
        <Link to="/practice/14">
          <strong>실습 14</strong>
          <span>useRef 기초 (DOM 접근 · 타이머 ID)</span>
        </Link>
      </div>

      <h2 style={{ fontSize: 20, marginTop: 28, marginBottom: 8 }}>
        챕터 4. 데이터 전송하기
      </h2>
      <div className="home-grid">
        <Link to="/practice/15">
          <strong>실습 15</strong>
          <span>POST / PATCH / DELETE로 CRUD 완성</span>
        </Link>
        <Link to="/practice/16">
          <strong>실습 16</strong>
          <span>커스텀 Hook (useFetch · useLocalStorage · useForm)</span>
        </Link>
      </div>

      <h2 style={{ fontSize: 20, marginTop: 28, marginBottom: 8 }}>
        챕터 5. 전역 데이터 다루기
      </h2>
      <div className="home-grid">
        <Link to="/practice/17">
          <strong>실습 17</strong>
          <span>Context API (Props Drilling · Theme · Cart 분리)</span>
        </Link>
      </div>
    </div>
  )
}

export default HomePage
