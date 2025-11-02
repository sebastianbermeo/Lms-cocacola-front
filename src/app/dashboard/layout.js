'use client'
import { useState } from 'react'
import Header from '@/components/dashboard/Header'
import Footer from '@/components/dashboard/Footer'
import Inicio from './Inicio/Inicio'
import Cursos from './cursos/Cursos'
import Modulos from './Modulos/Modulos'
import Lecciones from './Lecciones/Lecciones'

export default function DashboardLayout() {
  // 👇 aquí iniciamos directamente en cursos
  const [activeView, setActiveView] = useState('cursos')
  const [selectedCurso, setSelectedCurso] = useState(null)
  const [selectedModulo, setSelectedModulo] = useState(null)

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
            onBack={() => setActiveView('modulos')}
          />
        )
      default:
        return <Cursos />
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