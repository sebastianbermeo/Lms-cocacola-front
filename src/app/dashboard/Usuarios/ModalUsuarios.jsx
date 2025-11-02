'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Eye, EyeOff, Image as ImgIcon } from 'lucide-react'

export default function ModalUsuarios({ onClose, onGuardar, usuario }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    displayName: '',
    rolId: 2,
    foto: '',
  })

  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (usuario) {
      setForm({
        email: usuario.email,
        password: '',
        displayName: usuario.displayName,
        rolId: usuario.rolId,
        foto: usuario.foto || '',
        id: usuario.id,
      })
    }
  }, [usuario])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onGuardar(form)
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative"
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={22} />
        </button>

        {/* Encabezado */}
        <h2 className="text-2xl font-bold text-[#F40009] mb-6">
          {usuario ? 'Editar Usuario' : 'Registrar Usuario'}
        </h2>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre completo <span className="text-[#F40009]">*</span>
            </label>
            <input
              type="text"
              name="displayName"
              value={form.displayName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 placeholder:text-gray-400 bg-white focus:ring-2 focus:ring-[#F40009]"
              placeholder="Ejemplo: Sebastian Torres"
            />
          </div>

          {/* Correo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico <span className="text-[#F40009]">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 placeholder:text-gray-400 bg-white focus:ring-2 focus:ring-[#F40009]"
              placeholder="sebastian@gmail.com"
            />
          </div>

          {/* Contraseña (solo al crear) */}
          {!usuario && (
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña <span className="text-[#F40009]">*</span>
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 placeholder:text-gray-400 bg-white focus:ring-2 focus:ring-[#F40009]"
                placeholder="••••••••"
              />

              {/* Ícono del ojo */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500 hover:text-[#F40009] transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          )}

          {/* Imagen de perfil */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Foto de perfil (URL)
            </label>
            <div className="flex items-center space-x-2">
              <ImgIcon className="text-gray-500" size={20} />
              <input
                type="url"
                name="foto"
                value={form.foto}
                onChange={handleChange}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 placeholder:text-gray-400 bg-white focus:ring-2 focus:ring-[#F40009]"
                placeholder="https://mi-foto.com/avatar.jpg"
              />
            </div>

            {form.foto && (
              <img
                src={form.foto}
                alt="Vista previa"
                className="mt-3 w-20 h-20 rounded-full border object-cover"
              />
            )}
          </div>

          {/* Rol */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rol <span className="text-[#F40009]">*</span>
            </label>
            <select
              name="rolId"
              value={form.rolId}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 bg-white focus:ring-2 focus:ring-[#F40009]"
            >
              <option value={1}>Admin</option>
              <option value={2}>User</option>
            </select>
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-[#F40009] text-white hover:bg-red-700"
            >
              {usuario ? 'Guardar Cambios' : 'Registrar Usuario'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}