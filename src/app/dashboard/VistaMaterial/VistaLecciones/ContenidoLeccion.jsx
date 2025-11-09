'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, FileText, CheckCircle, ClipboardList, AlertCircle } from 'lucide-react'
import { toast } from 'react-toastify'

export default function ContenidoLeccion({ leccion, onBack }) {
  const [completando, setCompletando] = useState(false)
  const [completada, setCompletada] = useState(false)
  const [quiz, setQuiz] = useState(null)
  const [respuestas, setRespuestas] = useState({})
  const [mostrarQuiz, setMostrarQuiz] = useState(false)
  const [resultado, setResultado] = useState(null)

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quiz`)
        const data = await res.json()
        const asociado = data.find((q) => q.leccion?.id === leccion.id)
        if (asociado) setQuiz(asociado)
      } catch {
        console.error('No se pudo obtener el quiz.')
      }
    }
    if (leccion) fetchQuiz()
  }, [leccion])

  const handleResponder = (idPregunta, indexOpcion) => {
    setRespuestas({ ...respuestas, [idPregunta]: indexOpcion })
  }

  const handleEnviarQuiz = () => {
    if (!quiz) return
    let correctas = 0

    quiz.preguntas.forEach((p) => {
      const respuestaUsuario = respuestas[p.id]
      const correctaIndex = p.opciones.findIndex((o) => o.correcta)
      if (respuestaUsuario === correctaIndex) correctas++
    })

    const aprobado = correctas >= quiz.minCorrectas
    setResultado({ correctas, total: quiz.preguntas.length, aprobado })

    if (aprobado) {
      setCompletada(true)
      toast.success(`🎉 Aprobaste la evaluación y ganaste ${leccion.puntos} puntos.`)
    } else {
      toast.info(`Obtuviste ${correctas}/${quiz.preguntas.length} respuestas correctas. Intenta nuevamente.`)
    }
  }

  if (!leccion)
    return (
      <div className="p-10 text-center text-[#F40009] font-semibold">
        No se encontró contenido para esta lección.
      </div>
    )

  return (
    <div className="min-h-screen bg-white p-10">
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
        className="bg-[#F40009] text-white rounded-2xl p-8 mb-10 shadow-md"
      >
        <h1 className="text-3xl font-bold mb-2">{leccion.titulo}</h1>
        <p className="text-white/80 text-lg">{leccion.descripcion}</p>
        <p className="mt-2 font-semibold">💎 Puntos: {leccion.puntos}</p>
      </motion.div>

      {/* Si no está en modo quiz */}
      {!mostrarQuiz && (
        <>
          {leccion.videoUrl && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="rounded-xl overflow-hidden shadow-md border border-gray-200"
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
              className="bg-red-50 border border-[#F40009]/20 rounded-xl p-6 shadow-sm"
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
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
            >
              <h4 className="text-lg font-semibold text-[#F40009] mb-2">Contenido de la lección</h4>
              <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
                {leccion.contenidoTexto}
              </p>
            </motion.div>
          )}

          {quiz && (
            <div className="flex justify-center pt-8">
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
        </>
      )}

      {/* Si está dentro del quiz */}
      {mostrarQuiz && quiz && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg space-y-8">
            <h2 className="text-2xl font-bold text-[#F40009] mb-4 text-center">
              🧠 Evaluación de {leccion.titulo}
            </h2>

            {quiz.preguntas.map((p, i) => (
              <div key={p.id} className="border-b border-gray-200 pb-6 mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">
                  {i + 1}. {p.texto}
                </h3>
                <ul className="space-y-2">
                  {p.opciones.map((o, j) => (
                    <li key={j}>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`pregunta-${p.id}`}
                          checked={respuestas[p.id] === j}
                          onChange={() => handleResponder(p.id, j)}
                          className="text-[#F40009]"
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

            {!resultado ? (
              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEnviarQuiz}
                  className="bg-[#F40009] text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-all"
                >
                  Enviar respuestas
                </motion.button>
              </div>
            ) : (
              <div className="text-center space-y-4">
                {resultado.aprobado ? (
                  <div className="text-green-600 font-semibold text-lg flex justify-center items-center gap-2">
                    <CheckCircle size={22} /> ¡Aprobado! ({resultado.correctas}/{resultado.total})
                  </div>
                ) : (
                  <div className="text-[#F40009] font-semibold text-lg flex justify-center items-center gap-2">
                    <AlertCircle size={22} /> No aprobado ({resultado.correctas}/{resultado.total})
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMostrarQuiz(false)}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full font-medium hover:bg-gray-300 transition-all"
                >
                  Volver al contenido
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}