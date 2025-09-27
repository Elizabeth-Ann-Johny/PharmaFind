"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowLeft, Camera, User, Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function EditProfilePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    emergencyContact: "",
    address: "",
    dateOfBirth: "",
    medicalConditions: [] as string[],
    allergies: [] as string[],
  })

  const [newCondition, setNewCondition] = useState("")
  const [newAllergy, setNewAllergy] = useState("")

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const user = JSON.parse(userData)
      setFormData({
        fullName: user.fullName || user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        emergencyContact: user.emergencyContact || "",
        address: user.address || "",
        dateOfBirth: user.dateOfBirth || "",
        medicalConditions: user.medicalConditions || [],
        allergies: user.allergies || [],
      })
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const userData = localStorage.getItem("user")
    if (userData) {
      const user = JSON.parse(userData)
      const updatedUser = {
        ...user,
        ...formData,
      }
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
    router.push("/profile")
  }

  const addMedicalCondition = () => {
    if (newCondition.trim()) {
      setFormData({
        ...formData,
        medicalConditions: [...formData.medicalConditions, newCondition.trim()],
      })
      setNewCondition("")
    }
  }

  const removeMedicalCondition = (index: number) => {
    setFormData({
      ...formData,
      medicalConditions: formData.medicalConditions.filter((_, i) => i !== index),
    })
  }

  const addAllergy = () => {
    if (newAllergy.trim()) {
      setFormData({
        ...formData,
        allergies: [...formData.allergies, newAllergy.trim()],
      })
      setNewAllergy("")
    }
  }

  const removeAllergy = (index: number) => {
    setFormData({
      ...formData,
      allergies: formData.allergies.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="Edit Profile" showLogo={false} />

      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/profile">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Edit Profile</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Photo */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
                  <AvatarImage src="/placeholder.svg?key=ccbug" />
                  <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                    {formData.fullName?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <Button type="button" variant="outline" className="gap-2 bg-transparent">
                  <Camera className="h-4 w-4" />
                  Change Photo
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    type="tel"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={3}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                </div>
                Medical Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Medical Conditions */}
              <div className="space-y-3">
                <Label>Medical Conditions</Label>
                <div className="flex gap-2 flex-wrap">
                  {formData.medicalConditions.map((condition, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-200"
                      onClick={() => removeMedicalCondition(index)}
                    >
                      {condition} ×
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add medical condition"
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addMedicalCondition())}
                  />
                  <Button type="button" onClick={addMedicalCondition} variant="outline">
                    Add
                  </Button>
                </div>
              </div>

              {/* Allergies */}
              <div className="space-y-3">
                <Label>Allergies</Label>
                <div className="flex gap-2 flex-wrap">
                  {formData.allergies.map((allergy, index) => (
                    <Badge
                      key={index}
                      variant="destructive"
                      className="bg-red-100 text-red-800 cursor-pointer hover:bg-red-200"
                      onClick={() => removeAllergy(index)}
                    >
                      {allergy} ×
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add allergy"
                    value={newAllergy}
                    onChange={(e) => setNewAllergy(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addAllergy())}
                  />
                  <Button type="button" onClick={addAllergy} variant="outline">
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex gap-4">
            <Button type="submit" className="flex-1 gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
            <Link href="/profile" className="flex-1">
              <Button type="button" variant="outline" className="w-full bg-transparent">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>

      <BottomNavigation />
      <div className="h-20"></div>
    </div>
  )
}
