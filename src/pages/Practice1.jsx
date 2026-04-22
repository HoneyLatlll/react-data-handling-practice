import ProductCard from "../components/practice1/ProductCard.jsx";

function Practice1() {
  return (
    <div className="page">
      <h1>실습 1: map으로 배열 렌더링</h1>
      <p className="page-subtitle">
        챕터 1-1. React로 데이터 다루기 · 1-2. map으로 배열 렌더링하기 학습 후
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
      <hr
        style={{
          margin: "32px 0",
          border: 0,
          borderTop: "1px solid var(--border)",
        }}
      />
      <Problem5 />
    </div>
  );
}

// ─────────────────────────────────────────────
// 문제 1: 단순 배열을 map으로 렌더링
// ─────────────────────────────────────────────
// 가장 기본적인 map 사용법을 연습합니다.
// 문자열 배열을 <li> 태그로 변환해 <ul> 안에 뿌려 보세요.
// ─────────────────────────────────────────────
function Problem1() {
  const fruits = ["사과", "바나나", "오렌지", "포도", "딸기"];

  return (
    <div className="exercise">
      <h3>문제 1: 과일 목록을 ul &gt; li로 렌더링</h3>
      <p>fruits 배열을 map으로 순회해서 li 요소를 만들어 보세요.</p>

      {/* TODO 1-1: 아래 ul 안에 fruits를 map으로 렌더링하세요. */}
      {/* HINT: key에는 index를 사용해도 OK (이 배열은 바뀌지 않으므로) */}
      <ul className="practice-list">
        {/* 여기에 map 코드를 작성하세요 */}
        {fruits.map((fruit) => (
          <li>{fruit}</li>
        ))}
      </ul>

      <p className="expected">
        기대 결과: 사과 / 바나나 / 오렌지 / 포도 / 딸기 5개 항목이 차례로 보여야
        합니다.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// 문제 2: 객체 배열을 map으로 렌더링 (id를 key로)
// ─────────────────────────────────────────────
// 실무에서 90% 사용하는 패턴입니다.
// 각 항목의 여러 정보를 꺼내 쓰고, key는 반드시 id를 사용하세요.
// ─────────────────────────────────────────────
function Problem2() {
  const members = [
    { id: 101, name: "홍길동", role: "프론트엔드 개발자" },
    { id: 102, name: "김철수", role: "백엔드 개발자" },
    { id: 103, name: "이영희", role: "디자이너" },
    { id: 104, name: "박민수", role: "PM" },
  ];

  return (
    <div className="exercise">
      <h3>문제 2: 팀 멤버 목록 렌더링</h3>
      <p>members 배열을 map으로 순회해서, 이름과 역할을 화면에 표시하세요.</p>

      {/* TODO 2-1: members.map으로 아래 div 안에 멤버 카드를 렌더링하세요. */}
      {/* TODO 2-2: key에는 member.id를 사용하세요. */}
      {/* HINT: <div className="practice-card"> 안에 이름(<strong>)과 역할(<span>)을 함께 표시해보세요. */}
      <div className="practice-card">
        {/* 여기에 map 코드를 작성하세요 */}
        {members.map((member) => (
          <div key={member.key}>
            {/* 하나의 요소만 반환할 수 있기 때문에 div로 감싸야함 ㅇㅇ */}
            <strong>이름: {member.name} </strong>
            <span>역할: {member.role} </span>
            <br />
          </div>
        ))}
      </div>

      <p className="expected">
        기대 결과: 홍길동 / 김철수 / 이영희 / 박민수 4명의 카드가 이름과 역할과
        함께 보여야 합니다.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// 문제 3: 컴포넌트로 분리하기
// ─────────────────────────────────────────────
// JSX가 복잡해지면 작은 컴포넌트로 쪼개는 것이 정석입니다.
// ProductCard 컴포넌트는 이미 만들어져 있습니다.
// (../components/practice1/ProductCard.jsx)
// ─────────────────────────────────────────────
function Problem3() {
  const products = [
    { id: 1, name: "노트북", price: 1200000, stock: 5 },
    { id: 2, name: "마우스", price: 30000, stock: 15 },
    { id: 3, name: "키보드", price: 80000, stock: 8 },
    { id: 4, name: "모니터", price: 350000, stock: 3 },
  ];

  return (
    <div className="exercise">
      <h3>문제 3: ProductCard 컴포넌트로 렌더링</h3>
      <p>
        products 배열을 map으로 순회해서 각 항목을 <code>ProductCard</code>{" "}
        컴포넌트로 렌더링하세요.
      </p>

      {/* TODO 3-1: products.map으로 ProductCard를 렌더링하세요. */}
      {/* TODO 3-2: product 객체를 prop으로 넘기고, key는 product.id를 사용하세요. */}
      {/* HINT: <ProductCard key={...} product={...} /> 형태 */}

      <div>
        {/* 여기에 map 코드를 작성하세요 */}
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
        {/* {products.map((product)=>{
          return <li key={product.id}>상품 이름: {product.name} 상품 가격: {product.price*product.stock}</li>
        })} */}
      </div>

      <p className="expected">
        기대 결과: 노트북/마우스/키보드/모니터 4개의 상품 카드가
        이름·가격·재고와 함께 보여야 합니다.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// 문제 4: 조건부 렌더링과 함께
// ─────────────────────────────────────────────
// active 값이 true인 사용자에게만 "활성" 뱃지를 표시해 보세요.
// ─────────────────────────────────────────────
function Problem4() {
  const users = [
    { id: 1, name: "홍길동", active: true },
    { id: 2, name: "김철수", active: false },
    { id: 3, name: "이영희", active: true },
    { id: 4, name: "박민수", active: false },
  ];

  return (
    <div className="exercise">
      <h3>문제 4: 활성 사용자에게만 뱃지 표시</h3>
      <p>
        map으로 사용자 목록을 렌더링하되, <code>active</code>가 true인
        사용자에게만 "활성" 뱃지를 보여주세요.
      </p>

      {/* TODO 4-1: users.map으로 li 요소들을 렌더링하세요. key는 user.id */}
      {/* TODO 4-2: user.active가 true일 때만 <span className="badge">활성</span>을 표시하세요. */}
      {/* HINT: {user.active && <span className="badge">활성</span>} 처럼 && 연산자를 사용합니다. */}
      <ul className="practice-list">
        {/* 여기에 map 코드를 작성하세요 */}
        {users.map((user) => (
          <li key={user.id}>
            <span>{user.name}</span>
            {user.active && <span className="badge">활성</span>}
          </li>
        ))}
      </ul>

      <p className="expected">
        기대 결과: 4명 모두 이름이 보이되, 홍길동/이영희 옆에만 "활성" 뱃지가
        표시됩니다.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// 문제 5: 중첩 배열 렌더링
// ─────────────────────────────────────────────
// 배열 안에 배열이 있을 때는 map 안에 또 다른 map을 사용합니다.
// ─────────────────────────────────────────────
function Problem5() {
  const categories = [
    { id: 1, name: "과일", items: ["사과", "바나나", "오렌지"] },
    { id: 2, name: "채소", items: ["양파", "당근", "배추"] },
    { id: 3, name: "유제품", items: ["우유", "치즈", "요거트"] },
  ];

  return (
    <div className="exercise">
      <h3>문제 5: 카테고리별 아이템 렌더링</h3>
      <p>
        바깥쪽 map으로 카테고리를, 안쪽 map으로 각 카테고리의 items를
        렌더링하세요.
      </p>

      {/* TODO 5-1: categories.map으로 각 카테고리 블록을 만들고, h4에 카테고리 이름을 표시하세요. */}
      {/* TODO 5-2: 각 카테고리 안에서 items.map으로 li들을 렌더링하세요. */}
      {/* HINT: 바깥쪽 key는 category.id, 안쪽 key는 index 또는 item 문자열을 써도 OK */}
      <div>
        {/* 여기에 중첩 map 코드를 작성하세요 */}
        {categories.map((category) => {
          //return 안쓰고도 쓸 수 있긴 해 근데 구분이 아직 좀 어려워서 바꾸기 귀찮
          return (
            <div key={category.key}>
              <h4>{category.name}</h4>
              {category.items.map((item) => {
                return (
                  <div key={item}>
                    <li>{item}</li>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <p className="expected">
        기대 결과: "과일(사과/바나나/오렌지)", "채소(양파/당근/배추)",
        "유제품(우유/치즈/요거트)" 세 카테고리가 각각 아이템 리스트와 함께
        표시됩니다.
      </p>
    </div>
  );
}

export default Practice1;
