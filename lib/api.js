/**
 * API utility for consistent endpoint usage
 * Uses NEXT_PUBLIC_API_URL environment variable
 */

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://89.21.85.27:5002'

export async function apiCall(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    
    return response
  } catch (error) {
    console.error('API call failed:', error)
    throw error
  }
}
