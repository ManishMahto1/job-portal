// StatusBadge.jsx
const StatusBadge = ({ status }) => {
  const statusStyles = {
    pending: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    reviewed: 'bg-blue-100 text-blue-800'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;