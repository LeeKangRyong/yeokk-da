export const MOOD_TAGS = [
  '행복',
  '그리움',
  '설렘',
  '평온',
  '슬픔',
  '감사',
  '뿌듯함',
  '애틋함',
] as const;

export const THEME_TAGS = [
  '여행',
  '성장',
  '사랑',
  '우정',
  '가족',
  '성취',
  '일상',
  '도전',
] as const;

export const SORT_OPTIONS = [
  { value: 'memoryDate', label: '날짜순' },
  { value: 'createdAt', label: '생성순' },
  { value: 'intensity', label: '감정강도순' },
] as const;
