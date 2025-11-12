'use client'

import React from 'react'

export default function HomeContent() {
  return (
    <div>
      <h1 style={{
        fontSize: '32px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#333333'
      }}>
        Home
      </h1>
      <p style={{
        fontSize: '16px',
        color: '#666666',
        lineHeight: '1.6',
        maxWidth: '800px'
      }}>
        Welcome to the Home dashboard! This is the default view for the application, built with a custom navigation structure.
      </p>
    </div>
  )
}
