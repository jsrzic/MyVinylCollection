import React from "react";
import VinylCard from "./VinylCard";

function VinylCollection({data, favVinyls, updateFunction}) {

  return(
      <div style={{
        display: "flex",
            maxWidth: window.innerWidth*0.83,
            height: "20rem",
            overflow: "scroll",
      }}>
        {data.map(d => <VinylCard vinylData={d} favVinyls={favVinyls} updateFunction={updateFunction} />)}
      </div>
  );

}

export default VinylCollection;