'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Lock, ArrowRight, Shield, Eye, EyeOff, Mail, ShieldCheck } from 'lucide-react'
import { useLogin } from '@/app/hooks/auth/useLogin'
import usePasswordRecovery from '@/app/hooks/auth/usePasswordRecovery'

export default function Login() {
  const { login, loading: loginLoading } = useLogin()
  const {
    sendCode,
    verifyCode,
    resetPassword,
    loading: recoveryLoading,
  } = usePasswordRecovery()

  const [view, setView] = useState('login') // 'login' | 'forgot' | 'verify' | 'reset'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [resetCode, setResetCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const loading = loginLoading || recoveryLoading

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    const result = await login(email, password)
    if (result) {
      window.location.href = '/dashboard'
    }
  }

  const handleSendCode = async (e) => {
    e.preventDefault()
    const ok = await sendCode(email)
    if (ok) setView('verify')
  }

  const handleVerifyCode = async (e) => {
    e.preventDefault()
    const ok = await verifyCode(email, resetCode)
    if (ok) setView('reset')
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    const ok = await resetPassword(email, resetCode, newPassword, confirmPassword)
    if (ok) {
      setResetCode('')
      setNewPassword('')
      setConfirmPassword('')
      setView('login')
    }
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-white to-red-50">
      {/* Lado rojo con logo y texto (NO TOCADO) */}
      <div className="w-1/2 flex flex-col justify-center p-16 bg-[#F40009] text-white relative overflow-hidden">
        <div className="z-10 relative">
          <img
            src="/Img/logo_blanco.png"
            alt="Coca-Cola Logo"
            className="mb-8 w-48"
          />
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Plataforma de <br />Formación Coca-Cola
          </h1>
          <p className="text-xl text-white/80 max-w-md">
            Desarrolla tus habilidades profesionales con el respaldo de una marca global
          </p>
        </div>
        <div className="absolute top-0 right-0 opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 200 200" fill="white">
            <circle cx="100" cy="100" r="80" />
          </svg>
        </div>
      </div>

      {/* Lado del formulario */}
      <div className="w-1/2 flex items-center justify-center p-16">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* === VISTA LOGIN === */}
          {view === 'login' && (
            <>
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-[#F40009] mb-4">
                  Iniciar Sesión
                </h2>
                <p className="text-gray-600">
                  Accede a tu plataforma de formación Coca-Cola
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-6">
                {/* Campo de correo */}
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#F40009] transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Correo electrónico"
                    className="w-full pl-12 pr-4 py-4 border-b-2 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-[#F40009] outline-none transition-all duration-300 bg-transparent focus:ring-0"
                    required
                  />
                </div>

                {/* Campo de contraseña con ojo */}
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#F40009] transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    className="w-full pl-12 pr-12 py-4 border-b-2 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-[#F40009] outline-none transition-all duration-300 bg-transparent focus:ring-0"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#F40009] transition-colors focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* Recordarme y contraseña olvidada */}
                <div className="flex justify-between items-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2 text-[#F40009] focus:ring-[#F40009]"
                    />
                    <span className="text-gray-600">Recordarme</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setView('forgot')}
                    className="text-[#F40009] hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                {/* Botón de inicio de sesión */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#F40009] text-white py-4 rounded-full hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 group"
                >
                  <span>{loading ? 'Cargando...' : 'Iniciar Sesión'}</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </form>
            </>
          )}

          {/* === VISTA FORGOT (INGRESAR CORREO) === */}
          {view === 'forgot' && (
            <>
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-[#F40009] mb-4">
                  Recuperar contraseña
                </h2>
                <p className="text-gray-600">
                  Ingresa tu correo para enviarte un código de verificación
                </p>
              </div>

              <form onSubmit={handleSendCode} className="space-y-6">
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#F40009] transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Correo electrónico"
                    className="w-full pl-12 pr-4 py-4 border-b-2 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-[#F40009] outline-none transition-all duration-300 bg-transparent focus:ring-0"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#F40009] text-white py-4 rounded-full hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 group"
                >
                  <span>{loading ? 'Enviando...' : 'Enviar código'}</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <button
                  type="button"
                  onClick={() => setView('login')}
                  className="mt-4 text-sm text-gray-600 hover:underline block text-center"
                >
                  Volver a iniciar sesión
                </button>
              </form>
            </>
          )}

          {/* === VISTA VERIFY (INGRESAR CÓDIGO) === */}
          {view === 'verify' && (
            <>
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-[#F40009] mb-4">
                  Verificar código
                </h2>
                <p className="text-gray-600">
                  Ingresa el código que enviamos a <span className="font-semibold">{email}</span>
                </p>
              </div>

              <form onSubmit={handleVerifyCode} className="space-y-6">
                <div className="relative group">
                  <ShieldCheck className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#F40009] transition-colors" />
                  <input
                    type="text"
                    maxLength={6}
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    placeholder="Código de 6 dígitos"
                    className="w-full pl-12 pr-4 py-4 border-b-2 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-[#F40009] outline-none transition-all duration-300 bg-transparent focus:ring-0"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#F40009] text-white py-4 rounded-full hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 group"
                >
                  <span>{loading ? 'Verificando...' : 'Verificar código'}</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <button
                  type="button"
                  onClick={() => setView('forgot')}
                  className="mt-4 text-sm text-gray-600 hover:underline block text-center"
                >
                  Volver a ingresar correo
                </button>
              </form>
            </>
          )}

          {/* === VISTA RESET (NUEVA CONTRASEÑA) === */}
          {view === 'reset' && (
            <>
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-[#F40009] mb-4">
                  Cambiar contraseña
                </h2>
                <p className="text-gray-600">
                  Ingresa tu nueva contraseña para <span className="font-semibold">{email}</span>
                </p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-6">
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#F40009] transition-colors" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nueva contraseña"
                    className="w-full pl-12 pr-4 py-4 border-b-2 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-[#F40009] outline-none transition-all duration-300 bg-transparent focus:ring-0"
                    required
                  />
                </div>

                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#F40009] transition-colors" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirmar contraseña"
                    className="w-full pl-12 pr-4 py-4 border-b-2 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-[#F40009] outline-none transition-all duration-300 bg-transparent focus:ring-0"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#F40009] text-white py-4 rounded-full hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 group"
                >
                  <span>{loading ? 'Guardando...' : 'Cambiar contraseña'}</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <button
                  type="button"
                  onClick={() => setView('login')}
                  className="mt-4 text-sm text-gray-600 hover:underline block text-center"
                >
                  Volver a iniciar sesión
                </button>
              </form>
            </>
          )}

          {/* Acceso seguro */}
          <div className="mt-6 text-center flex items-center justify-center text-gray-600">
            <Shield className="mr-2 text-[#F40009]" size={20} />
            <p>Acceso seguro y protegido</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
