import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Download, Share2, ArrowLeft, Printer } from 'lucide-react';

interface Props {
  content: string;
  onReset: () => void;
}

export const PlanDisplay: React.FC<Props> = ({ content, onReset }) => {
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="animate-fade-in pb-20">
      
      <div className="flex justify-between items-center mb-6 no-print">
        <button 
          onClick={onReset}
          className="flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Volver al diseño
        </button>

        <div className="flex space-x-3">
          <button 
            onClick={handlePrint}
            className="flex items-center px-4 py-2 bg-winner-purple hover:bg-indigo-600 rounded-lg font-bold transition-all shadow-lg text-white"
          >
            <Printer size={18} className="mr-2" />
            Imprimir / PDF
          </button>
        </div>
      </div>

      <div id="plan-content" className="bg-white text-gray-900 rounded-xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto print:shadow-none print:p-0 print:max-w-none">
        
        <div className="border-b-4 border-winner-gold pb-6 mb-8 flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-extrabold font-serif text-winner-dark uppercase tracking-wider">
                Planificación Pedagógica
                </h1>
                <p className="text-winner-purple font-bold mt-2">Enfoque DUA - STEM | Mentalidad Ganadora</p>
            </div>
            <div className="hidden md:block h-12 w-12 bg-winner-dark rounded-full flex items-center justify-center text-winner-gold font-bold text-xl">
                W
            </div>
        </div>

        <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-winner-dark prose-p:text-gray-700 prose-strong:text-winner-purple prose-ul:list-disc prose-ol:list-decimal">
          <ReactMarkdown 
            components={{
                h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-indigo-900 mb-4 mt-8 border-b-2 border-indigo-100 pb-2" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-indigo-800 mb-3 mt-6 bg-indigo-50 p-2 rounded-l border-l-4 border-indigo-600" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl font-bold text-pink-700 mb-2 mt-4" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-2 mb-4" {...props} />,
                li: ({node, ...props}) => <li className="text-gray-800" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-indigo-700" {...props} />,
                table: ({node, ...props}) => <div className="overflow-x-auto my-6"><table className="min-w-full divide-y divide-gray-300 border border-gray-200" {...props} /></div>,
                thead: ({node, ...props}) => <thead className="bg-gray-100" {...props} />,
                th: ({node, ...props}) => <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" {...props} />,
                td: ({node, ...props}) => <td className="whitespace-normal px-3 py-4 text-sm text-gray-500 border-t border-gray-200" {...props} />,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500 print:block hidden">
            <p>Generado con Pedagogía Winner - Herramienta de Apoyo Docente con IA</p>
            <p className="mt-1 italic">"La educación es el arma más poderosa que puedes usar para cambiar el mundo."</p>
        </div>
      </div>
    </div>
  );
};
