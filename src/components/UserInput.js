import React, { useState } from 'react';
import './UserInput.css';

function UserInput({ onSendMessage }) {
    const [inputMessage, setInputMessage] = useState('');

    const handleInputChange = (event) => {
        setInputMessage(event.target.value);
    };

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            onSendMessage(inputMessage);
            setInputMessage('');
        }
    };

     const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          handleSendMessage();
        }
      };

    return (
        <div className="user-input">
            <input
                type="text"
                value={inputMessage}
                onChange={handleInputChange}
                onKeyDown = {handleKeyDown}
                placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
}

export default UserInput;
