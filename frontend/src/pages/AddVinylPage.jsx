import React from "react";
import {useHistory} from "react-router-dom";

function AddVinylPage() {
  const api = process.env.REACT_APP_API_URL;
  const history = useHistory();
  const [errorMessage, setErrorMessage] = React.useState(false);


  return <h1>pozdrav</h1>
}

export default AddVinylPage;