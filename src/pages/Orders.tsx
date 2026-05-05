import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Truck, 
  Printer, 
  ChevronRight,
  CheckCircle2,
  Clock,
  Ban,
  PackageCheck
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import { formatCurrency, cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Order, OrderStatus } from '../types';
import CreateOrderModal from '../components/orders/CreateOrderModal';

const mockOrders: Order[] = [
  { 
    id: 'ORD-7721', 
    customerName: 'Jahid Hasan', 
    customerPhone: '01711223344', 
    total: 2450, 
    status: 'Pending', 
    createdAt: '2026-05-04 10:30',
    address: 'Gulshan-2, Dhaka',
    district: 'Dhaka',
    subtotal: 2320,
    discount: 0,
    shipping: 130,
    previousDue: 0,
    source: 'Marketplace'
  },
  { 
    id: 'ORD-7720', 
    customerName: 'Rina Begum', 
    customerPhone: '01822334455', 
    total: 1200, 
    status: 'Confirmed', 
    createdAt: '2026-05-04 09:15',
    address: 'Mirpur-10, Dhaka',
    district: 'Dhaka',
    subtotal: 1120,
    discount: 50,
    shipping: 130,
    previousDue: 0,
    source: 'Direct'
  },
  { 
    id: 'ORD-7719', 
    customerName: 'Sumon Mia', 
    customerPhone: '01933445566', 
    total: 850, 
    status: 'Delivered', 
    createdAt: '2026-05-03 16:45',
    address: 'Chawkbazar, Chittagong',
    district: 'Chittagong',
    subtotal: 700,
    discount: 0,
    shipping: 150,
    previousDue: 0,
    source: 'Facebook'
  },
  { 
    id: 'ORD-7718', 
    customerName: 'Labib Ahmed', 
    customerPhone: '01644556677', 
    total: 3200, 
    status: 'In Courier', 
    courier: { name: 'Pathao', parcelId: 'PH-99212', trackingId: 'T-88219' }, 
    createdAt: '2026-05-03 14:20',
    address: 'Uttara Sector 4, Dhaka',
    district: 'Dhaka',
    subtotal: 3070,
    discount: 0,
    shipping: 130,
    previousDue: 0,
    source: 'Marketplace'
  },
  { 
    id: 'ORD-7717', 
    customerName: 'Tania Akter', 
    customerPhone: '01555667788', 
    total: 1500, 
    status: 'Returned', 
    createdAt: '2026-05-02 11:10',
    address: 'Zindabazar, Sylhet',
    district: 'Sylhet',
    subtotal: 1350,
    discount: 0,
    shipping: 150,
    previousDue: 0,
    source: 'Direct'
  },
];

const statusStyles: Partial<Record<OrderStatus, { bg: string, text: string, icon: any }>> = {
  'Pending': { bg: 'bg-amber-500/10', text: 'text-amber-500', icon: Clock },
  'Confirmed': { bg: 'bg-blue-500/10', text: 'text-blue-500', icon: CheckCircle2 },
  'In Courier': { bg: 'bg-indigo-500/10', text: 'text-indigo-500', icon: Truck },
  'Delivered': { bg: 'bg-emerald-500/10', text: 'text-emerald-500', icon: PackageCheck },
  'Returned': { bg: 'bg-rose-500/10', text: 'text-rose-500', icon: Ban },
  'Processing': { bg: 'bg-cyan-500/10', text: 'text-cyan-500', icon: Clock },
  'Failed': { bg: 'bg-rose-500/10', text: 'text-rose-500', icon: Ban },
  'Hold': { bg: 'bg-orange-500/10', text: 'text-orange-500', icon: Clock },
};

