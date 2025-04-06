import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import "./styles/Navbar.css";
import { Button } from "@mantine/core";
import {
  IconMessageDots,
  IconLogout,
  IconSettings,
  IconUserCircle,
} from "@tabler/icons-react";
const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const buttonStyle = {
    display: "flex",
    gap: "0.25rem",
    height: "100%",
    alignItems: "center",
  };
  return (
    <div
      className="navbar"
      style={{
        display: "flex",

        justifyContent: "space-between",
        paddingLeft: "2rem",
        paddingRight: "2rem",
      }}
    >
      <header
        style={{
          display: "flex",
          height: "100%",
          justifyContent: "center",

          gap: "20px",
        }}
      >
        <div style={{ flexGrow: "1", justifyContent: "start" }}>
          <Link to="/" style={{ ...buttonStyle, fontWeight: "1000" }}>
            <IconMessageDots height="25px"></IconMessageDots>
            TsangChat
          </Link>
        </div>
      </header>

      <header
        style={{
          display: "flex",
          height: "100%",
          justifyContent: "center",

          gap: "12.5px",
        }}
      >
        <Link to="/settings" style={buttonStyle}>
          <IconSettings></IconSettings>
          <p className="hide">Settings</p>
        </Link>

        {authUser && (
          <>
            <Link to="/profile" style={buttonStyle}>
              <IconUserCircle></IconUserCircle>
              <p className="hide">Profile</p>
            </Link>
            <Button
              onClick={() => {
                logout();
              }}
              style={{
                ...buttonStyle,
                color: "var(--mantine-primary-color-filled)",
                backgroundColor: "transparent",
                padding: "0px",
                fontSize: "1rem",
              }}
            >
              <IconLogout></IconLogout>
              <p className="hide">Logout</p>
            </Button>
          </>
        )}
      </header>
    </div>
  );
};
export default Navbar;
