import React from "react";

import Routes from "./Routes";

function App() {
    const api = process.env.REACT_APP_API_URL;
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
