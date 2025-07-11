import { AuthModal } from "@/components/AuthModal"

/**
 * Login page with a nice background and the auth modal centered
 * @returns {JSX.Element} - full-screen login page
 */
export default function LoginPage() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6 relative"
      style={{
        backgroundImage: "url('/assets/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      
      <div className="relative z-10 w-full max-w-6xl">
        <AuthModal />
      </div>
    </div>
  )
} 