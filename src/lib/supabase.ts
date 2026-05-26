import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          username: string
          avatar_url: string | null
          coins: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          username: string
          avatar_url?: string | null
          coins?: number
        }
      }
      searches: {
        Row: {
          id: string
          user_id: string
          topic: string
          trend_score: number
          business_score: number
          created_at: string
        }
      }
      complaints: {
        Row: {
          id: string
          search_id: string
          complaint_text: string
          frequency: number
          source: 'reddit' | 'youtube'
          created_at: string
        }
      }
      opportunities: {
        Row: {
          id: string
          search_id: string
          opportunity_title: string
          description: string
          potential_score: number
          saved_by_user: boolean
          created_at: string
        }
      }
      user_coins: {
        Row: {
          id: string
          user_id: string
          amount: number
          reason: string
          created_at: string
        }
      }
      user_badges: {
        Row: {
          id: string
          user_id: string
          badge_name: 'Trend Hunter' | 'Market Scout' | 'Opportunity Master'
          earned_at: string
        }
      }
    }
  }
}
