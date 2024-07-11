import "./Header.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../../config/firebase.js";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import DialogContainer from "../Dialog/DialogContainer.jsx";
import { Link } from "react-router-dom";
import { addUser, removeUser } from "../../context/userSlice.js";
import { useDispatch } from "react-redux";

const Header = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      dispatch(removeUser());
      console.log("remove user");
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
        console.log("onauth call");
        dispatch(addUser(user));
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
        {location.pathname !== "/" ? (
          <Link to={"/home"}>
            <p className="header-logo">GROX</p>
          </Link>
        ) : (
          <p className="header-logo">GROX</p>
        )}
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
            <Link to={"/cart"}>
              <span className="material-symbols-outlined">shopping_cart</span>
            </Link>
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
