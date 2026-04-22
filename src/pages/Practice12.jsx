import { useState } from "react";

function Practice12() {
  return (
    <div className="page">
      <h1>실습 12: onSubmit + 검증 + 제출 중 상태</h1>
      <p className="page-subtitle">챕터 3-3. onSubmit 이벤트 학습 후</p>

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
// 문제 1: form onSubmit + preventDefault 기본
// ─────────────────────────────────────────────
// 버튼 onClick 대신 form의 onSubmit을 쓰면 Enter 키 제출 / 기본 HTML 검증 등을 자동 지원합니다.
// 대신 반드시 e.preventDefault()로 페이지 새로고침을 막아야 합니다.
// ─────────────────────────────────────────────
function Problem1() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState(null);

  function handleSubmit(e) {
    // TODO 1-1: 가장 먼저 e.preventDefault()로 기본 새로고침을 막으세요.
    //   이 줄이 없으면 폼 제출 시 페이지가 리로드되어 State가 날아갑니다.
    // TODO 1-2: { email, password } 객체로 setResult를 호출해 제출 결과를 기록하세요.
  }

  return (
    <div className="exercise">
      <h3>문제 1: 로그인 폼 — onSubmit + preventDefault</h3>
      <p>
        Enter 키로도, 버튼 클릭으로도 제출되는 폼을 만드세요. 새로고침이
        발생하면 e.preventDefault()를 빠뜨린 것입니다.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          maxWidth: 420,
        }}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          required
        />
        <button type="submit">로그인</button>
      </form>

      {result && (
        <div
          className="practice-card"
          style={{ marginTop: 12, fontFamily: "var(--mono)", fontSize: 13 }}
        >
          제출 결과: {JSON.stringify(result)}
        </div>
      )}

      <p className="expected">
        기대 결과: 입력 후 Enter 또는 "로그인" 버튼 클릭 시 페이지 새로고침 없이
        제출 결과가 아래에 표시됩니다.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// 문제 2: 다단계 검증 (if → setError → return)
// ─────────────────────────────────────────────
// "조건이 맞으면 에러 저장하고 return"을 차례로 나열하면 복잡한 검증도 깔끔합니다.
// ─────────────────────────────────────────────
function Problem2() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setSuccessMessage("");

    // TODO 2-1: email.includes('@') 가 false면 setError('올바른 이메일을 입력해주세요') 후 return.
    // TODO 2-2: password.length < 8 이면 setError('비밀번호는 8자 이상이어야 해요') 후 return.
    // TODO 2-3: password !== passwordConfirm 이면 setError('비밀번호가 일치하지 않아요') 후 return.
    // TODO 2-4: 모든 검증 통과 시 setError('')로 초기화하고
    //           setSuccessMessage(`${email} 로 가입 완료!`)를 호출하세요.
    if (!email.includes("@")) {
      setError("올바른 이메일을 입력해주세요");
      return;
    }
    if (password.length < 8) {
      setError("비밀번호는 8자 이상이어야 한다고 임마");
      return;
    }
    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하질 않잖아");
      return;
    }
    setError("");
    setSuccessMessage(`${email}로 가입 완료!`);
  }

  return (
    <div className="exercise">
      <h3>문제 2: 다단계 검증 — 이메일 / 비밀번호 / 확인</h3>
      <p>
        세 가지 조건을 if → setError → return 패턴으로 차례대로 검증하세요.
        하나라도 걸리면 에러 메시지가 표시되고 제출이 중단됩니다.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          maxWidth: 420,
        }}
      >
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호 (8자 이상)"
        />
        <input
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="비밀번호 확인"
        />

        {error && (
          <p style={{ color: "crimson", margin: 0, fontSize: 13 }}>
            ⚠️ {error}
          </p>
        )}
        {successMessage && (
          <p style={{ color: "green", margin: 0, fontSize: 13 }}>
            ✅ {successMessage}
          </p>
        )}

        <button type="submit">가입하기</button>
      </form>

      <p className="expected">
        기대 결과: 각 조건에 맞지 않으면 해당 에러 문구가 표시되고, 모든 조건을
        만족해야만 초록색 성공 메시지가 뜹니다.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// 문제 3: 실제 POST 요청 + 제출 중 상태 (try/catch/finally)
// ─────────────────────────────────────────────
// JSONPlaceholder는 POST /posts 요청을 받아 "저장됐다"는 가짜 응답을 돌려줍니다.
// isSubmitting으로 버튼을 disabled 처리해서 연타를 막고, finally에서 해제하세요.
// ─────────────────────────────────────────────
function Problem3() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedPost, setSavedPost] = useState(null);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSavedPost(null);

    // TODO 3-1: 시작 시 setIsSubmitting(true), 끝(finally)에서 setIsSubmitting(false).
    // TODO 3-2: try 블록에서 아래 POST 요청을 보내세요.
    //   URL: https://jsonplaceholder.typicode.com/posts
    //   method: 'POST'
    //   headers: { 'Content-Type': 'application/json' }
    //   body: JSON.stringify({ title, body, userId: 1 })
    // TODO 3-3: res.ok가 false면 throw new Error('요청 실패')
    // TODO 3-4: 응답 JSON을 setSavedPost에 저장하세요.
    // TODO 3-5: catch에서 setError(err.message)로 에러 메시지 저장.
  }

  return (
    <div className="exercise">
      <h3>문제 3: POST 요청 + isSubmitting</h3>
      <p>
        아래 폼을 JSONPlaceholder에 POST로 전송하세요. 요청 중에는 버튼을
        비활성화하고 문구를 바꿔야 합니다.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          maxWidth: 520,
        }}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
          required
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="본문"
          rows={4}
          style={{
            padding: 8,
            border: "1px solid var(--border)",
            borderRadius: 6,
            background: "var(--bg)",
            color: "var(--text-h)",
            fontFamily: "inherit",
            fontSize: 14,
          }}
          required
        />

        {/* TODO 3-6: 버튼에 disabled={isSubmitting}를 설정하고,
                     isSubmitting이 true일 때 "전송 중..." 아닐 때 "게시물 작성"으로 문구를 바꾸세요. */}
        <button type="submit">게시물 작성</button>

        {error && (
          <p style={{ color: "crimson", margin: 0, fontSize: 13 }}>
            ⚠️ {error}
          </p>
        )}
      </form>

      {savedPost && (
        <div
          className="practice-card"
          style={{ marginTop: 12, fontFamily: "var(--mono)", fontSize: 13 }}
        >
          서버 응답: {JSON.stringify(savedPost)}
        </div>
      )}

      <p className="expected">
        기대 결과: 제출 시 버튼이 "전송 중..."으로 바뀌며 비활성화되고, 응답이
        도착하면 서버가 돌려준 id(예: 101)가 포함된 JSON이 표시됩니다.
      </p>
    </div>
  );
}

export default Practice12;
