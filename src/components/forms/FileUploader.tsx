import { useThemedStyles } from '../utils/useThemedStyles';
import { useState, useRef } from 'react';
import type { Theme } from '../themes/Theme';
import { FILE_ERRORS } from '../utils/constants';

interface FileUploaderProps {
  accept?: string[];
  multiple?: boolean;
  maxSizeMB?: number;
  onChange?: (files: File[]) => void;
  onError?: (error: string) => void;
  styles?: Partial<Record<string, string>>;
  theme?: Partial<Theme>;
  showBrowseButton?: boolean;
  browseButtonIcon?: React.ReactNode | string;
  browseButtonIconPosition?: 'left' | 'right';
  iconType?: 'material' | 'svg' | 'url';
  showInlineErrors?: boolean; // 🆕
}

const FileUploader: React.FC<FileUploaderProps> = ({
  accept = [],
  multiple = true,
  maxSizeMB = 5,
  onChange,
  onError,
  styles = {},
  theme,
  showBrowseButton = true,
  browseButtonIcon,
  browseButtonIconPosition = 'left',
  iconType = 'material',
  showInlineErrors = true, // 🆕 Default to true
}) => {
  const themedStyles = useThemedStyles('FileUploader', theme, styles);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (files: FileList) => {
    const acceptedTypes = accept.length ? accept : ['*'];
    const filesArray = Array.from(files);

    for (const file of filesArray) {
      if (acceptedTypes[0] !== '*' && !acceptedTypes.includes(file.type)) {
        const message = FILE_ERRORS.FILE_TYPE_NOT_ALLOWED;
        setError(showInlineErrors ? message : null); // Only set if allowed
        onError?.(message);
        return;
      }
      if (file.size > maxSizeMB * 1024 * 1024) {
        const message = FILE_ERRORS.FILE_TOO_LARGE;
        setError(showInlineErrors ? message : null);
        onError?.(message);
        return;
      }
    }

    setError(null);
    onChange?.(filesArray);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const renderIcon = () => {
    if (!browseButtonIcon) return null;

    if (iconType === 'material') {
      return <span className="material-symbols-outlined">{browseButtonIcon}</span>;
    }
    if (iconType === 'url') {
      return <img src={browseButtonIcon as string} alt="icon" className="w-5 h-5" />;
    }
    return browseButtonIcon;
  };

  return (
    <div
      className={`${themedStyles.wrapper} ${dragActive ? themedStyles.dragActive : ''}`}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onClick={handleBrowseClick}
    >
      <div className={themedStyles.text}>
        Drag and drop {multiple ? 'files' : 'a file'} to upload or click to browse your computer.
      </div>

      {showBrowseButton && (
        <div className={themedStyles.browseButtonWrapper}>
          <button type="button" className={themedStyles.browseButton}>
            {browseButtonIcon && browseButtonIconPosition === 'left' && renderIcon()}
            <span>Browse</span>
            {browseButtonIcon && browseButtonIconPosition === 'right' && renderIcon()}
          </button>
        </div>
      )}

      {error && showInlineErrors && ( // 🆕 Only show if allowed
        <div className={themedStyles.errorText}>{error}</div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        multiple={multiple}
        accept={accept.join(',')}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUploader;
