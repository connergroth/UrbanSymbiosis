// TODO: Create AuthContext with login/logout placeholders

// references:
// https://supabase.com/docs/guides/auth/quickstarts/react
// https://medium.com/@kimtai.developer/react-typescript-authentication-guide-using-context-api-5c82f2530eb1
// https://supabase.com/docs/guides/getting-started/tutorials/with-react
// https://supabase.com/docs/reference/javascript/auth-getsession

import { ReactNode, createContext, useState, useEffect, useContext } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  session: Session | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>({
  session: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const getSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) {
          console.error('Error:', error);
        } else {
          setSession(session);
          console.log('Session:', session);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getSession().catch(console.error);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log('Session change:', session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async () => {
    console.log('Login placeholder');
  };

  const logout = async () => {
    console.log('Logout placeholder');
  };

  return <AuthContext.Provider value={{ session, login, logout }}>{children}</AuthContext.Provider>;
};

// export const useAuth = () => useContext(AuthContext);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth is undefined');
  }
  return context;
};
