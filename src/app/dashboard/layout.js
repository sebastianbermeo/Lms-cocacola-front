'use client'
import { useState } from 'react'
import Header from '@/components/dashboard/Header'
import Footer from '@/components/dashboard/Footer'
import Inicio from './Inicio/Inicio'
import Cursos from './VistaMaterial/VistaCursos/VistaCursos'
import Modulos from './VistaMaterial/VistaModulos/VistaModulos'
import Lecciones from './VistaMaterial/VistaLecciones/VistaLecciones'
import ContenidoLeccion from './VistaMaterial/VistaLecciones/ContenidoLeccion'
import Premios from './Premios/Premios'  // ✅ corregido
import Usuarios from './Usuarios/Usuarios'
import AgregarMaterial from './AgregarMaterial/AgregarMaterial'

export default function DashboardLayout() {
  const [activeView, setActiveView] = useState('inicio')
  const [selectedCurso, setSelectedCurso] = useState(null)
  const [selectedModulo, setSelectedModulo] = useState(null)
  const [selectedLeccion, setSelectedLeccion] = useState(null)

  const renderView = () => {
    switch (activeView) {
      case 'inicio':
        return <Inicio onNavigate={setActiveView} />

      case 'cursos':
        return (
          <Cursos
            onCursoSelect={(curso) => {
              setSelectedCurso(curso)
              setActiveView('modulos')
            }}
          />
        )

      case 'modulos':
        return (
          <Modulos
            curso={selectedCurso}
            onModuloSelect={(modulo) => {
              setSelectedModulo(modulo)
              setActiveView('lecciones')
            }}
            onBack={() => setActiveView('cursos')}
          />
        )

      case 'lecciones':
        return (
          <Lecciones
            modulo={selectedModulo}
            onLeccionSelect={(leccion) => {
              setSelectedLeccion(leccion)
              setActiveView('contenido')
            }}
            onBack={() => setActiveView('modulos')}
          />
        )

      case 'contenido':
        return (
          <ContenidoLeccion
            leccion={selectedLeccion}
            onBack={() => setActiveView('lecciones')}
          />
        )

      case 'premios':
        return <Premios />

      case 'usuarios':
        return <Usuarios />

      case 'agregar':
        return <AgregarMaterial />

      default:
        return <Inicio onNavigate={setActiveView} />
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <Header activeView={activeView} onNavigate={setActiveView} />
      <main className="flex-grow p-8 bg-white transition-all duration-500">
        {renderView()}
      </main>
      <Footer />
    </div>
  )
}