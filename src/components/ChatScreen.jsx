import React, { useState } from "react";
import coordeesLogoExpand from "../assets/coordeesLogoExpand.svg";
import { PhoneIcon, VideoCameraIcon } from "@heroicons/react/outline";

function ChatScreen() {
  const [contacts] = useState([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ]);

  const [messages, setMessages] = useState([
    { id: 1, text: "Hello!", isMine: false },
    { id: 2, text: "Hi, how are you?", isMine: true },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: newMessage, isMine: true },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div>
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-1/4 bg-white text-white flex flex-col">
          <div className="p-4 border-b hcard">
            <img src={coordeesLogoExpand} alt="coordeeslogo" className="h-6" />
          </div>
          <div className="flex-1 overflow-y-auto">
            {/* Contacts List */}
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="p-4 border-b border-gray-200 text-black"
              >
                {contact.name}
              </div>
            ))}
          </div>
        </aside>

        {/* Chat Area */}
        <main className="flex-1 flex flex-col">
          <header className="p-4 border-b border-gray-300 hcard font-semibold text-green-500 flex items-center justify-between">
            <div>{contacts[0]?.name}</div>
            <div className="flex space-x-4">
              <PhoneIcon className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
              <VideoCameraIcon className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
            </div>
          </header>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Messages */}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isMine ? "justify-end" : ""}`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    message.isMine ? "bg-green-200" : "bg-gray-200"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <footer className="p-4 border-t border-gray-300 flex">
            <input
              type="text"
              placeholder="Type a message"
              className="flex-1 p-2 border border-gray-300 rounded-lg"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              onClick={sendMessage}
              className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
            >
              Send
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default ChatScreen;
