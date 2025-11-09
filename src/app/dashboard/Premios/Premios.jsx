'use client'
import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Gift, Coins } from 'lucide-react'
import { useLogin } from '@/app/hooks/auth/useLogin'

export default function Premios() {
  const [vista, setVista] = useState('disponibles')
  const [canjeados, setCanjeados] = useState([])
  const [usuarioActivo, setUsuarioActivo] = useState(null)
  const { getUserData } = useLogin()

  // 🔹 Cargar usuario y mantener actualizado
  const cargarUsuario = useCallback(async () => {
    const stored = localStorage.getItem('user')
    const parsed = stored ? JSON.parse(stored) : null
    if (!parsed?.id) return
    const updated = await getUserData(parsed.id)
    if (updated) setUsuarioActivo(updated)
  }, [getUserData])

  useEffect(() => {
    cargarUsuario()
    const interval = setInterval(cargarUsuario, 30000)
    return () => clearInterval(interval)
  }, [cargarUsuario])

  const premios = [
    { id: 1, nombre: 'Coca-Cola 3L', puntos: 800, imagen: '/Img/premios/cocacola3l.png' },
    { id: 2, nombre: 'Mochila Coca-Cola', puntos: 1200, imagen: '/Img/premios/mochila.png' },
    { id: 3, nombre: 'Gorra edición especial', puntos: 600, imagen: '/Img/premios/gorra.png' },
    { id: 4, nombre: 'Botella metálica Coca-Cola', puntos: 1000, imagen: '/Img/premios/botella.png' },
  ]

  const canjearPremio = (premio) => {
    if ((usuarioActivo?.points ?? 0) < premio.puntos) {
      alert('No tienes suficientes puntos para canjear este premio.')
      return
    }

    const nuevosPuntos = usuarioActivo.points - premio.puntos
    setUsuarioActivo({ ...usuarioActivo, points: nuevosPuntos })
    setCanjeados([...canjeados, premio])
    alert(`Has canjeado ${premio.nombre} 🎉`)
  }

  const renderPremios = (lista, canjear = true) => (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 mt-10">
      {lista.map((premio, index) => (
        <motion.div
          key={premio.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-3xl shadow-xl border border-[#F40009]/10 hover:border-[#F40009]/40 transition-all duration-500 flex flex-col justify-between items-center p-6 relative"
        >
          <Image
            src={premio.imagen}
            alt={premio.nombre}
            width={150}
            height={150}
            className="object-contain mb-4"
          />
          <h3 className="text-lg font-bold text-gray-800">{premio.nombre}</h3>
          <p className="text-[#F40009] font-semibold mt-2 flex items-center">
            <Coins size={18} className="mr-1 text-yellow-500" /> {premio.puntos} puntos
          </p>

          {canjear && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => canjearPremio(premio)}
              className="mt-4 px-6 py-2 bg-[#F40009] text-white rounded-full text-sm shadow-md hover:bg-red-700 transition-all"
            >
              Canjear
            </motion.button>
          )}
        </motion.div>
      ))}

      {lista.length === 0 && (
        <div className="col-span-full text-center py-20 bg-red-50 rounded-2xl mt-10">
          <p className="text-[#F40009] text-lg font-medium">
            {canjear ? 'No hay premios disponibles.' : 'Aún no has canjeado ningún premio.'}
          </p>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#fff5f5] p-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-bold text-[#F40009] mb-3">Mis Premios</h1>
        <p className="text-gray-600 text-lg">
          Canjea tus puntos por productos exclusivos de Coca-Cola.
        </p>

        <div className="mt-5 flex justify-center items-center gap-2">
          <Coins size={22} className="text-yellow-500" />
          <p className="text-gray-700 text-lg font-medium">
            Tus puntos: <span className="text-[#F40009] font-bold">{usuarioActivo?.points ?? 0}</span>
          </p>
        </div>
      </motion.div>

      <div className="flex justify-center space-x-6 mb-6">
        <button
          onClick={() => setVista('disponibles')}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
            vista === 'disponibles'
              ? 'bg-[#F40009] text-white shadow-md'
              : 'border border-[#F40009] text-[#F40009] hover:bg-red-50'
          }`}
        >
          🏆 Premios disponibles
        </button>
        <button
          onClick={() => setVista('canjeados')}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
            vista === 'canjeados'
              ? 'bg-[#F40009] text-white shadow-md'
              : 'border border-[#F40009] text-[#F40009] hover:bg-red-50'
          }`}
        >
          🎁 Premios canjeados
        </button>
      </div>

      {vista === 'disponibles'
        ? renderPremios(premios)
        : renderPremios(canjeados, false)}
    </div>
  )
}