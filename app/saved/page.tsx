"use client"

import { useState, useEffect } from "react"
import { Heart, Search, MapPin, Star, Navigation, Clock, Phone } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

export default function SavedPage() {
  const [savedMedicines, setSavedMedicines] = useState<any[]>([])
  const [savedPharmacies, setSavedPharmacies] = useState<any[]>([])
  const [savedPharmacyIds, setSavedPharmacyIds] = useState<number[]>([])

  useEffect(() => {
    const savedMeds = localStorage.getItem("savedMedicines")
    if (savedMeds) {
      setSavedMedicines(JSON.parse(savedMeds))
    }

    const savedPharmIds = localStorage.getItem("savedPharmacies")
    if (savedPharmIds) {
      const ids = JSON.parse(savedPharmIds)
      setSavedPharmacyIds(ids)
      // Filter pharmacies based on saved IDs
      const filteredPharmacies = pharmacies.filter((pharmacy) => ids.includes(pharmacy.id))
      setSavedPharmacies(filteredPharmacies)
    }
  }, [])

  const removeSavedMedicine = (medicineId: string) => {
    const updated = savedMedicines.filter((medicine) => medicine.id !== medicineId)
    setSavedMedicines(updated)
    localStorage.setItem("savedMedicines", JSON.stringify(updated))
  }

  const removeSavedPharmacy = (pharmacyId: number) => {
    const updatedIds = savedPharmacyIds.filter((id) => id !== pharmacyId)
    const updatedPharmacies = savedPharmacies.filter((pharmacy) => pharmacy.id !== pharmacyId)

    setSavedPharmacyIds(updatedIds)
    setSavedPharmacies(updatedPharmacies)
    localStorage.setItem("savedPharmacies", JSON.stringify(updatedIds))
  }

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`
  }

  const handleDirections = (pharmacy: any) => {
    const query = encodeURIComponent(pharmacy.address)
    window.open(`https://maps.google.com/?q=${query}`, "_blank")
  }

  const totalSaved = savedMedicines.length + savedPharmacies.length

  if (totalSaved === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="Saved Items" />

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Heart className="h-12 w-12 text-primary/60" />
            </div>

            <h1 className="text-2xl font-bold mb-4">No Saved Items Yet</h1>
            <p className="text-muted-foreground mb-8 max-w-md text-pretty">
              Start searching for medicines and pharmacies to save your favorites for quick access.
            </p>

            <Link href="/">
              <Button className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Start Searching
              </Button>
            </Link>
          </div>
        </div>

        <BottomNavigation />
        <div className="h-20"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="Saved Items" />

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="medicines" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="medicines">Medicines ({savedMedicines.length})</TabsTrigger>
            <TabsTrigger value="pharmacies">Pharmacies ({savedPharmacies.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="medicines" className="space-y-4 mt-6">
            {savedMedicines.length === 0 ? (
              <div className="text-center py-8">
                <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No saved medicines yet</p>
              </div>
            ) : (
              savedMedicines.map((medicine) => (
                <Card key={medicine.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <img
                          src={medicine.image || "/placeholder.svg"}
                          alt={medicine.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg truncate">{medicine.name}</h3>
                            <p className="text-sm text-muted-foreground">{medicine.description}</p>
                            <p className="font-bold text-primary mt-1">₹{medicine.price}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSavedMedicine(medicine.id)}
                            className="p-1 h-8 w-8"
                          >
                            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="pharmacies" className="space-y-4 mt-6">
            {savedPharmacies.length === 0 ? (
              <div className="text-center py-8">
                <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No saved pharmacies yet</p>
              </div>
            ) : (
              savedPharmacies.map((pharmacy) => (
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
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSavedPharmacy(pharmacy.id)}
                            className="p-1 h-8 w-8"
                          >
                            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
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
                          <Link href={`/pharmacy/${pharmacy.id}`} className="flex-1">
                            <Button className="w-full h-9">View Details</Button>
                          </Link>
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
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation />
      <div className="h-20"></div>
    </div>
  )
}
