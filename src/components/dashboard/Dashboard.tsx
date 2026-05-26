'use client'

import { Complaint } from '@/lib/analysis'
import { ComplaintCard } from './ComplaintCard'
import { OpportunityCard } from './OpportunityCard'
import { TrendChart } from './TrendChart'
import { GamificationPanel } from './GamificationPanel'

interface DashboardProps {
  topic: string
  trendScore: number
  businessScore: number
  complaints: Complaint[]
  opportunities: string[]
  sentiment: {
    positive: number
    negative: number
    neutral: number
  }
  coins: number
  badges: string[]
  onSaveOpportunity?: (opportunity: string) => void
}

export function Dashboard({
  topic,
  trendScore,
  businessScore,
  complaints,
  opportunities,
  sentiment,
  coins,
  badges,
  onSaveOpportunity,
}: DashboardProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{topic}</h1>
        <p className="text-gray-600 dark:text-gray-400">Analysis Results</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Trend Score</p>
          <p className="text-3xl font-bold text-primary">{trendScore}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">How strong is the trend</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Business Score</p>
          <p className="text-3xl font-bold text-secondary">{businessScore}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Business opportunity</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Complaints Found</p>
          <p className="text-3xl font-bold text-red-500">{complaints.length}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Unique complaints</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Opportunities</p>
          <p className="text-3xl font-bold text-green-500">{opportunities.length}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Ideas generated</p>
        </div>
      </div>

      {/* Charts */}
      <TrendChart trendScore={trendScore} businessScore={businessScore} sentiment={sentiment} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Complaints Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Top Complaints</h2>
            <div className="space-y-3">
              {complaints.slice(0, 5).map((complaint, idx) => (
                <ComplaintCard key={idx} complaint={complaint} index={idx} />
              ))}
            </div>
          </div>

          {/* Opportunities Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Business Opportunities</h2>
            <div className="space-y-3">
              {opportunities.map((opp, idx) => (
                <OpportunityCard
                  key={idx}
                  opportunity={opp}
                  score={75 + Math.random() * 25}
                  onSave={() => onSaveOpportunity?.(opp)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <GamificationPanel coins={coins} badges={badges} />
        </div>
      </div>
    </div>
  )
}
