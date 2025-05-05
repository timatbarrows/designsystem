
import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useThemedStyles } from '../utils/useThemedStyles';
import type { Theme } from '../themes/Theme';
import type { ModalStyle } from '../themes/Theme';

export type ModalType = 'default' | 'toaster';

export type ModalPosition =
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  type?: ModalType;
  position?: ModalPosition;
  styles?: Partial<ModalStyle>;
  theme?: Partial<Theme>;
  closeButton?: {
    type?: 'material' | 'svg' | 'url';
    value?: React.ReactNode | string;
    size?: number;
    className?: string;
  };
  autoDismissAfterSeconds?: number;
};

function RenderCloseIcon({
  icon = 'cancel',
  type = 'material',
  size = 24,
  className = '',
  onClick,
}: {
  icon?: React.ReactNode | string;
  type?: 'material' | 'svg' | 'url';
  size?: number;
  className?: string;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className={className} aria-label="Close modal">
      {type === 'material' && typeof icon === 'string' && (
        <span className="material-symbols-outlined" style={{ fontSize: size }}>
          {icon}
        </span>
      )}
      {type === 'url' && typeof icon === 'string' && (
        <img src={icon} style={{ width: size, height: size }} alt="close" />
      )}
      {type === 'svg' && typeof icon !== 'string' && icon}
    </button>
  );
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  type = 'default',
  position = 'topCenter',
  styles = {},
  theme,
  closeButton,
  autoDismissAfterSeconds,
}) => {
  const themedStyles = useThemedStyles('modal', theme, styles);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || type !== 'default') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, type, onClose]);

  useEffect(() => {
    if (!isOpen || !autoDismissAfterSeconds) return;

    const timeout = setTimeout(() => {
      onClose();
    }, autoDismissAfterSeconds * 1000);

    return () => clearTimeout(timeout);
  }, [isOpen, autoDismissAfterSeconds, onClose]);

  if (!isOpen) return null;

  const toasterKey = `toasterPosition${capitalize(position)}` as keyof typeof themedStyles;

  return (
    <>
      {type === 'default' && (
        <div className={clsx(themedStyles.container)} role="dialog" aria-modal="true">
          <div className={themedStyles.overlay} onClick={onClose} />
          <div className={themedStyles.content} ref={modalRef}>
            <RenderCloseIcon
              icon={closeButton?.value || 'cancel'}
              type={closeButton?.type || 'material'}
              size={closeButton?.size || 24}
              className={clsx(themedStyles.modalCloseButton, closeButton?.className)}
              onClick={onClose}
            />
            {children}
          </div>
        </div>
      )}

{type === 'toaster' && (
  <div
    className={clsx(themedStyles.toasterWrapper, themedStyles[toasterKey])}
    role="alert"
  >
    <div className={clsx(themedStyles.toasterContent)} ref={modalRef}>
      <div className={clsx(themedStyles.toasterText)}>
        {children}
      </div>
      <RenderCloseIcon
        icon={closeButton?.value || 'close'}
        type={closeButton?.type || 'material'}
        size={closeButton?.size || 20}
        className={clsx(themedStyles.toasterCloseButton, closeButton?.className)}
        onClick={onClose}
      />
    </div>
  </div>
)}

    </>
  );
};

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default Modal;
