"use client"

import { Pill } from "lucide-react"
import Link from "next/link"

interface HeaderProps {
  title?: string
  showLogo?: boolean
}

export function Header({ title = "PharmaFind", showLogo = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center gap-2">
          {showLogo && (
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Pill className="h-5 w-5 text-primary-foreground" />
            </div>
          )}
          <span className="font-bold text-lg text-primary">{title}</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/saved" className="text-muted-foreground hover:text-primary transition-colors">
              Saved
            </Link>
            <Link href="/profile" className="text-muted-foreground hover:text-primary transition-colors">
              Profile
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
