import axios from 'axios'

const redditClient = axios.create({
  baseURL: 'https://www.reddit.com/api',
  headers: {
    'User-Agent': 'TrendForge/1.0',
  },
})

export interface RedditComment {
  text: string
  score: number
  source: 'reddit'
  author: string
  created_at: Date
}

export interface RedditSubreddit {
  name: string
  subscribers: number
  description: string
}

export async function searchReddit(topic: string, limit: number = 100): Promise<RedditComment[]> {
  try {
    const response = await redditClient.get('/search', {
      params: {
        q: topic,
        limit,
        type: 'comment',
        sort: 'new',
      },
    })

    return response.data.data.children.map((item: any) => ({
      text: item.data.body,
      score: item.data.score,
      source: 'reddit' as const,
      author: item.data.author,
      created_at: new Date(item.data.created_utc * 1000),
    }))
  } catch (error) {
    console.error('Reddit API error:', error)
    return []
  }
}

export async function searchRedditSubreddits(topic: string): Promise<RedditSubreddit[]> {
  try {
    const response = await redditClient.get('/subreddits/search', {
      params: {
        q: topic,
        limit: 10,
      },
    })

    return response.data.data.children.map((item: any) => ({
      name: item.data.display_name,
      subscribers: item.data.subscribers,
      description: item.data.public_description,
    }))
  } catch (error) {
    console.error('Reddit subreddit search error:', error)
    return []
  }
}
