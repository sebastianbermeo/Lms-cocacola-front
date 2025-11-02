'use client'
import { motion } from 'framer-motion'
import { ArrowLeft, FileText } from 'lucide-react'

export default function ContenidoLeccion({ leccion, onBack }) {
  if (!leccion)
    return (
      <div className="p-10 text-center text-[#F40009] font-semibold">
        No se encontró contenido para esta lección.
      </div>
    )

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
        Volver a Lecciones
      </motion.button>

      {/* Encabezado */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#F40009] text-white rounded-2xl p-8 mb-10 shadow-md"
      >
        <h1 className="text-3xl font-bold mb-2">{leccion.title}</h1>
        <p className="text-white/80 text-lg">{leccion.description}</p>
      </motion.div>

      {/* Contenido dinámico */}
      <div className="space-y-8">
        {/* Video */}
        {leccion.videoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="rounded-xl overflow-hidden shadow-md border border-gray-200"
          >
            <iframe
              className="w-full aspect-video"
              src={leccion.videoUrl}
              title={leccion.title}
              frameBorder="0"
              allowFullScreen
            />
          </motion.div>
        )}

        {/* Archivo */}
        {leccion.fileUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-between bg-red-50 border border-[#F40009]/20 rounded-xl p-4 shadow-sm"
          >
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
          </motion.div>
        )}

        {/* Texto */}
        {leccion.content && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
          >
            <h4 className="text-lg font-semibold text-[#F40009] mb-2">
              Contenido de la lección
            </h4>
            <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
              {leccion.content}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
