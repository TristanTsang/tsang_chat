import { useAuthStore } from "../store/useAuthStore.js";
import "./styles/SignUpPage.css";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern.jsx";
import {
  Title,
  Text,
  Paper,
  TextInput,
  PasswordInput,
  Button,
} from "@mantine/core";

const SignUpPage = () => {
  const { signUp, isSigningUp } = useAuthStore();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signUp(formData);
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
          <Title>Welcome</Title>
          <Text> Create your account </Text>
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
                ta="left"
                label="Full Name"
                placeholder="John Doe"
                required
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                radius="md"
              ></TextInput>
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
              <Button type="submit" fullWidth mt="xl" disabled={isSigningUp}>
                {isSigningUp ? <>Loading...</> : <>Create Account</>}
              </Button>

              <Text mt="md">
                Don&apos;t have an account? <Link to="/login">Sign in</Link>
              </Text>
            </form>
          </Paper>
        </div>
        <div className="right-side">
          <AuthImagePattern
            title="Join Our Community"
            subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
          ></AuthImagePattern>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
