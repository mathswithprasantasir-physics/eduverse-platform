import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaExpand, FaCompress, FaCopy, FaCheck } from 'react-icons/fa';
import 'katex/dist/katex.min.css';

const ContentRenderer = ({ content, contentType }) => {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  // Handle image embedding
  const renderImage = (alt, src) => {
    // Support both local and external images
    if (src.startsWith('http') || src.startsWith('/images/')) {
      return (
        <div className="image-container">
          <img src={src} alt={alt || 'Content image'} className="content-image" />
          {alt && <figcaption>{alt}</figcaption>}
        </div>
      );
    }
    return null;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render content based on type
  const renderContent = () => {
    if (contentType === 'pyq' || contentType === 'notes' || contentType === 'book_solutions') {
      return (
        <div className={`content-wrapper ${expanded ? 'expanded' : ''}`}>
          <div className="content-actions">
            <button onClick={() => setExpanded(!expanded)} className="action-btn">
              {expanded ? <FaCompress /> : <FaExpand />}
              {expanded ? 'Collapse' : 'Expand'}
            </button>
            <button onClick={handleCopy} className="action-btn">
              {copied ? <FaCheck /> : <FaCopy />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              img({alt, src}) {
                return renderImage(alt, src);
              },
              // Enhanced table rendering for PYQs
              table({children}) {
                return <div className="table-wrapper"><table>{children}</table></div>;
              }
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      );
    }
    return <div>Unsupported content type</div>;
  };

  return (
    <div className="content-renderer">
      <div className="content-header">
        <h2>Content</h2>
        <div className="content-meta">
          <span className="content-type-badge">{contentType.toUpperCase()}</span>
        </div>
      </div>
      {renderContent()}
    </div>
  );
};

export default ContentRenderer;