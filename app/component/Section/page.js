'use client'

import React, { useState } from 'react'
import HomeContent from '../Hero/home/page'
import SportsContent from '../Hero/sports/page'
import MusicContent from '../Hero/music/page'
import AboutContent from '../Hero/about/page'

const Section = () => {
    const [activeTab, setActiveTab] = useState('home')

    const navigationItems = [
        { key: 'home', label: 'Home' },
        { key: 'sports', label: 'Sports' },
        { key: 'music', label: 'Music' },
        { key: 'about', label: 'About Us' }
    ]

    const renderContent = () => {
        switch(activeTab) {
            case 'home':
                return <HomeContent />
            case 'sports':
                return <SportsContent />
            case 'music':
                return <MusicContent />
            case 'about':
                return <AboutContent />
            default:
                return <HomeContent />
        }
    }

    return (
        <>
            <div style={{
                width: 'auto',
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center',
                padding: '20px 100px',
                background: '#ffffff',
                borderBottom: '1px solid #f0f0f0'
            }}>
                <div style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
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
                                transition: 'all 0.3s ease',
                                background: activeTab === item.key ? '#FF6B4A' : '#F5F5F5',
                                color: activeTab === item.key ? '#FFFFFF' : '#333333',
                                cursor: 'pointer',
                                boxShadow: activeTab === item.key ? '0 2px 8px rgba(255, 107, 74, 0.2)' : 'none'
                            }}
                            onMouseEnter={(e) => {
                                if (activeTab !== item.key) {
                                    e.currentTarget.style.background = '#E8E8E8'
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (activeTab !== item.key) {
                                    e.currentTarget.style.background = '#F5F5F5'
                                }
                            }}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{
                width: '100vw',
                minHeight: '70vh',
                background: '#ffffff'
            }}>
                {renderContent()}
            </div>
        </>
    )
}

export default Section