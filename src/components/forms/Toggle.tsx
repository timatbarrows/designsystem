// components/forms/Toggle.tsx
import React, { useState } from 'react';
import { useThemedStyles } from '../utils/useThemedStyles'
import type { Theme } from '../themes/Theme';

type ValidationTrigger = 'change' | 'blur';

interface ToggleProps {
  label?: string;
  labelAlign?: 'vertical' | 'horizontal';
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  validator?: (checked: boolean) => boolean;
  validateOn?: ValidationTrigger;
  onFocus?: () => void;
  onBlur?: () => void;
  styles?: Partial<Record<'wrapper' | 'row' | 'label' | 'labelWrapper' | 'toggle' | 'handle', string>>;
  theme?: Partial<Theme>;
}

const Toggle: React.FC<ToggleProps> = ({
  label,
  labelAlign = 'horizontal',
  checked,
  onChange,
  disabled = false,
  validator,
  validateOn = 'change',
  onFocus,
  onBlur,
  styles = {},
  theme,
}) => {
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState<boolean>(false);
  const currentChecked = isControlled ? checked! : internalChecked;
  const [isValid, setIsValid] = useState<boolean>(true);

  const themedStyles = useThemedStyles('Toggle', theme, styles);

  const validate = () => {
    if (validator) setIsValid(validator(currentChecked));
  };

  const handleChange = () => {
    const newValue = !currentChecked;
    if (!isControlled) setInternalChecked(newValue);
    onChange?.(newValue);
    if (validateOn === 'change') validate();
  };

  const handleBlur = () => {
    onBlur?.();
    if (validateOn === 'blur') validate();
  };

  const toggleClass = `${themedStyles.toggle} ${
    disabled
      ? currentChecked
        ? 'bg-blue-300 opacity-80 cursor-not-allowed'
        : 'bg-slate-200 opacity-80 cursor-not-allowed'
      : currentChecked
      ? 'bg-blue-600'
      : 'bg-slate-300'
  } ${!isValid ? 'ring-2 ring-red-500' : ''}`;

  const handleClass = `${themedStyles.handle} ${currentChecked ? 'translate-x-6' : 'translate-x-0'}`;

  const labelComponent = label ? (
    <label className={themedStyles.label}>{label}</label>
  ) : null;

  return labelAlign === 'horizontal' ? (
    <div className={themedStyles.wrapper}>
      <div className={themedStyles.row}>
        <div
          className={toggleClass}
          onClick={!disabled ? handleChange : undefined}
          onFocus={onFocus}
          onBlur={handleBlur}
          tabIndex={0}
          role="switch"
          aria-checked={currentChecked}
        >
          <div className={handleClass}></div>
        </div>
        {labelComponent}
      </div>
    </div>
  ) : (
    <div className={themedStyles.wrapper}>
      {label && <div className={themedStyles.labelWrapper}>{labelComponent}</div>}
      <div
        className={toggleClass}
        onClick={!disabled ? handleChange : undefined}
        onFocus={onFocus}
        onBlur={handleBlur}
        tabIndex={0}
        role="switch"
        aria-checked={currentChecked}
      >
        <div className={handleClass}></div>
      </div>
    </div>
  );
};

export default Toggle;
