import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as jobService from '../services/jobService.js';
import { useAuth } from '../hooks/useAuth.js';
import { FiArrowLeft, FiBriefcase, FiMapPin, FiDollarSign, FiClock, FiFileText, FiCheckCircle } from 'react-icons/fi';

function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobData = await jobService.getJobById(id);
        setJob(jobData);
      } catch (err) {
        console.error('Error fetching job:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (!job) return <p className="text-center text-gray-600">Job not found</p>;

  // Default values if fields are missing
  const jobDetails = {
    title: job.title || 'Untitled Job',
    company: job.company || 'Unknown Company',
    location: job.location || 'Remote',
    type: job.type || 'Full-time',
    salary: job.salary || 'Not specified',
    description: job.description || 'No description available',
    requirements: job.requirements || ['No requirements listed'],
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/jobs"
          className="flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <FiArrowLeft className="mr-2" />
          Back to Jobs
        </Link>

        {/* Job Details Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Job Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <motion.h1
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="text-3xl font-bold mb-4"
            >
              {jobDetails.title}
            </motion.h1>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <FiBriefcase className="text-white" />
                <span>{jobDetails.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiMapPin className="text-white" />
                <span>{jobDetails.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="text-white" />
                <span>{jobDetails.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiDollarSign className="text-white" />
                <span>{jobDetails.salary}</span>
              </div>
            </div>
          </div>

          {/* Job Body */}
          <div className="p-6">
            {/* Job Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FiFileText className="text-blue-600" />
                Job Description
              </h2>
              <p className="text-gray-600 leading-relaxed">{jobDetails.description}</p>
            </div>

            {/* Requirements */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FiCheckCircle className="text-blue-600" />
                Requirements
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {jobDetails.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Apply Button */}
            {user?.role === 'candidate' && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="mt-8"
              >
                <Link
                  to={`/apply/${job._id}`} // Use _id from MongoDB
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  Apply Now
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default JobDetail;