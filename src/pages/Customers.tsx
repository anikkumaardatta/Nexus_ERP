import React from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  UserPlus, 
  History, 
  TrendingUp, 
  MessageSquare, 
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  ArrowUpDown
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import { formatCurrency, cn } from '../lib/utils';
import { motion } from 'motion/react';
import { Customer } from '../types';

const mockCustomers: Customer[] = [
  { id: '1', name: 'Jahid Hasan', email: 'jahid@example.com', phone: '01711223344', totalOrders: 12, totalSpent: 28500, lastOrder: '2026-05-04' },
  { id: '2', name: 'Rina Begum', email: 'rina.b@gmail.com', phone: '01822334455', totalOrders: 4, totalSpent: 5200, lastOrder: '2026-05-01' },
  { id: '3', name: 'Sumon Mia', email: 'sumon12@outlook.com', phone: '01933445566', totalOrders: 1, totalSpent: 850, lastOrder: '2026-05-03' },
  { id: '4', name: 'Labib Ahmed', email: 'labib.dev@gmail.com', phone: '01644556677', totalOrders: 42, totalSpent: 94200, lastOrder: '2026-05-04' },
];

export default function Customers() {
  return (
    <div className="space-y-6 animate-in slide-in-from-left-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Customer Insights</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Understand your audience and build loyalty.</p>
        </div>
        <button className="bg-brand-primary px-6 py-2.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/20 transition-all">
          <UserPlus className="w-4 h-4" /> Add Customer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCustomers.slice(0, 3).map((customer, i) => (
          <GlassCard key={customer.id} hover className="relative overflow-hidden group">
             {i === 0 && <div className="absolute top-0 right-0 p-1 px-3 bg-brand-primary text-[8px] font-black uppercase text-white rounded-bl-lg">Top Customer</div>}
             <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-white/5 overflow-hidden group-hover:border-brand-primary transition-all">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${customer.name}`} alt={customer.name} />
                </div>
                <div>
                   <h4 className="font-bold text-slate-900 dark:text-white">{customer.name}</h4>
                   <p className="text-xs text-slate-500 flex items-center gap-1"><Phone className="w-3 h-3" /> {customer.phone}</p>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-100 dark:bg-white/5 p-3 rounded-xl border border-slate-200 dark:border-white/5">
                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 text-center">Orders</p>
                   <p className="text-lg font-bold text-slate-900 dark:text-white text-center">{customer.totalOrders}</p>
                </div>
                <div className="bg-slate-100 dark:bg-white/5 p-3 rounded-xl border border-slate-200 dark:border-white/5">
                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 text-center">Value</p>
                   <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 text-center">{formatCurrency(customer.totalSpent)}</p>
                </div>
             </div>

             <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/5">
                <div className="flex items-center gap-1 text-[10px] text-slate-500">
                   <Calendar className="w-3 h-3" /> Last Active: {customer.lastOrder}
                </div>
                <button className="p-2 glass rounded-lg hover:bg-white/10 transition-all">
                   <MessageSquare className="w-4 h-4 text-slate-400" />
                </button>
             </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-0">
         <div className="flex flex-col md:flex-row items-center border-b border-slate-200 dark:border-white/5 p-4 justify-between gap-4">
            <div className="relative flex-1 max-w-md w-full group">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-brand-primary transition-colors" />
               <input 
                 type="text" 
                 placeholder="Search customers..." 
                 className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-slate-900 dark:text-white"
               />
            </div>
            <div className="flex items-center gap-2">
               <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mr-2">Sort By</span>
               <button className="glass px-3 py-1.5 rounded-lg text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  Lifetime Value <ArrowUpDown className="w-3 h-3" />
               </button>
            </div>
         </div>

         <div className="overflow-x-auto text-sm">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50 dark:bg-white/[0.02] text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold tracking-widest border-b border-slate-200 dark:border-white/5">
                     <th className="px-6 py-4">Customer Name</th>
                     <th className="px-6 py-4">Email Address</th>
                     <th className="px-6 py-4">Phone</th>
                     <th className="px-6 py-4">Return Ratio</th>
                     <th className="px-6 py-4 text-right">Action</th>
                  </tr>
               </thead>
               <tbody>
                  {mockCustomers.map((c) => (
                    <tr key={c.id} className="border-b border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
                       <td className="px-6 py-4">
                          <span className="font-bold text-slate-900 dark:text-white group-hover:text-brand-primary transition-colors">{c.name}</span>
                       </td>
                       <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-mono text-xs">{c.email}</td>
                       <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{c.phone}</td>
                       <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                             <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[95%]" />
                             </div>
                             <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Safe</span>
                          </div>
                       </td>
                       <td className="px-6 py-4 text-right">
                          <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg text-slate-500 dark:text-slate-400 transition-all">
                             <MoreVertical className="w-4 h-4" />
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </GlassCard>
    </div>
  );
}
