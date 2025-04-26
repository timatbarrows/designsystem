// components/forms/CheckBox.tsx
import React, { useState } from 'react';
import { useThemedStyles } from '../utils/useThemedStyles'
import type { Theme } from '../themes/Theme';

interface CheckBoxProps {
  label?: string;
  labelAlign?: 'vertical' | 'horizontal';
  checked?: boolean;
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  validator?: (value: boolean) => boolean;
  validateOn?: 'change' | 'blur';
  onFocus?: () => void;
  onBlur?: () => void;
  styles?: Partial<Record<'wrapper' | 'row' | 'label' | 'labelWrapper' | 'input' | 'invalid' | 'checkmark', string>>;
  theme?: Partial<Theme>;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  label,
  labelAlign = 'horizontal',
  checked,
  defaultValue = false,
  onChange,
  disabled = false,
  validator,
  validateOn = 'change',
  onFocus,
  onBlur,
  styles = {},
  theme,
}) => {
  const [internalValue, setInternalValue] = useState<boolean>(defaultValue);
  const [isValid, setIsValid] = useState<boolean>(true);

  const themedStyles = useThemedStyles('CheckBox', theme, styles);
  const currentValue = checked !== undefined ? checked : internalValue;

  const validate = (val: boolean) => {
    if (validator) setIsValid(validator(val));
  };

  const handleChange = () => {
    const newValue = !currentValue;
    if (checked === undefined) setInternalValue(newValue);
    if (validateOn === 'change') validate(newValue);
    onChange?.(newValue);
  };

  const handleBlur = () => {
    onBlur?.();
    if (validateOn === 'blur') validate(currentValue);
  };

  const inputClass = `${themedStyles.input} ${!isValid ? themedStyles.invalid : ''}`;

  const labelComponent = label ? (
    <label className={themedStyles.label}>{label}</label>
  ) : null;

  return (
    <div className={themedStyles.wrapper}>
      <div
        className={
          labelAlign === 'vertical'
            ? `flex flex-col items-center gap-1`
            : themedStyles.row
        }
      >
        <div className="relative">
          <input
            type="checkbox"
            checked={currentValue}
            className={inputClass}
            onChange={handleChange}
            disabled={disabled}
            onFocus={onFocus}
            onBlur={handleBlur}
          />
          {currentValue && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              width="28px"
              height="28px"
              fill="#ffffff"
              className={themedStyles.checkmark}
            >
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
          )}
        </div>
        {labelAlign === 'horizontal' && labelComponent}
        {labelAlign === 'vertical' && (
          <div className={themedStyles.labelWrapper}>{labelComponent}</div>
        )}
      </div>
    </div>
  );
};

export default CheckBox;
