import { Injectable, Logger } from '@nestjs/common';

interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  gradient: string[];
}

interface AnimationConfig {
  duration: number;
  easing: string;
  intensity: number;
  particleCount?: number;
}

interface LayoutConfig {
  imageLayout: 'masonry' | 'grid' | 'carousel' | 'stacked';
  contentPosition: 'left' | 'center' | 'right';
  spacing: 'compact' | 'normal' | 'spacious';
}

interface TypographyConfig {
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

@Injectable()
export class StyleMapperService {
  private readonly logger = new Logger(StyleMapperService.name);

  generateStyleMetadata(memory: {
    moodTag: string;
    themeTag: string;
    intensity: number;
    animationTheme: string;
  }): StyleMetadata {
    this.logger.log(
      `Generating style metadata for mood:${memory.moodTag}, theme:${memory.themeTag}, intensity:${memory.intensity}`,
    );

    return {
      colors: this.getColorPalette(memory.moodTag, memory.themeTag),
      animation: this.getAnimationConfig(
        memory.animationTheme,
        memory.intensity,
      ),
      layout: this.getLayoutConfig(memory.themeTag, memory.intensity),
      typography: this.getTypographyConfig(memory.moodTag, memory.intensity),
    };
  }

  private getColorPalette(
    moodTag: string,
    themeTag: string,
  ): ColorPalette {
    const moodColors: Record<
      string,
      { primary: string; secondary: string; accent: string }
    > = {
      행복: { primary: '#FCD34D', secondary: '#FDE68A', accent: '#F59E0B' },
      그리움: { primary: '#A78BFA', secondary: '#C4B5FD', accent: '#8B5CF6' },
      설렘: { primary: '#FB7185', secondary: '#FDA4AF', accent: '#F43F5E' },
      평온: { primary: '#6EE7B7', secondary: '#A7F3D0', accent: '#10B981' },
      슬픔: { primary: '#60A5FA', secondary: '#93C5FD', accent: '#3B82F6' },
      감사: { primary: '#FCA5A5', secondary: '#FECACA', accent: '#EF4444' },
      뿌듯함: { primary: '#A3E635', secondary: '#BEF264', accent: '#84CC16' },
      애틋함: { primary: '#C084FC', secondary: '#D8B4FE', accent: '#A855F7' },
    };

    const base = moodColors[moodTag] || moodColors['행복'];

    return {
      primary: base.primary,
      secondary: base.secondary,
      accent: base.accent,
      background: this.lighten(base.primary, 95),
      text: this.darken(base.primary, 20),
      gradient: [base.primary, base.secondary, base.accent],
    };
  }

  private getAnimationConfig(
    animationTheme: string,
    intensity: number,
  ): AnimationConfig {
    const baseConfigs: Record<
      string,
      { duration: number; easing: string; particleCount: number }
    > = {
      happy: {
        duration: 2,
        easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        particleCount: 30,
      },
      nostalgic: {
        duration: 4,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        particleCount: 15,
      },
      exciting: {
        duration: 1.5,
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        particleCount: 50,
      },
      peaceful: {
        duration: 6,
        easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        particleCount: 10,
      },
      melancholy: {
        duration: 5,
        easing: 'cubic-bezier(0.4, 0, 0.6, 1)',
        particleCount: 8,
      },
    };

    const config = baseConfigs[animationTheme] || baseConfigs.peaceful;

    return {
      ...config,
      intensity: intensity / 100,
    };
  }

  private getLayoutConfig(
    themeTag: string,
    intensity: number,
  ): LayoutConfig {
    const layouts: Record<
      string,
      {
        imageLayout: 'masonry' | 'grid' | 'carousel' | 'stacked';
        contentPosition: 'left' | 'center' | 'right';
        spacing: 'compact' | 'normal' | 'spacious';
      }
    > = {
      여행: { imageLayout: 'masonry', contentPosition: 'left', spacing: 'spacious' },
      성장: { imageLayout: 'grid', contentPosition: 'center', spacing: 'normal' },
      사랑: { imageLayout: 'carousel', contentPosition: 'center', spacing: 'compact' },
      우정: { imageLayout: 'grid', contentPosition: 'left', spacing: 'normal' },
      가족: { imageLayout: 'masonry', contentPosition: 'left', spacing: 'spacious' },
      성취: { imageLayout: 'stacked', contentPosition: 'center', spacing: 'normal' },
      일상: { imageLayout: 'grid', contentPosition: 'left', spacing: 'compact' },
      도전: { imageLayout: 'stacked', contentPosition: 'center', spacing: 'spacious' },
    };

    return layouts[themeTag] || layouts['일상'];
  }

  private getTypographyConfig(
    moodTag: string,
    intensity: number,
  ): TypographyConfig {
    const scale: 'small' | 'medium' | 'large' =
      intensity > 70 ? 'large' : intensity > 40 ? 'medium' : 'small';

    return {
      headingSize: scale,
      bodySize: 'medium',
      fontWeight: intensity > 60 ? 'bold' : 'normal',
      lineHeight: intensity > 70 ? 'tight' : 'normal',
    };
  }

  private lighten(hex: string, percent: number): string {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;
    return (
      '#' +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  }

  private darken(hex: string, percent: number): string {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = ((num >> 8) & 0x00ff) - amt;
    const B = (num & 0x0000ff) - amt;
    return (
      '#' +
      (
        0x1000000 +
        (R > 0 ? R : 0) * 0x10000 +
        (G > 0 ? G : 0) * 0x100 +
        (B > 0 ? B : 0)
      )
        .toString(16)
        .slice(1)
    );
  }
}
