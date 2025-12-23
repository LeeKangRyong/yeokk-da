// Style metadata types matching backend StyleMapperService

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  gradient: string[];
}

export interface LightPosition {
  x: string;
  y: string;
}

export interface AnimationConfig {
  duration: number;
  easing: string;
  intensity: number;
  particleCount?: number;
}

export interface LayoutConfig {
  imageLayout: 'masonry' | 'grid' | 'carousel' | 'stacked';
  contentPosition: 'left' | 'center' | 'right';
  spacing: 'compact' | 'normal' | 'spacious';
}

export interface TypographyConfig {
  headingSize: 'small' | 'medium' | 'large';
  bodySize: 'small' | 'medium' | 'large';
  fontWeight: 'light' | 'normal' | 'bold';
  lineHeight: 'tight' | 'normal' | 'relaxed';
}

export interface StyleMetadata {
  colors: ColorPalette;
  animation: AnimationConfig;
  layout: LayoutConfig;
  typography: TypographyConfig;
}
