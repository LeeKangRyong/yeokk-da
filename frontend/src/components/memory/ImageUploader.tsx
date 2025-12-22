'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import { validateImageFile, validateImageFiles } from '@/lib/utils/validation';
import { cn } from '@/lib/utils/cn';

interface ImageUploaderProps {
  images: File[];
  onImagesChange: (images: File[]) => void;
  maxImages?: number;
  error?: string;
}

export function ImageUploader({
  images,
  onImagesChange,
  maxImages = 10,
  error,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      const newImages = [...images, ...files].slice(0, maxImages);
      onImagesChange(newImages);
    },
    [images, maxImages, onImagesChange]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      const newImages = [...images, ...files].slice(0, maxImages);
      onImagesChange(newImages);

      // Reset input value to allow selecting the same file again
      e.target.value = '';
    },
    [images, maxImages, onImagesChange]
  );

  const removeImage = useCallback(
    (index: number) => {
      const newImages = images.filter((_, i) => i !== index);
      onImagesChange(newImages);
    },
    [images, onImagesChange]
  );

  return (
    <div className="w-full">
      <label className="mb-2 block text-sm font-medium text-gray-700">
        이미지 업로드
        <span className="ml-1 text-red-500">*</span>
        <span className="ml-2 text-xs text-gray-500">
          (최대 {maxImages}장)
        </span>
      </label>

      {/* Drop Zone */}
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative mb-4 flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors',
          isDragging
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 bg-gray-50 hover:border-gray-400',
          error && 'border-red-500'
        )}
      >
        <input
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileSelect}
          className="absolute inset-0 cursor-pointer opacity-0"
          disabled={images.length >= maxImages}
        />
        <svg
          className="mb-3 h-12 w-12 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="mb-1 text-sm text-gray-600">
          {images.length >= maxImages
            ? `최대 ${maxImages}개의 이미지가 업로드되었습니다`
            : '클릭하거나 드래그하여 이미지를 업로드하세요'}
        </p>
        <p className="text-xs text-gray-500">
          JPEG, PNG, WebP (최대 10MB)
        </p>
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {images.map((file, index) => (
            <div key={index} className="group relative aspect-square">
              <Image
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                fill
                className="rounded-lg object-cover"
              />
              <div className="absolute inset-0 flex items-start justify-between rounded-lg bg-black bg-opacity-0 p-2 transition-all group-hover:bg-opacity-30">
                <span className="rounded-full bg-primary-600 px-2 py-1 text-xs font-medium text-white">
                  {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="rounded-full bg-red-600 p-1 text-white opacity-0 transition-opacity hover:bg-red-700 group-hover:opacity-100"
                  title="이미지 제거"
                >
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              {/* TODO YD-40: Add entrance animation for thumbnails with stagger effect */}
              {/* TODO YD-40: Add exit animation when removing images */}
              {/* TODO YD-40: Add drag-to-reorder with Framer Motion */}
            </div>
          ))}
        </div>
      )}

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
