import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { LessonRequest } from '../types';

const getClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

// Helper for standard config
const getModelConfig = () => ({
  model: 'gemini-3-flash-preview',
  config: { thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL } }
});

// 1. Core DUA & STEM Experience
export const generateDuaOverview = async (request: LessonRequest, lang: 'es' | 'en' = 'es'): Promise<string> => {
  const ai = getClient();
  
  let prompt = '';

  if (lang === 'en') {
    prompt = `
      Act as an expert pedagogue. Context: Class of ${request.subject}, Topic: ${request.topic}, Level: ${request.level}, Duration: ${request.duration}. Methodology: ${request.methodology}.
      
      Generate ONLY the "General Strategy and DUA-STEM Approach" section in Markdown in ENGLISH:
      1. 🧠 **DUA Strategies (Universal Design)**: Detail Affective, Recognition, and Strategic Networks specific to this topic.
      2. 🚀 **STEM Integration**: Explain the explicit connection with Science, Technology, Engineering, and Mathematics.
      3. 💡 **Big Idea**: A hook concept for the class.
      
      Be concise, motivating, and use icons. Ensure ALL output is in English.
    `;
  } else {
    prompt = `
      Actúa como experto pedagogo. Contexto: Clase de ${request.subject}, Tema: ${request.topic}, Nivel: ${request.level}, Duración: ${request.duration}. Metodología: ${request.methodology}.
      
      Genera SOLO la sección de "Estrategia General y Enfoque DUA-STEM" en Markdown:
      1. 🧠 **Estrategias DUA (Diseño Universal)**: Detalla Redes Afectivas, De Reconocimiento y Estratégicas específicas para este tema.
      2. 🚀 **Integración STEM**: Explica la conexión explícita con Ciencia, Tecnología, Ingeniería y Matemáticas.
      3. 💡 **Idea Central / "Big Idea"**: Un concepto gancho para la clase.
      
      Sé conciso, motivador y usa iconos.
    `;
  }
  
  const response = await ai.models.generateContent({
    ...getModelConfig(),
    contents: prompt
  });
  return response.text || "";
};

// 2. Learning Objectives
export const generateObjectives = async (request: LessonRequest, lang: 'es' | 'en' = 'es'): Promise<string> => {
  const ai = getClient();
  let prompt = '';

  if (lang === 'en') {
    prompt = `
      Act as an expert pedagogue. Context: Class of ${request.subject}, Topic: ${request.topic}, Level: ${request.level}.
      
      Generate ONLY the "Learning Objectives" section in Markdown in ENGLISH:
      1. 🏆 **General Objective**: Written with a winning mindset.
      2. 🎯 **Specific Objectives**: 3-4 measurable objectives (Bloom/SMART) divided into:
         - Know (Conceptual)
         - Do (Procedural)
         - Be (Attitudinal)
      
      Use bullet points format. Ensure ALL output is in English.
    `;
  } else {
    prompt = `
      Actúa como experto pedagogo. Contexto: Clase de ${request.subject}, Tema: ${request.topic}, Nivel: ${request.level}.
      
      Genera SOLO la sección de "Objetivos de Aprendizaje" en Markdown:
      1. 🏆 **Objetivo General**: Redactado con mentalidad ganadora.
      2. 🎯 **Objetivos Específicos**: 3-4 objetivos medibles (Bloom/SMART) divididos en:
         - Saber (Conceptual)
         - Hacer (Procedimental)
         - Ser (Actitudinal)
      
      Usa formato de lista bullet points.
    `;
  }
  
  const response = await ai.models.generateContent({
    ...getModelConfig(),
    contents: prompt
  });
  return response.text || "";
};

// 3. Didactic Sequence
export const generateSequence = async (request: LessonRequest, lang: 'es' | 'en' = 'es'): Promise<string> => {
  const ai = getClient();
  let prompt = '';

  if (lang === 'en') {
    prompt = `
      Act as an expert pedagogue. Context: Class of ${request.subject}, Topic: ${request.topic}, Duration: ${request.duration}. Methodology: ${request.methodology}.
      
      Generate ONLY the "Didactic Sequence" step-by-step in Markdown in ENGLISH. Divide the total time (${request.duration}) logically:
      
      1. **Start (Engagement/Activation)**: Minutes, activity, resources.
      2. **Development (Exploration/Explanation)**: Minutes, main activity using ${request.methodology}.
      3. **Close (Reflection/Evaluation)**: Minutes, exit ticket or synthesis.
      
      Clear format with bold text for times. Ensure ALL output is in English.
    `;
  } else {
    prompt = `
      Actúa como experto pedagogo. Contexto: Clase de ${request.subject}, Tema: ${request.topic}, Duración: ${request.duration}. Metodología: ${request.methodology}.
      
      Genera SOLO la "Secuencia Didáctica" paso a paso en Markdown. Divide el tiempo total (${request.duration}) lógicamente:
      
      1. **Inicio (Enganche/Activación)**: Minutos, actividad, recursos.
      2. **Desarrollo (Exploración/Explicación)**: Minutos, actividad principal usando ${request.methodology}.
      3. **Cierre (Reflexión/Evaluación)**: Minutos, ticket de salida o síntesis.
      
      Formato claro con negritas para los tiempos.
    `;
  }
  
  const response = await ai.models.generateContent({
    ...getModelConfig(),
    contents: prompt
  });
  return response.text || "";
};

// 4. Rubric
export const generateRubric = async (request: LessonRequest, lang: 'es' | 'en' = 'es'): Promise<string> => {
  const ai = getClient();
  let prompt = '';

  if (lang === 'en') {
    prompt = `
      Act as an expert pedagogue. Context: Class of ${request.subject}, Topic: ${request.topic}.
      
      Generate ONLY an "Evaluation Rubric" in Markdown Table format in ENGLISH.
      Columns: Evaluation Criteria | Expert (10) | Competent (8) | Apprentice (6) | Novice (4).
      Rows: 3-4 criteria relevant to the topic and the methodology ${request.methodology}.
      
      Add a brief suggestion for an evaluation instrument at the end (e.g., Checklist, Kahoot, etc.). Ensure ALL output is in English.
    `;
  } else {
    prompt = `
      Actúa como experto pedagogo. Contexto: Clase de ${request.subject}, Tema: ${request.topic}.
      
      Genera SOLO una "Rúbrica de Evaluación" en formato Tabla Markdown.
      Columnas: Criterio de Evaluación | Experto (10) | Competente (8) | Aprendiz (6) | Novato (4).
      Filas: 3-4 criterios relevantes al tema y la metodología ${request.methodology}.
      
      Agrega al final una breve sugerencia de instrumento de evaluación (ej: Lista de cotejo, Kahoot, etc).
    `;
  }
  
  const response = await ai.models.generateContent({
    ...getModelConfig(),
    contents: prompt
  });
  return response.text || "";
};