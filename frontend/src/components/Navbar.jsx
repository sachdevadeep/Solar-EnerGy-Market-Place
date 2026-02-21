import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';
import './Navbar.css';

export default function Navbar() {
    const { account, connectWallet } = useWeb3();
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    ☀️ SolarMarket
                </Link>

                <ul className="nav-menu">
                    <li className="nav-item">
                        <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/buy" className={`nav-link ${isActive('/buy')}`}>Buy Energy</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/sell" className={`nav-link ${isActive('/sell')}`}>Register Listing</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className={`nav-link ${isActive('/about')}`}>About</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>Contact</Link>
                    </li>
                </ul>

                <div className="nav-btn">
                    {account ? (
                        <div className="wallet-badge">
                            <span className="status-dot"></span>
                            {account.slice(0, 6)}...{account.slice(-4)}
                        </div>
                    ) : (
                        <button onClick={connectWallet} className="btn-connect">
                            Connect Wallet
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
