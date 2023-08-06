import { useState, useEffect, FormEvent } from "react";
import { askChatbot } from "../../src/apiService";
import { Tooltip } from "react-tooltip";

import { InformationCircleIcon } from "@heroicons/react/24/outline";

import { AiMessage } from "../type";

function ChatBot() {
  const savedMessages = localStorage.getItem("messages");
  const [messages, setMessages] = useState<AiMessage[]>(
    savedMessages ? JSON.parse(savedMessages) : []
  );
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setMessages([...messages, { text: input, user: "human" }]);
    setInput("");

    // Initialize request body
    const body = { input: input };

    try {
      const response = await askChatbot(body);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response, user: "AI" },
      ]);
      setInput("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleClear = (event: FormEvent) => {
    event.preventDefault();
    localStorage.removeItem("messages");
    setMessages([]);
  };

  return (
    <div className="p-5 flex flex-col">
      <div className="flex items-center justify-center mb-5">
        <h1 className="text-2xl font-semibold">Chat with AI</h1>
        <div
          style={{ cursor: "pointer" }}
          data-tooltip-id="my-tooltip-multiline"
          data-tooltip-html="This chat does not maintain the context of the conversation. <br />Each question is treated individually and independently of the others. <br /> Please provide the full context with each question for the most accurate responses."
          data-tooltip-place="bottom"
        >
          <InformationCircleIcon className="w-5 h-5 text-gray-500 ml-2" />
        </div>
        <Tooltip id="my-tooltip-multiline" />
      </div>
      <div
        className="flex-grow overflow-auto mb-4"
        style={{ maxHeight: "70vh" }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 p-2 rounded-lg ${
              message.user === "human"
                ? "bg-blue-200 align-self-end text-right"
                : "bg-gray-200"
            }`}
          >
            <strong className="font-semibold">
              {message.user === "human" ? "You" : "AI"}:
            </strong>{" "}
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex justify-between">
        <input
          className="flex-grow border rounded-lg p-2 mr-2"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <button
          type="submit"
          className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          Send
        </button>
        <button
          onClick={handleClear}
          className="ml-2 rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
        >
          Clear Chat
        </button>
      </form>
    </div>
  );
}

export default ChatBot;
