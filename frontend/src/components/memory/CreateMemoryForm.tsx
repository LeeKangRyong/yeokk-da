'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ImageUploader } from './ImageUploader';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { DatePicker } from '@/components/ui/DatePicker';
import { Button } from '@/components/ui/Button';
import { useCreateMemory } from '@/lib/hooks/useCreateMemory';
import {
  validateTitle,
  validateContent,
  validateLocation,
  validateImageFiles,
} from '@/lib/utils/validation';
import { formatDateInput } from '@/lib/utils/formatDate';

export function CreateMemoryForm() {
  const router = useRouter();
  const { mutate: createMemory, isPending, error: apiError } = useCreateMemory();

  const [images, setImages] = useState<File[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [memoryDate, setMemoryDate] = useState(formatDateInput(new Date()));
  const [location, setLocation] = useState('');

  // Client-side validation errors
  const [errors, setErrors] = useState<{
    images?: string;
    title?: string;
    content?: string;
    location?: string;
  }>({});

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    const imagesError = validateImageFiles(images);
    if (imagesError) newErrors.images = imagesError;

    const titleError = validateTitle(title);
    if (titleError) newErrors.title = titleError;

    const contentError = validateContent(content);
    if (contentError) newErrors.content = contentError;

    const locationError = validateLocation(location);
    if (locationError) newErrors.location = locationError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    createMemory({
      title,
      content: content || undefined,
      memoryDate,
      location: location || undefined,
      images,
    });
  };

  const handleCancel = () => {
    router.push('/memories');
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-6">
      {/* TODO YD-40: Add slide-up animation on form mount */}

      {/* Image Upload */}
      <ImageUploader
        images={images}
        onImagesChange={setImages}
        error={errors.images}
      />

      {/* Title */}
      <Input
        label="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="추억의 제목을 입력하세요"
        required
        maxLength={100}
        showCharCount
        currentLength={title.length}
        error={errors.title}
      />

      {/* Content */}
      <Textarea
        label="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="추억에 대한 이야기를 자유롭게 작성해보세요"
        rows={6}
        maxLength={5000}
        showCharCount
        currentLength={content.length}
        error={errors.content}
      />

      {/* Memory Date */}
      <DatePicker
        label="날짜"
        value={memoryDate}
        onChange={(e) => setMemoryDate(e.target.value)}
        max={formatDateInput(new Date())} // Can't select future dates
      />

      {/* Location */}
      <Input
        label="장소"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="추억이 있었던 장소 (선택사항)"
        maxLength={100}
        showCharCount
        currentLength={location.length}
        error={errors.location}
      />

      {/* API Error */}
      {apiError && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {apiError.message}
        </div>
      )}

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={handleCancel}
          disabled={isPending}
        >
          취소
        </Button>
        <Button type="submit" isLoading={isPending}>
          추억 만들기 →
        </Button>
        {/* TODO YD-40: Add success checkmark animation on submit */}
        {/* TODO YD-40: Add input focus animations */}
      </div>
    </form>
  );
}
