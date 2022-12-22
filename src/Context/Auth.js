import React, { useState, useEffect, useContext, createContext } from "react";
import supabase from "../Provider/supabase";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
    return useContext(authContext)
}

const useProvideAuth = () => {
    const [user, setUser] = useState(null)

    const signUp = async (email, password, username) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
              data: {
                username: username,
              },
            },
          });
          if (error) {
            console.log(error);
          } else {
            console.log(data);
          }
    }

    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });
        if(error) {
            console.log(error)
        } else {
            console.log(data)
        };
    };
    

    const logout = async () => {
        const { error } = await supabase.auth.signOut()
        setUser(null)

        if(error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        const user = supabase.auth.user()
        setUser(user)

        const auth = supabase.auth.onAuthStateChange((event, session) => {
            if(event === 'SIGNED_IN') {
                setUser(session.user)
            }

            if(event === 'SIGNED_OUT') {
                setUser(null)
            }
        })

        return () => auth.unsubscribe() 

    }, []);

    return {
        user,
        signUp,
        login,
        logout
    }
}