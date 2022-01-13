import React from 'react';
import VinylCard from "./VinylCard";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

function ExchangeOffer({sender, offer}) {
  const containerStyle = {
    display: "flex"
  };

  const vinylUserStyle = {
    display: "flex",
    flexDirection: "column"
  }

  return (
    <div>
      <h2>Offer from {sender}</h2>
      <div style={containerStyle}>
        <div style={vinylUserStyle}>
          <VinylCard vinylData={offer.receivingVinyl}/>
          <p>Your vinyl</p>
        </div>
        <CompareArrowsIcon fontSize="large"/>
        <div>
          <VinylCard vinylData={offer.givingVinyl}/>
          <p>{sender}'s vinyl</p>
        </div>
      </div>
    </div>
  );
}

export default ExchangeOffer;