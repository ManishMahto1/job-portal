import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as jobService from '../services/jobService.js';
import { useAuth } from '../hooks/useAuth.js';

function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    jobService.getJobs({ page: 1, limit: 100 }) // Provide default parameters
      .then(jobs => setJob(jobs.find(j => j._id === id)))
      .catch(err => console.error(err));
  }, [id]);

  if (!job) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{job.title}</h2>
      <p className="mb-4">{job.description}</p>
      {user?.role === 'candidate' && (
        <Link to={`/apply/${job._id}`} className="bg-blue-500 text-white px-4 py-2 rounded">Apply Now</Link>
      )}
    </div>
  );
}

export default JobDetail;