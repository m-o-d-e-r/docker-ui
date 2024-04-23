import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ImagesTool.css'


function ImagesTool() {
  const [imagesList, setImagesList] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/images/list')
      .then(function (response) {
        setImagesList(response.data["images_list"]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function pullImage() {
    var repositoryEntry = document.getElementById("repository-entry");
    if (repositoryEntry && repositoryEntry.value) {
        var [imageRepo, imageTag] = repositoryEntry.value.split(":");
    } else {
        console.error("Repository entry is missing or empty.");
    }

    axios.post(
      'http://localhost:8000/images/pull',
      {
        "repository": imageRepo,
        "tag": imageTag
      }
    ).then(function (response) {

    });
  }

  return (
    <div className="imagestool-container">
      <div className="image-pulling-area">
        <input type="text" placeholder="Enter repository" id="repository-entry" />
        <button className="pull-button" onClick={pullImage}>Pull image</button>
      </div>
      {imagesList ? (
        <ul className="images-list-container">
          {imagesList.map((image, index) => (
            <li className="images-list-item" key={index}>
              {image.tags}
              <p>{image.image_id}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default ImagesTool;
