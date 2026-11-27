import "./styles/app.css";
import "./styles/svgicons.css";
import { Routes, Route, Navigate, NavLink, Outlet } from "react-router-dom";
import About from "./tabs/About.jsx";
import Appendix from "./tabs/Appendix.jsx";
import Battle from "./tabs/Battle.jsx";
import Search from "./tabs/Search.jsx";
import Leaderboard from "./tabs/Leaderboard.jsx";

// Layout component containing the Tab Navigation & Outlet
function TabsLayout() {
  return (
    <div id="app">
      <aside id="sidebar">
        <h1 className="app-title">Cuber's Score</h1>
        <nav>
          <NavLink to="search" className="nav-item">
            <div className="icon icon-search"></div>
            <div className="tab-label">Search</div>
          </NavLink>
          <NavLink to="battle" className="nav-item">
            <div className="icon icon-battle"></div>
            <div className="tab-label">Battle</div>
          </NavLink>
          <NavLink to="leaderboard" className="nav-item">
            <div className="icon icon-leaderboard"></div>
            <div className="tab-label">Leaderboard</div>
          </NavLink>
          <NavLink to="appendix" className="nav-item">
            <div className="icon icon-appendix"></div>
            <div className="tab-label">Appendix</div>
          </NavLink>
          <NavLink to="about" className="nav-item">
            <div className="icon icon-about"></div>
            <div className="tab-label">About</div>
          </NavLink>
        </nav>
        <footer>
          <p>
            <small>&copy; 2026 Cody Feng (2017FENG35). All rights reserved.</small>
          </p>
        </footer>
      </aside>

      <main id="outlet-container">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TabsLayout />}>
        <Route index element={<Navigate to="search" replace />} />
        <Route path="search" element={<Search />} />
        <Route path="battle" element={<Battle />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="appendix" element={<Appendix />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}
