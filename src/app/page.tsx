"use client"

import { useState } from 'react';

export default function HomePage() {
    const [filePath, setFilePath] = useState<string>('');
    const [content, setContent] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    const fetchFileContent = async () => {
        if (!filePath) {
            setError('Please enter a file path.');
            return;
        }

        try {
            const response = await fetch(`/api/getpath?filePath=${filePath}`);
         

            const data = await response.json();
            console.log(data)
            if (data.error) {
                setError(data.error);
            } else {
                setContent(data.content);
                setError(null); // Clear any previous errors
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            setError(errorMessage);
        }
    };

    return (
        <div>
            <h1>File Content</h1>
            <input 
                type="text" 
                value={filePath} 
                onChange={(e) => setFilePath(e.target.value)} 
                placeholder="Enter file path" 
                style={{ width: '100%', marginBottom: '10px' }}
            />
            <button onClick={fetchFileContent}>Fetch File</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {content ? (
                <pre>{content}</pre>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
