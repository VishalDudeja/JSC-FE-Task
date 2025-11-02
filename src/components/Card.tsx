'use client';
import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Card.css';

type Item = {
  id: string;
  title: string;
  snippet: string;
  ts: string;
};

export default function Card({ item }: { item: Item }) {
  return (
    <motion.div
      layout
      className="card"
      whileHover={{
        scale: 1.05,
        boxShadow: '0 6px 15px rgba(0,0,0,0.2)',
        transition: { duration: 0.25 },
        backgroundColor : "#eaf2ff",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h3>{item.title}</h3>
      <small>{item.ts}</small>
      <p>{item.snippet}</p>
      <button>Details</button>
    </motion.div>
  );
}
