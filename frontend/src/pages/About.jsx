import React from 'react';
import './About.css';

export default function About() {
    return (
        <div className="about-container">
            <div className="about-hero">
                <h1>About Us</h1>
                <p>We are revolutionizing the energy grid with blockchain technology.</p>
            </div>

            <div className="mission-content">
                <div className="section-card">
                    <h2>Our Mission</h2>
                    <p>
                        Our goal is to create a decentralized energy marketplace where individuals can trade surplus renewable energy directly with their community, reducing reliance on centralized grids and promoting sustainability.
                    </p>
                </div>

                <div className="section-card">
                    <h2>Why Blockchain?</h2>
                    <ul className="benefits-list">
                        <li><strong>Transparency:</strong> Every transaction is recorded on the public ledger.</li>
                        <li><strong>Security:</strong> Smart contracts ensure trustless and secure payments.</li>
                        <li><strong>Efficiency:</strong> Peer-to-peer trading eliminates intermediaries and fees.</li>
                    </ul>
                </div>
            </div>

            <div className="cta-section">
                <h2>Join the Revolution</h2>
                <button className="btn-join">Learn More</button>
            </div>
        </div>
    );
}
