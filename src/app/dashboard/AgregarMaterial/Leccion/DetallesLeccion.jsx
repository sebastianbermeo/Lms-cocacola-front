'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Video, FileText, CalendarDays, BookOpen } from 'lucide-react'

export default function DetallesLeccion({ open, onClose, leccion }) {
  if (!open || !leccion) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl relative overflow-y-auto max-h-[90vh] border border-gray-200"
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ duration: 0.25 }}
        >
          <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-[#F40009]">
            <X size={22} />
          </button>

          <div className="bg-[#F40009] text-white p-6 rounded-t-2xl">
            <h2 className="text-3xl font-bold mb-1">{leccion.titulo}</h2>
            <p className="text-white/90">{leccion.descripcion}</p>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={leccion.imagen}
                alt={leccion.titulo}
                className="w-full md:w-56 h-56 object-cover rounded-lg shadow-sm border border-gray-200"
              />

              <div className="flex-1 space-y-2 text-gray-700">
                <p>
                  <strong className="text-[#F40009]">Módulo:</strong> {leccion.modulo?.titulo || '—'}
                </p>
                <p>
                  <strong className="text-[#F40009]">Puntos del quiz:</strong>{' '}
                  {leccion.quiz?.puntos ?? 0}
                </p>
                <p>
                  <strong className="text-[#F40009]">Creado el:</strong>{' '}
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays size={15} /> {new Date(leccion.createdAt).toLocaleDateString()}
                  </span>
                </p>
                <p>
                  <strong className="text-[#F40009]">Última actualización:</strong>{' '}
                  {new Date(leccion.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {leccion.videoUrl && (
              <div className="bg-red-50 rounded-xl p-4 border border-[#F40009]/20">
                <h3 className="text-lg font-semibold text-[#F40009] mb-3 flex items-center gap-2">
                  <Video size={20} /> Video de la lección
                </h3>
                <iframe
                  width="100%"
                  height="280"
                  src={leccion.videoUrl.replace('watch?v=', 'embed/')}
                  title="Video de la lección"
                  className="rounded-lg border w-full"
                  allowFullScreen
                />
              </div>
            )}

            {leccion.contenidoTexto && (
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-[#F40009] mb-3 flex items-center gap-2">
                  <BookOpen size={20} /> Contenido de la lección
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {leccion.contenidoTexto}
                </p>
              </div>
            )}

            {Array.isArray(leccion.archivos) && leccion.archivos.length > 0 && (
              <div className="bg-red-50 border border-[#F40009]/20 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-[#F40009] mb-3 flex items-center gap-2">
                  <FileText size={20} /> Archivos adjuntos
                </h3>
                <ul className="list-disc ml-6 text-gray-700">
                  {leccion.archivos.map((archivo, i) => (
                    <li key={i} className="mb-1">
                      <a
                        href={archivo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {archivo.split('/').pop()}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}