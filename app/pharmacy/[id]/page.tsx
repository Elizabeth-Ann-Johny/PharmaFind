"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, MapPin, Clock, Phone, Star, Navigation, Heart, Plus, Minus, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { BottomNavigation } from "@/components/bottom-navigation"

// Mock pharmacy data - in real app this would come from API
const pharmacyData = {
  1: {
    id: 1,
    name: "HealthPlus Pharmacy",
    address: "123 Medical Street, Health District, City - 123456",
    distance: "0.5 km",
    rating: 4.8,
    reviews: 124,
    openTime: "24/7",
    phone: "+91 9876543210",
    email: "contact@healthplus.com",
    image: "/placeholder.svg?height=200&width=400&text=HealthPlus+Pharmacy",
    description:
      "Your trusted neighborhood pharmacy providing quality medicines and healthcare products 24/7. We have certified pharmacists available for consultation.",
    services: ["24/7 Service", "Home Delivery", "Online Consultation", "Insurance Accepted"],
    medicines: [
      { name: "Paracetamol 500mg", price: "₹25", availability: "In Stock", quantity: 0 },
      { name: "Aspirin 75mg", price: "₹18", availability: "In Stock", quantity: 0 },
      { name: "Vitamin D3", price: "₹45", availability: "Limited Stock", quantity: 0 },
      { name: "Cough Syrup", price: "₹35", availability: "In Stock", quantity: 0 },
    ],
  },
  2: {
    id: 2,
    name: "MediCare Store",
    address: "456 Wellness Avenue, Care Center, City - 123457",
    distance: "1.2 km",
    rating: 4.6,
    reviews: 89,
    openTime: "8:00 AM - 10:00 PM",
    phone: "+91 9876543211",
    email: "info@medicare.com",
    image: "/placeholder.svg?height=200&width=400&text=MediCare+Store",
    description:
      "Modern pharmacy with a wide range of medicines, health supplements, and medical equipment. Expert pharmacist consultation available.",
    services: ["Home Delivery", "Online Consultation", "Medical Equipment", "Health Checkups"],
    medicines: [
      { name: "Paracetamol 500mg", price: "₹28", availability: "In Stock", quantity: 0 },
      { name: "Aspirin 75mg", price: "₹20", availability: "In Stock", quantity: 0 },
      { name: "Vitamin D3", price: "₹48", availability: "In Stock", quantity: 0 },
      { name: "Cough Syrup", price: "₹38", availability: "Limited Stock", quantity: 0 },
    ],
  },
  // Add more pharmacy data as needed
}

