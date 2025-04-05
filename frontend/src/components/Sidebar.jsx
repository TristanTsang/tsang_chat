import {
  Stack,
  ScrollArea,
  Button,
  Group,
  Text,
  Title,
  Paper,
  Divider,
} from "@mantine/core";
import { IconUsers } from "@tabler/icons-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import "./styles/Sidebar.css";
const Sidebar = () => {
  const { selectedUser, setSelectedUser, users, getUsers } = useChatStore();
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  console.log(users);
  return (
    <Paper shadow="sm" w="15%" h="100%">
      <ScrollArea gap="0px" type="always">
        <Group gap="5px" pl="10px" h="40px" mt="1px">
          <IconUsers size="20px"></IconUsers>
          <Title size="sm">Contacts</Title>
        </Group>
        <Divider ml="5px" mr="5px"></Divider>

        {users.map((user, i) => (
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
              <img
                height="30px"
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className="sidebar-profile-picture"
              ></img>
              <Stack gap="0px">
                <Text size="sm" m="0" ta="left">
                  {user.fullName}
                </Text>
                <Text size="xs" m="0" ta="left">
                  Online
                </Text>
              </Stack>
            </Group>
          </Button>
        ))}
      </ScrollArea>
    </Paper>
  );
};

export default Sidebar;
