"use client"

import { CheckCircle, Package, Clock, MapPin, Phone } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function OrderConfirmationPage() {
  const orderDetails = {
    orderId: "PF2025001",
    estimatedDelivery: "2-4 hours",
    deliveryAddress: "123 Health Street, Medical District, City - 123456",
    phone: "+91 9876543210",
    total: 141.5,
    items: [
      { name: "Paracetamol 500mg", quantity: 2, price: 50 },
      { name: "Vitamin D3", quantity: 1, price: 45 },
      { name: "Aspirin 75mg", quantity: 3, price: 60 },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="Order Confirmation" showLogo={false} />

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Success Message */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-green-800 mb-2">Order Placed Successfully!</h1>
            <p className="text-green-700">Your medicines are being prepared for delivery</p>
          </CardContent>
        </Card>

        {/* Order Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-4 w-4 text-primary" />
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Order ID</span>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {orderDetails.orderId}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Amount</span>
              <span className="font-bold text-lg">₹{orderDetails.total}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Estimated delivery: {orderDetails.estimatedDelivery}</span>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Delivery Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="font-medium">Delivery Address</p>
              <p className="text-sm text-muted-foreground">{orderDetails.deliveryAddress}</p>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{orderDetails.phone}</span>
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card>
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orderDetails.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-medium">₹{item.price}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link href="/profile/orders">
            <Button variant="outline" className="w-full bg-transparent">
              Track Your Order
            </Button>
          </Link>
          <Link href="/">
            <Button className="w-full">Continue Shopping</Button>
          </Link>
        </div>
      </div>

      <BottomNavigation />
      <div className="h-20"></div>
    </div>
  )
}
