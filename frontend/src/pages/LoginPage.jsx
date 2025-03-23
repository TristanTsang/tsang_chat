import { useAuthStore } from "../store/useAuthStore.js";
import "./styles/SignUpPage.css";
import { useState } from "react";
import toast from "react-hot-toast";
import AuthImagePattern from "../components/AuthImagePattern.jsx";
import {
  Title,
  Text,
  Paper,
  TextInput,
  PasswordInput,
  Button,
} from "@mantine/core";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { login, isLoggingIn } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");

    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) login(formData);
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "0px",
        margin: "0px",
        flexGrow: "1",
      }}
    >
      <div className="outer-container">
        <div className="left-side">
          <Title>Welcome Back</Title>
          <Text> Sign into your account </Text>
          <Paper
            withBorder
            shadow="md"
            p={30}
            mt={30}
            style={{ width: "60%", minWidth: "250px" }}
            radius="md"
          >
            <form onSubmit={handleSubmit}>
              <TextInput
                mt="md"
                ta="left"
                label="Email"
                required
                placeholder="youremail@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                radius="md"
              ></TextInput>
              <PasswordInput
                label="Password"
                ta="left"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Your password"
                required
                radius="md"
                mt="md"
              ></PasswordInput>
              <Button type="submit" fullWidth mt="xl" disabled={isLoggingIn}>
                {isLoggingIn ? <>Loading...</> : <>Sign in</>}
              </Button>

              <Text mt="md">
                Don&apos;t have an account? <Link to="/signup">Create one</Link>
              </Text>
            </form>
          </Paper>
        </div>
        <div className="right-side">
          <AuthImagePattern
            title="Welcome back!"
            subtitle="Sign in to continue your conversations and catch up with your messages."
          ></AuthImagePattern>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
