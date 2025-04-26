// utils/useThemedStyles.ts
import { Theme } from '../themes/Theme';
import { defaultTheme } from '../themes/defaultTheme';

export const useThemedStyles = (
  component: keyof Theme,
  theme?: Partial<Theme>,
  overrides?: Record<string, string>
): Record<string, string> => {
  const base = theme?.[component] || defaultTheme[component];
  return Object.fromEntries(
    Object.entries(base).map(([key, baseClass]) => [
      key,
      [baseClass, overrides?.[key]].filter(Boolean).join(' ').trim() // MERGE instead of REPLACE
    ])
  );
};
