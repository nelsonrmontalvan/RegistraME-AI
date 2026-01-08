import { Methodology } from './types';
import { 
  Gamepad2, 
  RefreshCcw, 
  Users, 
  Lightbulb, 
  Cpu 
} from 'lucide-react';
import React from 'react';

export const METHODOLOGIES: Methodology[] = [
  {
    id: 'flipped',
    name: 'Aula Invertida',
    description: 'El estudiante estudia la teoría en casa y practica en clase.',
    icon: 'refresh',
    color: 'bg-blue-600'
  },
  {
    id: 'gamification',
    name: 'Gamificación',
    description: 'Uso de mecánicas de juego para motivar y facilitar el aprendizaje.',
    icon: 'gamepad',
    color: 'bg-purple-600'
  },
  {
    id: 'pbl',
    name: 'ABP (Proyectos)',
    description: 'Aprendizaje basado en resolver retos o problemas reales.',
    icon: 'users',
    color: 'bg-green-600'
  },
  {
    id: 'inquiry',
    name: 'Indagación STEM',
    description: 'Construcción de conocimiento a través de preguntas y experimentación.',
    icon: 'lightbulb',
    color: 'bg-orange-500'
  },
  {
    id: 'maker',
    name: 'Cultura Maker',
    description: 'Aprender haciendo, construyendo y prototipando soluciones.',
    icon: 'cpu',
    color: 'bg-pink-600'
  }
];

export const ICONS: Record<string, React.ReactNode> = {
  refresh: <RefreshCcw size={32} />,
  gamepad: <Gamepad2 size={32} />,
  users: <Users size={32} />,
  lightbulb: <Lightbulb size={32} />,
  cpu: <Cpu size={32} />
};
