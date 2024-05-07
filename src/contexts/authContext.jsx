import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userApi from '../apiService/userApi';

// Create the AuthContext
export const AuthContext = React.createContext();

// Create the AuthProvider component
export const AuthContextProvider = ({ children }) => {
  // State for tracking the logged in status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    const getMyProfile = async () => {
      setLoading(true)
      const token = localStorage.getItem('access_token');
      if (token) {
        const response = await userApi.getMyProfile()
        if (response.data) {
          setProfile(response.data)
          setIsLoggedIn(true)
          navigate('/home')
        }
      }
      setLoading(false)
    }
    getMyProfile()
  },[navigate])

  // Function for logging in
  const login = async (name, password) => {
    setLoading(true)
    const response = await userApi.login(name, password)

    if (response.error) setError(response.error)
    else {
      const token = response.data
      localStorage.setItem('access_token', token)
      navigate('/home')
    }
    setLoading(false)
    setIsLoggedIn(true);
  };

  // Function for logging out
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('access_token');
  };

  // Value object to be provided by the context
  const authContextValue = {
    isLoggedIn,
    error,
    loading,
    profile,
    login,
    logout,
    setError
  };

  // Render the AuthProvider with the provided children
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};