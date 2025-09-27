"use client"

import { useState } from "react"
import { ArrowLeft, MapPin, CreditCard, Wallet, Smartphone, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function CheckoutPage() {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [deliveryAddress, setDeliveryAddress] = useState({
    name: "John Doe",
    phone: "+91 9876543210",
    address: "123 Health Street, Medical District, City - 123456",
  })

  const orderSummary = {
    subtotal: 135,
    discount: 13.5,
    deliveryFee: 20,
    total: 141.5,
  }

  const handlePlaceOrder = () => {
    // In real app, this would process payment and create order
    router.push("/order-confirmation")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="Checkout" showLogo={false} />

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Back Button */}
        <div className="flex items-center gap-4">
          <Link href="/cart">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Button>
          </Link>
        </div>

        {/* Delivery Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Delivery Address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={deliveryAddress.name}
                  onChange={(e) => setDeliveryAddress({ ...deliveryAddress, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={deliveryAddress.phone}
                  onChange={(e) => setDeliveryAddress({ ...deliveryAddress, phone: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Complete Address</Label>
              <Input
                id="address"
                value={deliveryAddress.address}
                onChange={(e) => setDeliveryAddress({ ...deliveryAddress, address: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  paymentMethod === "card" ? "border-primary bg-primary/5" : "border-border"
                }`}
                onClick={() => setPaymentMethod("card")}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Credit/Debit Card</h4>
                    <p className="text-sm text-muted-foreground">Pay securely with your card</p>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  paymentMethod === "upi" ? "border-primary bg-primary/5" : "border-border"
                }`}
                onClick={() => setPaymentMethod("upi")}
              >
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">UPI Payment</h4>
                    <p className="text-sm text-muted-foreground">Pay using UPI apps</p>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  paymentMethod === "wallet" ? "border-primary bg-primary/5" : "border-border"
                }`}
                onClick={() => setPaymentMethod("wallet")}
              >
                <div className="flex items-center gap-3">
                  <Wallet className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">Digital Wallet</h4>
                    <p className="text-sm text-muted-foreground">Paytm, PhonePe, Google Pay</p>
                  </div>
                </div>
              </div>
            </div>

            {paymentMethod === "card" && (
              <div className="space-y-4 pt-4 border-t">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div>
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input id="cardName" placeholder="John Doe" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>
              </div>
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
              <span>Subtotal</span>
              <span>₹{orderSummary.subtotal}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-₹{orderSummary.discount}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>₹{orderSummary.deliveryFee}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total Amount</span>
              <span>₹{orderSummary.total}</span>
            </div>
          </CardContent>
        </Card>

        {/* Place Order Button */}
        <div className="sticky bottom-24 z-10">
          <Button onClick={handlePlaceOrder} className="w-full h-12 text-lg">
            <CheckCircle className="h-5 w-5 mr-2" />
            Place Order - ₹{orderSummary.total}
          </Button>
        </div>
      </div>

      <BottomNavigation />
      <div className="h-20"></div>
    </div>
  )
}
