import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  loginMethod: 'google' | 'phone';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children, onFirstLogin }: { children: ReactNode; onFirstLogin: () => void }) {
  const [user, setUser] = useState<User | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [hasLoggedInBefore, setHasLoggedInBefore] = useState(false);

  const login = (userData: User) => {
    setUser(userData);
    setShowLoginModal(false);
    
    // Show language selection on first login
    if (!hasLoggedInBefore) {
      setHasLoggedInBefore(true);
      onFirstLogin();
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        showLoginModal,
        setShowLoginModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
