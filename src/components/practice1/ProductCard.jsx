// 실습 1 문제 3에서 사용하는 작은 카드 컴포넌트
// 이 컴포넌트는 product 객체를 props로 받아 화면에 표시합니다. (수정하지 않아도 됩니다)
function ProductCard({ product }) {
  return (
    <div className="practice-card">
      <h4 style={{ margin: '0 0 4px', color: 'var(--text-h)' }}>
        {product.name}
      </h4>
      <p style={{ fontSize: 14 }}>
        {product.price.toLocaleString()}원 / 재고 {product.stock}개
      </p>
    </div>
  )
}

export default ProductCard
