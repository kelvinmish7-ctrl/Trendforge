'use client'

import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface TrendChartProps {
  trendScore: number
  businessScore: number
  sentiment: {
    positive: number
    negative: number
    neutral: number
  }
}

export function TrendChart({ trendScore, businessScore, sentiment }: TrendChartProps) {
  const scoreData = [
    { name: 'Trend Score', value: trendScore },
    { name: 'Business Score', value: businessScore },
  ]

  const sentimentData = [
    { name: 'Positive', value: sentiment.positive },
    { name: 'Negative', value: sentiment.negative },
    { name: 'Neutral', value: sentiment.neutral },
  ]

  const COLORS = ['#10b981', '#ef4444', '#6b7280']

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Score Bar Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Scores</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={scoreData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-600" />
            <XAxis stroke="#6b7280" className="dark:stroke-gray-400" />
            <YAxis stroke="#6b7280" className="dark:stroke-gray-400" />
            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
            <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Sentiment Pie Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sentiment</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={sentimentData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}%`} outerRadius={80} fill="#8884d8" dataKey="value">
              {COLORS.map((color, index) => (
                <Cell key={`cell-${index}`} fill={color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
