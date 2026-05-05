import React from 'react';
import { User, Shield, Bell, Moon } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';

export default function GeneralSettings() {
  const { theme, toggleTheme } = useTheme();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <GlassCard className="border-slate-200 dark:border-white/5">
          <div className="flex items-center justify-between mb-8">
             <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Profile Details</h3>
             <button className="text-xs font-bold text-brand-primary hover:underline">Edit Info</button>
          </div>
          
          <div className="space-y-6 text-sm">
             <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-slate-100 dark:ring-white/5">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Avatar" />
                </div>
                <button className="glass border-slate-200 dark:border-white/10 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition-all">Change Photo</button>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                   <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Display Name</label>
                   <input type="text" readOnly value="Alex StoreOwner" className="w-full bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-xl p-3 text-slate-900 dark:text-white outline-none focus:border-brand-primary/50" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Email Address</label>
                   <input type="text" readOnly value="alex@nexus-erp.io" className="w-full bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-xl p-3 text-slate-900 dark:text-white outline-none focus:border-brand-primary/50" />
                </div>
             </div>
             
             <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Bio / Role Description</label>
                <textarea readOnly className="w-full bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-xl p-3 text-slate-900 dark:text-white outline-none h-24 resize-none leading-relaxed">Primary administrator and legal store owner. Responsible for logistics and high-level inventory planning.</textarea>
             </div>
          </div>
      </GlassCard>

      <GlassCard className="border-slate-200 dark:border-white/5">
         <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-6">Security Preferences</h3>
         <div className="space-y-4">
            {[
  { icon: Moon, label: 'Dark Mode Experience', active: true, onClick: toggleTheme, isDark: theme === 'dark' },
  { icon: Shield, label: 'Two-Factor Authentication', active: true },
  { icon: Bell, label: 'Real-time Security Alerts', active: false },
].map((item) => (
  <div key={item.label} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/[0.01] rounded-2xl border border-slate-200 dark:border-white/5 group hover:border-slate-300 dark:hover:border-white/10 transition-all">
     <div className="flex items-center gap-3">
        <item.icon className={cn("w-5 h-5 text-slate-400 group-hover:text-brand-primary transition-colors", item.isDark && "text-brand-primary")} />
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
     </div>
     <button 
       onClick={item.onClick}
       className={cn(
         "w-10 h-5 rounded-full relative p-1 transition-colors outline-none",
         (item.label === 'Dark Mode Experience' ? item.isDark : item.active) ? "bg-brand-primary" : "bg-slate-200 dark:bg-slate-800"
       )}
     >
        <div className={cn(
          "w-3 h-3 rounded-full bg-white transition-all shadow-sm",
          (item.label === 'Dark Mode Experience' ? item.isDark : item.active) && "translate-x-5"
        )} />
     </button>
  </div>
))}
         </div>
      </GlassCard>
    </motion.div>
  );
}
