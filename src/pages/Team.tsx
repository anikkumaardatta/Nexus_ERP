import React from 'react';
import { Users, UserPlus, Mail, Shield, ShieldAlert, Star } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import { cn } from '../lib/utils';

export default function Team() {
  const members = [
    { name: 'Alex Owner', role: 'Super Admin', email: 'alex@nexus.io', status: 'Online', permissions: 'Full Access' },
    { name: 'Sarah Manager', role: 'Manager', email: 'sarah@nexus.io', status: 'Online', permissions: 'Inventory & Orders' },
    { name: 'Moni Seller', role: 'Seller', email: 'moni@nexus.io', status: 'Away', permissions: 'Order Only' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Staff & Permissions</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Manage who can access your store data.</p>
        </div>
        <button className="bg-brand-primary px-6 py-2.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20">
          <UserPlus className="w-4 h-4" /> Invite Staff
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <GlassCard key={member.email} hover className="relative border-slate-200 dark:border-white/5">
             <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 overflow-hidden">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} alt={member.name} />
                </div>
                <div>
                   <h4 className="font-bold text-slate-900 dark:text-white">{member.name}</h4>
                   <p className="text-xs text-brand-primary font-bold">{member.role}</p>
                </div>
                <div className="ml-auto">
                   <div className={cn(
                     "w-2 h-2 rounded-full",
                     member.status === 'Online' ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-amber-500"
                   )} />
                </div>
             </div>

             <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                   <Mail className="w-4 h-4 text-slate-400 dark:text-slate-600" /> {member.email}
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                   <Shield className="w-4 h-4 text-slate-400 dark:text-slate-600" /> {member.permissions}
                </div>
             </div>

             <div className="flex gap-2">
                <button className="flex-1 py-2 glass border-slate-200 dark:border-white/10 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10 transition-all">Edit Access</button>
                <button className="p-2 glass border-slate-200 dark:border-white/10 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-all focus:ring-0">
                  <ShieldAlert className="w-4 h-4" />
                </button>
             </div>
          </GlassCard>
        ))}
        
        <GlassCard className="border-dashed border-slate-300 dark:border-white/10 flex flex-col items-center justify-center p-8 opacity-60 hover:opacity-100 transition-all cursor-pointer bg-transparent">
           <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-300 dark:border-white/20 flex items-center justify-center mb-4">
              <UserPlus className="w-5 h-5 text-slate-500 dark:text-slate-500" />
           </div>
           <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Add New Member</p>
        </GlassCard>
      </div>

      <GlassCard className="bg-gradient-to-br from-indigo-600/10 to-transparent border-indigo-500/10 dark:border-white/5">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
               <Star className="w-6 h-6" />
            </div>
            <div>
               <h4 className="font-bold text-slate-900 dark:text-white">Advanced Access Logs</h4>
               <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Upgrade to Enterprise to see granular activity logs of every team member.</p>
            </div>
            <button className="ml-auto text-xs font-bold text-brand-primary hover:underline transition-all">Upgrade Now</button>
         </div>
      </GlassCard>
    </div>
  );
}
