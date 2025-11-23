'use client';

import { useState, useRef, useEffect, FC } from 'react';
import Link from 'next/link';

interface DropdownItem {
  label: string;
  href?: string;
  onClick?: () => void;
  isDanger?: boolean;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
}

export const Dropdown: FC<DropdownProps> = ({ trigger, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // إغلاق القائمة عند الضغط خارجها
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-xl ring-1 ring-gray-200 z-20 animate-fade-in"
        >
          <div className="py-1">
            {items.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  if (item.onClick) item.onClick();
                  setIsOpen(false);
                }}
                className={`px-4 py-2 text-sm transition rounded-lg ${
                  item.isDanger
                    ? 'text-red-600 hover:bg-red-50'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.href ? (
                  <Link href={item.href} className="block w-full">
                    {item.label}
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
