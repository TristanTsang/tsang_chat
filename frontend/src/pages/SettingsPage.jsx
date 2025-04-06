import {
  Button,
  Group,
  Stack,
  Paper,
  useMantineColorScheme,
  Text,
  TextInput,
  ActionIcon,
  ScrollArea,
} from "@mantine/core";
import { IconCircleLetterJFilled, IconSend } from "@tabler/icons-react";
import { useThemeStore } from "../store/useThemeStore";
import "./styles/SettingsPage.css";

const SettingsPage = () => {
  const {
    primaryColor,
    mode,
    updatePrimaryColor,
    updateMode,
    primaryTextColor,
  } = useThemeStore();
  const { setColorScheme } = useMantineColorScheme();

  return (
    <ScrollArea>
      <Stack align="center" className="outer">
        <h3 style={{ margin: "0px" }}>Theme</h3>
        <Group justify="center">
          <Button
            variant={mode === "light" ? "filled" : "outline"}
            onClick={() => {
              setColorScheme("light");
              updateMode("light");
            }}
          >
            Light mode
          </Button>
          <Button
            variant={mode === "dark" ? "filled" : "outline"}
            onClick={() => {
              setColorScheme("dark");
              updateMode("dark");
            }}
          >
            Dark mode
          </Button>
        </Group>
        <h3 style={{ margin: "0px" }}>Primary Color</h3>
        <Group w="50%" justify="center" miw="200px" maw="400px">
          <Button
            variant={primaryColor === "dark" ? "filled" : "outline"}
            color="dark"
            onClick={() => updatePrimaryColor("dark")}
          >
            Dark
          </Button>
          <Button
            variant={primaryColor === "gray" ? "filled" : "outline"}
            color="gray"
            onClick={() => updatePrimaryColor("gray")}
          >
            Gray
          </Button>
          <Button
            variant={primaryColor === "red" ? "filled" : "outline"}
            color="red"
            onClick={() => updatePrimaryColor("red")}
          >
            Red
          </Button>
          <Button
            variant={primaryColor === "grape" ? "filled" : "outline"}
            color="grape"
            onClick={() => updatePrimaryColor("grape")}
          >
            Grape
          </Button>
          <Button
            variant={primaryColor === "violet" ? "filled" : "outline"}
            color="violet"
            onClick={() => updatePrimaryColor("violet")}
          >
            Violet
          </Button>
          <Button
            variant={primaryColor === "indigo" ? "filled" : "outline"}
            color="indigo"
            onClick={() => updatePrimaryColor("indigo")}
          >
            Indigo
          </Button>
          <Button
            variant={primaryColor === "blue" ? "filled" : "outline"}
            color="blue"
            onClick={() => updatePrimaryColor("blue")}
          >
            Blue
          </Button>
          <Button
            variant={primaryColor === "teal" ? "filled" : "outline"}
            color="teal"
            onClick={() => updatePrimaryColor("teal")}
          >
            Teal
          </Button>
          <Button
            variant={primaryColor === "lime" ? "filled" : "outline"}
            color="lime"
            onClick={() => updatePrimaryColor("lime")}
          >
            Lime
          </Button>
          <Button
            variant={primaryColor === "yellow" ? "filled" : "outline"}
            color="yellow"
            onClick={() => updatePrimaryColor("yellow")}
          >
            Yellow
          </Button>
          <Button
            variant={primaryColor === "orange" ? "filled" : "outline"}
            color="orange"
            onClick={() => updatePrimaryColor("orange")}
          >
            Orange
          </Button>
        </Group>

        <h3 style={{ margin: "0px" }}>Preview</h3>
        <Paper
          maw="750px"
          className="preview-container"
          radius="sm"
          w="75%"
          align="center"
          withBorder
          shadow="lg"
          p="10px"
        >
          <Paper shadow="xs" maw="500px" className="preview">
            <Stack>
              <Paper>
                <Group p="10px" gap="10px">
                  <IconCircleLetterJFilled
                    height="2.5rem"
                    width="2.5rem"
                    style={{
                      color: "var(--mantine-primary-color-filled)",
                      backgroundColor: "var(--mantine-color-bright)",
                      borderRadius: "50%",
                    }}
                  ></IconCircleLetterJFilled>
                  <Stack gap="0px">
                    <Text size="sm" m="0" ta="left">
                      John Doe
                    </Text>
                    <Text size="xs" m="0" ta="left">
                      Online
                    </Text>
                  </Stack>
                </Group>
              </Paper>

              <div
                style={{
                  maxWidth: "75%",
                  marginLeft: "10px",
                  alignSelf: "flex-start",
                  padding: "5px",
                  textAlign: "left",
                  backgroundColor: "var(--mantine-color-placeholder",
                  borderRadius: "10px 10px 10px 0px",
                }}
              >
                <Text size="md">Hey! How&apos;s it going?</Text>
                <Text size="xs">12:01 pm</Text>
              </div>

              <div
                style={{
                  padding: "5px",
                  marginRight: "10px",
                  maxWidth: "75%",
                  textAlign: "left",
                  alignSelf: "flex-end",
                  backgroundColor: "var(--mantine-primary-color-filled",
                  borderRadius: "10px 10px 0px 10px",
                }}
              >
                <Text c={primaryTextColor} size="md">
                  I&apos;m doing great! Just working on some new features.
                </Text>
                <Text c={primaryTextColor} size="xs">
                  12:02 pm
                </Text>
              </div>

              <Group m="10px">
                <TextInput readOnly="true" flex={1}></TextInput>
                <ActionIcon size="36">
                  <IconSend stroke="2px"></IconSend>
                </ActionIcon>
              </Group>
            </Stack>
          </Paper>
        </Paper>
      </Stack>
    </ScrollArea>
  );
};
export default SettingsPage;
