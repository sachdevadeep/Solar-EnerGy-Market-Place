import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from '../context/Web3Context';
import './Dashboard.css';

export default function SellDashboard() {
    const { contract, account, listings, fetchListings } = useWeb3();
    const [listAmount, setListAmount] = useState('');
    const [listPrice, setListPrice] = useState('');
    const [loading, setLoading] = useState(false);

    const handleListEnergy = async (e) => {
        e.preventDefault();
        if (!contract) return;
        try {
            setLoading(true);
            const priceInWei = ethers.parseEther(listPrice.toString());
            const tx = await contract.listEnergy(listAmount, priceInWei);
            await tx.wait();
            alert("Energy listed successfully!");
            await fetchListings(contract);
            setListAmount('');
            setListPrice('');
        } catch (error) {
            console.error("Error listing energy:", error);
            alert("Error listing energy. Check console.");
        } finally {
            setLoading(false);
        }
    };

    const myListings = listings.filter(l => l.seller.toLowerCase() === account?.toLowerCase());

    if (!account) {
        return (
            <div className="dashboard-container">
                <div className="connect-prompt">
                    <h2>Please Connect Wallet to Sell Energy</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Register Energy Listing</h1>
                <p>Manage your energy listings and sales.</p>
            </div>

            <div className="dashboard-grid">
                <div className="card form-card">
                    <h2>Create New Listing</h2>
                    <form onSubmit={handleListEnergy} className="dashboard-form">
                        <div className="form-group">
                            <label>Energy Amount (kWh)</label>
                            <input
                                type="number"
                                placeholder="e.g. 50"
                                value={listAmount}
                                onChange={(e) => setListAmount(e.target.value)}
                                required
                                min="1"
                            />
                        </div>
                        <div className="form-group">
                            <label>Price Per Unit (ETH)</label>
                            <input
                                type="number"
                                placeholder="e.g. 100"
                                value={listPrice}
                                onChange={(e) => setListPrice(e.target.value)}
                                required
                                min="1"
                            />
                        </div>
                        <button type="submit" disabled={loading} className="btn-submit">
                            {loading ? 'Processing...' : 'List Energy'}
                        </button>
                    </form>
                </div>

                <div className="card listings-card">
                    <h2>Your Active Listings</h2>
                    {myListings.length === 0 ? (
                        <p className="empty-state">You haven't listed any energy yet.</p>
                    ) : (
                        <div className="listings-list">
                            {myListings.map(listing => (
                                listing.isActive && (
                                    <div key={listing.id} className="listing-item">
                                        <div className="item-details">
                                            <span className="item-id">#{listing.id}</span>
                                            <div className="item-stats">
                                                <span>⚡ {listing.remainingEnergy} / {listing.totalEnergy} kWh</span>
                                                <span className="price-tag">{ethers.formatEther(listing.pricePerUnit)} ETH/Unit</span>
                                            </div>
                                        </div>
                                        <div className="item-status active">Active</div>
                                    </div>
                                )
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
