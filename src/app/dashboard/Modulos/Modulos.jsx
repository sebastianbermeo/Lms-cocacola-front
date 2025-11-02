'use client'
import { motion } from 'framer-motion'
import { PlayCircle, CheckCircle } from 'lucide-react'

export default function Modulos({ curso, onModuloSelect, onBack }) {
  // Módulos específicos por curso
  const modulosPorCurso = {
    Matemáticas: [
      {
        id: 1,
        title: 'Multiplicación',
        description: 'Aprende a multiplicar de manera eficiente con distintos métodos.',
        progreso: 65,
        image: '/multiplicacion.jpg'
      },
      {
        id: 2,
        title: 'División',
        description: 'Domina la división y su aplicación práctica en problemas reales.',
        progreso: 30,
        image: '/division.jpg'
      }
    ],
    Lenguaje: [
      {
        id: 3,
        title: 'Gramática Moderna',
        description: 'Domina las reglas del español formal y su estructura gramatical.',
        progreso: 50,
        image: '/gramatica.jpg'
      },
      {
        id: 4,
        title: 'Lectura Crítica',
        description: 'Analiza textos con profundidad y mejora tu comprensión lectora.',
        progreso: 20,
        image: '/lectura.jpg'
      }
    ],
    Liderazgo: [
      {
        id: 5,
        title: 'Gestión de Equipos',
        description: 'Aprende a liderar, motivar y potenciar a tu equipo de trabajo.',
        progreso: 80,
        image: '/liderazgo.jpg'
      },
      {
        id: 6,
        title: 'Cultura Coca-Cola',
        description: 'Conoce los valores y filosofía de liderazgo de nuestra marca.',
        progreso: 100,
        image: '/cultura.jpg'
      }
    ]
  }

  const modulos = modulosPorCurso[curso?.title] || []

  const renderStatusIcon = (progreso) => {
    if (progreso === 100) return <CheckCircle className="text-green-500 w-6 h-6" />
    if (progreso > 0) return <PlayCircle className="text-[#F40009] w-6 h-6" />
    return <PlayCircle className="text-gray-400 w-6 h-6" />
  }

  return (
    <div className="min-h-screen bg-white p-10">
      {/* Botón volver */}
      <button
        onClick={onBack}
        className="flex items-center text-[#F40009] hover:bg-red-50 px-4 py-2 rounded-full mb-6 transition-all"
      >
        ← Volver a Cursos
      </button>

      {/* Encabezado */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <h1 className="text-3xl font-bold text-[#F40009]">
          {curso?.title ? `Módulos del curso ${curso.title}` : 'Módulos del Curso'}
        </h1>
        <p className="text-gray-600 mt-2">
          Selecciona un módulo para continuar con las lecciones.
        </p>
      </motion.div>

      {/* Grid de módulos */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {modulos.map((modulo, index) => (
          <motion.div
            key={modulo.id}
            onClick={() => onModuloSelect(modulo)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group bg-white border border-gray-200 hover:border-[#F40009] shadow-md hover:shadow-xl rounded-2xl overflow-hidden cursor-pointer transition-all"
          >
            {/* Imagen */}
            <div className="h-40 w-full overflow-hidden">
              <motion.img
                src={modulo.image}
                alt={modulo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Contenido */}
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-[#F40009] transition-colors">
                  {modulo.title}
                </h2>
                {renderStatusIcon(modulo.progreso)}
              </div>

              <p className="text-gray-600 mb-4">{modulo.description}</p>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${modulo.progreso}%` }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className={`h-2 rounded-full ${
                    modulo.progreso === 100 ? 'bg-green-500' : 'bg-[#F40009]'
                  }`}
                />
              </div>

              <div className="flex justify-between text-sm text-gray-500">
                <span>Lecciones disponibles</span>
                <span className="font-medium text-[#F40009]">
                  {modulo.progreso}% completado
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Si no hay módulos */}
      {modulos.length === 0 && (
        <div className="text-center text-[#F40009] bg-red-50 rounded-lg p-10 mt-10">
          No hay módulos disponibles para este curso.
        </div>
      )}
    </div>
  )
}