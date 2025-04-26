import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

// Type definitions
export interface NavItem {
  value: string;
  label: string;
  default?: boolean;
  inactive?: boolean;
}

export interface StyleSettings {
  roundBaseEdges?: Record<string, string>;
  roundActiveEdges?: Record<string, string>;
  roundIndexEdges?: Record<string, Record<string, string>>;
  roundHoverIndexEdges?: Record<string, Record<string, string>>;
}

export interface TabNavProps {
  navData?: NavItem[];
  styles?: Partial<{
    navContainer: string;
    navItemBase: string;
    navItemActive: string;
    navItemInactive: string;
    navItemDisabled: string;
    navItemHover?: string;
    hr: string;
  }>;
  onClick?: (label: string) => void;
  activeTab?: string;
  styleSettings?: StyleSettings;
}

const getRoundedClass = (prefix: string, corner: string, size: string) => {
  if (!size || size === 'none') return '';
  return `${prefix ? `${prefix}:` : ''}rounded-${corner}-${size}`;
};

const getRoundedClasses = (edges: Record<string, string> = {}, prefix = ''): string => {
  const classes: string[] = [];
  if (edges.tl) classes.push(getRoundedClass(prefix, 'tl', edges.tl));
  if (edges.tr) classes.push(getRoundedClass(prefix, 'tr', edges.tr));
  if (edges.bl) classes.push(getRoundedClass(prefix, 'bl', edges.bl));
  if (edges.br) classes.push(getRoundedClass(prefix, 'br', edges.br));
  return classes.join(' ');
};

const getIndexSpecificRounding = (
  index: number,
  roundPerIndex: Record<string, Record<string, string>> = {},
  prefix = ''
): string => {
  const key = index.toString();
  const isLast = index === Object.keys(roundPerIndex || {}).length - 1;

  const special: Record<string, string> | undefined =
    roundPerIndex?.[key] ||
    (key === '0' && roundPerIndex?.f) ||
    (isLast ? roundPerIndex?.l : undefined);

  return special ? getRoundedClasses(special, prefix) : '';
};

const TabNav: React.FC<TabNavProps> = ({
  navData = [],
  styles = {},
  onClick,
  activeTab,
  styleSettings = {},
}) => {
  const location = useLocation();

  const fallbackNav: NavItem[] = [{ value: '/', label: 'Home', default: true }];
  const linksToRender = navData.length > 0 ? navData : fallbackNav;

  const routePath =
    linksToRender.some((link) => link.value === location.pathname)
      ? location.pathname
      : linksToRender.find((link) => link.default)?.value ?? location.pathname;

  const defaultStyles = {
    navContainer: '',
    navItemBase: 'min-w-[120px] text-center py-2 font-roboto font-normal',
    navItemActive: 'bg-blue-600 border-b-4 border-blue-300 text-white cursor-default',
    navItemInactive: 'text-slate-600 hover:bg-slate-200 hover:border-b-4 hover:border-slate-300',
    navItemDisabled: 'text-gray-400 cursor-not-allowed pointer-events-none',
    hr: 'border-t-2 border-slate-200 w-full',
  };

  const merged = { ...defaultStyles, ...styles };

  return (
    <div className="flex flex-col">
      <nav className={`flex ${merged.navContainer}`}>
        {linksToRender.map(({ value, label, inactive = false }, index) => {
          const isCurrent = activeTab ? label === activeTab : value === routePath;

          const baseRounding = getRoundedClasses(styleSettings.roundBaseEdges);
          const perIndexRounding = getIndexSpecificRounding(index, styleSettings.roundIndexEdges);
          const hoverRounding = getIndexSpecificRounding(index, styleSettings.roundHoverIndexEdges, 'hover');
          const activeRounding = isCurrent
            ? getRoundedClasses(styleSettings.roundActiveEdges)
            : '';

          const baseClasses = clsx(
            merged.navItemBase,
            baseRounding,
            perIndexRounding,
            hoverRounding,
            activeRounding,
            {
              [merged.navItemActive]: isCurrent,
              [merged.navItemDisabled]: inactive,
              [merged.navItemInactive]: !isCurrent && !inactive,
            },
            !isCurrent && !inactive && merged.navItemHover
          );

          const key = `${label}-${value}`;

          if (inactive) {
            return (
              <span key={key} className={baseClasses}>
                {label}
              </span>
            );
          } else {
            return (
              <Link
                key={key}
                to={value}
                className={baseClasses}
                onClick={(e) => {
                  if (onClick) {
                    e.preventDefault();
                    onClick(label);
                  }
                }}
              >
                {label}
              </Link>
            );
          }
        })}
      </nav>
      <hr className={merged.hr} />
    </div>
  );
};

export default TabNav;

/**
 * ----------------------------------------------------------------
 * Tailwind Config Safelist (tailwind.config.js):
 *
 * safelist: [
 *   'rounded-tl-md', 'rounded-tr-md', 'rounded-bl-md', 'rounded-br-md',
 *   'rounded-tl-lg', 'rounded-tr-lg', 'rounded-bl-lg', 'rounded-br-lg',
 *   'hover:rounded-tl-md', 'hover:rounded-tr-md',
 *   'hover:rounded-bl-md', 'hover:rounded-br-md',
 *   'hover:rounded-tl-lg', 'hover:rounded-tr-lg',
 *   'hover:rounded-bl-lg', 'hover:rounded-br-lg'
 * ]
 * ----------------------------------------------------------------
 *
 * Usage:
 *
 * <TabNav
 *   navData={[
 *     { value: '/overview', label: 'Overview' },
 *     { value: '/reports', label: 'Reports' },
 *     { value: '/settings', label: 'Settings', inactive: true },
 *   ]}
 *   activeTab="Overview"
 *   onClick={(label) => console.log("Clicked:", label)}
 *   styles={{
 *     navContainer: "gap-1",
 *     navItemBase: "min-w-[100px] py-2 text-sm",
 *     navItemActive: "bg-blue-700 text-white border-b-4 border-blue-400",
 *   }}
 *   styleSettings={{
 *     roundBaseEdges: { tl: "md", tr: "md" },
 *     roundIndexEdges: { 0: { tl: "lg", bl: "lg" }, 2: { tr: "lg", br: "lg" } },
 *     roundHoverIndexEdges: { 1: { tl: "md", tr: "md" } },
 *     roundActiveEdges: { tl: "md", tr: "md" },
 *   }}
 * />
 *
 */
