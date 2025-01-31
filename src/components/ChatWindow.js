import React from 'react';
import './ChatWindow.css'; // Import the CSS file for styling

function ChatWindow({ chatHistory, loading }) {
    return (
        <div className="chat-window">
            <div className="chat-messages">
                {loading && <p className="loading-message">Loading...</p>}
                {chatHistory.map((message, index) => (
                    <div key={index} className={`message ${message.type}`}>
                        <span className="message-text">{message.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChatWindow;
