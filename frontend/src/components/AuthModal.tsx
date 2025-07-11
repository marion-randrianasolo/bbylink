"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth, RegisterData } from "@/contexts/AuthContext"
import { ChevronLeft, ChevronRight } from "lucide-react"
import BabyFootPosition, { POSITIONS } from "@/components/babyfoot_component/BabyFootPosition"

type AuthMode = "login" | "register"
type RegisterStep = 1 | 2 | 3 | 4 | 5 | 6

interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  championship: string
  avatar: string
  avatarIndex: number
  jerseyNumber: string
  skillLevel: string
  position: string
}

/**
 * Jersey component that lets users pick their number
 * @param {string} number - current jersey number
 * @param {function} onChange - callback when number changes
 * @returns {JSX.Element} - jersey with navigation arrows
 */
const JerseyComponent = ({ number, onChange }: { number: string; onChange: (value: string) => void }) => {
  /**
   * Bumps the number up, wraps back to 1 after 99
   */
  const incrementNumber = () => {
    const currentNum = parseInt(number) || 0
    const newNum = currentNum >= 99 ? 1 : currentNum + 1
    onChange(newNum.toString())
  }

  /**
   * Bumps the number down, wraps to 99 from 1
   */
  const decrementNumber = () => {
    const currentNum = parseInt(number) || 2
    const newNum = currentNum <= 1 ? 99 : currentNum - 1
    onChange(newNum.toString())
  }

  return (
    <div className="flex items-center justify-center space-x-6">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={decrementNumber}
        className="p-3 hover:bg-[#EA1846]/10 rounded-full"
      >
        <ChevronLeft className="h-10 w-10 text-[#EA1846]" />
      </Button>

      <div className="relative flex justify-center items-center">
        <div
          className="relative flex justify-center items-center"
          style={{
            backgroundImage: 'url("/assets/shirt-back.png")',
            backgroundRepeat: "no-repeat",
            backgroundPosition: "50% 50%",
            backgroundSize: "contain",
            width: "280px",
            height: "210px",
            minHeight: "210px",
          }}
        >
          <input
            value={number}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 2)
              onChange(value)
            }}
            className="absolute text-center bg-transparent text-gray-200 font-medium jersey-number"
            style={{
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: "56px",
              lineHeight: "56px",
              fontWeight: "500",
              paddingBottom: "30px",
              textShadow: "none",
              boxShadow: "none",
              width: "120px",
              height: "80px",
            }}
            placeholder="00"
            maxLength={2}
          />
        </div>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={incrementNumber}
        className="p-3 hover:bg-[#EA1846]/10 rounded-full"
      >
        <ChevronRight className="h-10 w-10 text-[#EA1846]" />
      </Button>
    </div>
  )
}

/**
 * Animation presets for step transitions - keeps it smooth but not too fancy
 */
const stepVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3 }
  },
  exit: { 
    opacity: 0, 
    x: -20,
    transition: { duration: 0.2 }
  }
}

/**
 * The main auth modal that handles both login and registration flows
 * @param {Object} props - standard div props plus className
 * @returns {JSX.Element} - modal with login/register forms
 */
