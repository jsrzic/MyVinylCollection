import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import { Formik, Field } from "formik";
import Form from "../components/Form";
import Button from "@mui/material/Button";
import { IsMobile } from "../util/utils";
import {Autocomplete, TextField, Checkbox} from "@mui/material";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

function AddVinylPage() {
  const api = process.env.REACT_APP_API_URL;
  const history = useHistory();
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [artists, setArtists] = React.useState();
  const [genres, setGenres] = React.useState([]);

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
    fetch(api + "/genres")
      .then((response) => response.json())
      .then((data) => {
        data = data.map((g) => g["name"]);
        setGenres(data);
      });
  }, []);



  return (
    <div
      style={
        IsMobile() ? { ...containerStyle, marginBottom: "4rem" } : containerStyle
      }
    >
      <Formik
        initialValues={{album: "", artist: "", releaseYear: "", genre: [], subgenre: "", conditionEvaluation: "",
        isRare: "No", description: "", priceKn: "", RPM: "", diameter: "", capacity: "", reproductionQuality: "",
        nmbOfAudioChannels: "", timeOfReproduction: ""}}
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

                <Form.Row
                  label="Release year"
                  type="text"
                  value={formik.values.releaseYear}
                  name="releaseYear"
                  onChange={formik.handleChange}
                />

                <Autocomplete
                  sx={{marginTop: "1rem", marginBottom: "1rem", marginLeft: "0.5rem"}}
                  multiple
                  id="checkboxes-tags-demo"
                  options={genres}
                  onChange={(e, value) => formik.setFieldValue("genre", value)}
                  disableCloseOnSelect
                  getOptionLabel={((option) => option)}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option}
                    </li>
                  )}
                  style={{ width: 500 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Genres" placeholder="" />
                  )}
                />

                <Form.Row
                  label="Subgenre"
                  type="text"
                  value={formik.values.subgenre}
                  name="subgenre"
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
                  value={formik.values.RPM}
                  name="RPM"
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