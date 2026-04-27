import { useEffect, useState } from "react";

function Practice10() {
  return (
    <div className="page">
      <h1>실습 10: 쿼리 파라미터로 데이터 요청</h1>
      <p className="page-subtitle">
        챕터 2-10. 쿼리 파라미터로 데이터 요청 학습 후
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
// 문제 1: 정렬 쿼리 파라미터
// ─────────────────────────────────────────────
// sortOrder state가 바뀔 때마다 서버에서 정렬된 결과를 다시 가져옵니다.
// JSONPlaceholder는 _sort, _order 파라미터를 지원합니다.
// ─────────────────────────────────────────────
function Problem1() {
  const [posts, setPosts] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");

  // TODO 1-1: useEffect에서 sortOrder에 따라 서버 정렬을 요청하세요.
  //   URL: https://jsonplaceholder.typicode.com/posts?_sort=id&_order=${sortOrder}&_limit=10
  useEffect(() => {
    async function Sortrequest() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_sort=id&_order=${sortOrder}&_limit=10`,
      );
      if (!response.ok) throw new Error("에러 발생 타입: ", response.status);
      const data = await response.json();
      setPosts(data);
    }
    Sortrequest();
  }, [sortOrder]);
  // TODO 1-2: 의존성 배열에 [sortOrder]를 넣으세요.

  return (
    <div className="exercise">
      <h3>문제 1: 서버 정렬 (오래된 순 / 최신 순)</h3>
      <p>
        정렬 버튼을 누르면 서버로 요청을 다시 보내 id 순서가 뒤바뀌어 표시되어야
        합니다.
      </p>

      <div className="toolbar">
        <button
          className={sortOrder === "asc" ? "active" : ""} //button active 아니면 기본 button css를 불러온다는것
          onClick={() => setSortOrder("asc")}
        >
          오래된 순 (id asc)
        </button>
        <button
          className={sortOrder === "desc" ? "active" : ""}
          onClick={() => setSortOrder("desc")}
        >
          최신 순 (id desc)
        </button>
      </div>

      <ul className="practice-list">
        {posts.map((post) => (
          <li key={post.id}>
            <span>
              <strong>#{post.id}</strong> {post.title}
            </span>
          </li>
        ))}
      </ul>

      <p className="expected">
        기대 결과: asc 선택 시 1, 2, 3... 순 / desc 선택 시 100, 99, 98...
        순으로 표시됩니다.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// 문제 2: 사용자 필터링 (userId)
// ─────────────────────────────────────────────
// "전체"를 선택하면 전체 게시글을, 특정 사용자를 선택하면 그 사용자의 게시글만 요청합니다.
// ─────────────────────────────────────────────
function Problem2() {
  const [userId, setUserId] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function load() {
      // TODO 2-1: userId가 비어있지 않으면 ?userId=${userId}를 붙이고, 비어있으면 전체 요청
      //   HINT: userId ? `...?userId=${userId}` : '...'
      const url = userId
        ? `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
        : `https://jsonplaceholder.typicode.com/posts`; // 이 줄을 수정하세요
      const res = await fetch(url);
      if (!res.ok) throw new Error("에러 http 상태 : ", res.status);
      const data = await res.json();
      console.log(typeof data);
      setPosts(data);
    }

    load();
  }, [userId]);

  return (
    <div className="exercise">
      <h3>문제 2: 특정 사용자의 게시글만 보기</h3>
      <p>
        드롭다운을 바꾸면 해당 사용자의 게시글만 서버에서 받아와 표시하세요.
      </p>

      <div className="toolbar">
        <label>
          사용자:&nbsp;
          <select value={userId} onChange={(e) => setUserId(e.target.value)}>
            <option value="">전체</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
              <option key={id} value={id}>
                {id}번 사용자
              </option>
            ))}
          </select>
        </label>
        <span style={{ alignSelf: "center", fontSize: 13 }}>
          {posts.length}개 게시글
        </span>
      </div>

      <ul className="practice-list">
        {posts.map((post) => (
          <li key={post.id}>
            <span>
              <strong>#{post.id}</strong> {post.title}
            </span>
            <span className="badge">user {post.userId}</span>
          </li>
        ))}
      </ul>

      <p className="expected">
        기대 결과: 전체 선택 시 100개, 특정 사용자 선택 시 10개 정도의 해당
        사용자 게시글만 표시됩니다.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// 문제 3: URLSearchParams로 안전하게 조립
