import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Printer, Copy, Check, Download, Share2, Heart, MessageCircle, Mail } from 'lucide-react';

interface Props {
  content: string;
  onReset: () => void;
}

export const PlanDisplay: React.FC<Props> = ({ content, onReset }) => {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  
  // Reset like state when content changes
  useEffect(() => {
    setLiked(false);
  }, [content]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    // @ts-ignore - html2pdf is often used without types in simple projects
    const html2pdf = (await import('html2pdf.js')).default;
    const element = document.getElementById('plan-content');
    if (!element) return;

    const opt = {
      margin: 1,
      filename: `Planificacion_${new Date().getTime()}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in' as const, format: 'letter' as const, orientation: 'portrait' as const }
    };

    html2pdf().from(element).set(opt).save();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    // Here we could save to localStorage or send an event if we had analytics
    if (!liked) {
      // Simple visual feedback could be added here
    }
  };

  const handleShareWhatsApp = () => {
    // WhatsApp limits URL length, so we truncate efficiently
    const summary = content.substring(0, 1500) + (content.length > 1500 ? '...' : '');
    const text = `*Planificación Generada con RegistraME AI*\n\n${summary}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Planificación RegistraME AI',
          text: content,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      handleCopy();
      alert('La función de compartir nativa no está disponible en este dispositivo. El texto ha sido copiado al portapapeles.');
    }
  };

  const handleFeedback = () => {
    window.open('mailto:soporte@registrame.ai?subject=Feedback sobre Planificación Generada', '_blank');
  };

  return (
    <div className="animate-fade-in pb-20">
      
      {/* Action Bar */}
      <div className="flex flex-col xl:flex-row justify-between items-center mb-6 no-print gap-4">
        <button 
          onClick={onReset}
          className="flex items-center text-gray-400 hover:text-white transition-colors self-start xl:self-auto"
        >
          <ArrowLeft size={20} className="mr-2" />
          Volver al diseño
        </button>

        <div className="flex flex-wrap gap-3 w-full xl:w-auto justify-center xl:justify-end">
          {/* Social / Interaction Group */}
          <div className="flex items-center bg-white/5 rounded-lg p-1 border border-white/10">
             <button
               onClick={handleLike}
               className={`p-2 rounded-md transition-all ${liked ? 'text-pink-500 bg-pink-500/10' : 'text-gray-400 hover:text-pink-400 hover:bg-white/5'}`}
               title="Me gusta esta planificación"
             >
               <Heart size={20} fill={liked ? "currentColor" : "none"} />
             </button>
             <div className="w-px h-6 bg-white/10 mx-1"></div>
             <button
               onClick={handleShareWhatsApp}
               className="p-2 rounded-md text-gray-400 hover:text-green-400 hover:bg-white/5 transition-all"
               title="Compartir en WhatsApp"
             >
               <MessageCircle size={20} />
             </button>
             <button
               onClick={handleNativeShare}
               className="p-2 rounded-md text-gray-400 hover:text-blue-400 hover:bg-white/5 transition-all"
               title="Compartir (Nativo)"
             >
               <Share2 size={20} />
             </button>
             <div className="w-px h-6 bg-white/10 mx-1"></div>
             <button
               onClick={handleFeedback}
               className="p-2 rounded-md text-gray-400 hover:text-yellow-400 hover:bg-white/5 transition-all"
               title="Enviar Comentarios"
             >
               <Mail size={20} />
             </button>
          </div>

          {/* Utility Group */}
          <button 
            onClick={handleCopy}
            className={`flex items-center justify-center px-4 py-2 rounded-lg font-bold transition-all shadow-lg text-white border border-white/10 min-w-[140px]
              ${copied 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-[#2e2b52] hover:bg-[#3a3666]'
              }`}
          >
            {copied ? <Check size={18} className="mr-2" /> : <Copy size={18} className="mr-2" />}
            {copied ? '¡Copiado!' : 'Copiar'}
          </button>

          <button 
            onClick={handleDownloadPDF}
            className="flex items-center justify-center px-4 py-2 bg-winner-pink hover:bg-pink-600 rounded-lg font-bold transition-all shadow-lg text-white"
          >
            <Download size={18} className="mr-2" />
            Descargar PDF
          </button>

          <button 
            onClick={handlePrint}
            className="flex items-center justify-center px-4 py-2 bg-winner-purple hover:bg-indigo-600 rounded-lg font-bold transition-all shadow-lg text-white"
          >
            <Printer size={18} className="mr-2" />
            Imprimir
          </button>
        </div>
      </div>

      {/* Content Paper */}
      <div id="plan-content" className="bg-white text-gray-900 rounded-xl shadow-2xl p-8 md:p-14 max-w-4xl mx-auto print:shadow-none print:p-0 print:max-w-none print:mx-0">
        
        {/* Academic Header */}
        <div className="border-b-4 border-winner-gold pb-6 mb-10 flex justify-between items-start">
            <div>
                <h1 className="text-3xl md:text-4xl font-extrabold font-serif text-winner-dark uppercase tracking-wider leading-tight">
                Planificación Académica
                </h1>
                <p className="text-winner-purple font-bold mt-2 text-sm md:text-base">
                  Diseño Universal para el Aprendizaje (DUA) & STEM
                </p>
            </div>
            <div className="hidden md:flex h-16 w-16 bg-winner-dark rounded-xl items-center justify-center text-winner-gold font-bold text-3xl shadow-lg print:border print:border-gray-300">
                W
            </div>
        </div>

        {/* Markdown Content */}
        <div className="prose prose-lg max-w-none 
          prose-headings:font-serif prose-headings:text-winner-dark 
          prose-p:text-gray-700 prose-p:leading-relaxed
          prose-strong:text-winner-purple prose-strong:font-bold
          prose-ul:list-disc prose-li:marker:text-winner-gold
          prose-blockquote:border-l-4 prose-blockquote:border-winner-purple prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-gray-600
          print:prose-sm
          ">
          <ReactMarkdown 
            components={{
                h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-[#1a103c] mb-6 mt-10 border-b pb-2" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-[#2d2a4a] mb-4 mt-8 flex items-center" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl font-bold text-[#ec4899] mb-3 mt-6 uppercase tracking-wide text-sm" {...props} />,
                ul: ({node, ...props}) => <ul className="space-y-2 mb-6 ml-4" {...props} />,
                li: ({node, ...props}) => <li className="text-gray-800 pl-2" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-[#4f46e5]" {...props} />,
                table: ({node, ...props}) => (
                  <div className="overflow-x-auto my-8 rounded-lg border border-gray-200 shadow-sm">
                    <table className="min-w-full divide-y divide-gray-300" {...props} />
                  </div>
                ),
                thead: ({node, ...props}) => <thead className="bg-[#f8fafc]" {...props} />,
                th: ({node, ...props}) => <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider" {...props} />,
                td: ({node, ...props}) => <td className="whitespace-normal px-4 py-4 text-sm text-gray-600 border-t border-gray-100 leading-normal" {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-winner-teal bg-teal-50/50 p-4 my-6 rounded-r-lg" {...props} />
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-6 border-t border-gray-100 text-center text-xs text-gray-400 flex justify-between items-center print:text-black">
            <span>Generado con <strong>RegistraME AI</strong></span>
            <span className="italic">"La educación es el arma más poderosa que puedes usar para cambiar el mundo."</span>
        </div>
      </div>

      {/* Bottom Download Button */}
      <div className="mt-12 flex flex-col items-center justify-center space-y-4 no-print">
        <button 
          onClick={handleDownloadPDF}
          className="group relative flex items-center px-10 py-5 bg-gradient-to-r from-winner-purple to-winner-pink rounded-full font-bold text-xl text-white shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:shadow-[0_0_60px_rgba(236,72,153,0.6)] transition-all transform hover:-translate-y-1 hover:scale-105"
        >
          <div className="absolute inset-0 bg-white/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <Download size={28} className="mr-3 relative z-10" />
          <span className="relative z-10">Descargar Planificación (PDF)</span>
        </button>
        <p className="text-winner-purple/50 text-xs font-bold tracking-widest uppercase">Listo para imprimir o guardar</p>
      </div>
    </div>
  );
};