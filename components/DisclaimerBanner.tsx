import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-amber-500/10 border-l-2 md:border-l-4 border-amber-500 p-2 md:p-3 mb-4 rounded-r shadow-lg backdrop-blur-sm">
      <div className="flex items-start md:items-center">
        <div className="flex-shrink-0 pt-0.5 md:pt-0">
          <AlertTriangle className="h-4 w-4 md:h-5 md:w-5 text-amber-500" />
        </div>
        <div className="ml-2 md:ml-3">
          <p className="text-[10px] md:text-xs text-gray-300 leading-tight">
            <strong className="text-amber-400 uppercase font-bold">Aviso IA:</strong> Contenido generado autom&aacute;ticamente. 
            No sustituye la planificaci&oacute;n oficial. Revisa y adapta seg&uacute;n tu criterio.
          </p>
        </div>
      </div>
    </div>
  );
};
