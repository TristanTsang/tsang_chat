import { Group, Stack, Text, Divider } from "@mantine/core";
import MessageInput from "./MessageInput";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore.js";
import { formatMessageTime } from "../lib/utils.js";
import { useEffect } from "react";
const ContentSection = () => {
  const { selectedUser, getMessages, messages } = useChatStore();
  const { authUser } = useAuthStore();
  useEffect(() => {
    getMessages(selectedUser._id);
  }, [getMessages, selectedUser._id]);

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
          <img
            height="50px"
            src={selectedUser.profilePic || "/avatar.png"}
            alt={selectedUser.fullName}
            className="sidebar-profile-picture"
          ></img>
          <Stack gap="0px">
            <Text size="sm" m="0" ta="left">
              {selectedUser.fullName}
            </Text>
            <Text size="xs" m="0" ta="left">
              Online
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
              style={{
                display: "flex",
                maxWidth: "67%",
                flexDirection: "column",
                alignSelf: (message.senderId = authUser._id
                  ? "flex-end"
                  : "flex-start"),

                alignItems: (message.senderId = authUser._id ? "end" : "start"),
              }}
            >
              <Text size="xs" mr="15px" ml="15px" mt="10px">
                {formatMessageTime(message.createdAt)}
              </Text>

              <divs
                style={{
                  padding: "7.5px",
                  marginRight: "15px",
                  marginLeft: "15px",

                  textAlign: "left",
                  justifyContent: "end",
                  backgroundColor: "var(--mantine-primary-color-filled",

                  borderRadius: (message.senderId = authUser._id
                    ? "10px 10px 0px 10px"
                    : "10px 10px 10px 0px"),
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
                {message.text && <Text size="md">{message.text}</Text>}
              </divs>
            </div>
          ))}
        </div>
        <MessageInput></MessageInput>
      </div>
    </div>
  );
};

export default ContentSection;
