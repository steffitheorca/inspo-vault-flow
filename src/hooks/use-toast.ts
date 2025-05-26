
import { useState, useCallback } from 'react'

export type ToastProps = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: 'default' | 'destructive'
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = useCallback(
    ({ title, description, action, variant }: Omit<ToastProps, 'id'>) => {
      const id = crypto.randomUUID()
      const newToast = { id, title, description, action, variant }

      setToasts((currentToasts) => [...currentToasts, newToast])

      // Auto dismiss after 5 seconds
      setTimeout(() => {
        setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id))
      }, 5000)

      return id
    },
    []
  )

  const dismissToast = useCallback((id: string) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id))
  }, [])

  return { toasts, toast, dismissToast }
}

export const toast = ({ title, description, action, variant }: Omit<ToastProps, 'id'>) => {
  const id = crypto.randomUUID()
  // This is a stub for direct imports
  // The actual implementation is handled by the useToast hook
  return id
}
