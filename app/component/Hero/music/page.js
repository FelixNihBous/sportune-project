'use client'

import React from 'react'
import Section from '@/app/component/Section/page'
import LandingPage from '@/app/component/landingPage/page'

export default function Music() {
  return (
    <>
      <div style={{ padding: '40px 100px', minHeight: '100vh' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>Music</h1>
        <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6' }}>
          Explore new releases and concert information in the Music section. Listen to your favorite artists and find new tracks here.
        </p>
      </div>
    </>
  )
}
