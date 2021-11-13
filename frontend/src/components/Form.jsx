import React from "react";
import { IsMobile } from "../util/utils";
import {Button, TextField} from "@mui/material";

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

function FormRow({ type, required, label }) {
  return (
    <TextField
      variant="filled"
      type={type}
      style={{ margin: "0.5rem", backgroundColor: "white", borderRadius: "4px"}}
      required={required}
      label={label}
    />
  );
}

function FormSubmit() {
  const submitStyle = {
    backgroundColor: "#e25c3b",
    marginLeft: "auto",
    marginTop: "auto",
  };

  return <Button variant="contained" sx={submitStyle} type="submit">Submit</Button>;
}

Form.Row = FormRow;
Form.Submit = FormSubmit;

export default Form;
