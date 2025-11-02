'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import FiltroUsuarios from './FiltroUsuarios'
import TablaUsuarios from './TablaUsuarios'
import ModalUsuarios from './ModalUsuarios'

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, email: 'admin@coca-cola.com', displayName: 'Administrador', rolId: 1, activo: true },
    { id: 2, email: 'user@coca-cola.com', displayName: 'Juan Pérez', rolId: 2, activo: true },
    { id: 3, email: 'inactivo@coca-cola.com', displayName: 'Carlos Ruiz', rolId: 2, activo: false },
  ])

  const [filtroRol, setFiltroRol] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')
  const [usuarioEditando, setUsuarioEditando] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const roles = { 1: 'Admin', 2: 'User' }

  // Filtrar por búsqueda o rol
  const usuariosFiltrados = usuarios.filter((u) => {
    const coincideRol = filtroRol === 'Todos' || roles[u.rolId] === filtroRol
    const coincideBusqueda =
      u.displayName.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.email.toLowerCase().includes(busqueda.toLowerCase())
    return coincideRol && coincideBusqueda
  })

  const handleGuardarUsuario = (usuario) => {
    if (usuario.id) {
      setUsuarios(
        usuarios.map((u) => (u.id === usuario.id ? { ...u, ...usuario } : u))
      )
    } else {
      setUsuarios([
        ...usuarios,
        { ...usuario, id: usuarios.length + 1, activo: true },
      ])
    }
    setModalOpen(false)
    setUsuarioEditando(null)
  }

  const handleEditar = (usuario) => {
    setUsuarioEditando(usuario)
    setModalOpen(true)
  }

  const handleToggleActivo = (id) => {
    setUsuarios(
      usuarios.map((u) =>
        u.id === id ? { ...u, activo: !u.activo } : u
      )
    )
  }

  return (
    <div className="min-h-screen bg-white p-10">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold text-[#F40009] mb-8"
      >
        Gestión de Usuarios
      </motion.h1>

      <FiltroUsuarios
        onBuscar={setBusqueda}
        onFiltrar={setFiltroRol}
        onAgregar={() => {
          setUsuarioEditando(null)
          setModalOpen(true)
        }}
      />

      <TablaUsuarios
        usuarios={usuariosFiltrados}
        onEditar={handleEditar}
        onToggleActivo={handleToggleActivo}
      />

      {modalOpen && (
        <ModalUsuarios
          onClose={() => {
            setModalOpen(false)
            setUsuarioEditando(null)
          }}
          onGuardar={handleGuardarUsuario}
          usuario={usuarioEditando}
        />
      )}
    </div>
  )
}