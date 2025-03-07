import { useState, useEffect } from 'react';
import * as jobService from '../services/jobService.js';

export function useJobs(page = 1, limit = 10, search = '') {
  const [jobs, setJobs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    jobService.getJobs({ page, limit, search })
      .then(data => {
        setJobs(data);
        setTotalPages(Math.ceil(data.length / limit)); // Adjust based on actual API pagination
      })
      .finally(() => setLoading(false));
  }, [page, limit, search]);

  return { jobs, totalPages, loading };
}