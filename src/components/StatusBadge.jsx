import React from 'react';

const StatusBadge = ({ status }) => {
  const getStatusStyles = (status) => {
    switch (status?.toUpperCase()) {
      case 'EXPERIMENTAL':
        return 'bg-amber-50 text-amber-900 border-amber-200/50';
      case 'SIMULATED':
        return 'bg-blue-50 text-blue-900 border-blue-200/50';
      case 'THEORETICAL':
        return 'bg-slate-50 text-slate-900 border-slate-200/50';
      case 'PILOT':
        return 'bg-emerald-50 text-emerald-900 border-emerald-200/50';
      default:
        return 'bg-paper text-ink/60 border-ink/10';
    }
  };

  return (
    <div className={`inline-flex items-center px-3 py-0.5 border text-[10px] font-mono font-bold tracking-tighter uppercase rounded-full ${getStatusStyles(status)}`}>
      <span className="mr-1.5 w-1.5 h-1.5 rounded-full bg-current opacity-50" />
      [{status?.toUpperCase() || 'UNKNOWN'}]
    </div>
  );
};

export default StatusBadge;
