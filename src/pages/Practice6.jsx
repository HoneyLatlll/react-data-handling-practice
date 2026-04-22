import { useEffect, useState } from "react";

function Practice6() {
  return (
    <div className="page">
      <h1>실습 6: 페이지네이션 구현</h1>
      <p className="page-subtitle">
        챕터 2-4. 페이지네이션 개념 · 2-5. 페이지네이션 구현하기 학습 후
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
// 문제 1: Load More 방식 — 이어붙이기
// ─────────────────────────────────────────────
// "더 보기" 버튼을 누르면 다음 페이지 데이터를 기존 목록에 "이어붙여" 표시합니다.
// setState 시 스프레드로 이전 배열과 합쳐야 합니다. (useState는 앞 실습에서 학습)
// ─────────────────────────────────────────────
const LIMIT = 10;

function Problem1() {
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);

  // TODO 1-1: useEffect 안에서 JSONPlaceholder /posts에 offset, LIMIT로 요청하세요.
  //   URL: https://jsonplaceholder.typicode.com/posts?_start=${offset}&_limit=${LIMIT}
  // TODO 1-2: 받은 data를 기존 posts 뒤에 "이어붙여" setPosts에 저장하세요.
  //   ⚠️ 스프레드로 새 배열을 만드세요. push 금지!
  //   HINT: setPosts(prev => [...prev, ...data])
  // TODO 1-3: 의존성 배열은 [offset]로.
  useEffect(() => {
    async function loadPosts() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_start=${offset}&_limit=${LIMIT}`,
      );
      const data = await response.json();
      setPosts((prev) => [...prev, ...data]);
    }
    loadPosts();
  }, [offset]);

  function loadMore() {
    // TODO 1-4: offset을 LIMIT만큼 증가시키세요.
    //   HINT: setOffset(prev => prev + LIMIT)
    setOffset((prev) => prev + LIMIT);
  }

  return (
    <div className="exercise">
      <h3>문제 1: "더 보기" 버튼으로 이어붙이기</h3>
      <p>
        "더 보기" 버튼을 누를 때마다 10개씩 게시글이 목록에 추가되어야 합니다.
      </p>

      <ul className="practice-list">
        {posts.map((post) => (
          <li key={post.id}>
            <span>
              <strong>#{post.id}</strong> {post.title}
            </span>
          </li>
        ))}
      </ul>

      <div className="toolbar" style={{ marginTop: 12 }}>
        <button onClick={loadMore}>더 보기 (+{LIMIT})</button>
        <span style={{ alignSelf: "center", fontSize: 13 }}>
          현재 {posts.length}개 로드됨
        </span>
      </div>

      <p className="expected">
        기대 결과: 최초 진입 시 10개 → "더 보기" 1회 → 20개 → 2회 → 30개 ...
        누적 표시됩니다.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// 문제 2: "더 이상 없음" 처리 (hasMore)
// ─────────────────────────────────────────────
// JSONPlaceholder /posts는 총 100개입니다. 모두 로드하면 "더 보기" 버튼을 숨기세요.
// ─────────────────────────────────────────────
function Problem2() {
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_start=${offset}&_limit=${LIMIT}`,
      );
      const data = await res.json();

      // TODO 2-1: data.length < LIMIT 이면 setHasMore(false)로 끝을 표시하세요.
      //   (받은 개수가 요청보다 적으면 마지막 페이지라는 뜻)

      setPosts((prev) => [...prev, ...data]);
    }
    load();
  }, [offset]);

  return (
    <div className="exercise">
      <h3>문제 2: 마지막 페이지에 도달하면 버튼 숨기기</h3>
      <p>
        전체 100개를 다 로드하고 나면 "더 보기" 버튼을 숨기고 "모든 게시물을
        불러왔습니다" 메시지를 표시하세요.
      </p>

      <ul className="practice-list">
        {posts.map((post) => (
          <li key={post.id}>
            <span>
              <strong>#{post.id}</strong> {post.title}
            </span>
          </li>
        ))}
      </ul>

      <div className="toolbar" style={{ marginTop: 12 }}>
        {/* TODO 2-2: hasMore가 true일 때만 "더 보기" 버튼을 보여주고,
                    false일 때는 <p>✅ 모든 게시물을 불러왔습니다.</p>를 보여주세요. */}
        {/* HINT: 삼항 연산자 사용 */}
        <button onClick={() => setOffset((prev) => prev + LIMIT)}>
          더 보기
        </button>
      </div>

      <p className="expected">
        기대 결과: 10번 정도 "더 보기"를 누르면 100개를 모두 로드하고, 버튼이
        완료 메시지로 바뀝니다.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// 문제 3: 페이지 기반 방식 — 이전/다음 버튼
// ─────────────────────────────────────────────
// Load More와 달리 "교체"합니다. setPosts(prev => [...prev, ...])가 아니라
// setPosts(data)로 덮어씌우세요.
// ─────────────────────────────────────────────
const SIZE = 10;
const TOTAL_POSTS = 100;
const TOTAL_PAGES = Math.ceil(TOTAL_POSTS / SIZE); //올림을 해줘야 알맞음 페이지 보이는게

function Problem3() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // TODO 3-1: currentPage가 바뀔 때마다 해당 페이지 데이터를 fetch하세요.
  //   URL: https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${SIZE}
  //   받은 data를 setPosts(data)로 "교체"하세요. (이어붙이기 X)
  // TODO 3-2: 의존성 배열은 [currentPage]로.
  useEffect(() => {
    async function pageGiban() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${SIZE}`,
      );
      const data = await response.json();
      setPosts(data);
    }
    pageGiban();
  }, [currentPage]);

  return (
    <div className="exercise">
      <h3>문제 3: 페이지 기반 네비게이션 (이전/다음)</h3>
      <p>
        "이전" / "다음" 버튼으로 페이지를 이동하세요. 첫 페이지에서는 "이전",
        마지막 페이지에서는 "다음" 버튼이 disabled 되어야 합니다.
      </p>

      <ul className="practice-list">
        {posts.map((post) => (
          <li key={post.id}>
            <span>
              <strong>#{post.id}</strong> {post.title}
            </span>
          </li>
        ))}
      </ul>

      <div
        className="toolbar"
        style={{ marginTop: 12, justifyContent: "center" }}
      >
        {/* TODO 3-3: "이전" 버튼을 만들고, currentPage === 1일 때 disabled로 설정하세요.
                     클릭 시 setCurrentPage(prev => prev - 1) 호출. */}
        {/* {currentPage !== 1 && (
          <button onClick={() => setCurrentPage((prev) => prev - 1)}>
            이전
          </button>
        )} */}
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          이전
        </button>

        <span style={{ alignSelf: "center", fontSize: 14, padding: "0 12px" }}>
          {currentPage} / {TOTAL_PAGES}
        </span>

        {/* TODO 3-4: "다음" 버튼을 만들고, currentPage === TOTAL_PAGES일 때 disabled로 설정하세요.
                     클릭 시 setCurrentPage(prev => prev + 1) 호출. */}
        <button
          disabled={currentPage === TOTAL_PAGES}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          다음
        </button>
      </div>

      <p className="expected">
        기대 결과: 이전/다음으로 페이지 이동 시 목록이 완전히 교체되며,
        가장자리에선 해당 버튼이 비활성화됩니다.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// 문제 4: 페이지 번호 버튼 목록 (1, 2, 3 ... N)
// ─────────────────────────────────────────────
// Array.from({ length: N }, (_, i) => i + 1)로 [1..N] 배열을 만든 뒤 map 하세요.
// 현재 페이지 버튼은 .active 클래스로 강조하세요.
// ─────────────────────────────────────────────
function Problem4() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function load() {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${SIZE}`,
      );
      const data = await res.json();
      setPosts(data);
    }
    load();
  }, [currentPage]);

  return (
    <div className="exercise">
      <h3>문제 4: 페이지 번호 버튼 목록 만들기</h3>
      <p>
        1 ~ {TOTAL_PAGES}번까지의 페이지 버튼을 <code>Array.from</code>으로
        생성하세요. 현재 페이지 버튼은 <code>.active</code> 클래스로 강조합니다.
      </p>

      <ul className="practice-list">
        {posts.map((post) => (
          <li key={post.id}>
            <span>
              <strong>#{post.id}</strong> {post.title}
            </span>
          </li>
        ))}
      </ul>

      <div
        className="toolbar"
        style={{ marginTop: 12, justifyContent: "center" }}
      >
        {/* TODO 4-1: Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1)로
                     [1, 2, 3, ..., TOTAL_PAGES] 배열을 만들어 map 하세요. */}
        {/* TODO 4-2: 각 버튼에 key={page}, onClick={() => setCurrentPage(page)}를 설정하고,
                     className={page === currentPage ? 'active' : ''}로 강조하세요. */}
        {/* 여기에 map 코드를 작성하세요 */}
      </div>

      <p className="expected">
        기대 결과: 1 ~ {TOTAL_PAGES}번 페이지 버튼이 보이고, 클릭 시 해당 페이지
        데이터로 교체되며, 현재 페이지 버튼은 보라색(active)로 강조됩니다.
      </p>
    </div>
  );
}

export default Practice6;
