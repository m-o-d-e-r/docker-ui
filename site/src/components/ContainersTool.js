import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContainersTool.css';
import { API_URL } from '../utils/config';
import UpdateButton from './UpdateButtonCallback';
import update_icon from '../assets/icon-update.png';
import update_icon_active from '../assets/icon-update-active.png';
import remove_icon from '../assets/icon-remove.png';
import remove_icon_active from '../assets/icon-remove-active.png';
import shutdown_icon from '../assets/icon-shutdown.png';
import shutdown_icon_active_red from '../assets/icon-shutdown-active-red.png';
import shutdown_icon_active_green from '../assets/icon-shutdown-active-green.png';


const ContainerStatusRunning = "running";

const ContainerStatuses = {
  "restarting": "#6FA8DC",
  "running": "#ACEC1C",
  "paused": "#EE9F62",
  "exited": "#FF1100"
};



function ContainersTool(props) {
  const [containersList, setContainersList] = useState(null);

  function getContainers() {
    setContainersList(null);
    axios.post(
      `${API_URL}/containers/list`
    )
      .then(function (response) {
        setContainersList(response.data["containers_list"]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getContainers();
  }, []);

  function runContainer() {
    const container_image_id = document.getElementById("container-image-id").value;
    const container_image_name = document.getElementById("container-name").value;
    const container_image_command = document.getElementById("container-command").value;
    const container_auto_remove = document.getElementById("container-auto-remove").checked;

    if (container_image_id === "") {
      // alert
    }

    axios.post(
      `${API_URL}/containers/run`,
      {
        "image": container_image_id,
        "name": container_image_name,
        "command": container_image_command,
        "auto_remove": container_auto_remove
      }
    ).then(function (response) {
      getContainers();
    }).catch(function (error) {
      console.log(error);
    });
  }


  function removeContainer(container_id) {
    axios.delete(
      `${API_URL}/containers/remove`,
      {
        data: {
          "container_id": container_id
        }
      }
    ).then(function (response) {
      getContainers();
    }).catch(function (error) {
      console.log(error);
    });
  }


  function stopContainer(container_id) {
    axios.post(
      `${API_URL}/containers/stop`,
      {
        "container_id": container_id
      }
    ).then(function (response) {
      getContainers();
    }).catch(function (error) {
      console.log(error);
    });
  }

  function startContainer(container_id) {
    axios.post(
      `${API_URL}/containers/start`,
      {
        "container_id": container_id
      }
    ).then(function (response) {
      getContainers();
    }).catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div className="containerstool-container">
      <UpdateButton
        defaultImage={update_icon}
        hoverImage={update_icon_active}
        onClick={getContainers}
        style={{ width: "35px" }}
      />
      <div className="object-creation-form-area">
        <input className="object-creation-item" type="text" placeholder="Image name" id="container-image-id" />
        <input className="object-creation-item" type="text" placeholder="Container name" id="container-name" />
        <input className="object-creation-item" type="text" placeholder="Command" id="container-command" />
        <div style={{ textAlign: "center" }}>
          <label className="object-creation-item" htmlFor="container-auto-remove">Remove container after it's done</label>
          <input className="object-creation-item" type="checkbox" placeholder="" id="container-auto-remove" />
        </div>
        <button className="green-button" style={{ margin: "10px" }} onClick={runContainer}>Run container</button>
      </div>

      {containersList ? (
        <table className="containers-table">
          <thead>
            <tr>
              <td>Container ID</td>
              <td>Name</td>
              <td>Image</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody>
            {containersList.map((container, index) => (
              <tr className="containers-table-row" key={index}>
                <td>{container.container_id}</td>
                <td>{container.name}</td>
                <td>{container.image}</td>
                <td>
                  <div className="container-status-label" style={{ ...props.style, backgroundColor: ContainerStatuses[container.status] }}>
                    {container.status}
                  </div>
                </td>
                <td className="container-control-buttons">
                  <div>
                    <UpdateButton
                      defaultImage={remove_icon}
                      hoverImage={remove_icon_active}
                      onClick={() => removeContainer(container.container_id)}
                      style={{ width: "35px", margin: "0", padding: "0", position: "relative" }}
                    />
                  </div>
                  <div>
                    {
                      container.status === ContainerStatusRunning ?
                      <UpdateButton
                        defaultImage={shutdown_icon}
                        hoverImage={shutdown_icon_active_red}
                        onClick={() => stopContainer(container.container_id)}
                        style={{ width: "35px", margin: "0", padding: "0", position: "relative" }}
                      /> :
                      <UpdateButton
                        defaultImage={shutdown_icon}
                        hoverImage={shutdown_icon_active_green}
                        onClick={() => startContainer(container.container_id)}
                        style={{ width: "35px", margin: "0", padding: "0", position: "relative" }}
                      />
                    }
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default ContainersTool;
