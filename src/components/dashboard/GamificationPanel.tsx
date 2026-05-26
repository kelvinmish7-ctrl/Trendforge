'use client'

import { Coins, Award } from 'lucide-react'

interface GameificationPanelProps {
  coins: number
  badges: string[]
}

const BADGE_INFO: Record<string, { emoji: string; description: string }> = {
  'Trend Hunter': { emoji: '🎯', description: 'Complete 10 searches' },
  'Market Scout': { emoji: '🔍', description: 'Find 5 unique opportunities' },
  'Opportunity Master': { emoji: '👑', description: 'Save 20 opportunities' },
}

export function GamificationPanel({ coins, badges }: GameificationPanelProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Progress</h3>

      {/* Coins Section */}
      <div className="mb-6 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
        <div className="flex items-center gap-3">
          <Coins className="text-yellow-500" size={24} />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Coins</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{coins}</p>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Award size={20} className="text-purple-500" />
          <h4 className="font-semibold text-gray-900 dark:text-white">Badges</h4>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {Object.entries(BADGE_INFO).map(([badgeName, { emoji, description }]) => {
            const isEarned = badges.includes(badgeName)
            return (
              <div
                key={badgeName}
                className={`p-3 rounded-lg border transition-all ${
                  isEarned
                    ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800'
                    : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 opacity-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{emoji}</span>
                    <div>
                      <p className={`font-medium ${isEarned ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                        {badgeName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
                    </div>
                  </div>
                  {isEarned && <span className="text-green-500 text-sm font-semibold">✓</span>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
