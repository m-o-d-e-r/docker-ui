import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VolumesTool.css'
import { API_URL } from '../utils/config';
import iconWarning from '../assets/icon-warning.png';
import UpdateButton from './UpdateButtonCallback';
import update_icon from '../assets/icon-update.png';
import update_icon_active from '../assets/icon-update-active.png';
import remove_icon from '../assets/icon-remove.png';
import remove_icon_active from '../assets/icon-remove-active.png';


function VolumesTool() {
  const [volumesList, setVolumesList] = useState(null);

  function getVolumes() {
    setVolumesList(null);
    axios.get(`${API_URL}/volumes/`)
      .then(function (response) {
        setVolumesList(response.data["volumes_list"]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getVolumes();
  }, []);

  function createVolume() {
    var volumeName = document.getElementById("volume-name-entry").value;
    var volumeDriver = document.getElementById("volume-driver-entry").value;
  
    if (!volumeName) {
      alert("Please enter volume name");
      return;
    }
  
    if (!volumeDriver) {
      volumeDriver = "local";
    }
  
    axios.post(
      `${API_URL}/volumes/`,
      {
        "name": volumeName,
        "driver": volumeDriver
      }
    ).then(function (response) {
      getVolumes();
    }).catch(function (error) {
      console.log(error);
    });
  }


  function pruneVolumes() {
    axios.post(
      `${API_URL}/volumes/prune`,
      {}
    ).then(function (response) {
      getVolumes();
    });
  }

  function deleteVolume(volume_id) {
    axios.delete(
      `${API_URL}/volumes/${volume_id}`
    ).then(function (response) {
      getVolumes();
    });
  }

  return (
    <div className="volumestool-container">
      <UpdateButton
        defaultImage={update_icon}
        hoverImage={update_icon_active}
        onClick={getVolumes}
        style={{ width: "35px" }}
      />
      <div className="object-creation-form-area">
        <input className="object-creation-item" type="text" placeholder="Enter name" id="volume-name-entry" required />
        <input className="object-creation-item" type="text" placeholder="Enter driver (default: local)" id="volume-driver-entry" />
        <button className="green-button" onClick={createVolume}>Create volume</button>
      </div>
      <div className="prune-items-container">
        <img src={iconWarning} title="Clicking this button you will remove unused volumes" />
        <div className="prune-items-button" onClick={pruneVolumes}>Prune volumes</div>
      </div>

      {volumesList ? (
        <ul className="objects-list-container">
          {volumesList.map((volume, index) => (
            <li className="objects-list-item" key={index}>
              <UpdateButton
                defaultImage={remove_icon}
                hoverImage={remove_icon_active}
                onClick={() => deleteVolume(volume.volume_id)}
                style={{width: "30px", position: "relative"}}
              />
              <div className="objects-list-info">
                <p>{volume.volume_id}</p>
                <p>{volume.name}</p>
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

export default VolumesTool;
