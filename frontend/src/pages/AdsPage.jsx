import React from "react";
import VinylCard from "../components/VinylCard";
import Button from "@mui/material/Button";
import authHeader from "../auth-header";
import AdCard from "../components/AdCard";

const postData =  {
    "price":200.0,
    "vinyl":{
        "id": 8,
        "album": "Queen",
        "artist": {
            "id": 10,
            "name": "Queen"
        },
        "releaseYear": 1987,
        "genre": {
            "id": 5,
            "name": "EDM",
            "subgenres": []
        },
        "subgenre": null,
        "conditionEvaluation": 4,
        "description": "ok",
        "priceKn": 90.0,
        "diameter": 78.0,
        "capacity": "89",
        "reproductionQuality": "ok",
        "nmbOfAudioChannels": 7,
        "timeOfReproduction": "01:00:30",
        "rpm": "9",
        "rare": true
    }
}

function AdsPage() {
    const api = process.env.REACT_APP_API_URL;
    const origin = process.env.REACT_APP_URL;

    function postVinyl() {
        fetch(api + "/ads/sale_ads", {
            method: "POST",
            headers: {
                Authorization: authHeader(),
                'Content-Type': 'application/json',
                Origin: origin
            },
            body: JSON.stringify(postData)
        }).then(r => console.log(r))
    }

    function getVinyl() {
        fetch(api + "/ads/active", {
            method: "GET",
            headers: {
                Authorization: authHeader(),
                Origin: origin,
                'Content-Type': 'application/json'
            },
        }).then(r => console.log(r.json()))
    }

    return(
        <div>
            <div>
                <h1>Active Ads</h1>
                <div style={{
                    display: "flex",
                    maxWidth: window.innerWidth*0.83,
                    height: "20rem",
                    overflow: "scroll",
                }}>
                    <Button onClick={postVinyl}>POST</Button>
                    <AdCard vinylData={{ name: "Bohemian Rhapsody", forSale: true, ad: true }} />
                    <AdCard vinylData={{ name: "Bohemian Rhapsody", forSale: true, ad: true }} />
                    <AdCard vinylData={{ name: "Bohemian Rhapsody", forSale: true, ad: true }} />
                    <AdCard vinylData={{ name: "Bohemian Rhapsody", forSale: true, ad: true }} />
                    <AdCard vinylData={{ name: "Bohemian Rhapsody", forSale: true, ad: true }} />
                    <AdCard vinylData={{ name: "Bohemian Rhapsody", forSale: true, ad: true }} />
                    <AdCard vinylData={{ name: "Bohemian Rhapsody", forSale: true, ad: true }} />
                    <AdCard vinylData={{ name: "Bohemian Rhapsody", forSale: true, ad: true }} />
                    <AdCard vinylData={{ name: "Bohemian Rhapsody", forSale: true, ad: true }} />
                    <AdCard vinylData={{ name: "Bohemian Rhapsody", forSale: true, ad: true }} />
                </div>
            </div>
            <div>
                <h1>Bought Ads</h1>
                <div style={{
                    display: "flex",
                    maxWidth: window.innerWidth*0.83,
                    height: "20rem",
                    overflow: "scroll",
                }}>
                    <AdCard vinylData={{ name: "Bohemian Rhapsody", forSale: true, ad: true }} />
                    <AdCard vinylData={{ name: "Bohemian Rhapsody", forSale: true, ad: true }} />
                    <AdCard vinylData={{ name: "Bohemian Rhapsody", forSale: true, ad: true }} />
                    <AdCard vinylData={{ name: "Bohemian Rhapsody", forSale: true, ad: true }} />
                    <AdCard vinylData={{ name: "Bohemian Rhapsody", forSale: true, ad: true }} />
                    <AdCard vinylData={{ name: "Bohemian Rhapsody", forSale: true, ad: true }} />
                    <AdCard vinylData={{ name: "Bohemian Rhapsody", forSale: true, ad: true }} />
                    <AdCard vinylData={{ name: "Bohemian Rhapsody", forSale: true, ad: true }} />
                    <AdCard vinylData={{ name: "Bohemian Rhapsody", forSale: true, ad: true }} />
                    <AdCard vinylData={{ name: "Bohemian Rhapsody", forSale: true, ad: true }} />
                </div>
            </div>
            <div>
                <h1>Sold Ads</h1>
                <div style={{
                    display: "flex",
                    maxWidth: window.innerWidth*0.83,
                    height: "20rem",
                    overflow: "scroll",
                }}>
                    <AdCard vinylData={{ name: "Bohemian Rhapsody", forSale: true, ad: true }} />
                    <AdCard vinylData={{ name: "Bohemian Rhapsody", forSale: true, ad: true }} />
                    <AdCard vinylData={{ name: "Bohemian Rhapsody", forSale: true, ad: true }} />
                    <AdCard vinylData={{ name: "Bohemian Rhapsody", forSale: true, ad: true }} />
                    <AdCard vinylData={{ name: "Bohemian Rhapsody", forSale: true, ad: true }} />
                    <AdCard vinylData={{ name: "Bohemian Rhapsody", forSale: true, ad: true }} />
                    <AdCard vinylData={{ name: "Bohemian Rhapsody", forSale: true, ad: true }} />
                    <AdCard vinylData={{ name: "Bohemian Rhapsody", forSale: true, ad: true }} />
                    <AdCard vinylData={{ name: "Bohemian Rhapsody", forSale: true, ad: true }} />
                    <AdCard vinylData={{ name: "Bohemian Rhapsody", forSale: true, ad: true }} />
                </div>
            </div>
        </div>
    )
}

export default AdsPage