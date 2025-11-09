'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useModulo } from '@/app/hooks/AgregarMaterial/Modulo/useModulo'

export default function VistaModulos({ curso, onBack, onModuloSelect }) {
  const { obtenerModuloPorId } = useModulo()
  const [loading, setLoading] = useState(false)

  const handleSelectModulo = async (moduloId) => {
    setLoading(true)
    const data = await obtenerModuloPorId(moduloId)
    setLoading(false)
    if (data) onModuloSelect(data)
  }

  const modulos = curso?.modulos || []

  return (
    <div className="min-h-screen bg-white p-10">
      <button
        onClick={onBack}
        className="flex items-center text-[#F40009] hover:bg-red-50 px-4 py-2 rounded-full mb-6 transition-all"
      >
        <ArrowLeft className="mr-2" /> Volver a Cursos
      </button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <h1 className="text-3xl font-bold text-[#F40009]">
          Módulos del curso: {curso?.titulo}
        </h1>
      </motion.div>

      {loading ? (
        <div className="text-center text-gray-500 p-10">Cargando módulo...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modulos.map((modulo, index) => (
            <motion.div
              key={modulo.id}
              onClick={() => handleSelectModulo(modulo.id)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group bg-white border border-gray-200 hover:border-[#F40009] shadow-md hover:shadow-xl rounded-2xl overflow-hidden cursor-pointer transition-all"
            >
              <div className="h-40 w-full overflow-hidden">
                <motion.img
                  src={modulo.imagen}
                  alt={modulo.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-[#F40009] transition-colors">
                  {modulo.titulo}
                </h2>
                <p className="text-gray-600 mt-2">{modulo.descripcion}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {!loading && modulos.length === 0 && (
        <div className="text-center text-[#F40009] bg-red-50 rounded-lg p-10 mt-10">
          No hay módulos disponibles para este curso.
        </div>
      )}
    </div>
  )
}