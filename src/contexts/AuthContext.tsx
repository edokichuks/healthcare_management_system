import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { getUserName, getUserRole } from '../services/useAuth';
import { auth } from '../firestore/firebase';

// import { auth, getUserRole } from '../firebase';

interface AuthContextType {
  user: User | null;
  role: string | null;
  userName: string | null;
}

export const AuthContext = createContext<AuthContextType>({ user: null, role: null });

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        const userRole = await getUserRole(user.uid);
        setRole(userRole);
        const userName = await getUserName(user.uid);
        setUserName(userName);
      } else {
        setRole(null);
      }
    });

    return unsubscribe;
  }, []);


  return (
    <AuthContext.Provider value={{ user, role, userName }}>
      {children}
    </AuthContext.Provider>
  );
};
