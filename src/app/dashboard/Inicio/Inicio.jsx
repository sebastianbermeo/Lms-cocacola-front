'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { BookOpen, Award, FileText, ArrowRight } from 'lucide-react'

export default function Inicio({ onNavigate }) {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden p-10 flex flex-col items-center justify-center">
      {/* Burbujas decorativas animadas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3, scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute top-20 left-20 w-64 h-64 bg-[#F40009]/10 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25, scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-20 right-20 w-80 h-80 bg-[#F40009]/20 rounded-full blur-3xl"
      />

      {/* Contenido principal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-3xl mx-auto"
      >
        <Image
          src="/Img/gif.gif"
          alt="Coca-Cola Logo"
          width={200}
          height={70}
          className="mx-auto mb-8"
        />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold text-[#F40009] mb-4"
        >
          ¡Bienvenido, <span className="text-gray-800">Juan Pérez</span>!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-gray-600 text-lg md:text-xl leading-relaxed mb-10"
        >
          Tu espacio de aprendizaje Coca-Cola —  
          impulsa tus habilidades, explora nuevos conocimientos y alcanza tus metas.
        </motion.p>

        {/* Botón principal */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('cursos')}
          className="bg-[#F40009] text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-red-700 transition-all flex items-center justify-center mx-auto space-x-2"
        >
          <span>Explorar Cursos</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>

      {/* Cards de resumen */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="grid md:grid-cols-3 gap-8 mt-14 w-full max-w-5xl relative z-10"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white border border-gray-200 shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:border-[#F40009] hover:shadow-xl transition-all"
        >
          <div className="bg-[#F40009]/10 p-4 rounded-full mb-4">
            <BookOpen className="text-[#F40009]" size={36} />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Cursos Activos</h3>
          <p className="text-gray-600 text-sm">
            Descubre los programas disponibles para tu crecimiento profesional.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white border border-gray-200 shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:border-[#F40009] hover:shadow-xl transition-all"
        >
          <div className="bg-[#F40009]/10 p-4 rounded-full mb-4">
            <FileText className="text-[#F40009]" size={36} />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Progreso</h3>
          <p className="text-gray-600 text-sm">
            Monitorea tus avances y completa tus módulos paso a paso.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white border border-gray-200 shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:border-[#F40009] hover:shadow-xl transition-all"
        >
          <div className="bg-[#F40009]/10 p-4 rounded-full mb-4">
            <Award className="text-[#F40009]" size={36} />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Certificaciones</h3>
          <p className="text-gray-600 text-sm">
            Obtén reconocimientos por cada curso completado con éxito.
          </p>
        </motion.div>
      </motion.div>

      {/* Marca de fondo sutil */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.07 }}
        transition={{ delay: 1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <h1 className="text-9xl font-extrabold text-[#F40009]/10 select-none">
          COCA-COLA
        </h1>
      </motion.div>
    </div>
  )
}