'use client'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export function useQuiz() {
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(false)
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const obtenerQuizzes = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/quiz`)
      if (!res.ok) throw new Error('Error al obtener evaluaciones')
      const data = await res.json()
      setQuizzes(data)
    } catch (error) {
      console.error(error)
      toast.error('No se pudieron cargar las evaluaciones')
    } finally {
      setLoading(false)
    }
  }

  const crearQuiz = async (form) => {
    setLoading(true)
    try {
      const payload = {
        leccionId: Number(form.leccionId),
        minCorrectas: Number(form.minCorrectas),
        preguntas: form.preguntas.map((p) => ({
          texto: p.texto,
          opciones: p.opciones.map((texto, i) => ({
            texto,
            correcta: p.correcta === i,
          })),
        })),
      }

      const res = await fetch(`${API_URL}/quiz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Error al crear evaluación')
      toast.success('Evaluación creada correctamente')
      await obtenerQuizzes()
    } catch (error) {
      console.error(error)
      toast.error('No se pudo crear la evaluación')
    } finally {
      setLoading(false)
    }
  }

  const editarQuiz = async (id, form) => {
    setLoading(true)
    try {
      const payload = {
        leccionId: Number(form.leccionId),
        minCorrectas: Number(form.minCorrectas),
        preguntas: form.preguntas.map((p) => ({
          texto: p.texto,
          opciones: p.opciones.map((texto, i) => ({
            texto,
            correcta: p.correcta === i,
          })),
        })),
      }

      const res = await fetch(`${API_URL}/quiz/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Error al actualizar evaluación')
      toast.success('Evaluación actualizada correctamente')
      await obtenerQuizzes()
    } catch (error) {
      console.error(error)
      toast.error('No se pudo actualizar la evaluación')
    } finally {
      setLoading(false)
    }
  }

  const eliminarQuiz = async (id) => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/quiz/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Error al eliminar evaluación')
      toast.info('Evaluación eliminada correctamente')
      await obtenerQuizzes()
    } catch (error) {
      console.error(error)
      toast.error('No se pudo eliminar la evaluación')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    obtenerQuizzes()
  }, [])

  return {
    quizzes,
    loading,
    obtenerQuizzes,
    crearQuiz,
    editarQuiz,
    eliminarQuiz,
  }
}