import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useAiChatStore = create((set, get) => ({
  aiMessages: [],
  isSelected: false,
  isAiMessagesLoading: false,

  getAiMessages: async () => {
    set({ isAiMessagesLoading: true });
    try {
      const res = await axiosInstance.get("/ai/ai-chat");
      set({ aiMessages: res.data });
    //   console.log(res.data);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isAiMessagesLoading: false });
    }
  },

  saveUsermsg: async (messageData) => {
    const { aiMessages } = get();
    try {
      const res1 = await axiosInstance.post("/ai/user-msg", messageData);
      set({ aiMessages: [...aiMessages, res1.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  sendAiMessage: async (messageData) => {
    const { aiMessages } = get();
    try {
      const res2 = await axiosInstance.post("/ai/askai", messageData);
      set({ aiMessages: [...aiMessages, res2.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  setSelected: (isSelected) => set({ isSelected }),
}));
