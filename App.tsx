import React, { useState, useEffect } from 'react';
import { EducationLevel, LessonRequest, MasterPlan } from './types';
import { 
  generateDuaOverview, 
  generateObjectives, 
  generateSequence, 
  generateRubric 
} from './services/geminiService';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { MethodologySelector } from './components/MethodologySelector';
import { PlanDisplay } from './components/PlanDisplay';
import { Sidebar } from './components/Sidebar';
import { Rocket, Sparkles, Clock, BookOpen, GraduationCap, School, Menu, Lock, CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dua-stem');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Core Form Data
  const [formData, setFormData] = useState<Partial<LessonRequest>>({
    level: EducationLevel.SECONDARY
  });
  
  // Tracks if the user has completed the initial "Generate" step
  const [isContextSet, setIsContextSet] = useState(false);

  // Modular Content State
  const [masterPlan, setMasterPlan] = useState<MasterPlan>({
    duaContent: null,
    objectivesContent: null,
    sequenceContent: null,
    rubricContent: null
  });

  // 1. Handle DUA & STEM (Initial) Generation
  const handleGenerateCore = async () => {
    if (!formData.subject || !formData.topic || !formData.duration || !formData.methodology) {
      setError("Por favor completa todos los campos requeridos para comenzar.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await generateDuaOverview(formData as LessonRequest);
      setMasterPlan(prev => ({ ...prev, duaContent: result }));
      setIsContextSet(true); // Unlock other tabs
    } catch (err) {
      setError("Error generando contenido. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Generic handler for other sections
  const handleGenerateSection = async (
    sectionKey: keyof MasterPlan, 
    generatorFn: (req: LessonRequest) => Promise<string>
  ) => {
    if (!isContextSet) return;
    setLoading(true);
    setError(null);
    try {
      const result = await generatorFn(formData as LessonRequest);
      setMasterPlan(prev => ({ ...prev, [sectionKey]: result }));
    } catch (err) {
      setError("Error generando la sección. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // Compile full view for PDF
  const getFullContent = () => {
    const parts = [
      `# Planificación: ${formData.topic || 'Sin título'} \n\n`,
      `**Materia:** ${formData.subject} | **Nivel:** ${formData.level} \n\n`,
      masterPlan.duaContent ? `## I. Experiencia DUA & STEM\n${masterPlan.duaContent}\n\n` : '',
      masterPlan.objectivesContent ? `## II. Objetivos de Aprendizaje\n${masterPlan.objectivesContent}\n\n` : '',
      masterPlan.sequenceContent ? `## III. Secuencia Didáctica\n${masterPlan.sequenceContent}\n\n` : '',
      masterPlan.rubricContent ? `## IV. Rúbrica de Evaluación\n${masterPlan.rubricContent}\n\n` : ''
    ];
    return parts.join('');
  };

  // Render helpers
  const renderEmptyState = (title: string, action: () => void, btnText: string) => (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in border-2 border-dashed border-white/10 rounded-xl bg-white/5">
       <Sparkles className="text-winner-gold w-12 h-12 mb-4" />
       <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
       <p className="text-gray-400 mb-6 text-center max-w-md">Utilizaremos los datos de tu lección ({formData.subject} - {formData.topic}) para generar esta sección.</p>
       <button 
         onClick={action}
         className="px-6 py-3 bg-winner-purple hover:bg-winner-pink rounded-lg font-bold text-white transition-all shadow-lg flex items-center"
       >
         <Rocket size={18} className="mr-2" />
         {btnText}
       </button>
    </div>
  );

  const renderLockedState = () => (
    <div className="flex flex-col items-center justify-center h-[50vh] text-center p-8 animate-fade-in">
       <div className="bg-red-500/10 p-6 rounded-full mb-6 border border-red-500/30">
         <Lock className="text-red-400 w-12 h-12" />
       </div>
       <h2 className="text-2xl font-bold text-white mb-3">Sección Bloqueada</h2>
       <p className="text-gray-400 max-w-md mb-6">
         Para desbloquear los Objetivos, Secuencia y Rúbrica, primero debes definir y generar la 
         <strong className="text-winner-green cursor-pointer ml-1" onClick={() => setActiveTab('dua-stem')}>
           Experiencia DUA & STEM
         </strong>.
       </p>
       <button 
         onClick={() => setActiveTab('dua-stem')}
         className="text-winner-teal hover:underline font-bold"
       >
         Ir al paso 1 &rarr;
       </button>
    </div>
  );

  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center py-20 min-h-[50vh]">
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute top-0 w-full h-full border-4 border-winner-purple/30 rounded-full"></div>
        <div className="absolute top-0 w-full h-full border-4 border-t-winner-green rounded-full animate-spin"></div>
      </div>
      <h2 className="text-xl font-bold text-white animate-pulse">Consultando RegistraME AI...</h2>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-winner-dark font-sans text-white overflow-hidden">
      
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 relative overflow-y-auto h-screen w-full">
        {/* Background Elements */}
        <div className="fixed inset-0 bg-gradient-to-br from-winner-dark via-[#1e1b4b] to-[#312e81] z-0 pointer-events-none"></div>
        <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-winner-pink/10 rounded-full blur-[100px] z-0 pointer-events-none"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 md:px-8">
          
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between mb-8">
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-white/10 rounded-lg">
              <Menu size={24} />
            </button>
            <span className="font-serif font-bold text-xl">RegistraME</span>
            <div className="w-10"></div>
          </div>

          {/* Desktop Title */}
          <header className="hidden md:block mb-8 border-b border-white/10 pb-4">
             <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-extrabold text-white font-serif tracking-tight">
                    {activeTab === 'dua-stem' && "1. Configuración & DUA-STEM"}
                    {activeTab === 'objectives' && "2. Objetivos de Aprendizaje"}
                    {activeTab === 'sequence' && "3. Secuencia Didáctica"}
                    {activeTab === 'rubric' && "4. Rúbrica de Evaluación"}
                    {activeTab === 'full-view' && "Vista Global / Exportar"}
                  </h1>
                  <p className="text-gray-400 text-sm mt-1">
                    {isContextSet && `Trabajando en: ${formData.subject} - ${formData.topic}`}
                  </p>
                </div>
                {isContextSet && (
                   <span className="px-3 py-1 bg-winner-green/20 text-winner-green border border-winner-green/30 rounded-full text-xs font-bold flex items-center">
                     <CheckCircle2 size={12} className="mr-1" /> Proyecto Activo
                   </span>
                )}
             </div>
          </header>

          {loading ? renderLoading() : (
            <>
               {error && (
                  <div className="mb-6 p-4 bg-red-500/20 border border-red-500 text-white rounded-lg">
                    {error}
                  </div>
                )}

               {/* TAB 1: DUA & STEM (The Form) */}
               {activeTab === 'dua-stem' && (
                 <div className="animate-fade-in">
                    {/* Only show form if plan not generated or if user wants to edit (could add edit mode later, for now always show form at top) */}
                    <div className="glass-panel rounded-2xl p-6 shadow-2xl mb-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase">Asignatura</label>
                          <div className="relative"><BookOpen className="absolute left-3 top-3 text-gray-500" size={16} />
                            <input type="text" className="w-full bg-[#13112b] border border-gray-700 rounded-lg py-2.5 pl-10 text-white focus:border-winner-teal outline-none" placeholder="Ej: Biología" value={formData.subject || ''} onChange={(e) => setFormData({...formData, subject: e.target.value})} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase">Tema</label>
                          <div className="relative"><Sparkles className="absolute left-3 top-3 text-gray-500" size={16} />
                            <input type="text" className="w-full bg-[#13112b] border border-gray-700 rounded-lg py-2.5 pl-10 text-white focus:border-winner-teal outline-none" placeholder="Ej: La Célula" value={formData.topic || ''} onChange={(e) => setFormData({...formData, topic: e.target.value})} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase">Nivel</label>
                          <div className="relative"><GraduationCap className="absolute left-3 top-3 text-gray-500" size={16} />
                             <select className="w-full bg-[#13112b] border border-gray-700 rounded-lg py-2.5 pl-10 text-white focus:border-winner-teal outline-none" value={formData.level} onChange={(e) => setFormData({...formData, level: e.target.value as EducationLevel})}>
                               {Object.values(EducationLevel).map(l => <option key={l} value={l} className="bg-winner-dark">{l}</option>)}
                             </select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase">Tiempo</label>
                          <div className="relative"><Clock className="absolute left-3 top-3 text-gray-500" size={16} />
                            <input type="text" className="w-full bg-[#13112b] border border-gray-700 rounded-lg py-2.5 pl-10 text-white focus:border-winner-teal outline-none" placeholder="Ej: 90 min" value={formData.duration || ''} onChange={(e) => setFormData({...formData, duration: e.target.value})} />
                          </div>
                        </div>
                        <div className="md:col-span-2 space-y-2">
                           <label className="text-xs font-bold text-gray-400 uppercase">Contexto</label>
                           <textarea className="w-full bg-[#13112b] border border-gray-700 rounded-lg p-3 text-white focus:border-winner-teal outline-none" rows={2} placeholder="Opcional: Descripción del grupo..." value={formData.context || ''} onChange={(e) => setFormData({...formData, context: e.target.value})} />
                        </div>
                      </div>
                      
                      <div className="mt-8">
                         <h3 className="text-sm font-bold text-gray-400 uppercase mb-4">Selecciona Metodología</h3>
                         <MethodologySelector selectedId={formData.methodology || null} onSelect={(id) => setFormData({...formData, methodology: id})} />
                      </div>

                      <div className="flex justify-end mt-6">
                        <button onClick={handleGenerateCore} className="px-8 py-3 bg-gradient-to-r from-winner-pink to-winner-purple rounded-xl font-bold text-white shadow-lg hover:shadow-winner-purple/50 transition-all flex items-center">
                           <Sparkles size={18} className="mr-2" />
                           {masterPlan.duaContent ? 'Regenerar Estrategia DUA' : 'Generar Estrategia DUA'}
                        </button>
                      </div>
                    </div>
                    
                    {masterPlan.duaContent && (
                       <PlanDisplay content={masterPlan.duaContent} onReset={() => {}} />
                    )}
                 </div>
               )}

               {/* TAB 2: OBJECTIVES */}
               {activeTab === 'objectives' && (
                  !isContextSet ? renderLockedState() : (
                    masterPlan.objectivesContent 
                      ? <PlanDisplay content={masterPlan.objectivesContent} onReset={() => setMasterPlan(p => ({...p, objectivesContent: null}))} />
                      : renderEmptyState("Definición de Objetivos", () => handleGenerateSection('objectivesContent', generateObjectives), "Generar Objetivos")
                  )
               )}

               {/* TAB 3: SEQUENCE */}
               {activeTab === 'sequence' && (
                  !isContextSet ? renderLockedState() : (
                    masterPlan.sequenceContent 
                      ? <PlanDisplay content={masterPlan.sequenceContent} onReset={() => setMasterPlan(p => ({...p, sequenceContent: null}))} />
                      : renderEmptyState("Diseño de Secuencia Didáctica", () => handleGenerateSection('sequenceContent', generateSequence), "Generar Secuencia")
                  )
               )}

               {/* TAB 4: RUBRIC */}
               {activeTab === 'rubric' && (
                  !isContextSet ? renderLockedState() : (
                    masterPlan.rubricContent 
                      ? <PlanDisplay content={masterPlan.rubricContent} onReset={() => setMasterPlan(p => ({...p, rubricContent: null}))} />
                      : renderEmptyState("Creación de Rúbrica", () => handleGenerateSection('rubricContent', generateRubric), "Generar Rúbrica")
                  )
               )}

               {/* TAB 5: FULL VIEW */}
               {activeTab === 'full-view' && (
                  !isContextSet ? renderLockedState() : (
                    <div className="animate-fade-in">
                       <DisclaimerBanner />
                       <PlanDisplay content={getFullContent()} onReset={() => setActiveTab('dua-stem')} />
                    </div>
                  )
               )}

            </>
          )}

        </div>
      </main>
    </div>
  );
};

export default App;
