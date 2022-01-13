import React from 'react';
import AdCard from "./AdCard";

function HomePageAds({exchangeAds, saleAds}) {
  const containerGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "2rem"
  };

  return (
    <div style={containerGridStyle}>
      {saleAds.map(ad => <AdCard username={"MATE"} price={ad.price} name={ad.vinyl.album} isSale id={ad.id}/>)}
      {exchangeAds.map(ad => <AdCard username={"MATE"}  name={ad.vinyl.album} id={ad.id}/>)}
    </div>
  );
}

export default HomePageAds;