'use client'
import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, FileText, CheckCircle, ClipboardList, AlertCircle, Coins } from 'lucide-react'
import { toast } from 'react-toastify'
import { useQuiz } from '@/app/hooks/AgregarMaterial/Quiz/useQuiz'

export default function ContenidoLeccion({ leccion, onBack }) {
  const [quiz, setQuiz] = useState(null)
  const [respuestas, setRespuestas] = useState({})
  const [mostrarQuiz, setMostrarQuiz] = useState(false)
  const [resultado, setResultado] = useState(null)
  const { quizzes, obtenerQuizzes, enviarRespuestasQuiz, obtenerResultadoQuiz } = useQuiz()

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null
    } catch {
      return null
    }
  }, [])
  const userId = user?.id

  useEffect(() => {
    obtenerQuizzes()
  }, [])

  useEffect(() => {
    if (leccion && quizzes.length > 0) {
      const asociado = quizzes.find((q) => q.leccion?.id === leccion.id)
      if (asociado) setQuiz(asociado)
    }
  }, [leccion, quizzes])

  useEffect(() => {
    const verificarResultado = async () => {
      if (quiz && userId) {
        const data = await obtenerResultadoQuiz(quiz.id, userId)
        if (data) {
          setResultado({
            aprobado: data.aprobado,
            correctas: data.correctas,
            total: quiz.preguntas.length
          })
        }
      }
    }
    verificarResultado()
  }, [quiz, userId])

  const handleResponder = (idPregunta, indexOpcion) => {
    setRespuestas({ ...respuestas, [idPregunta]: indexOpcion })
  }

  const handleEnviarQuiz = async () => {
    if (!quiz || !userId) return

    const respuestasArray = Object.entries(respuestas).map(([preguntaId, opcionIndex]) => {
      const opcionId = quiz.preguntas.find((p) => p.id === Number(preguntaId))?.opciones[opcionIndex]?.id
      return { preguntaId: Number(preguntaId), opcionId }
    })

    const data = await enviarRespuestasQuiz(quiz.id, userId, respuestasArray)

    if (data?.aprobado) {
      setResultado({
        aprobado: true,
        correctas: data.correctas,
        total: quiz.preguntas.length
      })

      setMostrarQuiz(false)

      toast.success(`Aprobaste y ganaste ${quiz.puntos} puntos.`)

      const updatedUser = {
        ...user,
        points: user.points + quiz.puntos
      }

      localStorage.setItem('user', JSON.stringify(updatedUser))
      window.dispatchEvent(new Event('userUpdated'))

    } else if (data) {
      setResultado({
        aprobado: false,
        correctas: data.correctas,
        total: quiz.preguntas.length
      })

      toast.error('No aprobaste. Intenta nuevamente.')
    }
  }

  if (!leccion)
    return (
      <div className="p-10 text-center text-[#F40009] font-semibold">
        No se encontró contenido para esta lección.
      </div>
    )

  return (
    <div className="min-h-screen bg-white p-10 space-y-10">

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
        className="flex items-center text-[#F40009] hover:bg-red-50 px-4 py-2 rounded-full mb-8 shadow-sm transition-all"
      >
        <ArrowLeft className="mr-2" />
        Volver a Lecciones
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#F40009] text-white rounded-2xl p-8 shadow-md"
      >
        <h1 className="text-3xl font-bold mb-2">{leccion.titulo}</h1>
        <p className="text-white/80 text-lg">{leccion.descripcion}</p>

        <div className="mt-4 inline-flex items-center bg-white text-[#F40009] px-4 py-2 rounded-full shadow-md font-semibold">
          <Coins size={20} className="text-[#F40009] mr-2" />
          {quiz ? quiz.puntos : leccion.puntos} puntos
        </div>
      </motion.div>

      {!mostrarQuiz && (
        <div className="space-y-10">

          {leccion.videoUrl && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="rounded-2xl overflow-hidden shadow-lg border border-gray-200"
            >
              <iframe
                className="w-full aspect-video"
                src={leccion.videoUrl}
                title={leccion.titulo}
                frameBorder="0"
                allowFullScreen
              />
            </motion.div>
          )}

          {Array.isArray(leccion.archivos) && leccion.archivos.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="bg-red-50 border border-[#F40009]/20 rounded-2xl p-6 shadow-md"
            >
              <h3 className="text-lg font-semibold text-[#F40009] mb-3 flex items-center">
                <FileText className="mr-2" size={22} /> Archivos disponibles
              </h3>
              <ul className="space-y-2">
                {leccion.archivos.map((archivo, index) => (
                  <li key={index}>
                    <a
                      href={archivo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#F40009] hover:underline"
                    >
                      {archivo.split('/').pop()}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {leccion.contenidoTexto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md"
            >
              <h4 className="text-lg font-semibold text-[#F40009] mb-4">Contenido de la lección</h4>
              <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
                {leccion.contenidoTexto}
              </p>
            </motion.div>
          )}

          {resultado && (
            <div className="flex justify-center">
              {resultado.aprobado ? (
                <div className="text-green-600 font-semibold text-lg flex items-center gap-2">
                  <CheckCircle size={22} /> Aprobado ({resultado.correctas}/{resultado.total})
                </div>
              ) : (
                <div className="text-[#F40009] font-semibold text-lg flex items-center gap-2">
                  <AlertCircle size={22} /> No aprobado ({resultado.correctas}/{resultado.total})
                </div>
              )}
            </div>
          )}

          {quiz && !resultado && (
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMostrarQuiz(true)}
                className="bg-[#F40009] text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-red-700 transition-all"
              >
                <ClipboardList size={20} className="inline mr-2" /> Iniciar evaluación
              </motion.button>
            </div>
          )}

          {!quiz && (
            <div className="text-center text-gray-500 mt-8">
              Esta lección no tiene evaluación asociada.
            </div>
          )}
        </div>
      )}

      {mostrarQuiz && quiz && !resultado && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-gray-200 rounded-2xl p-8 shadow-xl space-y-8"
        >
          <h2 className="text-2xl font-bold text-[#F40009] text-center">
            Evaluación de {leccion.titulo}
          </h2>

          {quiz.preguntas.map((p, i) => (
            <div key={p.id} className="border-b border-gray-200 pb-6">
              <h3 className="font-semibold text-gray-800 mb-3 text-lg">
                {i + 1}. {p.texto}
              </h3>

              <ul className="space-y-2">
                {p.opciones.map((o, j) => (
                  <li key={j}>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`pregunta-${p.id}`}
                        checked={respuestas[p.id] === j}
                        onChange={() => handleResponder(p.id, j)}
                      />
                      <span className="text-gray-700">
                        {typeof o === 'string' ? o : o.texto}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex justify-center pt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEnviarQuiz}
              className="bg-[#F40009] text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-all"
            >
              Enviar respuestas
            </motion.button>
          </div>

        </motion.div>
      )}
    </div>
  )
}