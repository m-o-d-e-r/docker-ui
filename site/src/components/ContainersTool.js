import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContainersTool.css';


function ContainersTool() {
  const [containersList, setContainersList] = useState(null);

  useEffect(() => {
    axios.post(
      'http://localhost:8000/containers/list'
    )
      .then(function (response) {
        setContainersList(response.data["containers_list"]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
<div class="containerstool-container">
  {containersList ? (
    <table class="containers-table">
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
            <td>{container.status}</td>
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
