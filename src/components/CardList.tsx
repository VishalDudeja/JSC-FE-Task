'use client';
import React, { useState } from 'react';
import Card from './Card';
import '../styles/CardList.css';
import { motion, AnimatePresence } from 'framer-motion';

type Item = {
  id: string;
  title: string;
  snippet: string;
  ts: string;
};

type Props = {
  items: Item[];
};

export default function CardList({ items }: Props) {
  const [searchText, setSearchText] = useState('');
  const [sortAsc, setSortAsc] = useState(false);

  const lowerSearch = searchText.trim().toLowerCase();
  const filtered = items.filter(it => {
    if (!lowerSearch) return true;
    return it.title.toLowerCase().includes(lowerSearch) || it.snippet.toLowerCase().includes(lowerSearch);
  });

  //copy the filtered array and sort the new aaray based on the date/timestamp
  const sorted = filtered.slice().sort((a, b) => (sortAsc ? a.ts.localeCompare(b.ts) : b.ts.localeCompare(a.ts)));

  return (
    <div style={{ padding: 20 }}>
      <motion.div
        className="controls"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <motion.input
          type="text"
          placeholder="Search by title or description..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          whileFocus={{ scale: 1.02, boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.2)' }}
        />

        <motion.button
          className="sort-btn"
          onClick={() => setSortAsc(prev => !prev)}
          whileHover={{ scale: 1.05, backgroundColor: '#2563eb' }}
          whileTap={{ scale: 0.95 }}
        >
          {sortAsc ? 'Sort by date : Old first' : 'Sort by date : Latest First'}
        </motion.button>
      </motion.div>

      {
        sorted.length > 0 ?
          <div className="card-grid">
            <AnimatePresence>
              {
                sorted.map(item => (
                  <Card key={item.id} item={item} />
                ))
              }
            </AnimatePresence>
          </div>
          :
          <h1 className='no-data'>No Patient Found</h1>
      }

    </div>
  );
}
