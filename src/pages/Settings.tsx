import React from 'react';
import { 
  User, 
  Store, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  CreditCard,
  ChevronRight,
  LogOut,
  Moon,
  Sun,
  Layout
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import { cn } from '../lib/utils';

const sections = [
  { id: 'profile', icon: User, label: 'Profile Settings', desc: 'Manage your personal identity.' },
  { id: 'store', icon: Store, label: 'Store Configuration', desc: 'Edit shop name, logo and domain.' },
  { id: 'notifications', icon: Bell, label: 'Notifications', desc: 'Choose what alerts you receive.' },
  { id: 'security', icon: Shield, label: 'Security & Access', desc: 'Passwords and authentication.' },
  { id: 'appearance', icon: Palette, label: 'Theme & UX', desc: 'Customize colors and layouts.' },
];

export default function Settings() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto pb-10">
      <div>
        <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Application Settings</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Control how your workspace feels and functions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="space-y-2">
            {sections.map((section) => (
              <button 
                key={section.id}
                className={cn(
                  "w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all border border-transparent hover:bg-slate-100 dark:hover:bg-white/5",
                  section.id === 'profile' 
                  ? "bg-brand-primary/10 dark:bg-brand-primary/20 border-brand-primary/20 text-brand-primary dark:text-white" 
                  : "text-slate-600 dark:text-slate-400"
                )}
              >
                <section.icon className={cn("w-5 h-5", section.id === 'profile' ? "text-brand-primary" : "text-slate-400 dark:text-slate-500")} />
                <div>
                  <p className="text-sm font-bold">{section.label}</p>
                  <p className="text-[10px] opacity-60 tracking-tight">{section.desc}</p>
                </div>
              </button>
            ))}
            
            <button className="w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all text-rose-600 dark:text-rose-400 mt-8 border border-transparent hover:bg-rose-500/10">
               <LogOut className="w-5 h-5" />
               <span className="text-sm font-bold">Sign Out</span>
            </button>
         </div>

         <div className="md:col-span-2 space-y-6">
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
               <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-6">Preferences</h3>
               <div className="space-y-4">
                  {[
                    { icon: Moon, label: 'Dark Mode Experience', default: true },
                    { icon: Globe, label: 'Public Store Domain', default: true },
                    { icon: Bell, label: 'Real-time SMS Alerts', default: false },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/[0.01] rounded-2xl border border-slate-200 dark:border-white/5 group hover:border-slate-300 dark:hover:border-white/10 transition-all">
                       <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5 text-slate-400 group-hover:text-brand-primary transition-colors" />
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
                       </div>
                       <div className="w-10 h-5 bg-slate-200 dark:bg-slate-800 rounded-full relative p-1 transition-colors">
                          <div className={cn("w-3 h-3 rounded-full bg-slate-400 transition-all shadow-sm", item.default && "translate-x-5 bg-brand-primary")} />
                       </div>
                    </div>
                  ))}
               </div>
            </GlassCard>
         </div>
      </div>
    </div>
  );
}
