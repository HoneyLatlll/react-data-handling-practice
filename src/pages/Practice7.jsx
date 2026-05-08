import { useEffect, useState } from "react";

function Practice7() {
  return (
    <div className="page">
      <h1>실습 7: 함수형 업데이트로 Stale State 해결</h1>
      <p className="page-subtitle">
        챕터 2-6. 비동기로 State 변경할 때 주의사항 학습 후
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
    </div>
  );
}

// ─────────────────────────────────────────────
// 문제 1: 지연된 비동기 안에서 Stale State 해결
// ─────────────────────────────────────────────
// 버튼을 누르면 1초 뒤에 count가 +1 되어야 합니다.
// 사용자가 버튼을 빠르게 연타했을 때도 "누른 횟수만큼" 정확히 증가해야 합니다.
// ─────────────────────────────────────────────
function Problem1() {
  const [count, setCount] = useState(0);

  function handleClick() {
    // TODO 1-1: 1초(1000ms) 뒤에 count를 +1 하도록 setTimeout을 작성하세요.
    //   ❌ 잘못된 예: setTimeout(() => setCount(count + 1), 1000)
    //     → 빠르게 연타하면 각각 "클릭 당시의 count"를 캡처해서 같은 값만 저장합니다.
    //   ✅ 올바른 예: setTimeout(() => setCount(prev => prev + 1), 1000)
    //     → React가 실행 시점의 최신 값을 prev로 넣어줍니다.
    setTimeout(() => setCount((prev) => prev + 1), 1000);
  }

  return (
    <div className="exercise">
      <h3>문제 1: 1초 후 +1 (빠르게 연타해도 정확히 증가해야 함)</h3>
      <p>
        "1초 후 +1" 버튼을 빠르게 5번 눌러 보세요. 5초 뒤 값이 5여야 정답입니다.
        함수형 업데이트를 사용하지 않으면 1로 멈춥니다.
      </p>

      <div
        className="practice-card"
        style={{ fontSize: 28, textAlign: "center" }}
      >
        count: {count}
      </div>

      <div className="toolbar" style={{ marginTop: 12 }}>
        <button onClick={handleClick}>1초 후 +1</button>
        <button onClick={() => setCount(0)}>리셋</button>
      </div>

      <p className="expected">
        기대 결과: 버튼을 N번 누르면 잠시 후 count가 정확히 N만큼 증가합니다.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// 문제 2: 한 함수 안에서 setState를 여러 번
// ─────────────────────────────────────────────
// 같은 렌더링 사이클 안에서 setCount를 3번 호출하면 3 증가해야 합니다.
// 값 전달 방식으로 쓰면 3번 다 같은 기준값을 쓰기 때문에 1만 증가합니다.
// ─────────────────────────────────────────────
function Problem2() {
  const [count, setCount] = useState(0);

  function handleBad() {
    // ❌ 학습용 잘못된 예시 — 이 함수는 수정하지 마세요.
    // 한 함수 안에서 count + 1을 3번 호출하면, count는 여전히 "현재 렌더링의 값"이라
    // setCount(0+1), setCount(0+1), setCount(0+1) 이 되어 결국 +1만 됩니다.
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }

  function handleGood() {
    // TODO 2-1: setCount(prev => prev + 1)을 3번 호출해서 실제로 +3 되도록 구현하세요.
    //   함수형 업데이트를 쓰면 React가 각 호출마다 누적된 최신 값을 넘겨줍니다.
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  }

  return (
    <div className="exercise">
      <h3>문제 2: "한 번에 +3" 버튼 (함수형 업데이트 필수)</h3>
      <p>
        아래 "❌ 값 전달 +3" 버튼을 눌러 보면 1씩만 증가합니다. 반면 "✅ 함수형
        +3"은 정확히 3씩 증가해야 합니다.
      </p>

      <div
        className="practice-card"
        style={{ fontSize: 28, textAlign: "center" }}
      >
        count: {count}
      </div>

      <div className="toolbar" style={{ marginTop: 12 }}>
        <button onClick={handleBad}>❌ 값 전달 +3 (버그 확인용)</button>
        <button onClick={handleGood}>✅ 함수형 +3</button>
        <button onClick={() => setCount(0)}>리셋</button>
      </div>

      <p className="expected">
        기대 결과: "❌ 값 전달 +3"은 1씩만 증가 / "✅ 함수형 +3"은 3씩 증가.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// 문제 3: Load More 누적에서 함수형 업데이트
// ─────────────────────────────────────────────
// 비동기 fetch가 끝난 뒤 setState를 하기 때문에, 여러 요청이 겹치면 중간 결과가 묻힙니다.
// 반드시 setPosts(prev => [...prev, ...data]) 패턴을 쓰세요.
// ─────────────────────────────────────────────
function Problem3() {
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const LIMIT = 5;

  useEffect(() => {
    async function load() {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_start=${offset}&_limit=${LIMIT}`,
      );
      const data = await res.json();
      setPosts((prev) => [...prev, ...data]);

      // TODO 3-1: setPosts를 함수형 업데이트로 작성해서, 기존 posts 뒤에 data를 이어붙이세요.
      //   ❌ 값 전달: setPosts([...posts, ...data])  → 빠르게 연타 시 일부가 덮어써짐
      //   ✅ 함수형:  setPosts(prev => [...prev, ...data])  → 항상 누적
    }
    load();
  }, [offset]);

  function loadMore() {
    // TODO 3-2: offset도 함수형 업데이트로 증가시키세요.
    //   HINT: setOffset(prev => prev + LIMIT)
    setOffset((prev) => prev + LIMIT);
  }

  return (
    <div className="exercise">
      <h3>문제 3: Load More 누적 패턴</h3>
      <p>
        "더 보기"를 빠르게 연타해도 중복 없이, 빠짐 없이 게시글이 누적되어야
        합니다. posts와 offset 모두 함수형 업데이트를 사용하세요.
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
          로드된 개수: {posts.length}
        </span>
      </div>

      <p className="expected">
        기대 결과: 연타해도 정확히 5개씩 누적되어 목록에 추가됩니다.
      </p>
    </div>
  );
}

export default Practice7;
