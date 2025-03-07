// Apply.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as applicationService from '../services/applicationService.js';
import { toast } from '../utils/toast.js';
import { FiUploadCloud, FiLink, FiCheckCircle } from 'react-icons/fi';

const Apply = () => {
  const { jobId } = useParams();
  const [resume, setResume] = useState(null);
  const [resumeLink, setResumeLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('jobId', jobId);
      if (resume) formData.append('resume', resume);
      else formData.append('resumeLink', resumeLink);

      await applicationService.createApplication(formData);
      toast.success('Application submitted successfully!');
      setTimeout(() => navigate('/applications'), 1500);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Application failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Apply for Position</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* File Upload Section */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
              <label className="cursor-pointer">
                <FiUploadCloud className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Upload your resume (PDF/DOCX)</p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResume(e.target.files[0])}
                  className="hidden"
                />
                {resume && (
                  <p className="text-sm text-gray-600 mt-2">
                    <FiCheckCircle className="inline mr-2 text-green-500" />
                    {resume.name}
                  </p>
                )}
              </label>
            </div>

            {/* OR Separator */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>

            {/* Resume Link Input */}
            <div className="relative">
              <FiLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="url"
                value={resumeLink}
                onChange={(e) => setResumeLink(e.target.value)}
                placeholder="Paste resume URL"
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={(!resume && !resumeLink) || isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                Submit Application
                <FiCheckCircle className="text-lg" />
              </>
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Apply;