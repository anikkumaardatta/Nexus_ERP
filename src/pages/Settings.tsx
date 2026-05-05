import React from 'react';
import { 
  User, 
  Store, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  LogOut, 
  Moon, 
  Sun, 
  Layout, 
  ChevronRight,
  Database,
  Mail,
  Tag,
  Layers,
  MessageSquare,
  Home
} from 'lucide-react';
import { NavLink, useLocation, Navigate, Outlet } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const sections = [
  { id: 'general', icon: User, label: 'General', path: '/settings/general', desc: 'Basic account and profile info' },
  { id: 'website', icon: Globe, label: 'Website', path: '/settings/website', desc: 'Store domain and appearance' },
  { id: 'courier', icon: Store, label: 'Courier', path: '/settings/courier', desc: 'Logistics and API keys' },
  { id: 'sms', icon: MessageSquare, label: 'SMS Gateway', path: '/settings/sms', desc: 'Bulk SMS configurations' },
  { id: 'email', icon: Mail, label: 'Email Config', path: '/settings/email', desc: 'SMTP and mailing lists' },
  { id: 'import', icon: Database, label: 'Import Data', path: '/settings/import', desc: 'Migrations and uploads' },
  { id: 'categories', icon: Tag, label: 'Categories', path: '/settings/categories', desc: 'Manage product labels' },
  { id: 'attributes', icon: Layers, label: 'Attributes', path: '/settings/attributes', desc: 'Custom product fields' },
];

export default function Settings() {
  const location = useLocation();
  const currentSection = sections.find(s => location.pathname.startsWith(s.path)) || sections[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10 max-w-6xl mx-auto">
      {/* Breadcrumb & Title */}
      <div className="flex flex-col gap-4">
         <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <NavLink to="/" className="hover:text-indigo-500 transition-colors flex items-center gap-1">
               <Home className="w-3 h-3" /> HOME
            </NavLink>
            <ChevronRight className="w-3 h-3" />
            <NavLink to="/settings/general" className="hover:text-indigo-500 transition-colors">SETTINGS</NavLink>
            <ChevronRight className="w-3 h-3" />
            <span className="text-indigo-500 font-bold tracking-[0.2em]">{currentSection.label}</span>
         </nav>
         
         <div>
            <h2 className="text-3xl font-display font-black text-slate-900 dark:text-white tracking-tight">{currentSection.label} Configuration</h2>
            <p className="text-slate-500 font-medium mt-1">{currentSection.desc}</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Navigation Sidebar */}
         <div className="flex flex-col gap-2">
            {sections.map((section) => {
              const isActive = location.pathname.startsWith(section.path);
              return (
                <NavLink 
                  key={section.id}
                  to={section.path}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-2xl transition-all border group",
                    isActive 
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-xl shadow-indigo-600/20" 
                    : "bg-white dark:bg-white/[0.02] border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/[0.05] hover:border-slate-300 dark:hover:border-white/10"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <section.icon className={cn("w-5 h-5", !isActive && "text-slate-400 group-hover:text-indigo-500 transition-colors")} />
                    <span className="text-sm font-bold tracking-tight">{section.label}</span>
                  </div>
                  <ChevronRight className={cn("w-4 h-4 opacity-50", !isActive && "group-hover:translate-x-1 transition-transform")} />
                </NavLink>
              );
            })}
            
            <button className="flex items-center gap-3 p-4 rounded-2xl text-left transition-all text-rose-600 dark:text-rose-500 mt-10 hover:bg-rose-500/10 border border-transparent">
               <LogOut className="w-5 h-5" />
               <span className="text-sm font-bold">Sign Out Session</span>
            </button>
         </div>

         {/* Content Area */}
         <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
               <motion.div 
                 key={location.pathname}
                 initial={{ opacity: 0, x: 10 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -10 }}
                 transition={{ duration: 0.2 }}
               >
                  <Outlet />
               </motion.div>
            </AnimatePresence>
         </div>
      </div>
    </div>
  );
}
