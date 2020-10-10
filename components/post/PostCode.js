import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark} from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export default function PostCode({ language, children }) {
  return (
    <SyntaxHighlighter
      style={atomOneDark}
      language={language}>
      {children}
    </SyntaxHighlighter>
  );
}

