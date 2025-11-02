'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Layers3, FileText } from 'lucide-react'
import CrearCurso from './Curso/CrearCurso'
import CrearModulo from './Modulo/CrearModulo'
import CrearLeccion from './Leccion/CrearLeccion'

export default function AgregarMaterial() {
  const [activeTab, setActiveTab] = useState('curso')

  // ================= DATOS QUEMADOS (simulación de BD) =================
  const [cursos, setCursos] = useState([
    {
      id: 1,
      titulo: 'Matemáticas Básicas',
      descripcion: 'Aprende las operaciones fundamentales y cómo aplicarlas en la vida real.',
      imagen: 'https://img.freepik.com/free-vector/math-education-background_23-2148148871.jpg',
    },
    {
      id: 2,
      titulo: 'Comunicación Efectiva',
      descripcion: 'Desarrolla habilidades de comunicación para mejorar tus relaciones laborales.',
      imagen: 'https://img.freepik.com/free-vector/flat-communication-concept_23-2148155255.jpg',
    },
    {
      id: 3,
      titulo: 'Liderazgo Empresarial',
      descripcion: 'Conoce las mejores prácticas para dirigir equipos y liderar con éxito.',
      imagen: 'https://img.freepik.com/free-vector/leadership-concept-illustration_114360-1825.jpg',
    },
  ])

  const [modulos, setModulos] = useState([
    {
      id: 1,
      titulo: 'Multiplicación y División',
      descripcion: 'Domina las operaciones básicas y aplica la lógica numérica.',
      imagen: 'https://img.freepik.com/free-vector/numbers-math-education_23-2148174912.jpg',
      curso: 'Matemáticas Básicas',
    },
    {
      id: 2,
      titulo: 'Escucha Activa',
      descripcion: 'Aprende a escuchar con empatía y mejorar la comunicación interpersonal.',
      imagen: 'https://img.freepik.com/free-vector/business-team-communication-illustration_23-2148754002.jpg',
      curso: 'Comunicación Efectiva',
    },
    {
      id: 3,
      titulo: 'Trabajo en Equipo',
      descripcion: 'Descubre cómo colaborar de forma efectiva con tus compañeros.',
      imagen: 'https://img.freepik.com/free-vector/teamwork-concept-illustration_114360-1971.jpg',
      curso: 'Liderazgo Empresarial',
    },
  ])

  const [lecciones, setLecciones] = useState([
    {
      id: 1,
      titulo: 'Lección 1: Introducción a la multiplicación',
      descripcion: 'Conoce los fundamentos de la multiplicación y su importancia.',
      imagen: 'https://img.freepik.com/free-vector/math-education-background_23-2148148871.jpg',
      modulo: 'Multiplicación y División',
      videoUrl: 'https://www.youtube.com/embed/tgbNymZ7vqY',
      archivos: [],
      contenidoTexto:
        'La multiplicación es una de las operaciones básicas más importantes. En esta lección aprenderás su lógica y cómo aplicarla.',
    },
    {
      id: 2,
      titulo: 'Lección 2: Divisiones simples',
      descripcion: 'Aprende cómo dividir de manera sencilla y práctica.',
      imagen: 'https://img.freepik.com/free-vector/math-education-background_23-2148148871.jpg',
      modulo: 'Multiplicación y División',
      videoUrl: '',
      archivos: [],
      contenidoTexto:
        'La división permite repartir cantidades en partes iguales. Comprenderás su relación con la multiplicación.',
    },
    {
      id: 3,
      titulo: 'Lección 1: Cómo escuchar mejor',
      descripcion: 'Mejora tus habilidades de escucha activa en el entorno laboral.',
      imagen: 'https://img.freepik.com/free-vector/flat-communication-concept_23-2148155255.jpg',
      modulo: 'Escucha Activa',
      videoUrl: 'https://www.youtube.com/embed/xvFZjo5PgG0',
      archivos: [],
      contenidoTexto:
        'Escuchar activamente es comprender de verdad al interlocutor. Esta lección te enseñará a hacerlo paso a paso.',
    },
    {
      id: 4,
      titulo: 'Lección 1: Cómo liderar un grupo',
      descripcion: 'Descubre los principios básicos del liderazgo moderno.',
      imagen: 'https://img.freepik.com/free-vector/leadership-concept-illustration_114360-1825.jpg',
      modulo: 'Trabajo en Equipo',
      videoUrl: '',
      archivos: [],
      contenidoTexto:
        'Liderar implica guiar con empatía y dirección clara. Aprenderás a fomentar la colaboración y la confianza.',
    },
  ])

  // ==================== RENDER ====================
  return (
    <div className="min-h-screen bg-white p-10">
      {/* Encabezado */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold text-[#F40009] mb-8"
      >
        Gestión de Materiales
      </motion.h1>

      {/* Navegación de pestañas */}
      <div className="flex space-x-4 border-b border-gray-200 mb-8">
        {[
          { key: 'curso', icon: <BookOpen size={18} />, label: 'Cursos' },
          { key: 'modulo', icon: <Layers3 size={18} />, label: 'Módulos' },
          { key: 'leccion', icon: <FileText size={18} />, label: 'Lecciones' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center px-4 py-2 border-b-2 font-medium transition-colors ${
              activeTab === tab.key
                ? 'border-[#F40009] text-[#F40009]'
                : 'border-transparent text-gray-500 hover:text-[#F40009]'
            }`}
          >
            {tab.icon}
            <span className="ml-2">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Contenido dinámico */}
      <div className="transition-all">
        {activeTab === 'curso' && (
          <CrearCurso cursos={cursos} setCursos={setCursos} />
        )}

        {activeTab === 'modulo' && (
          <CrearModulo modulos={modulos} setModulos={setModulos} cursos={cursos} />
        )}

        {activeTab === 'leccion' && (
          <CrearLeccion
            lecciones={lecciones}
            setLecciones={setLecciones}
            modulos={modulos}
          />
        )}
      </div>
    </div>
  )
}