import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ImagesTool.css'
import { API_URL } from '../utils/config';
import iconWarning from '../assets/icon-warning.png';
import UpdateButton from './UpdateButtonCallback';
import update_icon from '../assets/icon-update.png';
import update_icon_active from '../assets/icon-update-active.png';
import remove_icon from '../assets/icon-remove.png';
import remove_icon_active from '../assets/icon-remove-active.png';


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
      alert("Enter image name");
      return;
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
      <div className="object-creation-form-area">
        <input className="object-creation-item" type="text" placeholder="Enter repository" id="repository-entry" required />
        <button className="green-button" onClick={pullImage}>Pull image</button>
      </div>
      <div className="prune-items-container">
        <img src={iconWarning} title="Clicking this button you will remove unused images" />
        <div className="prune-items-button" onClick={pruneImages}>Prune images</div>
      </div>

      {imagesList ? (
        <ul className="objects-list-container">
          {imagesList.map((image, index) => (
            <li className="objects-list-item" key={index}>
              <UpdateButton
                defaultImage={remove_icon}
                hoverImage={remove_icon_active}
                onClick={() => removeImage(image.image_id)}
                style={{width: "30px", position: "relative"}}
              />
              <div className="objects-list-info">
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
