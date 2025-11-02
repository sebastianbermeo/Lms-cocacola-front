'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Save, RotateCcw } from 'lucide-react'
import TablaModulos from './TablaModulos' // ✅ ahora usamos la tabla correcta

export default function CrearModulo({ modulos = [], setModulos = () => {}, cursos = [] }) {
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    imagen: '',
    curso: '',
  })
  const [editando, setEditando] = useState(false)
  const [filtroCurso, setFiltroCurso] = useState('Todos')

  // 🔍 Filtrado de módulos
  const modulosFiltrados =
    filtroCurso === 'Todos'
      ? modulos
      : modulos.filter((m) => m.curso === filtroCurso)

  // 💾 Guardar o actualizar módulo
  const guardarModulo = () => {
    if (!form.titulo.trim() || !form.descripcion.trim() || !form.imagen.trim() || !form.curso) {
      alert('Por favor, completa todos los campos obligatorios.')
      return
    }

    if (editando) {
      setModulos((prev) => prev.map((m) => (m.id === form.id ? { ...form } : m)))
      setEditando(false)
    } else {
      setModulos([...modulos, { id: Date.now(), ...form }])
    }

    setForm({ titulo: '', descripcion: '', imagen: '', curso: '' })
  }

  const editarModulo = (modulo) => {
    setForm(modulo)
    setEditando(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const eliminarModulo = (id) => {
    if (confirm('¿Seguro que deseas eliminar este módulo?')) {
      setModulos(modulos.filter((m) => m.id !== id))
    }
  }

  const cancelarEdicion = () => {
    setEditando(false)
    setForm({ titulo: '', descripcion: '', imagen: '', curso: '' })
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        {editando ? 'Editar módulo' : 'Crear nuevo módulo'}
      </h2>

      {/* ==================== SECCIÓN 1: DATOS DEL MÓDULO ==================== */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-8">
        <h3 className="text-lg font-semibold text-[#F40009] mb-4">🧩 Datos del módulo</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título <span className="text-[#F40009]">*</span>
            </label>
            <input
              type="text"
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              placeholder="Ejemplo: Comunicación efectiva"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-[#F40009] outline-none"
            />
          </div>

          {/* Curso asociado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Curso asociado <span className="text-[#F40009]">*</span>
            </label>
            <select
              value={form.curso}
              onChange={(e) => setForm({ ...form, curso: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 bg-white focus:ring-2 focus:ring-[#F40009] outline-none"
            >
              <option value="">Seleccionar curso</option>
              {Array.isArray(cursos) &&
                cursos.map((c) => (
                  <option key={c.id} value={c.titulo}>
                    {c.titulo}
                  </option>
                ))}
            </select>
          </div>

          {/* Descripción */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción <span className="text-[#F40009]">*</span>
            </label>
            <textarea
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
              rows={3}
              placeholder="Breve descripción del módulo..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-[#F40009] outline-none resize-none"
            />
          </div>

          {/* Imagen */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Imagen de la tarjeta <span className="text-[#F40009]">*</span>
            </label>
            <input
              type="text"
              value={form.imagen}
              onChange={(e) => setForm({ ...form, imagen: e.target.value })}
              placeholder="https://..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-[#F40009] outline-none"
            />
            {form.imagen && (
              <img src={form.imagen} alt="Preview" className="mt-2 rounded-lg w-full h-32 object-cover border" />
            )}
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end space-x-3 mt-6">
          {editando && (
            <button
              onClick={cancelarEdicion}
              className="flex items-center border border-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-100 transition-all"
            >
              <RotateCcw size={18} className="mr-2" /> Cancelar
            </button>
          )}
          <button
            onClick={guardarModulo}
            className="flex items-center bg-[#F40009] text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-all"
          >
            {editando ? (
              <>
                <Save size={18} className="mr-2" /> Guardar cambios
              </>
            ) : (
              <>
                <Plus size={18} className="mr-2" /> Agregar módulo
              </>
            )}
          </button>
        </div>
      </div>

      {/* ==================== FILTRO ==================== */}
      <div className="flex items-center justify-end mb-4">
        <label className="text-sm text-gray-600 font-medium mr-2">Filtrar por curso:</label>
        <select
          value={filtroCurso}
          onChange={(e) => setFiltroCurso(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800 bg-white focus:ring-2 focus:ring-[#F40009] outline-none"
        >
          <option value="Todos">Todos</option>
          {Array.isArray(cursos) &&
            cursos.map((c) => (
              <option key={c.id} value={c.titulo}>
                {c.titulo}
              </option>
            ))}
        </select>
      </div>

      {/* ==================== TABLA ==================== */}
      <TablaModulos modulos={modulosFiltrados} onEdit={editarModulo} onDelete={(row) => eliminarModulo(row.id)} />
    </motion.div>
  )
}