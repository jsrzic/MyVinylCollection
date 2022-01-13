import React, {useEffect, useState} from "react";

import { Card, Chip, IconButton } from "@mui/material";

import FaceIcon from '@mui/icons-material/Face';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

import VinylComponent from "./VinylComponent";
import {getRandomColor, IsMobile, ThemeContext} from "../util/utils";
import authHeader from "../auth-header";
import AdComponent from "./AdComponent";

function VinylCard({ vinylData, favVinyls, updateFunction}) {
    const api = process.env.REACT_APP_API_URL;

    const cardDimension = IsMobile() ? 100 : 200;
    const vinylDimension = IsMobile() ? 75 : 150;
    const [color, setColor] = useState(getRandomColor());

    const wrapperStyle = {
        width: cardDimension,
        height: cardDimension,
        margin: "1rem",
    }
    const cardStyle = {
        background: color,
        width: cardDimension,
        minHeight: cardDimension,
        height: "15rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        justifySelf: "center"
    };
    const saleHeaderStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%",
    };

    return (
        <div style={wrapperStyle}>
            <Card style={cardStyle}>
                <div style={saleHeaderStyle}>
                    <Chip icon={<AttachMoneyIcon />}
                          label={<p style={{
                            fontWeight: 700,
                              fontSize: 16
                            }}>
                              50
                          </p>}
                          color="success"
                    />
                </div>
                <AdComponent size={vinylDimension} name={vinylData.album} />
                <div style={saleHeaderStyle}>
                    <Chip icon={<FaceIcon style={{color: "black"}}/>}
                          label={<p style={{
                              fontWeight: 600,
                              fontSize: 16,
                              color: "black"
                          }}>
                              username
                          </p>}
                    />
                </div>
            </Card>
        </div>
    );
}

export default VinylCard;
