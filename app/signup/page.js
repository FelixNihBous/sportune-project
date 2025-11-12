'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [nickname, setNickname] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }

        setLoading(true)

        try {
            // Check if email already exists
            const checkResponse = await fetch('http://89.21.85.27:5002/users?email=' + email)
            const existingUsers = await checkResponse.json()

            if (existingUsers.length > 0) {
                setError('Email already registered')
                setLoading(false)
                return
            }

            // Create new user
            const response = await fetch('http://89.21.85.27:5002/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password,
                    nickname,
                    createdAt: new Date().toISOString()
                })
            })

            if (!response.ok) {
                setError('Signup failed')
                setLoading(false)
                return
            }

            const newUser = await response.json()

            // Store user info
            localStorage.setItem('user', JSON.stringify(newUser))

            // Show success notification and redirect
            const notification = document.createElement('div')
            notification.innerHTML = `
        <div style="
          position: fixed;
          top: 20px;
          right: 20px;
          background: #52c41a;
          color: white;
          padding: 16px 24px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          z-index: 9999;
          font-weight: 500;
          animation: slideIn 0.3s ease-out;
        ">
          ✓ Account created successfully! Redirecting...
        </div>
        <style>
          @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        </style>
      `
            document.body.appendChild(notification)

            setTimeout(() => {
                notification.remove()
                router.push('/')
            }, 1500)
        } catch (err) {
            setError('An error occurred. Please try again.')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            padding: '16px'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '400px',
                background: 'white',
                borderRadius: '12px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                padding: '40px'
            }}>
                <h1 style={{
                    fontSize: '28px',
                    fontWeight: 'bold',
                    color: '#1f2937',
                    margin: '0 0 8px 0',
                    fontFamily: 'Hanken Grotesk'
                }}>
                    Create Account
                </h1>
                <p style={{
                    color: '#6b7280',
                    marginBottom: '32px',
                    fontSize: '14px'
                }}>
                    Join Sportune today
                </p>

                {error && (
                    <div style={{
                        background: '#fee2e2',
                        color: '#dc2626',
                        padding: '12px',
                        borderRadius: '8px',
                        marginBottom: '16px',
                        fontSize: '14px'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#374151',
                            marginBottom: '6px'
                        }}>
                            Nickname
                        </label>
                        <input
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            placeholder="Choose your nickname"
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                fontSize: '14px',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#374151',
                            marginBottom: '6px'
                        }}>
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                fontSize: '14px',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#374151',
                            marginBottom: '6px'
                        }}>
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                fontSize: '14px',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                        />
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#374151',
                            marginBottom: '6px'
                        }}>
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                fontSize: '14px',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '12px',
                            background: loading ? '#9ca3af' : '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => !loading && (e.target.style.background = '#2563eb')}
                        onMouseLeave={(e) => !loading && (e.target.style.background = '#3b82f6')}
                    >
                        {loading ? 'Creating account...' : 'Sign Up'}
                    </button>
                </form>

                <p style={{
                    textAlign: 'center',
                    marginTop: '24px',
                    color: '#6b7280',
                    fontSize: '14px'
                }}>
                    Already have an account?{' '}
                    <Link href="/login" style={{
                        color: '#3b82f6',
                        textDecoration: 'none',
                        fontWeight: '600'
                    }}>
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}
