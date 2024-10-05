import React, { useEffect, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import SpeechPage from './SpeechPage';
import SubSpeechPage from './SubSpeechPage';
import SubMiddleSpeechPage from './SubMiddleSpeechPage';
import TokenContext from '../context/TokenContext';  // Ensure you have the context set up

const Fork = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(TokenContext);
  const [loading, setLoading] = useState(true);  // State for loading
  const [plan, setPlan] = useState()

  useEffect(() => {
    const checkAuth = async () => {
      const token = await localStorage.getItem('token');  // Fetch token from localStorage
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        // Send request to the backend to verify token
        await axios.get('http://localhost:5000/app', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);  // Stop loading after the request
      }
    };

    checkAuth();
  }, []);



  useEffect(() => {
  const checkSubs = async () => {
    const token = localStorage.getItem('token')

    try {
        const response = await axios.get('http://localhost:5000/validateId', {
            headers: {
                'Authorization': `Bearer ${token}`,
              }
        })

        setPlan(response.data)

        console.log(response.data)

    } catch (err) {
        console.log(err)
    }

}

checkSubs()

}, [])




  if (loading) {
    return <div>Loading...</div>;  // Display loading while authentication is being checked
  }

  // Render SpeechPage if authenticated, else redirect to login
  return isAuthenticated && plan === 1500 ? <SubSpeechPage /> : isAuthenticated && plan === 500 ? <SubMiddleSpeechPage /> : isAuthenticated ? <SpeechPage /> : <Navigate to="/login" />;
};

export default Fork;
