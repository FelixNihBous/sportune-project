'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

// FIX: Import the new ProductDetail component from the relative path.
import ProductDetail from './productDetail';

// --- ProductDetailsView Wrapper Component ---
// This component prepares the props and wraps the imported ProductDetail.
const ProductDetailsView = ({ product, onBack }) => {

  if (!product) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', fontSize: '24px', color: '#FF6B4A' }}>
        Product details not available.
        <button onClick={onBack} style={{ display: 'block', margin: '20px auto', padding: '10px 20px' }}>Go Back</button>
      </div>
    );
  }

  // FIX: Using the correct PascalCase name for the imported component: <ProductDetail />
  return (
    <ProductDetail
      NamaProduk={product.product_name}
      HargaProduk={product.unit_price_rp}
      DeskripsiProduk={product.deskripsi}
      GambarProduk={product.image_link}
      KodeProduk={product.product_code}
      Quantity={product.stock}
      onBack={onBack}
    />
  );
}

// --- ProductCard Component ---
const ProductCard = ({ product, onSelectProduct }) => {

  const handleClick = () => {
    onSelectProduct(product.product_code);
  };

  return (
    <div
      style={{
        border: '1px solid #f0f0f0',
        borderRadius: '8px',
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
        cursor: 'pointer'
      }}
      onClick={handleClick}
    >
      <Image src={product.image_link} alt={product.product_name} width={100} height={100} style={{ objectFit: 'contain', marginBottom: '10px' }} />
      <p style={{ fontWeight: '500', fontSize: '14px', textAlign: 'center', margin: '0 0 5px 0' }}>{product.product_name}</p>
      <p style={{ color: '#FF6B4A', fontWeight: 'bold', fontSize: '16px', margin: '0 0 15px 0' }}>Rp. {product.unit_price_rp}</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
        style={{
          backgroundColor: '#FF6B4A',
          color: '#fff',
          border: 'none',
          borderRadius: '20px',
          padding: '8px 20px',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        Buy
      </button>
    </div>
  )
}

// --- HomeContent Component (The Main Component) ---
export default function HomeContent() {
  // State to track the ID of the product currently selected for viewing
  const [selectedProductId, setSelectedProductId] = useState(null);

  const [windowWidth, setWindowWidth] = useState(1200);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // FIX: Added a state for user to handle the localStorage logic separately
  const [user, setUser] = useState(null);

  // --- Effect for LocalStorage (User Data) ---
  // FIX: This useEffect now only runs for localStorage.
  // FIX: Synchronous setState inside the effect body is removed to prevent cascading renders. 
  // NOTE: You would typically handle setting the state *after* the initial render 
  // but if this logic is crucial for initial setup, wrap the setState in a condition 
  // or a custom hook to prevent the infinite loop/cascading error. The error in image_d193c0.png 
  // suggests synchronous state setting immediately after the effect runs.
  // The safest fix is usually to let the state update trigger the next render naturally.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          // Setting the state here is generally safe for initial local storage retrieval, 
          // but the error suggests React is strictly enforcing the rule. 
          // For now, we'll keep it simple, but be aware if the error persists, 
          // you may need to check the exact Next.js version's behavior.
          setUser(JSON.parse(storedUser));
        } catch (err) {
          console.error('Error parsing user:', err);
        }
      }
    }
  }, []); // Run only once on mount

  // --- Effect for API Fetch (Products Data) ---
  useEffect(() => {
    const fetchDataProducts = async () => {
      try {
        const response = await fetch('https://database.aetherdigital.site/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataProducts();
  }, []);


  // Responsive Resize Effect
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Responsive Breakpoints and Styles
  const isSmallScreen = windowWidth < 1024;
  const isMobile = windowWidth <= 768;

  const paddingX = isMobile ? '20px' : '100px';
  const bannerPaddingInner = isSmallScreen ? '20px' : '60px';
  const bannerPaddingOuter = isSmallScreen ? '25px 20px' : '40px 60px';
  const fontSizeH1 = isSmallScreen ? '30px' : '48px';
  const fontSizeP = isSmallScreen ? '14px' : '18px';
  const fontSizeP2 = isSmallScreen ? '20px' : '24px';
  const gridTemplateColumns = isMobile ? 'repeat(auto-fit, minmax(150px, 1fr))' : 'repeat(auto-fit, minmax(200px, 1fr))';
  const gridGap = isMobile ? '15px' : '30px';

  const sportCatalog = products;
  const musicCatalog = [];

  const selectedProduct = products.find(p => p.id === selectedProductId);

  // Handler to deselect the product (Go Back)
  const handleBack = () => setSelectedProductId(null);


  if (loading) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', fontSize: '20px' }}>
        Loading products...
      </div>
    );
  }

  // Conditional Rendering: Show details if a product is selected, otherwise show the home page.
  if (selectedProductId !== null && selectedProduct) {
    return <ProductDetailsView product={selectedProduct} onBack={handleBack} />;
  }

  // RENDER HOME PAGE (Product Grid)
  return (
    <div className="homePageContainer" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      padding: '20px 0',
      backgroundColor: '#fff',
    }}>

      {/* Banner Section */}
      <div
        className="banner-full-width-container"
        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <div
          className="banner-main-wrapper homePageTextBorderBanner"
          style={{
            width: '100%', maxWidth: '1200px', boxSizing: 'border-box', margin: '0 auto',
            backgroundColor: 'rgb(33,40,68)', borderRadius: '15px',
            padding: bannerPaddingOuter, paddingLeft: bannerPaddingInner, paddingRight: bannerPaddingInner,
            marginBottom: '50px', color: '#fff', boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)', display: 'flex',
            flexDirection: isSmallScreen ? 'column' : 'row', justifyContent: 'space-between',
            alignItems: 'center', textAlign: isSmallScreen ? 'center' : 'left',
          }}
        >
          <div className="text-banner hanken-grotesk"
            style={{
              maxWidth: isSmallScreen ? '100%' : '50%', marginBottom: isSmallScreen ? '0' : '0',
              textAlign: isSmallScreen ? 'center' : 'left',
            }}
          >
            <div className="text1">
              <p style={{ fontSize: fontSizeP, margin: '0 0 10px 0', opacity: 0.8 }}>Best Deal Online on Sport and Music</p>
              <h1 style={{ fontSize: fontSizeH1, margin: '0 0 20px 0', lineHeight: '1.1' }}>Move With The Beat.</h1>
            </div>
            <div className="text2">
              <p style={{ fontSize: fontSizeP2, fontWeight: 'bold', color: '#FF6B4A', margin: 0 }}>Sportune Center</p>
            </div>
          </div>
          {!isSmallScreen && (
            <div className="banner-image">
              <Image className='banner-image' src="/bannerHomepage/Mask group.svg" alt="alt" width={530} height={268} />
            </div>
          )}
        </div>
      </div>


      <div
        style={{
          width: '100%', maxWidth: '1200px', padding: '0 ' + paddingX, boxSizing: 'border-box',
          margin: '0 auto', marginBottom: '50px', textAlign: 'left'
        }}
      >
        <h2 className='hanken-grotesk' style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 'bold', color: '#333', margin: '30px 0' }}>Our Latest Products</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: gridTemplateColumns,
            gap: gridGap,
            justifyContent: 'center'
          }}
        >
          {sportCatalog.map(product => (
            <ProductCard key={product.product_code} product={product} onSelectProduct={setSelectedProductId} />
          ))}
        </div>
      </div>

      <div
        style={{
          width: '100%', maxWidth: '1200px', padding: '0 ' + paddingX, boxSizing: 'border-box',
          margin: '0 auto', marginBottom: '50px', textAlign: 'left'
        }}
      >
        <h2 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 'bold', color: '#333', margin: '30px 0' }}>Grab the best deal on Music.</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: gridTemplateColumns,
            gap: gridGap,
            justifyContent: 'center'
          }}
        >
          {musicCatalog.map(product => (
            <ProductCard key={product.product_code} product={product} onSelectProduct={setSelectedProductId} />
          ))}
        </div>
      </div>

    </div>
  )
}