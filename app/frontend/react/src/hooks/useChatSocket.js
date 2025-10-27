// hooks/useChatSocket.js
import { useEffect } from "react";

export default function useChatSocket(
  socket,
  currentUserMongoId,
  setOnlineUsers,
  setMessages,
  activeContact,
  fetchChats
) {
  useEffect(() => {
    if (!socket || !currentUserMongoId) return;

    socket.emit("addUser", currentUserMongoId);

    socket.on("getUsers", (users) => setOnlineUsers(users));
    socket.on("userOnline", (userId) =>
      setOnlineUsers((prev) => [...new Set([...prev, userId])])
    );
    socket.on("userOffline", (userId) =>
      setOnlineUsers((prev) => prev.filter((id) => id !== userId))
    );
    socket.on("getMessage", (data) => {
      if (activeContact && data.conversationId === activeContact._id) {
        setMessages((prev) => [...prev, data]);
      }
      fetchChats();
    });

    return () => {
      socket.off("getUsers");
      socket.off("userOnline");
      socket.off("userOffline");
      socket.off("getMessage");
    };
  }, [socket, currentUserMongoId, activeContact]);
}
