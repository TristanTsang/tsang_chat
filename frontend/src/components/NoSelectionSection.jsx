import { Center, Text, Title, Stack } from "@mantine/core";
import { IconMessageDots } from "@tabler/icons-react";
const NoSelectionSection = () => {
  return (
    <Center flex={1}>
      <Stack align="center" gap="0px">
        <IconMessageDots
          color="var(--mantine-primary-color-filled)"
          size="100px"
          style={{ marginBottom: "20px" }}
        ></IconMessageDots>
        <Title>Welcome to TsangChat!</Title>
        <Text>Select a conversation from the sidebar to start chatting</Text>
      </Stack>
    </Center>
  );
};

export default NoSelectionSection;
