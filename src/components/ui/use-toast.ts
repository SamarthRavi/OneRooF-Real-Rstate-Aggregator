
// Export the useToast hook and toast function from our hooks directory
import { useToast, toast as toastFunction } from "@/hooks/use-toast";

// Create a wrapped version of the toast function for better type safety
const toast = {
  ...toastFunction,
  // Define custom toast variants for easier usage
  success: (props: { title?: string; description?: string }) => toastFunction.success(props),
  error: (props: { title?: string; description?: string }) => toastFunction.error(props),
  info: (props: { title?: string; description?: string }) => toastFunction.info(props),
}

export { useToast, toast };
