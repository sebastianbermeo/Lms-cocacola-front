import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export function useLeccion() {
  const [lecciones, setLecciones] = useState([])
  const [leccion, setLeccion] = useState(null)
  const [loading, setLoading] = useState(false)
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const obtenerLecciones = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/leccion`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error('Error al obtener lecciones')
      const data = await res.json()
      const lista = Array.isArray(data)
        ? data.map((l) => ({
            ...l,
            puntosQuiz: l.quiz ? l.quiz.puntos : 0,
          }))
        : []
      setLecciones(lista)
    } catch (err) {
      toast.error(err.message || 'Error al cargar lecciones')
    } finally {
      setLoading(false)
    }
  }

  const obtenerLeccionPorId = async (id) => {
    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/leccion/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error('Error al obtener lección')
      const data = await res.json()
      const withPuntos = { ...data, puntosQuiz: data.quiz ? data.quiz.puntos : 0 }
      setLeccion(withPuntos)
      return withPuntos
    } catch (err) {
      toast.error(err.message || 'Error al obtener lección')
      return null
    } finally {
      setLoading(false)
    }
  }

  const crearLeccion = async (nuevaLeccion) => {
    try {
      const formData = new FormData()
      Object.keys(nuevaLeccion).forEach((key) => {
        if (key !== 'archivos') {
          formData.append(key, nuevaLeccion[key])
        }
      })
      nuevaLeccion.archivos.forEach((file) => {
        formData.append('archivos', file)
      })

      const res = await fetch(`${API_URL}/leccion`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })
      if (!res.ok) throw new Error('Error al crear lección')
      toast.success('Lección creada correctamente')
      await obtenerLecciones()
    } catch (err) {
      toast.error(err.message || 'Error al crear lección')
    }
  }

  const editarLeccion = async (id, data) => {
    try {
      const res = await fetch(`${API_URL}/leccion/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Error al actualizar lección')
      toast.success('Lección actualizada correctamente')
      await obtenerLecciones()
    } catch (err) {
      toast.error(err.message || 'Error al actualizar lección')
    }
  }

  const eliminarLeccion = async (id) => {
    try {
      const res = await fetch(`${API_URL}/leccion/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error('Error al eliminar lección')
      toast.success('Lección eliminada correctamente')
      await obtenerLecciones()
    } catch (err) {
      toast.error(err.message || 'Error al eliminar lección')
    }
  }

  useEffect(() => {
    obtenerLecciones()
  }, [])

  return {
    lecciones,
    leccion,
    loading,
    obtenerLecciones,
    obtenerLeccionPorId,
    crearLeccion,
    editarLeccion,
    eliminarLeccion,
  }
}