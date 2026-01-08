import React from 'react';
import { Rocket, Target, ListOrdered, Table, Menu, X, FileText } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, isOpen, onClose }) => {
  const menuItems = [
    { id: 'dua-stem', label: '1. Experiencia DUA & STEM', icon: Rocket },
    { id: 'objectives', label: '2. Objetivos de Aprendizaje', icon: Target },
    { id: 'sequence', label: '3. Secuencia Didáctica', icon: ListOrdered },
    { id: 'rubric', label: '4. Rúbrica de Evaluación', icon: Table },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed md:sticky top-0 left-0 z-50 h-screen w-72 
        bg-[#0b0f19] border-r border-white/5 
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        flex flex-col
      `}>
        {/* Logo Area */}
        <div className="p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-gradient-to-br from-winner-purple to-winner-pink rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-winner-purple/20">
                R
             </div>
             <div>
               <h2 className="text-lg font-bold text-white leading-none font-serif">RegistraME</h2>
               <span className="text-[10px] text-winner-gold font-bold tracking-wider">TEACHER AI</span>
             </div>
          </div>
          <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        
        {/* Menu Section */}
        <div className="px-6 py-4">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Planificación</span>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  onClose();
                }}
                className={`
                  w-full flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden text-left
                  ${isActive 
                    ? 'bg-[#1e293b] text-white' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }
                `}
              >
                {isActive && (
                  <>
                     <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-winner-green rounded-r-full shadow-[0_0_12px_#10b981]"></div>
                     <div className="absolute inset-0 bg-gradient-to-r from-winner-green/10 to-transparent opacity-50"></div>
                  </>
                )}
                
                <item.icon 
                  size={20} 
                  className={`mr-3 flex-shrink-0 transition-colors duration-300 ${isActive ? 'text-winner-green' : 'text-gray-500 group-hover:text-gray-300'}`} 
                />
                <span className={`font-medium text-sm ${isActive ? 'font-bold' : ''}`}>
                  {item.label}
                </span>
              </button>
            );
          })}

          <div className="pt-4 mt-4 border-t border-white/5">
             <span className="px-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Exportar</span>
             <button
                onClick={() => {
                  onTabChange('full-view');
                  onClose();
                }}
                className={`
                  w-full flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden text-left
                  ${activeTab === 'full-view' 
                    ? 'bg-winner-purple text-white shadow-lg shadow-winner-purple/30' 
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }
                `}
              >
                <FileText size={20} className="mr-3" />
                <span className="font-bold text-sm">Vista Completa (PDF)</span>
              </button>
          </div>
        </nav>

        {/* User Footer */}
        <div className="p-4 mt-auto border-t border-white/5 bg-[#0f121e]">
          <div className="flex items-center gap-3 px-2 py-1">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-winner-gold to-winner-pink flex items-center justify-center font-bold text-xs text-white shadow-md border border-white/10">
                  JD
              </div>
              <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">Juan Docente</span>
                  <span className="text-xs text-winner-green flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-winner-green animate-pulse"></span>
                    Online
                  </span>
              </div>
          </div>
        </div>
      </aside>
    </>
  );
};
