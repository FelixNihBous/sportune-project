'use client'

import React, { useState } from 'react'
import HomeContent from '../Hero/home/page'
import AboutContent from '../Hero/about/page'
import { useAuth } from '../../lib/AuthContext'

const Section = () => {
    const [activeTab, setActiveTab] = useState('home')
    const { user, logout } = useAuth()

    const handleLogout = () => {
        logout()
    }

    const navigationItems = [
        { key: 'home', label: 'Home' },
        { key: 'about', label: 'About Us' }
    ]

    const renderContent = () => {
        switch (activeTab) {
            case 'home': return <HomeContent />
            case 'about': return <AboutContent />
            default: return <HomeContent />
        }
    }

    return (
        <>
            {/* NAVBAR */}
            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                padding: '20px',
                background: '#ffffff',
                borderBottom: '1px solid #f0f0f0'
            }}>

                {/* ADD CLASS HERE */}
                <div className="nav-buttons"
                    style={{
                        display: 'flex',
                        gap: '16px',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {navigationItems.map((item) => (
                        <button
                            key={item.key}
                            onClick={() => setActiveTab(item.key)}
                            style={{
                                padding: '12px 28px',
                                borderRadius: '24px',
                                border: 'none',
                                fontSize: '13px',
                                fontWeight: '200',
                                height: '35px',
                                transition: '0.3s',
                                background: activeTab === item.key ? '#FF6B4A' : '#F5F5F5',
                                color: activeTab === item.key ? '#FFFFFF' : '#333333',
                                cursor: 'pointer',
                                boxShadow: activeTab === item.key ? '0 2px 8px rgba(255, 107, 74, 0.2)' : 'none'
                            }}
                            onMouseEnter={(e) => {
                                if (activeTab !== item.key) e.currentTarget.style.background = '#E8E8E8'
                            }}
                            onMouseLeave={(e) => {
                                if (activeTab !== item.key) e.currentTarget.style.background = '#F5F5F5'
                            }}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

            </div>

            <div style={{ width: '100vw', minHeight: '70vh', background: '#ffffff' }}>
                {renderContent()}
            </div>
        </>
    )
}

export default Section
