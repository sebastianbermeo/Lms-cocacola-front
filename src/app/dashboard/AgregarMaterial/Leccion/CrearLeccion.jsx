'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Save, RotateCcw, Upload, Trash2 } from 'lucide-react'
import { useLeccion } from '@/app/hooks/AgregarMaterial/Leccion/useLeccion'

export default function CrearLeccion({ modulos = [], onGuardar, leccionEditando, onCancelarEdicion }) {
  const { crearLeccion, editarLeccion, eliminarLeccion, obtenerLecciones } = useLeccion()
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    imagen: '',
    videoUrl: '',
    archivos: [],
    contenidoTexto: '',
    moduloId: '',
    puntos: '',            // 👈 nuevo campo en el estado
  })
  const [editando, setEditando] = useState(false)

  useEffect(() => {
    if (leccionEditando) {
      setForm({
        titulo: leccionEditando.titulo || '',
        descripcion: leccionEditando.descripcion || '',
        imagen: leccionEditando.imagen || '',
        videoUrl: leccionEditando.videoUrl || '',
        archivos: leccionEditando.archivos || [],
        contenidoTexto: leccionEditando.contenidoTexto || '',
        moduloId: leccionEditando.modulo?.id || '',
        puntos: leccionEditando.puntos ?? '',     // 👈 traer puntos al editar
      })
      setEditando(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setEditando(false)
      setForm({
        titulo: '',
        descripcion: '',
        imagen: '',
        videoUrl: '',
        archivos: [],
        contenidoTexto: '',
        moduloId: '',
        puntos: '',          // 👈 reset puntos
      })
    }
  }, [leccionEditando])

  const handleArchivosChange = (e) => {
    const files = Array.from(e.target.files)
    const pdfs = files.filter((file) => file.type === 'application/pdf')
    if (pdfs.length !== files.length) {
      alert('Solo puedes subir archivos PDF.')
      return
    }
    setForm({ ...form, archivos: pdfs.map((f) => f.name) })
  }

  const limpiarArchivos = () => setForm({ ...form, archivos: [] })

  const guardarLeccion = async () => {
    // Validaciones mínimas
    if (!form.titulo || !form.descripcion || !form.imagen || !form.contenidoTexto || !form.moduloId) {
      alert('Por favor, completa todos los campos obligatorios.')
      return
    }
    if (form.puntos === '' || isNaN(Number(form.puntos)) || Number(form.puntos) < 0) {
      alert('Por favor, ingresa un valor de puntos válido (0 o mayor).')
      return
    }

    const payload = {
      ...form,
      moduloId: Number(form.moduloId),
      puntos: Number(form.puntos),   // 👈 asegurar número
    }

    if (editando) {
      await onGuardar({ ...payload, id: leccionEditando.id })
      setEditando(false)
      onCancelarEdicion()
    } else {
      await onGuardar(payload)
    }

    setForm({
      titulo: '',
      descripcion: '',
      imagen: '',
      videoUrl: '',
      archivos: [],
      contenidoTexto: '',
      moduloId: '',
      puntos: '',
    })
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        {editando ? 'Editar lección' : 'Crear nueva lección'}
      </h2>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-8">
        <h3 className="text-lg font-semibold text-[#F40009] mb-4">🧩 Datos de la tarjeta</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título <span className="text-[#F40009]">*</span>
            </label>
            <input
              type="text"
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-[#F40009] outline-none"
              placeholder="Ejemplo: Escucha activa"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Módulo asociado <span className="text-[#F40009]">*</span>
            </label>
            <select
              value={form.moduloId}
              onChange={(e) => setForm({ ...form, moduloId: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 bg-white focus:ring-2 focus:ring-[#F40009] outline-none"
            >
              <option value="">Seleccionar módulo</option>
              {modulos.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.titulo}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción <span className="text-[#F40009]">*</span>
            </label>
            <textarea
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-[#F40009] outline-none resize-none"
              placeholder="Breve descripción visible en la tarjeta de la lección."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Imagen de la tarjeta <span className="text-[#F40009]">*</span>
            </label>
            <input
              type="text"
              value={form.imagen}
              onChange={(e) => setForm({ ...form, imagen: e.target.value })}
              placeholder="https://..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-[#F40009] outline-none"
            />
            {form.imagen && (
              <img
                src={form.imagen}
                alt="Previsualización"
                className="mt-2 rounded-lg w-full h-32 object-cover border"
              />
            )}
          </div>

          {/* Campo de puntos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Puntos por completar <span className="text-[#F40009]">*</span>
            </label>
            <input
              type="number"
              min={0}
              step={1}
              value={form.puntos}
              onChange={(e) => setForm({ ...form, puntos: e.target.value })}
              placeholder="Ej: 10"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-[#F40009] outline-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold text-[#F40009] mb-4">📖 Contenido de la lección</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Video (opcional)</label>
            <input
              type="text"
              value={form.videoUrl}
              onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
              placeholder="https://youtube.com/embed/..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-[#F40009] outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Archivos adicionales (PDF)</label>
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center bg-[#F40009] hover:bg-red-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-all">
                <Upload size={18} className="mr-2" /> Subir archivos
                <input type="file" multiple accept="application/pdf" onChange={handleArchivosChange} className="hidden" />
              </label>

              {form.archivos.length > 0 && (
                <>
                  <span className="text-gray-600 text-sm">
                    {form.archivos.length} archivo(s) seleccionado(s)
                  </span>
                  <button
                    onClick={limpiarArchivos}
                    className="flex items-center border border-gray-300 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-all"
                  >
                    <Trash2 size={16} className="mr-1" /> Limpiar
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Texto explicativo <span className="text-[#F40009]">*</span>
            </label>
            <textarea
              value={form.contenidoTexto}
              onChange={(e) => setForm({ ...form, contenidoTexto: e.target.value })}
              rows={5}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-[#F40009] outline-none resize-none"
              placeholder="Contenido o explicación completa de la lección..."
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          {editando && (
            <button
              onClick={onCancelarEdicion}
              className="flex items-center border border-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-100 transition-all"
            >
              <RotateCcw size={18} className="mr-2" /> Cancelar
            </button>
          )}
          <button
            onClick={guardarLeccion}
            className="flex items-center bg-[#F40009] text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-all"
          >
            {editando ? (
              <>
                <Save size={18} className="mr-2" /> Guardar cambios
              </>
            ) : (
              <>
                <Plus size={18} className="mr-2" /> Agregar lección
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  )
}