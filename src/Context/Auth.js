import React, { useState, useEffect, useContext, createContext } from "react";
import supabase from "../Provider/supabase";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [newPassword, setNewPassword] = useState(null);

  const signUp = async (email, username, password) => {
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
      return error;
    } else {
      console.log(data);
      return data;
    }
  };

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
    return { error, data };
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
    setUser(null);
  };

  const forgotPassword = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/reset-password",
    });
    if (error) {
      return error;
    }
  };

  const getUsers = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("username, email");
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      return data;
    }
  };

  const getReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select(
        "id, review, character_id, character, realm, profiles:user_id(username)"
      );
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      return data;
    }
  };

  const addReview = async (
    id,
    review,
    characterId,
    characterName,
    characterRealm,
    userId
  ) => {
    const { error } = await supabase.from("reviews").insert({
      id: id,
      review: review,
      character_id: characterId,
      character: characterName,
      realm: characterRealm,
      user_id: userId,
    });
    if (error) {
      console.log(error);
    }
  };

  const updateEmail = async (email) => {
    const { data, error } = await supabase.auth.updateUser({ email: email });
    if (data) {
      return "Email updated successfully!";
    }
    if (error) {
      return "There was an error updating your email.";
    }
  };

  const updateUsername = async (username) => {
    const { data, error } = await supabase.auth.updateUser({
      data: { username: username },
    });
    if (data) {
      return "Username updated successfully!";
    }
    if (error) {
      return "There was an error updating your username.";
    }
  };

  const updatePassword = async (password) => {
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });
    if (data) {
      return "Password updated successfully!";
    }
    if (error) {
      return "There was an error updating your password.";
    }
  };

  const resetPassword = (password) => {
    setNewPassword(password);
  };

  useEffect(() => {
    const session = supabase.auth.getSession();
    setUser(session.user);

    supabase.auth.onAuthStateChange(async (event, session) => {
      switch (event) {
        case "SIGNED_IN":
          setUser(session.user);
          break;
        case "SIGNED_OUT":
          setUser(null);
          break;
        case "PASSWORD_RECOVERY":
          const newPassword = prompt(
            "What would you like your new password to be?"
          );
          const { data, error } = await supabase.auth.updateUser({
            password: newPassword,
          });

          if (data) alert("Password updated successfully!");
          if (error) alert("There was an error updating your password.");

        // const { data } = await supabase.auth.updateUser({
        //   password: newPassword,
        // });
        // if (data) ;
        // console.log(newPassword)
        // break;
        default:
      }
    });
  }, []);

  return {
    user,
    addReview,
    getReviews,
    getUsers,
    signUp,
    login,
    logout,
    resetPassword,
    forgotPassword,
    updateEmail,
    updatePassword,
    updateUsername,
  };
};
