'use client'
import { useState } from 'react'
import { ChevronDown, LogOut } from 'lucide-react'

export default function Header({ activeView, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)

  // 🔹 Usuario simulado (más adelante se reemplaza por datos reales)
  const usuarioActivo = {
    nombre: 'Juan Pérez',
    rol: 'Admin',
    foto: '', // ← si no tiene imagen, no se mostrará nada
  }

  const menuItems = [
    { label: 'Inicio', value: 'inicio' },
    { label: 'Cursos', value: 'cursos' },
    { label: 'Certificados', value: 'certificados' },
    { label: 'Usuarios', value: 'usuarios' },
    { label: 'Agregar Material', value: 'agregar' },
  ]

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <img
          src="/Img/Coca-Cola_logo.png"
          alt="Coca-Cola Logo"
          width={130}
          height={40}
          className="object-contain"
        />

        {/* Menú principal */}
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

        {/* Usuario */}
        <div className="flex items-center space-x-6 relative">
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center space-x-2 hover:bg-red-50 px-3 py-2 rounded-full transition-all"
            >
              {/* Solo muestra imagen si existe */}
              {usuarioActivo.foto && (
                <img
                  src={usuarioActivo.foto}
                  alt="Usuario"
                  width={40}
                  height={40}
                  className="rounded-full border border-gray-200 object-cover"
                />
              )}

              <div className="text-left hidden sm:block">
                <p className="font-semibold text-gray-800 text-sm">
                  {usuarioActivo.nombre}
                </p>
                <p className="text-xs text-gray-500">{usuarioActivo.rol}</p>
              </div>

              <ChevronDown
                className={`text-gray-500 transition-transform ${
                  menuOpen ? 'rotate-180' : ''
                }`}
                size={18}
              />
            </button>

            {/* Menú desplegable */}
            {menuOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
                <button
                  className="w-full text-left px-5 py-3 hover:bg-red-50 text-gray-700 flex items-center space-x-2"
                  onClick={() => alert('Cerrando sesión...')}
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