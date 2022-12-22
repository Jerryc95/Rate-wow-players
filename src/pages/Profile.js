import React, { useState } from "react";

import supabase from "../Provider/supabase";

const Profile = () => {
  const [username, setUsername] = useState({});

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log(user);
    setUsername(user);
  };

  return (
    <div>
        <h1>profile</h1>
      <button onClick={getUser}>get user</button>
      <h1>{username.email}</h1>
    </div>
  );
};

export default Profile;
