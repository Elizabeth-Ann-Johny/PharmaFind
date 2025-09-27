"use client"

import { useState, useEffect } from "react"
import { User, Phone, Mail, MapPin, Settings, Heart, Package, Gift, LogOut, Edit } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("[v0] ProfilePage: Loading user data from localStorage")
    try {
      const userData = localStorage.getItem("user")
      console.log("[v0] ProfilePage: Raw user data:", userData)

      if (userData) {
        const parsedUser = JSON.parse(userData)
        console.log("[v0] ProfilePage: Parsed user data:", parsedUser)
        setUser(parsedUser)
      } else {
        console.log("[v0] ProfilePage: No user data found, redirecting to login")
        router.push("/auth/login")
      }
    } catch (error) {
      console.error("[v0] ProfilePage: Error loading user data:", error)
      router.push("/auth/login")
    } finally {
      setLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    console.log("[v0] ProfilePage: Logging out user")
    localStorage.removeItem("user")
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("savedMedicines")
    localStorage.removeItem("savedPharmacies")
    localStorage.removeItem("cartItems")
    router.push("/auth/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">Please log in to view your profile</p>
          <Link href="/auth/login">
            <Button>Go to Login</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="bg-turquoise-gradient py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <Avatar className="w-24 h-24 mb-4 border-4 border-white shadow-lg">
              <AvatarImage src="/placeholder.svg?key=ccbug" />
              <AvatarFallback className="text-2xl font-bold bg-white text-primary">
                {user.fullName?.charAt(0) || user.username?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold mb-1 text-white">{user.fullName || user.username}</h1>
            <p className="text-white/80 mb-4">PharmaFind User</p>
            <Link href="/profile/edit">
              <Button variant="outline" className="mb-4 gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                <p className="font-medium">{user.fullName || user.username}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                <p className="font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {user.email}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                <p className="font-medium flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  {user.phone || "Not provided"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Emergency Contact</label>
                <p className="font-medium flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  {user.emergencyContact || "Not provided"}
                </p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Address</label>
              <p className="font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                {user.address || "Not provided"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Medical Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Medical Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Medical Conditions</label>
              <div className="flex gap-2 flex-wrap">
                {user.medicalConditions && user.medicalConditions.length > 0 ? (
                  user.medicalConditions.map((condition: string, index: number) => (
                    <Badge key={index} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {condition}
                    </Badge>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">No medical conditions listed</p>
                )}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Allergies</label>
              <div className="flex gap-2 flex-wrap">
                {user.allergies && user.allergies.length > 0 ? (
                  user.allergies.map((allergy: string, index: number) => (
                    <Badge key={index} variant="destructive" className="bg-red-100 text-red-800 border-red-200">
                      {allergy}
                    </Badge>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">No allergies listed</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/profile/orders">
            <Button
              variant="outline"
              className="h-16 w-full justify-start gap-3 hover:bg-primary/5 hover:border-primary/20 bg-transparent"
            >
              <Package className="h-6 w-6 text-primary" />
              <div className="text-left">
                <div className="font-medium">Orders</div>
                <div className="text-sm text-muted-foreground">View order history</div>
              </div>
            </Button>
          </Link>

          <Link href="/profile/rewards">
            <Button
              variant="outline"
              className="h-16 w-full justify-start gap-3 hover:bg-primary/5 hover:border-primary/20 bg-transparent"
            >
              <Gift className="h-6 w-6 text-primary" />
              <div className="text-left">
                <div className="font-medium">Rewards</div>
                <div className="text-sm text-muted-foreground">Check your points</div>
              </div>
            </Button>
          </Link>
        </div>

        <Link href="/profile/settings">
          <Button
            variant="outline"
            className="w-full h-16 justify-start gap-3 hover:bg-primary/5 hover:border-primary/20 bg-transparent"
          >
            <Settings className="h-6 w-6 text-primary" />
            <div className="text-left">
              <div className="font-medium">Settings</div>
              <div className="text-sm text-muted-foreground">Manage your preferences</div>
            </div>
          </Button>
        </Link>

        <Button variant="destructive" className="w-full h-12 gap-2" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      <BottomNavigation />
      <div className="h-20"></div>
    </div>
  )
}
