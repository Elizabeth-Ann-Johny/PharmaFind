"use client"

import { ArrowLeft, Bell, Shield, Globe, Smartphone, HelpCircle, LogOut } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Header } from "@/components/header"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header title="Settings" showLogo={false} />

      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/profile">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Receive notifications about orders and updates</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Get email updates about your account</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-muted-foreground">Receive SMS for important updates</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/profile/change-password">
              <Button variant="ghost" className="w-full justify-start h-auto p-4">
                <div className="text-left">
                  <p className="font-medium">Change Password</p>
                  <p className="text-sm text-muted-foreground">Update your account password</p>
                </div>
              </Button>
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Location Services</p>
                <p className="text-sm text-muted-foreground">Allow location access for nearby pharmacies</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* App Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-primary" />
              App Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Switch to dark theme</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Auto-Save Searches</p>
                <p className="text-sm text-muted-foreground">Automatically save your medicine searches</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Show Nearby Pharmacies</p>
                <p className="text-sm text-muted-foreground">Display pharmacies within 5km radius</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Language & Region */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Language & Region
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="ghost" className="w-full justify-start h-auto p-4">
              <div className="text-left">
                <p className="font-medium">Language</p>
                <p className="text-sm text-muted-foreground">English (US)</p>
              </div>
            </Button>
            <Button variant="ghost" className="w-full justify-start h-auto p-4">
              <div className="text-left">
                <p className="font-medium">Region</p>
                <p className="text-sm text-muted-foreground">India</p>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Support */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="ghost" className="w-full justify-start h-auto p-4">
              <div className="text-left">
                <p className="font-medium">Help Center</p>
                <p className="text-sm text-muted-foreground">Get help and support</p>
              </div>
            </Button>
            <Button variant="ghost" className="w-full justify-start h-auto p-4">
              <div className="text-left">
                <p className="font-medium">Contact Us</p>
                <p className="text-sm text-muted-foreground">Reach out to our support team</p>
              </div>
            </Button>
            <Button variant="ghost" className="w-full justify-start h-auto p-4">
              <div className="text-left">
                <p className="font-medium">Privacy Policy</p>
                <p className="text-sm text-muted-foreground">Read our privacy policy</p>
              </div>
            </Button>
            <Button variant="ghost" className="w-full justify-start h-auto p-4">
              <div className="text-left">
                <p className="font-medium">Terms of Service</p>
                <p className="text-sm text-muted-foreground">View terms and conditions</p>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Logout */}
        <Button variant="destructive" className="w-full h-12 gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      <BottomNavigation />
      <div className="h-20"></div>
    </div>
  )
}
