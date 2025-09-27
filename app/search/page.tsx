"use client"

import { useState, useEffect } from "react"
import { Search, Camera, Mic, Clock, ArrowLeft, MapPin } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { BottomNavigation } from "@/components/bottom-navigation"

const recentSearches = ["Paracetamol", "Aspirin", "Vitamin D3", "Cough Syrup", "Insulin"]

const searchSuggestions = [
  "Paracetamol 500mg",
  "Aspirin 75mg",
  "Ibuprofen 400mg",
  "Amoxicillin 250mg",
  "Vitamin D3 1000IU",
  "Omeprazole 20mg",
  "Metformin 500mg",
  "Atorvastatin 10mg",
]

const medicineDatabase = [
  // Paracetamol variants
  {
    id: 1,
    name: "Paracetamol 500mg",
    brand: "Crocin",
    type: "Tablet",
    price: "₹25",
    availability: "In Stock",
    pharmacies: 12,
    keywords: ["paracetamol", "crocin", "fever", "pain", "headache"],
  },
  {
    id: 2,
    name: "Paracetamol 650mg",
    brand: "Dolo",
    type: "Tablet",
    price: "₹35",
    availability: "In Stock",
    pharmacies: 8,
    keywords: ["paracetamol", "dolo", "fever", "pain", "headache"],
  },
  {
    id: 3,
    name: "Paracetamol Syrup",
    brand: "Calpol",
    type: "Syrup",
    price: "₹45",
    availability: "Limited Stock",
    pharmacies: 5,
    keywords: ["paracetamol", "calpol", "syrup", "fever", "children"],
  },
  // Aspirin variants
  {
    id: 4,
    name: "Aspirin 75mg",
    brand: "Disprin",
    type: "Tablet",
    price: "₹18",
    availability: "In Stock",
    pharmacies: 15,
    keywords: ["aspirin", "disprin", "pain", "fever", "blood thinner"],
  },
  {
    id: 5,
    name: "Aspirin 325mg",
    brand: "Ecosprin",
    type: "Tablet",
    price: "₹22",
    availability: "In Stock",
    pharmacies: 10,
    keywords: ["aspirin", "ecosprin", "pain", "fever", "heart"],
  },
  // Ibuprofen variants
  {
    id: 6,
    name: "Ibuprofen 400mg",
    brand: "Brufen",
    type: "Tablet",
    price: "₹28",
    availability: "In Stock",
    pharmacies: 9,
    keywords: ["ibuprofen", "brufen", "pain", "inflammation", "fever"],
  },
  {
    id: 7,
    name: "Ibuprofen 200mg",
    brand: "Advil",
    type: "Tablet",
    price: "₹32",
    availability: "In Stock",
    pharmacies: 7,
    keywords: ["ibuprofen", "advil", "pain", "inflammation", "fever"],
  },
  // Antibiotics
  {
    id: 8,
    name: "Amoxicillin 250mg",
    brand: "Novamox",
    type: "Capsule",
    price: "₹45",
    availability: "In Stock",
    pharmacies: 11,
    keywords: ["amoxicillin", "novamox", "antibiotic", "infection"],
  },
  {
    id: 9,
    name: "Amoxicillin 500mg",
    brand: "Augmentin",
    type: "Tablet",
    price: "₹65",
    availability: "Limited Stock",
    pharmacies: 6,
    keywords: ["amoxicillin", "augmentin", "antibiotic", "infection"],
  },
  // Vitamins
  {
    id: 10,
    name: "Vitamin D3 1000IU",
    brand: "Calcirol",
    type: "Tablet",
    price: "₹55",
    availability: "In Stock",
    pharmacies: 13,
    keywords: ["vitamin d3", "calcirol", "vitamin", "bone", "immunity"],
  },
  {
    id: 11,
    name: "Vitamin C 500mg",
    brand: "Limcee",
    type: "Tablet",
    price: "₹38",
    availability: "In Stock",
    pharmacies: 14,
    keywords: ["vitamin c", "limcee", "vitamin", "immunity", "antioxidant"],
  },
  // Cough and Cold
  {
    id: 12,
    name: "Cough Syrup",
    brand: "Benadryl",
    type: "Syrup",
    price: "₹42",
    availability: "In Stock",
    pharmacies: 8,
    keywords: ["cough syrup", "benadryl", "cough", "cold", "throat"],
  },
  {
    id: 13,
    name: "Cetirizine 10mg",
    brand: "Zyrtec",
    type: "Tablet",
    price: "₹24",
    availability: "In Stock",
    pharmacies: 12,
    keywords: ["cetirizine", "zyrtec", "allergy", "antihistamine", "cold"],
  },
  // Diabetes
  {
    id: 14,
    name: "Metformin 500mg",
    brand: "Glycomet",
    type: "Tablet",
    price: "₹48",
    availability: "In Stock",
    pharmacies: 9,
    keywords: ["metformin", "glycomet", "diabetes", "blood sugar"],
  },
  // Heart medications
  {
    id: 15,
    name: "Atorvastatin 10mg",
    brand: "Lipitor",
    type: "Tablet",
    price: "₹52",
    availability: "In Stock",
    pharmacies: 7,
    keywords: ["atorvastatin", "lipitor", "cholesterol", "heart", "statin"],
  },
  // Stomach medications
  {
    id: 16,
    name: "Omeprazole 20mg",
    brand: "Prilosec",
    type: "Capsule",
    price: "₹36",
    availability: "In Stock",
    pharmacies: 10,
    keywords: ["omeprazole", "prilosec", "acidity", "stomach", "gastric"],
  },
]

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(!!initialQuery)
  const [isListening, setIsListening] = useState(false)
  const [medicineResults, setMedicineResults] = useState<any[]>([])

  useEffect(() => {
    if (initialQuery) {
      setShowResults(true)
      performSearch(initialQuery)
    }
  }, [initialQuery])

  const performSearch = (query: string) => {
    console.log("[v0] Performing search for:", query)

    if (!query.trim()) {
      setMedicineResults([])
      return
    }

    const searchTerm = query.toLowerCase().trim()

    // Filter medicines based on name, brand, or keywords
    const results = medicineDatabase.filter(
      (medicine) =>
        medicine.name.toLowerCase().includes(searchTerm) ||
        medicine.brand.toLowerCase().includes(searchTerm) ||
        medicine.keywords.some((keyword) => keyword.toLowerCase().includes(searchTerm)) ||
        searchTerm.includes(medicine.name.toLowerCase().split(" ")[0]), // Match first word of medicine name
    )

    console.log("[v0] Search results found:", results.length, "medicines")
    setMedicineResults(results)
  }

  const handleSearch = (query: string) => {
    if (!query.trim()) return

    setSearchQuery(query)
    setIsSearching(true)
    setShowResults(true)

    setTimeout(() => {
      performSearch(query)
      setIsSearching(false)
    }, 1000)

    // Update URL
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  const handleVoiceSearch = () => {
    setIsListening(true)
    // Simulate voice recognition with different medicines
    const voiceSearchTerms = ["Aspirin", "Ibuprofen", "Vitamin D3", "Cough Syrup", "Amoxicillin"]
    const randomTerm = voiceSearchTerms[Math.floor(Math.random() * voiceSearchTerms.length)]

    setTimeout(() => {
      setIsListening(false)
      handleSearch(randomTerm)
    }, 2000)
  }

  const handleCameraSearch = () => {
    // Simulate camera capture
    alert("Camera feature coming soon!")
  }

  const handleMedicineSelect = (medicine: any) => {
    router.push(`/pharmacies?medicine=${encodeURIComponent(medicine.name)}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="Search Medicine" showLogo={false} />

      <div className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>

        {/* Search Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search paracetamol, aspirin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch(searchQuery)}
                className="pl-10 pr-20 h-12 text-base"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={handleCameraSearch}
                  title="Camera Search"
                >
                  <Camera className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className={`h-8 w-8 p-0 ${isListening ? "text-red-500" : ""}`}
                  onClick={handleVoiceSearch}
                  title="Voice Search"
                >
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {searchQuery && (
              <Button onClick={() => handleSearch(searchQuery)} className="w-full mt-3" disabled={isSearching}>
                {isSearching ? "Searching..." : "Search"}
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Voice Listening Indicator */}
        {isListening && (
          <Card className="border-primary bg-primary/5">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Mic className="h-5 w-5 animate-pulse" />
                <span>Listening...</span>
              </div>
            </CardContent>
          </Card>
        )}

        {!showResults ? (
          <>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    Recent Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSearch(search)}
                        className="h-8 text-sm bg-transparent"
                      >
                        {search}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Popular Searches */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Popular Medicines</h3>
                <div className="grid grid-cols-2 gap-2">
                  {searchSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSearch(suggestion)}
                      className="justify-start h-auto p-2 text-left bg-transparent"
                    >
                      <Search className="h-3 w-3 mr-2 text-muted-foreground" />
                      <span className="text-sm">{suggestion}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Search Results */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Search Results for "{searchQuery}"</h2>
              <Badge variant="secondary">{medicineResults.length} found</Badge>
            </div>

            {isSearching ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-4">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-1/2 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-1/4"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {medicineResults.map((medicine) => (
                  <Card
                    key={medicine.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleMedicineSelect(medicine)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{medicine.name}</h3>
                          <p className="text-muted-foreground">
                            {medicine.brand} • {medicine.type}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-primary text-lg">{medicine.price}</div>
                          <Badge
                            variant={medicine.availability === "In Stock" ? "default" : "secondary"}
                            className={
                              medicine.availability === "In Stock"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {medicine.availability}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {medicine.pharmacies} pharmacies nearby
                        </span>
                        <span className="text-primary font-medium">View Pharmacies →</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* No Results */}
            {!isSearching && medicineResults.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">No medicines found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try searching with different keywords or check the spelling
                  </p>
                  <Button variant="outline" onClick={() => setShowResults(false)} className="bg-transparent">
                    Try Different Search
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>

      <BottomNavigation />
      <div className="h-20"></div>
    </div>
  )
}
