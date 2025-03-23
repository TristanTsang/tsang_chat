import { Divider, Paper } from "@mantine/core";
import { IconUser, IconMail, IconCamera } from "@tabler/icons-react";
import "./styles/ProfilePage.css";
import { useState } from "react";

import { useAuthStore } from "../store/useAuthStore";
const ProfilePage = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = async () => {
        // Set max width and height to resize the image
        const maxWidth = 500; // Resize image width
        const maxHeight = 500; // Resize image height

        let width = img.width;
        let height = img.height;

        // Calculate new dimensions while maintaining aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height *= maxWidth / width));
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width *= maxHeight / height));
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = width;
        canvas.height = height;

        // Draw the resized image
        ctx.drawImage(img, 0, 0, width, height);

        // Convert the resized image to Base64 (compressed JPEG)
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7); // 0.7 is the quality factor (0 to 1)

        // Set the resized image
        setSelectedImg(compressedBase64);

        await updateProfile({ profilePic: compressedBase64 });
      };
    };
  };
  return (
    <div className="profile-container">
      <Paper
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
        className="profile-section"
      >
        <h2 className="title">Profile</h2>
        <p className="info-text">Your profile information</p>
        <div className="relative">
          <img
            src={selectedImg || authUser.profilePic || "/avatar.png"}
            height="100px"
            width="100px"
            alt="profile picture"
            className="profile-picture"
          ></img>
          <label htmlFor="avatar-upload" className="upload-image">
            <IconCamera
              style={{
                backgroundColor: "lightGrey",
                padding: "5px",
                height: "30px",
                width: "30px",
                borderRadius: "100%",
              }}
            ></IconCamera>
            <input
              type="file"
              id="avatar-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUpdatingProfile}
            ></input>
          </label>
        </div>
        <p className="info-text">Click the camera to upload your photo</p>
        <div className="header">
          <IconUser></IconUser>
          Full Name
        </div>
        <p className="info-field"> {authUser.fullName}</p>
        <div className="header">
          <IconMail></IconMail>
          Email
        </div>
        <p className="info-field"> {authUser.email}</p>
        <h3>Account Information</h3>

        <div className="account-info">
          <p className="info-text">Member Since</p>
          <p className="info-text">{authUser.createdAt?.split("T")[0]}</p>
        </div>
        <Divider my="xs"></Divider>
        <div className="account-info">
          <p className="info-text">Account Status</p>
          <p className="info-text" style={{ color: "green" }}>
            Active
          </p>
        </div>
      </Paper>
    </div>
  );
};
export default ProfilePage;
