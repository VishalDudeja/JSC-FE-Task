'use client';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import '../styles/CardList.css';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderOpen,
  Info,
} from "lucide-react";
import SortDropdown from './sortdropdown';
import { Item } from '../utils/types'
import NoResultsPage from './NoResultPage';

type Props = {
  items: Item[];
};

export default function CardList({ items }: Props) {
  const [searchText, setSearchText] = useState('');
  const [sortOrder, setSortOrder] = useState('newest'); // default sort order

  const handleCleaerSearch = () =>{
    setSearchText('')
  }
   
  //const lowerSearch = searchText.trim().toLowerCase();
  /* const filtered = items.filter(it => {
    if (!lowerSearch) return true;
    return it.title.toLowerCase().includes(lowerSearch) || it.snippet.toLowerCase().includes(lowerSearch);
  }); */

  //filtered is recalculated only when items or searchText changes
  const filtered = React.useMemo(() => {
    const lower = searchText.trim().toLowerCase();
    if (!lower) return items;
    return items.filter(it =>
      it.title.toLowerCase().includes(lower) ||
      it.snippet.toLowerCase().includes(lower)
    );
  }, [items, searchText]);

  const handleSortOrder = (sortType: string) =>{
    setSortOrder(sortType);
  }

  function sortByDate(data : Item[], order : string) {
    //Right now, .sort() mutates the array in-place. This can cause subtle bugs if the same array is reused. Instead, make a copy first:
    return [...data].sort((a, b) => {
      const toDateOnly = (str : string) => {
        const [datePart] = str.split(' ');
        const [day, month, year] = datePart.split('/').map(Number);
        return new Date(year, month - 1, day);
      };

      const dateA = toDateOnly(a.ts);
      const dateB = toDateOnly(b.ts);

      return order === 'oldest' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
  }

  //This is triggering an extra render because setDataToRender updates state after the render.
  /* useEffect(()=>{
    const sorted = sortByDate(filtered, sortOrder)
    setDataToRender(sorted)
  }, [sortOrder, searchText]) */

  //Instead, compute sorted data directly using useMemo:
  //Memoize sorted data instead of using useEffect + setState
  //No extra useEffect and no unnecessary state update → reduces re-renders.

  const dataToRender = React.useMemo(() => {
   return sortByDate(filtered, sortOrder);
  }, [filtered, sortOrder]);

  return (
    <>
      <motion.header
        className="header"
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-title">
          <div className="header-icon">
            <FolderOpen size={22} />
          </div>
          <div>
            <h1>Patient Records Dashboard</h1>
            <p>Complete patient records with AES-256-GCM encryption.</p>
          </div>
        </div>
      </motion.header>


      <div className="records-section">
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
          <SortDropdown
            currentSort={sortOrder}
            onSortChange={handleSortOrder}
          />
        </motion.div>

        {
          dataToRender.length > 0 ?
            <>
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}>
                <Info size={16} /> 
                  {dataToRender.length > 1 ?  `Showing data for ${dataToRender.length} Patients` :  `Showing data for ${dataToRender.length} Patient`}
              </motion.h2>

              <div className="card-grid">
                <AnimatePresence>
                  {
                    dataToRender.map(item => (
                      <Card key={item.id} item={item} />
                    ))
                  }
                </AnimatePresence>
              </div>
            </>
            :
            <NoResultsPage clearSearch = {handleCleaerSearch}/>
        }
      </div>


    </>

  );
}
