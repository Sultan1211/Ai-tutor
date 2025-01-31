import React, { useState } from 'react';
import './Settings.css'

function Settings({ apiKey, onApiKeyChange, toggleSettings }) {
  const [newApiKey, setNewApiKey] = useState(apiKey);

  const handleApiKeyChange = (event) => {
    setNewApiKey(event.target.value);
  };

  const handleSaveApiKey = () => {
    onApiKeyChange(newApiKey);
  };
    return(
        <div className="settings">
          <div className="settings-content">
                <h2>Settings</h2>
                <label>
                  API Key:
                    <input
                        type="text"
                        value={newApiKey}
                        onChange={handleApiKeyChange}
                    />
                </label>
                <button onClick={handleSaveApiKey}>Save API Key</button>
                 <button onClick={toggleSettings}>Close Settings</button>
          </div>
         </div>
    )
}
export default Settings;
