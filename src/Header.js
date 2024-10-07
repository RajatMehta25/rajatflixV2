import React from "react";

const Header = ({ userDetails, handleLogout }) => {
  return (
    <div className="HeaderContainer">
      <div className="logo">
        <img src="rajatflix.png" />
      </div>
      <div className="userDetailsRow">
        <img className="userImage" src={`${userDetails?.photo}`} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="username">{userDetails?.name}</div>
          <button className="logoutButton" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
