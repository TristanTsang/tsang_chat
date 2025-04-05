import { Group, Stack, Text, Divider } from "@mantine/core";
import MessageInput from "./MessageInput";
import { useChatStore } from "../store/useChatStore";
const ContentSection = () => {
  const { selectedUser } = useChatStore();
  return (
    <div
      style={{
        display: "flex",
        flexGrow: 1,
        height: "100%",
      }}
    >
      <Stack gap="5px" w="100%">
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
            flexGrow: "1",
            overflow: "scroll",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignSelf: "flex-end",
              alignItems: "end",
            }}
          >
            <Text size="xs" pr="15px">
              12:02 pm
            </Text>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <divs
                style={{
                  padding: "5px",
                  marginRight: "10px",
                  maxWidth: "75%",
                  textAlign: "left",
                  justifyContent: "end",
                  backgroundColor: "var(--mantine-primary-color-filled",
                  borderRadius: "10px 10px 0px 10px",
                }}
              >
                <Text size="md">
                  I&apos;m doing great! Just working on some new features.
                </Text>
              </divs>
            </div>
          </div>
        </div>
        <MessageInput></MessageInput>
      </Stack>
    </div>
  );
};

export default ContentSection;
