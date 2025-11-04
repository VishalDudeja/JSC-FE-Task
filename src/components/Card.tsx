'use client';
import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Card.css';
import { Item } from '@/utils/types';
import {
  UserCircle2,
  FileText,
  Eye,
  Clock,
  Pencil,
  Trash2,
} from "lucide-react";

export default function Card({ item }: { item: Item }) {
  return (
    <motion.div
      layout
      className="card record-card"
      whileHover={{
        scale: 1.05,
        boxShadow: '0 6px 15px rgba(0,0,0,0.2)',
        transition: { duration: 0.25 },
        backgroundColor: "#eaf2ff",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="record-header">
        <div className="record-header-left">
          <UserCircle2 className="avatar" size={24} />
          <div>
            <h3>{item.title}</h3>
            <span className="record-type">{item.type}</span>
          </div>
        </div>
        <div className="record-icons">
          <Pencil className="icon edit" size={16} />
          <Trash2 className="icon delete" size={16} />
        </div>
      </div>

      <div className="record-date">
        <Clock size={14} /> {item.ts}
      </div>

      <div className="record-note">
        <FileText className="note-icon" size={16} />
        <p>{item.snippet}</p>
      </div>

      <button className="details-btn">
        <Eye size={16} /> View Details
      </button>
    </motion.div>
  );
}
