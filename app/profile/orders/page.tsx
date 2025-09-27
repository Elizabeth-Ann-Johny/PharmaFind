"use client"

import { ArrowLeft, Package, Clock, CheckCircle, XCircle, Eye } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { BottomNavigation } from "@/components/bottom-navigation"

const orders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    pharmacy: "HealthPlus Pharmacy",
    items: ["Paracetamol 500mg", "Vitamin D3"],
    total: "₹245",
    status: "delivered",
  },
  {
    id: "ORD-002",
    date: "2024-01-10",
    pharmacy: "MediCare Store",
    items: ["Aspirin 75mg", "Cough Syrup"],
    total: "₹180",
    status: "processing",
  },
  {
    id: "ORD-003",
    date: "2024-01-05",
    pharmacy: "City Pharmacy",
    items: ["Insulin Pen", "Blood Glucose Strips"],
    total: "₹1,250",
    status: "cancelled",
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "delivered":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "processing":
      return <Clock className="h-4 w-4 text-yellow-500" />
    case "cancelled":
      return <XCircle className="h-4 w-4 text-red-500" />
    default:
      return <Package className="h-4 w-4 text-muted-foreground" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-800"
    case "processing":
      return "bg-yellow-100 text-yellow-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header title="Orders" showLogo={false} />

      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/profile">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Order History</h1>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{order.id}</h3>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">{order.pharmacy}</p>
                      <div className="text-sm text-muted-foreground">
                        {order.items.map((item, index) => (
                          <span key={index}>
                            {item}
                            {index < order.items.length - 1 && ", "}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <span className="font-semibold text-lg">{order.total}</span>
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Eye className="h-4 w-4" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Package className="h-12 w-12 text-primary/60" />
            </div>
            <h2 className="text-2xl font-bold mb-4">No Orders Yet</h2>
            <p className="text-muted-foreground mb-8 max-w-md text-pretty">
              You haven't placed any orders yet. Start shopping for medicines to see your order history here.
            </p>
            <Link href="/">
              <Button className="gap-2">
                <Package className="h-4 w-4" />
                Start Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>

      <BottomNavigation />
      <div className="h-20"></div>
    </div>
  )
}
