import { useEffect, useState } from "react";

function Practice5() {
  return (
    <div className="page">
      <h1>실습 5: useEffect + fetch로 초기 데이터 가져오기</h1>
      <p className="page-subtitle">
        챕터 2-1. fetch · 2-2. useEffect 초기 데이터 · 2-3. useEffect 자세히
        학습 후
      </p>

      <Problem1 />
      <hr
        style={{
          margin: "32px 0",
          border: 0,
          borderTop: "1px solid var(--border)",
        }}
      />
      <Problem2 />
      <hr
        style={{
          margin: "32px 0",
          border: 0,
          borderTop: "1px solid var(--border)",
        }}
      />
      <Problem3 />
      <hr
        style={{
          margin: "32px 0",
          border: 0,
          borderTop: "1px solid var(--border)",
        }}
      />
      <Problem4 />
    </div>
  );
}

// ─────────────────────────────────────────────
// 문제 1: useEffect로 사용자 목록 한 번만 fetch
// ─────────────────────────────────────────────
// 컴포넌트 본문에 fetch를 바로 쓰면 무한 루프! → useEffect([])에 넣어야 합니다.
// useEffect 콜백 자체에 async를 붙이면 안 되므로, 내부에 async 함수를 선언해서 호출하세요.
// ─────────────────────────────────────────────
function Problem1() {
  const [users, setUsers] = useState([]);

  // TODO 1-1: useEffect 안에서 async function fetchUsers()를 선언하고
  //   https://jsonplaceholder.typicode.com/users 에서 데이터를 받아 setUsers에 넣으세요.
  // TODO 1-2: fetchUsers()를 useEffect 내부에서 호출하세요.
  // TODO 1-3: 의존성 배열은 빈 배열 []로 해서 최초 1번만 실행되게 하세요.
  // HINT:
  //   useEffect(() => {
  //     async function fetchUsers() {
  //       const res = await fetch('...')
  //       const data = await res.json()
  //       setUsers(data)
  //     }
  //     fetchUsers()
  //   }, [])
  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );
      const data = await response.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  return (
    <div className="exercise">
      <h3>문제 1: 사용자 목록 가져오기</h3>
      <p>
        <code>https://jsonplaceholder.typicode.com/users</code>에서 10명의
        사용자를 불러와 화면에 표시하세요.
      </p>

      <ul className="practice-list">
        {users.map((user) => (
          <li key={user.id}>
            <span>
              <strong>{user.name}</strong>
              <span
                style={{ color: "var(--text)", marginLeft: 8, fontSize: 13 }}
              >
                {user.email}
              </span>
            </span>
            <span className="badge">{user.company?.name}</span>
          </li>
        ))}
      </ul>

      <p className="expected">
        기대 결과: 페이지 진입 시 사용자 10명이 이름·이메일·회사명과 함께
        목록으로 보여야 합니다.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// 문제 2: 의존성 배열이 있는 useEffect
// ─────────────────────────────────────────────
// 선택한 userId가 바뀔 때마다 해당 사용자의 게시글을 다시 가져와야 합니다.
// 의존성 배열에 [userId]를 넣으세요.
// ─────────────────────────────────────────────
function Problem2() {
  const [userId, setUserId] = useState(1);
  const [posts, setPosts] = useState([]);

  // TODO 2-1: userId가 바뀔 때마다 해당 사용자의 게시글을 fetch하세요.
  //   URL: https://jsonplaceholder.typicode.com/posts?userId=${userId}
  // TODO 2-2: 의존성 배열에 [userId]를 넣어 userId 변경 시 Effect가 재실행되게 하세요.
  useEffect(() => {
    async function fetchUserId() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
      );
      const data = await response.json();
      setPosts(data);
    }
    fetchUserId();
  }, [userId]);

  return (
    <div className="exercise">
      <h3>문제 2: 선택한 사용자의 게시글 가져오기</h3>
      <p>
        사용자 id를 바꾸면 해당 사용자의 게시글만 다시 불러와 화면이 갱신되어야
        합니다.
      </p>

      <div className="toolbar">
        <label>
          사용자 ID:&nbsp;
          <select
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((id) => (
              <option key={id} value={id}>
                {id}번
              </option>
            ))}
          </select>
        </label>
        <span style={{ alignSelf: "center", fontSize: 13 }}>
          가져온 게시글 {posts.length}개
        </span>
      </div>

      <ul className="practice-list">
        {posts.map((post) => (
          <li key={post.id}>
            <span style={{ flex: 1 }}>{post.title}</span>
          </li>
        ))}
      </ul>

      <p className="expected">
        기대 결과: userId를 바꿀 때마다 목록이 초기화되고 해당 사용자의 게시글만
        새로 표시됩니다.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// 문제 3: cleanup 함수로 타이머 정리하기
