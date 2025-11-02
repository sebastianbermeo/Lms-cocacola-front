'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function PlantillaCertificado({ nombre, curso, fecha }) {
  return (
    <div className="relative w-full max-w-3xl mx-auto bg-white border-4 border-[#F40009] rounded-3xl p-10 shadow-xl text-center">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <Image
          src="/coca-cola-logo-red.png"
          alt="Coca-Cola Logo"
          width={180}
          height={60}
        />
      </div>

      {/* Título */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-[#F40009] mb-4"
      >
        Certificado de Finalización
      </motion.h1>

      {/* Nombre */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-2xl font-semibold text-gray-800 mb-4"
      >
        Otorgado a:
      </motion.p>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-4xl font-bold text-[#F40009] mb-6"
      >
        {nombre}
      </motion.h2>

      {/* Detalles del curso */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="text-gray-700 text-lg mb-6"
      >
        Por haber completado satisfactoriamente el curso de{' '}
        <span className="font-semibold text-gray-900">{curso}</span>.
      </motion.p>

      {/* Fecha y firma */}
      <div className="mt-10 flex flex-col items-center space-y-2">
        <div className="w-48 h-[2px] bg-gray-400" />
        <p className="text-gray-600 text-sm">Coca-Cola Learning Division</p>
        <p className="text-gray-500 text-sm mt-2">{fecha}</p>
      </div>

      {/* Marca de agua */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <h1 className="text-[6rem] font-extrabold text-[#F40009]/5 select-none">
          COCA-COLA
        </h1>
      </div>
    </div>
  )
}