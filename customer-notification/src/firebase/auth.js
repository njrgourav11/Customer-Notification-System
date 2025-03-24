import React, { useState, useEffect } from "react";
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import { useNavigate } from "react-router-dom";
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  CircularProgress, 
  Alert, 
  Box 
} from "@mui/material";

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        navigate("/");  // Redirect after login
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleAuthError = (error) => {
    switch (error.code) {
      case "auth/wrong-password":
        setError("Incorrect password. Please try again.");
        break;
      case "auth/user-not-found":
        setError("No account found with this email. Please register first.");
        break;
      case "auth/email-already-in-use":
        setError("Email is already registered. Try signing in instead.");
        break;
      case "auth/weak-password":
        setError("Password should be at least 6 characters long.");
        break;
      case "auth/invalid-email":
        setError("Invalid email format. Please enter a valid email.");
        break;
      case "auth/network-request-failed":
        setError("Network error. Please check your internet connection.");
        break;
      default:
        setError("An unexpected error occurred. Please try again.");
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      handleAuthError(error);
    }
    setLoading(false);
  };

  const registerWithEmail = async () => {
    setError("");  // Reset errors before attempting
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      handleAuthError(error);
    }
    setLoading(false);
  };

  const signInWithEmail = async () => {
    setError("");  // Reset errors before attempting
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      handleAuthError(error);
    }
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      handleAuthError(error);
    }
    setLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Firebase Authentication
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {user ? (
          <Box>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Welcome, {user.email}
            </Typography>
            <Button 
              onClick={logout} 
              variant="contained" 
              color="error" 
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Logout"}
            </Button>
          </Box>
        ) : (
          <Box component="form">
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <Button
              onClick={signInWithEmail}
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Sign In"}
            </Button>

            <Button
              onClick={registerWithEmail}
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Register"}
            </Button>

            <Button
              onClick={signInWithGoogle}
              variant="contained"
              color="error"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Sign in with Google"}
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Auth;
