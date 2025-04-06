import Sidebar from "../components/Sidebar";
import ContentSection from "../components/ContentSection";
import NoSelectionSection from "../components/NoSelectionSection";
import { useChatStore } from "../store/useChatStore";
const HomePage = () => {
  const { selectedUser } = useChatStore();
  return (
    <div style={{ display: "flex", height: "calc(100% - 3rem)" }}>
      <Sidebar></Sidebar>
      {selectedUser ? (
        <ContentSection></ContentSection>
      ) : (
        <NoSelectionSection></NoSelectionSection>
      )}
    </div>
  );
};
export default HomePage;
