'use client';
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ArrowDownWideNarrow, ArrowUpWideNarrow, Calendar, LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/sortdropdown.css';

// --- Types (remain the same) ---
interface SortOption {
  id: 'newest' | 'oldest';
  label: string;
  icon: LucideIcon;
}

interface SortDropdownProps {
  currentSort: string;
  onSortChange: (sortId: SortOption['id']) => void;
}

const sortOptions: SortOption[] = [
  { id: 'newest', label: 'Newest to Oldest', icon: ArrowDownWideNarrow },
  { id: 'oldest', label: 'Oldest to Newest', icon: ArrowUpWideNarrow },
];

// --- Component (using plain CSS classes) ---
const SortDropdown: React.FC<SortDropdownProps> = ({ currentSort, onSortChange } : SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (optionId: SortOption['id']) => {
    onSortChange(optionId);
    setIsOpen(false);
  };

  return (
    <div className='dropdownContainer' ref={dropdownRef}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className='sortButton'
          id="options-menu"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <Calendar className='iconCalendar' />
          Sort by Date
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            style = {{display: 'flex'}}
          >
            <ChevronDown className='iconChevron' />
          </motion.div>
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className='optionsMenu'
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="py-1">
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  // Conditionally apply the active class
                  className={`optionItem ${
                    currentSort === option.id ? 'active' : ''
                  }`}
                  role="menuitem"
                >
                  <option.icon className='optionIcon' />
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SortDropdown;
