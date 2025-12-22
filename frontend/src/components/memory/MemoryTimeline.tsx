'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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
    if (!groups[key]) groups[key] = [];
    groups[key].push(memory);
    return groups;
  }, {} as GroupedMemories);
}

function TimelineItem({ memory, index }: { memory: Memory; index: number }) {
  const memoryRef = useRef(null);
  const isMemoryInView = useInView(memoryRef, {
    once: true,
    margin: '-50px',
  });

  return (
    <motion.div
      ref={memoryRef}
      className="relative"
      initial={{ opacity: 0, x: -30 }}
      animate={isMemoryInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ delay: index * 0.1 + 0.3 }}
    >
      <motion.div
        className="absolute -left-14 top-8 h-0.5 w-8 bg-primary-300"
        initial={{ scaleX: 0 }}
        animate={isMemoryInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ delay: index * 0.1 + 0.2 }}
        style={{ transformOrigin: 'left' }}
      />
      <MemoryCard memory={memory} variant="timeline" />
    </motion.div>
  );
}

function TimelineGroup({ 
  monthYear, 
  monthMemories, 
  groupIndex 
}: { 
  monthYear: string; 
  monthMemories: Memory[]; 
  groupIndex: number 
}) {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={headerRef}
      className="relative"
      initial={{ opacity: 0, x: -30 }}
      animate={isHeaderInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ delay: groupIndex * 0.1 }}
    >
      <div className="mb-4 flex items-center gap-4">
        <motion.div
          className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-3d-md"
          animate={{
            boxShadow: [
              '0 0 20px rgba(14, 165, 233, 0.4)',
              '0 0 40px rgba(14, 165, 233, 0.6)',
              '0 0 20px rgba(14, 165, 233, 0.4)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary-300"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </motion.div>

        <motion.h2
          className="text-2xl font-bold text-gray-900"
          initial={{ opacity: 0, x: -10 }}
          animate={isHeaderInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ delay: groupIndex * 0.1 + 0.2 }}
        >
          {monthYear}
        </motion.h2>
      </div>

      <div className="ml-20 space-y-4">
        {monthMemories.map((memory, index) => (
          <TimelineItem key={memory.id} memory={memory} index={index} />
        ))}
      </div>
    </motion.div>
  );
}

export function MemoryTimeline({ memories }: MemoryTimelineProps) {
  const groupedMemories = groupMemoriesByMonth(memories);
  const groups = Object.entries(groupedMemories);

  return (
    <div className="relative space-y-8">
      <div className="absolute left-6 top-0 h-full w-1 overflow-hidden rounded-full bg-gray-200">
        <motion.div
          className="h-full w-full bg-gradient-to-b from-primary-400 via-primary-600 to-primary-400"
          animate={{ backgroundPosition: ['0% 0%', '0% 100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          style={{ backgroundSize: '100% 200%' }}
        />
      </div>

      {groups.map(([monthYear, monthMemories], groupIndex) => (
        <TimelineGroup
          key={monthYear}
          monthYear={monthYear}
          monthMemories={monthMemories}
          groupIndex={groupIndex}
        />
      ))}
    </div>
  );
}