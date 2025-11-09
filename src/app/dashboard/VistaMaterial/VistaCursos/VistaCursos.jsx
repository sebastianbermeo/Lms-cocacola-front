'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useCurso } from '@/app/hooks/AgregarMaterial/Curso/useCurso'

export default function VistaCursos({ onCursoSelect }) {
  const { cursos, obtenerCursos, loading, obtenerCursoPorId } = useCurso()
  const [listaCursos, setListaCursos] = useState([])

  useEffect(() => {
    obtenerCursos()
  }, [])

  useEffect(() => {
    setListaCursos(cursos)
  }, [cursos])

  const handleSelectCurso = async (cursoId) => {
    const data = await obtenerCursoPorId(cursoId)
    if (data) onCursoSelect(data)
  }

  if (loading)
    return <div className="text-center text-gray-500 p-10">Cargando cursos...</div>

  return (
    <div className="min-h-screen bg-white p-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <h1 className="text-3xl font-bold text-[#F40009]">Cursos Disponibles</h1>
        <p className="text-gray-600 mt-2">Selecciona un curso para ver sus módulos.</p>
      </motion.div>

      {listaCursos.length === 0 ? (
        <div className="text-center text-[#F40009] bg-red-50 rounded-lg p-10 mt-10">
          No hay cursos disponibles.
        </div>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {listaCursos.map((curso, index) => (
            <motion.div
              key={curso.id}
              onClick={() => handleSelectCurso(curso.id)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative bg-white border border-gray-200 hover:border-[#F40009] shadow-md hover:shadow-xl rounded-2xl overflow-hidden cursor-pointer transition-all"
            >
              <div className="h-40 w-full overflow-hidden">
                <motion.img
                  src={curso.imagen}
                  alt={curso.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-[#F40009] transition-colors">
                  {curso.titulo}
                </h2>
                <p className="text-gray-600 mt-2 mb-4 line-clamp-3">{curso.descripcion}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
