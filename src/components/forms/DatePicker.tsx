// components/forms/DatePicker.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useThemedStyles } from '../utils/useThemedStyles';
import type { Theme } from '../themes/Theme';
import { getStartOfWeek, getEndOfWeek, getStartOfMonth, getEndOfMonth } from '../utils/dateUtils';

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
  iconInputPosition?: 'start' | 'end';
  showInput?: boolean;
  styles?: Partial<Record<string, string>>;
  theme?: Partial<Theme>;
  quickSelects?: ('lastWeek' | 'thisWeek' | 'lastMonth' | 'thisMonth' | 'lastThreeMonths' | 'lastYear')[];
  showClearButton?: boolean;
}

const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const DatePicker: React.FC<DatePickerProps> = (props) => {
  const {
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
    iconInputPosition = 'end',
    showInput = true,
    styles = {},
    theme,
    quickSelects = [],
    showClearButton = true,
  } = props;

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

  useEffect(() => {
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
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const toggleCalendar = () => { if (!disabled) setShowCalendar((prev) => !prev); };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
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


  const handleClearClick = () => {
    updateSelected(mode === 'single' ? '' : { start: '', end: '' });
    setShowCalendar(false);
  };
  


  const handleQuickSelect = (range: string) => {
    const now = new Date();
    let start: Date;
    let end: Date;
  
    switch (range) {
      case 'today':
        start = end = now;
        break;
      case 'lastWeek':
        start = getStartOfWeek(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7));
        end = getEndOfWeek(start);
        break;
      case 'thisWeek':
        start = getStartOfWeek(now);
        end = now;
        break;
      case 'lastMonth':
        start = getStartOfMonth(new Date(now.getFullYear(), now.getMonth() - 1, 1));
        end = getEndOfMonth(start);
        break;
      case 'thisMonth':
        start = getStartOfMonth(now);
        end = now;
        break;
      case 'lastThreeMonths':
        start = getStartOfMonth(new Date(now.getFullYear(), now.getMonth() - 3, 1));
        end = now;
        break;
      case 'lastYear':
        start = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        end = now;
        break;
      default:
        return;
    }
  
    if (mode === 'single') {
        updateSelected(formatDate(start));
      } else {
        updateSelected({ start: formatDate(start), end: formatDate(end) });
      }
      setShowCalendar(false);
      
    setShowCalendar(false);
  };
  
  
  const updateSelected = (newValue: string | { start: string; end: string }) => {
    setSelected(newValue);
    onChange?.(newValue);
  
    // Adjust calendar view if possible
    if (typeof newValue === 'string') {
      const parsed = parseInputDate(newValue);
      if (parsed) {
        setCurrentMonth(parsed.getMonth());
        setCurrentYear(parsed.getFullYear());
      }
    } else if (newValue.start) {
      const parsed = parseInputDate(newValue.start);
      if (parsed) {
        setCurrentMonth(parsed.getMonth());
        setCurrentYear(parsed.getFullYear());
      }
    }
  };
  

  const formatQuickSelectLabel = (range: string) => {
    switch (range) {
      case 'lastWeek': return 'Last Week';
      case 'thisWeek': return 'This Week';
      case 'lastMonth': return 'Last Month';
      case 'thisMonth': return 'This Month';
      case 'lastThreeMonths': return 'Last 3 Months';
      case 'lastYear': return 'Last Year';
      default: return range;
    }
  };

  const handleDateClick = (date: Date) => {
    const formatted = formatDate(date);
  
    if (mode === 'single') {
      updateSelected(formatted);
      setShowCalendar(false);
    } else {
      if (typeof selected === 'string') {
        updateSelected({ start: formatted, end: '' });
      } else if (typeof selected !== 'string') {
        if (selected.start && selected.end) {
          updateSelected({ start: formatted, end: '' });
        } else if (selected.start && !selected.end) {
          if (new Date(formatted) < new Date(selected.start)) {
            updateSelected({ start: formatted, end: selected.start });
          } else {
            updateSelected({ start: selected.start, end: formatted });
          }
          setHoverDate(null);
          setShowCalendar(false);
        } else {
          updateSelected({ start: formatted, end: '' });
        }
      }
    }
  };
  
  
  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();

  const renderDays = () => {
    const days: React.ReactElement[] = [];
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const prevMonthDays = getDaysInMonth(currentMonth - 1 < 0 ? 11 : currentMonth - 1, currentMonth - 1 < 0 ? currentYear - 1 : currentYear);

    const totalCells = 42;
    let dayCounter = 1;
    let nextMonthDayCounter = 1;

    for (let cell = 0; cell < totalCells; cell++) {
      let date: Date;
      let inCurrentMonth = true;

      if (cell < firstDayOfMonth) {
        const day = prevMonthDays - (firstDayOfMonth - 1 - cell);
        date = new Date(currentYear, currentMonth - 1, day);
        inCurrentMonth = false;
      } else if (dayCounter <= daysInMonth) {
        date = new Date(currentYear, currentMonth, dayCounter);
        dayCounter++;
      } else {
        date = new Date(currentYear, currentMonth + 1, nextMonthDayCounter);
        nextMonthDayCounter++;
        inCurrentMonth = false;
      }

      const formatted = formatDate(date);
      const isDisabled = !isWithinRange(date);

      let isStart = false;
      let isEnd = false;
      let isInRange = false;
      let isHovered = false;

      if (mode === 'single' && selected === formatted) {
        isStart = true;
      }

      if (mode === 'range' && typeof selected !== 'string') {
        const { start, end } = selected;
        const startDate = start ? new Date(start) : null;
        const endDate = end ? new Date(end) : null;
        const currentDate = new Date(formatted);

        if (startDate && !endDate && hoverDate) {
          const hover = new Date(hoverDate);
          if ((currentDate >= startDate && currentDate <= hover) || (currentDate <= startDate && currentDate >= hover)) {
            isHovered = true;
          }
        }

        if (startDate && endDate && currentDate >= startDate && currentDate <= endDate) {
          isInRange = true;
        }

        if (startDate && formatted === formatDate(startDate)) {
          isStart = true;
        }

        if (endDate && formatted === formatDate(endDate)) {
          isEnd = true;
        }
      }

      let bgColor = '';
      if (isStart || isEnd || isInRange) {
        bgColor = themedStyles.daySelected;
      } else if (isHovered) {
        bgColor = themedStyles.dayInRangeHover;
      }

      const textColor = inCurrentMonth ? themedStyles.day : themedStyles.dayOutsideMonth;

      days.push(
        <button
          key={`day-${cell}`}
          className={`w-full aspect-square flex items-center justify-center border border-stone-100 ${textColor} ${bgColor} ${isDisabled ? themedStyles.dayDisabled : ''}`}
          onClick={() => !isDisabled && handleDateClick(date)}
          onMouseEnter={() => !isDisabled && setHoverDate(formatDate(date))}
          onMouseLeave={() => !isDisabled && setHoverDate(null)}
          disabled={isDisabled}
        >
          {date.getDate()}
        </button>
      );
    }

    return days;
  };

  const renderIcon = () => {
    if (!icon) return null;
    if (iconType === 'material') {
      return <span className="material-symbols-outlined text-[20px] text-slate-400">{icon}</span>;
    }
    if (iconType === 'url') {
      return <img src={icon as string} alt="" className="w-5 h-5" />;
    }
    return icon;
  };

  return (
    <div className={themedStyles.wrapper}>
      {showInput ? (
        <div className="relative w-full">
          {icon && iconInputPosition === 'start' && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={toggleCalendar}>
              {renderIcon()}
            </div>
          )}
          <input
            ref={inputRef}
            type="text"
            className={`w-full ${icon ? (iconInputPosition === 'start' ? 'pl-10' : 'pr-10') : ''} ${themedStyles.input}`}
            placeholder={placeholder}
            disabled={disabled}
            value={typeof selected === 'string' ? selected : selected.start && selected.end ? `${selected.start} - ${selected.end}` : selected.start}
            onChange={(e) => {
                const val = e.target.value.trim();
                if (val === '') {
                  setSelected(mode === 'single' ? '' : { start: '', end: '' });
                  onChange?.(mode === 'single' ? '' : { start: '', end: '' });
                  return;
                }
                const parsed = parseInputDate(val);
                if (parsed) {
                  const formatted = formatDate(parsed);
                  setSelected(formatted);
                  onChange?.(formatted);
                }
              }}
              
            onFocus={() => setShowCalendar(true)}
          />
          {icon && iconInputPosition === 'end' && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={toggleCalendar}>
              {renderIcon()}
            </div>
          )}
        </div>
      ) : (
        icon && (
          <div className={themedStyles.iconWrapper} ref={iconRef} onClick={toggleCalendar}>
            {renderIcon()}
          </div>
        )
      )}

      {showCalendar && (
        <div className={themedStyles.popup} ref={popupRef}>
          <div className={themedStyles.header}>
            <button type="button" onClick={handlePrevMonth} className={themedStyles.monthNavButton}>
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div className={themedStyles.monthLabel}>
              {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
            </div>
            <button type="button" onClick={handleNextMonth} className={themedStyles.monthNavButton}>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>

          <div className={themedStyles.monthDivider} />

       

          <div className={themedStyles.dayLabelsRow}>
            {dayLabels.map((label, idx) => (
              <div key={idx} className={themedStyles.dayLabel}>{label}</div>
            ))}
          </div>

          <div className={themedStyles.calendar}>
            {renderDays()}
          </div>

          <div className={themedStyles.footer}>
  <div className="flex flex-wrap gap-2">
  {quickSelects?.map((range) => (
  <div key={range} className={themedStyles.quickSelectButtonWrapper}>
    <button
      className={themedStyles.quickSelectButton}
      onClick={() => handleQuickSelect(range)}
      type="button"
    >
      {formatQuickSelectLabel(range)}
    </button>
  </div>
))}

    {showClearButton && (
        <div className={themedStyles.clearButtonWrapper}>

            <button className={themedStyles.clearButton} onClick={handleClearClick}>Clear</button>
        </div>
    )}
  </div>
</div>


        </div>
      )}
    </div>
  );
};

export default DatePicker;
