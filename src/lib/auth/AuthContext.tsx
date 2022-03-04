import { createContext, FunctionComponent, useState, useEffect } from 'react';
import Router from 'next/router';
import { supabase } from '~/lib/supabase';
import { useMessage } from '~/lib/message';
import { SupabaseAuthPayload } from './auth.types';
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { ROUTE_HOME, ROUTE_AUTH } from '~/config';

export type AuthContextProps = {
  user: User;
  signUp: (payload: SupabaseAuthPayload) => void;
  signIn: (payload: SupabaseAuthPayload) => void;
  signOut: () => void;
  loggedIn: boolean;
  loading: boolean;
  userLoading: boolean;
};

export const AuthContext = createContext<Partial<AuthContextProps>>({});

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const { handleMessage } = useMessage();

  const signUp = async (payload: SupabaseAuthPayload) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp(payload);
      if (error) {
        handleMessage({ message: error.message, type: 'error' });
      } else {
        handleMessage({
          message:
            'Signup successful. Please check your inbox for a confirmation email!',
          type: 'success',
        });
      }
    } catch (error) {
      handleMessage({
        message: error.error_description || error,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (payload: SupabaseAuthPayload) => {
    try {
      setLoading(true);
      const { error, user } = await supabase.auth.signIn(payload);
      if (error) {
        handleMessage({ message: error.message, type: 'error' });
      } else {
        handleMessage({
          message: `Welcome, ${user.email}`,
          type: 'success',
        });
      }
    } catch (error) {
      handleMessage({
        message: error.error_description || error,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => await supabase.auth.signOut();

  const setServerSession = async (event: AuthChangeEvent, session: Session) => {
    await fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    });
  };

  useEffect(() => {
    const user = supabase.auth.user();
    if (user) {
      setUser(user);
      setUserLoading(false);
      setLoggedIn(true);
      Router.push(ROUTE_HOME);
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const user = session?.user! ?? null;
        setUserLoading(false);
        await setServerSession(event, session);
        if (user) {
          setUser(user);
          setLoggedIn(true);
          Router.push(ROUTE_HOME);
        } else {
          setUser(null);
          Router.push(ROUTE_AUTH);
        }
      }
    );
    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signUp, signIn, signOut, loading, loggedIn, userLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
