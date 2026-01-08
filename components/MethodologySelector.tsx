import React from 'react';
import { METHODOLOGIES, ICONS } from '../constants';
import { Methodology } from '../types';
import { CheckCircle2 } from 'lucide-react';

interface Props {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const MethodologySelector: React.FC<Props> = ({ selectedId, onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {METHODOLOGIES.map((method) => {
        const isSelected = selectedId === method.id;
        return (
          <button
            key={method.id}
            onClick={() => onSelect(method.id)}
            className={`
              relative p-6 rounded-xl border-2 transition-all duration-300 text-left group
              ${isSelected 
                ? 'border-winner-teal bg-winner-teal/20 shadow-[0_0_20px_rgba(20,184,166,0.3)]' 
                : 'border-white/10 bg-white/5 hover:border-winner-pink/50 hover:bg-white/10'
              }
            `}
          >
            <div className={`
              inline-flex p-3 rounded-lg mb-4 transition-colors
              ${isSelected ? 'bg-winner-teal text-white' : 'bg-white/10 text-gray-300 group-hover:bg-winner-pink group-hover:text-white'}
            `}>
              {ICONS[method.icon]}
            </div>
            
            <h3 className="text-xl font-bold mb-2 font-serif text-white">{method.name}</h3>
            <p className="text-sm text-gray-300 leading-relaxed">{method.description}</p>

            {isSelected && (
              <div className="absolute top-4 right-4 text-winner-teal">
                <CheckCircle2 size={24} />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};
