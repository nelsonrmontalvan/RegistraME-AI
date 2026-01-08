import { GoogleGenAI } from "@google/genai";
import { LessonRequest } from '../types';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

// Helper for standard config
const getModelConfig = () => ({
  model: 'gemini-3-flash-preview',
  config: { thinkingConfig: { thinkingBudget: 0 } }
});

// 1. Core DUA & STEM Experience
export const generateDuaOverview = async (request: LessonRequest): Promise<string> => {
  const ai = getClient();
  const prompt = `
    Actúa como experto pedagogo. Contexto: Clase de ${request.subject}, Tema: ${request.topic}, Nivel: ${request.level}, Duración: ${request.duration}. Metodología: ${request.methodology}.
    
    Genera SOLO la sección de "Estrategia General y Enfoque DUA-STEM" en Markdown:
    1. 🧠 **Estrategias DUA (Diseño Universal)**: Detalla Redes Afectivas, De Reconocimiento y Estratégicas específicas para este tema.
    2. 🚀 **Integración STEM**: Explica la conexión explícita con Ciencia, Tecnología, Ingeniería y Matemáticas.
    3. 💡 **Idea Central / "Big Idea"**: Un concepto gancho para la clase.
    
    Sé conciso, motivador y usa iconos.
  `;
  
  const response = await ai.models.generateContent({
    ...getModelConfig(),
    contents: prompt
  });
  return response.text || "";
};

// 2. Learning Objectives
export const generateObjectives = async (request: LessonRequest): Promise<string> => {
  const ai = getClient();
  const prompt = `
    Actúa como experto pedagogo. Contexto: Clase de ${request.subject}, Tema: ${request.topic}, Nivel: ${request.level}.
    
    Genera SOLO la sección de "Objetivos de Aprendizaje" en Markdown:
    1. 🏆 **Objetivo General**: Redactado con mentalidad ganadora.
    2. 🎯 **Objetivos Específicos**: 3-4 objetivos medibles (Bloom/SMART) divididos en:
       - Saber (Conceptual)
       - Hacer (Procedimental)
       - Ser (Actitudinal)
    
    Usa formato de lista bullet points.
  `;
  
  const response = await ai.models.generateContent({
    ...getModelConfig(),
    contents: prompt
  });
  return response.text || "";
};

// 3. Didactic Sequence
export const generateSequence = async (request: LessonRequest): Promise<string> => {
  const ai = getClient();
  const prompt = `
    Actúa como experto pedagogo. Contexto: Clase de ${request.subject}, Tema: ${request.topic}, Duración: ${request.duration}. Metodología: ${request.methodology}.
    
    Genera SOLO la "Secuencia Didáctica" paso a paso en Markdown. Divide el tiempo total (${request.duration}) lógicamente:
    
    1. **Inicio (Enganche/Activación)**: Minutos, actividad, recursos.
    2. **Desarrollo (Exploración/Explicación)**: Minutos, actividad principal usando ${request.methodology}.
    3. **Cierre (Reflexión/Evaluación)**: Minutos, ticket de salida o síntesis.
    
    Formato claro con negritas para los tiempos.
  `;
  
  const response = await ai.models.generateContent({
    ...getModelConfig(),
    contents: prompt
  });
  return response.text || "";
};

// 4. Rubric
export const generateRubric = async (request: LessonRequest): Promise<string> => {
  const ai = getClient();
  const prompt = `
    Actúa como experto pedagogo. Contexto: Clase de ${request.subject}, Tema: ${request.topic}.
    
    Genera SOLO una "Rúbrica de Evaluación" en formato Tabla Markdown.
    Columnas: Criterio de Evaluación | Experto (10) | Competente (8) | Aprendiz (6) | Novato (4).
    Filas: 3-4 criterios relevantes al tema y la metodología ${request.methodology}.
    
    Agrega al final una breve sugerencia de instrumento de evaluación (ej: Lista de cotejo, Kahoot, etc).
  `;
  
  const response = await ai.models.generateContent({
    ...getModelConfig(),
    contents: prompt
  });
  return response.text || "";
};
