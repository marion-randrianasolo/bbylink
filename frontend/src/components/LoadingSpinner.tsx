export function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <div className="text-white text-xl">Chargement...</div>
      </div>
    </div>
  )
} 