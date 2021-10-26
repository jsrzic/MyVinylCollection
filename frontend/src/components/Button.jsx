import React from "react";

const buttonStyle = {
    height: '2.5rem',
    width: '7rem',
    background: 'rgb(0, 0, 0)',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
        background: 'rgb(255,255,255)',
    },
    margin: '0.2rem',
    marginTop: '2rem'
}

const textStyle = {
    color: 'white',
    fontWeight: 500
}

function Button({ text }) {
    return (
        <div style={buttonStyle}>
            <p style={textStyle}>{text}</p>
        </div>
    )
}

export default Button