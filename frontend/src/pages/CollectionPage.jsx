import React from "react";
import VinylCollection from "../components/VinylCollection";
import {Card} from "@mui/material";
import {getRandomColor, IsMobile} from "../util/utils";
import AddIcon from '@mui/icons-material/Add';
import {useHistory} from "react-router-dom";

function CollectionPage() {
  const cardDimension = IsMobile() ? 100 : 200;
  const vinylDimension = IsMobile() ? 75 : 150;

  const cardStyle = {
    background: "#D59A88",
    width: cardDimension,
    minHeight: cardDimension,
    height: "12rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "1rem",
    flexDirection: "column",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    position: "relative",
    justifySelf: "center"
  };

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

  const history = useHistory();
  const addNewVinylCard =
    <Card style={cardStyle} onClick={() => history.push("/dashboard/add-vinyl")}>
      <AddIcon style={{width: "100px", height: "100px"}}/>
      <h2>Add new Vinyl</h2>
    </Card>;

  return (
    <VinylCollection data={mockData} initialCard={addNewVinylCard}/>
  );
}

export default CollectionPage;