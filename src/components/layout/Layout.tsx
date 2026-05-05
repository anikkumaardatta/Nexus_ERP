import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, ShoppingBag, Package, Users, Truck, Wallet, Settings, 
  ChevronRight, Bell, ChevronLeft, Sun, Moon, Database, BarChart3, 
  HelpCircle, Monitor, ChevronDown, PlusCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';

const menuConfig = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { 
    icon: ShoppingBag, 
    label: 'Orders', 
    path: '/orders',
    subItems: [
      { label: 'Create New', path: '/orders/new' },
      { label: 'All Orders', path: '/orders' },
      { label: 'Pending', path: '/orders/status/pending' },
      { label: 'Confirmed', path: '/orders/status/confirmed' },
      { label: 'Delivered', path: '/orders/status/delivered' },
      { label: 'Returned', path: '/orders/status/returned' },
      { label: 'Bulk Print', path: '/orders/bulk' },
    ]
  },
  { 
    icon: Database, 
    label: 'Inventory', 
    path: '/inventory',
    subItems: [
      { label: 'Products', path: '/inventory/products' },
      { label: 'Suppliers', path: '/inventory/suppliers' },
      { label: 'Stock Adjustment', path: '/inventory/adjustment' },
    ]
  },
  { icon: Monitor, label: 'POS', path: '/pos' },
  { icon: Users, label: 'Customers', path: '/customers' },
  { 
    icon: BarChart3, 
    label: 'Reports', 
    path: '/reports',
    subItems: [
      { label: 'Summary', path: '/reports/summary' },
      { label: 'Daily Sales', path: '/reports/sales' },
      { label: 'Top Returns', path: '/reports/returns' },
    ]
  },
  { icon: Wallet, label: 'Billing', path: '/billing' },
  { 
    icon: Settings, 
    label: 'Settings', 
    path: '/settings',
    subItems: [
      { label: 'General', path: '/settings/general' },
      { label: 'Courier', path: '/settings/courier' },
      { label: 'SMS', path: '/settings/sms' },
    ]
  },
  { icon: HelpCircle, label: 'Support', path: '/support' },
];

const mobileNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: ShoppingBag, label: 'Orders', path: '/orders' },
  { icon: PlusCircle, label: 'POS', path: '/pos' },
  { icon: Users, label: 'Customers', path: '/customers' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev => 
      prev.includes(label) ? prev.filter(i => i !== label) : [...prev, label]
    );
  };

  return (
    <div className="min-h-screen flex bg-transparent">
      {/* Desktop Sidebar */}
      <aside 
        className={cn(
          "hidden md:flex flex-col glass-sidebar fixed inset-y-0 left-0 z-50 transition-all duration-300",
          isSidebarCollapsed ? "w-20" : "w-[280px]"
        )}
      >
        <div className="h-20 flex items-center px-6 border-b border-slate-200 dark:border-white/5">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <LayoutDashboard className="w-6 h-6 text-white" />
             </div>
             {!isSidebarCollapsed && (
               <motion.span 
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="font-display font-black text-2xl tracking-tighter"
               >
                 NEXUS
               </motion.span>
             )}
          </div>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto scrollbar-hide">
          {menuConfig.map((item) => (
            <div key={item.label} className="space-y-1">
              {item.subItems ? (
                <>
                  <button
                    onClick={() => !isSidebarCollapsed && toggleMenu(item.label)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                      expandedMenus.includes(item.label) && !isSidebarCollapsed 
                        ? "bg-indigo-500/10 text-indigo-500 dark:bg-white/5 dark:text-white" 
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                    )}
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
                    {!isSidebarCollapsed && (
                      <div className="flex-1 flex items-center justify-between">
                        <span className="text-sm font-semibold">{item.label}</span>
                        <ChevronDown className={cn("w-4 h-4 transition-transform", expandedMenus.includes(item.label) && "rotate-180")} />
                      </div>
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedMenus.includes(item.label) && !isSidebarCollapsed && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-slate-100/50 dark:bg-black/10 rounded-xl mt-1"
                      >
                        {item.subItems.map((sub) => (
                          <NavLink
                            key={sub.path}
                            to={sub.path}
                            className={({ isActive }) => cn(
                              "flex items-center px-12 py-2.5 text-xs font-medium transition-colors",
                              isActive 
                                ? "text-indigo-600 dark:text-indigo-400 font-bold" 
                                : "text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white"
                            )}
                          >
                            {sub.label}
                          </NavLink>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                    isActive 
                      ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" 
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5",
                    isSidebarCollapsed && "justify-center"
                  )}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {!isSidebarCollapsed && <span className="text-sm font-semibold">{item.label}</span>}
                </NavLink>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-white/5">
           <button 
             onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
             className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-slate-500 transition-all font-medium"
           >
             {isSidebarCollapsed ? <ChevronRight className="mx-auto" /> : <><ChevronLeft className="w-5 h-5" /> <span className="text-sm">Collapse OS</span></>}
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div 
        className={cn(
          "flex-1 flex flex-col min-h-screen transition-all duration-300",
          !isSidebarCollapsed ? "md:ml-[280px]" : "md:ml-20",
          "pb-20 md:pb-0"
        )}
      >
        {/* Header */}
        <header className="sticky top-0 z-40 h-20 glass-sidebar flex items-center justify-between px-8 border-b border-slate-200 dark:border-white/5">
          <div className="md:hidden flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-black text-xl tracking-tighter text-slate-900 dark:text-white">NEXUS</span>
          </div>

          <div className="hidden md:flex items-center gap-4">
             <div className="glass px-4 py-2 rounded-2xl flex items-center gap-2 border-slate-200 dark:border-white/5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">System Status: Stable</span>
             </div>
          </div>

          <div className="flex items-center gap-4">
            <motion.button 
              onClick={toggleTheme}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-2xl glass hover:bg-indigo-500/5 text-slate-600 dark:text-indigo-400 border-slate-200 dark:border-white/5 transition-all relative overflow-hidden group"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ y: 20, opacity: 0, rotate: 45 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: -20, opacity: 0, rotate: -45 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
            <button className="p-3 rounded-2xl glass border-slate-200 dark:border-white/5 hover:bg-slate-500/5 text-slate-500 dark:text-slate-400 relative">
               <Bell className="w-5 h-5" />
               <span className="absolute top-3 right-3 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[var(--background)]" />
            </button>
            <div className="h-8 w-px bg-slate-200 dark:bg-white/10 mx-2 hidden sm:block" />
            <div className="flex items-center gap-3 cursor-pointer group">
               <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-white/5 overflow-hidden group-hover:border-indigo-500/50 transition-all">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Avatar" className="w-full h-full object-cover" />
               </div>
            </div>
          </div>
        </header>

        <main className="p-6 md:p-10 flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 glass-sidebar z-[100] flex items-center justify-around px-2 border-r-0 border-t border-slate-200 dark:border-white/5">
        {mobileNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all duration-200 text-slate-500",
              isActive && "text-indigo-600 dark:text-indigo-400 bg-indigo-500/5 dark:bg-white/5"
            )}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
