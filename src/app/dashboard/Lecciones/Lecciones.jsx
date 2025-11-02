'use client'
import { motion } from 'framer-motion'
import { ArrowLeft, PlayCircle } from 'lucide-react'

export default function Lecciones({ modulo, onBack, onLeccionSelect }) {
  const leccionesPorModulo = {
    Multiplicación: [
      {
        id: 1,
        title: 'Lección 1: Conceptos Básicos',
        description: 'Conoce los fundamentos de la multiplicación y cómo aplicarlos.',
        image: '/leccion1.jpg',
        videoUrl: 'https://www.youtube.com/embed/tgbNymZ7vqY',
        content:
          'La multiplicación es una operación matemática que consiste en sumar un número tantas veces como indica otro número. Por ejemplo, 3 × 4 = 12.',
      },
      {
        id: 2,
        title: 'Lección 2: Ejercicios Prácticos',
        description: 'Resuelve ejercicios interactivos paso a paso.',
        image: '/leccion2.jpg',
        fileUrl: '/ejercicios-multiplicacion.pdf',
        content:
          'En este documento encontrarás ejercicios prácticos con soluciones paso a paso para reforzar tus habilidades en multiplicación.',
      },
      {
        id: 3,
        title: 'Lección 3: Aplicaciones en la vida real',
        description: 'Aprende cómo la multiplicación se aplica en escenarios reales.',
        image: '/leccion3.jpg',
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
        image: '/division-leccion.jpg',
        content:
          'La división consiste en repartir una cantidad en partes iguales. Por ejemplo, 12 ÷ 4 = 3. Es el proceso inverso a la multiplicación.',
      },
    ],
  }

  const lecciones = leccionesPorModulo[modulo?.title] || []

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
          Selecciona una lección para ver su contenido completo.
        </p>
      </motion.div>

      {/* Grid de lecciones */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {lecciones.map((leccion, index) => (
          <motion.div
            key={leccion.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onLeccionSelect(leccion)}
            className="group bg-white border border-gray-200 hover:border-[#F40009] shadow-md hover:shadow-xl rounded-2xl overflow-hidden cursor-pointer transition-all"
          >
            {/* Imagen superior */}
            {leccion.image && (
              <div className="h-40 w-full overflow-hidden">
                <motion.img
                  src={leccion.image}
                  alt={leccion.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}

            {/* Contenido */}
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-3">
                <PlayCircle className="text-[#F40009]" size={28} />
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-[#F40009] transition-colors">
                  {leccion.title}
                </h3>
              </div>

              <p className="text-gray-600 text-sm">{leccion.description}</p>
            </div>
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