import {
  Stack,
  ScrollArea,
  Button,
  Group,
  Text,
  Title,
  Divider,
  Checkbox,
} from "@mantine/core";
import { IconUsers } from "@tabler/icons-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import "./styles/Sidebar.css";

const Sidebar = () => {
  const { selectedUser, setSelectedUser, users, getUsers } = useChatStore();
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => {
        return onlineUsers.includes(user._id);
      })
    : users;
  return (
    <ScrollArea m="0px" shadow="sm" className="sidebar">
      <Stack h="70px" justify="space-around" className="hide-on-small">
        <Group gap="5px" pl="10px">
          <IconUsers size="20px"></IconUsers>
          <Title size="md">Contacts</Title>
        </Group>
        <Group pl="10px" gap="5px" m="0px">
          <label
            style={{ display: "flex", gap: "5px", alignItems: "center" }}
            className="show-online"
          >
            <Checkbox
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              size="15px"
            ></Checkbox>{" "}
            <Text m="0px" size="sm">
              Show online only
            </Text>
          </label>

          <Text m="0px" size="xs" c="var(--mantine-color-dimmed)">
            ({onlineUsers.length - 1} online)
          </Text>
        </Group>
      </Stack>
      <Divider ml="5px" mr="5px" mt="0px" mb="0px"></Divider>
      {filteredUsers.map((user, i) => (
        <Button
          h="50px"
          w="100%"
          key={i}
          onClick={() => setSelectedUser(user)}
          style={
            selectedUser?._id === user._id
              ? { backgroundColor: "var(--mantine-primary-color-filled)" }
              : {}
          }
          className="userButton"
        >
          <Group p="10px" gap="10px">
            <div style={{ position: "relative" }}>
              <img
                height="30px"
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className="sidebar-profile-picture"
              ></img>
              {onlineUsers.includes(user._id) && (
                <div
                  style={{
                    position: "absolute",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    bottom: "0px",
                    right: "0px",
                    border:
                      selectedUser?._id === user._id
                        ? "1px solid var(--mantine-primary-color-filled)"
                        : "var(--mantine-color-default-hover)",

                    backgroundColor: "green",
                  }}
                ></div>
              )}
            </div>

            <Stack gap="0px" className="hide-on-small">
              <Text
                size="sm"
                m="0"
                ta="left"
                c={
                  selectedUser?._id === user._id
                    ? "var(--mantine-primary-color-contrast)"
                    : "var(--mantine-color-text)"
                }
              >
                {user.fullName}
              </Text>
              <Text
                size="xs"
                m="0"
                ta="left"
                c={
                  selectedUser?._id === user._id
                    ? "var(--mantine-primary-color-contrast)"
                    : "var(--mantine-color-text)"
                }
              >
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </Text>
            </Stack>
          </Group>
        </Button>
      ))}
    </ScrollArea>
  );
};

export default Sidebar;
