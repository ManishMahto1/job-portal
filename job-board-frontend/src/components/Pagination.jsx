import React from 'react';
import { motion } from 'framer-motion';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center gap-2">
      {[...Array(totalPages)].map((_, index) => (
        <motion.button
          key={index + 1}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-lg ${
            currentPage === index + 1
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </motion.button>
      ))}
    </div>
  );
};

export default Pagination;