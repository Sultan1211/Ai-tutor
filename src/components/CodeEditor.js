import React, { useState } from 'react';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-python';
import { Editor } from 'react-simple-code-editor';
import './CodeEditor.css';


function CodeEditor({ initialCode, onCodeChange }) {
    const [code, setCode] = useState(initialCode || "");

    const handleCodeChange = (newCode) => {
        setCode(newCode);
        if (onCodeChange){
           onCodeChange(newCode)
        }
    };

    return (
        <div className="code-editor">
            <Editor
                value={code}
                onValueChange={handleCodeChange}
                highlight={code => highlight(code, languages.python, 'python')}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 12,
                  minHeight: "200px"
                }}
            />
        </div>
    );
}

export default CodeEditor;
