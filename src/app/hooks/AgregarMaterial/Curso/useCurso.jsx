import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export function useCurso() {
  const [cursos, setCursos] = useState([])
  const [curso, setCurso] = useState(null)
  const [loading, setLoading] = useState(false)
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token')
    return {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    }
  }

  const handleUnauthorized = (res) => {
    if (res.status === 401 || res.status === 403) {
      toast.error('Sesión expirada o no autorizada. Inicia sesión nuevamente.')
      localStorage.removeItem('token')
      window.location.href = '/'
      return true
    }
    return false
  }

  const obtenerCursos = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/cursos`, { headers: getAuthHeaders() })
      if (handleUnauthorized(res)) return
      if (!res.ok) throw new Error('Error al obtener cursos')
      const data = await res.json()
      setCursos(Array.isArray(data) ? data : [])
    } catch (err) {
      toast.error(err.message || 'Error al cargar los cursos')
    } finally {
      setLoading(false)
    }
  }

  const obtenerCursoPorId = async (id) => {
    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/cursos/${id}`, { headers: getAuthHeaders() })
      if (handleUnauthorized(res)) return
      if (!res.ok) throw new Error('Error al obtener curso')
      const data = await res.json()
      setCurso(data)
      return data
    } catch (err) {
      toast.error(err.message || 'Error al obtener curso')
      return null
    } finally {
      setLoading(false)
    }
  }

  const crearCurso = async ({ titulo, descripcion, imagen }) => {
    try {
      const res = await fetch(`${API_URL}/cursos`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ titulo, descripcion, imagen }),
      })
      if (handleUnauthorized(res)) return
      if (!res.ok) throw new Error('Error al crear curso')
      toast.success('Curso creado correctamente')
      await obtenerCursos()
    } catch (err) {
      toast.error(err.message || 'Error al crear el curso')
    }
  }

  const editarCurso = async (id, { titulo, descripcion, imagen }) => {
    try {
      const res = await fetch(`${API_URL}/cursos/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ titulo, descripcion, imagen }),
      })
      if (handleUnauthorized(res)) return
      if (!res.ok) throw new Error('Error al actualizar curso')
      toast.success('Curso actualizado correctamente')
      await obtenerCursos()
    } catch (err) {
      toast.error(err.message || 'Error al actualizar el curso')
    }
  }

  const eliminarCurso = async (id) => {
    try {
      const res = await fetch(`${API_URL}/cursos/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      })
      if (handleUnauthorized(res)) return
      if (!res.ok) throw new Error('Error al eliminar curso')
      toast.success('Curso eliminado correctamente')
      await obtenerCursos()
    } catch (err) {
      toast.error(err.message || 'Error al eliminar el curso')
    }
  }

  useEffect(() => {
    obtenerCursos()
  }, [])

  return { cursos, curso, loading, obtenerCursos, obtenerCursoPorId, crearCurso, editarCurso, eliminarCurso }
}