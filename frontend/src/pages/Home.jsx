import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
    return (
        <div className="home-container">
            <div className="hero-section">
                <h1 className="hero-title">
                    Powering the Future with <span className="highlight">Decentralized Energy</span>
                </h1>
                <p className="hero-subtitle">
                    Buy and sell excess solar energy directly on the blockchain.
                    Transparent, secure, and efficient.
                </p>
                <div className="hero-buttons">
                    <Link to="/buy" className="btn btn-primary">Buy Energy</Link>
                    <Link to="/sell" className="btn btn-outline">Start Selling</Link>
                </div>
            </div>

            <div className="features-grid">
                <div className="feature-card">
                    <div className="icon">⚡</div>
                    <h3>Instant Trading</h3>
                    <p>List your energy and get paid instantly securely via smart contracts.</p>
                </div>
                <div className="feature-card">
                    <div className="icon">🔒</div>
                    <h3>Secure & Transparent</h3>
                    <p>All transactions are verified on the blockchain for complete transparency.</p>
                </div>
                <div className="feature-card">
                    <div className="icon">🌱</div>
                    <h3>Green Energy</h3>
                    <p>Support renewable energy by trading solar power within your community.</p>
                </div>
            </div>

            <div className="community-section">
                <h2>Join Our Growing Community</h2>
                <div className="button-group">
                    <Link to="/contact" className="btn btn-secondary">Get Support</Link>
                    <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="btn btn-dark">View Code</a>
                </div>
            </div>
        </div>
    );
}
