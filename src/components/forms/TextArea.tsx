// components/forms/TextArea.tsx
import React, { useState } from 'react';
import { useThemedStyles } from '../utils/useThemedStyles';
import type { Theme } from '../themes/Theme';

type ValidationTrigger = 'change' | 'blur';

interface TextAreaProps {
  label?: string;
  labelAlign?: 'vertical' | 'horizontal';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  rows?: number;
  cols?: number;
  validator?: (value: string) => boolean;
  validateOn?: ValidationTrigger;
  styles?: Partial<Record<'wrapper' | 'row' | 'label' | 'labelWrapper' | 'textarea', string>>;
  defaultBorderClass?: string;
  invalidBorderClass?: string;
  theme?: Partial<Theme>;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  labelAlign = 'vertical',
  placeholder = '',
  value,
  defaultValue,
  onChange,
  disabled = false,
  rows = 4,
  cols = 50,
  validator,
  validateOn = 'change',
  styles = {},
  defaultBorderClass = 'border-slate-200',
  invalidBorderClass = 'border-red-500 focus:ring-red-500',
  theme,
}) => {
  const [internalValue, setInternalValue] = useState<string>(defaultValue || '');
  const [isValid, setIsValid] = useState<boolean>(true);

  const themedStyles = useThemedStyles('TextArea', theme, styles);
  const currentValue = value !== undefined ? value : internalValue;

  const validate = (val: string) => {
    if (validator) setIsValid(validator(val));
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (value === undefined) setInternalValue(val);
    if (validateOn === 'change') validate(val);
    onChange?.(val);
  };

  const handleBlur = () => {
    if (validateOn === 'blur') validate(currentValue);
  };

  const borderClass = isValid ? defaultBorderClass : invalidBorderClass;
  const textareaClass = `${themedStyles.textarea} ${borderClass}`;

  const labelComponent = label ? (
    <label className={themedStyles.label}>{label}</label>
  ) : null;

  const textareaProps = {
    placeholder,
    value: currentValue,
    onChange: handleChange,
    onBlur: handleBlur,
    disabled,
    rows,
    cols,
    className: textareaClass,
  };

  return labelAlign === 'horizontal' ? (
    <div className={themedStyles.wrapper}>
      <div className={themedStyles.row}>
        {labelComponent}
        <textarea {...textareaProps} />
      </div>
    </div>
  ) : (
    <div className={themedStyles.wrapper}>
      {label && <div className={themedStyles.labelWrapper}>{labelComponent}</div>}
      <textarea {...textareaProps} />
    </div>
  );
};

export default TextArea;
