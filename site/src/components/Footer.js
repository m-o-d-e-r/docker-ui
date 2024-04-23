import './Footer.css';


function Footer(props) {
    return (
        <div className="footer-container">
            {
                props.use_splitter ? <hr className="footer-splitter" /> : <></>
            }
            <div className="footer-inner">
                <ul className="footer-navbar">
                    <li><a className="footer-navbar-item" href="#">Email</a></li>
                    <li><a className="footer-navbar-item" href="#">Github</a></li>
                    <li>
                        <p>👋</p>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;
