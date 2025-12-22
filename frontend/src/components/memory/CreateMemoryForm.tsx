'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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
  const { mutate: createMemory, isPending, error: apiError, isSuccess } = useCreateMemory();

  const [images, setImages] = useState<File[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [memoryDate, setMemoryDate] = useState(formatDateInput(new Date()));
  const [location, setLocation] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Client-side validation errors
  const [errors, setErrors] = useState<{
    images?: string;
    title?: string;
    content?: string;
    location?: string;
  }>({});

  // Show success animation when mutation succeeds
  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      setTimeout(() => {
        router.push('/memories');
      }, 2000);
    }
  }, [isSuccess, router]);

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
    <>
      {/* Success Overlay Animation */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="rounded-2xl bg-white p-8 shadow-3d-lg"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <div className="flex flex-col items-center gap-4">
                {/* Animated Checkmark */}
                <motion.div
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <motion.svg
                    className="h-12 w-12 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                    />
                  </motion.svg>
                </motion.div>

                <motion.p
                  className="text-lg font-semibold text-gray-900"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  추억이 생성되었습니다!
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Form with Staggered Fields */}
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

        {/* Title */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          }}
        >
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
        </motion.div>

        {/* Content */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          }}
        >
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
        </motion.div>

        {/* Memory Date */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          }}
        >
          <DatePicker
            label="날짜"
            value={memoryDate}
            onChange={(e) => setMemoryDate(e.target.value)}
            max={formatDateInput(new Date())}
          />
        </motion.div>

        {/* Location */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          }}
        >
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
        </motion.div>

        {/* API Error */}
        <AnimatePresence>
          {apiError && (
            <motion.div
              className="rounded-lg bg-red-50 p-4 text-sm text-red-700"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {apiError.message}
            </motion.div>
          )}
        </AnimatePresence>

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
            추억 만들기 →
          </Button>
        </motion.div>
      </motion.form>
    </>
  );
}
