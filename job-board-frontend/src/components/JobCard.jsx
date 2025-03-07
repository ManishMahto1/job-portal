
import { Link } from 'react-router-dom';
import React from 'react';
import { motion } from 'framer-motion';
import { FaBuilding, FaMapMarkerAlt, FaMoneyBillWave } from 'react-icons/fa';

function JobCard({ job }) {
  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
        <div className="flex items-center text-gray-600 mb-3">
          <FaBuilding className="mr-2" />
          <span className="text-sm">{job.company}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-4">
          <FaMapMarkerAlt className="mr-2" />
          <span className="text-sm">{job.location}</span>
        </div>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{job.description}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs flex items-center">
          <FaMoneyBillWave className="mr-1" /> ${job.salary}
        </span>
        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
          {job.status}
        </span>
        <Link to={`/jobs/${job._id}`} className="text-blue-500">View Details</Link>
      </div>
    </div>
  );
}

export default JobCard;