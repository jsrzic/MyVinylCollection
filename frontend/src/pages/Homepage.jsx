import React from 'react'
import vinyl from '../assets/vinyl.png'
import '../index.css'
import Button from "../components/Button";

const homepageStyle = {
    maxHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'linear-gradient(45deg, #e66465, #9198e5)',
}

const homepageHeaderStyle = {
    width: '95%',
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-between',
    margin: 'auto',
    marginBottom: '7rem'
}

const imageStyle = {
    animation: 'rotation 20s infinite linear'
}

const titleStyle = {
    fontSize: '5rem'
}

function Homepage() {
    return (
        <div style={homepageStyle}>
            <div style={homepageHeaderStyle}>
                <h1 style={titleStyle}>My Vinyl Collection</h1>
                <div style={{display: 'flex'}}>
                    <Button text={'LOG IN'} />
                    <Button text={'SIGN UP'}/>
                </div>
            </div>
            <img style={imageStyle} alt="vinyl" src={vinyl} />
        </div>
    )
}

export default Homepage