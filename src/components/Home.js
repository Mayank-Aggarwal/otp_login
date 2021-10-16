import React, { useEffect } from "react";

const Home = ({ signOut, user }) => {
  return (
    <div className="wrapper">
      <h1 className="main-heading">Welcome 👋, {user.phoneNumber}</h1>
      <button className="main-button" id="signOut" onClick={() => {
        if (user && user.phoneNumber) {
          signOut()
        } else {
          window.open('/signin', '_self')
        }
      }}>
        {user && user.phoneNumber ? 'Sign Out' : 'Sign In'}
      </button>
    </div>
  );
};

export default Home;