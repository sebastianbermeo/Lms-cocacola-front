import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export function useModulo() {
  const [modulos, setModulos] = useState([])
  const [modulo, setModulo] = useState(null)
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

  const obtenerModulos = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/modulos`, { headers: getAuthHeaders() })
      if (handleUnauthorized(res)) return
      if (!res.ok) throw new Error('Error al obtener módulos')
      const data = await res.json()
      setModulos(Array.isArray(data) ? data : [])
    } catch (err) {
      toast.error(err.message || 'Error al cargar módulos')
    } finally {
      setLoading(false)
    }
  }

  const obtenerModuloPorId = async (id) => {
    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/modulos/${id}`, { headers: getAuthHeaders() })
      if (handleUnauthorized(res)) return
      if (!res.ok) throw new Error('Error al obtener módulo')
      const data = await res.json()
      setModulo(data)
      return data
    } catch (err) {
      toast.error(err.message || 'Error al obtener módulo')
      return null
    } finally {
      setLoading(false)
    }
  }

  const crearModulo = async ({ titulo, descripcion, imagen, cursoId }) => {
    try {
      const res = await fetch(`${API_URL}/modulos`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ titulo, descripcion, imagen, cursoId }),
      })
      if (handleUnauthorized(res)) return
      if (!res.ok) {
        const e = await res.json().catch(() => null)
        throw new Error(e?.message || 'Error al crear módulo')
      }
      toast.success('Módulo creado correctamente')
      await obtenerModulos()
    } catch (err) {
      toast.error(err.message || 'Error al crear módulo')
    }
  }

  const editarModulo = async (id, { titulo, descripcion, imagen, cursoId }) => {
    try {
      const res = await fetch(`${API_URL}/modulos/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ titulo, descripcion, imagen, cursoId }),
      })
      if (handleUnauthorized(res)) return
      if (!res.ok) {
        const e = await res.json().catch(() => null)
        throw new Error(e?.message || 'Error al actualizar módulo')
      }
      toast.success('Módulo actualizado correctamente')
      await obtenerModulos()
    } catch (err) {
      toast.error(err.message || 'Error al actualizar módulo')
    }
  }

  const eliminarModulo = async (id) => {
    try {
      const res = await fetch(`${API_URL}/modulos/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      })
      if (handleUnauthorized(res)) return
      if (!res.ok) {
        const e = await res.json().catch(() => null)
        throw new Error(e?.message || 'Error al eliminar módulo')
      }
      toast.success('Módulo eliminado correctamente')
      await obtenerModulos()
    } catch (err) {
      toast.error(err.message || 'Error al eliminar módulo')
    }
  }

  useEffect(() => {
    obtenerModulos()
  }, [])

  return { modulos, modulo, loading, obtenerModulos, obtenerModuloPorId, crearModulo, editarModulo, eliminarModulo }
}