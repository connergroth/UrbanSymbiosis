// TODO: Create AuthContext with login/logout placeholders

// references:
// https://supabase.com/docs/guides/auth/quickstarts/react
// https://medium.com/@kimtai.developer/react-typescript-authentication-guide-using-context-api-5c82f2530eb1
// https://supabase.com/docs/guides/getting-started/tutorials/with-react
// https://supabase.com/docs/reference/javascript/auth-getsession

import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext<any>({
  session: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const getSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) {
          throw error;
        } else {
          setSession(session);
          console.log('Session:', session);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getSession();

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

export const useAuth = () => useContext(AuthContext);
