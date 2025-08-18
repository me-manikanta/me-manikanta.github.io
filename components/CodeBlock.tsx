import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className, language }) => {
  const [copied, setCopied] = useState(false);

  const getTextContent = (children: React.ReactNode): string => {
    if (typeof children === 'string') return children;
    if (Array.isArray(children)) {
      return children.map(getTextContent).join('');
    }
    if (React.isValidElement(children)) {
      return getTextContent(children.props.children);
    }
    return String(children || '');
  };

  const codeText = getTextContent(children);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const finalClassName = className || (language ? `language-${language}` : '');

  return (
    <div className="relative group">
      <pre className={finalClassName}>
        <code>{children}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-1.5 bg-gray-700 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
        title="Copy to clipboard"
      >
        {copied ? (
          <Check className="w-3 h-3" />
        ) : (
          <Copy className="w-3 h-3" />
        )}
      </button>
      {copied && (
        <div className="absolute top-10 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg z-20">
          Copied!
        </div>
      )}
    </div>
  );
};

export default CodeBlock;
