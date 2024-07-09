import { useState } from "react";
import "./Login.scss";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  LinearProgress,
  Box,
} from "@mui/material";
import {
  createUserWithEmailAndPassword,
  AuthErrorCodes,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../../../config/firebase.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [isLogin, setIsLogin] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [errorStatus, setErrorStatus] = useState({
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
  });

  const handleChange = (e) => {
    setErrorStatus({
      email: {
        error: false,
        message: "",
      },
      password: {
        error: false,
        message: "",
      },
    });

    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    console.log(userData);
    setLoading(true);
    try {
      if (!isLogin) {
        await createUserWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );
        navigate("/home");
      } else {
        await signInWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );
        navigate("/home");
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      if (e.code == AuthErrorCodes.EMAIL_EXISTS) {
        setErrorStatus({
          ...errorStatus,
          email: {
            error: true,
            message: "Email already in use",
          },
        });
      } else if (e.code == AuthErrorCodes.INVALID_EMAIL) {
        setErrorStatus({
          ...errorStatus,
          email: {
            error: true,
            message: "Invalid Email",
          },
        });
      } else if (e.code === AuthErrorCodes.WEAK_PASSWORD) {
        setErrorStatus({
          ...errorStatus,
          password: {
            error: true,
            message: "Password Atleast 6 Characters",
          },
        });
      } else if (e.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
        setErrorStatus({
          ...errorStatus,
          password: {
            error: true,
            message: "Invalid credentials",
          },
        });
      }
    }
  };

  const handleGoogleSubmit = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/home");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="login">
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      <div className="login-main">
        <form onSubmit={(e) => e.preventDefault()}>
          <p className="signup">{isLogin ? "Login" : "Sign up"}</p>
          {!isLogin && (
            <TextField
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
              type="text"
              name="fullName"
              value={userData.fullName}
              onChange={handleChange}
            />
          )}
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            error={errorStatus.email.error}
            helperText={errorStatus.email.message}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type={showPass ? "text" : "password"}
            name="password"
            value={userData.password}
            onChange={handleChange}
            error={errorStatus.password.error}
            helperText={errorStatus.password.message}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={showPass}
                onClick={() => setShowPass(!showPass)}
              />
            }
            label={showPass ? "Hide Password" : "Show Password"}
          />
          <Button variant="contained" onClick={handleSubmit}>
            submit
          </Button>
          <button className="sign-in-google" onClick={handleGoogleSubmit}>
            <img
              src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-pks9lbdv.png"
              alt="google"
            />
            <p>Sign in with Google</p>
          </button>
          <p className="alread-acc" onClick={() => setIsLogin(!isLogin)}>
            {isLogin
              ? "Dont have an account? sign up"
              : "already having an account? login"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
