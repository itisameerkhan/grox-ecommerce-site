import "./Header.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../../config/firebase.js";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import DialogContainer from "../Dialog/DialogContainer.jsx";

const Header = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    displayName: "",
    photoURL: "",
  });
  const [dialogStatus, setDialogStatus] = useState(false);

  const handleDialogStatus = () => {
    setDialogStatus(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("auth state called");
      if (user) {
        setUserData({
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
        navigate("/home");
      } else {
        navigate("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  
  return (
    <div className="header">
      <div className="header-main">
        <p className="header-logo">GROX</p>
        {location.pathname !== "/" && (
          <div className="header-search">
            <span className="material-symbols-outlined">search</span>
            <input type="text" placeholder="search..." />
          </div>
        )}
        {location.pathname !== "/" && (
          <div className="header-login">
            {userData.photoURL ? (
              <img src={userData.photoURL} alt="" />
            ) : (
              <span className="material-symbols-outlined">account_circle</span>
            )}
            <span
              className="material-symbols-outlined"
              onClick={() => setDialogStatus(true)}
            >
              add
            </span>
            <span className="material-symbols-outlined">shopping_cart</span>
            <span className="material-symbols-outlined" onClick={handleSignOut}>
              logout
            </span>
          </div>
        )}
      </div>
      <DialogContainer open={dialogStatus} handleClose={handleDialogStatus} />
      <div className="header-temp"></div>
    </div>
  );
};

export default Header;
