import React from "react";

import VinylCollection from "../components/VinylCollection";

function HomePage() {

  const mockData = [
    {name: "Bohemian Rhapsody", forSale: true, ad: true},
    {name: "Tražena si roba u gradu", forSale: true, ad: false},
    {name: "Mesečar", forSale: false, ad: true},
    {name: "Vraćam se majci u Bosnu", forSale: false, ad: false},
    {name: "Instant crush", forSale: false, ad: false},
    {name: "Don't cry", forSale: false, ad: false},
    {name: "Three little birds", forSale: true, ad: false},
    {name: "Without me", forSale: false, ad: true},
    {name: "Đuskanje ne pomaže", forSale: false, ad: false},
    {name: "Highlife", forSale: true, ad: true},
    {name: "Namazan U Kocki", forSale: false, ad: false},
    {name: "Lemonade", forSale: true, ad: false},
    {name: "Džin i limunada", forSale: false, ad: true},
    {name: "Run to the hills", forSale: false, ad: true},
  ]
  return (
    <VinylCollection data={mockData}/>
  );
}

export default HomePage;
