'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useLeccion } from '@/app/hooks/AgregarMaterial/Leccion/useLeccion'

export default function VistaLecciones({ modulo, onBack, onLeccionSelect }) {
  const { obtenerLeccionPorId } = useLeccion()
  const [loading, setLoading] = useState(false)
  const [leccionesCompletas, setLeccionesCompletas] = useState([])

  useEffect(() => {
    const cargarLecciones = async () => {
      if (!modulo?.lecciones) return
      const completas = await Promise.all(
        modulo.lecciones.map(async (l) => {
          const data = await obtenerLeccionPorId(l.id)
          return data || l
        })
      )
      setLeccionesCompletas(completas)
    }
    cargarLecciones()
  }, [modulo])

  const handleSelectLeccion = async (leccionId) => {
    setLoading(true)
    const data = await obtenerLeccionPorId(leccionId)
    setLoading(false)
    if (data) onLeccionSelect(data)
  }

  return (
    <div className="min-h-screen bg-white p-10">
      <button
        onClick={onBack}
        className="flex items-center text-[#F40009] hover:bg-red-50 px-4 py-2 rounded-full mb-6 transition-all"
      >
        <ArrowLeft className="mr-2" /> Volver a Módulos
      </button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <h1 className="text-3xl font-bold text-[#F40009]">
          Lecciones del módulo: {modulo?.titulo}
        </h1>
      </motion.div>

      {loading ? (
        <div className="text-center text-gray-500 p-10">Cargando lección...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leccionesCompletas.map((leccion, index) => {
            const tieneQuiz = !!leccion.quiz
            const puntos = leccion.quiz?.puntos ?? 0
            return (
              <motion.div
                key={leccion.id}
                onClick={() => handleSelectLeccion(leccion.id)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group bg-white border border-gray-200 hover:border-[#F40009] shadow-md hover:shadow-xl rounded-2xl overflow-hidden cursor-pointer transition-all"
              >
                <div className="h-40 w-full overflow-hidden">
                  <motion.img
                    src={leccion.imagen}
                    alt={leccion.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 space-y-3">
                  <h2 className="text-xl font-semibold text-gray-800 group-hover:text-[#F40009] transition-colors">
                    {leccion.titulo}
                  </h2>
                  <p className="text-gray-600 text-sm">{leccion.descripcion}</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="inline-flex items-center text-sm font-semibold text-[#F40009] bg-red-50 border border-[#F40009]/20 rounded-full px-3 py-1">
                      💎 {puntos} puntos
                    </span>
                    {tieneQuiz ? (
                      <span className="text-xs text-green-700 bg-green-50 border border-green-200 rounded-full px-2 py-1">
                        Con evaluación
                      </span>
                    ) : (
                      <span className="text-xs text-gray-600 bg-gray-100 border border-gray-200 rounded-full px-2 py-1">
                        Sin evaluación
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {!loading && leccionesCompletas.length === 0 && (
        <div className="text-center text-[#F40009] bg-red-50 rounded-lg p-10 mt-10">
          No hay lecciones disponibles para este módulo.
        </div>
      )}
    </div>
  )
}