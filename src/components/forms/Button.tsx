// components/forms/Button.tsx
import React from 'react';
import clsx from 'clsx';
import { useThemedStyles } from '../utils/useThemedStyles';
import type { Theme } from '../themes/Theme';

type ButtonShape = 'rectangle' | 'circle' | 'pill';

interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: ButtonShape;
  disabled?: boolean;
  styles?: Partial<Record<'base' | 'rectangle' | 'circle' | 'pill' | 'active' | 'disabled' | 'content' | 'materialSymbol', string>>;
  theme?: Partial<Theme>;
  icon?: React.ReactNode | string;
  iconPosition?: 'left' | 'right';
  materialSymbol?: string;
  materialFontSize?: number;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = 'rectangle',
  disabled = false,
  styles = {},
  theme,
  icon,
  iconPosition = 'right',
  materialSymbol,
  materialFontSize = 24,
}) => {
  console.log('Custom styles:', styles);
  const themedStyles = useThemedStyles('Button', theme, styles);
  
  
  // Determine shape class (rectangle, pill, or circle)
  const shapeClass =
    type === 'circle'
      ? themedStyles.circle
      : type === 'pill'
      ? themedStyles.pill
      : themedStyles.rectangle;

  // Merge base and shape classes
  const baseClass = clsx(themedStyles.base, shapeClass);

  // Use custom active style if provided and not disabled, otherwise fall back to default
  const stateClass = clsx(
    themedStyles.active,
    !disabled && styles.active,
    disabled && themedStyles.disabled
  );
  

  // Render material symbol, image, or custom icon
  const renderIcon = () => {
    if (materialSymbol) {
      return (
        <span
          className={themedStyles.materialSymbol}
          style={{ fontSize: `${materialFontSize}px` }}
        >
          {materialSymbol}
        </span>
      );
    }
    if (!icon) return null;
    if (typeof icon === 'string') {
      return <img src={icon} alt="" className="w-5 h-5" />;
    }
    return icon;
  };

  return (
    <button
      type="button"
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={clsx(baseClass, stateClass)} // Fully merged class names
    >
      <div className={themedStyles.content}>
        {iconPosition === 'left' && renderIcon()}
        {label}
        {iconPosition === 'right' && renderIcon()}
      </div>
    </button>
  );
};

export default Button;
