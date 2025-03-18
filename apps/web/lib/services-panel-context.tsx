'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type ServicesPanelContextType = {
  isServicesPanelOpen: boolean
  openServicesPanel: () => void
  closeServicesPanel: () => void
  toggleServicesPanel: () => void
}

const ServicesPanelContext = createContext<ServicesPanelContextType | undefined>(undefined)

export function ServicesPanelProvider({ children }: { children: ReactNode }) {
  const [isServicesPanelOpen, setIsServicesPanelOpen] = useState(false)

  const openServicesPanel = () => setIsServicesPanelOpen(true)
  const closeServicesPanel = () => setIsServicesPanelOpen(false)
  const toggleServicesPanel = () => setIsServicesPanelOpen(prev => !prev)

  return (
    <ServicesPanelContext.Provider value={{
      isServicesPanelOpen,
      openServicesPanel,
      closeServicesPanel,
      toggleServicesPanel
    }}>
      {children}
    </ServicesPanelContext.Provider>
  )
}

export function useServicesPanel() {
  const context = useContext(ServicesPanelContext)
  if (context === undefined) {
    throw new Error('useServicesPanel must be used within a ServicesPanelProvider')
  }
  return context
} 