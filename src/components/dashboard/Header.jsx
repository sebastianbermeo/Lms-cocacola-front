'use client'
import { useState, useEffect, useCallback } from 'react'
import { ChevronDown, LogOut, Coins } from 'lucide-react'
import { useLogin } from '@/app/hooks/auth/useLogin'

export default function Header({ activeView, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [usuarioActivo, setUsuarioActivo] = useState(null)
  const { logout, getUserData } = useLogin()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) setUsuarioActivo(JSON.parse(userData))
  }, [])

  const refrescarUsuario = useCallback(async () => {
    const stored = localStorage.getItem('user')
    const parsed = stored ? JSON.parse(stored) : null
    if (!parsed?.id) return
    const updated = await getUserData(parsed.id)
    if (updated) {
      localStorage.setItem('user', JSON.stringify(updated))
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('userUpdated'))
      }
      setUsuarioActivo(updated)
    }
  }, [getUserData])

  useEffect(() => {
    const sync = () => {
      const stored = localStorage.getItem('user')
      if (stored) setUsuarioActivo(JSON.parse(stored))
    }
    window.addEventListener('storage', sync)
    window.addEventListener('userUpdated', sync)
    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener('userUpdated', sync)
    }
  }, [])

  useEffect(() => {
    refrescarUsuario()
    const interval = setInterval(refrescarUsuario, 30000)
    return () => clearInterval(interval)
  }, [refrescarUsuario])

  const baseMenu = [
    { label: 'Inicio', value: 'inicio' },
    { label: 'Cursos', value: 'cursos' },
    { label: 'Premios', value: 'premios' }
  ]

  const adminMenu = [
    { label: 'Usuarios', value: 'usuarios' },
    { label: 'Agregar Material', value: 'agregar' }
  ]

  const menuItems =
    usuarioActivo?.role === 'admin'
      ? [...baseMenu, ...adminMenu]
      : baseMenu

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between px-8 py-4">
        <img
          src="/Img/Coca-Cola_logo.png"
          alt="Coca-Cola Logo"
          width={130}
          height={40}
          className="object-contain"
        />

        <nav className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <button
              key={item.value}
              onClick={() => onNavigate(item.value)}
              className={`pb-1 font-medium transition-colors ${
                activeView === item.value
                  ? 'text-[#F40009] border-b-2 border-[#F40009]'
                  : 'text-gray-700 hover:text-[#F40009]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-6 relative">
          <div className="flex items-center bg-red-50 text-[#F40009] px-3 py-1 rounded-full font-semibold">
            <Coins size={18} className="mr-2 text-[#F40009]" />
            <span>{usuarioActivo?.points ?? 0}</span>
          </div>

          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center space-x-3 hover:bg-red-50 px-3 py-2 rounded-full transition-all"
            >
              {usuarioActivo?.foto ? (
                <img
                  src={usuarioActivo.foto}
                  alt={usuarioActivo.name}
                  width={40}
                  height={40}
                  className="rounded-full border border-gray-200 object-cover"
                />
              ) : (
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-semibold border">
                  {usuarioActivo?.name?.charAt(0).toUpperCase() || '?'}
                </div>
              )}

              <div className="text-left hidden sm:block">
                <p className="font-semibold text-gray-800 text-sm">
                  {usuarioActivo?.name || 'Usuario'}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {usuarioActivo?.role || ''}
                </p>
              </div>

              <ChevronDown
                className={`text-gray-500 transition-transform ${
                  menuOpen ? 'rotate-180' : ''
                }`}
                size={18}
              />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
                <button
                  className="w-full text-left px-5 py-3 hover:bg-red-50 text-gray-700 flex items-center space-x-2"
                  onClick={logout}
                >
                  <LogOut className="text-[#F40009]" size={18} />
                  <span>Cerrar sesión</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}