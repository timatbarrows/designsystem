// components/forms/CodeBlock.tsx
import React, { useState } from 'react';
import { useThemedStyles } from '../utils/useThemedStyles';
import type { Theme } from '../themes/Theme';

interface CodeBlockProps {
  title?: string;
  children: string;
  styles?: Partial<{
    container: string;
    title: string;
    code: string;
  }>;
  theme?: Partial<Theme>;
}

/**
 * CodeBlock
 *
 * Renders a dark-themed code snippet box with a copy button.
 * Supports base styles and accepts optional class overrides through the `styles` prop.
 *
 * Props:
 * - `title` (string): Optional heading for the code block (default: "Example Usage")
 * - `children` (string): The code snippet to display
 * - `styles` (object): Optional Tailwind class overrides for:
 *    - container: outer wrapper
 *    - title: top header row
 *    - code: code content area
 * - `theme` (object): Optional theme override
 */
const CodeBlock: React.FC<CodeBlockProps> = ({
  title = 'Example Usage',
  children,
  styles = {},
  theme,
}) => {
  const [copied, setCopied] = useState(false);

  const themedStyles = useThemedStyles('CodeBlock', theme, styles);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className={themedStyles.container}>
      <div className={themedStyles.title}>
        <span>{title}</span>
        <button
          onClick={handleCopy}
          className="text-xs font-medium text-blue-100 hover:text-white flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v16h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 18H8V7h11v16z" />
          </svg>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <textarea
        className={themedStyles.code}
        value={children}
        readOnly
        rows={Math.max(3, children.split('\n').length)}
      />
    </div>
  );
};

export default CodeBlock;

