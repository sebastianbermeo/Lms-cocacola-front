'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, PlayCircle, ChevronDown, ChevronUp, FileText } from 'lucide-react'

export default function Lecciones({ modulo, onBack }) {
  // Ejemplo de diferentes tipos de lecciones
  const leccionesPorModulo = {
    Multiplicación: [
      {
        id: 1,
        title: 'Lección 1: Conceptos Básicos',
        description: 'Conoce los fundamentos de la multiplicación y cómo aplicarlos.',
        videoUrl: 'https://www.youtube.com/embed/tgbNymZ7vqY',
        content:
          'La multiplicación es una operación matemática que consiste en sumar un número tantas veces como indica otro número. Por ejemplo, 3 × 4 = 12.',
      },
      {
        id: 2,
        title: 'Lección 2: Ejercicios Prácticos',
        description: 'Resuelve ejercicios interactivos paso a paso.',
        fileUrl: '/ejercicios-multiplicacion.pdf',
        content:
          'En este documento encontrarás ejercicios prácticos con soluciones paso a paso para reforzar tus habilidades en multiplicación.',
      },
      {
        id: 3,
        title: 'Lección 3: Aplicaciones en la vida real',
        description: 'Aprende cómo la multiplicación se aplica en escenarios reales.',
        videoUrl: 'https://www.youtube.com/embed/xvFZjo5PgG0',
        fileUrl: '/multiplicacion-avanzada.pdf',
        content:
          'La multiplicación se usa en la economía, la ingeniería y las ciencias para modelar relaciones proporcionales y escalas de crecimiento.',
      },
    ],
    División: [
      {
        id: 1,
        title: 'Lección 1: Conceptos básicos de la división',
        description: 'Aprende qué es dividir y cómo hacerlo correctamente.',
        content:
          'La división consiste en repartir una cantidad en partes iguales. Por ejemplo, 12 ÷ 4 = 3. Es el proceso inverso a la multiplicación.',
      },
    ],
  }

  const lecciones = leccionesPorModulo[modulo?.title] || []
  const [leccionActiva, setLeccionActiva] = useState(null)

  const toggleLeccion = (id) => {
    setLeccionActiva(leccionActiva === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-white p-10">
      {/* Botón volver */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
        className="flex items-center text-[#F40009] hover:bg-red-50 px-4 py-2 rounded-full mb-8 shadow-sm transition-all"
      >
        <ArrowLeft className="mr-2" />
        Volver a Módulos
      </motion.button>

      {/* Encabezado */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#F40009] text-white rounded-2xl p-8 mb-10 shadow-md"
      >
        <h1 className="text-3xl font-bold mb-2">
          {modulo?.title ? `Lecciones del módulo: ${modulo.title}` : 'Lecciones'}
        </h1>
        <p className="text-white/80 text-lg">
          Explora los videos, archivos y contenido de cada lección.
        </p>
      </motion.div>

      {/* Lista de lecciones */}
      <div className="space-y-6">
        {lecciones.map((leccion, index) => (
          <motion.div
            key={leccion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all"
          >
            {/* Botón principal */}
            <button
              onClick={() => toggleLeccion(leccion.id)}
              className="w-full flex justify-between items-center text-left p-6 bg-white rounded-2xl hover:bg-red-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <PlayCircle className="text-[#F40009]" size={28} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {leccion.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {leccion.description}
                  </p>
                </div>
              </div>
              {leccionActiva === leccion.id ? (
                <ChevronUp className="text-[#F40009]" />
              ) : (
                <ChevronDown className="text-gray-500" />
              )}
            </button>

            {/* Contenido expandido */}
            <AnimatePresence>
              {leccionActiva === leccion.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden px-6 pb-6"
                >
                  {/* Video */}
                  {leccion.videoUrl && (
                    <div className="rounded-xl overflow-hidden shadow-md mt-4 border border-gray-200">
                      <iframe
                        className="w-full aspect-video"
                        src={leccion.videoUrl}
                        title={leccion.title}
                        frameBorder="0"
                        allowFullScreen
                      />
                    </div>
                  )}

                  {/* Archivo */}
                  {leccion.fileUrl && (
                    <div className="flex items-center justify-between bg-red-50 border border-[#F40009]/20 rounded-xl p-4 mt-4">
                      <div className="flex items-center space-x-3">
                        <FileText className="text-[#F40009]" size={24} />
                        <p className="text-gray-700 text-sm">
                          Archivo disponible para esta lección
                        </p>
                      </div>
                      <a
                        href={leccion.fileUrl}
                        download
                        className="bg-[#F40009] text-white px-4 py-2 rounded-full text-sm hover:bg-red-700 transition-all"
                      >
                        Descargar
                      </a>
                    </div>
                  )}

                  {/* Contenido en texto */}
                  {leccion.content && (
                    <div className="bg-white border border-gray-200 rounded-xl p-6 mt-4 shadow-sm">
                      <h4 className="text-lg font-semibold text-[#F40009] mb-2">
                        Contenido de la lección
                      </h4>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {leccion.content}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Si no hay lecciones */}
      {lecciones.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-red-50 rounded-2xl mt-10"
        >
          <p className="text-[#F40009] text-lg font-medium">
            No hay lecciones disponibles para este módulo.
          </p>
        </motion.div>
      )}
    </div>
  )
}