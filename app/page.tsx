"use client"

import { useState, useEffect } from "react"
import { Search, Camera, Mic, MapPin, ArrowRight, Pill } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { BottomNavigation } from "@/components/bottom-navigation"

const quickSearches = ["Paracetamol", "Aspirin", "Vitamin D3", "Cough Syrup"]

export default function HomePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [userName, setUserName] = useState("Guest")

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const user = JSON.parse(userData)
      setUserName(user.fullName || user.username || "Guest")
    }
  }, [])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    } else {
      router.push("/search")
    }
  }

  const handleQuickSearch = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  const handleVoiceSearch = () => {
    router.push("/search")
  }

  const handleCameraSearch = () => {
    router.push("/search")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5">
      <Header />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="absolute inset-0 bg-[url('/medical-pills-pattern.jpg')] opacity-10"></div>
        <div className="relative container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4 text-balance">Find Your Medicine</h1>
          <h2 className="text-xl mb-8 text-balance">Locate Nearby Pharmacies</h2>
          <p className="text-lg mb-8 text-primary-foreground/90 max-w-2xl mx-auto text-pretty">
            Search for any medicine and discover the nearest pharmacies with real-time availability and pricing
          </p>

          {/* Search Card */}
          <Card className="max-w-2xl mx-auto bg-background/95 backdrop-blur">
            <CardContent className="p-6 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Enter medicine name (e.g., Paracetamol, Aspirin)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-10 h-12 text-base"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={handleCameraSearch}>
                    <Camera className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={handleVoiceSearch}>
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Your location (optional)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>

              <Button onClick={handleSearch} className="w-full h-12 text-base font-semibold">
                Find Pharmacies
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-balance">Hi {userName},</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Welcome to PharmaFind! Your trusted companion for finding medicines and nearby pharmacies. Search, compare
            prices, and get your medicines delivered quickly and safely.
          </p>
        </div>

        {/* Quick Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Quick Search</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {quickSearches.map((medicine, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleQuickSearch(medicine)}
                  className="h-12 bg-transparent"
                >
                  <Pill className="h-4 w-4 mr-2" />
                  {medicine}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Health Journey Illustration */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-2">
                  <div className="w-8 h-8 bg-red-400 rounded-full"></div>
                </div>
                <p className="text-sm text-muted-foreground">Feeling Sick</p>
              </div>
              <ArrowRight className="h-6 w-6 text-muted-foreground" />
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-2">
                  <Pill className="h-8 w-8 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Take Medicine</p>
              </div>
              <ArrowRight className="h-6 w-6 text-muted-foreground" />
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                  <div className="w-8 h-8 bg-green-400 rounded-full"></div>
                </div>
                <p className="text-sm text-muted-foreground">Get Better</p>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Your Health Journey Starts Here</h3>
            <p className="text-muted-foreground">
              Find the right medicine, get it from verified pharmacies, and recover faster
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-balance">Why Choose PharmaFind?</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Location</h3>
              <p className="text-muted-foreground text-pretty">
                Find pharmacies near you with accurate distance and directions
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Medicine Availability</h3>
              <p className="text-muted-foreground text-pretty">
                Check real-time stock levels and compare prices across pharmacies
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-primary-foreground rounded-full"></div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Verified Pharmacies</h3>
              <p className="text-muted-foreground text-pretty">
                All listed pharmacies are verified and licensed for your safety
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNavigation />
      <div className="h-20"></div>
    </div>
  )
}
