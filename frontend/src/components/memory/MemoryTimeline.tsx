import { Memory } from '@/lib/types/memory';
import { MemoryCard } from './MemoryCard';

interface MemoryTimelineProps {
  memories: Memory[];
}

interface GroupedMemories {
  [key: string]: Memory[];
}

function groupMemoriesByMonth(memories: Memory[]): GroupedMemories {
  return memories.reduce((groups, memory) => {
    const date = new Date(memory.memoryDate);
    const key = `${date.getFullYear()}년 ${date.getMonth() + 1}월`;

    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(memory);

    return groups;
  }, {} as GroupedMemories);
}

export function MemoryTimeline({ memories }: MemoryTimelineProps) {
  const groupedMemories = groupMemoriesByMonth(memories);
  const groups = Object.entries(groupedMemories);

  return (
    <div className="relative space-y-8">
      {/* TODO YD-40: Add scroll-triggered reveal animation */}
      {/* TODO YD-40: Add timeline dot pulse animation */}

      {/* Timeline Line */}
      <div className="absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-primary-400 to-primary-200" />

      {groups.map(([monthYear, monthMemories]) => (
        <div key={monthYear} className="relative">
          {/* Month Header */}
          <div className="mb-4 flex items-center gap-4">
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg">
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{monthYear}</h2>
          </div>

          {/* Month Memories */}
          <div className="ml-20 space-y-4">
            {monthMemories.map((memory) => (
              <div key={memory.id} className="relative">
                {/* Connection Line */}
                <div className="absolute -left-14 top-8 h-0.5 w-8 bg-primary-300" />

                <MemoryCard memory={memory} variant="timeline" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
