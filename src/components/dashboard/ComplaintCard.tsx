'use client'

import { Complaint } from '@/lib/analysis'
import { AlertCircle } from 'lucide-react'

interface ComplaintCardProps {
  complaint: Complaint
  index: number
}

export function ComplaintCard({ complaint, index }: ComplaintCardProps) {
  return (
    <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
      <div className="flex items-start gap-3">
        <AlertCircle className="text-red-500 flex-shrink-0 mt-1" size={20} />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900 dark:text-white">
              Complaint #{index + 1}
            </h4>
            <span className="px-2 py-1 rounded bg-red-200 dark:bg-red-900/50 text-red-800 dark:text-red-200 text-xs font-medium">
              Frequency: {complaint.frequency}
            </span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{complaint.text}</p>
          <div className="flex flex-wrap gap-2">
            {complaint.keywords.map((keyword, idx) => (
              <span key={idx} className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
