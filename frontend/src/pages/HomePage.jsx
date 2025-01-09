import { useChatStore } from "../store/useChatStore";
import { useAiChatStore } from "../store/useAiChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import Aichat from "../components/Aichat";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const { isSelected } = useAiChatStore();

  const chatSelection = () => {
    if (isSelected) {
      return <Aichat />;
    } else {
      return <ChatContainer />;
    }
  };

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {isSelected || selectedUser ? chatSelection() : <NoChatSelected />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;