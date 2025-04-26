// components/forms/Input.tsx
import React, { useState } from "react";
import { useThemedStyles } from '../utils/useThemedStyles';
import type { Theme } from '../themes/Theme';

type InputType =
  | "text"
  | "email"
  | "number"
  | "password"
  | "url"
  | "tel"
  | "search"
  | "date"
  | "time";

type ValidationTrigger = "change" | "blur";

interface InputProps {
  label?: string;
  labelAlign?: "vertical" | "horizontal";
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  type?: InputType;
  validator?: (value: string) => boolean;
  validateOn?: ValidationTrigger;
  styles?: Partial<
    Record<"wrapper" | "row" | "label" | "labelWrapper" | "input", string>
  >;
  defaultBorderClass?: string;
  invalidBorderClass?: string;
  theme?: Partial<Theme>;
}

const Input: React.FC<InputProps> = ({
  label,
  labelAlign = "vertical",
  placeholder = "",
  value,
  defaultValue,
  onChange,
  disabled = false,
  type = "text",
  validator,
  validateOn = "change",
  styles = {},
  defaultBorderClass = "border-slate-200",
  invalidBorderClass = "border-red-500 focus:ring-red-500",
  theme,
}) => {
  const [internalValue, setInternalValue] = useState<string>(defaultValue || "");
  const [isValid, setIsValid] = useState<boolean>(true);

  const themedStyles = useThemedStyles('Input', theme, styles);
  const currentValue = value !== undefined ? value : internalValue;

  const validate = (val: string) => {
    if (validator) setIsValid(validator(val));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (value === undefined) setInternalValue(val);
    if (validateOn === "change") validate(val);
    onChange?.(val);
  };

  const handleBlur = () => {
    if (validateOn === "blur") validate(currentValue);
  };

  const inputClass = `${themedStyles.input} ${isValid ? defaultBorderClass : invalidBorderClass}`;

  const labelComponent = label ? (
    <label className={themedStyles.label}>{label}</label>
  ) : null;

  return labelAlign === "horizontal" ? (
    <div className={themedStyles.wrapper}>
      <div className={themedStyles.row}>
        {labelComponent}
        <input
          type={type}
          placeholder={placeholder}
          value={currentValue}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          className={inputClass}
        />
      </div>
    </div>
  ) : (
    <div className={themedStyles.wrapper}>
      {label && <div className={themedStyles.labelWrapper}>{labelComponent}</div>}
      <input
        type={type}
        placeholder={placeholder}
        value={currentValue}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
        className={inputClass}
      />
    </div>
  );
};

export default Input;
