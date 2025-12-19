# Frontend Development Guide

## Project Structure

```
frontend/src/
├── app/              # Next.js pages (App Router)
│   ├── (auth)/
│   ├── (main)/
│   └── s/           # Share pages
├── components/
│   ├── memory/      # Memory components
│   ├── ui/          # Reusable UI
│   └── shared/      # Shared components
├── lib/
│   ├── api/         # API clients
│   ├── hooks/       # Custom hooks
│   ├── stores/      # Zustand stores
│   └── utils/       # Helpers
└── types/           # TypeScript types
```

---

## Setup

```bash
# Install
npm install

# Environment
cp .env.local.example .env.local

# Run
npm run dev
```

---

## Common Tasks

### Create New Page

```tsx
// app/(main)/memories/page.tsx
export default function MemoriesPage() {
  const { data: memories, isLoading } = useMemories();

  if (isLoading) return <Skeleton />;

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">Memories</h1>
      <MemoryList memories={memories} />
    </div>
  );
}
```

### Create Component

```tsx
// components/memory/MemoryCard.tsx
interface MemoryCardProps {
  memory: Memory;
  onClick?: (id: string) => void;
}

export function MemoryCard({ memory, onClick }: MemoryCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={() => onClick?.(memory.id)}
      className="rounded-lg overflow-hidden shadow-lg cursor-pointer"
    >
      <Image
        src={memory.coverImage}
        alt={memory.title}
        width={400}
        height={300}
      />
      <div className="p-4">
        <h3 className="font-bold">{memory.title}</h3>
        <span className="text-sm text-gray-500">{memory.moodTag}</span>
      </div>
    </motion.div>
  );
}
```

### Add Framer Motion Animation

```tsx
// Timeline layout
export function TimelineLayout({ memories }: TimelineLayoutProps) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.1 },
        },
      }}
    >
      {memories.map((memory) => (
        <motion.div
          key={memory.id}
          variants={{
            hidden: { opacity: 0, y: 50 },
            show: { opacity: 1, y: 0 },
          }}
        >
          <MemoryCard memory={memory} />
        </motion.div>
      ))}
    </motion.div>
  );
}
```

### API Integration

```tsx
// lib/api/memories.ts
export const memoriesApi = {
  getAll: (filters?: Filters) =>
    apiClient.get<Memory[]>('/memories', { params: filters }),

  create: (data: CreateMemoryDto) =>
    apiClient.post<Memory>('/memories', data),
};

// lib/hooks/useMemories.ts
export function useMemories(filters?: Filters) {
  return useQuery({
    queryKey: ['memories', filters],
    queryFn: () => memoriesApi.getAll(filters),
  });
}

export function useCreateMemory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: memoriesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memories'] });
    },
  });
}
```

### State Management (Zustand)

```tsx
// lib/stores/useMemoryStore.ts
interface MemoryStore {
  selectedMemory: Memory | null;
  selectMemory: (id: string) => void;
}

export const useMemoryStore = create<MemoryStore>((set, get) => ({
  selectedMemory: null,
  
  selectMemory: (id) => {
    const memory = /* fetch or get from cache */;
    set({ selectedMemory: memory });
  },
}));

// Usage in component
function MemoryDetail() {
  const selectedMemory = useMemoryStore((s) => s.selectedMemory);
  return <div>{selectedMemory?.title}</div>;
}
```

---

## Styling

### Tailwind CSS

```tsx
// Use Tailwind utility classes
<div className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-md">
  <Image src={src} className="h-16 w-16 rounded-full" />
  <div className="flex-1">
    <h3 className="text-lg font-bold">Title</h3>
    <p className="text-sm text-gray-600">Description</p>
  </div>
</div>
```

### Responsive Design

```tsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  {/* Cards */}
</div>
```

---

## Testing

```bash
# Run tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

### Component Test

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryCard } from './MemoryCard';

describe('MemoryCard', () => {
  const mockMemory = {
    id: '1',
    title: 'Test Memory',
    coverImage: '/test.jpg',
    moodTag: '행복',
  };

  it('renders memory info', () => {
    render(<MemoryCard memory={mockMemory} />);
    
    expect(screen.getByText('Test Memory')).toBeInTheDocument();
    expect(screen.getByText('행복')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<MemoryCard memory={mockMemory} onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('article'));
    expect(handleClick).toHaveBeenCalledWith('1');
  });
});
```

---

## Performance

### Image Optimization

```tsx
import Image from 'next/image';

<Image
  src={memory.coverImage}
  alt={memory.title}
  width={400}
  height={300}
  loading="lazy"
  placeholder="blur"
  blurDataURL="/blur.jpg"
/>
```

### Dynamic Imports

```tsx
import dynamic from 'next/dynamic';

const VideoPlayer = dynamic(() => import('@/components/VideoPlayer'), {
  ssr: false,
  loading: () => <Skeleton />,
});
```

### React Query Caching

```tsx
const { data } = useQuery({
  queryKey: ['memories'],
  queryFn: fetchMemories,
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
});
```

---

## Debugging

```bash
# Development server
npm run dev

# Check types
npm run type-check

# Lint
npm run lint
```

---

## Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run start
```

See [`.github/workflows/deploy-frontend.yml`](../../.github/workflows/deploy-frontend.yml)
