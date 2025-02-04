import { useContext, createContext, type PropsWithChildren } from 'react';
// import axios from 'axios';
import { useStorageState } from './useStorageState';
import { router } from "expo-router";

import api from '@/constants/api'

const AuthContext = createContext<{
  // signIn: () => void;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: async () => {},
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

// const api = axios.create({
//   baseURL: 'http://192.168.85.167:8000', // Replace with your API URL
// });

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  if (session) {
    api.defaults.headers.common['Authorization'] = `Bearer ${session}`;
  }
  
  // Sign-in function
  const signIn = async (username: string, password: string) => {
    console.log(username);
    try {
      const response = await api.post('/dj-rest-auth/login/', { username, password });
      console.log(response.data);
      const token = response.data.key;
      setSession(token); // Store token securely
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      router.replace("/");
    } catch (error:any) {
      if (error.response) {
        // Server responded with a status code outside 2xx
        console.log('Response Data:', error.response.data);
        console.log('Status:', error.response.status);
        console.log('Headers:', error.response.headers);
      } else if (error.request) {
        // Request was made but no response received
        console.log('No Response:', error.request);
      } else {
        // Something else happened while setting up the request
        console.log('Error Message:', error.message);
      }
      // console.log('Full Error:', JSON.stringify(error, null, 2)); // Convert error object to JSON
      throw error;
    }
  };

  // Sign-out function
  const signOut = () => {
    setSession(null);
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, session, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
