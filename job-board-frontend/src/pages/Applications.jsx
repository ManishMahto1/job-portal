import React,{useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApplications } from '../hooks/useApplications.js';
import ApplicationCard from '../components/ApplicationCard.jsx';
import { FiBriefcase, FiFilter, FiAlertCircle } from 'react-icons/fi';

const Applications = () => {
  const { applications, loading } = useApplications();
  const [selectedStatus, setSelectedStatus] = useState('all');

  const statusFilters = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'rejected', label: 'Rejected' },
  ];

  const filteredApplications = applications.filter(app => 
    selectedStatus === 'all' ? true : app.status === selectedStatus
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0 flex items-center gap-3"
          >
            <FiBriefcase className="text-blue-600" />
            My Applications
          </motion.h1>
          
          <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
            <FiFilter className="text-gray-500" />
            <div className="flex flex-wrap gap-2">
              {statusFilters.map(filter => (
                <button
                  key={filter.value}
                  onClick={() => setSelectedStatus(filter.value)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    selectedStatus === filter.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <div className="animate-pulse space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-10 bg-gray-200 rounded-lg"></div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <AnimatePresence>
            {filteredApplications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl p-8 text-center"
              >
                <FiAlertCircle className="text-gray-400 text-6xl mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  No {selectedStatus !== 'all' ? selectedStatus : ''} applications found
                </h3>
                <p className="text-gray-600">
                  {selectedStatus === 'all' 
                    ? "You haven't applied to any jobs yet."
                    : `You don't have any ${selectedStatus} applications.`}
                </p>
              </motion.div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence>
                  {filteredApplications.map(app => (
                    <motion.div
                      key={app._id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow"
                    >
                      <ApplicationCard application={app} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Applications;