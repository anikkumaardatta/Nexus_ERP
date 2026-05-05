import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

export default function MaintenancePage({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-20 text-center space-y-4 opacity-50 grayscale animate-in fade-in duration-700">
       <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-white/5 flex items-center justify-center">
          <SettingsIcon className="w-10 h-10" />
       </div>
       <div>
          <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white">{title} is under construction</h3>
          <p className="text-sm text-slate-500 mt-2 font-medium">Our engineers are working hard to bring you <br/> the latest updates. Check back soon!</p>
       </div>
    </div>
  );
}
