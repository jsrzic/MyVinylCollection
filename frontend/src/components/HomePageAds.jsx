import React, { useEffect } from "react";
import AdCard from "./AdCard";

function HomePageAds({ exchangeAds, saleAds }) {
  const containerGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "2rem",
  };

  return (
    <div style={containerGridStyle}>
      {saleAds.map((ad) => (
        <AdCard
          username={ad.username}
          price={ad.saleAd.price}
          name={ad.saleAd.vinyl.album}
          isSale
          id={ad.saleAd.id}
          ad={ad}
        />
      ))}
      {exchangeAds.map((ad) => (
        <AdCard
          username={ad.username}
          name={ad.exchangeAd.vinyl.album}
          id={ad.exchangeAd.id}
          ad={ad}
        />
      ))}
    </div>
  );
}

export default HomePageAds;
