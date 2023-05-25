import React, { useState, useEffect } from "react";
import { createApi } from "unsplash-js";
import "../styles/GetImage.css";

const unsplash = createApi({
  accessKey: "uR_bqHEvqHThJvwrkOKc3GU5ZtK37CptoffrJcAf06g",
});

function GetImage() {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const getRandomPage = () => Math.floor(Math.random() * 10) + 1; // Generate a random page number from 1 to 10

    unsplash.search
      .getPhotos({
        query: "education",
        page: getRandomPage(),
        perPage: 1,
        orientation: "landscape",
      })
      .then((response) => {
        if (response.errors) {
          console.log("Error occurred: ", response.errors[0]);
        } else {
          setImageData(response.response.results[0]);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {imageData && (
        <img
          src={imageData.urls.regular}
          alt="Random Unsplash"
          className="unsplash-images"
        />
      )}
    </div>
  );
}

export default GetImage;
