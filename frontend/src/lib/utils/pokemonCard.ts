// Pokemon TCG card style utilities

export interface TiltAngles {
  rotateX: number;
  rotateY: number;
}

export interface LightPosition {
  x: string;
  y: string;
}

/**
 * Calculate 3D tilt angles based on mouse position
 * @param mouseX - Mouse X position relative to card
 * @param mouseY - Mouse Y position relative to card
 * @param rect - Card bounding rectangle
 * @param maxTilt - Maximum tilt angle in degrees (default: 15)
 * @returns Tilt angles for rotateX and rotateY
 */
export function calculateTilt(
  mouseX: number,
  mouseY: number,
  rect: DOMRect,
  maxTilt: number = 15,
): TiltAngles {
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  // Calculate distance from center (-1 to 1)
  const deltaX = (mouseX - rect.left - centerX) / centerX;
  const deltaY = (mouseY - rect.top - centerY) / centerY;

  // Apply tilt (Y rotation for X movement, X rotation for Y movement)
  const rotateY = deltaX * maxTilt;
  const rotateX = -deltaY * maxTilt;

  return { rotateX, rotateY };
}

/**
 * Calculate light reflection position based on mouse
 * @param mouseX - Mouse X position relative to card
 * @param mouseY - Mouse Y position relative to card
 * @param rect - Card bounding rectangle
 * @returns Light position as percentage strings
 */
export function calculateLightPosition(
  mouseX: number,
  mouseY: number,
  rect: DOMRect,
): LightPosition {
  const x = ((mouseX - rect.left) / rect.width) * 100;
  const y = ((mouseY - rect.top) / rect.height) * 100;

  return {
    x: `${Math.max(0, Math.min(100, x))}%`,
    y: `${Math.max(0, Math.min(100, y))}%`,
  };
}

/**
 * Generate hologram gradient CSS based on intensity and mouse position
 * @param intensity - Intensity value (0-1)
 * @param mouseX - Mouse X percentage (0-100)
 * @param mouseY - Mouse Y percentage (0-100)
 * @returns CSS gradient string
 */
export function getHologramGradient(
  intensity: number,
  mouseX: number = 50,
  mouseY: number = 50,
): string {
  const opacity = Math.max(0.1, Math.min(0.8, intensity));

  return `radial-gradient(
    circle at ${mouseX}% ${mouseY}%,
    rgba(255, 0, 255, ${opacity * 0.8}) 0%,
    rgba(0, 255, 255, ${opacity * 0.6}) 25%,
    rgba(255, 255, 0, ${opacity * 0.7}) 50%,
    rgba(255, 0, 0, ${opacity * 0.5}) 75%,
    transparent 100%
  )`;
}

/**
 * Get card border color based on mood tag
 * @param moodTag - Korean mood tag
 * @returns Border color (hex string)
 */
export function getCardBorderColor(moodTag: string): string {
  const borderColors: Record<string, string> = {
    행복: '#F59E0B', // Yellow
    그리움: '#8B5CF6', // Purple
    설렘: '#F43F5E', // Pink
    평온: '#10B981', // Green
    슬픔: '#3B82F6', // Blue
    감사: '#EF4444', // Red
    뿌듯함: '#84CC16', // Lime
    애틋함: '#A855F7', // Violet
  };

  return borderColors[moodTag] || '#0EA5E9'; // Default: primary blue
}

/**
 * Get hologram pattern type based on animation theme
 * @param animationTheme - Animation theme (happy, nostalgic, etc.)
 * @returns Pattern type
 */
export function getHologramPattern(
  animationTheme: string,
): 'star' | 'wave' | 'lightning' | 'circle' | 'raindrop' {
  const patterns: Record<
    string,
    'star' | 'wave' | 'lightning' | 'circle' | 'raindrop'
  > = {
    happy: 'star',
    nostalgic: 'wave',
    exciting: 'lightning',
    peaceful: 'circle',
    melancholy: 'raindrop',
  };

  return patterns[animationTheme] || 'star';
}

/**
 * Get card rarity tier based on intensity
 * @param intensity - Intensity value (0-100)
 * @returns Rarity tier
 */
export function getCardRarity(
  intensity: number,
): 'common' | 'rare' | 'holographic' {
  if (intensity <= 30) return 'common';
  if (intensity <= 60) return 'rare';
  return 'holographic';
}

/**
 * Get hologram animation duration based on intensity
 * @param intensity - Intensity value (0-100)
 * @returns Animation duration in seconds
 */
export function getHologramDuration(intensity: number): number {
  const rarity = getCardRarity(intensity);

  const durations = {
    common: 8,
    rare: 5,
    holographic: 3,
  };

  return durations[rarity];
}

/**
 * Get border style based on card rarity
 * @param intensity - Intensity value (0-100)
 * @param borderColor - Base border color
 * @returns CSS border style
 */
export function getCardBorderStyle(
  intensity: number,
  borderColor: string,
): string {
  const rarity = getCardRarity(intensity);

  switch (rarity) {
    case 'common':
      return `2px solid ${borderColor}40`; // 25% opacity
    case 'rare':
      return `3px solid ${borderColor}`;
    case 'holographic':
      return `4px solid transparent`;
  }
}

/**
 * Get card box shadow based on rarity
 * @param intensity - Intensity value (0-100)
 * @param borderColor - Base border color
 * @returns CSS box shadow
 */
export function getCardBoxShadow(
  intensity: number,
  borderColor: string,
): string {
  const rarity = getCardRarity(intensity);

  switch (rarity) {
    case 'common':
      return '0 4px 8px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.08)';
    case 'rare':
      return `0 8px 16px rgba(0, 0, 0, 0.12), 0 16px 32px rgba(0, 0, 0, 0.1), 0 0 40px ${borderColor}40`;
    case 'holographic':
      return `0 12px 24px rgba(0, 0, 0, 0.15), 0 24px 48px rgba(0, 0, 0, 0.12), 0 0 60px ${borderColor}60, 0 0 100px ${borderColor}30`;
  }
}
