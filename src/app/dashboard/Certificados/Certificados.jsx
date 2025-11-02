'use client'
import { motion } from 'framer-motion'
import { Download, Eye } from 'lucide-react'
import Image from 'next/image'

export default function Certificados() {
  const certificados = [
    {
      id: 1,
      curso: 'Matemáticas',
      descripcion: 'Completó satisfactoriamente el curso de Matemáticas.',
      fecha: '15 de junio de 2025',
      archivo: '/certificado-matematicas.pdf'
    },
    {
      id: 2,
      curso: 'Liderazgo',
      descripcion: 'Demostró habilidades destacadas en liderazgo y gestión de equipos.',
      fecha: '2 de julio de 2025',
      archivo: '/certificado-liderazgo.pdf'
    },
    {
      id: 3,
      curso: 'Comunicación Efectiva',
      descripcion: 'Finalizó exitosamente el curso de Comunicación Efectiva.',
      fecha: '12 de septiembre de 2025',
      archivo: '/certificado-comunicacion.pdf'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#fff5f5] p-10">
      {/* Encabezado */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h1 className="text-4xl font-bold text-[#F40009] mb-3">Mis Certificados</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Estos certificados acreditan tu compromiso y éxito en los programas de formación de Coca-Cola Learning.
        </p>
      </motion.div>

      {/* Tarjetas tipo diploma */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10">
        {certificados.map((certificado, index) => (
          <motion.div
            key={certificado.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="relative bg-white rounded-3xl p-8 shadow-xl border border-[#F40009]/10 hover:border-[#F40009]/40 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
          >
            {/* Marca decorativa */}
            <div className="absolute inset-0 bg-gradient-to-br from-white to-red-50 opacity-70 rounded-3xl pointer-events-none" />

            {/* Contenido principal */}
            <div className="relative z-10 text-center flex flex-col items-center">
              <Image
                src="/Img/Coca-Cola_logo.png"
                alt="Coca-Cola Logo"
                width={120}
                height={40}
                className="mb-4"
              />

              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {certificado.curso}
              </h3>

              <p className="text-gray-600 text-sm mb-4 max-w-xs">
                {certificado.descripcion}
              </p>

              <div className="w-24 h-[2px] bg-[#F40009]/40 mb-4" />

              <p className="text-gray-500 text-xs italic">
                Otorgado el {certificado.fecha}
              </p>
            </div>

            {/* Botones inferiores */}
            <div className="relative z-10 mt-6 flex justify-center space-x-4">
              <motion.a
                href={certificado.archivo}
                download
                whileHover={{ scale: 1.05 }}
                className="flex items-center px-5 py-2 bg-[#F40009] text-white rounded-full text-sm shadow-md hover:bg-red-700 transition-all"
              >
                <Download size={16} className="mr-2" />
                Descargar
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => alert(`Vista previa de ${certificado.curso}`)}
                className="flex items-center px-5 py-2 border border-[#F40009] text-[#F40009] rounded-full text-sm hover:bg-red-50 transition-all"
              >
                <Eye size={16} className="mr-2" />
                Ver
              </motion.button>
            </div>

            {/* Borde decorativo tipo diploma */}
            <div className="absolute inset-0 rounded-3xl border-[3px] border-[#F40009]/20 pointer-events-none"></div>
            <div className="absolute inset-[6px] rounded-3xl border border-[#F40009]/10 pointer-events-none"></div>
          </motion.div>
        ))}
      </div>

      {/* Si no hay certificados */}
      {certificados.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 bg-red-50 rounded-2xl mt-10"
        >
          <p className="text-[#F40009] text-lg font-medium">
            Aún no tienes certificados disponibles.
          </p>
        </motion.div>
      )}
    </div>
  )
}