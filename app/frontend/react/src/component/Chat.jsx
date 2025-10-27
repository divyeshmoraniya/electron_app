import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Send,
  Phone,
  Video,
  Paperclip,
  Smile,
  Mic,
  Search,
  Palette,
  Plus,
  X,
  Check,
  Users as UsersIcon,
  Image,
  File,
  Sun,
  Moon,
} from "lucide-react";
import { UserButton, useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";
import EmojiPicker from "emoji-picker-react";
import themes from "./theme.js";
import useChatSocket from "../hooks/useChatSocket.js";

// zego import
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { ZIM } from "zego-zim-web";
import { useDarkStore, useThemseStore } from "../store/themeStore.js";
import {
  getLastSeenText,
  handleDownload,
  scrollToBottom,
} from "../utils/chatUtils.js";
import { getThemePreview } from "./themePreview.jsx";

const Chat = () => {
  ////////////////////////////////
  //                            //
  // Zustand Global state vars  //
  //                            //
  ////////////////////////////////

  const darkState = useDarkStore((state) => state.isDarkMode);
  const current_theme = useThemseStore((state) => state.theme);
  const change_theme = useThemseStore((state) => state.changeTheme);

  ////////////////////////////////
  //                            //
  //        Chat States         //
  //                            //
  ////////////////////////////////

  const [isDark, setIsDark] = useState(darkState);
  const [currentTheme, setCurrentTheme] = useState(current_theme);
  const [message, setMessage] = useState("");
  const [chat, setChats] = useState([]);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [showAddChat, setShowAddChat] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [newChatEmail, setNewChatEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [activeContact, setActiveContact] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [groupTitle, setGroupTitle] = useState("");
  const [selectedChatsForGroup, setSelectedChatsForGroup] = useState([]);
  const [socket, setSocket] = useState(null);
  const [currentUserMongoId, setCurrentUserMongoId] = useState(null);
  const [showGroupMembers, setShowGroupMembers] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [showCall, setShowCall] = useState(false);
  const [callType, setCallType] = useState("video");
  const [callRoomID, setCallRoomID] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const senderEmail = user?.primaryEmailAddress?.emailAddress;
  const currentColors = themes[currentTheme][darkState ? "dark" : "light"];
  const changeDarkMode = useDarkStore((state) => state.toggleDarkMode);

  useEffect(() => {
    const newSocket = io(`${import.meta.env.VITE_BACKEND_URL}`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  ////////////////////////////////
  //                            //
  //    Fetch Chats of User     //
  //                            //
  ////////////////////////////////

  const fetchChats = useCallback(async () => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/chat/getchat/${encodeURIComponent(senderEmail)}`
      );
      const transformedChats = res.data.conversations.map((conv) => {
        const otherMember = conv.members.find((m) => m.Email !== senderEmail);
        const currentMember = conv.members.find((m) => m.Email === senderEmail);

        if (currentMember && currentMember._id && !currentUserMongoId) {
          setCurrentUserMongoId(currentMember._id);
        }

        return {
          ...conv,
          sender: currentMember,
          receiver: otherMember,
          isGroup: conv.members.length > 2,
        };
      });
      setChats(transformedChats);
    } catch (error) {
      console.error(error);
    }
  }, [senderEmail, currentUserMongoId]);

  useChatSocket({
    socket,
    currentUserMongoId,
    setOnlineUsers,
    setMessages,
    activeContact,
    fetchChats,
  });

  useEffect(() => {
    if (socket && currentUserMongoId) {
      socket.emit("addUser", currentUserMongoId);

      socket.on("getUsers", (users) => {
        console.log("Online users received:", users);
        setOnlineUsers(users);
      });
    }

    return () => {
      if (socket) socket.off("getUsers");
    };
  }, [socket, currentUserMongoId]);

  // Log online users for debugging
  useEffect(() => {
    console.log("Current online users state:", onlineUsers);
  }, [onlineUsers]);

  //   console.log(messages);

  useEffect(() => {
    if (socket && currentUserMongoId) {
      socket.on("getMessage", (data) => {
        if (activeContact && data.conversationId === activeContact._id) {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now(),
              text: data.text,
              sender: "other",
              senderId: data.senderId,
              senderName: data.senderName,
              senderEmail: data.senderEmail,
              senderProfileImg: data.senderProfileImg,
              time: new Date(data.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              emoji: data.emoji,
              attachments: data.attachments,
            },
          ]);
        }
        fetchChats();
      });
    }
    return () => {
      if (socket) socket.off("getMessage");
    };
  }, [socket, activeContact, currentUserMongoId]);

  // ADD THIS NEW useEffect - Listen for real-time online/offline status
  useEffect(() => {
    if (socket) {
      // When someone comes online
      socket.on("userOnline", (userId) => {
        console.log("🟢 User came online:", userId);
        setOnlineUsers((prev) => {
          // Only add if not already in the list
          if (!prev.includes(userId)) {
            return [...prev, userId];
          }
          return prev;
        });
      });

      // When someone goes offline
      socket.on("userOffline", (userId) => {
        console.log("🔴 User went offline:", userId);
        setOnlineUsers((prev) => prev.filter((id) => id !== userId));
      });

      return () => {
        socket.off("userOnline");
        socket.off("userOffline");
      };
    }
  }, [socket]);

  const fetchMessages = async (conversationId) => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/message/getmessage/${conversationId}`
      );

      console.log("Fetched messages:", res.data.messages); // Debug log

      const formattedMessages = res.data.messages.map((msg) => {
        // Check different possible structures
        const msgSenderId = msg.sender?._id || msg.sender || msg.senderId;

        // Get sender details from activeContact members
        let senderDetails = null;
        if (activeContact && activeContact.members) {
          senderDetails = activeContact.members.find(
            (m) =>
              m._id === msgSenderId ||
              m._id === msg.sender?._id ||
              m._id === msg.sender
          );
        }

        const msgSenderEmail =
          msg.sender?.Email || senderDetails?.Email || msg.senderEmail;
        const msgSenderName =
          msg.sender?.userName || senderDetails?.userName || msg.senderName;
        const msgSenderImg =
          msg.sender?.profileImg ||
          senderDetails?.profileImg ||
          msg.senderProfileImg;

        console.log("Message sender comparison:", {
          msgSenderEmail,
          currentUserEmail: senderEmail,
          isOwn: msgSenderEmail === senderEmail,
        });

        return {
          id: msg._id,
          text: msg.text,
          sender: msgSenderEmail === senderEmail ? "own" : "other",
          senderId: msgSenderId,
          senderEmail: msgSenderEmail,
          senderName: msgSenderName,
          senderProfileImg: msgSenderImg,
          time: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          emoji: msg.emoji,
          attachments: msg.attachments,
        };
      });
      setMessages(formattedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    if (senderEmail) fetchChats();
  }, [senderEmail]);

  useEffect(() => {
    if (activeContact) {
      if (!currentUserMongoId && activeContact.members) {
        const currentMember = activeContact.members.find(
          (m) => m.Email === senderEmail
        );
        if (currentMember?._id) {
          setCurrentUserMongoId(currentMember._id);
        }
      }
      fetchMessages(activeContact._id);
    }
  }, [activeContact]);

  const addchat = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/chat/add`,
        {
          SenderEmail: senderEmail,
          ReceiverEmail: newChatEmail,
        }
      );
      if (res.status === 201) {
        toast.success("User added to chat");
        fetchChats();
      }
    } catch (error) {
      toast.error("User not found");
    }
  };

  const createGroup = async () => {
    if (!groupTitle.trim() || selectedChatsForGroup.length < 2) {
      toast.error("Group name and at least 2 members required");
      return;
    }

    try {
      const memberEmails = selectedChatsForGroup.map((chatId) => {
        const chats = chat.find((c) => c._id === chatId);
        return chats.sender?.Email === senderEmail
          ? chats.receiver?.Email
          : chats.sender?.Email;
      });
      memberEmails.push(senderEmail);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/chat/creategroup`,
        {
          title: groupTitle,
          memberEmails,
        }
      );

      if (res.status === 201) {
        toast.success("Group created successfully");
        fetchChats();
        setShowCreateGroup(false);
        setGroupTitle("");
        setSelectedChatsForGroup([]);
      }
    } catch (error) {
      toast.error("Failed to create group");
    }
  };

  const handleFileSelect = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const handleSendMessage = async () => {
    if (!message.trim() && selectedFiles.length === 0) return;

    let userMongoId = currentUserMongoId;
    if (!userMongoId && activeContact) {
      const currentMember = activeContact.members?.find(
        (m) => m.Email === senderEmail
      );
      if (currentMember?._id) {
        userMongoId = currentMember._id;
        setCurrentUserMongoId(currentMember._id);
      }
    }

    if (!userMongoId) {
      toast.error("User data not loaded. Please refresh the page.");
      return;
    }
    if (!socket) {
      toast.error("Connection lost. Please refresh the page.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("conversationId", activeContact._id);
      formData.append("senderId", userMongoId);
      formData.append("text", message);
      selectedFiles.forEach((file) => formData.append("attachments", file));

      const uploadId = Date.now();
      if (selectedFiles.length > 0) {
        setUploadProgress((prev) => ({ ...prev, [uploadId]: 0 }));
      }

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/message/sendmessage`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            if (selectedFiles.length > 0) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress((prev) => ({
                ...prev,
                [uploadId]: percentCompleted,
              }));
            }
          },
        }
      );

      if (selectedFiles.length > 0) {
        setTimeout(() => {
          setUploadProgress((prev) => {
            const newProgress = { ...prev };
            delete newProgress[uploadId];
            return newProgress;
          });
        }, 500);
      }

      const newMessage = {
        id: res.data.message._id,
        text: message,
        sender: "own",
        senderId: userMongoId,
        senderEmail: senderEmail,
        senderName: user?.fullName || user?.firstName || "You",
        senderProfileImg: user?.imageUrl || "https://i.pravatar.cc/150?img=2",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        emoji: res.data.message.emoji,
        attachments: res.data.message.attachments,
      };
      setMessages((prev) => [...prev, newMessage]);

      if (activeContact.isGroup) {
        activeContact.members.forEach((member) => {
          if (member._id !== userMongoId) {
            socket.emit("sendMessage", {
              conversationId: activeContact._id,
              senderId: userMongoId,
              receiverId: member._id,
              text: res.data.message.text,
              emoji: res.data.message.emoji,
              attachments: res.data.message.attachments,
              senderName: user?.fullName || user?.firstName || "You",
              senderEmail: senderEmail,
              senderProfileImg:
                user?.imageUrl || "https://i.pravatar.cc/150?img=2",
            });
          }
        });
      } else {
        const receiverId =
          activeContact.sender?.Email === senderEmail
            ? activeContact.receiver?._id
            : activeContact.sender?._id;

        socket.emit("sendMessage", {
          conversationId: activeContact._id,
          senderId: userMongoId,
          receiverId,
          text: res.data.message.text,
          emoji: res.data.message.emoji,
          attachments: res.data.message.attachments,
          senderName: user?.fullName || user?.firstName || "You",
          senderEmail: senderEmail,
          senderProfileImg: user?.imageUrl || "https://i.pravatar.cc/150?img=2",
        });
      }

      setMessage("");
      setSelectedFiles([]);
      fetchChats();
    } catch (error) {
      toast.error("Failed to send message");
      setUploadProgress({});
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setMessage((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    scrollToBottom(messagesEndRef);
  }, [messages]);

  useEffect(() => {
    if (chat.length > 0 && !activeContact) {
      setActiveContact(chat[0]);
    }
  }, [chat]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAddChat = async () => {
    if (newChatEmail.trim()) {
      await addchat();
      setNewChatEmail("");
      setShowAddChat(false);
    }
  };

  const toggleChatSelection = (chatId) => {
    setSelectedChatsForGroup((prev) =>
      prev.includes(chatId)
        ? prev.filter((id) => id !== chatId)
        : [...prev, chatId]
    );
  };

  const isUserOnline = (userId) => {
    if (!userId || !onlineUsers || onlineUsers.length === 0) {
      return false;
    }

    // Simple check - onlineUsers is just an array of user IDs
    const isOnline = onlineUsers.includes(userId);

    return isOnline;
  };

  const filteredChats = chat.filter((contact) => {
    if (contact.isGroup) {
      return contact.title?.toLowerCase().includes(searchQuery.toLowerCase());
    }
    const otherUser =
      contact.sender?.Email === senderEmail ? contact.receiver : contact.sender;
    if (!otherUser) return false;
    const searchLower = searchQuery.toLowerCase();
    return (
      otherUser.userName?.toLowerCase().includes(searchLower) ||
      otherUser.Email?.toLowerCase().includes(searchLower)
    );
  });

  // zegocloude setup
  const zpRef = useRef(null);
  const [zegoInstance, setZegoInstance] = useState(null);

  useEffect(() => {
    if (!currentUserMongoId || !activeContact?._id) {
      console.log("⏳ Waiting for user data...");
      return;
    }

    const userID = currentUserMongoId;
    const userName = user?.fullName || user?.firstName || "User";
    const appID = 829327717;
    const serverSecret = "d8b81be74a29a63b7086b6c2ec228115";
    const roomID = [currentUserMongoId, activeContact._id].sort().join("_");

    console.log("🔧 Initializing Zego with:", { roomID, userID, userName });

    try {
      const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        userID,
        userName
      );

      const zp = ZegoUIKitPrebuilt.create(TOKEN);

      if (!zp) {
        console.error("❌ Failed to create Zego instance");
        return;
      }

      zp.addPlugins({ ZIM });
      zpRef.current = zp;
      setZegoInstance(zp);

      console.log("✅ Zego initialized for user:", userName);

      zp.setCallInvitationConfig({
        onIncomingCallReceived: (callID, caller, callType, callees) => {
          console.log("📞 Incoming call from:", caller);
          toast.info(`Incoming call from ${caller.userName}`);
          return true;
        },
        onIncomingCallCanceled: (callID, caller) => {
          toast.info("Call was canceled");
        },
        onIncomingCallTimeout: (callID, caller) => {
          toast.info("Missed call");
        },
        onOutgoingCallAccepted: (callID, callee) => {
          console.log("✅ Call accepted by:", callee);
        },
        onOutgoingCallRejected: (callID, callee) => {
          toast.error(`${callee.userName} rejected the call`);
        },
        onOutgoingCallTimeout: (callID, callees) => {
          toast.error("Call timeout - no answer");
        },
        canInvitingInCalling: true,
        onlyInitiatorCanInvite: true,
        ringtoneConfig: {
          incomingCallUrl:
            "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3",
          outgoingCallUrl:
            "https://assets.mixkit.co/active_storage/sfx/2870/2870-preview.mp3",
        },

        enableCustomCallInvitationDialog: false,
        enableNotifyWhenAppRunningInBackgroundOrQuit: true,
      });
    } catch (error) {
      console.error("❌ Error initializing Zego:", error);
      toast.error("Failed to initialize calling service");
    }

    return () => {
      console.log("🧹 Cleaning up Zego instance");
      if (zpRef.current) {
        zpRef.current.destroy();
        zpRef.current = null;
      }
    };
  }, [currentUserMongoId, activeContact?._id]);

  const sendInvite = async (type = "video") => {
    if (!zegoInstance) {
      console.error("❌ Zego not initialized yet");
      toast.error("Calling service not ready. Please wait a moment.");
      return;
    }

    if (!activeContact) {
      console.error("❌ No active contact");
      toast.error("No contact selected");
      return;
    }

    const receiver =
      activeContact.sender?.Email === senderEmail
        ? activeContact.receiver
        : activeContact.sender;

    if (!receiver?._id || !receiver?.userName) {
      console.error("❌ Contact information missing:", receiver);
      toast.error("Contact information not available");
      return;
    }

    const targetUser = {
      userID: receiver._id,
      userName: receiver.userName,
    };

    console.log("📞 Sending invite to:", targetUser);

    try {
      const callType =
        type === "video"
          ? ZegoUIKitPrebuilt.InvitationTypeVideoCall
          : ZegoUIKitPrebuilt.InvitationTypeVoiceCall;

      const roomID =
        "call_" + currentUserMongoId + "_" + receiver._id + "_" + Date.now();

      const res = await zegoInstance.sendCallInvitation({
        callees: [targetUser],
        callType,
        timeout: 60,
        roomID: roomID,
      });

      console.log(`📞 ${type.toUpperCase()} call invitation sent:`, res);
      toast.info(`Calling ${targetUser.userName}...`);
    } catch (err) {
      console.error("🚨 Error sending call invite:", err);
      toast.error(
        "Failed to send call invitation: " + (err.message || "Unknown error")
      );
    }
  };

  return (
    <>
      <div
        className={`h-screen flex ${currentColors.background} ${currentColors.text} transition-colors duration-300`}
      >
        <div
          className={`w-full sm:w-80 ${
            showThemeSelector ? "hidden sm:flex" : "flex"
          } ${currentColors.surface} ${
            currentColors.border
          } sm:border-r flex-col`}
        >
          <div
            className={`p-4 ${currentColors.secondary} ${currentColors.border} border-b flex items-center justify-between`}
          >
            <div className="flex items-center gap-2">
              <img
                src={`https://i.postimg.cc/ht2XW2hV/talkify-larged.png`}
                className="text-2xl rounded-full h-10"
              ></img>
              <h1 className="text-xl font-semibold">Talkify</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCreateGroup(true)}
                className={`p-2  cursor-pointer rounded-full ${currentColors.primary} text-white ${currentColors.primaryHover} transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105`}
                title="Create Group"
              >
                <UsersIcon size={18} />
              </button>
              <button
                onClick={() => setShowAddChat(true)}
                className={`p-2  cursor-pointer rounded-full ${currentColors.primary} text-white ${currentColors.primaryHover} transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105`}
                title="Add New Chat"
              >
                <Plus size={18} />
              </button>
              <button
                onClick={() => setShowThemeSelector(!showThemeSelector)}
                className={`p-2 cursor-pointer  rounded-full ${currentColors.primary} text-white ${currentColors.primaryHover} transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105`}
                title="Change Theme"
              >
                <Palette size={18} />
              </button>
              <button
                onClick={async () => {
                  await changeDarkMode();
                  setIsDark(!isDark);
                  toast(
                    `${
                      darkState
                        ? "Switched to Light Mode!"
                        : "Switched to Dark Mode!"
                    }`,
                    {
                      position: "top-right",
                    }
                  );
                }}
                className={`p-2 cursor-pointer  rounded-full ${currentColors.primaryHover} transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105`}
                title={isDark ? "Light Mode" : "Dark Mode"}
              >
                {isDark ? (
                  <>
                    <Sun size={18} />
                  </>
                ) : (
                  <>
                    <Moon size={18} />
                  </>
                )}
              </button>
            </div>
          </div>

          {showCreateGroup && (
            <div
              className={`p-4 ${currentColors.secondary} ${currentColors.border} border-b animate-slideDown max-h-96 overflow-y-auto`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <UsersIcon size={20} />
                  Create Group Chat
                </h3>
                <button
                  onClick={() => {
                    setShowCreateGroup(false);
                    setSelectedChatsForGroup([]);
                    setGroupTitle("");
                  }}
                  className={`p-1 rounded-full ${currentColors.primaryHover} transition-colors text-lg`}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  value={groupTitle}
                  onChange={(e) => setGroupTitle(e.target.value)}
                  placeholder="Group name..."
                  className={`w-full px-4 py-3 ${currentColors.background} ${
                    currentColors.text
                  } rounded-xl border ${
                    currentColors.border
                  } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${currentColors.primary.replace(
                    "bg-",
                    "focus:ring-"
                  )} transition-all duration-200`}
                />
                <div className="text-sm font-medium mb-2">
                  Select members ({selectedChatsForGroup.length} selected):
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {chat
                    .filter((c) => !c.isGroup)
                    .map((contact) => {
                      const otherUser =
                        contact.sender?.Email === senderEmail
                          ? contact.receiver
                          : contact.sender;
                      if (!otherUser) return null;
                      const isSelected = selectedChatsForGroup.includes(
                        contact._id
                      );

                      return (
                        <div
                          key={contact._id}
                          onClick={() => toggleChatSelection(contact._id)}
                          className={`p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                            isSelected
                              ? `${currentColors.primary} text-white`
                              : `${currentColors.background} ${currentColors.primaryHover}`
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={otherUser.profileImg}
                              alt={otherUser.userName}
                              className="w-10 h-10 rounded-full"
                            />
                            <div className="flex-1">
                              <div className="font-medium">
                                {otherUser.userName}
                              </div>
                              <div
                                className={`text-xs ${
                                  isSelected
                                    ? "text-white text-opacity-80"
                                    : currentColors.textSecondary
                                }`}
                              >
                                {otherUser.Email}
                              </div>
                            </div>
                            {isSelected && <Check size={20} />}
                          </div>
                        </div>
                      );
                    })}
                </div>
                <button
                  onClick={createGroup}
                  disabled={
                    !groupTitle.trim() || selectedChatsForGroup.length < 2
                  }
                  className={`w-full py-3 px-4 ${currentColors.primary} text-white rounded-xl ${currentColors.primaryHover} transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                >
                  Create Group
                </button>
              </div>
            </div>
          )}

          {showAddChat && (
            <div
              className={`p-4 ${currentColors.secondary} ${currentColors.border} border-b animate-slideDown`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Plus size={20} />
                  Start New Chat
                </h3>
                <button
                  onClick={() => setShowAddChat(false)}
                  className={`p-1 rounded-full ${currentColors.primaryHover} transition-colors text-lg`}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-3">
                <input
                  type="email"
                  value={newChatEmail}
                  onChange={(e) => setNewChatEmail(e.target.value)}
                  placeholder="Enter email address..."
                  className={`w-full px-4 py-3 ${currentColors.background} ${
                    currentColors.text
                  } rounded-xl border ${
                    currentColors.border
                  } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${currentColors.primary.replace(
                    "bg-",
                    "focus:ring-"
                  )} transition-all duration-200`}
                />
                <button
                  onClick={handleAddChat}
                  disabled={!newChatEmail.trim()}
                  className={`w-full py-3 px-4 ${currentColors.primary} text-white rounded-xl ${currentColors.primaryHover} transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                >
                  Add Chat
                </button>
              </div>
            </div>
          )}

          {showThemeSelector && (
            <div
              className={`p-4 ${currentColors.secondary} ${currentColors.border} border-b max-h-96 overflow-y-auto`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Palette size={20} />
                  Choose Your Theme
                </h3>
                <button
                  onClick={() => setShowThemeSelector(false)}
                  className={`p-1 rounded-full ${currentColors.primaryHover} transition-colors text-lg`}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(themes).map(([key, theme]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setCurrentTheme(key);
                      change_theme(key);
                      setShowThemeSelector(false);
                    }}
                    className={`group relative p-4 rounded-xl text-left transition-all duration-300 hover:scale-105 transform ${
                      currentTheme === key
                        ? `${
                            currentColors.primary
                          } text-white shadow-lg ring-2 ring-offset-2 ring-opacity-50 ${currentColors.primary.replace(
                            "bg-",
                            "ring-"
                          )}`
                        : `${currentColors.background} ${currentColors.primaryHover} shadow-md hover:shadow-lg border ${currentColors.border}`
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{theme.emoji}</span>
                        <div className="font-semibold text-sm">
                          {theme.name}
                        </div>
                      </div>
                      {getThemePreview(key)}
                    </div>
                    {currentTheme === key && (
                      <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-4">
            <div
              className={`relative ${currentColors.background} rounded-xl shadow-sm border ${currentColors.border}`}
            >
              <Search
                className={`absolute left-3 top-3 ${currentColors.textSecondary}`}
                size={18}
              />
              <input
                type="text"
                placeholder="Search chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 ${
                  currentColors.background
                } ${
                  currentColors.text
                } rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50 ${currentColors.primary.replace(
                  "bg-",
                  "focus:ring-"
                )} transition-all duration-200`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className={`absolute right-3 top-3 ${currentColors.textSecondary} hover:text-red-500 transition-colors`}
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredChats.length === 0 && searchQuery && (
              <div className="p-4 text-center">
                <p className={`${currentColors.textSecondary}`}>
                  No chats found for "{searchQuery}"
                </p>
              </div>
            )}
            {filteredChats.map((contact) => {
              const isGroup = contact.isGroup;
              const otherUser = isGroup
                ? null
                : contact.sender?.Email === senderEmail
                ? contact.receiver
                : contact.sender;

              return (
                <div
                  key={contact._id}
                  onClick={() => setActiveContact(contact)}
                  className={`p-4 cursor-pointer transition-all duration-200 hover:transform hover:scale-[1.02] ${
                    activeContact?._id === contact._id
                      ? currentColors.secondary +
                        " shadow-md border-l-4 " +
                        currentColors.primary.replace("bg-", "border-")
                      : currentColors.primaryHover
                  } ${currentColors.border} border-b last:border-b-0`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {isGroup ? (
                        <div
                          className={`w-12 h-12 rounded-full ${currentColors.primary} flex items-center justify-center text-white font-bold shadow-md`}
                        >
                          <UsersIcon size={24} />
                        </div>
                      ) : (
                        <>
                          <img
                            src={otherUser?.profileImg}
                            alt={otherUser?.userName}
                            className="w-12 h-12 rounded-full shadow-md object-cover"
                          />
                          {isUserOnline(otherUser?._id) && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium truncate">
                          {isGroup ? contact.title : otherUser?.userName}
                        </h3>
                        <span
                          className={`text-xs ${currentColors.textSecondary}`}
                        >
                          {new Date(contact.updatedAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p
                          className={`text-sm ${currentColors.textSecondary} truncate`}
                        >
                          {isGroup ? (
                            `${contact.members.length} members`
                          ) : isUserOnline(otherUser?._id) ? (
                            <span className="text-green-500 font-medium">
                              Online
                            </span>
                          ) : (
                            getLastSeenText(otherUser?.lastSeen)
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className={`flex-1 flex flex-col ${
            showThemeSelector ? "hidden sm:flex" : "flex"
          }`}
        >
          <div
            className={`p-4 ${currentColors.surface} ${currentColors.border} border-b flex items-center justify-between shadow-lg backdrop-blur-sm`}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowThemeSelector(true)}
                className={`sm:hidden p-2 rounded-full ${currentColors.primaryHover} transition-all duration-200 hover:scale-105`}
              >
                ←
              </button>
              {activeContact && (
                <>
                  <div className="relative">
                    {activeContact.isGroup ? (
                      <div
                        className={`w-10 h-10 rounded-full ${currentColors.primary} flex items-center justify-center text-white font-bold shadow-md cursor-pointer`}
                        onClick={() => setShowGroupMembers(!showGroupMembers)}
                      >
                        <UsersIcon size={20} />
                      </div>
                    ) : (
                      <>
                        <img
                          src={
                            activeContact.sender?.Email === senderEmail
                              ? activeContact.receiver?.profileImg
                              : activeContact.sender?.profileImg
                          }
                          alt={
                            activeContact.sender?.Email === senderEmail
                              ? activeContact.receiver?.userName
                              : activeContact.sender?.userName
                          }
                          className="w-10 h-10 rounded-full shadow-md object-cover"
                        />
                        {isUserOnline(
                          activeContact.sender?.Email === senderEmail
                            ? activeContact.receiver?._id
                            : activeContact.sender?._id
                        ) && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </>
                    )}
                  </div>
                  <div
                    className={activeContact.isGroup ? "cursor-pointer" : ""}
                    onClick={() =>
                      activeContact.isGroup &&
                      setShowGroupMembers(!showGroupMembers)
                    }
                  >
                    <h2 className="font-semibold">
                      {activeContact.isGroup
                        ? activeContact.title
                        : activeContact.sender?.Email === senderEmail
                        ? activeContact.receiver?.userName
                        : activeContact.sender?.userName}
                    </h2>
                    <p className={`text-xs ${currentColors.textSecondary}`}>
                      {activeContact.isGroup
                        ? `${activeContact.members.length} members`
                        : (() => {
                            const otherUser =
                              activeContact.sender?.Email === senderEmail
                                ? activeContact.receiver
                                : activeContact.sender;
                            const userIsOnline = isUserOnline(otherUser?._id);

                            return userIsOnline ? (
                              <span className="text-green-500 font-medium">
                                Online
                              </span>
                            ) : (
                              <span>
                                Last seen {getLastSeenText(otherUser?.lastSeen)}
                              </span>
                            );
                          })()}
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              {!activeContact?.isGroup ? (
                <>
                  <button
                    onClick={() => sendInvite("audio")}
                    className={`p-2 rounded-full ${currentColors.primaryHover} transition-all duration-200 hover:scale-105 shadow-sm`}
                    title="Audio Call"
                  >
                    <Phone size={20} />
                  </button>
                  <button
                    onClick={() => sendInvite("video")}
                    className={`p-2 rounded-full ${currentColors.primaryHover} transition-all duration-200 hover:scale-105 shadow-sm`}
                    title="Video Call"
                  >
                    <Video size={20} />
                  </button>
                </>
              ) : null}
              {isSignedIn && (
                <div className="hidden md:flex items-center">
                  <UserButton />
                </div>
              )}
            </div>
          </div>

          <div
            className={`flex-1 overflow-y-auto p-4 ${currentColors.background} relative`}
          >
            {showGroupMembers && activeContact?.isGroup && (
              <div
                className={`${currentColors.surface} rounded-lg shadow-xl p-4 mb-4 border ${currentColors.border}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">
                    Group Members ({activeContact.members.length})
                  </h3>
                  <button
                    onClick={() => setShowGroupMembers(false)}
                    className={`p-1 rounded-full ${currentColors.primaryHover}`}
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {activeContact.members.map((member, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 p-2 rounded-lg ${currentColors.secondary} hover:opacity-80 transition-all`}
                    >
                      <img
                        src={member.profileImg}
                        alt={member.userName}
                        className="w-10 h-10 rounded-full shadow-md object-cover"
                      />
                      <div>
                        <p className="font-medium">{member.userName}</p>
                        <p className={`text-xs ${currentColors.textSecondary}`}>
                          {member.Email}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2 relative">
              {messages.map((msg) => {
                const isOwnMessage = msg.senderEmail === senderEmail;
                const hasOnlyEmoji = msg.emoji && !msg.text;

                return (
                  <div
                    key={msg.id}
                    className={`flex ${
                      isOwnMessage ? "justify-end" : "justify-start"
                    } animate-fadeIn`}
                  >
                    <div
                      className={`${
                        hasOnlyEmoji
                          ? "bg-transparent shadow-none"
                          : `rounded-lg shadow-sm ${
                              isOwnMessage
                                ? currentColors.messageOwn
                                : currentColors.messageOther
                            }`
                      } max-w-xs lg:max-w-md`}
                    >
                      {activeContact?.isGroup &&
                        !isOwnMessage &&
                        !hasOnlyEmoji && (
                          <div className="flex items-center gap-2 mb-1 px-2">
                            {(() => {
                              // Find sender info from activeContact members if not available in message
                              const senderInfo =
                                msg.senderName && msg.senderProfileImg
                                  ? {
                                      name: msg.senderName,
                                      img: msg.senderProfileImg,
                                    }
                                  : activeContact.members?.find(
                                      (m) =>
                                        m._id === msg.senderId ||
                                        m.Email === msg.senderEmail
                                    ) || {};

                              const displayName =
                                senderInfo.name ||
                                senderInfo.userName ||
                                msg.senderEmail?.split("@")[0] ||
                                "Unknown";
                              const displayImg =
                                senderInfo.img || senderInfo.profileImg;

                              return (
                                <>
                                  {displayImg ? (
                                    <img
                                      src={displayImg}
                                      alt={displayName}
                                      className="w-7 h-7 rounded-full shadow-md object-cover"
                                      onError={(e) => {
                                        e.target.style.display = "none";
                                      }}
                                    />
                                  ) : (
                                    <div
                                      className="w-7 h-7 rounded-full shadow-md flex items-center justify-center text-white text-xs font-bold"
                                      style={{
                                        backgroundColor: `hsl(${
                                          (((
                                            msg.senderId ||
                                            msg.senderEmail ||
                                            ""
                                          ).charCodeAt(0) || 0) *
                                            137.5) %
                                          360
                                        }, 70%, 50%)`,
                                      }}
                                    >
                                      {displayName.charAt(0).toUpperCase()}
                                    </div>
                                  )}
                                  <p className="text-xs font-semibold opacity-75">
                                    {displayName}
                                  </p>
                                </>
                              );
                            })()}
                          </div>
                        )}

                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className={hasOnlyEmoji ? "" : "overflow-hidden"}>
                          {msg.attachments.map((url, idx) => (
                            <div key={idx}>
                              {url.match(/\.(jpeg|jpg|gif|png|webp)$/i) ? (
                                <div className="relative">
                                  <img
                                    src={url}
                                    alt="attachment"
                                    className="rounded-lg w-full max-w-sm object-cover cursor-pointer"
                                    style={{
                                      maxHeight: "350px",
                                      minWidth: "200px",
                                    }}
                                  />
                                </div>
                              ) : (
                                <div className="p-2">
                                  <div
                                    className={`${
                                      isDark
                                        ? "bg-gray-700"
                                        : "bg-white bg-opacity-10"
                                    } rounded-lg p-3 flex items-center gap-3 min-w-64`}
                                  >
                                    <div className="bg-red-500 rounded-lg p-3 flex-shrink-0">
                                      <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="white"
                                      >
                                        <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
                                        <text
                                          x="7"
                                          y="17"
                                          fontSize="8"
                                          fill="white"
                                          fontWeight="bold"
                                        >
                                          PDF
                                        </text>
                                      </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p
                                        className={`text-sm font-medium truncate ${
                                          isDark
                                            ? "text-white"
                                            : "text-gray-900"
                                        }`}
                                      >
                                        {url.split("/").pop()?.split("?")[0] ||
                                          "Document.pdf"}
                                      </p>
                                      <p
                                        className={`text-xs mt-0.5 ${
                                          isDark
                                            ? "text-gray-400"
                                            : "text-gray-600"
                                        }`}
                                      >
                                        PDF Document
                                      </p>
                                    </div>
                                    <button
                                      onClick={() =>
                                        handleDownload(
                                          url,
                                          url.split("/").pop()?.split("?")[0] ||
                                            "document.pdf"
                                        )
                                      }
                                      className={`flex-shrink-0 ${
                                        isDark
                                          ? "bg-gray-600 hover:bg-gray-500"
                                          : "bg-white bg-opacity-20 hover:bg-opacity-30"
                                      } rounded-full p-2 transition-all`}
                                    >
                                      <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                      >
                                        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {hasOnlyEmoji ? (
                        <div
                          className={`flex flex-col ${
                            isOwnMessage ? "items-end" : "items-start"
                          }`}
                        >
                          <span className="text-7xl leading-none mb-1">
                            {msg.emoji}
                          </span>
                          <p
                            className={`text-xs ${currentColors.textSecondary} opacity-70`}
                          >
                            {msg.time}
                          </p>
                        </div>
                      ) : (
                        <>
                          {msg.text && (
                            <div className="px-3 py-2">
                              <div className="flex items-start gap-2">
                                <p className="text-sm leading-relaxed flex-1 break-words">
                                  {msg.text}
                                </p>
                                {msg.emoji && (
                                  <span className="text-5xl leading-none flex-shrink-0">
                                    {msg.emoji}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-end gap-1 px-3 pb-2 pt-1">
                            <p
                              className={`text-xs ${currentColors.textSecondary} opacity-60`}
                            >
                              {msg.time}
                            </p>
                            {isOwnMessage && (
                              <svg
                                width="16"
                                height="11"
                                viewBox="0 0 16 11"
                                className={`${currentColors.accent} opacity-60`}
                              >
                                <path
                                  d="M11.071.653a.5.5 0 0 0-.696.696L14.48 5.5l-4.105 4.151a.5.5 0 0 0 .696.696l4.5-4.5a.5.5 0 0 0 0-.696l-4.5-4.498zm-5 0a.5.5 0 0 0-.696.696L9.48 5.5 5.375 9.651a.5.5 0 0 0 .696.696l4.5-4.5a.5.5 0 0 0 0-.696l-4.5-4.498z"
                                  fill="currentColor"
                                />
                              </svg>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div
            className={`p-4 ${currentColors.surface} ${currentColors.border} border-t shadow-2xl backdrop-blur-lg`}
          >
            {selectedFiles.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {selectedFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 px-3 py-2 ${currentColors.secondary} rounded-lg`}
                  >
                    {file.type.startsWith("image/") ? (
                      <Image size={16} />
                    ) : (
                      <File size={16} />
                    )}
                    <span className="text-sm truncate max-w-[150px]">
                      {file.name}
                    </span>
                    <button
                      onClick={() =>
                        setSelectedFiles((prev) =>
                          prev.filter((_, i) => i !== idx)
                        )
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {Object.entries(uploadProgress).map(([id, progress]) => (
              <div key={id} className="mb-3">
                <div className={`${currentColors.secondary} rounded-lg p-3`}>
                  <div className="flex items-center gap-3 mb-2">
                    <File size={20} className={currentColors.textSecondary} />
                    <span className="text-sm flex-1">Uploading...</span>
                    <span className="text-sm font-medium">{progress}%</span>
                  </div>
                  <div
                    className={`w-full ${
                      isDark ? "bg-gray-700" : "bg-gray-200"
                    } rounded-full h-1.5`}
                  >
                    <div
                      className={`${currentColors.primary} h-1.5 rounded-full transition-all duration-300`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}

            {showEmojiPicker && (
              <div
                className="fixed bottom-24 right-4 z-[100]"
                style={{ maxHeight: "400px" }}
              >
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  theme={isDark ? "dark" : "light"}
                />
              </div>
            )}

            <div className="flex items-end gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                multiple
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className={`p-2 rounded-full ${currentColors.primaryHover} transition-all duration-200 hover:scale-110 shadow-lg`}
              >
                <Paperclip size={20} />
              </button>
              <div
                className={`flex-1 ${currentColors.background} rounded-2xl ${currentColors.border} border shadow-lg backdrop-blur-sm`}
              >
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  rows={1}
                  className={`w-full px-4 py-3 ${currentColors.background} ${
                    currentColors.text
                  } rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-opacity-50 ${currentColors.primary.replace(
                    "bg-",
                    "focus:ring-"
                  )} max-h-32 transition-all duration-200 placeholder-opacity-60`}
                  style={{ minHeight: "48px" }}
                />
              </div>
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className={`p-2 rounded-full ${currentColors.primaryHover} transition-all duration-200 hover:scale-110 shadow-lg`}
              >
                <Smile size={20} />
              </button>
              {message.trim() || selectedFiles.length > 0 ? (
                <button
                  onClick={handleSendMessage}
                  className={`p-3 ${currentColors.primary} text-white rounded-full ${currentColors.primaryHover} transition-all duration-200 hover:scale-110 shadow-xl hover:shadow-2xl transform animate-pulse`}
                >
                  <Send size={20} />
                </button>
              ) : (
                <button
                  className={`p-3 ${currentColors.primary} text-white rounded-full ${currentColors.primaryHover} transition-all duration-200 hover:scale-110 shadow-xl hover:shadow-2xl transform`}
                >
                  <Send size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
