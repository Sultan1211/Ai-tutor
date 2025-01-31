import React from 'react';
import './HomePage.css'

function HomePage({ toggleHomePage, toggleSettings }) {
    return (
         <div className="homepage">
           <div className="home-content">
              <h1>AI Python Tutor for Kids</h1>
                <p>Welcome to your friendly AI-powered Python tutor! I'm designed to help you learn Python in a fun, easy, and interactive way. I will answer your questions, provide examples, and help you complete small assignments. Start by writing a Python question in the chat below!</p>
              <p>You can customize the tutor by picking an avatar from the options on the main page. Each tutor will respond in a slightly different style.</p>
                <button onClick={toggleHomePage}>Start Tutoring</button>
                 <button onClick={toggleSettings}>Settings</button>
           </div>
        </div>
    );
}
export default HomePage;
