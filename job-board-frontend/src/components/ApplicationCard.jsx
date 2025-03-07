import React,{useState,useEffect} from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiFileText, FiTool, FiCalendar, FiDownload } from 'react-icons/fi';
import StatusBadge from './StatusBadge.jsx';
import * as jobService from '../services/jobService.js';
const ApplicationCard = ({ application }) => {
  const [jobTitle, setJobTitle] = useState('');
 useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobData = await jobService.getJobById(application.jobId);
        setJobTitle(jobData.title);
      } catch (err) {
        console.error('Error fetching job:', err);
      } 
    };
    fetchJob();
  }, [application.jobId]);
 
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.02 }
  };
  //console.log("application details:", application);
  

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-6 border border-gray-100"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-3 rounded-full">
            <FiUser className="text-blue-600 text-xl" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {application.parsedFields.name}
            </h3>
           {/*  <p className="text-sm text-gray-600">
              Applied for: {application.job.title}
            </p> */}
          </div>
        </div>
        <StatusBadge status={application.status} />
      </div>

      <div className="flex items-center gap-3">
          <FiCalendar className="text-gray-400 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-600">Job : {jobTitle}</p>
            
          </div>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 mt-1">
        <div className="flex items-center gap-3">
          <FiTool className="text-gray-400 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-600">Skills</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {application.parsedFields.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FiCalendar className="text-gray-400 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-600">Applied Date</p>
            <p className="text-gray-800 text-sm mt-1">
              {new Date(application.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FiFileText className="flex-shrink-0" />
            <span>Resume submitted</span>
          </div>
          <a
            href={`../../../job-board-backend/uploads${application.resumeUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <FiDownload className="flex-shrink-0" />
            <span className="text-sm font-medium">Download PDF</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ApplicationCard;