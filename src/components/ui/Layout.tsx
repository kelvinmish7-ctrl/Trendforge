'use client'

import { ReactNode } from 'react'
import { LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { ThemeToggle } from './ThemeToggle'

interface LayoutProps {
  children: ReactNode
  user?: { email: string; username: string } | null
  onLogout?: () => void
}

export function Layout({ children, user, onLogout }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                TrendForge
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{user.username}</span>
                  <button
                    onClick={onLogout}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                  >
                    <LogOut size={18} />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              ) : null}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4 space-y-3">
              <ThemeToggle />
              {user ? (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">{user.username}</p>
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                  >
                    <LogOut size={18} />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2026 TrendForge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
