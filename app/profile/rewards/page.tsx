"use client"

import { ArrowLeft, Gift, Star, Trophy, Zap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { BottomNavigation } from "@/components/bottom-navigation"

const rewards = [
  {
    id: 1,
    title: "₹50 Off Next Order",
    description: "Valid on orders above ₹500",
    points: 500,
    expires: "2024-02-15",
    type: "discount",
  },
  {
    id: 2,
    title: "Free Delivery",
    description: "Free delivery on any order",
    points: 200,
    expires: "2024-02-10",
    type: "delivery",
  },
  {
    id: 3,
    title: "Health Checkup Voucher",
    description: "₹100 off on health checkup",
    points: 1000,
    expires: "2024-03-01",
    type: "health",
  },
]

const achievements = [
  {
    title: "First Order",
    description: "Completed your first order",
    icon: Trophy,
    earned: true,
    points: 100,
  },
  {
    title: "Regular Customer",
    description: "Made 5 orders",
    icon: Star,
    earned: true,
    points: 250,
  },
  {
    title: "Health Conscious",
    description: "Ordered vitamins 3 times",
    icon: Zap,
    earned: false,
    points: 150,
  },
]

export default function RewardsPage() {
  const currentPoints = 850
  const nextRewardPoints = 1000

  return (
    <div className="min-h-screen bg-background">
      <Header title="Rewards" showLogo={false} />

      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/profile">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Rewards & Points</h1>
        </div>

        {/* Points Summary */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-primary mb-2">{currentPoints}</div>
              <p className="text-muted-foreground">Available Points</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to next reward</span>
                <span>{nextRewardPoints - currentPoints} points to go</span>
              </div>
              <Progress value={(currentPoints / nextRewardPoints) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Available Rewards */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-primary" />
              Available Rewards
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {rewards.map((reward) => (
              <div key={reward.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold">{reward.title}</h3>
                  <p className="text-sm text-muted-foreground">{reward.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">Expires: {reward.expires}</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-primary">{reward.points} pts</div>
                  <Button
                    size="sm"
                    variant={currentPoints >= reward.points ? "default" : "secondary"}
                    disabled={currentPoints < reward.points}
                    className="mt-2"
                  >
                    {currentPoints >= reward.points ? "Redeem" : "Need More"}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon
              return (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 border rounded-lg ${
                    achievement.earned ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      achievement.earned ? "bg-green-100" : "bg-gray-100"
                    }`}
                  >
                    <IconComponent className={`h-6 w-6 ${achievement.earned ? "text-green-600" : "text-gray-400"}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-primary">+{achievement.points} pts</div>
                    {achievement.earned && <Badge className="bg-green-100 text-green-800 mt-1">Earned</Badge>}
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* How to Earn Points */}
        <Card>
          <CardHeader>
            <CardTitle>How to Earn Points</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Complete an order</span>
              <span className="font-semibold text-primary">+50 pts</span>
            </div>
            <div className="flex justify-between">
              <span>Write a review</span>
              <span className="font-semibold text-primary">+25 pts</span>
            </div>
            <div className="flex justify-between">
              <span>Refer a friend</span>
              <span className="font-semibold text-primary">+100 pts</span>
            </div>
            <div className="flex justify-between">
              <span>Monthly health checkup</span>
              <span className="font-semibold text-primary">+200 pts</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
      <div className="h-20"></div>
    </div>
  )
}
