import { useState } from "react";

function Practice13() {
  return (
    <div className="page">
      <h1>실습 13: 파일 인풋 + FormData</h1>
      <p className="page-subtitle">챕터 3-4. 파일 인풋 학습 후</p>

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
// 문제 1: 파일 하나 선택하고 정보 표시
// ─────────────────────────────────────────────
// 파일 input의 값은 e.target.value가 아닌 e.target.files[0] 입니다.
// File 객체의 name / size / type 속성을 화면에 표시하세요.
// ─────────────────────────────────────────────
function Problem1() {
  const [file, setFile] = useState(null);

  function handleChange(e) {
    // TODO 1-1: e.target.files[0]을 꺼내 setFile에 저장하세요.
    //   ⚠️ value가 아니라 files[0] 입니다.
  }

  return (
    <div className="exercise">
      <h3>문제 1: 파일 선택 → 파일 정보 표시</h3>
      <p>파일 하나를 선택하면 이름 · 크기(KB) · MIME 타입이 보여야 합니다.</p>

      <input type="file" onChange={handleChange} />

      {file && (
        <div className="practice-card" style={{ marginTop: 12 }}>
          <p>
            📄 <strong>{file.name}</strong>
          </p>
          <p style={{ fontSize: 13, color: "var(--text)" }}>
            크기: {(file.size / 1024).toFixed(2)} KB · 타입:{" "}
            {file.type || "(알 수 없음)"}
          </p>
        </div>
      )}

      <p className="expected">
        기대 결과: 파일 선택 후 이름과 크기(KB), MIME 타입이 카드에 표시됩니다.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// 문제 2: 파일 타입/크기 검증 + accept
// ─────────────────────────────────────────────
// accept 속성은 파일 선택창만 필터링할 뿐, 코드로도 검증해야 합니다.
// 이미지가 아니거나 5MB를 초과하면 에러 메시지를 표시하세요.
// ─────────────────────────────────────────────
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

function Problem2() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    const selected = e.target.files[0];
    setError("");
    setImage(null);
    setPreviewUrl("");
    if (!selected) return;

    // TODO 2-1: selected.type이 'image/'로 시작하지 않으면
    //   setError('이미지 파일만 업로드 가능해요') 후 return 하세요.
    //   HINT: selected.type.startsWith('image/')

    // TODO 2-2: selected.size가 MAX_IMAGE_SIZE를 초과하면
    //   setError('5MB 이하만 가능해요') 후 return 하세요.

    // 통과하면 상태에 저장 + 미리보기 URL 생성
    setImage(selected);
    setPreviewUrl(URL.createObjectURL(selected));
  }

  return (
    <div className="exercise">
      <h3>문제 2: 이미지만 · 5MB 이하만 받기</h3>
      <p>
        이미지가 아닌 파일 또는 5MB를 넘는 파일을 선택하면 빨간 에러 문구가
        뜨고, 통과한 경우엔 미리보기가 보여야 합니다.
      </p>

      {/* TODO 2-3: input에 accept="image/*" 속성을 추가해 이미지만 필터링하세요. */}
      <input type="file" onChange={handleChange} />

      {error && (
        <p style={{ color: "crimson", marginTop: 8, fontSize: 13 }}>
          ⚠️ {error}
        </p>
      )}

      {image && previewUrl && (
        <div className="practice-card" style={{ marginTop: 12 }}>
          <img
            src={previewUrl}
            alt="미리보기"
            style={{ maxWidth: 240, borderRadius: 6 }}
          />
          <p style={{ fontSize: 13, marginTop: 6 }}>
            ✅ {image.name} ({(image.size / 1024).toFixed(1)} KB)
          </p>
        </div>
      )}

      <p className="expected">
        기대 결과: 5MB 이하 이미지만 미리보기와 함께 표시되고, 조건에 맞지
        않으면 에러 메시지가 표시됩니다.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// 문제 3: 여러 파일 선택 + 삭제
// ─────────────────────────────────────────────
// multiple 속성으로 여러 파일을 받고, FileList를 Array.from으로 배열로 바꿔야 map/filter가 가능합니다.
// ─────────────────────────────────────────────
function Problem3() {
  const [files, setFiles] = useState([]);

  function handleChange(e) {
    // TODO 3-1: e.target.files(FileList)를 Array.from으로 진짜 배열로 변환한 뒤 setFiles에 저장하세요.
    //   HINT: Array.from(e.target.files)
  }

  function removeAt(index) {
    // TODO 3-2: files에서 index 번째 요소를 제거한 새 배열을 만들어 setFiles에 저장하세요.
    //   HINT: files.filter((_, i) => i !== index)
  }

  return (
    <div className="exercise">
      <h3>문제 3: 여러 파일 선택 후 개별 삭제</h3>
      <p>
        <code>multiple</code> 속성을 붙여 여러 파일을 한 번에 선택하고, 각 항목
        옆 "❌" 버튼으로 삭제할 수 있게 만드세요.
      </p>

      {/* TODO 3-3: input에 multiple 속성을 추가하세요. */}
      <input type="file" onChange={handleChange} />

      <ul className="practice-list" style={{ marginTop: 12 }}>
        {files.map((file, index) => (
          <li key={`${file.name}-${index}`}>
            <span>
              📄 {file.name}
              <span
                style={{ color: "var(--text)", fontSize: 12, marginLeft: 8 }}
              >
                {(file.size / 1024).toFixed(1)} KB
              </span>
            </span>
            <button onClick={() => removeAt(index)}>❌</button>
          </li>
        ))}
      </ul>

      <p className="expected">
        기대 결과: 여러 파일을 한 번에 선택하면 목록이 보이고, ❌ 버튼으로 개별
        삭제가 가능합니다.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// 문제 4: FormData 조립 + 전송 준비
// ─────────────────────────────────────────────
// 파일을 업로드할 땐 JSON이 아닌 FormData를 씁니다.
// 이 실습에선 실제 업로드 대신, FormData에 담긴 엔트리를 화면에 나열해서 내용을 확인합니다.
// (실무: fetch(url, { method: 'POST', body: formData }) — Content-Type 헤더는 금지!)
// ─────────────────────────────────────────────
function Problem4() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [formDataEntries, setFormDataEntries] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    // TODO 4-1: FormData 인스턴스를 만드세요.
    //   const formData = new FormData()
    const formData = new FormData();
    // TODO 4-2: formData.append('file', file)로 파일을 추가하세요.
    // TODO 4-3: formData.append('description', description)로 설명을 추가하세요.
    // TODO 4-4: [...formData.entries()]를 만들어 setFormDataEntries에 저장하세요.
    //   (key, value 쌍이 배열 형태로 담깁니다)
    formData.append("file", file);
    formData.append("description", description);
    setFormDataEntries([...formData.entries()]);
    //
    // 💡 실무에선 여기서 바로:
    //   await fetch('/api/upload', { method: 'POST', body: formData })
    //   ⚠️ Content-Type 헤더를 직접 지정하지 마세요. FormData가 자동 설정합니다.
  }

  return (
    <div className="exercise">
      <h3>문제 4: FormData에 파일 + 텍스트 담기</h3>
      <p>
        파일 + 설명을 한 번에 FormData로 조립해서, 어떤 엔트리가 포함되는지
        확인하세요.
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
          type="file"
          onChange={(e) => setFile(e.target.files[0] ?? null)}
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="설명 (예: 프로필 사진)"
        />
        <button type="submit" disabled={!file}>
          FormData 만들기
        </button>
      </form>

      {formDataEntries.length > 0 && (
        <div className="practice-card" style={{ marginTop: 12 }}>
          <p style={{ fontSize: 13, color: "var(--text)" }}>FormData 엔트리:</p>
          <ul
            style={{ fontFamily: "var(--mono)", fontSize: 13, paddingLeft: 20 }}
          >
            {formDataEntries.map(([key, value], i) => (
              <li key={i}>
                <strong>{key}</strong>:{" "}
                {value instanceof File
                  ? `[File] ${value.name} (${value.size} bytes, ${value.type})`
                  : String(value)}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="expected">
        기대 결과: "FormData 만들기" 클릭 시 file(파일 정보)과
        description(텍스트) 두 엔트리가 나열됩니다.
      </p>
    </div>
  );
}

export default Practice13;
