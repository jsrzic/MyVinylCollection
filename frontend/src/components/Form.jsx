import React from "react";

import { TextField } from "@mui/material";

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
  return (
    <TextField
      variant="outlined"
      value={label}
      type={type}
      style={{ margin: "0.5rem" }}
    />
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
