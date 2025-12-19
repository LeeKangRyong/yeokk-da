'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: '홈' },
    { href: '/memories', label: '추억' },
    { href: '/create', label: '만들기' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl font-bold text-primary-600"
          >
            엮다
          </motion.div>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative"
            >
              <motion.span
                className={`text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                whileHover={{ y: -2 }}
              >
                {item.label}
              </motion.span>
              
              {pathname === item.href && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-[17px] left-0 right-0 h-0.5 bg-primary-600"
                  initial={false}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
          >
            로그인
          </motion.button>
        </div>
      </nav>
    </header>
  );
}