export default function PharmacyDetailPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const pharmacyId = Number.parseInt(params.id as string)
  const medicine = searchParams.get("medicine") || ""

  const pharmacy = pharmacyData[pharmacyId as keyof typeof pharmacyData]
  const [isSaved, setIsSaved] = useState(false)
  const [medicines, setMedicines] = useState(pharmacy?.medicines || [])
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const savedPharmacies = localStorage.getItem("savedPharmacies")
    if (savedPharmacies) {
      const saved = JSON.parse(savedPharmacies)
      setIsSaved(saved.includes(pharmacyId))
    }
  }, [pharmacyId])

  const updateQuantity = (index: number, change: number) => {
    setMedicines((prev) => {
      const updated = [...prev]
      const newQuantity = Math.max(0, updated[index].quantity + change)
      const oldQuantity = updated[index].quantity
      updated[index].quantity = newQuantity

      // Update cart count
      setCartCount((prevCount) => prevCount + (newQuantity - oldQuantity))

      return updated
    })
  }

  const handleCall = () => {
    window.location.href = `tel:${pharmacy.phone}`
  }

  const handleDirections = () => {
    const query = encodeURIComponent(pharmacy.address)
    window.open(`https://maps.google.com/?q=${query}`, "_blank")
  }

  const toggleSave = () => {
    const savedPharmacies = localStorage.getItem("savedPharmacies")
    let saved = savedPharmacies ? JSON.parse(savedPharmacies) : []

    if (isSaved) {
      saved = saved.filter((id: number) => id !== pharmacyId)
    } else {
      saved.push(pharmacyId)
    }

    localStorage.setItem("savedPharmacies", JSON.stringify(saved))
    setIsSaved(!isSaved)
  }

  const handleAddToCart = () => {
    const itemsInCart = medicines.filter((med) => med.quantity > 0)
    if (itemsInCart.length > 0) {
      const existingCart = localStorage.getItem("cartItems")
      const cartItems = existingCart ? JSON.parse(existingCart) : []

      itemsInCart.forEach((item) => {
        const cartItem = {
          id: `${pharmacyId}-${item.name}`,
          name: item.name,
          price: Number.parseInt(item.price.replace("₹", "")),
          quantity: item.quantity,
          pharmacy: pharmacy.name,
          pharmacyId: pharmacyId,
          availability: item.availability,
          image: `/placeholder.svg?height=60&width=60&text=${item.name.charAt(0)}`,
        }

        const existingIndex = cartItems.findIndex((ci: any) => ci.id === cartItem.id)
        if (existingIndex >= 0) {
          cartItems[existingIndex].quantity += cartItem.quantity
        } else {
          cartItems.push(cartItem)
        }
      })

      localStorage.setItem("cartItems", JSON.stringify(cartItems))
      router.push("/cart")
    }
  }

  if (!pharmacy) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Pharmacy not found</h2>
          <Link href="/pharmacies">
            <Button>Back to Pharmacies</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="Pharmacy Details" showLogo={false} />

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Back Button */}
        <div className="flex items-center gap-4">
          <Link href="/pharmacies">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>

        {/* Pharmacy Header */}
        <Card>
          <CardContent className="p-0">
            <div className="relative">
              <img
                src={pharmacy.image || "/placeholder.svg"}
                alt={pharmacy.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSave}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white"
              >
                <Heart className={`h-4 w-4 ${isSaved ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
              </Button>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{pharmacy.name}</h1>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{pharmacy.rating}</span>
                    <span className="text-muted-foreground">({pharmacy.reviews} reviews)</span>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {pharmacy.distance}
                </Badge>
              </div>

              <p className="text-muted-foreground mb-4">{pharmacy.description}</p>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{pharmacy.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{pharmacy.openTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{pharmacy.phone}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button onClick={handleCall} className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
                <Button variant="outline" onClick={handleDirections} className="bg-transparent">
                  <Navigation className="h-4 w-4 mr-2" />
                  Directions
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services */}
        <Card>
          <CardHeader>
            <CardTitle>Services Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {pharmacy.services.map((service, index) => (
                <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                  {service}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Medicines */}
        <Card>
          <CardHeader>
            <CardTitle>Available Medicines</CardTitle>
            {medicine && (
              <p className="text-sm text-muted-foreground">
                Showing results for: <span className="font-medium">{medicine}</span>
              </p>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {medicines.map((med, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{med.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-bold text-primary">{med.price}</span>
                        <Badge
                          variant={med.availability === "In Stock" ? "default" : "secondary"}
                          className={
                            med.availability === "In Stock"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {med.availability}
                        </Badge>
                      </div>
                    </div>

                    {med.availability === "In Stock" && (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(index, -1)}
                          disabled={med.quantity === 0}
                          className="h-8 w-8 p-0 bg-transparent"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{med.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(index, 1)}
                          className="h-8 w-8 p-0 bg-transparent"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                  {index < medicines.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Add to Cart Button */}
        {cartCount > 0 && (
          <div className="fixed bottom-24 left-4 right-4 z-10">
            <Button onClick={handleAddToCart} className="w-full h-12 text-lg">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add {cartCount} items to Cart
            </Button>
          </div>
        )}
      </div>

      <BottomNavigation />
      <div className="h-20"></div>
    </div>
  )
}
