import React, { useState, useEffect } from "react";
import { createApi } from "unsplash-js";
import "../styles/GetImage.css"
const unsplash = createApi({
  accessKey: "uR_bqHEvqHThJvwrkOKc3GU5ZtK37CptoffrJcAf06g",
});

function GetImage() {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    unsplash.photos
      .getRandom()
      .then((response) => {
        if (response.errors) {
          console.log("Error occurred: ", response.errors[0]);
        } else {
          setImageData(response.response);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {imageData.urls && (
        <img src={imageData.urls.regular} alt="Random Unsplash" className="unsplash-images" />
      )}
    </div>
  );
}

export default GetImage;
