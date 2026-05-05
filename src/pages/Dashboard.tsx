import React from 'react';
import { 
  TrendingUp, Users, ShoppingBag, 
  ArrowUpRight, ArrowDownRight, Package,
  Truck, AlertCircle, RefreshCw, BarChart3,
  ChevronRight, ShoppingCart
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar,
  Cell, PieChart, Pie
} from 'recharts';
import { motion } from 'motion/react';
import GlassCard from '../components/ui/GlassCard';
import { formatCurrency, cn } from '../lib/utils';
import { useTheme } from '../context/ThemeContext';

const revenueData = [
  { name: 'Mon', revenue: 45000, orders: 120 },
  { name: 'Tue', revenue: 52000, orders: 145 },
  { name: 'Wed', revenue: 48000, orders: 132 },
  { name: 'Thu', revenue: 61000, orders: 156 },
  { name: 'Fri', revenue: 55000, orders: 140 },
  { name: 'Sat', revenue: 67000, orders: 188 },
  { name: 'Sun', revenue: 72000, orders: 210 },
];

const returnData = [
  { name: 'Delivered', value: 75, color: '#10b981' },
  { name: 'Returned', value: 15, color: '#f59e0b' },
  { name: 'Failed', value: 10, color: '#ef4444' },
];

const courierPerformance = [
  { courier: 'Steadfast', rate: 94 },
  { courier: 'Pathao', rate: 88 },
  { courier: 'RedX', rate: 82 },
];

export default function Dashboard() {
  const { theme } = useTheme();
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Top Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h2 className="text-3xl font-display font-black text-slate-900 dark:text-white tracking-tight">Executive Overview</h2>
           <p className="text-slate-500 font-medium mt-1">Welcome back, Super Admin. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="glass px-6 py-3 rounded-2xl flex items-center gap-3 border-slate-200 dark:border-white/5">
              <div className="flex flex-col">
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Sellers</span>
                 <span className="text-lg font-black text-slate-900 dark:text-white">420</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                 <Users className="w-5 h-5 text-emerald-500" />
              </div>
           </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Total Revenue', value: '৳2.4M', growth: '+12.5%', icon: TrendingUp, color: 'indigo' },
          { label: 'Active Orders', value: '1,280', growth: '+18.2%', icon: ShoppingCart, color: 'emerald' },
          { label: 'Return Rate', value: '4.2%', growth: '-2.1%', icon: RefreshCw, color: 'rose' },
          { label: 'Courier Eff.', value: '92.4%', growth: '+0.8%', icon: Truck, color: 'amber' },
        ].map((stat, i) => (
          <GlassCard key={i} className="p-5 md:p-6 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
            <div className={cn(
              "absolute top-0 right-0 w-24 h-24 blur-3xl rounded-full -mr-8 -mt-8 opacity-10",
              stat.color === 'indigo' && "bg-indigo-500",
              stat.color === 'emerald' && "bg-emerald-500",
              stat.color === 'rose' && "bg-rose-500",
              stat.color === 'amber' && "bg-amber-500"
            )} />
            <div className="flex items-center justify-between mb-4">
              <div className={cn(
                "p-2.5 rounded-xl",
                stat.color === 'indigo' && "bg-indigo-500/10 text-indigo-500",
                stat.color === 'emerald' && "bg-emerald-500/10 text-emerald-500",
                stat.color === 'rose' && "bg-rose-500/10 text-rose-500",
                stat.color === 'amber' && "bg-amber-500/10 text-amber-500"
              )}>
                <stat.icon className="w-5 h-5 md:w-6 h-6" />
              </div>
              <span className={cn(
                "flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg",
                stat.growth.startsWith('+') ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
              )}>
                {stat.growth.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.growth}
              </span>
            </div>
            <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mt-1">{stat.value}</h3>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Main Revenue Chart */}
        <GlassCard className="lg:col-span-2 p-5 md:p-8 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
             <div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">Revenue Stream</h3>
                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest mt-1">Weekly Performance Overview</p>
             </div>
             <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-xl self-start sm:self-auto">
                <button className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest bg-indigo-500 text-white rounded-lg shadow-lg shadow-indigo-500/20">Revenue</button>
                <button className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Orders</button>
             </div>
          </div>
          
          <div className="h-[300px] md:h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.05)'} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff', 
                    borderRadius: '16px', 
                    border: theme === 'dark' ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
                    color: theme === 'dark' ? '#fff' : '#000',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                  }}
                  itemStyle={{ fontWeight: 800 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#revenueGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Return Analytics */}
        <GlassCard className="p-5 md:p-8">
           <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-1">Return Analytics</h3>
           <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest mb-8">Performance breakdown</p>
           
           <div className="h-48 md:h-64 relative">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={returnData}
                   innerRadius={50}
                   outerRadius={75}
                   paddingAngle={8}
                   dataKey="value"
                 >
                   {returnData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                   ))}
                 </Pie>
                 <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                 />
               </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">4.2%</span>
                <span className="text-[8px] md:text-[10px] font-bold text-rose-500 uppercase">Return Rate</span>
             </div>
           </div>

           <div className="space-y-3 md:space-y-4 mt-8">
              {returnData.map((item) => (
                <div key={item.name} className="flex items-center justify-between group">
                   <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                      <span className="text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 group-hover:text-indigo-500 dark:group-hover:text-white transition-colors">{item.name}</span>
                   </div>
                   <span className="text-xs md:text-sm font-black text-slate-700 dark:text-white">{item.value}%</span>
                </div>
              ))}
           </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Courier Performance */}
        <GlassCard className="p-5 md:p-8">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">Courier Performance</h3>
              <Truck className="w-5 h-5 text-indigo-500" />
           </div>
           
           <div className="space-y-6 md:space-y-8">
              {courierPerformance.map((courier) => (
                <div key={courier.courier} className="space-y-2">
                   <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                      <span className="text-slate-600 dark:text-slate-300">{courier.courier}</span>
                      <span className="text-indigo-600 dark:text-indigo-400">{courier.rate}% Success</span>
                   </div>
                   <div className="h-1.5 md:h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${courier.rate}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full bg-indigo-500 rounded-full"
                      />
                   </div>
                </div>
              ))}
           </div>
        </GlassCard>

        {/* Recent Critical Alerts */}
        <GlassCard className="p-5 md:p-8">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">Inventory Threshold</h3>
              <AlertCircle className="w-5 h-5 text-rose-500" />
           </div>
           
           <div className="space-y-3">
              {[
                { name: 'Ultra-Slim Laptop Stand', sku: 'ACC-0021', stock: 2, threshold: 5 },
                { name: 'Mechanical RGB Keyboard', sku: 'KYB-0992', stock: 1, threshold: 10 },
                { name: '4K Pro Webcam', sku: 'CAM-4421', stock: 0, threshold: 5 },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 md:p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 group hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-all">
                   <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-rose-500/10 flex items-center justify-center">
                         <Package className="w-4 h-4 md:w-5 h-5 text-rose-500" />
                      </div>
                      <div>
                         <h4 className="text-xs md:text-sm font-bold text-slate-900 dark:text-white leading-tight">{item.name}</h4>
                         <p className="text-[9px] md:text-[10px] font-mono text-slate-500 mt-1">Stock Left: {item.stock}</p>
                      </div>
                   </div>
                   <button className="p-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-white transition-all rounded-lg">
                      <ChevronRight className="w-3 h-3 md:w-4 h-4" />
                   </button>
                </div>
              ))}
           </div>
        </GlassCard>
      </div>
    </div>
  );
}
