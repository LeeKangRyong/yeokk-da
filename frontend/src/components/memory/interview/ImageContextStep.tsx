'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ImageUploader } from '@/components/memory/ImageUploader';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { DatePicker } from '@/components/ui/DatePicker';
import { Button } from '@/components/ui/Button';
import { useInterviewStore } from '@/lib/stores/useInterviewStore';
import { useStartInterview } from '@/lib/hooks/useAiInterview';
import { validateImageFiles } from '@/lib/utils/validation';
import { formatDateInput } from '@/lib/utils/formatDate';

export function ImageContextStep() {
  const router = useRouter();
  const {
    images,
    setImages,
    initialContext,
    setInitialContext,
    memoryDate,
    setMemoryDate,
    location,
    setLocation,
    title,
    setTitle,
  } = useInterviewStore();

  const { mutate: startInterview, isPending, error: apiError } = useStartInterview();

  const [errors, setErrors] = useState<{
    images?: string;
  }>({});

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    const imagesError = validateImageFiles(images);
    if (imagesError) newErrors.images = imagesError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Start interview with initial context
    startInterview(initialContext || undefined);
  };

  const handleCancel = () => {
    router.push('/memories');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="mx-auto max-w-3xl space-y-6"
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
          },
        },
      }}
    >
      {/* Header */}
      <motion.div
        className="text-center"
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0 },
        }}
      >
        <h1 className="mb-2 text-3xl font-bold text-gray-400">
          추억의 사진을 업로드하고 간단히 설명해주세요
        </h1>
        <p className="text-gray-600">
          AI가 사진에 대해 질문하며 함께 추억을 복원해드릴게요
        </p>
      </motion.div>

      {/* Image Upload */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0 },
        }}
      >
        <ImageUploader
          images={images}
          onImagesChange={setImages}
          error={errors.images}
        />
      </motion.div>

      {/* Initial Context */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0 },
        }}
      >
        <Textarea
          label="이 사진들에 대해 간단히 알려주세요"
          value={initialContext}
          onChange={(e) => setInitialContext(e.target.value)}
          placeholder="예: 제주도 가족 여행, 2023년 여름"
          rows={4}
          maxLength={500}
          showCharCount
          currentLength={initialContext.length}
        />
        <p className="mt-2 text-sm text-gray-400">
          간단한 설명만으로도 좋아요. AI가 질문을 통해 더 자세히 알아갈게요!
        </p>
      </motion.div>

      {/* Optional Fields */}
      <motion.div
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0 },
        }}
      >
        <DatePicker
          label="날짜 (선택사항)"
          value={memoryDate}
          onChange={(e) => setMemoryDate(e.target.value)}
          max={formatDateInput(new Date())}
          labelColor="text-gray-400"
        />

        <Input
          label="장소 (선택사항)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="예: 제주도 성산일출봉"
          maxLength={100}
        />
      </motion.div>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0 },
        }}
      >
        <Input
          label="제목 (선택사항)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="나중에 AI가 생성한 이야기로 자동 설정됩니다"
          maxLength={100}
        />
      </motion.div>

      {/* API Error */}
      {apiError && (
        <motion.div
          className="rounded-lg bg-red-50 p-4 text-sm text-red-700"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {apiError.message}
        </motion.div>
      )}

      {/* Form Actions */}
      <motion.div
        className="flex items-center justify-end gap-3 pt-4"
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0 },
        }}
      >
        <Button
          type="button"
          variant="secondary"
          onClick={handleCancel}
          disabled={isPending}
        >
          취소
        </Button>
        <Button type="submit" isLoading={isPending}>
          AI 인터뷰 시작 →
        </Button>
      </motion.div>
    </motion.form>
  );
}
