import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { useContext } from 'react';
import { getUserRole } from '../services/useAuth';
import { auth } from '../firestore/firebase';

// import { auth, getUserRole } from '../firebase';

interface AuthContextType {
  user: User | null;
  role: string | null;
}

export const AuthContext = createContext<AuthContextType>({ user: null, role: null });

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        const userRole = await getUserRole(user.uid);
        setRole(userRole);
      } else {
        setRole(null);
      }
    });

    return unsubscribe;
  }, []);


  // useEffect(() => {
  //   console.log("Setting up auth listener");
  //   const unsubscribe = auth.onAuthStateChanged(async (user) => {
  //     console.log("Auth state changed", user);
  //     setUser(user);
  //     if (user) {
  //       try {
  //         console.log("Fetching user role for", user.uid);
  //         const userRole = await getUserRole(user.uid);
  //         console.log("Fetched user role", userRole);
  //         setRole(userRole);
  //       } catch (error) {
  //         console.error("Error fetching user role:", error);
  //         setRole(null);
  //       }
  //     } else {
  //       console.log("No user, setting role to null");
  //       setRole(null);
  //     }
  //   });
  
  //   return () => {
  //     console.log("Cleaning up auth listener");
  //     unsubscribe();
  //   };
  // }, []);

  return (
    <AuthContext.Provider value={{ user, role }}>
      {children}
    </AuthContext.Provider>
  );
};