export function AuthModal({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [mode, setMode] = useState<AuthMode>("login")
  const [currentStep, setCurrentStep] = useState<RegisterStep>(1)
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    championship: "",
    avatar: "",
    avatarIndex: 0,
    jerseyNumber: "",
    skillLevel: "",
    position: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { login, register, isLoading } = useAuth()

  const totalSteps = 6

  const championships = [
    {
      id: "epsi-montpellier",
      name: "EPSI Montpellier",
      icon: "/assets/championships/epsi.png"
    }
  ]

  /**
   * Skill level options with background images
   */
  const skillLevels = [
    { id: "beginner", name: "Débutant", asset: "/assets/player-placeholder.png" },
    { id: "intermediate", name: "Intermédiaire", asset: "/assets/player.png" },
    { id: "expert", name: "Expert", asset: "/assets/scout.png" }
  ]

  /**
   * Generates a bunch of avatar options using different seeds with Big Smile style
   * @returns {string[]} - array of avatar URLs
   */
  const generateAvatarOptions = () => {
    const seeds = [
      `${formData.firstName}${formData.lastName}`,
      `${formData.email}`,
      `${formData.firstName}1`,
      `${formData.lastName}2`,
      `avatar${Math.random()}`,
      `player${Date.now()}`,
      `user${formData.firstName}`,
      `${formData.lastName}player`,
      `bigsmile${formData.firstName}`,
      `champion${formData.lastName}`,
      `foosball${formData.firstName}`,
      `epsi${formData.lastName}`
    ]
    
    return seeds.map(seed => 
      `https://api.dicebear.com/9.x/big-smile/svg?seed=${encodeURIComponent(seed)}&backgroundColor=transparent`
    )
  }

  /**
   * Handles the login form submission - pretty straightforward
   */
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    
    const result = await login(loginData.email, loginData.password)
    if (!result.success) {
      setErrors({ login: result.error || "Échec de la connexion" })
    }
  }

  /**
   * Validates the current registration step - each step has its own rules
   * @param {RegisterStep} step - which step we're checking
   * @returns {boolean} - true if valid, false if errors found
   */
  const validateRegisterStep = (step: RegisterStep): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = "Le prénom est requis"
        if (!formData.lastName.trim()) newErrors.lastName = "Le nom est requis"
        if (!formData.email.trim()) {
          newErrors.email = "L'email est requis"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Format d'email invalide"
        }
        if (!formData.password) {
          newErrors.password = "Le mot de passe est requis"
        } else if (formData.password.length < 6) {
          newErrors.password = "Le mot de passe doit faire au moins 6 caractères"
        }
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = "Veuillez confirmer le mot de passe"
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "Les mots de passe ne correspondent pas"
        }
        break

      case 2:
        if (!formData.championship) newErrors.championship = "Veuillez choisir un championnat"
        break

      case 3:
        if (!formData.avatar) newErrors.avatar = "Veuillez choisir un avatar"
        break

      case 4:
        if (!formData.jerseyNumber || formData.jerseyNumber === "0" || formData.jerseyNumber === "00") {
          newErrors.jerseyNumber = "Veuillez choisir un numéro valide (1-99)"
        }
        break

      case 5:
        if (!formData.skillLevel) newErrors.skillLevel = "Veuillez choisir votre niveau"
        break

      case 6:
        if (!formData.position) newErrors.position = "Veuillez choisir votre position"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateRegisterStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps) as RegisterStep)
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1) as RegisterStep)
  }

  const handleRegisterSubmit = async () => {
    if (!validateRegisterStep(currentStep)) return

    const registerData: RegisterData = {
      email: formData.email,
      password: formData.password,
      name: `${formData.firstName} ${formData.lastName}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      championship: formData.championship,
      avatar: formData.avatar,
      jerseyNumber: parseInt(formData.jerseyNumber),
      skillLevel: formData.skillLevel,
      position: formData.position
    }

    const result = await register(registerData)
    
    if (result.success) {
      setMode("login")
      setCurrentStep(1)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        championship: "",
        avatar: "",
        avatarIndex: 0,
        jerseyNumber: "",
        skillLevel: "",
        position: "",
      })
      setErrors({})
    } else {
      setErrors({ register: result.error || "Erreur lors de l'inscription" })
    }
  }

  const switchToRegister = () => {
    setMode("register")
    setCurrentStep(1)
    setErrors({})
  }

  const switchToLogin = () => {
    setMode("login")
    setErrors({})
  }

  const updateFormData = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field.toString()]) {
      setErrors(prev => ({ ...prev, [field.toString()]: "" }))
    }
  }

  /**
   * Cycles through avatar options - wraps around at the edges
   * @param {'prev'|'next'} direction - which way to navigate
   */
  const navigateAvatar = (direction: 'prev' | 'next') => {
    const avatarOptions = generateAvatarOptions()
    const currentIndex = formData.avatarIndex
    let newIndex: number
    
    if (direction === 'next') {
      newIndex = currentIndex < avatarOptions.length - 1 ? currentIndex + 1 : 0
    } else {
      newIndex = currentIndex > 0 ? currentIndex - 1 : avatarOptions.length - 1
    }
    
    updateFormData('avatarIndex', newIndex)
    updateFormData('avatar', avatarOptions[newIndex])
  }

  const renderLoginForm = () => (
    <form onSubmit={handleLoginSubmit}>
      <div className="flex flex-col gap-6 max-w-md mx-auto">
        <div className="flex flex-col items-center text-center">
          <img 
            src="/assets/logo.png" 
            alt="Logo" 
            className="h-12 w-auto mb-4"
          />
          <h1 className="text-2xl font-bold babylink-brand">
            <span className="text-white">Baby</span><span className="text-[#EA1846]">Link</span>
          </h1>
          <p className="text-muted-foreground text-balance">
            Connectez-vous à votre compte
          </p>
        </div>
        
        {/* Espace pour les erreurs - seulement si erreur */}
        <AnimatePresence>
          {errors.login && (
            <motion.div 
              className="flex items-center justify-center"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-red-500 text-sm text-center bg-red-100 dark:bg-red-900/20 p-2 rounded w-full">
                {errors.login}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="anthony.serrano@epsi.fr"
            value={loginData.email}
            onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
            required
            disabled={isLoading}
          />
        </div>
        
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Mot de passe</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-2 hover:underline"
            >
              Mot de passe oublié ?
            </a>
          </div>
          <Input 
            id="password" 
            type="password" 
            value={loginData.password}
            onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
            required 
            disabled={isLoading}
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Connexion..." : "Se connecter"}
        </Button>
        
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-card text-muted-foreground relative z-10 px-2">
            Ou continuer avec
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <Button variant="outline" type="button" className="w-full" disabled={isLoading}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4">
              <path
                d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                fill="currentColor"
              />
            </svg>
          </Button>
          <Button variant="outline" type="button" className="w-full" disabled={isLoading}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
          </Button>
          <Button variant="outline" type="button" className="w-full" disabled={isLoading}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4">
              <path
                d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"
                fill="currentColor"
              />
            </svg>
          </Button>
        </div>
        
        <div className="text-center text-sm">
          Vous n&apos;avez pas de compte ?{" "}
          <button
            type="button"
            onClick={switchToRegister}
            className="underline underline-offset-4 text-[#EA1846] hover:text-[#EA1846]/80 transition-colors"
            disabled={isLoading}
          >
            S&apos;inscrire
          </button>
        </div>
      </div>
    </form>
  )

  const renderRegisterStepContent = () => {
    const stepContent = () => {
      switch (currentStep) {
        case 1:
          return (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold">Informations personnelles</h3>
                <p className="text-sm text-muted-foreground">
                  Commençons par vos informations de base
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateFormData("firstName", e.target.value)}
                    className={errors.firstName ? "border-[#EA1846]" : ""}
                  />
                  {errors.firstName && <p className="text-xs text-[#EA1846]">{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateFormData("lastName", e.target.value)}
                    className={errors.lastName ? "border-[#EA1846]" : ""}
                  />
                  {errors.lastName && <p className="text-xs text-[#EA1846]">{errors.lastName}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className={errors.email ? "border-[#EA1846]" : ""}
                />
                {errors.email && <p className="text-xs text-[#EA1846]">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  className={errors.password ? "border-[#EA1846]" : ""}
                />
                {errors.password && <p className="text-xs text-[#EA1846]">{errors.password}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                  className={errors.confirmPassword ? "border-[#EA1846]" : ""}
                />
                {errors.confirmPassword && <p className="text-xs text-[#EA1846]">{errors.confirmPassword}</p>}
              </div>
            </div>
          )

        case 2:
          return (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold">Choix du championnat</h3>
                <p className="text-sm text-muted-foreground">
                  Sélectionnez votre championnat
                </p>
              </div>
              <div className="space-y-3">
                {championships.map((championship) => (
                  <div
                    key={championship.id}
                    className={cn(
                      "border-2 rounded-lg p-4 cursor-pointer transition-all",
                      formData.championship === championship.id
                        ? "border-[#EA1846] bg-[#EA1846]/10"
                        : "border-border hover:border-[#EA1846]/50"
                    )}
                    onClick={() => updateFormData("championship", championship.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <img 
                        src={championship.icon} 
                        alt={championship.name}
                        className="w-10 h-6 object-contain"
                      />
                      <span className="font-medium">{championship.name}</span>
                    </div>
                  </div>
                ))}
              </div>
              {errors.championship && <p className="text-xs text-[#EA1846]">{errors.championship}</p>}
            </div>
          )

        case 3:
          const avatarOptions = generateAvatarOptions()
          const currentAvatar = avatarOptions[formData.avatarIndex] || avatarOptions[0]
          
          return (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold">Création de votre avatar</h3>
                <p className="text-sm text-muted-foreground">
                  Choisissez votre avatar avec les flèches
                </p>
              </div>
              
              <div className="flex items-center justify-center space-x-4">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateAvatar('prev')}
                  className="p-2 hover:bg-[#EA1846]/10"
                >
                  <ChevronLeft className="h-6 w-6 text-[#EA1846]" />
                </Button>
                
                <div className="flex-1 max-w-32 aspect-square flex items-center justify-center border-2 rounded-lg border-[#EA1846] bg-[#EA1846]/5">
                  <img 
                    src={currentAvatar} 
                    alt="Avatar sélectionné"
                    className="w-24 h-24"
                    onLoad={() => {
                      if (!formData.avatar) {
                        updateFormData('avatar', currentAvatar)
                      }
                    }}
                  />
                </div>
                
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateAvatar('next')}
                  className="p-2 hover:bg-[#EA1846]/10"
                >
                  <ChevronRight className="h-6 w-6 text-[#EA1846]" />
                </Button>
              </div>
              
              <div className="text-center text-sm text-muted-foreground">
                Avatar {formData.avatarIndex + 1} sur {avatarOptions.length}
              </div>
              
              {errors.avatar && <p className="text-xs text-[#EA1846] text-center">{errors.avatar}</p>}
            </div>
          )

        case 4:
          return (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold">Numéro de maillot</h3>
                <p className="text-sm text-muted-foreground">
                  Saisissez votre numéro (1-99) ou utilisez les flèches
                </p>
              </div>
              
              <div className="flex justify-center">
                <JerseyComponent 
                  number={formData.jerseyNumber} 
                  onChange={(value) => updateFormData("jerseyNumber", value)}
                />
              </div>
              
              {errors.jerseyNumber && <p className="text-xs text-[#EA1846] text-center">{errors.jerseyNumber}</p>}
            </div>
          )

        case 5:
          return (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold">Niveau au babyfoot</h3>
                <p className="text-sm text-muted-foreground">
                  Quel est votre niveau ?
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {skillLevels.map((level) => (
                  <motion.div
                    key={level.id}
                    className={cn(
                      "border-2 rounded-lg p-6 cursor-pointer transition-all relative overflow-hidden aspect-square flex flex-col items-center justify-center",
                      formData.skillLevel === level.id
                        ? "border-[#EA1846] bg-[#EA1846]/10"
                        : "border-border hover:border-[#EA1846]/50"
                    )}
                    onClick={() => updateFormData("skillLevel", level.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-20"
                      style={{ backgroundImage: `url('${level.asset}')` }}
                    />
                    <div className="relative z-10 text-center">
                      <div className="text-lg font-semibold">{level.name}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              {errors.skillLevel && <p className="text-xs text-[#EA1846] text-center">{errors.skillLevel}</p>}
            </div>
          )

        case 6:
          return (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold">Position préférée</h3>
                <p className="text-sm text-muted-foreground">
                  Choisissez votre position sur le terrain
                </p>
              </div>
              
              {/* Composant BabyFootPosition uniquement */}
              <div className="w-full flex justify-center">
                <BabyFootPosition 
                  selectedPosition={formData.position as keyof typeof POSITIONS || 'GOAL'}
                  onPositionChange={(position) => updateFormData("position", position)}
                />
              </div>
              
              {errors.position && <p className="text-xs text-[#EA1846] text-center">{errors.position}</p>}
            </div>
          )

        default:
          return null
      }
    }

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          variants={stepVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {stepContent()}
        </motion.div>
      </AnimatePresence>
    )
  }

  const renderRegisterForm = () => (
    <div className="space-y-6 flex flex-col min-h-[650px]">
      {/* Header avec navigation améliorée */}
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={switchToLogin}
          className="text-muted-foreground hover:text-[#EA1846] transition-colors"
        >
          ← Retour à la connexion
        </Button>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="p-2 hover:bg-[#EA1846]/10 rounded-full transition-colors disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5 text-[#EA1846]" />
          </Button>
          <span className="text-sm text-muted-foreground px-2">
            {currentStep} / {totalSteps}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNext}
            disabled={currentStep === totalSteps}
            className="p-2 hover:bg-[#EA1846]/10 rounded-full transition-colors disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5 text-[#EA1846]" />
          </Button>
        </div>
      </div>

      {/* Logo et titre */}
      <div className="flex flex-col items-center text-center">
        <img 
          src="/assets/logo.png" 
          alt="Logo" 
          className="h-12 w-auto mb-4"
        />
        <h1 className="text-2xl font-bold">Créer un compte</h1>
        <p className="text-muted-foreground text-balance">
          Étape {currentStep} sur {totalSteps}
        </p>
      </div>

      {/* Progress indicator - corrigé pour être toujours visible */}
      <div className="flex justify-center space-x-2">
        {Array.from({ length: totalSteps }, (_, i) => (
          <motion.div
            key={i}
            className={cn(
              "h-2 w-8 rounded-full transition-colors",
              i + 1 <= currentStep ? "bg-[#EA1846]" : "bg-gray-300 dark:bg-gray-600"
            )}
            initial={{ scale: 0.8 }}
            animate={{ 
              scale: i + 1 === currentStep ? 1.1 : 1
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* Espace pour les erreurs - seulement si erreur */}
      <AnimatePresence>
        {errors.register && (
          <motion.div 
            className="flex items-center justify-center"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-[#EA1846] text-sm text-center bg-red-100 dark:bg-red-900/20 p-2 rounded w-full">
              {errors.register}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step content - flex-1 pour prendre l'espace disponible */}
      <div className="flex-1">
        <div className={currentStep === 5 || currentStep === 6 ? "w-full" : "max-w-md mx-auto"}>
          {renderRegisterStepContent()}
        </div>
      </div>

      {/* Navigation buttons - fixés en bas avec effets hover améliorés */}
      <div className="flex justify-between pt-4 mt-auto">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="hover:bg-[#EA1846]/10 hover:border-[#EA1846]/50 transition-all duration-200"
        >
          Précédent
        </Button>
        
        {currentStep < totalSteps ? (
          <Button 
            onClick={handleNext}
            className="bg-[#EA1846] hover:bg-[#EA1846]/90 text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            Suivant
          </Button>
        ) : (
          <Button 
            onClick={handleRegisterSubmit} 
            disabled={isLoading}
            className="bg-[#EA1846] hover:bg-[#EA1846]/90 text-white transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            {isLoading ? "Création..." : "Créer le compte"}
          </Button>
        )}
      </div>
    </div>
  )

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className={cn(
          "grid p-0 transition-all duration-500 ease-in-out",
          mode === "register" ? "grid-cols-1" : "md:grid-cols-2"
        )}>
          {/* Panneau principal */}
          <div className={cn(
            "p-6 md:p-8 transition-all duration-500 ease-in-out relative overflow-hidden",
            mode === "register" ? "min-h-[650px]" : ""
          )}>
            {/* Suppression de l'animation entre login et register */}
            {mode === "login" ? renderLoginForm() : renderRegisterForm()}
          </div>
          
          {/* Bloc de droite - caché en mode inscription */}
          {mode === "login" && (
            <div className="bg-muted relative hidden md:block">
              <img
                src="/assets/login-background.png"
                alt="Background"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
          )}
        </CardContent>
      </Card>
      
      {mode === "register" && (
        <div className="text-muted-foreground text-center text-xs text-balance">
          En continuant, vous acceptez nos{" "}
          <a href="#" className="underline underline-offset-4 hover:text-[#EA1846]">
            Conditions d&apos;utilisation
          </a>{" "}
          et notre{" "}
          <a href="#" className="underline underline-offset-4 hover:text-[#EA1846]">
            Politique de confidentialité
          </a>.
        </div>
      )}
    </div>
  )
} 