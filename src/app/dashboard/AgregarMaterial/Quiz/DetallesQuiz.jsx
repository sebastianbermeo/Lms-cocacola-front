'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ClipboardList, CheckCircle2, AlertCircle, Award, Star } from 'lucide-react'

export default function DetallesQuiz({ open, onClose, quiz }) {
  if (!open || !quiz) return null

  const preguntas = Array.isArray(quiz.preguntas)
    ? quiz.preguntas
    : quiz.preguntas
    ? [quiz.preguntas]
    : []

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-gradient-to-b from-white to-red-50 rounded-2xl shadow-2xl w-full max-w-3xl relative overflow-y-auto max-h-[90vh] border border-[#F40009]/30"
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ duration: 0.25 }}
        >
          <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-[#F40009]">
            <X size={22} />
          </button>

          <div className="bg-[#F40009] text-white p-6 rounded-t-2xl text-center">
            <Award size={40} className="mx-auto mb-2" />
            <h2 className="text-3xl font-bold mb-1">
              Evaluación de {quiz.leccion?.titulo || 'Lección'}
            </h2>
            <p className="text-white/90 text-sm">
              Debes acertar al menos {quiz.minCorrectas} pregunta(s) para aprobar
            </p>
            <p className="mt-2 flex justify-center items-center gap-2 text-yellow-300 font-semibold">
              <Star size={18} /> {quiz.puntos ?? 0} puntos disponibles
            </p>
          </div>

          <div className="p-8 space-y-8">
            {preguntas.map((p, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md border border-[#F40009]/10 p-5 hover:shadow-lg transition-all"
              >
                <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center gap-2">
                  <ClipboardList size={18} className="text-[#F40009]" />
                  {i + 1}. {p.texto}
                </h3>
                <ul className="space-y-2 pl-2">
                  {(p.opciones || []).map((op, j) => {
                    const texto = typeof op === 'string' ? op : op.texto
                    const correcta = typeof op === 'object' ? op.correcta : p.correcta === j
                    return (
                      <li
                        key={j}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                          correcta
                            ? 'bg-green-50 border border-green-400 text-green-700 font-semibold'
                            : 'bg-gray-50 border border-gray-200 text-gray-700'
                        }`}
                      >
                        {correcta ? (
                          <CheckCircle2 size={18} className="text-green-500" />
                        ) : (
                          <AlertCircle size={18} className="text-gray-400" />
                        )}
                        {texto}
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}