'use client'
import { Toaster } from 'react-hot-toast'

export function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          background: '#F40009',
          color: '#fff',
          fontWeight: '500',
          borderRadius: '8px',
          padding: '12px 16px',
        },
        success: {
          iconTheme: {
            primary: '#fff',
            secondary: '#F40009',
          },
        },
      }}
    />
  )
}
