import { useState } from "react";

function Practice2() {
  return (
    <div className="page">
      <h1>실습 2: filter로 아이템 삭제</h1>
      <p className="page-subtitle">
        챕터 1-3. filter로 아이템 삭제하기 학습 후
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
// 문제 1: 기본 삭제 기능 만들기
// ─────────────────────────────────────────────
// "삭제"는 "id가 다른 것만 남긴다"는 발상 전환이 필요합니다.
// filter는 원본을 바꾸지 않으므로 결과를 바로 setState에 넣으면 됩니다.
// ─────────────────────────────────────────────
function Problem1() {
  const [todos, setTodos] = useState([
    { id: 1, text: "운동하기" },
    { id: 2, text: "책 읽기" },
    { id: 3, text: "코딩하기" },
    { id: 4, text: "설거지하기" },
  ]);

  // TODO 1-1: deleteTodo(id) 함수를 작성하세요.
  //   - filter로 "id가 인자와 다른 것만 남긴" 새 배열을 만들고
  //   - setTodos에 그대로 넘겨 주세요.
  // HINT: todos.filter(todo => todo.id !== id)
  function deleteTodo(id) {
    // 여기에 구현하세요
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <div className="exercise">
      <h3>문제 1: 할 일 삭제 버튼</h3>
      <p>
        각 항목의 "삭제" 버튼을 누르면 해당 항목만 목록에서 사라져야 합니다.
      </p>

      <ul className="practice-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.text}</span>
            {/* TODO 1-2: 아래 버튼 onClick에서 deleteTodo(todo.id)를 호출하세요. */}
            {/* HINT: 매개변수를 전달할 땐 () => deleteTodo(todo.id) 처럼 화살표 함수로 감쌉니다. */}
            <button onClick={() => deleteTodo(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>

      <p className="expected">
        기대 결과: "삭제" 버튼을 누르면 해당 할 일만 목록에서 즉시 사라집니다.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// 문제 2: 삭제 확인 창 추가
// ─────────────────────────────────────────────
// 사용자 실수를 방지하기 위해 window.confirm으로 한 번 더 묻습니다.
// ─────────────────────────────────────────────
function Problem2() {
  const [products, setProducts] = useState([
    { id: 1, name: "노트북", price: 1200000 },
    { id: 2, name: "마우스", price: 30000 },
    { id: 3, name: "키보드", price: 80000 },
  ]);

  // TODO 2-1: deleteProduct(id, name) 함수를 작성하세요.
  //   - window.confirm(`${name}을(를) 삭제하시겠습니까?`)의 반환값이 true일 때만
  //   - filter로 products를 갱신하세요.
  function deleteProduct(id, name) {
    // 여기에 구현하세요
    if (window.confirm(`${name}을(를) 삭제하시겠습니까?`)) {
      setProducts(products.filter((product) => product.id !== id));
    }
  }

  return (
    <div className="exercise">
      <h3>문제 2: 삭제 전 확인 창 띄우기</h3>
      <p>
        "삭제" 버튼을 눌렀을 때 확인 창을 띄우고, "확인"을 눌렀을 때만 삭제되게
        만드세요.
      </p>

      <ul className="practice-list">
        {products.map((product) => (
          <li key={product.id}>
            <span>
              {product.name} — {product.price.toLocaleString()}원
            </span>
            {/* TODO 2-2: onClick에서 deleteProduct(product.id, product.name)을 호출하세요. */}
            <button onClick={() => deleteProduct(product.id, product.name)}>
              삭제
            </button>
          </li>
        ))}
      </ul>

      <p className="expected">
        기대 결과: "삭제" 버튼 클릭 → 브라우저 확인 창 표시 → "확인" 시에만 해당
        상품이 사라집니다.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// 문제 3: 완료된 항목 일괄 삭제
// ─────────────────────────────────────────────
// "done이 true인 것들을 없애자" = "done이 false인 것만 남기자"
// ─────────────────────────────────────────────
function Problem3() {
  const [todos, setTodos] = useState([
    { id: 1, text: "운동하기", done: true },
    { id: 2, text: "책 읽기", done: false },
    { id: 3, text: "코딩하기", done: true },
    { id: 4, text: "청소하기", done: false },
    { id: 5, text: "장보기", done: true },
  ]);

  function toggleDone(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  }

  // TODO 3-1: deleteCompleted 함수를 작성하세요.
  //   - done이 false인 항목만 남기도록 filter를 사용하세요.
  // HINT: todos.filter(todo => !todo.done)
  function deleteCompleted() {
    // 여기에 구현하세요
    setTodos(todos.filter((todo) => todo.done === false));
  }

  return (
    <div className="exercise">
      <h3>문제 3: 완료된 항목만 한 번에 삭제</h3>
      <p>
        체크박스로 완료 상태를 토글한 뒤, "완료된 항목 삭제" 버튼으로 모든 완료
        항목을 한 번에 지우세요.
      </p>

      <div className="toolbar">
        {/* TODO 3-2: 아래 버튼 onClick에서 deleteCompleted를 연결하세요. */}
        <button onClick={deleteCompleted}>완료된 항목 삭제</button>
        {/* ()=>deleteCompleted() 이거랑 헷갈리지 말자 용도가 다르니까 */}
      </div>

      <ul className="practice-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleDone(todo.id)}
              />
              <span
                style={{ textDecoration: todo.done ? "line-through" : "none" }}
              >
                {todo.text}
              </span>
            </label>
          </li>
        ))}
      </ul>

      <p className="expected">
        기대 결과: 완료 체크된 항목들이 "완료된 항목 삭제" 버튼 한 번으로 전부
        사라집니다.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// 문제 4: 렌더링 시점 필터링 (State를 바꾸지 않기)
// ─────────────────────────────────────────────
// "카테고리별 보기"처럼 원본 데이터를 지우지 않고 화면만 걸러내는 경우에는
// setState를 하면 안 됩니다. 대신 렌더링 시점에 filter를 계산하세요.
// ─────────────────────────────────────────────
function Problem4() {
  const [products] = useState([
    { id: 1, name: "노트북", price: 1200000, category: "전자기기" },
    { id: 2, name: "마우스", price: 30000, category: "전자기기" },
    { id: 3, name: "티셔츠", price: 25000, category: "의류" },
    { id: 4, name: "청바지", price: 60000, category: "의류" },
    { id: 5, name: "사과", price: 5000, category: "식품" },
  ]);
  const [filter, setFilter] = useState("all");

  // TODO 4-1: filteredProducts를 렌더링 시점에 계산하세요.
  //   - filter === 'all'  → products 전체
  //   - 그 외 → product.category === filter 인 것만
  // HINT: const filteredProducts = products.filter(p => filter === 'all' || p.category === filter)
  // ⚠️ 주의: 이 값은 state가 아니라 "계산된 값(파생 상태)"입니다. useState 사용 금지!
  const filteredProducts = products.filter(
    (p) => filter === "all" || p.category === filter,
  );

  return (
    <div className="exercise">
      <h3>문제 4: 카테고리별 상품 필터링 (원본 유지)</h3>
      <p>
        버튼을 눌러 카테고리를 바꿔도 원본 상품 목록은 그대로 두고, 화면에만
        필터링된 결과가 보이도록 만드세요.
      </p>

      <div className="toolbar">
        {/* TODO 4-2: 각 버튼을 눌렀을 때 setFilter로 필터값을 바꾸고,현재 filter와 같으면 className="active"를 적용하세요. */}
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          전체
        </button>
        {/* TODO 4-3: '전자기기', '의류', '식품' 버튼을 동일한 패턴으로 추가하세요. */}
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("전자기기")}
        >
          전자기기
        </button>
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("의류")}
        >
          의류
        </button>
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("식품")}
        >
          식품
        </button>
      </div>

      <ul className="practice-list">
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <span>
              [{product.category}] {product.name}
            </span>
            <span>{product.price.toLocaleString()}원</span>
          </li>
        ))}
      </ul>

      <p className="expected">
        기대 결과: 버튼 클릭 시 해당 카테고리 상품만 보이고, "전체"를 누르면
        다시 전부 표시됩니다. 원본 products는 절대 바뀌지 않습니다.
      </p>
    </div>
  );
}

export default Practice2;
