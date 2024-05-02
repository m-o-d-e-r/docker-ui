import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ImagesTool.css'
import { API_URL } from '../utils/config';
import iconWarning from '../assets/icon-warning.png';
import UpdateButton from './UpdateButtonCallback';
import update_icon from '../assets/icon-update.png';
import update_icon_active from '../assets/icon-update-active.png';


function ImagesTool() {
  const [imagesList, setImagesList] = useState(null);

  function getImages() {
    setImagesList(null);
    axios.get(`${API_URL}/images/list`)
      .then(function (response) {
        setImagesList(response.data["images_list"]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getImages();
  }, []);

  function pullImage() {
    var repositoryEntry = document.getElementById("repository-entry");
    if (repositoryEntry && repositoryEntry.value) {
      var [imageRepo, imageTag] = repositoryEntry.value.split(":");
    } else {
      console.error("Repository entry is missing or empty.");
    }

    axios.post(
      `${API_URL}/images/pull`,
      {
        "repository": imageRepo,
        "tag": imageTag
      }
    ).then(function (response) {
      getImages();
    });
  }

  function removeImage(image_id) {
    axios.post(
      `${API_URL}/images/remove`,
      {
        "image_id": image_id
      }
    ).then(function (response) {
      getImages();
    }).catch(function (error) {
      console.log(error);
    });
  }

  function pruneImages() {
    axios.post(`${API_URL}/images/prune`, {})
    .then(function (response) {
      getImages();
    }).catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div className="imagestool-container">
      <UpdateButton
        defaultImage={update_icon}
        hoverImage={update_icon_active}
        onClick={getImages}
        style={{width: "35px"}}
      />
      <div className="image-pulling-area">
        <input type="text" placeholder="Enter repository" id="repository-entry" />
        <button className="green-button" onClick={pullImage}>Pull image</button>
      </div>
      <div className="prune-images-container">
        <img src={iconWarning} title="Clicking this button you will remove unused images" />
        <div className="prune-images-button" onClick={pruneImages}>Prune images</div>
      </div>

      {imagesList ? (
        <ul className="images-list-container">
          {imagesList.map((image, index) => (
            <li className="images-list-item" key={index}>
              <img className="images-list-img" title="Remove image" onClick={() => removeImage(image.image_id)} />
              <div className="images-list-description">
                <p>{image.tags.length ? image.tags : '<none>'}</p>
                <p>{image.image_id}</p>
              </div>
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
