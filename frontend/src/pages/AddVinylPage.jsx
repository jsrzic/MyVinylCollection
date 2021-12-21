import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import { Formik } from "formik";
import Form from "../components/Form";
import Button from "@mui/material/Button";

function AddVinylPage() {
  const api = process.env.REACT_APP_API_URL;
  const history = useHistory();
  const [errorMessage, setErrorMessage] = React.useState(false);
  const formStyle = {
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  };

  const btnStyle = {
    width: "50%",
    margin: "auto",
    marginTop: "1rem",
    marginBottom: "1rem",
  };

  return (
    <Formik
      initialValues={{album: "", artist: ""}}
      onSubmit={(values) => console.log(JSON.stringify(values))}>

      {
        (formik) => {

          return(
            <Form style={formStyle}>
              <h1>Add a new Vinyl to your collection</h1>
              {errorMessage && (
                <p style={{ color: "red", fontSize: "13.5px", margin: "auto" }}>
                  Vinyl not valid. Try again...
                </p>
              )}

              <Form.Row
                label="Album"
                type="text"
                value={formik.values.album}
                name="album"
                onChange={formik.handleChange}
                required
              />

              <Form.Row
                label="Artist"
                type="text"
                value={formik.values.artist}
                name="artist"
                onChange={formik.handleChange}
                required
              />

              <Button onClick={formik.handleSubmit} style={btnStyle}>
                Add
              </Button>

            </Form>
          )
        }
      }

    </Formik>
  );
}

export default AddVinylPage;