// App.js
import React, { useState } from 'react';
import axios from 'axios';
import ChatWindow from './components/ChatWindow';
import UserInput from './components/UserInput';
import AvatarSelector from './components/AvatarSelector';
import AssignmentDisplay from './components/AssignmentDisplay';
import HomePage from './components/HomePage';
import Settings from './components/Settings';

function App() {
    const [chatHistory, setChatHistory] = useState([]);
    const [tutorCharacter, setTutorCharacter] = useState('Default');
    const [loading, setLoading] = useState(false);
    const [currentAssignment, setCurrentAssignment] = useState(null);
    const [showHomePage, setShowHomePage] = useState(true);
    const [showSettings, setShowSettings] = useState(false);
    const [userApiKey, setUserApiKey] = useState("sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"); // Placeholder for API key

    const toggleHomePage = () => {
        setShowHomePage(!showHomePage);
    };

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };

    const handleApiKeyChange = (newKey) => {
        setUserApiKey(newKey);
    };

    const sendMessage = async (message) => {
        setChatHistory((prev) => [...prev, { text: message, type: 'user' }]);
        setLoading(true);

        try {
            const response = await axios.post('http://127.0.0.1:8000/ask', {
                message: message,
                tutor: tutorCharacter,
                apiKey: userApiKey,
                message_count: chatHistory.length + 1
            });

            const aiResponse = response.data.response;
            setChatHistory((prev) => [
                ...prev,
                { text: message, type: 'user' },
                { text: aiResponse, type: 'ai' }
            ]);

            if (response.data.assignment) {
                setCurrentAssignment(response.data.assignment);
            }
        } catch (error) {
            console.error("Error:", error);
            setChatHistory((prev) => [
                ...prev,
                { text: message, type: 'user' },
                { text: 'Error, could not get response from AI', type: 'ai' }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleCharacterChange = (character) => {
        setTutorCharacter(character);
    };

    const closeAssignment = () => {
        setCurrentAssignment(null);
    };

    if (showSettings) {
        return (
            <Settings 
                apiKey={userApiKey} 
                onApiKeyChange={handleApiKeyChange}  
                toggleSettings={toggleSettings}  
            />
        );
    }

    if (showHomePage) {
        return (
            <HomePage 
                toggleHomePage={toggleHomePage} 
                toggleSettings={toggleSettings} 
            />
        );
    }

    return (
        <div className="App">
            <button onClick={toggleHomePage}>Go Home</button>
            <button onClick={toggleSettings}>Settings</button>
            <AvatarSelector onCharacterChange={handleCharacterChange} />
            {currentAssignment && <AssignmentDisplay assignment={currentAssignment} onClose={closeAssignment} />}
            <ChatWindow chatHistory={chatHistory} loading={loading} />
            <UserInput onSendMessage={sendMessage} />
        </div>
    );
}

export default App;
