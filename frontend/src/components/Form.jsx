import React from "react";
import { IsMobile } from "../util/utils";

function Form({ children, style }) {
  const formStyle = IsMobile()
    ? {
        display: "flex",
        flexDirection: "column",
        zIndex: 2,
        width: "90%",
      }
    : { display: "flex", flexDirection: "column", zIndex: 2, width: "40%" };
  return <form style={{ ...formStyle, ...style }}>{children}</form>;
}

function FormRow({ label, type }) {
  const labelStyle = {
    color: "white",
    display: "flex",
    flexDirection: "column",
    marginTop: "1rem",
  };

  const inputStyle = {
    padding: "0.5rem",
    borderRadius: "5px",
    background: "rgb(68,67,67)",
  };

  return (
    <label style={labelStyle}>
      {label}
      <input style={inputStyle} type={type} name={label} />
    </label>
  );
}

function FormSubmit() {
  const submitStyle = {
    height: "2.5rem",
    width: "7rem",
    borderRadius: "5px",
    background: "white",
    fontSize: "14px",
    margin: "auto",
    marginTop: "2rem",
  };

  return <input style={submitStyle} type="submit" value="Submit" />;
}

Form.Row = FormRow;
Form.Submit = FormSubmit;

export default Form;
