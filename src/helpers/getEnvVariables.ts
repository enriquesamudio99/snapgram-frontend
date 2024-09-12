export const getEnvVariables = () => {
  // import.meta.env
  return {
    VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
    VITE_BACKEND_BASE_API: import.meta.env.VITE_BACKEND_BASE_API
  }
} 