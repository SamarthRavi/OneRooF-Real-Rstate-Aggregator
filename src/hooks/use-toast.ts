
import * as React from "react"

import {
  Toast,
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: Omit<ToasterToast, "id">
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast> & { id: string }
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: string
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: string
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: actionTypes.REMOVE_TOAST,
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [
          ...state.toasts,
          { ...action.toast, id: genId() },
        ],
      }

    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action

      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }

    case actionTypes.REMOVE_TOAST:
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

interface ToastContextType {
  toasts: ToasterToast[]
  toast: (props: Omit<ToasterToast, "id">) => string
  dismiss: (toastId?: string) => void
  update: (props: Partial<ToasterToast> & { id: string }) => void
}

export const ToastContext = React.createContext<ToastContextType | null>(null)

export function useToast() {
  const context = React.useContext(ToastContext)

  if (context) return context

  return {
    toasts: memoryState.toasts,
    toast: (props: Omit<ToasterToast, "id">) => {
      const id = genId()

      dispatch({
        type: actionTypes.ADD_TOAST,
        toast: {
          ...props,
          open: true,
          onOpenChange: (open) => {
            if (!open) dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id })
          },
        },
      })

      return id
    },
    dismiss: (toastId?: string) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
    update: (props: Partial<ToasterToast> & { id: string }) =>
      dispatch({ type: actionTypes.UPDATE_TOAST, toast: props }),
  }
}

// Export a function with methods to create different types of toasts
export const toast = {
  // Base toast
  toast: (props: Omit<ToasterToast, "id">) => {
    const { toast: toastFunc } = useToast();
    return toastFunc(props);
  },
  
  // Success toast
  success: (props: { title?: string; description?: string }) => {
    const { toast: toastFunc } = useToast();
    return toastFunc({
      variant: "default",
      className: "bg-green-500 text-white border-green-600",
      title: props.title,
      description: props.description,
    });
  },
  
  // Error toast
  error: (props: { title?: string; description?: string }) => {
    const { toast: toastFunc } = useToast();
    return toastFunc({
      variant: "destructive",
      title: props.title,
      description: props.description,
    });
  },
  
  // Info toast
  info: (props: { title?: string; description?: string }) => {
    const { toast: toastFunc } = useToast();
    return toastFunc({
      variant: "default",
      className: "bg-blue-500 text-white border-blue-600",
      title: props.title,
      description: props.description,
    });
  },
}
