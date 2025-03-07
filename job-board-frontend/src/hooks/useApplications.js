import { useState, useEffect } from 'react';
import * as applicationService from '../services/applicationService.js';

export function useApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    applicationService.getApplications()
      .then(setApplications)
      .finally(() => setLoading(false));
  }, []);

  return { applications, loading, setApplications };
}