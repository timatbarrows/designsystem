import React, {
    useState,
    useRef,
    useEffect,
    KeyboardEvent,
    useMemo,
  } from 'react';
  import clsx from 'clsx';
  import { useThemedStyles } from '../utils/useThemedStyles';
  import type { Theme } from '../themes/Theme';
  
  type Option = {
    itemLabel: string;
    itemValue: string;
    group?: string;
  };
  
  type GroupedOption = {
    groupName: string;
    groupValue: Option[];
  };
  
  interface SelectProps {
    label?: string;
    options: Option[] | GroupedOption[];
    selected?: string | string[];
    onChange: (val: string | string[]) => void;
    multi?: boolean;
    typeahead?: boolean;
    grouping?: boolean;
    flattenLevel?: number;
    disabled?: boolean;
    styles?: Record<string, string>;
    theme?: Partial<Theme>;
  }
  
  const Select: React.FC<SelectProps> = ({
    label,
    options,
    selected,
    onChange,
    flattenLevel = 1,
    grouping = false,
    typeahead = false,
    multi = false,
    disabled = false,
    styles = {},
    theme,
  }) => {
    const themedStyles = useThemedStyles('Select', theme, styles);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
  
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [tempSelected, setTempSelected] = useState<string[]>(
      Array.isArray(selected) ? selected : selected ? [selected] : []
    );
    const [focusIndex, setFocusIndex] = useState(0);
  
    // Flatten grouped data based on flattenLevel
    const flatOptions = useMemo<Option[]>(() => {
      if (
        Array.isArray(options) &&
        options.length > 0 &&
        'groupName' in options[0]
      ) {
        const grouped = options as GroupedOption[];
        return grouped.flatMap((g) =>
          g.groupValue.map((o) => ({
            ...o,
            group: flattenLevel >= 2 ? g.groupName : undefined,
          }))
        );
      }
      return options as Option[];
    }, [options, flattenLevel]);
  
    // Filter options for typeahead
    const filteredOptions = useMemo(() => {
      return searchTerm
        ? flatOptions.filter((opt) =>
            opt.itemLabel.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : flatOptions;
    }, [flatOptions, searchTerm]);
  
    const isSelected = (val: string) => tempSelected.includes(val);
  
    const handleSelection = (val: string) => {
      if (multi) {
        const updated = isSelected(val)
          ? tempSelected.filter((v) => v !== val)
          : [...tempSelected, val];
        setTempSelected(updated);
        onChange(updated);
      } else {
        setTempSelected([val]);
        onChange(val);
        setIsOpen(false);
      }
    };
  
    // Handle outside click to close dropdown
    useEffect(() => {
      const handleOutsideClick = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
          if (multi) onChange(tempSelected);
        }
      };
  
      document.addEventListener('mousedown', handleOutsideClick);
      return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [tempSelected, multi, onChange]);
  
    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (!isOpen) return;
      if (e.key === 'ArrowDown') {
        setFocusIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1));
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        setFocusIndex((prev) => Math.max(prev - 1, 0));
        e.preventDefault();
      } else if (e.key === 'Enter') {
        const item = filteredOptions[focusIndex];
        if (item) handleSelection(item.itemValue);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
  
    const displayLabel = multi
      ? tempSelected.length > 1
        ? `${tempSelected[0]}...`
        : tempSelected[0] || ''
      : tempSelected[0] || '';
  
    return (
      <div
        className={clsx(themedStyles.selectContainer)}
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {label && (
          <label className={clsx(themedStyles.label, 'block text-left mb-1')}>
            {label}
          </label>
        )}
  
        <div
          onClick={() => {
            if (!disabled) {
              setIsOpen(!isOpen);
              requestAnimationFrame(() => inputRef.current?.focus());
            }
          }}
          className={clsx(
            themedStyles.select,
            'flex items-center justify-between px-4 py-2 cursor-pointer relative',
            { 'opacity-50 cursor-not-allowed': disabled }
          )}
        >
          <input
            ref={inputRef}
            disabled={disabled}
            type="text"
            className="bg-transparent outline-none w-full placeholder-gray-400"
            placeholder="Choose one"
            value={typeahead ? searchTerm : displayLabel}
            readOnly={!typeahead}
            onChange={(e) => {
              if (typeahead) {
                setSearchTerm(e.target.value);
              }
            }}
          />
          <svg
            className={themedStyles.selectChevron}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
          >
            <path d="M480-360 280-560h400L480-360Z" />
          </svg>
        </div>
  
        {isOpen && (
          <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 text-left max-h-60 overflow-auto">
            {grouping && flatOptions.length > 0 && 'group' in flatOptions[0] ? (
              [...new Set(flatOptions.map((opt) => opt.group))].map((group) => {
                const groupItems = filteredOptions.filter(
                  (opt) => opt.group === group
                );
                return (
                  <li key={group}>
                    <div className={clsx(themedStyles.groupLabel)}>{group}</div>
                    <ul>
                      {groupItems.map((opt) => {
                        const flatIdx = filteredOptions.findIndex(
                          (f) => f.itemValue === opt.itemValue
                        );
                        return (
                          <li
                            key={opt.itemValue}
                            onClick={() => handleSelection(opt.itemValue)}
                            className={clsx(
                              themedStyles.selectOption,
                              'px-4 py-2 text-left cursor-pointer hover:bg-gray-100 flex items-center gap-2',
                              {
                                'bg-blue-100': isSelected(opt.itemValue),
                                'bg-gray-200': focusIndex === flatIdx,
                              }
                            )}
                          >
                            {multi && (
                              <input
                                type="checkbox"
                                checked={isSelected(opt.itemValue)}
                                onChange={() => handleSelection(opt.itemValue)}
                                onClick={(e) => e.stopPropagation()}
                              />
                            )}
                            {opt.itemLabel}
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })
            ) : (
              filteredOptions.map((opt, flatIdx) => (
                <li
                  key={opt.itemValue}
                  onClick={() => handleSelection(opt.itemValue)}
                  className={clsx(
                    themedStyles.selectOption,
                    'px-4 py-2 text-left cursor-pointer hover:bg-gray-100 flex items-center gap-2',
                    {
                      'bg-blue-100': isSelected(opt.itemValue),
                      'bg-gray-200': focusIndex === flatIdx,
                    }
                  )}
                >
                  {multi && (
                    <input
                      type="checkbox"
                      checked={isSelected(opt.itemValue)}
                      onChange={() => handleSelection(opt.itemValue)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  )}
                  {opt.itemLabel}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    );
  };
  
  export default Select;
  