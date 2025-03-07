export const log = (message) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${new Date().toISOString()}] ${message}`);
    }
  };