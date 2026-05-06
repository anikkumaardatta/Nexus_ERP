import React from 'react';
import { 
  BarChart3, TrendingUp, TrendingDown, 
  Download, Calendar, Filter,
  ArrowRight, FileText, PieChart as PieIcon 
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import { cn, formatCurrency } from '../lib/utils';
import { useTheme } from '../context/ThemeContext';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell, PieChart, Pie 
} from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, returns: 400 },
  { name: 'Feb', revenue: 3000, returns: 300 },
  { name: 'Mar', revenue: 2000, returns: 500 },
  { name: 'Apr', revenue: 2780, returns: 200 },
  { name: 'May', revenue: 1890, returns: 100 },
  { name: 'Jun', revenue: 2390, returns: 340 },
];

export default function Reports() {
  const { theme } = useTheme();

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h2 className="text-3xl font-display font-black text-foreground tracking-tight">Intelligence & Analytics</h2>
           <p className="text-muted font-medium mt-1">Advanced multi-channel reporting module.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="glass border-border px-6 py-3 rounded-2xl flex items-center gap-2 text-sm font-bold text-muted hover:text-foreground transition-all">
              <Calendar className="w-4 h-4" /> Custom Range
           </button>
           <button className="bg-indigo-500 px-6 py-3 rounded-2xl flex items-center gap-2 text-sm font-bold text-white shadow-xl shadow-indigo-500/20 hover:scale-105 transition-all">
              <Download className="w-4 h-4" /> Export PDF
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Weekly Gross', value: '৳458,200', trend: 'up', perc: '+15.4%' },
          { label: 'Avg Return Rate', value: '8.4%', trend: 'down', perc: '-2.1%' },
          { label: 'Conversion', value: '2.8%', trend: 'up', perc: '+0.4%' },
        ].map((stat, i) => (
          <GlassCard key={i} className="p-6">
             <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-1">{stat.label}</p>
             <div className="flex items-end justify-between">
                <h3 className="text-2xl font-black text-foreground">{stat.value}</h3>
                <div className={cn(
                  "flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg",
                  stat.trend === 'up' ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                )}>
                   {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                   {stat.perc}
                </div>
             </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <GlassCard className="p-8">
            <h3 className="text-xl font-bold text-foreground mb-8">Revenue vs Returns</h3>
            <div className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.05)'} />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} />
                     <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} />
                     <Tooltip 
                        contentStyle={{ 
                          backgroundColor: theme === 'dark' ? 'var(--surface)' : '#ffffff', 
                          borderRadius: '16px', 
                          border: theme === 'dark' ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
                          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                          color: theme === 'dark' ? '#fff' : '#000'
                        }}
                     />
                     <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
                     <Bar dataKey="returns" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </GlassCard>

         <GlassCard className="p-8">
            <h3 className="text-xl font-bold text-foreground mb-8">Data Exports</h3>
            <div className="space-y-4">
               {[
                 { name: 'Daily Sales Report', size: '1.2 MB', date: '2026-05-04' },
                 { name: 'Inventory Threshold Summary', size: '4.8 MB', date: '2026-05-02' },
                 { name: 'Courier Performance Audit', size: '2.5 MB', date: '2026-05-01' },
               ].map((doc, i) => (
                 <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-surface border border-border hover:bg-surface-hover transition-all group">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 dark:text-indigo-400">
                          <FileText className="w-5 h-5" />
                       </div>
                       <div>
                          <h4 className="text-sm font-bold text-foreground">{doc.name}</h4>
                          <p className="text-[10px] text-muted font-bold uppercase">{doc.date} • {doc.size}</p>
                       </div>
                    </div>
                    <button className="p-2 text-muted hover:text-foreground transition-all">
                       <Download className="w-4 h-4" />
                    </button>
                 </div>
              ))}
            </div>
         </GlassCard>
      </div>
    </div>
  );
}
