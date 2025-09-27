"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Pill } from "lucide-react"

export default function SplashPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if user is logged in (you can implement proper auth check here)
      const isLoggedIn = false // Replace with actual auth check

      if (isLoggedIn) {
        router.push("/")
      } else {
        router.push("/auth/login")
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-primary/80 flex items-center justify-center">
      <div className="text-center text-primary-foreground">
        <div className="flex items-center justify-center w-24 h-24 bg-primary-foreground/20 rounded-3xl mx-auto mb-8 animate-pulse">
          <Pill className="h-12 w-12" />
        </div>
        <h1 className="text-4xl font-bold mb-4">PharmaFind</h1>
        <p className="text-xl opacity-90">Find Your Medicine</p>
        <div className="mt-8">
          <div className="w-8 h-8 border-4 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    </div>
  )
}
