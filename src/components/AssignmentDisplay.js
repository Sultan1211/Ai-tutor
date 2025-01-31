import React from 'react';
import './AssignmentDisplay.css'

function AssignmentDisplay({ assignment, onClose }) {
      try {
            const assignmentJson = JSON.parse(assignment);
            return (
                <div className="assignment-display">
                  <div className="assignment-content">
                      <h3>Homework Assignment</h3>
                      <p><strong>Question:</strong> {assignmentJson.question}</p>
                      <p><strong>Expected Answer:</strong> {assignmentJson.expected_answer}</p>
                      <p><strong>Hint:</strong> {assignmentJson.hints}</p>
                      <button onClick={onClose}>Close Assignment</button>
                    </div>
                </div>
            );
      } catch (e) {
          return (
               <div className="assignment-display">
                    <div className="assignment-content">
                      <h3>Homework Assignment</h3>
                      <p> Could not load assignment </p>
                      <button onClick={onClose}>Close Assignment</button>
                   </div>
                 </div>
              )
      }

}

export default AssignmentDisplay;
