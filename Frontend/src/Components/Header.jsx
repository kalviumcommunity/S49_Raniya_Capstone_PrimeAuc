import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

const Header = () => {
    return (
        <header className="bg-dark text-white">
            <div className="container">
                <div className="row">
                    <div className="col">
                       <img src="" alt="logo" />
                    </div>
                    <div className="col-auto">
                        <nav>
                            <ul className="nav">
                                <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/FAQ">FAQ</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
