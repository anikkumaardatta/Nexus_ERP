import React, { useState } from 'react';
import { 
  Printer, 
  Save, 
  FileText, 
  Download, 
  Maximize2, 
  Layout, 
  Check,
  QrCode,
  Barcode,
  Truck,
  Eye
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import { formatCurrency, cn } from '../lib/utils';
import { motion } from 'motion/react';

const mockInvoiceData = {
  orderId: 'ORD-7721',
  date: '2026-05-04',
  customer: {
    name: 'Jahid Hasan',
    phone: '01711223344',
    address: 'House 42, Road 18, Block C, Banani, Dhaka'
  },
  items: [
    { name: 'Premium Leather Wallet', price: 1200, qty: 2, total: 2400 },
    { name: 'Delivery Charge', price: 50, qty: 1, total: 50 },
  ],
  total: 2450,
  courier: {
    name: 'Steadfast',
    parcelId: 'SF-1002931',
    trackingId: 'TRK-9921',
  }
};

export default function Invoice() {
  const [layout, setLayout] = useState<'Standard A4' | 'Thermal'>('Standard A4');
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Invoice & Printing</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Configure and print invoices or parcel slips.</p>
        </div>
        <div className="flex items-center gap-2">
           <button 
             onClick={handlePrint}
             className="bg-brand-primary px-6 py-2.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/20 transition-all"
           >
             <Printer className="w-4 h-4" /> {isPrinting ? 'Preparing...' : 'Quick Print'}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Panel */}
        <div className="space-y-6">
          <GlassCard className="border-slate-200 dark:border-white/5">
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-6">Print Layout</h3>
            <div className="grid grid-cols-1 gap-3">
              {(['Standard A4', 'Thermal'] as const).map((l) => (
                <button 
                  key={l} 
                  onClick={() => setLayout(l)}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left",
                    layout === l 
                    ? "border-brand-primary bg-indigo-50 dark:bg-brand-primary/10 text-indigo-600 dark:text-white" 
                    : "border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] text-slate-500 dark:text-slate-400 hover:border-slate-200 dark:hover:border-white/10"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Layout className="w-5 h-5" />
                    <div>
                      <p className="font-bold text-sm">{l}</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">{l === 'Thermal' ? '80mm Roll' : '210 x 297 mm'}</p>
                    </div>
                  </div>
                  {layout === l && <Check className="w-5 h-5 text-brand-primary" />}
                </button>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-white/5 space-y-4">
               <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Options</h4>
               {[
                 { label: 'Include QR Code', default: true },
                 { label: 'Show Courier Details', default: true },
                 { label: 'Print Signature Box', default: false },
               ].map((opt) => (
                 <label key={opt.label} className="flex items-center justify-between cursor-pointer group">
                    <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{opt.label}</span>
                    <div className="w-10 h-5 bg-slate-200 dark:bg-slate-800 rounded-full relative p-1 transition-colors">
                       <div className={cn("w-3 h-3 rounded-full bg-white dark:bg-slate-400 transition-all shadow-sm", opt.default && "translate-x-5 bg-brand-primary dark:bg-brand-primary")} />
                    </div>
                 </label>
               ))}
            </div>
            
            <button className="w-full mt-8 py-3 glass border-slate-200 dark:border-white/10 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-slate-700 dark:text-slate-300">
               <Save className="w-4 h-4" /> Save Default Layout
            </button>
          </GlassCard>

          <GlassCard className="bg-emerald-500/5 border-emerald-500/20">
             <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                   <Download className="w-5 h-5" />
                </div>
                <div>
                   <h4 className="font-bold text-slate-900 dark:text-white text-sm">Bulk Download</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Download multiple invoices as a ZIP file for your records.</p>
                </div>
             </div>
          </GlassCard>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-2 space-y-4">
           <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Eye className="w-4 h-4" /> Live Print Preview
              </span>
              <button className="text-[10px] uppercase font-bold text-brand-primary hover:underline transition-all">Fullscreen Preview</button>
           </div>
           
           <div className={cn(
             "mx-auto transition-all duration-500 rounded-lg overflow-hidden glass border-slate-200 dark:border-white/10 shadow-2xl relative",
             layout === 'Thermal' ? "w-[320px] min-h-[500px]" : "w-full max-w-[600px] aspect-[1/1.4]"
           )}>
             {/* Actual Print Content Mockup - Hardcoded White for Realism */}
             <div className="bg-white text-black p-8 sm:p-12 h-full flex flex-col font-sans select-none">
                <div className="flex justify-between items-start mb-8">
                   <div>
                      <h1 className="text-2xl font-black tracking-tighter text-blue-600">NEXUS ERP</h1>
                      <p className="text-[10px] text-gray-500">Premium Seller Solutions</p>
                   </div>
                   <div className="text-right">
                      <h2 className="text-lg font-bold">INVOICE</h2>
                      <p className="text-xs font-mono text-gray-500">#{mockInvoiceData.orderId}</p>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-8 text-[10px]">
                   <div>
                      <p className="font-bold uppercase text-gray-400 border-b mb-2 pb-1">Billed To</p>
                      <p className="text-sm font-bold">{mockInvoiceData.customer.name}</p>
                      <p className="text-gray-600">{mockInvoiceData.customer.phone}</p>
                      <p className="text-gray-600 mt-1">{mockInvoiceData.customer.address}</p>
                   </div>
                   <div className="text-right">
                      <p className="font-bold uppercase text-gray-400 border-b mb-2 pb-1">Payment Info</p>
                      <p className="text-sm font-bold">Cash on Delivery (COD)</p>
                      <p className="text-gray-600">Date: {mockInvoiceData.date}</p>
                   </div>
                </div>

                <table className="w-full text-left mb-8 border-t border-b border-gray-100">
                   <thead>
                      <tr className="text-[9px] uppercase text-gray-400 font-bold">
                         <th className="py-3 font-normal">Item Description</th>
                         <th className="py-3 font-normal text-right">Qty</th>
                         <th className="py-3 font-normal text-right">Price</th>
                         <th className="py-3 font-normal text-right">Total</th>
                      </tr>
                   </thead>
                   <tbody className="text-[11px]">
                      {mockInvoiceData.items.map((item, i) => (
                        <tr key={i} className="border-b border-gray-50 last:border-0">
                           <td className="py-3 font-medium">{item.name}</td>
                           <td className="py-3 text-right">{item.qty}</td>
                           <td className="py-3 text-right">৳{item.price}</td>
                           <td className="py-3 text-right font-bold">৳{item.total}</td>
                        </tr>
                      ))}
                   </tbody>
                </table>

                <div className="ml-auto w-48 text-[11px] space-y-2">
                   <div className="flex justify-between text-gray-500">
                      <span>Subtotal</span>
                      <span>৳{mockInvoiceData.total}</span>
                   </div>
                   <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2 text-blue-600">
                      <span>Grand Total</span>
                      <span>৳{mockInvoiceData.total}</span>
                   </div>
                </div>

                {/* Courier / Shipping Part */}
                <div className="mt-auto pt-8 border-t border-dashed border-gray-200">
                   <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Truck className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase">{mockInvoiceData.courier.name} Partner</span>
                      </div>
                      <div className="flex gap-2">
                        <Barcode className="w-6 h-6 opacity-30" />
                        <QrCode className="w-6 h-6 opacity-30" />
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-4 text-[10px]">
                      <div>
                        <p className="text-gray-400">Parcel ID</p>
                        <p className="font-mono font-bold">{mockInvoiceData.courier.parcelId}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400">Tracking Number</p>
                        <p className="font-mono font-bold">{mockInvoiceData.courier.trackingId}</p>
                      </div>
                   </div>
                </div>

                {isPrinting && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-white/80 backdrop-blur-[1px] flex flex-col items-center justify-center p-8 text-center"
                  >
                     <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                     <p className="mt-4 font-bold text-gray-900">Sending to Print Spooler...</p>
                  </motion.div>
                )}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
