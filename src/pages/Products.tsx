import React, { useState } from 'react';
import { 
  Plus, 
  Package, 
  AlertCircle, 
  Edit3, 
  Trash2, 
  History,
  Tag,
  Boxes
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import { formatCurrency, cn } from '../lib/utils';
import { motion } from 'motion/react';
import { Product } from '../types';

const mockProducts: Product[] = [
  { id: '1', name: 'Premium Leather Wallet', sku: 'WA-001', price: 1200, stock: 45, category: 'Accessories', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=100&h=100&fit=crop', weight: 0.2 },
  { id: '2', name: 'Cotton Minimal T-Shirt', sku: 'TS-092', price: 850, stock: 12, category: 'Apparel', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop', weight: 0.3 },
  { id: '3', name: 'Smart Fitness Band V4', sku: 'SW-112', price: 3450, stock: 5, category: 'Electronics', image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=100&h=100&fit=crop', weight: 0.1 },
  { id: '4', name: 'Wireless Noise Cancelling Earbuds', sku: 'EB-601', price: 5600, stock: 0, category: 'Electronics', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&h=100&fit=crop', weight: 0.1 },
];

export default function Products() {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Product Inventory</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Manage your catalog, stock levels and pricing.</p>
        </div>
        <button className="bg-brand-primary px-6 py-2.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/20 transition-all">
          <Plus className="w-4 h-4" /> Add New Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         <GlassCard className="p-4 flex items-center gap-4 border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900 shadow-sm">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
               <Package className="w-5 h-5 md:w-6 h-6" />
            </div>
            <div>
               <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Total SKUs</p>
               <p className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">124 Items</p>
            </div>
         </GlassCard>
         <GlassCard className="p-4 flex items-center gap-4 border border-rose-500/10 bg-white dark:bg-slate-900 shadow-sm">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400">
               <AlertCircle className="w-5 h-5 md:w-6 h-6" />
            </div>
            <div>
               <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Out of Stock</p>
               <p className="text-lg md:text-xl font-bold text-rose-500">8 Items</p>
            </div>
         </GlassCard>
         <GlassCard className="p-4 flex items-center gap-4 border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900 shadow-sm">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
               <Boxes className="w-5 h-5 md:w-6 h-6" />
            </div>
            <div>
               <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Total Value</p>
               <p className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">{formatCurrency(845200)}</p>
            </div>
         </GlassCard>
         <GlassCard className="p-4 flex items-center gap-4 border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900 shadow-sm">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
               <Tag className="w-5 h-5 md:w-6 h-6" />
            </div>
            <div>
               <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Categories</p>
               <p className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">12 Types</p>
            </div>
         </GlassCard>
      </div>

      <GlassCard className="p-0 border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900 shadow-sm">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left min-w-[600px] md:min-w-full">
               <thead>
                  <tr className="border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                     <th className="px-6 py-4">Product Info</th>
                     <th className="px-6 py-4 hidden md:table-cell">Category</th>
                     <th className="px-6 py-4">Price</th>
                     <th className="px-6 py-4">Stock</th>
                     <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {mockProducts.map((p) => (
                    <tr key={p.id} className="border-b border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
                       <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/5 overflow-hidden">
                                <img src={p.image} alt={p.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                             </div>
                             <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-primary transition-colors truncate max-w-[150px]">{p.name}</span>
                                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter">SKU: {p.sku}</span>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-4 text-xs font-medium text-slate-400 hidden md:table-cell">
                          <span className="px-2 py-1 bg-slate-100 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/5">{p.category}</span>
                       </td>
                       <td className="px-6 py-4 font-bold text-slate-900 dark:text-white text-sm">
                          {formatCurrency(p.price)}
                       </td>
                       <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                             <div className="flex items-center justify-between text-[9px] font-bold">
                               <span className={cn(p.stock <= 5 ? "text-rose-400" : "text-slate-500")}>
                                 {p.stock === 0 ? 'Out of Stock' : `${p.stock} Units`}
                               </span>
                             </div>
                             <div className="w-20 md:w-24 h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${Math.min((p.stock / 50) * 100, 100)}%` }}
                                  className={cn("h-full", p.stock <= 5 ? "bg-rose-500" : "bg-emerald-500")}
                                />
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-1 md:gap-2">
                             <button className="p-1.5 md:p-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-400 hover:text-indigo-500 transition-all">
                                <Edit3 className="w-4 h-4" />
                             </button>
                             <button className="p-1.5 md:p-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-400 hover:text-rose-400 transition-all">
                                <Trash2 className="w-4 h-4" />
                             </button>
                          </div>
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
