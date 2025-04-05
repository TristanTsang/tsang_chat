import { Group } from "@mantine/core";
import Sidebar from "../components/Sidebar";
import ContentSection from "../components/ContentSection";
import NoSelectionSection from "../components/NoSelectionSection";
import { useChatStore } from "../store/useChatStore";
const HomePage = () => {
  const { selectedUser } = useChatStore();
  return (
    <Group h="100%" gap="0px" p="0px" w="100%">
      <Sidebar></Sidebar>
      {selectedUser ? (
        <ContentSection></ContentSection>
      ) : (
        <NoSelectionSection></NoSelectionSection>
      )}
    </Group>
  );
};
export default HomePage;
