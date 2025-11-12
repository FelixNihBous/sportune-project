'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { API_URL } from '../../lib/api'

function MyAccountPage() {
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('account-details')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Get user from localStorage
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser)
          setUser(parsedUser)
          setEmail(parsedUser.email)
          setFirstName(parsedUser.firstName || '')
          setLastName(parsedUser.lastName || '')
          setNickname(parsedUser.nickname || '')
        } catch (err) {
          console.error('Error parsing user:', err)
        }
      } else {
        // Redirect to login if not authenticated
        router.push('/login')
      }
    }
  }, [router])

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email,
          firstName,
          lastName,
          nickname
        })
      })

      if (!response.ok) {
        setError('Failed to update profile')
        setLoading(false)
        return
      }

      const updatedUser = await response.json()
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setUser(updatedUser)
      setSuccess('Profile updated successfully!')
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword })
      })

      if (!response.ok) {
        setError('Failed to update password')
        setLoading(false)
        return
      }

      const updatedUser = await response.json()
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setUser(updatedUser)
      setNewPassword('')
      setConfirmPassword('')
      setSuccess('Password updated successfully!')
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  if (!user) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
  }

  const navItems = [
    { id: 'account-details', label: 'Account Details', icon: '⚙️' },
    { id: 'password', label: 'Change Password', icon: '🔒' },
    { id: 'logout', label: 'Logout', icon: '🚪' }
  ]

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <div style={{
        display: 'flex',
        height: '90vh',
        background: '#f5f5f5',
        borderRadius: '16px',
        overflow: 'hidden',
        maxWidth: '1200px',
        width: '95%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <div style={{
          width: '280px',
          background: 'white',
          borderRight: '1px solid #e0e0e0',
          padding: '24px',
          overflowY: 'auto'
        }}>
          <button
            onClick={() => router.back()}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'white',
              border: '1px solid #e0e0e0',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              zIndex: 10000
            }}
          >
            ×
          </button>

          {/* Navigation */}
          <nav>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'logout') {
                    handleLogout()
                  } else {
                    setActiveTab(item.id)
                    setError('')
                    setSuccess('')
                  }
                }}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  margin: '8px 0',
                  border: 'none',
                  background: activeTab === item.id ? '#3b82f6' : 'transparent',
                  color: activeTab === item.id ? 'white' : '#666',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.2s'
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div style={{
          flex: 1,
          padding: '40px',
          overflowY: 'auto'
        }}>
          <div style={{
            maxWidth: '800px'
          }}>
            {/* Account Details Tab */}
            {activeTab === 'account-details' && (
              <div>
                <h1 style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#333',
                  margin: '0 0 8px 0',
                  fontFamily: 'Hanken Grotesk'
                }}>
                  Account Settings
                </h1>
                <p style={{
                  color: '#666',
                  marginBottom: '24px',
                  fontSize: '14px'
                }}>
                  Manage your profile information
                </p>

                {error && (
                  <div style={{
                    background: '#fee2e2',
                    color: '#dc2626',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    fontSize: '14px'
                  }}>
                    ❌ {error}
                  </div>
                )}

                {success && (
                  <div style={{
                    background: '#dcfce7',
                    color: '#16a34a',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    fontSize: '14px'
                  }}>
                    ✓ {success}
                  </div>
                )}

                <form onSubmit={handleUpdateProfile} style={{
                  background: 'white',
                  padding: '24px',
                  borderRadius: '12px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#333',
                      marginBottom: '6px'
                    }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#333',
                      marginBottom: '6px'
                    }}>
                      First Name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter your first name"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#333',
                      marginBottom: '6px'
                    }}>
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter your last name"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#333',
                      marginBottom: '6px'
                    }}>
                      Nickname
                    </label>
                    <input
                      type="text"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      placeholder="Enter your nickname"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      padding: '12px 32px',
                      background: loading ? '#9ca3af' : '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              </div>
            )}

            {/* Change Password Tab */}
            {activeTab === 'password' && (
              <div>
                <h1 style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#333',
                  margin: '0 0 8px 0',
                  fontFamily: 'Hanken Grotesk'
                }}>
                  Change Password
                </h1>
                <p style={{
                  color: '#666',
                  marginBottom: '24px',
                  fontSize: '14px'
                }}>
                  Update your password to keep your account secure
                </p>

                {error && (
                  <div style={{
                    background: '#fee2e2',
                    color: '#dc2626',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    fontSize: '14px'
                  }}>
                    ❌ {error}
                  </div>
                )}

                {success && (
                  <div style={{
                    background: '#dcfce7',
                    color: '#16a34a',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    fontSize: '14px'
                  }}>
                    ✓ {success}
                  </div>
                )}

                <form onSubmit={handlePasswordChange} style={{
                  background: 'white',
                  padding: '24px',
                  borderRadius: '12px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#333',
                      marginBottom: '6px'
                    }}>
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#333',
                      marginBottom: '6px'
                    }}>
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      padding: '12px 32px',
                      background: loading ? '#9ca3af' : '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {loading ? 'Updating...' : 'Update Password'}
                  </button>
                </form>
              </div>
            )}

            {activeTab !== 'account-details' && activeTab !== 'password' && (
              <div style={{
                background: 'white',
                padding: '40px',
                borderRadius: '12px',
                textAlign: 'center',
                color: '#666'
              }}>
                <p style={{ fontSize: '16px', margin: 0 }}>
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ')} coming soon
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyAccountPage
