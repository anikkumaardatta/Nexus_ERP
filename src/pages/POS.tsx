import React, { useState } from 'react';
import { 
  Search, Grid, List, ShoppingCart, 
  Trash2, CreditCard, UserPlus, 
  Zap, Smartphone, Minus, Plus 
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import { formatCurrency, cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const products = [
  { id: '1', name: 'Quantum Watch', price: 2450, stock: 12, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100' },
  { id: '2', name: 'Elite Headphones', price: 5800, stock: 8, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100' },
  { id: '3', name: 'Mech Keyboard', price: 3200, stock: 15, image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=100' },
];

export default function POS() {
  const [cart, setCart] = useState<{id: string, qty: number}[]>([]);
  
  const addToCart = (id: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing) return prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id, qty: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const subtotal = cart.reduce((acc, item) => {
    const p = products.find(prod => prod.id === item.id);
    return acc + (p?.price || 0) * item.qty;
  }, 0);

  const tax = subtotal * 0; // Tax 0% as per UI
  const total = subtotal + tax;

  return (
    <div className="h-[calc(100vh-160px)] flex gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Products Selection */}
      <div className="flex-1 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-display font-black text-foreground italic tracking-tighter">TERMINAL.POS</h2>
            <div className="flex gap-2">
               <button className="p-2 glass border-border rounded-xl text-muted hover:text-foreground transition-all"><Grid className="w-5 h-5" /></button>
               <button className="p-2 glass border-border rounded-xl text-indigo-600 dark:text-indigo-400 bg-indigo-500/10"><List className="w-5 h-5" /></button>
            </div>
         </div>

         <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input 
              placeholder="Search products or scan barcode..." 
              className="w-full bg-surface border border-border p-4 pl-14 rounded-2xl outline-none focus:border-indigo-500/50 transition-all font-medium text-foreground"
            />
         </div>

         <div className="flex-1 overflow-y-auto grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pr-2 custom-scrollbar">
            {products.map((product) => (
              <GlassCard 
                key={product.id}
                onClick={() => addToCart(product.id)}
                className="p-4 cursor-pointer border-slate-200 dark:border-white/5 hover:border-indigo-500/50 transition-all active:scale-95 flex flex-col group h-fit"
              >
                 <div className="aspect-square rounded-xl bg-surface overflow-hidden mb-4 border border-border">
                    <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                 </div>
                 <h4 className="text-sm font-bold text-foreground mb-1">{product.name}</h4>
                 <div className="flex justify-between items-center">
                    <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{formatCurrency(product.price)}</span>
                    <span className="text-[10px] font-black text-muted uppercase">Stock: {product.stock}</span>
                 </div>
              </GlassCard>
            ))}
         </div>
      </div>

      {/* Cart Sidebar */}
      <aside className="w-96 flex flex-col gap-6">
         <GlassCard className="flex-1 flex flex-col overflow-hidden p-0 border-border">
            <div className="p-6 border-b border-border bg-surface flex items-center justify-between">
               <h3 className="text-sm font-black uppercase tracking-widest text-muted flex items-center gap-2">
                 <ShoppingCart className="w-4 h-4" /> Current Order
               </h3>
               <button onClick={() => setCart([])} className="text-[10px] font-black text-rose-500 hover:underline uppercase tracking-widest">Clear</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
               <AnimatePresence mode="popLayout">
                 {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-muted/40 py-20">
                       <ShoppingCart className="w-12 h-12 mb-4 opacity-40" />
                       <p className="text-xs font-bold uppercase tracking-widest italic opacity-40">Terminal Empty</p>
                    </div>
                 ) : (
                    cart.map(item => {
                      const p = products.find(prod => prod.id === item.id)!;
                      return (
                        <motion.div 
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          key={item.id} 
                          className="flex items-center gap-3 p-3 rounded-xl bg-surface border border-border"
                        >
                           <div className="w-10 h-10 rounded-lg bg-surface overflow-hidden">
                              <img src={p.image} className="w-full h-full object-cover" />
                           </div>
                           <div className="flex-1">
                              <h5 className="text-xs font-bold text-foreground">{p.name}</h5>
                              <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-black">{formatCurrency(p.price)}</p>
                           </div>
                           <div className="flex items-center gap-2 text-foreground">
                              <button 
                                onClick={() => updateQty(item.id, -1)}
                                className="w-6 h-6 rounded-md glass border-border dark:border-white/10 flex items-center justify-center text-[10px] hover:bg-surface-hover transition-all font-bold"
                              >
                                -
                              </button>
                              <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                              <button 
                                onClick={() => updateQty(item.id, 1)}
                                className="w-6 h-6 rounded-md glass border-border dark:border-white/10 flex items-center justify-center text-[10px] hover:bg-surface-hover transition-all font-bold"
                              >
                                +
                              </button>
                           </div>
                        </motion.div>
                      );
                    })
                 )}
               </AnimatePresence>
            </div>

            <div className="p-6 border-t border-border bg-surface space-y-4">
               <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-muted">Subtotal</span>
                    <span className="text-foreground">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-muted">Tax (0%)</span>
                    <span className="text-foreground">{formatCurrency(tax)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black pt-2 border-t border-border">
                    <span className="text-foreground">TOTAL</span>
                    <span className="text-indigo-600 dark:text-indigo-400">{formatCurrency(total)}</span>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-3">
                  <button className="py-3 px-4 glass border-border rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted hover:text-foreground transition-all">
                     <UserPlus className="w-4 h-4" /> Customer
                  </button>
                  <button className="py-3 px-4 glass border-border rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted hover:text-foreground transition-all">
                     <Zap className="w-4 h-4" /> Discount
                  </button>
               </div>

               <button className="w-full py-4 bg-indigo-600 rounded-2xl flex items-center justify-center gap-3 text-sm font-black text-white shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all">
                  <CreditCard className="w-5 h-5" /> CHARGE & PRINT
               </button>
            </div>
         </GlassCard>
      </aside>
    </div>
  );
}
