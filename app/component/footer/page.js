import React from 'react';
import { MailOutlined, HomeOutlined, InstagramOutlined, TikTokOutlined, CustomerServiceOutlined } from '@ant-design/icons';

export default function Footer() {
  const ICON_SIZE = '18px';
  
  return (
    <footer className="footer-container">
      {/* Absolute positioned orange circle */}
      <div className="footer-circle"></div>

      <div className="footer-content">
        
        {/* 1. Logo and Contact Section */}
        <div className="footer-section footer-contact">
          <div className="flex items-center space-x-2 mb-6">
            {/* FIX: Menggunakan CustomerServiceOutlined sebagai ikon logo utama */}
            <CustomerServiceOutlined style={{ fontSize: '32px', color: 'white' }} />
            <span className="text-xl font-bold">Sportune Center</span>
          </div>
          
          <h3 className="font-semibold text-gray-300 mb-4">Contact Us</h3>
          
          {/* Address */}
          <div className="contact-item">
            {/* Menggunakan HomeOutlined sebagai ikon Address */}
            <HomeOutlined style={{ fontSize: ICON_SIZE, color: 'white', marginTop: '3px' }} />
            <div className="contact-details">
              <p className="font-medium">Address</p>
              <p className="text-gray-400 text-sm">Jln. Duri Selatan 3 Gang 3 No 2c Rt 01 Rw 01 Jembatan Lima, Jakarta Barat.</p>
            </div>
          </div>

          {/* Mail */}
          <div className="contact-item">
            <MailOutlined style={{ fontSize: ICON_SIZE, color: 'white', marginTop: '3px' }} />
            <div className="contact-details">
              <p className="font-medium">Mail</p>
              <a href="mailto:sportunecenter@gmail.com" className="link-orange text-sm">
                sportunecenter@gmail.com
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="social-links">
            {/* Instagram */}
            <div className="contact-item">
              <InstagramOutlined style={{ fontSize: ICON_SIZE, color: 'white' }} />
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                @sportune.center
              </a>
            </div>
            {/* TikTok */}
            <div className="contact-item">
              <TikTokOutlined style={{ fontSize: ICON_SIZE, color: 'white' }} /> 
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                @sportune.center
              </a>
            </div>
          </div>
        </div>

        {/* 2. Categories Section */}
        <div className="footer-section">
          <h3 className="footer-heading">Categories</h3>
          <ul className="footer-list">
            <li><a href="#" className="link-item">Sports</a></li>
            <li><a href="#" className="link-item">Music</a></li>
          </ul>
        </div>

        {/* 3. Company Section */}
        <div className="footer-section">
          <h3 className="footer-heading">Company</h3>
          <ul className="footer-list">
            <li><a href="#" className="link-item">Home</a></li>
            <li><a href="#" className="link-item">About Us</a></li>
          </ul>
        </div>
        
      </div>

      {/* Copyright Section */}
      <div className="footer-copyright">
        © 2025 All rights reserved. Sportune Center.
      </div>
      
    </footer>
  );
}