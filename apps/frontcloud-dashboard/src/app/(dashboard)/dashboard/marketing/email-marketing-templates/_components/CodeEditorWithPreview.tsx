"use client";
import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorWithPreviewProps {
    initialCode: string;
}

const CodeEditorWithPreview: React.FC<CodeEditorWithPreviewProps> = ({ initialCode }) => {
    const [code, setCode] = useState<string>(initialCode);

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
            <div style={{ flex: 1 }}>
                <Editor
                    height='100%'
                    defaultLanguage='html'
                    defaultValue={code}
                    options={{
                        formatOnPaste: true,
                        formatOnType: true,
                        wordWrap: 'off',
                    }}
                    onChange={(value) => setCode(value || '')}
                    theme='vs-dark'
                />
            </div>
            <div style={{ flex: 1, padding: '10px', backgroundColor: '#f0f0f0' }}>
                <iframe
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    srcDoc={code}
                    title='HTML Preview'
                />
            </div>
        </div>
    );
};

export default CodeEditorWithPreview;
