import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from '../context/Web3Context';
import './Dashboard.css';

export default function BuyDashboard() {
    const { contract, account, listings, fetchListings } = useWeb3();
    const [buyAmount, setBuyAmount] = useState({});
    const [loadingId, setLoadingId] = useState(null);

    const handleBuyEnergy = async (listingId, pricePerUnit) => {
        if (!contract) return;
        const amount = buyAmount[listingId];
        if (!amount || amount <= 0) {
            alert("Please enter a valid amount");
            return;
        }
        try {
            setLoadingId(listingId);
            const totalPrice = BigInt(amount) * BigInt(pricePerUnit);
            const tx = await contract.buyEnergy(listingId, amount, { value: totalPrice.toString() });
            await tx.wait();
            alert("Energy purchased successfully!");
            await fetchListings(contract);
            setBuyAmount(prev => ({ ...prev, [listingId]: '' }));
        } catch (error) {
            console.error("Error buying energy:", error);
            const reason = error.reason || error.message || "Unknown error";
            alert(`Error buying energy: ${reason}. Check console for details.`);
        } finally {
            setLoadingId(null);
        }
    };

    const handleAmountChange = (id, value) => {
        setBuyAmount(prev => ({ ...prev, [id]: value }));
    };

    const activeListings = listings.filter(l => l.isActive && l.remainingEnergy > 0);

    if (!account) {
        return (
            <div className="dashboard-container">
                <div className="connect-prompt">
                    <h2>Please Connect Wallet to Buy Energy</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Buy Energy</h1>
                <p>Browse and purchase available renewable energy.</p>
            </div>

            <div className="marketplace-grid">
                {activeListings.length === 0 ? (
                    <div className="empty-state">No active listings available at the moment.</div>
                ) : (
                    activeListings.map(listing => (
                        <div key={listing.id} className="market-card">
                            <div className="market-card-header">
                                <span className="seller-badge">Seller: {listing.seller.slice(0, 6)}...</span>
                                <span className="price-badge">{ethers.formatEther(listing.pricePerUnit)} ETH/kWh</span>
                            </div>

                            <div className="market-card-body">
                                <div className="energy-stat">
                                    <div className="stat-label">Available Energy</div>
                                    <div className="stat-value">{listing.remainingEnergy} <small>kWh</small></div>
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${(listing.remainingEnergy / listing.totalEnergy) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            <div className="market-card-footer">
                                {listing.seller.toLowerCase() === account.toLowerCase() ? (
                                    <button className="btn-own" disabled>Your Listing</button>
                                ) : (
                                    <div className="buy-controls">
                                        <input
                                            type="number"
                                            placeholder="Amount"
                                            value={buyAmount[listing.id] || ''}
                                            onChange={(e) => handleAmountChange(listing.id, e.target.value)}
                                            max={listing.remainingEnergy}
                                            min="1"
                                        />
                                        <button
                                            onClick={() => handleBuyEnergy(listing.id, listing.pricePerUnit)}
                                            disabled={loadingId === listing.id}
                                            className="btn-buy"
                                        >
                                            {loadingId === listing.id ? 'Buying...' : 'Buy Now'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
