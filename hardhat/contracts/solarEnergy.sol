// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


//import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";



contract SolarEnergy is ReentrancyGuard{

    struct EnergyListing{


    uint256 id; //  listing the no of resource

    address seller; // address of seller 

    uint totalEnergy; // how much energy  (kwh)
    uint remainingEnergy;

    uint pricePerUnit; // price per unit of energy (1 wei)


    bool isActive;  // to check that energy is available or not
    }

    uint public  listingCount;

    mapping(uint => EnergyListing) public listings; // ampping kr jaise meri energy dusre ki energy 

    mapping(address => uint)  public pendingWithdrawls;

    // events bnayenge blockchain jo dikhayega ki energy list hogi aur energy purchased hui 

    event EnergyList(
        uint indexed id,
        address  indexed seller,// jo energy list kr rha hai
        uint amount,// kitni energy list kr rha hai
        uint pricePerUnit // price per unit of energy (1 wei)
        
    );
    event EnergyPurchased(
        uint indexed id,
        address  indexed buyer,// jo energy purchase kr rha hai

        uint amountBought,
    
        uint amount


    );
     event Withdrawn(
        address indexed seller,
        uint256 amount
    );

    modifier validId(uint _id)  {

        require(_id >0 && _id <=listingCount,"Invalid id");

        _;


    }

    modifier Listing(uint _id){

        require(listings[_id].isActive,"Id Not Active");

        _;
    }
    modifier seller(uint _id){

        require(listings[_id].seller !=msg.sender,"Seeler Cannot Buy");

        _;
    }


    

    // abh seller ki energy  ki listings krenge
    function listEnergy(uint256 _totalEnergy, uint256 _pricePerUnit) public {

        require(_totalEnergy > 0, "Total energy must be greater than zero"); // if energy is 0 then it will not list)
        require(_pricePerUnit >0,"Price must be greater then Zero");// if price less than zero then no need to sell

        

listingCount++;

listings[listingCount] = EnergyListing(

    listingCount,
    msg.sender,

    _totalEnergy,
    _totalEnergy,
    _pricePerUnit,
    true


);










emit EnergyList(

    listingCount,
    msg.sender,
    _totalEnergy,
    _pricePerUnit
    
    
);
    }

function buyEnergy(uint256 _listingId, uint256 _amount)
    external
    payable
    validId(_listingId)
    Listing(_listingId)
    seller(_listingId)
    nonReentrant
{
    EnergyListing storage listing = listings[_listingId];

    require(_amount > 0, "Invalid amount");
    require(_amount <= listing.remainingEnergy, "Not enough energy available");

    uint totalPrice = _amount * listing.pricePerUnit;

    require(msg.value == totalPrice, "Incorrect ETH sent");

    // Reduce remaining energy
    listing.remainingEnergy -= _amount;

    // If no energy left → deactivate listing
    if (listing.remainingEnergy == 0) {
        listing.isActive = false;
    }

    // Pull payment pattern
    pendingWithdrawls[listing.seller] += msg.value;

    emit EnergyPurchased(
        _listingId,
        msg.sender,
        _amount,
        totalPrice
    );
}


   



 function withdraw() external nonReentrant {

        uint256 amount = pendingWithdrawls[msg.sender];
        require(amount > 0, "No funds to withdraw");

        pendingWithdrawls[msg.sender] = 0;

        payable(msg.sender).transfer(amount);

        emit Withdrawn(msg.sender, amount);
    }
     function getListing(uint256 _id)
        external
        view
        validId(_id)
        returns (EnergyListing memory)
    {
        return listings[_id];
    }


}