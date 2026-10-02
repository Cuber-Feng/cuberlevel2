import { Routes, Route, Navigate, NavLink, Outlet } from 'react-router-dom';
import About from './tabs/About.jsx';
import Appendix from './tabs/Appendix.jsx';
import Battle from './tabs/Battle.jsx';
import Search from './tabs/Search.jsx';
import './styles/app.css';
import searchIcon from './assets/nav/search.svg';
import battleIcon from './assets/nav/battle.svg';
import appendixIcon from './assets/nav/appendix.svg';
import aboutIcon from './assets/nav/about.svg';

// Layout component containing the Tab Navigation & Outlet
function TabsLayout() {
  const getTabStyle = ({ isActive }) => ({
    padding: '10px 16px',
    textDecoration: 'none',
    color: isActive ? '#002FA7' : '#333',
    borderTop: isActive ? '3px solid #002FA7' : '3px solid transparent',
    background: isActive ? '#dfeefb' : 'transparent',
    fontWeight: isActive ? 'bold' : 'normal',
  });

  return (
    <div id="main-container">
      <div id="top">
        <h1>Cuber's Score</h1>
        <nav>
          <NavLink to="search" style={getTabStyle}>
            <img src={searchIcon} alt="Search" />
            <div className="tab-label">Search</div>
          </NavLink>
          <NavLink to="battle" style={getTabStyle}>
            <img src={battleIcon} alt="Battle" />
            <div className="tab-label">Battle</div>
          </NavLink>
          <NavLink to="appendix" style={getTabStyle}>
            <img src={appendixIcon} alt="Appendix" />
            <div className="tab-label">Appendix</div>
          </NavLink>
          <NavLink to="about" style={getTabStyle}>
            <img src={aboutIcon} alt="About" />
            <div className="tab-label">About</div>
          </NavLink>
        </nav>
      </div>
      <div id="outlet-container">
        <Outlet />
      </div>
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
        <Route path="appendix" element={<Appendix />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}