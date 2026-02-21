import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import solarEnergyAbi from '../utils/SolarEnergy.json';

const Web3Context = createContext();

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);
    const [listings, setListings] = useState([]);
    const [listingCount, setListingCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    const connectWallet = async () => {
        if (!window.ethereum) {
            alert("Please install MetaMask!");
            return;
        }
        try {
            setLoading(true);
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            setAccount(address);

            const contractInstance = new ethers.Contract(
                CONTRACT_ADDRESS,
                solarEnergyAbi.abi,
                signer
            );
            setContract(contractInstance);
            await fetchListings(contractInstance);
        } catch (error) {
            console.error("Connection error:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchListings = async (contractInstance) => {
        if (!contractInstance) return;
        try {
            const count = await contractInstance.listingCount();
            setListingCount(Number(count));

            const fetchedListings = [];
            for (let i = 1; i <= count; i++) {
                const listing = await contractInstance.getListing(i);
                fetchedListings.push({
                    id: Number(listing.id),
                    seller: listing.seller,
                    totalEnergy: listing.totalEnergy.toString(),
                    remainingEnergy: listing.remainingEnergy.toString(),
                    pricePerUnit: listing.pricePerUnit.toString(),
                    isActive: listing.isActive
                });
            }
            setListings(fetchedListings);
        } catch (error) {
            console.error("Error fetching listings:", error);
        }
    };

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length > 0) {
                    connectWallet();
                } else {
                    setAccount(null);
                    setContract(null);
                }
            });
        }
    }, []);

    return (
        <Web3Context.Provider value={{
            account,
            contract,
            listings,
            listingCount,
            connectWallet,
            fetchListings,
            loading
        }}>
            {children}
        </Web3Context.Provider>
    );
};
