import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NetworksTool.css'
import { API_URL } from '../utils/config';
import iconWarning from '../assets/icon-warning.png';
import UpdateButton from './UpdateButtonCallback';
import update_icon from '../assets/icon-update.png';
import update_icon_active from '../assets/icon-update-active.png';
import remove_icon from '../assets/icon-remove.png';
import remove_icon_active from '../assets/icon-remove-active.png';


function NetworksTool() {
  const [networksList, setNetworksList] = useState(null);

  function getNetworks() {
    setNetworksList(null);
    axios.get(`${API_URL}/networks/`)
      .then(function (response) {
        setNetworksList(response.data["networks_list"]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getNetworks();
  }, []);

  function createNetwork() {
    var networkName = document.getElementById("network-name-entry").value;
    var networkDriver = document.getElementById("network-driver-entry").value;
    var networkInternal = document.getElementById("network-internal-entry").checked;
    var networkIPv6 = document.getElementById("network-ipv6-entry").checked;

    if (!networkDriver) {
      networkDriver = "bridge";
    }

    axios.post(
      `${API_URL}/networks/`,
      {
        "name": networkName,
        "driver": networkDriver,
        "internal": networkInternal,
        "enable_ipv6": networkIPv6
      }
    ).then(function (response) {
      getNetworks();
    }).catch(function (error) {
      console.log(error);
    });
  }

  function pruneNetworks() {
    axios.post(
      `${API_URL}/networks/prune`,
      {}
    ).then(function (response) {
      getNetworks();
    });
  }

  function deleteNetwork(network_id) {
    axios.delete(
      `${API_URL}/networks/${network_id}`
    ).then(function (response) {
      getNetworks();
    });
  }


  return (
    <div className="networkstool-container">
      <UpdateButton
        defaultImage={update_icon}
        hoverImage={update_icon_active}
        onClick={getNetworks}
        style={{ width: "35px" }}
      />
      <div className="network-creation-area">
        <input className="object-creation-item" type="text" placeholder="Enter name" id="network-name-entry" required />
        <input className="object-creation-item" type="text" placeholder="Enter driver (default: bridge)" id="network-driver-entry" />
        <div style={{ textAlign: "center" }}>
          <label htmlFor="network-internal-entry">Mark network as internal</label>
          <input className="object-creation-item" type="checkbox" placeholder="Enter internal" id="network-internal-entry" />
        </div>
        <div style={{ textAlign: "center" }}>
          <label htmlFor="networks-ipv6-entry">Enable IPv6</label>
          <input className="object-creation-item" type="checkbox" placeholder="Enter enable_ipv6" id="network-ipv6-entry" />
        </div>
        <button className="green-button" onClick={createNetwork}>Create network</button>
      </div>
      <div className="prune-items-container">
        <img src={iconWarning} title="Clicking this button you will remove unused networks" />
        <div className="prune-items-button" onClick={pruneNetworks}>Prune networks</div>
      </div>

      {networksList ? (
        <ul className="objects-list-container">
          {networksList.map((network, index) => (
            <li className="objects-list-item" key={index}>
              <UpdateButton
                defaultImage={remove_icon}
                hoverImage={remove_icon_active}
                onClick={() => deleteNetwork(network.name)}
                style={{ width: "30px", position: "relative" }}
              />
              <div className="objects-list-info">
                <p>{network.name}</p>
                <p>{network.connected_containers}</p>
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

export default NetworksTool;
