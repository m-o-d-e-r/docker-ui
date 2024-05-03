import React, { useState } from 'react';
import './Dashboard.css';
import ImagesTool from './ImagesTool';
import ContainersTool from './ContainersTool';
import NetworksTool from './NetworksTool';
import VolumesTool from './VolumesTool';
import InformationTool from './InformationTool';


function Dashboard() {
    const [selectedMenuItem, setSelectedMenuItem] = useState('images');

    const handleLinkClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
    };

    const renderSelectedComponent = () => {
        switch (selectedMenuItem) {
            case 'images':
                return <ImagesTool />;
            case 'containers':
                return <ContainersTool />;
            case 'networks':
                return <NetworksTool />;
            case 'volumes':
                return <VolumesTool />;
            case 'information':
                return <InformationTool />;
            default:
                return null;
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-inner">
                <div className="dashboard-menu">
                    <h3 onClick={() => handleLinkClick('images')} className="dashboard-item">Images</h3>
                    <hr />
                    <h3 onClick={() => handleLinkClick('containers')} className="dashboard-item">Containers</h3>
                    <hr />
                    <h3 onClick={() => handleLinkClick('networks')} className="dashboard-item">Networks</h3>
                    <hr />
                    <h3 onClick={() => handleLinkClick('volumes')} className="dashboard-item">Volumes</h3>
                    <hr />
                    <h3 onClick={() => handleLinkClick('information')} className="dashboard-item">Information</h3>
                </div>
                <div className="tool-area">
                    {renderSelectedComponent()}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
