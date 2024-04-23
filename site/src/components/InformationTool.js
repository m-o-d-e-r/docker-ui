import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InformationTool() {
  const [dockerInfo, setDockerInfo] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/info/docker')
      .then(function (response) {
        setDockerInfo(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {dockerInfo ? (
        <pre>{JSON.stringify(dockerInfo, null, 2)}</pre>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default InformationTool;
