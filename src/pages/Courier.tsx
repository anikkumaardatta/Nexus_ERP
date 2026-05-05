import React from 'react';
import { Truck, ShieldCheck, Zap, ArrowRight, BarChart3, Globe } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import { cn } from '../lib/utils';

export default function Courier() {
  const couriers = [
    { name: 'Steadfast', logo: '🚀', status: 'Connected', orders: 124, api: 'api.steadfast.dev' },
    { name: 'Pathao', logo: '🛣️', status: 'Connected', orders: 89, api: 'api.pathao.io' },
    { name: 'RedX', logo: '📦', status: 'Disconnected', orders: 0, api: 'redx.logistics' },
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-top-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Courier Partners</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Automate your shipping and parcel tracking.</p>
        </div>
        <button className="bg-brand-primary px-6 py-2.5 rounded-xl text-sm font-bold text-white flex items-center gap-2 hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20">
          Connect New Partner
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {couriers.map((c) => (
          <GlassCard key={c.name} hover className="group border-slate-200 dark:border-white/5">
             <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-3xl group-hover:bg-brand-primary/10 transition-colors">
                  {c.logo}
                </div>
                <div className={cn(
                  "px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest",
                  c.status === 'Connected' ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-50"
                )}>
                  {c.status}
                </div>
             </div>
             
             <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{c.name} Logistics</h3>
             <p className="text-xs text-slate-500 mb-6 font-mono">{c.api}</p>

             <div className="space-y-3 mb-8">
                <div className="flex justify-between text-xs">
                   <span className="text-slate-500 dark:text-slate-400">Total Fulfilled</span>
                   <span className="text-slate-900 dark:text-white font-bold">{c.orders} Orders</span>
                </div>
                <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                   <div className={cn("h-full bg-brand-primary", c.orders === 0 && "w-0")} style={{ width: `${(c.orders/200)*100}%` }} />
                </div>
             </div>

             <button className={cn(
               "w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm",
               c.status === 'Connected' 
                ? "glass border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10" 
                : "bg-slate-900 dark:bg-white text-white dark:text-[#030712] hover:bg-slate-800 dark:hover:bg-slate-200"
             )}>
                {c.status === 'Connected' ? 'Manage Integration' : 'Connect API'} <ArrowRight className="w-4 h-4" />
             </button>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="bg-gradient-to-r from-brand-primary/10 to-transparent border-brand-primary/10">
        <div className="flex flex-col md:flex-row gap-8 items-center p-4">
           <div className="flex gap-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                 <ShieldCheck className="w-8 h-8" />
              </div>
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                 <BarChart3 className="w-8 h-8" />
              </div>
           </div>
           <div className="flex-1 text-center md:text-left">
              <h4 className="font-bold text-slate-900 dark:text-white text-lg">Courier Security & Analytics</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Our platform automatically verifies parcel status every 15 minutes and updates your customer via SMS. No manual tracking required.</p>
           </div>
           <button className="px-8 py-3 bg-brand-primary rounded-xl text-sm font-bold text-white shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90 transition-all">
              View Stats
           </button>
        </div>
      </GlassCard>
    </div>
  );
}
