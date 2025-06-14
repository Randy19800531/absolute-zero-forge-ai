
export interface ThemeSettings {
  font: string;
  fontSize: number;
  isBold: boolean;
  isUnderline: boolean;
  fontColor: string;
  backgroundMode: 'light' | 'medium' | 'dark';
  backgroundColorScheme: string;
  opacity: number;
  gradient: number;
  fade: number;
}

export interface FontOption {
  name: string;
  value: string;
  category: string;
}
