import { defaultTheme } from '../themes/defaultTheme';
import { Theme } from '../themes/Theme';
import { twMerge } from 'tailwind-merge';

export const useThemedStyles = (
  component: keyof Theme,
  theme?: Partial<Theme>,
  overrides?: Partial<Record<string, string>>
): Record<string, string> => {
  const base = theme?.[component] || defaultTheme[component];
  
  return Object.fromEntries(
    Object.entries(base).map(([key, baseClass]) => {
      const overrideClass = overrides?.[key] ?? '';
      return [key, twMerge(`${baseClass} ${overrideClass}`)];
    })
  );
};