export default function Orders() {
  const [activeTab, setActiveTab] = useState<OrderStatus | 'All'>('All');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isCourierModalOpen, setIsCourierModalOpen] = useState(false);

  const orderStatuses: (OrderStatus | 'All')[] = [
    'All', 'Pending', 'Confirmed', 'Processing', 'In Courier', 'Delivered', 'Returned', 'Failed', 'Hold'
  ];

  const filteredOrders = activeTab === 'All' 
    ? mockOrders 
    : mockOrders.filter(order => order.status === activeTab);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Order Management</h2>
        <div className="flex items-center gap-2">
           <button className="glass border-slate-200 dark:border-white/5 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-600 dark:text-white">
             <Filter className="w-4 h-4" /> Filter
           </button>
           <button 
             onClick={() => setIsOrderModalOpen(true)}
             className="bg-brand-primary px-4 py-2 rounded-xl text-sm font-bold text-white flex items-center gap-2 hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/20"
           >
             <Plus className="w-4 h-4" /> Create New
           </button>
        </div>
      </div>

      <GlassCard className="p-0 overflow-visible">
        <div className="flex flex-col sm:flex-row items-center border-b border-slate-200 dark:border-white/5 p-4 gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-brand-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search by ID, Customer Name or Phone..." 
              className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-slate-900 dark:text-white"
            />
          </div>
          <div className="flex gap-1 bg-slate-200/50 dark:bg-slate-900/50 p-1 rounded-xl overflow-x-auto scrollbar-hide">
             {orderStatuses.map((tab) => (
               <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap",
                  activeTab === tab ? "bg-brand-primary text-white" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
               >
                 {tab}
               </button>
             ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4 text-center">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const style = statusStyles[order.status] || { bg: 'bg-slate-500/10', text: 'text-slate-500', icon: Clock };
                return (
                  <motion.tr 
                    key={order.id}
                    layoutId={order.id}
                    className="border-b border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/[0.02] group transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-mono font-bold text-slate-900 dark:text-white group-hover:text-brand-primary transition-colors">{order.id}</span>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex flex-col">
                         <span className="text-sm font-medium text-slate-900 dark:text-white">{order.customerName}</span>
                         <span className="text-xs text-slate-500">{order.customerPhone}</span>
                       </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{formatCurrency(order.total)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight", style.bg, style.text)}>
                        <style.icon className="w-3.5 h-3.5" />
                        {order.status}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className="text-xs text-slate-500">{order.createdAt}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => { setSelectedOrderId(order.id); setIsCourierModalOpen(true); }}
                          className="p-2 rounded-lg hover:bg-brand-primary/10 text-brand-primary hover:text-brand-primary transition-colors tooltip relative group/tt"
                        >
                          <Truck className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-white/5 text-slate-400">
                          <Printer className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-white/5 text-slate-400">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Create Order Modal */}
      <CreateOrderModal 
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />

      {/* Courier Modal */}
      <AnimatePresence>
        {isCourierModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCourierModalOpen(false)}
              className="absolute inset-0 bg-[#030712]/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md glass-card p-6 shadow-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-white/5"
            >
              <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-2">Submit to Courier</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Order: <span className="text-brand-primary font-mono">{selectedOrderId}</span></p>

              <div className="space-y-4">
                <label className="block">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Select Provider</span>
                  <div className="grid grid-cols-3 gap-3">
                    {['Steadfast', 'Pathao', 'RedX'].map((c) => (
                      <button key={c} className="glass border-slate-200 dark:border-white/5 p-3 rounded-xl flex flex-col items-center gap-2 hover:border-brand-primary/50 transition-all group">
                         <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-brand-primary/10 transition-colors">
                           <Truck className="w-5 h-5 text-slate-400 group-hover:text-brand-primary" />
                         </div>
                         <span className="text-xs font-bold text-slate-900 dark:text-white">{c}</span>
                      </button>
                    ))}
                  </div>
                </label>

                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">
                   <div className="flex gap-3">
                      <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <div>
                        <p className="text-xs text-blue-600 dark:text-blue-400 font-bold mb-1">Estimated Cost</p>
                        <p className="text-sm text-blue-800 dark:text-blue-200">60 BDT (Dhaka Metro Delivery)</p>
                      </div>
                   </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button 
                  onClick={() => setIsCourierModalOpen(false)}
                  className="flex-1 py-3 glass border-slate-200 dark:border-white/5 rounded-xl font-bold text-sm text-slate-600 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5"
                >
                  Cancel
                </button>
                <button 
                   className="flex-1 py-3 bg-brand-primary rounded-xl font-bold text-sm text-white shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90"
                >
                  Confirm Submission
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
