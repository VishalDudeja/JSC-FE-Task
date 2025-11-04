'use client';
import { motion } from 'framer-motion';
import { Stethoscope, Plus, FileText, Users } from 'lucide-react';
import gif from '../../public/No Data Animation.gif';
import Image from 'next/image';
import '../styles/noresultpage.css'

export const NoResultPage = ({clearSearch} : {clearSearch :  () => void}) => {
    
    function handleClearSearch(){
        clearSearch();
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="no-result-wrapper"
        >
            <Image alt="No Data Found" src={gif} />
            {/* Animated Icon */}
            <motion.div
                animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.05, 1]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="mb-6"
            >
                <div >
                    <Stethoscope />
                </div>
            </motion.div>

            {/* Content */}
            <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                No Records Found
            </motion.h3>

            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                Try refining your search by entering the record title or description...
            </motion.p>

            {/* Action Button */}
            <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={ handleClearSearch}
            >
                Clear Search
            </motion.button>

            {/* Quick Tips */}
        </motion.div>
    );
};

export default NoResultPage;