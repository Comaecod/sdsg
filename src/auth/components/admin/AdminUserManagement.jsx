import { useState, useEffect } from 'react';
import { userService } from '../../services/userService';
import { useAuth } from '../../contexts/AuthContext';
import { ROLES } from '../../types/roles';

const AdminUserManagement = () => {
  const { user: currentUser, createUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', displayName: '', role: ROLES.STUDENT, phone: '' });

  useEffect(() => {
    userService.getAllUsers().then(setUsers).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try { await createUser(form.email, form.password, { displayName: form.displayName, role: form.role, phone: form.phone }); setShowForm(false); setForm({ email: '', password: '', displayName: '', role: ROLES.STUDENT, phone: '' }); const u = await userService.getAllUsers(); setUsers(u); }
    catch (err) { alert(err.message); }
  };

  if (loading) return <div className="flex items-center justify-center py-8"><div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6"><div><h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h2><p className="text-gray-500 dark:text-gray-400 text-sm">{users.length} users</p></div>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-all">{showForm ? 'Cancel' : '+ Add User'}</button>
      </div>
      {showForm && (
        <form onSubmit={handleCreate} className="glass-card p-6 mb-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><input type="text" placeholder="Display name" value={form.displayName} onChange={e => setForm(p => ({ ...p, displayName: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-primary/50 text-sm" required /></div>
            <div><input type="email" placeholder="Email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-primary/50 text-sm" required /></div>
            <div><input type="password" placeholder="Password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-primary/50 text-sm" required /></div>
            <div><input type="tel" placeholder="Phone" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-primary/50 text-sm" /></div>
            <div><select value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:border-primary/50 text-sm">
              {Object.values(ROLES).filter(r => r !== ROLES.GUEST && r !== ROLES.SUPER_ADMIN).map(r => <option key={r} value={r}>{r}</option>)}
            </select></div>
          </div>
          <button type="submit" className="px-6 py-2.5 rounded-xl font-medium bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-all">Create User</button>
        </form>
      )}
      <div className="space-y-3">
        {users.map(u => (
          <div key={u.id} className="glass-card p-4 flex items-center justify-between">
            <div><p className="font-medium text-gray-900 dark:text-white text-sm">{u.displayName || 'No name'}</p><p className="text-xs text-gray-500 dark:text-gray-400">{u.email} • <span className="capitalize">{u.role}</span></p></div>
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${u.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{u.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUserManagement;
