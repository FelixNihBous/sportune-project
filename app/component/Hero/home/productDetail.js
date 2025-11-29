// productDetail.js
"use client";
import React, { useContext } from 'react';     // ⬅ FIXED (useContext added)
import Image from 'next/image';
import { CartContext } from "@/app/lib/CartContext";   // ⬅ Cart Context imported

export default function ProductDetail({
    onBack,
    NamaProduk,
    HargaProduk,
    DeskripsiProduk,
    GambarProduk,
    KodeProduk,
    Quantity
}) {

    const { addToCart } = useContext(CartContext);   // ⬅ Access addToCart

    const handleAdd = () => {
        addToCart({
            id: KodeProduk,
            nama: NamaProduk,
            harga: HargaProduk,
            imgLink: GambarProduk,
            quantity: 1,
        });
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '0 20px' }}>
            <style>{`
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `}</style>

            <button
                onClick={onBack}
                style={{
                    marginBottom: '20px',
                    padding: '8px 15px',
                    backgroundColor: '#FF6B4A', 
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                ← Back to Products
            </button>

            <div className="product-detail-container" style={{
                display: 'flex',
                flexDirection: 'row', 
                gap: '40px',
                alignItems: 'flex-start',
                backgroundColor: '#f9f9f9', 
                padding: '30px',
                borderRadius: '10px'
            }}>
                <div style={{
                    flex: '0 0 350px',
                    border: '1px solid #f0f0f0',
                    padding: '20px',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    width: '100%',
                    maxWidth: '350px'
                }}>
                    <Image
                        src={GambarProduk || '/placeholder.png'}
                        alt={NamaProduk}
                        width={350}
                        height={350}
                        style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
                    />
                </div>

                <div style={{ flex: 1 }}>
                    <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: 10 }}>
                        {NamaProduk}
                    </h1>

                    <p style={{ color: '#555', marginBottom: 15 }}>
                        Code: {KodeProduk || 'N/A'} | Quantity: {Quantity || 'N/A'}
                    </p>

                    <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#FF6B4A', marginBottom: 30 }}>
                        Rp. {HargaProduk}
                    </h2>

                    <p style={{ lineHeight: '1.6', color: '#333' }}>
                        {DeskripsiProduk}
                    </p>

                    {/* --- Buttons --- */}
                    <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                        <button style={{
                            backgroundColor: '#FF6B4A', color: '#fff', border: 'none',
                            borderRadius: '5px', padding: '12px 25px', cursor: 'pointer',
                            fontSize: '16px', fontWeight: 'bold'
                        }}>
                            Buy Now
                        </button>

                        <button 
                            onClick={handleAdd}   // 🔥 Add to Cart working!
                            style={{
                                backgroundColor: '#fff', color: '#FF6B4A', border: '2px solid #FF6B4A',
                                borderRadius: '5px', padding: '10px 25px', cursor: 'pointer',
                                fontSize: '16px', fontWeight: 'bold'
                            }}
                        >
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '50px', paddingTop: '30px', borderTop: '1px solid #eee' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: 20 }}>Full Description:</h3>
                <p style={{ lineHeight: '1.6', color: '#333' }}>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...
                </p>
            </div>
        </div>
    );
}
