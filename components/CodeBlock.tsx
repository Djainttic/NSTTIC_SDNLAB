import React, { useState } from 'react';

interface CodeBlockProps {
    code: string;
    language: string;
    getTranslation: (key: string) => string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, getTranslation }) => {
    const [copyText, setCopyText] = useState(getTranslation('copy'));

    const handleCopy = () => {
        navigator.clipboard.writeText(code).then(() => {
            setCopyText(getTranslation('copied'));
            setTimeout(() => setCopyText(getTranslation('copy')), 2000);
        });
    };

    return (
        <pre className="relative rounded-lg font-mono text-sm p-4 my-4" style={{ backgroundColor: 'var(--code-bg)', color: 'var(--code-text)' }}>
            <button
                onClick={handleCopy}
                className="copy-btn text-xs bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded"
            >
                {copyText}
            </button>
            <code className={`language-${language}`}>
                {code}
            </code>
        </pre>
    );
};
