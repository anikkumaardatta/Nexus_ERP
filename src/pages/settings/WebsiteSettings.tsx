import React from 'react';
import { Globe } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import { motion } from 'motion/react';

export default function WebsiteSettings() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <GlassCard className="border-slate-200 dark:border-white/5">
         <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-6">Website Configuration</h3>
         <div className="space-y-6">
            <div className="space-y-2">
               <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Store Name</label>
               <input type="text" placeholder="Nexus Store" className="w-full bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-xl p-3 text-slate-900 dark:text-white outline-none focus:border-brand-primary" />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Primary Domain</label>
               <div className="flex gap-2">
                  <input type="text" value="nexus-store.ai" className="flex-1 bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-xl p-3 text-slate-900 dark:text-white outline-none mr-2" readOnly />
                  <button className="bg-indigo-500 px-4 py-2 rounded-xl text-white text-xs font-bold shadow-lg">Change Domain</button>
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Brand Color</label>
                  <div className="flex items-center gap-3 p-3 bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-xl">
                     <div className="w-6 h-6 rounded-lg bg-indigo-500" />
                     <span className="text-xs font-mono text-slate-500">#6366f1</span>
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Accent UI Color</label>
                  <div className="flex items-center gap-3 p-3 bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-xl">
                     <div className="w-6 h-6 rounded-lg bg-emerald-500" />
                     <span className="text-xs font-mono text-slate-500">#10b981</span>
                  </div>
               </div>
            </div>
         </div>
      </GlassCard>
    </motion.div>
  );
}
