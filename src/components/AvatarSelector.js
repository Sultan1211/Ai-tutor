import React from 'react';
import './AvatarSelector.css';

function AvatarSelector({ onCharacterChange }) {
    const avatars = [
        { name: 'Default', image: 'default_avatar.png' },
        { name: 'Robot', image: 'robot_avatar.png' },
        { name: 'Cat', image: 'cat_avatar.png' },
        { name: 'Dog', image: 'dog_avatar.png'},
    ];

    const handleAvatarClick = (character) => {
        onCharacterChange(character)
    };

    return (
        <div className="avatar-selector">
            <h3>Choose your Tutor:</h3>
            {avatars.map((avatar) => (
                 <img key={avatar.name}
                        src={avatar.image}
                        alt={avatar.name}
                        className="avatar-image"
                        onClick={() => handleAvatarClick(avatar.name)}
                 />
            ))}
        </div>
    );
}

export default AvatarSelector;
