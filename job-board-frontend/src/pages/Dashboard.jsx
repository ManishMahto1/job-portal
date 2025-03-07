import React, { useState } from 'react';
import { useApplications } from '../hooks/useApplications.js';
import ApplicationCard from '../components/ApplicationCard.jsx';
import * as jobService from '../services/jobService.js';
import { toast } from '../utils/toast.js';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiBriefcase, FiUser, FiChevronDown } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800'
};

function Dashboard() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const { applications, loading, setApplications } = useApplications();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    try {
      await jobService.createJob({ title, description });
      toast.success('Job posted successfully!');
      setTitle('');
      setDescription('');
      setIsFormOpen(false);
    } catch (err) {
      toast.error('Failed to post job');
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await jobService.updateApplicationStatus(id, status);
      setApplications(applications.map(app => 
        app._id === id ? { ...app, status } : app
      ));
      toast.success('Status updated successfully!');
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const filteredApplications = applications.filter(app => 
    activeTab === 'all' ? true : app.status === activeTab
  );

  const statusData = [
    { name: 'Pending', value: applications.filter(app => app.status === 'pending').length },
    { name: 'Accepted', value: applications.filter(app => app.status === 'accepted').length },
    { name: 'Rejected', value: applications.filter(app => app.status === 'rejected').length },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="lg:w-1/4 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FiBriefcase className="text-blue-600" />
                Dashboard
              </h2>
              
              <button
                onClick={() => setIsFormOpen(!isFormOpen)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <FiPlus className="text-lg" />
                Post New Job
              </button>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold mb-4">Application Stats</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={statusData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar 
                      dataKey="value" 
                      fill="#4F46E5" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4 space-y-6">
            {/* Job Post Form */}
            <AnimatePresence>
              {isFormOpen && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleJobSubmit}
                  className="bg-white rounded-xl p-6 shadow-sm"
                >
                  <h3 className="text-xl font-semibold mb-4">Post New Job</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Title
                      </label>
                      <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Senior React Developer"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Description
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the job position..."
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Post Job
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Applications Section */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h3 className="text-xl font-semibold">Applications</h3>
                <div className="flex gap-2 mt-4 sm:mt-0">
                  {['all', 'pending', 'accepted', 'rejected'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-full text-sm ${
                        activeTab === tab 
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {loading ? (
                <div className="grid gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse bg-gray-100 h-32 rounded-lg" />
                  ))}
                </div>
              ) : (
                <div className="grid gap-4">
                  <AnimatePresence>
                    {filteredApplications.map((app) => (
                      <motion.div
                        key={app._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <ApplicationCard application={app} />
                        <div className="mt-4 flex items-center gap-4">
                          <div className="flex-1">
                            <div className="relative">
                              <select
                                value={app.status}
                                onChange={(e) => handleStatusUpdate(app._id, e.target.value)}
                                className={`w-full p-2 rounded-lg appearance-none ${statusColors[app.status]} border-none pr-8 font-medium`}
                              >
                                <option value="pending">Pending</option>
                                <option value="accepted">Accepted</option>
                                <option value="rejected">Rejected</option>
                              </select>
                              <FiChevronDown className="absolute right-3 top-3 text-gray-500" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;