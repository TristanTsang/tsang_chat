import "./App.css";
import "@mantine/core/styles.css";

import { Loader, MantineProvider, Stack, createTheme } from "@mantine/core";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { useThemeStore } from "./store/useThemeStore.js";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  const { primaryColor } = useThemeStore();
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const myTheme = createTheme({
    primaryColor: primaryColor,
  });
  return (
    <MantineProvider theme={myTheme}>
      {isCheckingAuth && !authUser ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader size={30}></Loader>
        </div>
      ) : (
        <Stack
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            gap: "0px",
          }}
        >
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={authUser ? <HomePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/signup"
              element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!authUser ? <LoginPage /> : <Navigate to="/" />}
            />
            <Route path="/settings" element={<SettingsPage />} />
            <Route
              path="/profile"
              element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
            />
          </Routes>
        </Stack>
      )}
    </MantineProvider>
  );
}

export default App;
