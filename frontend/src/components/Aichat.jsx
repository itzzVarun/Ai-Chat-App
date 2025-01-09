import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { useAiChatStore } from "../store/useAiChatStore";

const Aichat = () => {
  const { aiMessages, getAiMessages, isAiMessagesLoading } = useAiChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getAiMessages();
  }, [getAiMessages]);

  useEffect(() => {
    if (messageEndRef.current && aiMessages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [aiMessages]);

  if (isAiMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className={"chat chat-start"}>
          <div className=" chat-image avatar">
            <div className="size-10 rounded-full border">
              <img src={"/ai.jpg" || "/avatar.png"} alt="ai pic" />
            </div>
          </div>
          <div className="chat-bubble flex flex-col">
            <p>
              Hi, I am your virtual AI assisstant. How can I help you today?
            </p>
          </div>
        </div>

        {aiMessages.map((msg) => (
          <div
            key={msg._id}
            className={`chat ${
              msg.role === "user" ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    msg.role === "user"
                      ? authUser.profilePic || "/avatar.png"
                      : "/ai.jpg" || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(msg.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {msg.message && <p>{msg.message}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default Aichat;
