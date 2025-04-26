// components/forms/RadioButton.tsx
import React, { useState } from 'react';
import { useThemedStyles } from '../utils/useThemedStyles';
import type { Theme } from '../themes/Theme';

type ValidationTrigger = 'change' | 'blur';

interface RadioButtonProps {
  label?: string;
  labelAlign?: 'vertical' | 'horizontal';
  value?: string;
  checkedValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  validator?: (value: string) => boolean;
  validateOn?: ValidationTrigger;
  onFocus?: () => void;
  onBlur?: () => void;
  styles?: Partial<Record<'wrapper' | 'row' | 'label' | 'labelWrapper' | 'input' | 'invalid', string>>;
  theme?: Partial<Theme>;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  labelAlign = 'horizontal',
  value,
  checkedValue,
  onChange,
  disabled = false,
  validator,
  validateOn = 'change',
  onFocus,
  onBlur,
  styles = {},
  theme,
}) => {
  const [isValid, setIsValid] = useState<boolean>(true);

  const themedStyles = useThemedStyles('RadioButton', theme, styles);

  const validate = () => {
    if (validator) setIsValid(validator(value || ''));
  };

  const handleChange = () => {
    onChange?.(value || '');
    if (validateOn === 'change') validate();
  };

  const handleBlur = () => {
    onBlur?.();
    if (validateOn === 'blur') validate();
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
            ? 'flex flex-col items-center gap-1'
            : themedStyles.row
        }
      >
        <input
          type="radio"
          className={inputClass}
          checked={value === checkedValue}
          onChange={handleChange}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={handleBlur}
        />
        {labelAlign === 'horizontal' && labelComponent}
        {labelAlign === 'vertical' && (
          <div className={themedStyles.labelWrapper}>{labelComponent}</div>
        )}
      </div>
    </div>
  );
};

export default RadioButton;
