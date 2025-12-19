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

### Advanced Framer Motion Animations

#### Scroll-driven Animations

```tsx
import { useScroll, useTransform, motion } from 'framer-motion';

export function ScrollReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  return (
    <motion.div ref={ref} style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}
```

#### Shared Layout Animations

```tsx
// List view
export function MemoryList({ memories }: Props) {
  return (
    <AnimatePresence>
      {memories.map((memory) => (
        <motion.div
          key={memory.id}
          layoutId={`memory-${memory.id}`}
          onClick={() => router.push(`/memories/${memory.id}`)}
        >
          <MemoryCard memory={memory} />
        </motion.div>
      ))}
    </AnimatePresence>
  );
}

// Detail view
export function MemoryDetail({ memory }: Props) {
  return (
    <motion.div layoutId={`memory-${memory.id}`}>
      <MemoryDetailContent memory={memory} />
    </motion.div>
  );
}
```

#### Dynamic Theme Backgrounds

```tsx
export function ThemeBackground({ theme }: { theme: string }) {
  const particles = useMemo(() => {
    if (theme === 'happy') return <HappyParticles />;
    if (theme === 'nostalgic') return <NostalgicFog />;
    return <DefaultGradient />;
  }, [theme]);
  
  return (
    <motion.div
      className="fixed inset-0 -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {particles}
    </motion.div>
  );
}
```

#### Parallax Scrolling

```tsx
export function ParallaxSection({ image, children }: Props) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -200]);
  
  return (
    <div className="relative h-screen overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image src={image} fill className="object-cover" />
      </motion.div>
      <div className="relative z-10">{children}</div>
    </div>
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

## Animation Performance

### GPU Acceleration

```tsx
// Use transform and opacity for better performance
<motion.div
  style={{
    transform: 'translateZ(0)', // Force GPU acceleration
  }}
  animate={{
    x: 100,
    opacity: 0.5,
  }}
/>
```

### Reduce Motion Support

```tsx
import { useReducedMotion } from 'framer-motion';

export function AnimatedCard() {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      animate={shouldReduceMotion ? {} : { scale: 1.05 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}
    />
  );
}
```

### Layout Shift Prevention

```tsx
// Use layoutId to prevent layout shifts
<motion.div
  layout
  layoutId="unique-id"
  transition={{ layout: { duration: 0.3 } }}
/>
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
