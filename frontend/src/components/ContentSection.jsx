import { Group, Stack, Text, Divider } from "@mantine/core";
import MessageInput from "./MessageInput";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore.js";
import { formatMessageTime } from "../lib/utils.js";
import { useEffect, useRef } from "react";
const ContentSection = () => {
  const {
    selectedUser,
    getMessages,
    messages,
    subscribeToMessages,
    unsubscribeToMessages,
  } = useChatStore();
  const messageEndRef = useRef(null);
  const { authUser, onlineUsers } = useAuthStore();
  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeToMessages();
  }, [
    getMessages,
    selectedUser._id,
    subscribeToMessages,
    unsubscribeToMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      style={{
        width: "67%",
        display: "flex",
        flexGrow: 1,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          flexGrow: "1",
        }}
      >
        <Group p="10px" gap="10px">
          <div style={{ position: "relative", height: "50px", width: "50px" }}>
            {" "}
            <img
              height="50px"
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="sidebar-profile-picture"
            ></img>
            {onlineUsers.includes(selectedUser?._id) && (
              <div
                style={{
                  position: "absolute",
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  bottom: "0px",
                  right: "0px",
                  border: "2px solid var(--mantine-color-default)",

                  backgroundColor: "green",
                }}
              ></div>
            )}
          </div>

          <Stack gap="0px">
            <Text size="sm" m="0" ta="left">
              {selectedUser.fullName}
            </Text>
            <Text size="xs" m="0" ta="left">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </Text>
          </Stack>
        </Group>

        <Divider></Divider>
        <div
          style={{
            width: "100%",
            flexGrow: 1,
            display: "flex",
            overflow: "scroll",

            flexDirection: "column",
          }}
        >
          {messages.map((message) => (
            <div
              key={message._id}
              ref={messageEndRef}
              style={{
                display: "flex",
                maxWidth: "67%",
                flexDirection: "column",
                alignSelf:
                  message.senderId === authUser._id ? "flex-end" : "flex-start",

                alignItems: message.senderId === authUser._id ? "end" : "start",
              }}
            >
              <Text size="xs" mr="15px" ml="15px" mt="10px">
                {formatMessageTime(message.createdAt)}
              </Text>

              <div
                style={{
                  padding: "7.5px",
                  marginRight: "15px",
                  marginLeft: "15px",

                  textAlign: "left",
                  justifyContent: "end",

                  backgroundColor:
                    message.senderId === authUser._id
                      ? "var(--mantine-primary-color-filled"
                      : "var(--mantine-color-placeholder",

                  borderRadius:
                    message.senderId === authUser._id
                      ? "10px 10px 0px 10px"
                      : "10px 10px 10px 0px",
                }}
              >
                {message.image && (
                  <img
                    style={{
                      borderRadius: "10px 10px 10px 10px",

                      width: "150px",
                      height: "150px",
                    }}
                    src={message.image}
                    alt="attachment"
                  ></img>
                )}
                {message.text && (
                  <Text
                    size="md"
                    c={
                      message.senderId === authUser._id
                        ? "var(--mantine-primary-color-contrast)"
                        : "black"
                    }
                  >
                    {message.text}
                  </Text>
                )}
              </div>
            </div>
          ))}
        </div>
        <MessageInput></MessageInput>
      </div>
    </div>
  );
};

export default ContentSection;
