import React, { useState } from 'react';
import { LayoutDashboard, Lock, Star, ChevronRight, Globe, Shield, Zap, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden transition-colors duration-500">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
         <div className="absolute top-[10%] left-[10%] w-[30vw] h-[30vw] bg-indigo-500/10 blur-[120px] rounded-full" />
         <div className="absolute bottom-[10%] right-[10%] w-[30vw] h-[30vw] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="flex flex-col items-center mb-10">
           <motion.div 
             whileHover={{ rotate: 180 }}
             transition={{ duration: 0.5 }}
             className="w-16 h-16 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-2xl shadow-indigo-500/40 mb-6"
           >
              <LayoutDashboard className="w-8 h-8 text-white" />
           </motion.div>
           <h1 className="text-4xl font-display font-black text-slate-900 dark:text-white tracking-tighter mb-2">NEXUS<span className="text-indigo-500 text-lg ml-1">OS</span></h1>
           <p className="text-slate-500 font-medium tracking-wide flex items-center gap-2">
             <Shield className="w-3 h-3" /> SECURE ENTERPRISE GATEWAY
           </p>
        </div>

        <div className="glass p-8 rounded-[2rem] border-slate-200 dark:border-white/5 space-y-8 relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10">
              <Sparkles className="w-12 h-12 text-slate-900 dark:text-white" />
           </div>

           <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Universal ID</label>
                 <div className="relative">
                    <input 
                      type="email" 
                      placeholder="admin@nexus.ai" 
                      className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 p-4 rounded-2xl outline-none focus:border-indigo-500/50 transition-all text-slate-900 dark:text-white font-medium placeholder:text-slate-400"
                      required
                    />
                 </div>
              </div>

              <div className="space-y-2">
                 <div className="flex justify-between items-center ml-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Access Key</label>
                    <button type="button" className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest hover:underline">Lost Key?</button>
                 </div>
                 <div className="relative">
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 p-4 rounded-2xl outline-none focus:border-indigo-500/50 transition-all text-slate-900 dark:text-white font-medium placeholder:text-slate-400"
                      required
                    />
                    <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-600" />
                 </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 rounded-2xl font-black text-white shadow-xl shadow-indigo-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>INITIALIZE SESSION <ChevronRight className="w-5 h-5" /></>
                )}
              </button>
           </form>

           <div className="relative">
              <div className="absolute inset-0 flex items-center">
                 <div className="w-full border-t border-slate-200 dark:border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-black text-slate-500 tracking-widest bg-transparent px-2">
                 Alternative Auth
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 py-4 rounded-2xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all">
                 <Globe className="w-4 h-4" /> WORLD ID
              </button>
              <button className="flex items-center justify-center gap-2 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 py-4 rounded-2xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all">
                 <Zap className="w-4 h-4" /> SSO FAST
              </button>
           </div>
        </div>

        <div className="mt-10 text-center space-y-4">
           <div className="flex items-center justify-center gap-4 text-slate-400 dark:text-slate-500">
              <div className="flex items-center gap-1.5 grayscale opacity-50">
                 <Star className="w-3 h-3 fill-current" />
                 <span className="text-[10px] font-black tracking-widest">ENTERPRISE GRADE</span>
              </div>
           </div>
           <p className="text-slate-500 dark:text-slate-600 text-xs font-medium">© 2026 NEXUS SYSTEMS CORP. ALL RIGHTS RESERVED.</p>
        </div>
      </motion.div>
    </div>
  );
}
