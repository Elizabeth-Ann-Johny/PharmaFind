"use client"

import { useState, useEffect } from "react"
import { ShoppingCart, Plus, Minus, Trash2, MapPin, CreditCard } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<any[]>([])
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [deliveryOption, setDeliveryOption] = useState("home") // "home" or "pickup"

  useEffect(() => {
    const cart = localStorage.getItem("cartItems")
    if (cart) {
      setCartItems(JSON.parse(cart))
    }
  }, [])

  const updateQuantity = (id: string, change: number) => {
    const updated = cartItems
      .map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + change)
          return newQuantity === 0 ? null : { ...item, quantity: newQuantity }
        }
        return item
      })
      .filter(Boolean) as typeof cartItems

    setCartItems(updated)
    localStorage.setItem("cartItems", JSON.stringify(updated))
  }

  const removeItem = (id: string) => {
    const updated = cartItems.filter((item) => item.id !== id)
    setCartItems(updated)
    localStorage.setItem("cartItems", JSON.stringify(updated))
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setPromoApplied(true)
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = promoApplied ? subtotal * 0.1 : 0
  const deliveryFee = deliveryOption === "home" ? 20 : 0
  const total = subtotal - discount + deliveryFee

  const groupedItems = cartItems.reduce(
    (acc, item) => {
      if (!acc[item.pharmacy]) {
        acc[item.pharmacy] = []
      }
      acc[item.pharmacy].push(item)
      return acc
    },
    {} as Record<string, typeof cartItems>,
  )

  const handleCheckout = () => {
    router.push("/checkout")
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="Shopping Cart" />

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <ShoppingCart className="h-12 w-12 text-primary/60" />
            </div>

            <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8 max-w-md text-pretty">
              Start shopping for medicines and they will appear here for easy checkout.
            </p>

            <Link href="/">
              <Button className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Start Shopping
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
      <Header title="Shopping Cart" />

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Cart Items by Pharmacy */}
        {Object.entries(groupedItems).map(([pharmacy, items]) => (
          <Card key={pharmacy}>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                {pharmacy}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item, index) => (
                <div key={item.id}>
                  <div className="flex gap-4">
                    {/* Item Image */}
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{item.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-bold text-primary">₹{item.price}</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {item.availability}
                        </Badge>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="h-8 w-8 p-0 bg-transparent"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="h-8 w-8 p-0 bg-transparent"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-bold">₹{item.price * item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < items.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}

        {/* Delivery Options */}
        <Card>
          <CardHeader>
            <CardTitle>Delivery Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  deliveryOption === "home" ? "border-primary bg-primary/5" : "border-border"
                }`}
                onClick={() => setDeliveryOption("home")}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Home Delivery</h4>
                    <p className="text-sm text-muted-foreground">Delivered to your doorstep</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">₹20</div>
                    <div className="text-xs text-muted-foreground">2-4 hours</div>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  deliveryOption === "pickup" ? "border-primary bg-primary/5" : "border-border"
                }`}
                onClick={() => setDeliveryOption("pickup")}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Store Pickup</h4>
                    <p className="text-sm text-muted-foreground">Collect from pharmacy</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">Free</div>
                    <div className="text-xs text-muted-foreground">Ready in 30 min</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Promo Code */}
        <Card>
          <CardHeader>
            <CardTitle>Promo Code</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                disabled={promoApplied}
              />
              <Button
                variant="outline"
                onClick={applyPromoCode}
                disabled={promoApplied || !promoCode}
                className="bg-transparent"
              >
                {promoApplied ? "Applied" : "Apply"}
              </Button>
            </div>
            {promoApplied && (
              <p className="text-sm text-green-600 mt-2">Promo code applied! You saved ₹{discount.toFixed(0)}</p>
            )}
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
              <span>₹{subtotal}</span>
            </div>
            {promoApplied && (
              <div className="flex justify-between text-green-600">
                <span>Discount (SAVE10)</span>
                <span>-₹{discount.toFixed(0)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>{deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{total.toFixed(0)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Checkout Button */}
        <div className="sticky bottom-24 z-10">
          <Button onClick={handleCheckout} className="w-full h-12 text-lg">
            <CreditCard className="h-5 w-5 mr-2" />
            Proceed to Checkout - ₹{total.toFixed(0)}
          </Button>
        </div>
      </div>

      <BottomNavigation />
      <div className="h-20"></div>
    </div>
  )
}
