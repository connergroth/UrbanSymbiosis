// references:
// https://supabase.com/docs/guides/auth/quickstarts/react
// https://medium.com/@kimtai.developer/react-typescript-authentication-guide-using-context-api-5c82f2530eb1
// https://supabase.com/docs/guides/getting-started/tutorials/with-react
// https://supabase.com/docs/reference/javascript/auth-getsession
// https://supabase.com/docs/reference/javascript/auth-signinwithotp
// https://supabase.com/docs/guides/auth/quickstarts/react

import { ReactNode, createContext, useState, useEffect, useContext } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  session: Session | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
  authError: string | null;
  setAuthError: (error: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error:', error);
      } else {
        setSession(session);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setAuthError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setAuthError(error.message);
      return false;
    }

    return true;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error);
    } else {
      setSession(null);
    }
  };

  return (
    <AuthContext.Provider value={{ session, login, logout, loading, authError, setAuthError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth is undefined');
  }
  return context;
};
