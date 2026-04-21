import { NavLink, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import Practice1 from './pages/Practice1.jsx'
import Practice2 from './pages/Practice2.jsx'
import Practice3 from './pages/Practice3.jsx'
import Practice4 from './pages/Practice4.jsx'
import Practice5 from './pages/Practice5.jsx'
import Practice6 from './pages/Practice6.jsx'
import Practice7 from './pages/Practice7.jsx'
import Practice8 from './pages/Practice8.jsx'
import Practice9 from './pages/Practice9.jsx'
import Practice10 from './pages/Practice10.jsx'
import Practice11 from './pages/Practice11.jsx'
import Practice12 from './pages/Practice12.jsx'
import Practice13 from './pages/Practice13.jsx'
import Practice14 from './pages/Practice14.jsx'
import Practice15 from './pages/Practice15.jsx'
import Practice16 from './pages/Practice16.jsx'
import Practice17 from './pages/Practice17.jsx'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="gnb">
        <div className="gnb-inner">
          <NavLink to="/" className="gnb-logo">
            React 데이터 핸들링 실습
          </NavLink>
          <nav className="gnb-nav">
            <NavLink to="/" end>Home</NavLink>
            {Array.from({ length: 17 }, (_, i) => i + 1).map((n) => (
              <NavLink key={n} to={`/practice/${n}`}>
                {n}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/practice/1" element={<Practice1 />} />
          <Route path="/practice/2" element={<Practice2 />} />
          <Route path="/practice/3" element={<Practice3 />} />
          <Route path="/practice/4" element={<Practice4 />} />
          <Route path="/practice/5" element={<Practice5 />} />
          <Route path="/practice/6" element={<Practice6 />} />
          <Route path="/practice/7" element={<Practice7 />} />
          <Route path="/practice/8" element={<Practice8 />} />
          <Route path="/practice/9" element={<Practice9 />} />
          <Route path="/practice/10" element={<Practice10 />} />
          <Route path="/practice/11" element={<Practice11 />} />
          <Route path="/practice/12" element={<Practice12 />} />
          <Route path="/practice/13" element={<Practice13 />} />
          <Route path="/practice/14" element={<Practice14 />} />
          <Route path="/practice/15" element={<Practice15 />} />
          <Route path="/practice/16" element={<Practice16 />} />
          <Route path="/practice/17" element={<Practice17 />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