// ─────────────────────────────────────────────
// 여러 파라미터를 조합할 땐 문자열 결합 대신 URLSearchParams를 쓰세요.
// 자동 인코딩 + 조건부 추가가 깔끔합니다.
// ─────────────────────────────────────────────
function Problem3() {
  const [userId, setUserId] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [limit, setLimit] = useState(5);
  const [posts, setPosts] = useState([]);
  const [lastUrl, setLastUrl] = useState("");

  useEffect(() => {
    async function load() {
      // TODO 3-1: URLSearchParams 인스턴스를 만들고, 값이 있을 때만 append 하세요.
      //   const params = new URLSearchParams()
      //   if (userId) params.append('userId', userId)
      //   params.append('_sort', 'id')
      //   params.append('_order', sortOrder)
      //   params.append('_limit', String(limit))
      const params = new URLSearchParams(); // 여기에 파라미터를 append 하세요

      const url = `https://jsonplaceholder.typicode.com/posts?${params.toString()}`;
      setLastUrl(url);

      const res = await fetch(url);
      const data = await res.json();
      setPosts(data);
    }
    load();
  }, [userId, sortOrder, limit]);

  return (
    <div className="exercise">
      <h3>문제 3: 여러 파라미터를 URLSearchParams로 조립</h3>
      <p>
        사용자/정렬/개수 조건을 모두 조합해 한 번에 요청하세요. 사용한 URL은
        아래에 표시됩니다.
      </p>

      <div className="toolbar">
        <label>
          사용자:&nbsp;
          <select value={userId} onChange={(e) => setUserId(e.target.value)}>
            <option value="">전체</option>
            {[1, 2, 3].map((id) => (
              <option key={id} value={id}>
                {id}번
              </option>
            ))}
          </select>
        </label>
        <label>
          정렬:&nbsp;
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">오름차순</option>
            <option value="desc">내림차순</option>
          </select>
        </label>
        <label>
          개수:&nbsp;
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </label>
      </div>

      <div
        className="practice-card"
        style={{
          fontFamily: "var(--mono)",
          fontSize: 12,
          wordBreak: "break-all",
        }}
      >
        {lastUrl || "아직 요청하지 않음"}
      </div>

      <ul className="practice-list" style={{ marginTop: 8 }}>
        {posts.map((post) => (
          <li key={post.id}>
            <span>
              <strong>#{post.id}</strong> {post.title}
            </span>
          </li>
        ))}
      </ul>

      <p className="expected">
        기대 결과: 조건을 바꿀 때마다 아래 URL이 변하고, 해당 조건으로
        필터·정렬된 게시글이 표시됩니다. "전체"를 선택하면 userId 파라미터는
        URL에 포함되지 않습니다.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// 문제 4: 검색 + 디바운싱 (setTimeout + cleanup)
// ─────────────────────────────────────────────
// 타이핑할 때마다 요청하면 네트워크 낭비입니다.
// useEffect 안에서 setTimeout으로 500ms 뒤 실행을 예약하고,
// cleanup에서 clearTimeout으로 이전 예약을 취소하세요.
// ─────────────────────────────────────────────
function Problem4() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    // TODO 4-1: setTimeout으로 500ms 뒤에 실행할 예약을 만드세요.
    //   - 예약된 콜백 안에서 fetch(`/posts?title_like=${keyword}&_limit=10`)를 실행
    //   - 결과를 setResults에 저장
    //   - 요청할 때마다 setRequestCount(prev => prev + 1)로 요청 횟수를 세세요.
    // TODO 4-2: useEffect의 return(cleanup)에서 clearTimeout으로 이전 타이머를 취소하세요.
    // HINT:
    //   const timerId = setTimeout(async () => {
    //     const res = await fetch(`https://jsonplaceholder.typicode.com/posts?title_like=${keyword}&_limit=10`)
    //     const data = await res.json()
    //     setResults(data)
    //     setRequestCount(prev => prev + 1)
    //   }, 500)
    //   return () => clearTimeout(timerId)
    const timerId = setTimeout(async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?title_like=${keyword}&_limit=10`,
      );
      const data = await res.json();
      setResults(data);
      setRequestCount((prev) => prev + 1);
    }, 500);
    return () => clearTimeout(timerId);
  }, [keyword]);

  return (
    <div className="exercise">
      <h3>문제 4: 검색 입력에 디바운싱 적용</h3>
      <p>
        입력할 때마다 요청을 보내지 말고, 타이핑이 500ms 멈췄을 때만 검색 요청을
        보내세요. 빠르게 "dolor"를 타이핑해도 요청 카운트가 1번만 올라가야
        합니다.
      </p>

      <div className="toolbar">
        <input
          type="search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="검색어 (예: dolor, qui, et)"
          style={{ flex: 1, minWidth: 240 }}
        />
        <span style={{ alignSelf: "center", fontSize: 13 }}>
          지금까지 보낸 요청: {requestCount}회
        </span>
      </div>

      <ul className="practice-list">
        {results.map((post) => (
          <li key={post.id}>
            <span>
              <strong>#{post.id}</strong> {post.title}
            </span>
          </li>
        ))}
      </ul>

      <p className="expected">
        기대 결과: 빠르게 한 번에 타이핑하면 요청 횟수는 1만 올라가고, 500ms
        이상 멈췄을 때만 검색이 실행됩니다.
      </p>
    </div>
  );
}

export default Practice10;
