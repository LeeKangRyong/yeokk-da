'use client';

import { useMemo } from 'react';
import type { ColorPalette } from '@/lib/types/style';
import { HappyAnimation } from './themes/HappyAnimation';
import { NostalgicAnimation } from './themes/NostalgicAnimation';
import { ExcitingAnimation } from './themes/ExcitingAnimation';
import { PeacefulAnimation } from './themes/PeacefulAnimation';
import { MelancholyAnimation } from './themes/MelancholyAnimation';

interface ThemeBackgroundProps {
  animationTheme: string;
  colors: ColorPalette;
  intensity: number; // 0-1 scale
}

/**
 * Theme background controller that renders appropriate animation based on theme
 * Provides full-screen background animation layer
 */
export function ThemeBackground({
  animationTheme,
  colors,
  intensity,
}: ThemeBackgroundProps) {
  // Select animation component based on theme
  const AnimationComponent = useMemo(() => {
    const themeMap: Record<
      string,
      React.ComponentType<{ colors: ColorPalette; intensity: number }>
    > = {
      happy: HappyAnimation,
      nostalgic: NostalgicAnimation,
      exciting: ExcitingAnimation,
      peaceful: PeacefulAnimation,
      melancholy: MelancholyAnimation,
    };

    return themeMap[animationTheme.toLowerCase()] || HappyAnimation;
  }, [animationTheme]);

  return <AnimationComponent colors={colors} intensity={intensity} />;
}
