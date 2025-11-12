'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Divider } from 'antd'
import MobileMenu from './hamburger'

function Page() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get user from localStorage
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser)
          // eslint-disable-next-line
          setUser(parsedUser)
        } catch (err) {
          console.error('Error parsing user:', err)
        }
      }
    }
    setLoading(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    window.location.reload()
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='lpContainer' stlyle={{ width: '100vw', height: '100vh' }}>
      <div className="headerLuar hanken-grotesk" style={{ alignItems: 'center', display: 'flex', height: '42px', backgroundColor: '#f5f5f5', paddingLeft: '20px', justifyContent: 'space-between', paddingRight: '20px' }}>
        <p style={{ color: '#b6b6b6', backgroundColor: '#f5f5f5', margin: 0 }}>
          {user ? `Hi ${user.nickname}!, Welcome to Sportune Center` : 'Welcome to Sportune Center'}
        </p>
        <div className="aboutUs" style={{ flexDirection: 'row', display: 'flex', textAlign: 'center', alignItems: 'center', gap: '16px' }}>
          {user ? (
            <button 
              onClick={handleLogout}
              style={{
                background: 'none',
                border: 'none',
                color: '#b6b6b6',
                cursor: 'pointer',
                fontSize: '15px',
                textDecoration: 'underline'
              }}
            >
              Logout
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Link href="/login" style={{ textDecoration: 'none', color: '#b6b6b6', fontSize: '15px' }}>
                Login
              </Link>
              <Divider type="vertical" style={{ height: '20px', borderLeft: '1px solid #d9d9d9' }} />
              <Link href="/signup" style={{ textDecoration: 'none', color: '#b6b6b6', fontSize: '15px' }}>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="mainLp">
        <div className="headerMain" style={{ height: '90px' }}>
          <MobileMenu />
        </div>
      </div>
    </div>
  )
}

export default Page
