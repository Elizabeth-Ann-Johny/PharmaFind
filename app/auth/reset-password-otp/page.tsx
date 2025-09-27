"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Pill, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ResetPasswordOTPPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mobile = searchParams.get("mobile") || ""

  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [timeLeft, setTimeLeft] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [timeLeft])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const otpCode = otp.join("")

    if (otpCode.length !== 6) {
      alert("Please enter complete OTP")
      return
    }

    // Handle OTP verification logic here
    console.log("Reset password OTP verification:", otpCode)

    // Redirect to new password page
    router.push("/auth/new-password?mobile=" + encodeURIComponent(mobile) + "&otp=" + otpCode)
  }

  const handleResendOTP = () => {
    // Handle resend OTP logic here
    console.log("Resending reset password OTP to:", mobile)
    setTimeLeft(60)
    setCanResend(false)
    setOtp(["", "", "", "", "", ""])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link
            href="/auth/forgot-password"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-4 self-start"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mx-auto mb-4">
            <Pill className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">Verify OTP</CardTitle>
          <p className="text-muted-foreground">
            We've sent a 6-digit code to
            <br />
            <span className="font-medium text-foreground">{mobile}</span>
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-lg font-semibold"
                />
              ))}
            </div>

            <Button type="submit" className="w-full">
              Verify OTP
            </Button>
          </form>

          <div className="mt-6 text-center">
            {canResend ? (
              <Button variant="ghost" onClick={handleResendOTP} className="text-primary">
                Resend OTP
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground">Resend OTP in {timeLeft}s</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
