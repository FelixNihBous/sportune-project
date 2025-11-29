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
        <div className='secondLine'>
          <Image className="meditate" src="/meditate.svg" alt="alt" width={800} height={505}/>
          <p className="textAbout2 hanken-grotesk">Nama <span className="" style={{ color: '#ff6b35', fontWeight: 'bold' }}>“Sportune”</span> sendiri berasal dari gabungan kata Sport dan Tune, yang mencerminkan perpaduan  harmonis antara energi olahraga dan irama musik. Kami percaya bahwa tubuh yang kuat dan jiwa yang  selaras akan melahirkan keseimbangan hidup yang produktif dan penuh inspirasi.</p>
        </div>
        <div className="text3">
          <p className="">Sejak berdiri pada tahun 2025, <span className="" style={{ color: '#ff6b35', fontWeight: 'bold' }}>PT. Sportune Center</span> terus berkembang sebagai penyedia alat olahraga  dan alat musik berkualitas yang mengedepankan profesionalisme, kejujuran, serta pelayanan terbaik.  Tidak hanya berfokus pada penjualan produk, kami juga aktif mengadakan kegiatan pelatihan,  workshop, dan kolaborasi komunitas untuk mendorong pertumbuhan bakat di bidang olahraga dan seni.</p>
        </div>
        <div className="text4">
          <Image src="/music.svg" alt="alt" width={800} height={505} />
          <p className="text4Content">Dengan dukungan tim yang berdedikasi dan jaringan distribusi yang luas, kami berkomitmen untuk  menjadi perusahaan terpercaya yang menghadirkan solusi, inovasi, dan pengalaman terbaik bagi  pelanggan. <span className="" style={{ color: '#ff6b35', fontWeight: 'bold' }}>PT. Sportune Center</span> hadir untuk membuktikan bahwa olahraga dan musik bukan sekadar  hobi — tetapi gaya hidup yang membentuk karakter, disiplin, dan kreativitas generasi masa depan.</p>
        </div>
        <div className="visimisi">
          <div className="visi">
            <h2 className="hanken-grotesk" style={{ color: '#ff6b35', marginBottom: '10px' }}>Visi</h2>
            <p className="hanken-grotesk"> “Menjadi perusahaan terdepan yang menginspirasi gaya hidup sehat dan kreativitas tanpa batas, dengan  menyediakan produk olahraga dan musik yang berkualitas tinggi.” </p>
          </div>
          <div className="misi" style={{ marginTop: '3.241vh' }}>
            <h2 className="hanken-grotesk" style={{ color: '#ff6b35', marginBottom: '10px' }}>Misi</h2>
            <p className="hanken-grotesk">1. Menginspirasi dan mendorong masyarakat untuk gaya hidup sehat dan kreatif. </p>
            <p className="hanken-grotesk">2. Menyediakan produk-produk yang berkualitas tinggi untuk memberikan pengalaman belanja  terbaik kepada pelanggan.</p>
          </div>
        </div>
      </div>
    </>
  )
}
