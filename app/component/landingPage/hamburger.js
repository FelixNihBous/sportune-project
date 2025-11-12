'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Link from 'next/link'

// Menu data - easily customizable
const menuData = {
  browse: [
    { label: 'Sports Events', icon: 'trophy', href: '/sports-events' },
    { label: 'Tournaments', icon: 'trophy', href: '/tournaments' },
    { label: 'Teams', icon: 'home', href: '/teams' }
  ],
  account: [
    { label: 'My Account', icon: 'user', href: '/myaccount' },
    { label: 'Settings', icon: 'settings', href: '/settings' }
  ]
}

// Icon component
const getIcon = (iconType) => {
  const iconMap = {
    trophy: <path d="M6 9H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-2m-4-3V7a2 2 0 0 0-2-2h0a2 2 0 0 0-2 2v2m4 0a2 2 0 0 1 1.562 3.825L12 12" />,
    home: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
    user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24" /></>
  }
  return iconMap[iconType] || iconMap.home
}

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if user is logged in
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        try {
          // eslint-disable-next-line
          setUser(JSON.parse(storedUser))
        } catch (err) {
          console.error('Error parsing user:', err)
        }
      }
    }
  }, [])

  return (
    <>
      <style>{`
        .hamburger-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 256px;
          height: 100vh;
          background: white;
          box-shadow: 2px 0 8px rgba(0,0,0,0.1);
          z-index: 1000;
          transition: transform 0.3s ease-out;
          display: flex;
          flex-direction: column;
        }
        
        .hamburger-sidebar.closed {
          transform: translateX(-100%);
        }
        
        .hamburger-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: white;
          z-index: 999;
          display: none;
        }
        
        .hamburger-overlay.active {
          display: block;
        }
      `}</style>

      <header style={{
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: '12px 16px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => setIsOpen(!isOpen)} style={{ background: '#f3f4f6', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
          </button>
          <div>
            <Image src="/sportune.png" alt="alt" width={138} height={62} />
          </div>
        </div>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </button>
      </header>

      {isOpen && <div className="hamburger-overlay active" onClick={() => setIsOpen(false)} />}

      <div className={`hamburger-sidebar ${isOpen ? '' : 'closed'}`}>
        <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', margin: 0, fontFamily: 'Hanken Grotesk' }}>Menu</h2>
          <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav style={{ flex: 1, overflowY: 'auto', padding: '16px 12px' }}>
          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 12px 0' }}>Browse</p>
            {menuData.browse.map((item, idx) => (
              <Link key={idx} href={item.href} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', color: '#374151', fontSize: '14px', fontWeight: '500', border: 'none', background: 'transparent', cursor: 'pointer', borderRadius: '8px', textAlign: 'left', textDecoration: 'none' }} onClick={() => setIsOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {getIcon(item.icon)}
                </svg>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px' }}>
            <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 12px 0' }}>Account</p>
            {user ? (
              menuData.account.map((item, idx) => (
                <Link key={idx} href={item.href} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', color: '#374151', fontSize: '14px', fontWeight: '500', border: 'none', background: 'transparent', cursor: 'pointer', borderRadius: '8px', textAlign: 'left', textDecoration: 'none' }} onClick={() => setIsOpen(false)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {getIcon(item.icon)}
                  </svg>
                  <span>{item.label}</span>
                </Link>
              ))
            ) : (
              <p style={{ fontSize: '14px', color: '#9ca3af', padding: '10px 12px', margin: 0 }}>Sign in to access account settings</p>
            )}
          </div>
        </nav>

        <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb' }}>
          <p style={{ fontSize: '12px', color: '#9ca3af', textAlign: 'center', margin: 0 }}>Sportune  2025</p>
        </div>
      </div>
    </>
  )
}
