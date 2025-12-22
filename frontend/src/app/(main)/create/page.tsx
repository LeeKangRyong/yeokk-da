import { CreateMemoryForm } from '@/components/memory/CreateMemoryForm';

export default function CreatePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">추억 만들기</h1>
        <p className="text-gray-600">
          소중한 순간을 기록하고 나만의 스토리를 만들어보세요
        </p>
      </div>

      <CreateMemoryForm />
    </div>
  );
}
