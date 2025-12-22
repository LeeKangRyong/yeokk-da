const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_IMAGES = 10;

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return 'JPEG, PNG, WebP 파일만 업로드 가능합니다.';
  }

  if (file.size > MAX_FILE_SIZE) {
    return '파일 크기는 10MB를 초과할 수 없습니다.';
  }

  return null;
}

export function validateImageFiles(files: File[]): string | null {
  if (files.length === 0) {
    return '최소 1개의 이미지를 업로드해야 합니다.';
  }

  if (files.length > MAX_IMAGES) {
    return `최대 ${MAX_IMAGES}개의 이미지만 업로드 가능합니다.`;
  }

  for (const file of files) {
    const error = validateImageFile(file);
    if (error) return error;
  }

  return null;
}

export function validateTitle(title: string): string | null {
  if (!title || title.trim().length === 0) {
    return '제목을 입력해주세요.';
  }

  if (title.length > 100) {
    return '제목은 100자를 초과할 수 없습니다.';
  }

  return null;
}

export function validateContent(content: string): string | null {
  if (content && content.length > 5000) {
    return '내용은 5000자를 초과할 수 없습니다.';
  }

  return null;
}

export function validateLocation(location: string): string | null {
  if (location && location.length > 100) {
    return '장소는 100자를 초과할 수 없습니다.';
  }

  return null;
}
