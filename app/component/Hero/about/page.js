'use client'

import React from 'react'
import Image from 'next/image'

export default function About() {
  return (
    <>
      <div className="containerAbout" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', margin: 0, padding: 0 }}>
        <div className="TitleAbout"
          style={{ minHeight: '45vh', backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(/jogging.jpg)', backgroundSize: 'cover', backgroundPosition: 'center 20%', width: '100%', textAlign: 'center', display: 'flex', alignItems: 'center', flexDirection: 'column', padding: '50px 20px', boxSizing: 'border-box', position: 'relative' }}>
          <h1 className="hanken-grotesk" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', width: '100%', maxWidth: '900px', margin: '0 auto', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
            <span style={{ color: '#FF6B35' }}>PT. Sportune Center</span> adalah perusahaan yang bergerak di bidang perdagangan dan layanan peralatan olahraga serta musik.
          </h1>
          <p className="hanken-grotesk" style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.7)', margin: '15px 0 0 0', maxWidth: '900px' }}>&quot;Di dirikan dengan semangat untuk menginspirasi gaya hidup aktif dan kreatif.&quot;</p>
        </div>

        <div>
          <Image src="/meditasi.png" alt="alt" width={600} height={405} />
        </div>
      </div>
    </>
  )
}
