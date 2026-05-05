import React from 'react';
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight, 
  Zap, 
  Rocket, 
  Crown,
  History,
  TrendingUp,
  ShieldCheck,
  Check
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import { formatCurrency, cn } from '../lib/utils';
import { motion } from 'motion/react';
import { BalanceInfo } from '../types';

const mockBalance: BalanceInfo = {
  current: 450,
  lowThreshold: 500,
  history: [
    { id: 'TXN-001', amount: 1000, type: 'recharge', date: '2026-05-01', description: 'Account Recharge via bKash' },
    { id: 'TXN-002', amount: 60, type: 'usage', date: '2026-05-02', description: 'Courier Submission - ORD-7718' },
    { id: 'TXN-003', amount: 60, type: 'usage', date: '2026-05-03', description: 'Courier Submission - ORD-7712' },
    { id: 'TXN-004', amount: 500, type: 'recharge', date: '2026-05-03', description: 'Promo Credit Applied' },
  ]
};

const plans = [
  { name: 'Starter', price: 1000, orders: 300, icon: Zap, color: 'from-blue-600/20 to-cyan-600/20', border: 'border-blue-500/20' },
  { name: 'Growth', price: 2500, orders: 1000, icon: Rocket, color: 'from-brand-primary/20 to-brand-secondary/20', border: 'border-brand-primary/50', current: true },
  { name: 'Business', price: 5000, orders: 3000, icon: Crown, color: 'from-amber-600/20 to-orange-600/20', border: 'border-amber-500/20' },
];

export default function Billing() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Recharge & Billing</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Card */}
          <GlassCard className="bg-gradient-to-br from-indigo-500/10 to-transparent p-6 md:p-8 border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900 shadow-sm">
             <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Available Balance</p>
                  <h3 className="text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white tracking-tight">{formatCurrency(mockBalance.current)}</h3>
                  <div className="flex items-center gap-2 mt-4">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    <span className="text-xs md:text-sm text-rose-600 dark:text-rose-400 font-bold uppercase tracking-tight">Recharge recommended</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                   <button className="px-6 md:px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 text-sm">
                     <CreditCard className="w-4 h-4" /> Quick Recharge
                   </button>
                   <button className="px-6 md:px-8 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-white/10 transition-all text-slate-700 dark:text-white">
                     Invoices
                   </button>
                </div>
             </div>
          </GlassCard>

          {/* History */}
          <GlassCard className="p-0 overflow-hidden border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900 shadow-sm">
             <div className="p-5 md:p-6 border-b border-slate-200 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-white/[0.02]">
                <h3 className="font-display font-bold text-base md:text-lg text-slate-900 dark:text-white flex items-center gap-2">
                  <History className="w-5 h-5 text-indigo-500" /> Activity Log
                </h3>
                <button className="text-[10px] uppercase font-bold text-slate-400 hover:text-indigo-500 transition-colors">See All Activity</button>
             </div>
             <div className="divide-y divide-slate-100 dark:divide-white/5">
                {mockBalance.history.map((txn) => (
                  <div key={txn.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/[0.01] transition-colors">
                     <div className="flex items-center gap-3 md:gap-4 truncate">
                        <div className={cn(
                          "w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center shrink-0",
                          txn.type === 'recharge' ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                        )}>
                          {txn.type === 'recharge' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                        </div>
                        <div className="truncate">
                           <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{txn.description}</p>
                           <p className="text-[10px] text-slate-500">{txn.date} • {txn.id}</p>
                        </div>
                     </div>
                     <div className={cn("text-sm font-black whitespace-nowrap", txn.type === 'recharge' ? "text-emerald-600 dark:text-emerald-400" : "text-slate-900 dark:text-white")}>
                        {txn.type === 'recharge' ? '+' : '-'}{formatCurrency(txn.amount)}
                     </div>
                  </div>
                ))}
             </div>
          </GlassCard>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
           <GlassCard className="bg-blue-500/5 dark:bg-blue-600/10 border border-blue-500/20 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                 <ShieldCheck className="w-5 h-5 md:w-6 h-6 text-blue-600 dark:text-blue-400" />
                 <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-white">Payment Security</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">All transactions are processed through encrypted gateways. We support bKash, Nagad, Mastercard, and Visa.</p>
           </GlassCard>

           <GlassCard className="border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900 p-5 shadow-sm">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Auto-Recharge</h4>
              <div className="flex items-center justify-between">
                 <span className="text-xs md:text-sm font-bold text-slate-700 dark:text-slate-300">Enabled Status</span>
                 <div className="w-10 h-5 bg-slate-100 dark:bg-slate-800 rounded-full relative p-1 transition-colors border border-slate-200 dark:border-white/5">
                    <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600" />
                 </div>
              </div>
              <p className="text-[10px] text-slate-500 mt-4 leading-relaxed font-medium">Enable to automatically top up when balance hits zero using your primary card.</p>
           </GlassCard>

           <GlassCard className="p-4 border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex items-center gap-3">
                 <TrendingUp className="w-4 h-4 md:w-5 h-5 text-emerald-500" />
                 <p className="text-[11px] md:text-xs text-slate-600 dark:text-slate-400 font-medium tracking-tight">Monthly spend is <span className="font-black text-emerald-500">12% lower</span> than last month.</p>
              </div>
           </GlassCard>
        </div>
      </div>

      {/* Pricing Packages */}
      <div className="space-y-6">
        <div className="text-center">
            <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Upgrade Your Capabilities</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Choose a plan that scales with your growth.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {plans.map((plan) => (
             <GlassCard 
               key={plan.name} 
               className={cn(
                 "relative flex flex-col p-8 transition-all duration-300 border-slate-200 dark:border-white/5",
                 plan.current ? "ring-2 ring-indigo-500 dark:ring-brand-primary" : "hover:bg-slate-50 dark:hover:bg-white/[0.03]"
               )}
             >
                {plan.current && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-lg">
                    Current Plan
                  </div>
                )}
                
                <div className={cn("w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white mb-6 shadow-xl", plan.color)}>
                   <plan.icon className="w-8 h-8" />
                </div>
                
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h4>
                <div className="flex items-baseline gap-1 mt-1 mb-8">
                   <span className="text-3xl font-display font-bold text-slate-900 dark:text-white">{formatCurrency(plan.price)}</span>
                   <span className="text-slate-500 text-sm">/ mo</span>
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                   {[
                     `${plan.orders} Orders per Month`,
                     'Advanced Courier Analytics',
                     'Custom Invoice Branding',
                     'Priority Support 24/7',
                   ].map((feature, i) => (
                     <li key={i} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500 shrink-0">
                           <Check className="w-3 h-3" />
                        </div>
                        {feature}
                     </li>
                   ))}
                </ul>

                <button className={cn(
                  "w-full py-3 rounded-xl font-bold text-sm transition-all",
                  plan.current 
                  ? "bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-300 cursor-default" 
                  : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/20"
                )}>
                   {plan.current ? 'Your Active Plan' : 'Select Package'}
                </button>
             </GlassCard>
           ))}
        </div>
      </div>
    </div>
  );
}
