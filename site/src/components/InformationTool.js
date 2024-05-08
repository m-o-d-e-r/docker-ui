import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/config';
import './InformationTool.css';


function InformationTool() {
  const [dockerInfo, setDockerInfo] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/info/docker`)
      .then(function (response) {
        setDockerInfo(response.data["info"]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {dockerInfo ? (
        <>
          <ul className="information-list">
            <li>
              <b>Containers:</b> {dockerInfo.Containers}
            </li>
            <li>
              <b>Containers running:</b> {dockerInfo.ContainersRunning}
            </li>
            <li>
              <b>Containers paused:</b> {dockerInfo.ContainersPaused}
            </li>
            <li>
              <b>Containers stopped:</b> {dockerInfo.ContainersStopped}
            </li>
            <li>
              <b>Images:</b> {dockerInfo.Images}
            </li>
            <li>
              <b>Kernel version:</b> {dockerInfo.KernelVersion}
            </li>
            <li>
              <b>OS:</b> {dockerInfo.OperatingSystem}
            </li>
            <li>
              <b>Architecture:</b> {dockerInfo.Architecture}
            </li>
            <li>
              <b>NCPU:</b> {dockerInfo.NCPU}
            </li>
            <li>
              <b>Server version:</b> {dockerInfo.ServerVersion}
            </li>
          </ul>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default InformationTool;
