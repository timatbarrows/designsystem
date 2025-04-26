// components/forms/DatePicker.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useThemedStyles } from '../utils/useThemedStyles';
import type { Theme } from '../themes/Theme';

interface DatePickerProps {
  mode?: 'single' | 'range';
  value?: string | { start: string; end: string };
  onChange?: (value: string | { start: string; end: string }) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: string;
  maxDate?: string;
  dateFormat?: string;
  icon?: React.ReactNode | string;
  iconType?: 'material' | 'svg' | 'url';
  iconPosition?: 'left' | 'right';
  showInput?: boolean;
  styles?: Partial<Record<'wrapper' | 'input' | 'iconWrapper' | 'calendar' | 'popup' | 'day' | 'daySelected' | 'dayDisabled' | 'footer' | 'clearButton' | 'todayButton', string>>;
  theme?: Partial<Theme>;
}

const DatePicker: React.FC<DatePickerProps> = ({
  mode = 'single',
  value,
  onChange,
  placeholder = 'Select date',
  disabled = false,
  minDate,
  maxDate,
  dateFormat = 'YYYY/MM/DD',
  icon,
  iconType = 'material',
  iconPosition = 'right',
  showInput = true,
  styles = {},
  theme,
}) => {
  const themedStyles = useThemedStyles('DatePicker', theme, styles);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selected, setSelected] = useState<string | { start: string; end: string }>(value || '');
  const [hoverDate, setHoverDate] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  useEffect(() => {
    if (value !== undefined) setSelected(value);
  }, [value]);

  const toggleCalendar = () => {
    if (disabled) return;
    setShowCalendar((prev) => !prev);
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    if (dateFormat.toLowerCase() === 'yy/mm/dd') return `${year % 100}/${month}/${day}`;
    return `${year}/${month}/${day}`;
  };

  const parseInputDate = (input: string) => {
    const parts = input.split(/[-/]/).map((p) => parseInt(p, 10));
    if (parts.length < 3 || parts.some(isNaN)) return null;
    const [y, m, d] = parts;
    return new Date(y < 100 ? 2000 + y : y, m - 1, d);
  };

  const isWithinRange = (date: Date) => {
    if (minDate && new Date(date) < new Date(minDate)) return false;
    if (maxDate && new Date(date) > new Date(maxDate)) return false;
    return true;
  };

  const handleDateClick = (date: Date) => {
    console.log(date);
    const formatted = formatDate(date);
    if (mode === 'single') {
      setSelected(formatted);
      onChange?.(formatted);
      setShowCalendar(false);
    } else if (mode === 'range') {
      if (typeof selected === 'string' || !selected.start) {
        setSelected({ start: formatted, end: '' });
      } else if (selected.start && !selected.end) {
        if (new Date(formatted) < new Date(selected.start)) {
          setSelected({ start: formatted, end: selected.start });
          onChange?.({ start: formatted, end: selected.start });
        } else {
          setSelected({ ...selected, end: formatted });
          onChange?.({ start: selected.start, end: formatted });
        }
        setShowCalendar(false);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const parsed = parseInputDate(val);
    if (parsed) {
      const formatted = formatDate(parsed);
      setSelected(formatted);
      onChange?.(formatted);
    }
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      (inputRef.current && inputRef.current.contains(e.target as Node)) ||
      (popupRef.current && popupRef.current.contains(e.target as Node)) ||
      (iconRef.current && iconRef.current.contains(e.target as Node))
    ) {
      return;
    }
    setShowCalendar(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const renderIcon = () => {
    if (!icon) return null;
    if (iconType === 'material') {
      return <span className="material-symbols-outlined">{icon}</span>;
    }
    if (iconType === 'url') {
      return <img src={icon as string} alt="" className="w-5 h-5" />;
    }
    return icon;
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderDays = () => {
    const days: React.ReactElement[] = [];
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = getDaysInMonth(currentMonth, currentYear);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`}></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isDisabled = !isWithinRange(date);
      const formatted = formatDate(date);

      let isSelected = false;
      let isHovered = false;

      if (mode === 'single' && selected === formatted) {
        isSelected = true;
      }

      if (mode === 'range' && typeof selected !== 'string') {
        const { start, end } = selected;
        const startDate = start ? new Date(start) : null;
        const endDate = end ? new Date(end) : null;
        const currentDate = new Date(formatted);

        if (startDate && endDate && currentDate >= startDate && currentDate <= endDate) {
          isSelected = true;
        }

        if (startDate && !endDate && hoverDate) {
          const hover = new Date(hoverDate);
          if (
            (currentDate >= startDate && currentDate <= hover) ||
            (currentDate <= startDate && currentDate >= hover)
          ) {
            isHovered = true;
          }
        }
      }

      days.push(
        <button
          key={day}
          className={`${themedStyles.day} ${isSelected || isHovered ? themedStyles.daySelected : ''} ${isDisabled ? themedStyles.dayDisabled : ''}`}
          onClick={() => {
            if (!isDisabled) handleDateClick(date);
          }}
          disabled={isDisabled}
          onMouseEnter={() => {
            if (!isDisabled) setHoverDate(formatted);
          }}
          onMouseLeave={() => {
            if (!isDisabled) setHoverDate(null);
          }}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const handleTodayClick = () => {
    const now = new Date();
    const formatted = formatDate(now);
    if (mode === 'single') {
      setSelected(formatted);
      onChange?.(formatted);
    } else if (mode === 'range') {
      setSelected({ start: formatted, end: formatted });
      onChange?.({ start: formatted, end: formatted });
    }
    setShowCalendar(false);
  };

  const handleClearClick = () => {
    setSelected(mode === 'single' ? '' : { start: '', end: '' });
    onChange?.(mode === 'single' ? '' : { start: '', end: '' });
    setShowCalendar(false);
  };

  return (
    <div className={themedStyles.wrapper}>
      {icon && iconPosition === 'left' && (
        <div className={themedStyles.iconWrapper} ref={iconRef} onClick={toggleCalendar}>
          {renderIcon()}
        </div>
      )}
      {showInput && (
        <input
          ref={inputRef}
          type="text"
          className={themedStyles.input}
          placeholder={placeholder}
          disabled={disabled}
          value={typeof selected === 'string' ? selected : selected.start}
          onChange={handleInputChange}
          onFocus={() => setShowCalendar(true)}
        />
      )}
      {icon && iconPosition === 'right' && (
        <div className={themedStyles.iconWrapper} ref={iconRef} onClick={toggleCalendar}>
          {renderIcon()}
        </div>
      )}
      {showCalendar && (
        <div className={themedStyles.popup} ref={popupRef}>
          <div className="flex justify-between items-center mb-2">
            <button
              type="button"
              onClick={() => {
                if (currentMonth === 0) {
                  setCurrentMonth(11);
                  setCurrentYear(currentYear - 1);
                } else {
                  setCurrentMonth(currentMonth - 1);
                }
              }}
              className="text-slate-600 hover:text-blue-600"
            >
              ◀
            </button>
            <div className="font-semibold text-slate-700">
              {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
            </div>
            <button
              type="button"
              onClick={() => {
                if (currentMonth === 11) {
                  setCurrentMonth(0);
                  setCurrentYear(currentYear + 1);
                } else {
                  setCurrentMonth(currentMonth + 1);
                }
              }}
              className="text-slate-600 hover:text-blue-600"
            >
              ▶
            </button>
          </div>

          <div className={themedStyles.calendar}>
            {renderDays()}
          </div>

          <div className={themedStyles.footer}>
            <button className={themedStyles.todayButton} onClick={handleTodayClick}>Today</button>
            <button className={themedStyles.clearButton} onClick={handleClearClick}>Clear</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
