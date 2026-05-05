import React, { useState, useEffect } from 'react';
import { 
  X, User, Phone, MapPin, Package, 
  ChevronRight, ChevronLeft, Save, 
  Search, Plus, Trash2, ShieldCheck,
  AlertCircle, Truck, Calculator
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { cn, formatCurrency } from '../../lib/utils';
import GlassCard from '../ui/GlassCard';

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockCustomerHealth = {
  data: [
    { name: 'Delivered', value: 85, color: '#10b981' },
    { name: 'Returned', value: 10, color: '#f59e0b' },
    { name: 'Failed', value: 5, color: '#ef4444' },
  ],
  score: 'Green',
  summary: 'High trust score based on 42 previous orders.'
};

export default function CreateOrderModal({ isOpen, onClose }: CreateOrderModalProps) {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [showHealth, setShowHealth] = useState(false);
  const [weight, setWeight] = useState(1);

  // Shipping logic: 130 BDT first kg, +20 BDT extra
  const calculateShipping = (w: number) => 130 + (Math.max(0, w - 1) * 20);
  const shipping = calculateShipping(weight);

  useEffect(() => {
    if (phone.length === 11) {
      setShowHealth(true);
    } else {
      setShowHealth(false);
    }
  }, [phone]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-4xl max-h-[90vh] glass-card shadow-2xl rounded-3xl flex flex-col overflow-hidden text-slate-900 dark:text-slate-200"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-white/5 flex items-center justify-between bg-slate-50 dark:bg-white/[0.02]">
           <div>
              <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white">New Marketplace Order</h2>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Ref: #ORD-DRAFT-{Date.now().toString().slice(-4)}</p>
           </div>
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                 {[1, 2, 3].map((s) => (
                   <div key={s} className={cn("h-1.5 w-8 rounded-full transition-all duration-300", step >= s ? "bg-indigo-500" : "bg-slate-200 dark:bg-white/10")} />
                 ))}
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-all">
                <X className="w-5 h-5 text-slate-500" />
              </button>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
           {step === 1 && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                   <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <User className="w-4 h-4" /> Customer Information
                   </h3>
                   
                   <div className="space-y-4">
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Phone Number</label>
                         <div className="relative">
                           <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                           <input 
                             value={phone}
                             onChange={(e) => setPhone(e.target.value)}
                             placeholder="01xxxxxxxxx"
                             className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-2xl p-4 pl-12 focus:border-indigo-500 outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400" 
                           />
                         </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Customer Name</label>
                            <input className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-2xl p-4 focus:border-indigo-500 outline-none transition-all text-slate-900 dark:text-white" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Organisation</label>
                            <input className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-2xl p-4 focus:border-indigo-500 outline-none transition-all text-slate-900 dark:text-white" />
                         </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Delivery Address</label>
                        <textarea className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-2xl p-4 h-32 focus:border-indigo-500 outline-none transition-all resize-none text-slate-900 dark:text-white" />
                      </div>
                   </div>
                </div>

                <div className="space-y-6">
                   <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <ShieldCheck className="w-4 h-4" /> Smart Health Check
                   </h3>
                   
                   <AnimatePresence mode="wait">
                      {showHealth ? (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="rounded-3xl p-6 border border-emerald-500/20 bg-emerald-500/[0.02] relative overflow-hidden"
                        >
                           <div className="flex items-center justify-between mb-4">
                              <span className={cn(
                                "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                mockCustomerHealth.score === 'Green' ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                              )}>
                                {mockCustomerHealth.score} Score
                              </span>
                              <AlertCircle className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                           </div>
                           
                           <div className="h-48 w-full flex items-center justify-center relative">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={mockCustomerHealth.data}
                                    innerRadius={55}
                                    outerRadius={75}
                                    stroke="none"
                                    dataKey="value"
                                  >
                                    {mockCustomerHealth.data.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                  </Pie>
                                </PieChart>
                              </ResponsiveContainer>
                              <div className="absolute inset-0 flex flex-col items-center justify-center">
                                 <span className="text-3xl font-black text-slate-900 dark:text-white">85%</span>
                                 <span className="text-[8px] text-slate-500 uppercase font-bold text-center tracking-widest">Success</span>
                              </div>
                           </div>

                           <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4 leading-relaxed font-medium">
                             {mockCustomerHealth.summary}
                           </p>

                           <div className="grid grid-cols-3 gap-2 mt-6">
                              {mockCustomerHealth.data.map(item => (
                                <div key={item.name} className="flex flex-col items-center">
                                   <div className="flex items-center gap-1.5 mb-1">
                                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: item.color }} />
                                      <span className="text-[10px] font-bold text-slate-500 uppercase">{item.name}</span>
                                   </div>
                                   <span className="text-xs font-bold text-slate-900 dark:text-white">{item.value}</span>
                                </div>
                              ))}
                           </div>
                        </motion.div>
                      ) : (
                        <div className="h-80 border-2 border-dashed border-slate-200 dark:border-white/5 rounded-3xl flex flex-col items-center justify-center p-8 opacity-60">
                           <div className="w-12 h-12 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center mb-4">
                              <Search className="w-5 h-5 text-slate-400" />
                           </div>
                           <p className="text-center text-xs font-bold leading-relaxed text-slate-400">Enter a phone number to fetch <br/> automatic health diagnostics.</p>
                        </div>
                      )}
                   </AnimatePresence>
                </div>
             </div>
           )}

           {step === 2 && (
             <div className="space-y-8 max-w-2xl mx-auto">
                <div className="flex items-center justify-between">
                   <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">Select Products</h3>
                   <button className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:underline">
                     <Plus className="w-4 h-4" /> Fast Browse
                   </button>
                </div>
                
                <div className="space-y-4">
                   <div className="p-4 rounded-3xl flex items-center gap-4 bg-slate-50 dark:bg-white/[0.01] border border-slate-200 dark:border-white/5">
                      <div className="w-16 h-16 rounded-2xl bg-slate-200 dark:bg-white/5 overflow-hidden border border-slate-100 dark:border-white/5">
                         <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                         <h4 className="text-sm font-bold text-slate-900 dark:text-white">Quantum Smartwatch V2</h4>
                         <p className="text-[10px] font-mono text-slate-500 uppercase">QW-0092</p>
                      </div>
                      <div className="flex items-center gap-3">
                         <button className="w-8 h-8 rounded-lg glass border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400">-</button>
                         <span className="w-6 text-center font-bold text-slate-900 dark:text-white">1</span>
                         <button className="w-8 h-8 rounded-lg glass border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400">+</button>
                      </div>
                      <div className="w-24 text-right">
                         <p className="text-sm font-bold text-slate-900 dark:text-white">{formatCurrency(2450)}</p>
                      </div>
                      <button className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                   </div>

                   <button className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-white/5 rounded-3xl flex items-center justify-center gap-2 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/20 transition-all font-bold text-sm">
                      <Plus className="w-5 h-5" /> Add Another Product
                   </button>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-8 border-t border-slate-200 dark:border-white/5">
                   <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Total Weight (KG)</label>
                       <div className="relative">
                          <input 
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(Number(e.target.value))}
                            className="w-full bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-2xl p-4 pl-12 focus:border-indigo-500 outline-none transition-all font-bold text-slate-900 dark:text-white" 
                          />
                          <Calculator className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                       </div>
                       <p className="text-[10px] text-slate-500 pl-1">Shipping: {formatCurrency(shipping)}</p>
                   </div>
                   <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500 font-medium">Subtotal</span>
                        <span className="text-slate-900 dark:text-white font-bold">{formatCurrency(2450)}</span>
                      </div>
                      <div className="flex justify-between items-center text-lg font-black text-indigo-600 dark:text-indigo-400">
                        <span>Grand Total</span>
                        <span>{formatCurrency(2450 + shipping)}</span>
                      </div>
                   </div>
                </div>
             </div>
           )}

           {step === 3 && (
             <div className="flex flex-col items-center justify-center py-12 space-y-6">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500 mb-4 animate-bounce">
                   <Truck className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-display font-black text-slate-900 dark:text-white">Order Ready for Dispatch</h3>
                <p className="text-slate-500 dark:text-slate-400 text-center max-w-md">Finalize the order to generate a parcel ID and tracking number via <span className="text-indigo-600 dark:text-indigo-400 font-bold">Steadfast Logistics</span>.</p>
                <div className="glass p-6 rounded-3xl w-full max-w-md border-slate-200 dark:border-indigo-500/10 shadow-sm">
                   <dl className="space-y-3">
                      <div className="flex justify-between text-xs">
                        <dt className="text-slate-500 font-bold uppercase tracking-widest">Customer</dt>
                        <dd className="text-slate-900 dark:text-white font-bold">Jahid Hasan</dd>
                      </div>
                      <div className="flex justify-between text-xs">
                        <dt className="text-slate-500 font-bold uppercase tracking-widest">Courier Partner</dt>
                        <dd className="text-indigo-600 dark:text-indigo-400 font-bold uppercase">Steadfast</dd>
                      </div>
                      <div className="flex justify-between text-xs">
                        <dt className="text-slate-500 font-bold uppercase tracking-widest">COD Amount</dt>
                        <dd className="text-emerald-600 dark:text-emerald-400 font-black text-lg">{formatCurrency(2580)}</dd>
                      </div>
                   </dl>
                </div>
             </div>
           )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] flex items-center gap-4">
           {step > 1 && (
             <button 
               onClick={() => setStep(step - 1)}
               className="px-6 py-4 glass border-slate-200 dark:border-white/10 rounded-2xl flex items-center gap-2 text-sm font-bold hover:bg-slate-100 dark:hover:bg-white/5 active:scale-95 transition-all outline-none text-slate-700 dark:text-white"
             >
                <ChevronLeft className="w-4 h-4" /> Back
             </button>
           )}
           <button 
             onClick={() => onClose()}
             className="px-6 py-4 glass border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 rounded-2xl flex items-center gap-2 text-sm font-bold hover:text-slate-900 dark:hover:text-white transition-all outline-none"
           >
              <Save className="w-4 h-4" /> Save as Draft
           </button>
           
           <div className="flex-1" />
           
           <button 
             onClick={() => step < 3 ? setStep(step + 1) : onClose()}
             className="px-10 py-4 bg-indigo-600 rounded-2xl flex items-center gap-2 text-sm font-black text-white shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all outline-none"
           >
              {step === 3 ? 'Confirm Order' : 'Continue'} <ChevronRight className="w-4 h-4" />
           </button>
        </div>
      </motion.div>
    </div>
  );
}
