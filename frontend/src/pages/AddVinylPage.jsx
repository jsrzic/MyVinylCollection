import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import { Formik, Field } from "formik";
import Form from "../components/Form";
import Button from "@mui/material/Button";
import { IsMobile } from "../util/utils";
import {Autocomplete, TextField, Checkbox} from "@mui/material";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import authHeader from "../auth-header";

function AddVinylPage() {
  const api = process.env.REACT_APP_API_URL;
  const origin = process.env.REACT_APP_URL;
  const history = useHistory();
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [artists, setArtists] = React.useState();
  const [genre, setGenre] = React.useState("");

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

  const containerStyle = {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    maxWidth: "100%",
  };

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const username = localStorage.getItem("username");

  React.useEffect(() => {
    fetch(api + "/genres", {
      method: "GET",
      headers: {
        Origin: origin,
        Authorization: authHeader(),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data = data.map((g) => g["name"]);
        setGenre(data);
      });

    fetch(api + "/artists", {
      method: "GET",
          headers: {
            Origin: origin,
            Authorization: authHeader(),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data = data.map((a) => a["name"]);
        setArtists(data);
      });
  }, []);



  return (
    <div
      style={
        IsMobile() ? { ...containerStyle, marginBottom: "4rem" } : containerStyle
      }
    >
      <Formik
        initialValues={{album: "", artistId: "", releaseYear: "", genreId: "", subgenreId: "", conditionEvaluation: "",
        isRare: "No", description: "", priceKn: "", rpm: "", diameter: "", capacity: "", reproductionQuality: "",
        nmbOfAudioChannels: "", timeOfReproduction: ""}}
        onSubmit={(values) => {
          values.artistId = 2;
          values.releaseYear = parseInt(values.releaseYear);
          values.genreId = 3;
          values.subgenreId = parseInt(values.subgenreId);
          values.conditionEvaluation = parseInt(values.conditionEvaluation);
          values.isRare = "Yes" ? true : false;
          values.priceKn = parseInt(values.priceKn);
          values.diameter = parseInt(values.diameter);
          values.nmbOfAudioChannels = parseInt(values.nmbOfAudioChannels);

          fetch(api + `/vinyls/${username}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(values)
          }).then(response => console.log(response));
        }}>

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

                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={artists}
                  onChange={(e, value) => formik.setFieldValue("artistId", value)}
                  sx={{marginTop: "1rem", marginBottom: "1rem", marginLeft: "0.5rem"}}
                  renderInput={(params) => <TextField {...params} label="Artist" />}
                />

                <Form.Row
                  label="Release year"
                  type="text"
                  value={formik.values.releaseYear}
                  name="releaseYear"
                  onChange={formik.handleChange}
                />

                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={genre}
                  onChange={(e, value) => formik.setFieldValue("genreId", value)}
                  sx={{marginTop: "1rem", marginBottom: "1rem", marginLeft: "0.5rem"}}
                  renderInput={(params) => <TextField {...params} label="Genre" />}
                />

                <Form.Row
                  label="Subgenre"
                  type="text"
                  value={formik.values.subgenreId}
                  name="subgenreId"
                  onChange={formik.handleChange}
                />

                <Form.Row
                  label="Condition evaluation"
                  type="text"
                  value={formik.values.conditionEvaluation}
                  name="conditionEvaluation"
                  onChange={formik.handleChange}
                />

                <Form.Row
                  label="Description"
                  type="text"
                  value={formik.values.description}
                  name="description"
                  onChange={formik.handleChange}
                />

                <Form.Row
                  label="Price (in HRK)"
                  type="text"
                  value={formik.values.priceKn}
                  name="priceKn"
                  onChange={formik.handleChange}
                />

                <Form.Row
                  label="RPM"
                  type="text"
                  value={formik.values.rpm}
                  name="rpm"
                  onChange={formik.handleChange}
                />

                <Form.Row
                  label="Diameter"
                  type="text"
                  value={formik.values.diameter}
                  name="diameter"
                  onChange={formik.handleChange}
                />

                <Form.Row
                  label="Capacity"
                  type="text"
                  value={formik.values.capacity}
                  name="capacity"
                  onChange={formik.handleChange}
                />

                <Form.Row
                  label="Reproduction quality"
                  type="text"
                  value={formik.values.reproductionQuality}
                  name="reproductionQuality"
                  onChange={formik.handleChange}
                />

                <Form.Row
                  label="Number of audio channels"
                  type="text"
                  value={formik.values.nmbOfAudioChannels}
                  name="nmbOfAudioChannels"
                  onChange={formik.handleChange}
                />

                <Form.Row
                  label="Time of reproduction"
                  type="text"
                  value={formik.values.timeOfReproduction}
                  name="timeOfReproduction"
                  onChange={formik.handleChange}
                />

                <div style={{marginLeft: "1rem", marginTop: "1rem"}}>
                  <div id="my-radio-group">Is the vinyl rare?</div>
                  <div style={{marginTop:"0.3rem"}} role="group" aria-labelledby="my-radio-group">
                    <label>
                      <Field type="radio" name="isRare" value="Yes" />
                      Yes
                    </label>
                    <label>
                      <Field style={{marginLeft: "1rem"}} type="radio" name="isRare" value="No" />
                      No
                    </label>
                  </div>
                </div>

                <Button onClick={formik.handleSubmit} style={btnStyle}>
                  Add
                </Button>

              </Form>
            )
          }
        }

      </Formik>
    </div>
  );
}

export default AddVinylPage;