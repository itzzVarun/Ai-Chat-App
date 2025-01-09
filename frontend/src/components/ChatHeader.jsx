import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useAiChatStore } from "../store/useAiChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { isSelected, setSelected } = useAiChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              {isSelected && !selectedUser ? (
                <img src="/ai.jpg" alt="ai" />
              ) : (
                <img
                  src={selectedUser.profilePic || "/avatar.png"}
                  alt={selectedUser.fullName || "Default Avatar"}
                />
              )}
            </div>
          </div>

          {/* User info */}
          <div>
            {isSelected && !selectedUser ? (
              <h3 className="font-medium">Chatty Ai</h3>
            ) : (
              <div>
                <h3 className="font-medium">{selectedUser.fullName}</h3>
                <p className="text-sm text-base-content/70">
                  {onlineUsers.includes(selectedUser._id)
                    ? "Online"
                    : "Offline"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={
            isSelected && !selectedUser
              ? () => setSelected(false)
              : () => setSelectedUser(null)
          }
        >
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
