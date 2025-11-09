'use client'
import { useState } from 'react'
import VistaCursos from './VistaCursos/VistaCursos'
import VistaModulos from './VistaModulos/VistaModulos'
import VistaLecciones from './VistaLecciones/VistaLecciones'
import ContenidoLeccion from '@/app/dashboard/vistaMaterial/ContenidoLeccion/ContenidoLeccion'

export default function VistaMaterial() {
  const [curso, setCurso] = useState(null)
  const [modulo, setModulo] = useState(null)
  const [leccion, setLeccion] = useState(null)

  const handleBack = () => {
    if (leccion) setLeccion(null)
    else if (modulo) setModulo(null)
    else if (curso) setCurso(null)
  }

  if (leccion)
    return <ContenidoLeccion leccion={leccion} onBack={handleBack} />
  if (modulo)
    return <VistaLecciones modulo={modulo} onBack={handleBack} onLeccionSelect={setLeccion} />
  if (curso)
    return <VistaModulos curso={curso} onBack={handleBack} onModuloSelect={setModulo} />
  return <VistaCursos onCursoSelect={setCurso} />
}
