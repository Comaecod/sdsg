import { useState, useEffect } from 'react';
import { auditService } from '../../services/auditService';

const AuditLogViewer = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auditService.getLogs({ limit: 50 }).then(setLogs).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center py-8"><div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Audit Logs</h2>
      <div className="space-y-2">
        {logs.map(log => (
          <div key={log.id} className="glass-card p-3 flex items-center justify-between">
            <div><p className="text-sm text-gray-900 dark:text-white font-medium">{log.action}</p><p className="text-xs text-gray-500 dark:text-gray-400">{log.userEmail}</p></div>
            <span className="text-xs text-gray-400">{log.timestamp?.toDate?.()?.toLocaleString() || ''}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuditLogViewer;
