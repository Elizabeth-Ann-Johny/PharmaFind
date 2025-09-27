"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, MapPin, Clock, Phone, Star, Navigation, Heart } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { BottomNavigation } from "@/components/bottom-navigation"

const pharmacies = [
  {
    id: 1,
    name: "HealthPlus Pharmacy",
    address: "123 Medical Street, Health District",
    distance: "0.5 km",
    rating: 4.8,
    reviews: 124,
    openTime: "24/7",
    phone: "+91 9876543210",
    price: "₹25",
    availability: "In Stock",
    image: "/placeholder.svg?height=80&width=80&text=HP",
  },
  {
    id: 2,
    name: "MediCare Store",
    address: "456 Wellness Avenue, Care Center",
    distance: "1.2 km",
    rating: 4.6,
    reviews: 89,
    openTime: "8:00 AM - 10:00 PM",
    phone: "+91 9876543211",
    price: "₹28",
    availability: "In Stock",
    image: "/placeholder.svg?height=80&width=80&text=MC",
  },
  {
    id: 3,
    name: "City Pharmacy",
    address: "789 Central Road, Downtown",
    distance: "2.1 km",
    rating: 4.4,
    reviews: 67,
    openTime: "9:00 AM - 9:00 PM",
    phone: "+91 9876543212",
    price: "₹30",
    availability: "Limited Stock",
    image: "/placeholder.svg?height=80&width=80&text=CP",
  },
  {
    id: 4,
    name: "Quick Meds",
    address: "321 Express Lane, Fast District",
    distance: "3.5 km",
    rating: 4.2,
    reviews: 45,
    openTime: "10:00 AM - 8:00 PM",
    phone: "+91 9876543213",
    price: "₹22",
    availability: "In Stock",
    image: "/placeholder.svg?height=80&width=80&text=QM",
  },
]

export default function PharmaciesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const medicine = searchParams.get("medicine") || "Medicine"

  const [savedPharmacies, setSavedPharmacies] = useState<number[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("savedPharmacies")
    if (saved) {
      setSavedPharmacies(JSON.parse(saved))
    }
  }, [])

  const toggleSave = (pharmacyId: number) => {
    const updated = savedPharmacies.includes(pharmacyId)
      ? savedPharmacies.filter((id) => id !== pharmacyId)
      : [...savedPharmacies, pharmacyId]

    setSavedPharmacies(updated)
    localStorage.setItem("savedPharmacies", JSON.stringify(updated))
  }

  const handlePharmacySelect = (pharmacy: any) => {
    router.push(`/pharmacy/${pharmacy.id}?medicine=${encodeURIComponent(medicine)}`)
  }

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`
  }

  const handleDirections = (pharmacy: any) => {
    // Open maps with directions
    const query = encodeURIComponent(pharmacy.address)
    window.open(`https://maps.google.com/?q=${query}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="Nearby Pharmacies" showLogo={false} />

      <div className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/search">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>

        {/* Search Info */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-lg">Searching for: {medicine}</h2>
                <p className="text-sm text-muted-foreground">{pharmacies.length} pharmacies found nearby</p>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Sorted by distance
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Pharmacy List */}
        <div className="space-y-4">
          {pharmacies.map((pharmacy) => (
            <Card key={pharmacy.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {/* Pharmacy Image */}
                  <div className="w-20 h-20 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <img
                      src={pharmacy.image || "/placeholder.svg"}
                      alt={pharmacy.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Pharmacy Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg truncate">{pharmacy.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{pharmacy.rating}</span>
                          <span>({pharmacy.reviews} reviews)</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => toggleSave(pharmacy.id)} className="p-1 h-8 w-8">
                        <Heart
                          className={`h-4 w-4 ${
                            savedPharmacies.includes(pharmacy.id)
                              ? "fill-red-500 text-red-500"
                              : "text-muted-foreground"
                          }`}
                        />
                      </Button>
                    </div>

                    <div className="space-y-1 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{pharmacy.address}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Navigation className="h-3 w-3" />
                          <span>{pharmacy.distance}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{pharmacy.openTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price and Availability */}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-bold text-lg text-primary">{pharmacy.price}</div>
                        <Badge
                          variant={pharmacy.availability === "In Stock" ? "default" : "secondary"}
                          className={
                            pharmacy.availability === "In Stock"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {pharmacy.availability}
                        </Badge>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button onClick={() => handlePharmacySelect(pharmacy)} className="flex-1 h-9">
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCall(pharmacy.phone)}
                        className="h-9 px-3 bg-transparent"
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDirections(pharmacy)}
                        className="h-9 px-3 bg-transparent"
                      >
                        <Navigation className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {pharmacies.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No pharmacies found</h3>
              <p className="text-muted-foreground mb-4">
                Try expanding your search radius or check a different location
              </p>
              <Button variant="outline" className="bg-transparent">
                Expand Search Area
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <BottomNavigation />
      <div className="h-20"></div>
    </div>
  )
}
