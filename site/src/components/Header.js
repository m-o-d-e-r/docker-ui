import { useLocation } from 'react-router-dom';
import './Header.css';


function Header() {
    const location = useLocation();

    return (
        <div className="header-container">
            <div className="header-inner">
                <h1 className="logo-container">docker-ui by m-o-d-e-r</h1>
                <div className="navbar">
                    <a href="/" className={`navbar-item ${location.pathname === '/' ? 'navbar-item-active' : ''}`}>Home</a>
                    <a href="/dashboard" className={`navbar-item ${location.pathname === '/dashboard' ? 'navbar-item-active' : ''}`}>Dashboard</a>
                    <a href="/about" className={`navbar-item ${location.pathname === '/about' ? 'navbar-item-active' : ''}`}>About</a>
                </div>
            </div>
        </div>
    );
}

export default Header;
