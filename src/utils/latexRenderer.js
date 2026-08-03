import katex from 'katex';
import 'katex/dist/katex.min.css';

// Render LaTeX to HTML
export const renderLatex = (latex, displayMode = false) => {
  try {
    return katex.renderToString(latex, {
      throwOnError: false,
      displayMode: displayMode,
      trust: true,
      macros: {
        "\\R": "\\mathbb{R}",
        "\\N": "\\mathbb{N}",
        "\\Z": "\\mathbb{Z}",
        "\\Q": "\\mathbb{Q}",
        "\\C": "\\mathbb{C}",
      }
    });
  } catch (error) {
    console.error('LaTeX rendering error:', error);
    return latex;
  }
};

// Extract LaTeX from markdown content
export const extractLatex = (content) => {
  const latexRegex = /\$\$([^$]+)\$\$|\$([^$]+)\$/g;
  const matches = content.matchAll(latexRegex);
  const latexExpressions = [];

  for (const match of matches) {
    const expression = match[1] || match[2];
    if (expression) {
      latexExpressions.push({
        expression: expression.trim(),
        isDisplay: !!match[1],
        fullMatch: match[0]
      });
    }
  }

  return latexExpressions;
};

// Replace LaTeX with rendered HTML
export const renderLatexInText = (text) => {
  if (!text) return text;

  // Handle display math ($$...$$)
  let rendered = text.replace(/\$\$([^$]+)\$\$/g, (match, latex) => {
    try {
      return renderLatex(latex.trim(), true);
    } catch (e) {
      return match;
    }
  });

  // Handle inline math ($...$)
  rendered = rendered.replace(/\$([^$]+)\$/g, (match, latex) => {
    try {
      return renderLatex(latex.trim(), false);
    } catch (e) {
      return match;
    }
  });

  return rendered;
};