import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NetworksTool.css'
import { API_URL } from '../utils/config';
import iconWarning from '../assets/icon-warning.png';
import UpdateButton from './UpdateButtonCallback';
import update_icon from '../assets/icon-update.png';
import update_icon_active from '../assets/icon-update-active.png';


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

    }

    function pruneNetworks() {

    }

    function deleteNetworks() {

    }


    return (
        <div className="networkstool-container">
        <UpdateButton
          defaultImage={update_icon}
          hoverImage={update_icon_active}
          onClick={getNetworks}
          style={{width: "35px"}}
        />
        <div className="network-creation-area">
          <input className="object-creation-item" type="text" placeholder="Enter name"/>
          <input className="object-creation-item" type="text" placeholder="Enter driver"/>
          <div style={{ textAlign: "center" }}>
            <label className="object-creation-item" htmlFor="network-internal-entry">Mark network as internal</label>
            <input className="object-creation-item" type="checkbox" placeholder="Enter internal" id="network-internal-entry" />
          </div>
          <div style={{ textAlign: "center" }}>
            <label className="object-creation-item" htmlFor="networks-ipv6-entry">Enable IPv6</label>
            <input className="object-creation-item" type="checkbox" placeholder="Enter enable_ipv6" id="networks-ipv6-entry" />
          </div>
          <button className="green-button" onClick={createNetwork}>Pull network</button>
        </div>
        <div className="prune-items-container">
          <img src={iconWarning} title="Clicking this button you will remove unused networks" />
          <div className="prune-items-button" onClick={pruneNetworks}>Prune networks</div>
        </div>

        {networksList ? (
          <ul className="networks-list-container">
            {networksList.map((network, index) => (
              <li className="networks-list-item" key={index}>
                <img className="networks-list-img" title="Remove network" onClick={() => deleteNetworks(network.name)} />
                <div className="networks-connected-containers">
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
 