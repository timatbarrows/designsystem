import React, { useEffect, useState, useRef } from 'react';
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

// Props for Modal component
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

// Close icon renderer based on type
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

  // Local visibility state to manage entry/exit animation
  const [visible, setVisible] = useState<boolean>(isOpen);
  const [showAnimation, setShowAnimation] = useState<boolean>(isOpen);

  // Sync visibility when `isOpen` changes
  useEffect(() => {
    if (isOpen && !visible) {
      setVisible(true);
      setShowAnimation(true);
    } else if (!isOpen && visible) {
      setShowAnimation(false); // triggers exit animation
    }
  }, [isOpen, visible]);

  // Escape key listener for default modals
  useEffect(() => {
    if (!visible || type !== 'default') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [visible, type, onClose]);

  // Auto-dismiss after timeout if specified
  useEffect(() => {
    if (!visible || !autoDismissAfterSeconds) return;

    const timeout = setTimeout(() => {
      onClose();
    }, autoDismissAfterSeconds * 1000);

    return () => clearTimeout(timeout);
  }, [visible, autoDismissAfterSeconds, onClose]);

  // Animation end handler
  const handleAnimationEnd = () => {
    if (!isOpen) {
      setTimeout(() => setVisible(false), 50);
    }
  };

  // Do not render if not visible
  if (!visible) return null;

  const toasterKey = `toasterPosition${capitalize(position)}` as keyof typeof themedStyles;
  const animateInKey = `animateIn${capitalize(position)}` as keyof typeof themedStyles;
  const animateOutKey = `animateOut${capitalize(position)}` as keyof typeof themedStyles;

  return (
    <>
      {/* Default Modal */}
      {type === 'default' && (
        <div className={clsx(themedStyles.container)} role="dialog" aria-modal="true">
          <div
            className={clsx(
              themedStyles.overlay,
              isOpen ? themedStyles.animateIn : themedStyles.animateOut
            )}
            onClick={onClose}
            onAnimationEnd={handleAnimationEnd}
          />
          <div
            className={clsx(
              themedStyles.content,
              isOpen ? themedStyles.animateIn : themedStyles.animateOut
            )}
            onAnimationEnd={handleAnimationEnd}
            ref={modalRef}
          >
            <RenderCloseIcon
              icon={closeButton?.value || 'close'}
              type={closeButton?.type || 'material'}
              size={closeButton?.size || 36}
              className={clsx(themedStyles.modalCloseButton, closeButton?.className)}
              onClick={onClose}
            />
            {children}
          </div>
        </div>
      )}

      {/* Toaster Modal */}
      {type === 'toaster' && visible && (
        <div className={clsx(themedStyles.toasterWrapper, themedStyles[toasterKey])} role="alert">
          <div
            className={clsx(
              themedStyles.toasterContent,
              showAnimation ? themedStyles[animateInKey] : themedStyles[animateOutKey]
            )}
            onAnimationEnd={handleAnimationEnd}
            ref={modalRef}
          >
            <div className={clsx(themedStyles.toasterText)}>{children}</div>
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

// Capitalizes the first letter of the position string
function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default Modal;
