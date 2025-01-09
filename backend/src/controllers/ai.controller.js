import asyncHandler from "express-async-handler";
import axios from "axios";
import AiMessage from "../models/ai.messages.model.js";

const limitResponse = (text) => {
  // Split the text into words
  const words = text.split(/\s+/);
  // Take the first 100 words and join them back into a string
  const limitedText = words.slice(0, 100).join(" ");
  return limitedText;
};

export const getAiMessages = async (req, res) => {
  // console.log(req.user._id);
  try {
    const myId = req.user._id;

    const messages = await AiMessage.find({ userId: myId });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getAiMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const userMessage = async (req, res) => {
  try {
    const { text } = req.body;
    // console.log(text);
    const newMessage = new AiMessage({
      userId: req?.user?._id,
      role: "user",
      message: text,
    });
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const aiMessage = asyncHandler(async (req, res) => {
  try {
    const { text } = req.body;
    const response = await axios.post(
      "https://text.pollinations.ai/",
      {
        messages: [{ role: "user", content: text }],
        // jsonMode: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    //send the response
    // console.log(response.data);
    const content = limitResponse(response.data.trim());
    // console.log(content);

    //Create the history
    const newMessage = new AiMessage({
      userId: req?.user?._id,
      role: "system",
      message: content,
    });

    await newMessage.save();
    res.status(200).json(newMessage);
  } catch (error) {
    throw new Error(error);
  }
});
