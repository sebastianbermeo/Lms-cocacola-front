'use client'
import { motion } from 'framer-motion'
import { PlayCircle, CheckCircle } from 'lucide-react'

export default function Cursos({ onCursoSelect }) {
  const cursos = [
    {
      id: 1,
      title: 'Matemáticas',
      description: 'Aprende los fundamentos y aplica técnicas avanzadas para resolver problemas.',
      totalModulos: 3,
      progreso: 65,
      image: '/math.jpg'
    },
    {
      id: 2,
      title: 'Lenguaje',
      description: 'Desarrolla tus habilidades de comunicación y comprensión lectora.',
      totalModulos: 2,
      progreso: 35,
      image: '/language.jpg'
    },
    {
      id: 3,
      title: 'Liderazgo',
      description: 'Fortalece tus capacidades de liderazgo y gestión de equipos.',
      totalModulos: 4,
      progreso: 100,
      image: '/leadership.jpg'
    }
  ]

  const renderStatusIcon = (progreso) => {
    if (progreso === 100) return <CheckCircle className="text-green-500 w-6 h-6" />
    if (progreso > 0) return <PlayCircle className="text-[#F40009] w-6 h-6" />
    return <PlayCircle className="text-gray-400 w-6 h-6" />
  }

  return (
    <div className="min-h-screen bg-white p-10">
      {/* Título */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <h1 className="text-3xl font-bold text-[#F40009]">Cursos Disponibles</h1>
        <p className="text-gray-600 mt-2">
          Explora nuestros programas de formación y continúa tu desarrollo profesional.
        </p>
      </motion.div>

      {/* Grid de cursos */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
        {cursos.map((curso, index) => (
          <motion.div
            key={curso.id}
            onClick={() => onCursoSelect(curso)} // 👈 envía el curso seleccionado al layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group relative bg-white border border-gray-200 hover:border-[#F40009] shadow-md hover:shadow-xl rounded-2xl overflow-hidden cursor-pointer transition-all"
          >
            {/* Imagen del curso */}
            <div className="h-40 w-full overflow-hidden">
              <motion.img
                src={curso.image}
                alt={curso.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Contenido */}
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-[#F40009] transition-colors">
                  {curso.title}
                </h2>
                {renderStatusIcon(curso.progreso)}
              </div>

              <p className="text-gray-600 mb-4">{curso.description}</p>

              {/* Barra de progreso */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${curso.progreso}%` }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className={`h-2 rounded-full ${
                    curso.progreso === 100 ? 'bg-green-500' : 'bg-[#F40009]'
                  }`}
                />
              </div>

              <div className="flex justify-between text-sm text-gray-500">
                <span>{curso.totalModulos} módulos</span>
                <span className="font-medium text-[#F40009]">
                  {curso.progreso}% completado
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}