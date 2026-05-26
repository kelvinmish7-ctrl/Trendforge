'use client'

import { useState } from 'react'
import { Layout } from '@/components/ui/Layout'
import { SearchBox } from '@/components/search/SearchBox'
import { Dashboard } from '@/components/dashboard/Dashboard'
import { searchReddit } from '@/lib/api/reddit'
import { searchYouTubeVideos, getYouTubeComments } from '@/lib/api/youtube'
import { groupComplaints, calculateTrendScore, calculateBusinessScore, generateOpportunities, analyzeSentiment } from '@/lib/analysis'
import { useSearchStore } from '@/lib/store'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [currentAnalysis, setCurrentAnalysis] = useState<any>(null)
  const { addSearch } = useSearchStore()

  const handleSearch = async (query: string) => {
    setIsLoading(true)
    try {
      // Fetch from Reddit
      const redditComments = await searchReddit(query, 50)
      const redditTexts = redditComments.map((c) => c.text)

      // Fetch from YouTube
      const videos = await searchYouTubeVideos(query, 10)
      let youtubeTexts: string[] = []

      if (videos.length > 0) {
        for (const video of videos.slice(0, 3)) {
          const comments = await getYouTubeComments(video.videoId, 30)
          youtubeTexts.push(...comments.map((c) => c.text))
        }
      }

      // Combine and analyze
      const allTexts = [...redditTexts, ...youtubeTexts]
      const complaints = groupComplaints(allTexts)
      const trendScore = calculateTrendScore(complaints)
      const businessScore = calculateBusinessScore(complaints, trendScore)
      const opportunities = generateOpportunities(complaints)
      const sentiment = analyzeSentiment(allTexts)

      const analysis = {
        topic: query,
        trendScore,
        businessScore,
        complaints,
        opportunities,
        sentiment,
        timestamp: new Date(),
      }

      setCurrentAnalysis(analysis)
      addSearch(analysis)
    } catch (error) {
      console.error('Search failed:', error)
      alert('Failed to perform search. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero Section */}
        {!currentAnalysis && (
          <div className="text-center py-12">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Find Hidden Trends & Business Opportunities
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Enter any topic and we'll analyze Reddit and YouTube to find complaints, trends, and golden business opportunities.
            </p>
            <div className="flex justify-center">
              <SearchBox onSearch={handleSearch} isLoading={isLoading} />
            </div>
          </div>
        )}

        {/* Examples */}
        {!currentAnalysis && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <p className="font-semibold text-blue-900 dark:text-blue-200 mb-2">💪 Example:</p>
              <p className="text-sm text-blue-800 dark:text-blue-300">Try "fitness Kenya" to find workout trends and opportunities</p>
            </div>
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <p className="font-semibold text-green-900 dark:text-green-200 mb-2">📦 Example:</p>
              <p className="text-sm text-green-800 dark:text-green-300">Try "dropshipping Africa" to explore e-commerce trends</p>
            </div>
            <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
              <p className="font-semibold text-purple-900 dark:text-purple-200 mb-2">🎓 Example:</p>
              <p className="text-sm text-purple-800 dark:text-purple-300">Try "online courses Nigeria" to find education opportunities</p>
            </div>
          </div>
        )}

        {/* Results */}
        {currentAnalysis && (
          <div>
            <button
              onClick={() => setCurrentAnalysis(null)}
              className="mb-6 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              ← New Search
            </button>
            <Dashboard
              topic={currentAnalysis.topic}
              trendScore={currentAnalysis.trendScore}
              businessScore={currentAnalysis.businessScore}
              complaints={currentAnalysis.complaints}
              opportunities={currentAnalysis.opportunities}
              sentiment={currentAnalysis.sentiment}
              coins={100}
              badges={['Trend Hunter']}
            />
          </div>
        )}
      </div>
    </Layout>
  )
}