// ─────────────────────────────────────────────
// useEffect 안에서 setInterval을 시작하면, 컴포넌트가 사라질 때(또는 Effect 재실행 전)
// 반드시 clearInterval로 정리해야 합니다. 그렇지 않으면 메모리 누수/경고가 발생합니다.
// ─────────────────────────────────────────────
function Problem3() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  // TODO 3-1: isRunning이 true일 때만 setInterval로 1초마다 seconds를 +1 하세요.
  //   setSeconds(prev => prev + 1) 형태로 함수형 업데이트를 사용하세요. (이유는 실습 7에서!)
  // TODO 3-2: useEffect가 반환하는 cleanup 함수에서 clearInterval로 타이머를 정리하세요.
  // TODO 3-3: 의존성 배열에 [isRunning]을 넣어, 시작/정지 토글 시 Effect가 재실행되게 하세요.
  // HINT:
  //   useEffect(() => {
  //     if (!isRunning) return
  //     const timerId = setInterval(() => setSeconds(prev => prev + 1), 1000)
  //     return () => clearInterval(timerId)
  //   }, [isRunning])
  useEffect(() => {
    if (!isRunning) return;
    const timerId = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    return () => clearInterval(timerId);
  }, [isRunning]);

  return (
    <div className="exercise">
      <h3>문제 3: 1초마다 증가하는 타이머 (cleanup 필수)</h3>
      <p>
        시작/정지를 토글할 수 있는 초 단위 타이머를 만들고, cleanup으로
        interval을 정리하세요.
      </p>

      <div
        className="practice-card"
        style={{ fontSize: 28, textAlign: "center" }}
      >
        {seconds}초
      </div>

      <div className="toolbar" style={{ marginTop: 12 }}>
        <button onClick={() => setIsRunning((prev) => !prev)}>
          {isRunning ? "정지" : "시작"}
        </button>
        <button onClick={() => setSeconds(0)}>리셋</button>
      </div>

      <p className="expected">
        기대 결과: 시작 시 1초마다 값이 증가하고, 정지하면 멈춥니다. 다른 실습
        페이지로 이동해도 콘솔에 경고가 뜨지 않아야 합니다.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// 문제 4: 조건부 Effect — "2글자 이상일 때만 fetch"
// ─────────────────────────────────────────────
// useEffect 자체를 if로 감싸면 Hook 규칙 위반! Hook은 항상 최상단에 두고,
// Effect 본문 첫 줄에서 early return으로 걸러내세요.
// ─────────────────────────────────────────────
function Problem4() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  // TODO 4-1: keyword.length < 2 이면 setResults([]) 하고 early return 하세요.
  // TODO 4-2: 그 외에는 아래 URL로 fetch 해서 setResults에 넣으세요.
  //   URL: https://jsonplaceholder.typicode.com/posts?title_like=${keyword}
  // TODO 4-3: 의존성 배열에 [keyword]를 넣으세요.
  // HINT:
  //   useEffect(() => {
  //     if (keyword.length < 2) { setResults([]); return }
  //     async function search() { ... }
  //     search()
  //   }, [keyword])
  // ⚠️ useEffect를 if로 감싸지 마세요! Hook은 항상 같은 순서로 호출되어야 합니다.

  return (
    <div className="exercise">
      <h3>문제 4: 검색어가 2글자 이상일 때만 검색 요청</h3>
      <p>
        입력한 검색어가 2글자 미만이면 요청을 보내지 말고, 2글자 이상일 때만
        <code>/posts?title_like=...</code>로 검색하세요.
      </p>

      <div className="toolbar">
        <input
          type="search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="영문 단어로 검색 (예: qui, dolor)"
          style={{ flex: 1, minWidth: 200 }}
        />
        <span style={{ alignSelf: "center", fontSize: 13 }}>
          결과 {results.length}개
        </span>
      </div>

      <ul className="practice-list">
        {results.slice(0, 10).map((post) => (
          <li key={post.id}>
            <span>{post.title}</span>
          </li>
        ))}
      </ul>

      <p className="expected">
        기대 결과: 검색어 1글자 이하에서는 결과가 비어있고, 2글자 이상이면 검색
        결과가 목록으로 표시됩니다.
      </p>
    </div>
  );
}

export default Practice5;
