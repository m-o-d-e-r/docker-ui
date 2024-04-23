
import './Header.css';


function Header() {
    return (
        <div className="header-container">
            <div className="header-inner">
                <h1 className="logo-container">docker-ui by m-o-d-e-r</h1>
                <div className="navbar">
                    <a href="/" className="navbar-item">Home</a>
                    <a href="/dashboard" className="navbar-item">Dashboard</a>
                    <a href="/about" className="navbar-item">About</a>
                </div>
            </div>
        </div>
    );
}

export default Header;
