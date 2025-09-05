import React, { useState, useEffect, useRef } from 'react';
import { Send, Phone, Video, User, MoreVertical, Paperclip, Smile, Mic, Search, Settings, Palette, Plus } from 'lucide-react';
import { UserButton, useAuth,useUser } from '@clerk/clerk-react';
import { Users } from 'lucide-react';
import axios from 'axios';

 const Chat = () => {
    const [isDark, setIsDark] = useState(false);
    const [currentTheme, setCurrentTheme] = useState('default');
    const [message, setMessage] = useState('');
    const [chat,setChats] = useState([])
    const [showThemeSelector, setShowThemeSelector] = useState(false);
    const [showAddChat, setShowAddChat] = useState(false);
    const [newChatEmail, setNewChatEmail] = useState('');
    const messagesEndRef = useRef(null);
    const { isSignedIn } = useAuth();
    const { user } = useUser();

    const senderEmail = user?.primaryEmailAddress?.emailAddress;
    // console.log(senderEmail)

useEffect(() => {
  const fetchChats = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/chat/getchat/${encodeURIComponent(senderEmail)}`);
      console.log(res.data);
      setChats(res.data.chats);
    } catch (error) {
      console.error(error);
    }
  };

  fetchChats();
}, [senderEmail]);

    const addchat = async () => {
        try {
            const res = await axios.post("http://localhost:3000/api/chat/add",{
                SenderEmail :senderEmail,
                ReceiverEmail: newChatEmail,
            })
            console.log(res?.data)
        } catch (error) {
            console.log(error)
        }
    }


// console.log("mychat" ,chat)

    const themes = {
        default: {
            name: 'WhatsApp Classic',
            emoji: '💬',
            light: {
                primary: 'bg-green-500',
                primaryHover: 'hover:bg-green-600',
                secondary: 'bg-gray-100',
                background: 'bg-white',
                surface: 'bg-gray-50',
                text: 'text-gray-900',
                textSecondary: 'text-gray-600',
                border: 'border-gray-200',
                messageOwn: 'bg-green-100',
                messageOther: 'bg-white',
                accent: 'text-green-600'
            },
            dark: {
                primary: 'bg-green-600',
                primaryHover: 'hover:bg-green-700',
                secondary: 'bg-gray-800',
                background: 'bg-gray-900',
                surface: 'bg-gray-800',
                text: 'text-white',
                textSecondary: 'text-gray-300',
                border: 'border-gray-700',
                messageOwn: 'bg-green-900',
                messageOther: 'bg-gray-800',
                accent: 'text-green-400'
            }
        },
        ocean: {
            name: 'Ocean Blue',
            emoji: '🌊',
            light: {
                primary: 'bg-blue-500',
                primaryHover: 'hover:bg-blue-600',
                secondary: 'bg-blue-50',
                background: 'bg-slate-50',
                surface: 'bg-blue-50',
                text: 'text-slate-900',
                textSecondary: 'text-slate-600',
                border: 'border-blue-200',
                messageOwn: 'bg-blue-100',
                messageOther: 'bg-white',
                accent: 'text-blue-600'
            },
            dark: {
                primary: 'bg-blue-600',
                primaryHover: 'hover:bg-blue-700',
                secondary: 'bg-slate-800',
                background: 'bg-slate-900',
                surface: 'bg-slate-800',
                text: 'text-white',
                textSecondary: 'text-slate-300',
                border: 'border-slate-700',
                messageOwn: 'bg-blue-900',
                messageOther: 'bg-slate-800',
                accent: 'text-blue-400'
            }
        },
        sunset: {
            name: 'Sunset Orange',
            emoji: '🌅',
            light: {
                primary: 'bg-orange-500',
                primaryHover: 'hover:bg-orange-600',
                secondary: 'bg-orange-50',
                background: 'bg-amber-50',
                surface: 'bg-orange-50',
                text: 'text-amber-900',
                textSecondary: 'text-amber-700',
                border: 'border-orange-200',
                messageOwn: 'bg-orange-100',
                messageOther: 'bg-white',
                accent: 'text-orange-600'
            },
            dark: {
                primary: 'bg-orange-600',
                primaryHover: 'hover:bg-orange-700',
                secondary: 'bg-amber-900',
                background: 'bg-amber-950',
                surface: 'bg-amber-900',
                text: 'text-amber-100',
                textSecondary: 'text-amber-300',
                border: 'border-amber-800',
                messageOwn: 'bg-orange-900',
                messageOther: 'bg-amber-900',
                accent: 'text-orange-400'
            }
        },
        purple: {
            name: 'Purple Dream',
            emoji: '💜',
            light: {
                primary: 'bg-purple-500',
                primaryHover: 'hover:bg-purple-600',
                secondary: 'bg-purple-50',
                background: 'bg-violet-50',
                surface: 'bg-purple-50',
                text: 'text-violet-900',
                textSecondary: 'text-violet-700',
                border: 'border-purple-200',
                messageOwn: 'bg-purple-100',
                messageOther: 'bg-white',
                accent: 'text-purple-600'
            },
            dark: {
                primary: 'bg-purple-600',
                primaryHover: 'hover:bg-purple-700',
                secondary: 'bg-violet-900',
                background: 'bg-violet-950',
                surface: 'bg-violet-900',
                text: 'text-violet-100',
                textSecondary: 'text-violet-300',
                border: 'border-violet-800',
                messageOwn: 'bg-purple-900',
                messageOther: 'bg-violet-900',
                accent: 'text-purple-400'
            }
        },
        crimson: {
            name: 'Crimson Red',
            emoji: '❤️',
            light: {
                primary: 'bg-red-500',
                primaryHover: 'hover:bg-red-600',
                secondary: 'bg-red-50',
                background: 'bg-rose-50',
                surface: 'bg-red-50',
                text: 'text-rose-900',
                textSecondary: 'text-rose-700',
                border: 'border-red-200',
                messageOwn: 'bg-red-100',
                messageOther: 'bg-white',
                accent: 'text-red-600'
            },
            dark: {
                primary: 'bg-red-600',
                primaryHover: 'hover:bg-red-700',
                secondary: 'bg-rose-900',
                background: 'bg-rose-950',
                surface: 'bg-rose-900',
                text: 'text-red-100',
                textSecondary: 'text-red-300',
                border: 'border-rose-800',
                messageOwn: 'bg-red-900',
                messageOther: 'bg-rose-900',
                accent: 'text-red-400'
            }
        },
        emerald: {
            name: 'Emerald Forest',
            emoji: '🌲',
            light: {
                primary: 'bg-emerald-500',
                primaryHover: 'hover:bg-emerald-600',
                secondary: 'bg-emerald-50',
                background: 'bg-green-50',
                surface: 'bg-emerald-50',
                text: 'text-green-900',
                textSecondary: 'text-green-700',
                border: 'border-emerald-200',
                messageOwn: 'bg-emerald-100',
                messageOther: 'bg-white',
                accent: 'text-emerald-600'
            },
            dark: {
                primary: 'bg-emerald-600',
                primaryHover: 'hover:bg-emerald-700',
                secondary: 'bg-green-900',
                background: 'bg-green-950',
                surface: 'bg-emerald-900',
                text: 'text-green-100',
                textSecondary: 'text-green-300',
                border: 'border-green-800',
                messageOwn: 'bg-emerald-900',
                messageOther: 'bg-green-900',
                accent: 'text-emerald-400'
            }
        },
        teal: {
            name: 'Teal Waves',
            emoji: '🌊',
            light: {
                primary: 'bg-teal-500',
                primaryHover: 'hover:bg-teal-600',
                secondary: 'bg-teal-50',
                background: 'bg-cyan-50',
                surface: 'bg-teal-50',
                text: 'text-cyan-900',
                textSecondary: 'text-cyan-700',
                border: 'border-teal-200',
                messageOwn: 'bg-teal-100',
                messageOther: 'bg-white',
                accent: 'text-teal-600'
            },
            dark: {
                primary: 'bg-teal-600',
                primaryHover: 'hover:bg-teal-700',
                secondary: 'bg-cyan-900',
                background: 'bg-cyan-950',
                surface: 'bg-cyan-900',
                text: 'text-cyan-100',
                textSecondary: 'text-cyan-300',
                border: 'border-cyan-800',
                messageOwn: 'bg-teal-900',
                messageOther: 'bg-cyan-900',
                accent: 'text-teal-400'
            }
        },
        indigo: {
            name: 'Indigo Night',
            emoji: '🌙',
            light: {
                primary: 'bg-indigo-500',
                primaryHover: 'hover:bg-indigo-600',
                secondary: 'bg-indigo-50',
                background: 'bg-blue-50',
                surface: 'bg-indigo-50',
                text: 'text-blue-900',
                textSecondary: 'text-blue-700',
                border: 'border-indigo-200',
                messageOwn: 'bg-indigo-100',
                messageOther: 'bg-white',
                accent: 'text-indigo-600'
            },
            dark: {
                primary: 'bg-indigo-600',
                primaryHover: 'hover:bg-indigo-700',
                secondary: 'bg-blue-900',
                background: 'bg-blue-950',
                surface: 'bg-blue-900',
                text: 'text-blue-100',
                textSecondary: 'text-blue-300',
                border: 'border-blue-800',
                messageOwn: 'bg-indigo-900',
                messageOther: 'bg-blue-900',
                accent: 'text-indigo-400'
            }
        },
        pink: {
            name: 'Bubblegum Pink',
            emoji: '🎀',
            light: {
                primary: 'bg-pink-500',
                primaryHover: 'hover:bg-pink-600',
                secondary: 'bg-pink-50',
                background: 'bg-rose-50',
                surface: 'bg-pink-50',
                text: 'text-rose-900',
                textSecondary: 'text-rose-700',
                border: 'border-pink-200',
                messageOwn: 'bg-pink-100',
                messageOther: 'bg-white',
                accent: 'text-pink-600'
            },
            dark: {
                primary: 'bg-pink-600',
                primaryHover: 'hover:bg-pink-700',
                secondary: 'bg-rose-900',
                background: 'bg-rose-950',
                surface: 'bg-rose-900',
                text: 'text-rose-100',
                textSecondary: 'text-rose-300',
                border: 'border-rose-800',
                messageOwn: 'bg-pink-900',
                messageOther: 'bg-rose-900',
                accent: 'text-pink-400'
            }
        },
        yellow: {
            name: 'Sunny Yellow',
            emoji: '☀️',
            light: {
                primary: 'bg-yellow-500',
                primaryHover: 'hover:bg-yellow-600',
                secondary: 'bg-yellow-50',
                background: 'bg-amber-50',
                surface: 'bg-yellow-50',
                text: 'text-amber-900',
                textSecondary: 'text-amber-700',
                border: 'border-yellow-200',
                messageOwn: 'bg-yellow-100',
                messageOther: 'bg-white',
                accent: 'text-yellow-600'
            },
            dark: {
                primary: 'bg-yellow-600',
                primaryHover: 'hover:bg-yellow-700',
                secondary: 'bg-amber-900',
                background: 'bg-amber-950',
                surface: 'bg-amber-900',
                text: 'text-amber-100',
                textSecondary: 'text-amber-300',
                border: 'border-amber-800',
                messageOwn: 'bg-yellow-900',
                messageOther: 'bg-amber-900',
                accent: 'text-yellow-400'
            }
        },
        lime: {
            name: 'Lime Green',
            emoji: '🍃',
            light: {
                primary: 'bg-lime-500',
                primaryHover: 'hover:bg-lime-600',
                secondary: 'bg-lime-50',
                background: 'bg-green-50',
                surface: 'bg-lime-50',
                text: 'text-green-900',
                textSecondary: 'text-green-700',
                border: 'border-lime-200',
                messageOwn: 'bg-lime-100',
                messageOther: 'bg-white',
                accent: 'text-lime-600'
            },
            dark: {
                primary: 'bg-lime-600',
                primaryHover: 'hover:bg-lime-700',
                secondary: 'bg-green-900',
                background: 'bg-green-950',
                surface: 'bg-green-900',
                text: 'text-green-100',
                textSecondary: 'text-green-300',
                border: 'border-green-800',
                messageOwn: 'bg-lime-900',
                messageOther: 'bg-green-900',
                accent: 'text-lime-400'
            }
        },
        cyan: {
            name: 'Electric Cyan',
            emoji: '⚡',
            light: {
                primary: 'bg-cyan-500',
                primaryHover: 'hover:bg-cyan-600',
                secondary: 'bg-cyan-50',
                background: 'bg-blue-50',
                surface: 'bg-cyan-50',
                text: 'text-blue-900',
                textSecondary: 'text-blue-700',
                border: 'border-cyan-200',
                messageOwn: 'bg-cyan-100',
                messageOther: 'bg-white',
                accent: 'text-cyan-600'
            },
            dark: {
                primary: 'bg-cyan-600',
                primaryHover: 'hover:bg-cyan-700',
                secondary: 'bg-blue-900',
                background: 'bg-blue-950',
                surface: 'bg-blue-900',
                text: 'text-blue-100',
                textSecondary: 'text-blue-300',
                border: 'border-blue-800',
                messageOwn: 'bg-cyan-900',
                messageOther: 'bg-blue-900',
                accent: 'text-cyan-400'
            }
        },
        rose: {
            name: 'Rose Gold',
            emoji: '🌹',
            light: {
                primary: 'bg-rose-500',
                primaryHover: 'hover:bg-rose-600',
                secondary: 'bg-rose-50',
                background: 'bg-pink-50',
                surface: 'bg-rose-50',
                text: 'text-pink-900',
                textSecondary: 'text-pink-700',
                border: 'border-rose-200',
                messageOwn: 'bg-rose-100',
                messageOther: 'bg-white',
                accent: 'text-rose-600'
            },
            dark: {
                primary: 'bg-rose-600',
                primaryHover: 'hover:bg-rose-700',
                secondary: 'bg-pink-900',
                background: 'bg-pink-950',
                surface: 'bg-pink-900',
                text: 'text-pink-100',
                textSecondary: 'text-pink-300',
                border: 'border-pink-800',
                messageOwn: 'bg-rose-900',
                messageOther: 'bg-pink-900',
                accent: 'text-rose-400'
            }
        },
        violet: {
            name: 'Deep Violet',
            emoji: '🔮',
            light: {
                primary: 'bg-violet-500',
                primaryHover: 'hover:bg-violet-600',
                secondary: 'bg-violet-50',
                background: 'bg-purple-50',
                surface: 'bg-violet-50',
                text: 'text-purple-900',
                textSecondary: 'text-purple-700',
                border: 'border-violet-200',
                messageOwn: 'bg-violet-100',
                messageOther: 'bg-white',
                accent: 'text-violet-600'
            },
            dark: {
                primary: 'bg-violet-600',
                primaryHover: 'hover:bg-violet-700',
                secondary: 'bg-purple-900',
                background: 'bg-violet-950',
                surface: 'bg-purple-900',
                text: 'text-violet-100',
                textSecondary: 'text-violet-300',
                border: 'border-violet-800',
                messageOwn: 'bg-violet-900',
                messageOther: 'bg-purple-900',
                accent: 'text-violet-400'
            }
        },
        fuchsia: {
            name: 'Fuchsia Glow',
            emoji: '✨',
            light: {
                primary: 'bg-fuchsia-500',
                primaryHover: 'hover:bg-fuchsia-600',
                secondary: 'bg-fuchsia-50',
                background: 'bg-pink-50',
                surface: 'bg-fuchsia-50',
                text: 'text-pink-900',
                textSecondary: 'text-pink-700',
                border: 'border-fuchsia-200',
                messageOwn: 'bg-fuchsia-100',
                messageOther: 'bg-white',
                accent: 'text-fuchsia-600'
            },
            dark: {
                primary: 'bg-fuchsia-600',
                primaryHover: 'hover:bg-fuchsia-700',
                secondary: 'bg-pink-900',
                background: 'bg-pink-950',
                surface: 'bg-pink-900',
                text: 'text-pink-100',
                textSecondary: 'text-pink-300',
                border: 'border-pink-800',
                messageOwn: 'bg-fuchsia-900',
                messageOther: 'bg-pink-900',
                accent: 'text-fuchsia-400'
            }
        },
        sky: {
            name: 'Sky Blue',
            emoji: '☁️',
            light: {
                primary: 'bg-sky-500',
                primaryHover: 'hover:bg-sky-600',
                secondary: 'bg-sky-50',
                background: 'bg-blue-50',
                surface: 'bg-sky-50',
                text: 'text-blue-900',
                textSecondary: 'text-blue-700',
                border: 'border-sky-200',
                messageOwn: 'bg-sky-100',
                messageOther: 'bg-white',
                accent: 'text-sky-600'
            },
            dark: {
                primary: 'bg-sky-600',
                primaryHover: 'hover:bg-sky-700',
                secondary: 'bg-blue-900',
                background: 'bg-blue-950',
                surface: 'bg-blue-900',
                text: 'text-blue-100',
                textSecondary: 'text-blue-300',
                border: 'border-blue-800',
                messageOwn: 'bg-sky-900',
                messageOther: 'bg-blue-900',
                accent: 'text-sky-400'
            }
        },
        amber: {
            name: 'Golden Amber',
            emoji: '🍯',
            light: {
                primary: 'bg-amber-500',
                primaryHover: 'hover:bg-amber-600',
                secondary: 'bg-amber-50',
                background: 'bg-yellow-50',
                surface: 'bg-amber-50',
                text: 'text-yellow-900',
                textSecondary: 'text-yellow-700',
                border: 'border-amber-200',
                messageOwn: 'bg-amber-100',
                messageOther: 'bg-white',
                accent: 'text-amber-600'
            },
            dark: {
                primary: 'bg-amber-600',
                primaryHover: 'hover:bg-amber-700',
                secondary: 'bg-yellow-900',
                background: 'bg-yellow-950',
                surface: 'bg-yellow-900',
                text: 'text-yellow-100',
                textSecondary: 'text-yellow-300',
                border: 'border-yellow-800',
                messageOwn: 'bg-amber-900',
                messageOther: 'bg-yellow-900',
                accent: 'text-amber-400'
            }
        },
        stone: {
            name: 'Stone Gray',
            emoji: '🪨',
            light: {
                primary: 'bg-stone-500',
                primaryHover: 'hover:bg-stone-600',
                secondary: 'bg-stone-100',
                background: 'bg-stone-50',
                surface: 'bg-stone-100',
                text: 'text-stone-900',
                textSecondary: 'text-stone-600',
                border: 'border-stone-200',
                messageOwn: 'bg-stone-200',
                messageOther: 'bg-white',
                accent: 'text-stone-600'
            },
            dark: {
                primary: 'bg-stone-600',
                primaryHover: 'hover:bg-stone-700',
                secondary: 'bg-stone-800',
                background: 'bg-stone-900',
                surface: 'bg-stone-800',
                text: 'text-stone-100',
                textSecondary: 'text-stone-300',
                border: 'border-stone-700',
                messageOwn: 'bg-stone-700',
                messageOther: 'bg-stone-800',
                accent: 'text-stone-400'
            }
        },
        slate: {
            name: 'Slate Storm',
            emoji: '⛈️',
            light: {
                primary: 'bg-slate-500',
                primaryHover: 'hover:bg-slate-600',
                secondary: 'bg-slate-100',
                background: 'bg-slate-50',
                surface: 'bg-slate-100',
                text: 'text-slate-900',
                textSecondary: 'text-slate-600',
                border: 'border-slate-200',
                messageOwn: 'bg-slate-200',
                messageOther: 'bg-white',
                accent: 'text-slate-600'
            },
            dark: {
                primary: 'bg-slate-600',
                primaryHover: 'hover:bg-slate-700',
                secondary: 'bg-slate-800',
                background: 'bg-slate-900',
                surface: 'bg-slate-800',
                text: 'text-slate-100',
                textSecondary: 'text-slate-300',
                border: 'border-slate-700',
                messageOwn: 'bg-slate-700',
                messageOther: 'bg-slate-800',
                accent: 'text-slate-400'
            }
        },
        zinc: {
            name: 'Zinc Modern',
            emoji: '🔩',
            light: {
                primary: 'bg-zinc-500',
                primaryHover: 'hover:bg-zinc-600',
                secondary: 'bg-zinc-100',
                background: 'bg-zinc-50',
                surface: 'bg-zinc-100',
                text: 'text-zinc-900',
                textSecondary: 'text-zinc-600',
                border: 'border-zinc-200',
                messageOwn: 'bg-zinc-200',
                messageOther: 'bg-white',
                accent: 'text-zinc-600'
            },
            dark: {
                primary: 'bg-zinc-600',
                primaryHover: 'hover:bg-zinc-700',
                secondary: 'bg-zinc-800',
                background: 'bg-zinc-900',
                surface: 'bg-zinc-800',
                text: 'text-zinc-100',
                textSecondary: 'text-zinc-300',
                border: 'border-zinc-700',
                messageOwn: 'bg-zinc-700',
                messageOther: 'bg-zinc-800',
                accent: 'text-zinc-400'
            }
        },
        neutral: {
            name: 'Neutral Balance',
            emoji: '⚖️',
            light: {
                primary: 'bg-neutral-500',
                primaryHover: 'hover:bg-neutral-600',
                secondary: 'bg-neutral-100',
                background: 'bg-neutral-50',
                surface: 'bg-neutral-100',
                text: 'text-neutral-900',
                textSecondary: 'text-neutral-600',
                border: 'border-neutral-200',
                messageOwn: 'bg-neutral-200',
                messageOther: 'bg-white',
                accent: 'text-neutral-600'
            },
            dark: {
                primary: 'bg-neutral-600',
                primaryHover: 'hover:bg-neutral-700',
                secondary: 'bg-neutral-800',
                background: 'bg-neutral-900',
                surface: 'bg-neutral-800',
                text: 'text-neutral-100',
                textSecondary: 'text-neutral-300',
                border: 'border-neutral-700',
                messageOwn: 'bg-neutral-700',
                messageOther: 'bg-neutral-800',
                accent: 'text-neutral-400'
            }
        },
        neonGreen: {
            name: 'Neon Green',
            emoji: '🟢',
            light: {
                primary: 'bg-green-400',
                primaryHover: 'hover:bg-green-500',
                secondary: 'bg-green-50',
                background: 'bg-lime-50',
                surface: 'bg-green-50',
                text: 'text-green-900',
                textSecondary: 'text-green-700',
                border: 'border-green-200',
                messageOwn: 'bg-green-200',
                messageOther: 'bg-white',
                accent: 'text-green-500'
            },
            dark: {
                primary: 'bg-green-500',
                primaryHover: 'hover:bg-green-600',
                secondary: 'bg-green-900',
                background: 'bg-green-950',
                surface: 'bg-green-900',
                text: 'text-green-100',
                textSecondary: 'text-green-300',
                border: 'border-green-800',
                messageOwn: 'bg-green-800',
                messageOther: 'bg-green-900',
                accent: 'text-green-400'
            }
        },
        deepBlue: {
            name: 'Deep Blue',
            emoji: '🌀',
            light: {
                primary: 'bg-blue-600',
                primaryHover: 'hover:bg-blue-700',
                secondary: 'bg-blue-50',
                background: 'bg-indigo-50',
                surface: 'bg-blue-50',
                text: 'text-blue-900',
                textSecondary: 'text-blue-700',
                border: 'border-blue-200',
                messageOwn: 'bg-blue-200',
                messageOther: 'bg-white',
                accent: 'text-blue-600'
            },
            dark: {
                primary: 'bg-blue-700',
                primaryHover: 'hover:bg-blue-800',
                secondary: 'bg-blue-900',
                background: 'bg-blue-950',
                surface: 'bg-blue-900',
                text: 'text-blue-100',
                textSecondary: 'text-blue-300',
                border: 'border-blue-800',
                messageOwn: 'bg-blue-800',
                messageOther: 'bg-blue-900',
                accent: 'text-blue-400'
            }
        },
        warmRed: {
            name: 'Warm Red',
            emoji: '🔥',
            light: {
                primary: 'bg-red-500',
                primaryHover: 'hover:bg-red-600',
                secondary: 'bg-red-50',
                background: 'bg-orange-50',
                surface: 'bg-red-50',
                text: 'text-red-900',
                textSecondary: 'text-red-700',
                border: 'border-red-200',
                messageOwn: 'bg-red-200',
                messageOther: 'bg-white',
                accent: 'text-red-600'
            },
            dark: {
                primary: 'bg-red-600',
                primaryHover: 'hover:bg-red-700',
                secondary: 'bg-red-900',
                background: 'bg-red-950',
                surface: 'bg-red-900',
                text: 'text-red-100',
                textSecondary: 'text-red-300',
                border: 'border-red-800',
                messageOwn: 'bg-red-800',
                messageOther: 'bg-red-900',
                accent: 'text-red-400'
            }
        },
        mintGreen: {
            name: 'Mint Fresh',
            emoji: '🌿',
            light: {
                primary: 'bg-emerald-400',
                primaryHover: 'hover:bg-emerald-500',
                secondary: 'bg-emerald-50',
                background: 'bg-teal-50',
                surface: 'bg-emerald-50',
                text: 'text-emerald-900',
                textSecondary: 'text-emerald-700',
                border: 'border-emerald-200',
                messageOwn: 'bg-emerald-200',
                messageOther: 'bg-white',
                accent: 'text-emerald-600'
            },
            dark: {
                primary: 'bg-emerald-500',
                primaryHover: 'hover:bg-emerald-600',
                secondary: 'bg-emerald-900',
                background: 'bg-emerald-950',
                surface: 'bg-emerald-900',
                text: 'text-emerald-100',
                textSecondary: 'text-emerald-300',
                border: 'border-emerald-800',
                messageOwn: 'bg-emerald-800',
                messageOther: 'bg-emerald-900',
                accent: 'text-emerald-400'
            }
        },
        lavender: {
            name: 'Lavender Dream',
            emoji: '🪻',
            light: {
                primary: 'bg-purple-400',
                primaryHover: 'hover:bg-purple-500',
                secondary: 'bg-purple-50',
                background: 'bg-violet-50',
                surface: 'bg-purple-50',
                text: 'text-purple-900',
                textSecondary: 'text-purple-700',
                border: 'border-purple-200',
                messageOwn: 'bg-purple-200',
                messageOther: 'bg-white',
                accent: 'text-purple-600'
            },
            dark: {
                primary: 'bg-purple-500',
                primaryHover: 'hover:bg-purple-600',
                secondary: 'bg-purple-900',
                background: 'bg-purple-950',
                surface: 'bg-purple-900',
                text: 'text-purple-100',
                textSecondary: 'text-purple-300',
                border: 'border-purple-800',
                messageOwn: 'bg-purple-800',
                messageOther: 'bg-purple-900',
                accent: 'text-purple-400'
            }
        },
        coral: {
            name: 'Coral Reef',
            emoji: '🪸',
            light: {
                primary: 'bg-pink-400',
                primaryHover: 'hover:bg-pink-500',
                secondary: 'bg-pink-50',
                background: 'bg-rose-50',
                surface: 'bg-pink-50',
                text: 'text-pink-900',
                textSecondary: 'text-pink-700',
                border: 'border-pink-200',
                messageOwn: 'bg-pink-200',
                messageOther: 'bg-white',
                accent: 'text-pink-600'
            },
            dark: {
                primary: 'bg-pink-500',
                primaryHover: 'hover:bg-pink-600',
                secondary: 'bg-pink-900',
                background: 'bg-pink-950',
                surface: 'bg-pink-900',
                text: 'text-pink-100',
                textSecondary: 'text-pink-300',
                border: 'border-pink-800',
                messageOwn: 'bg-pink-800',
                messageOther: 'bg-pink-900',
                accent: 'text-pink-400'
            }
        },
        midnight: {
            name: 'Midnight Blue',
            emoji: '🌃',
            light: {
                primary: 'bg-slate-600',
                primaryHover: 'hover:bg-slate-700',
                secondary: 'bg-slate-100',
                background: 'bg-slate-50',
                surface: 'bg-slate-100',
                text: 'text-slate-900',
                textSecondary: 'text-slate-700',
                border: 'border-slate-300',
                messageOwn: 'bg-slate-300',
                messageOther: 'bg-white',
                accent: 'text-slate-600'
            },
            dark: {
                primary: 'bg-slate-700',
                primaryHover: 'hover:bg-slate-800',
                secondary: 'bg-slate-900',
                background: 'bg-slate-950',
                surface: 'bg-slate-900',
                text: 'text-slate-100',
                textSecondary: 'text-slate-300',
                border: 'border-slate-800',
                messageOwn: 'bg-slate-800',
                messageOther: 'bg-slate-900',
                accent: 'text-slate-400'
            }
        }
    };

    const currentColors = themes[currentTheme][isDark ? 'dark' : 'light'];

    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hey! How's your day going?",
            sender: 'other',
            time: '10:30 AM',
            avatar: '👨‍💻'
        },
        {
            id: 2,
            text: "Pretty good! Just working on some new projects. What about you?",
            sender: 'own',
            time: '10:32 AM'
        },
        {
            id: 3,
            text: "Same here! Working on a chat application with different themes. Check out this cool feature I'm building!",
            sender: 'other',
            time: '10:35 AM',
            avatar: '👨‍💻'
        },
        {
            id: 4,
            text: "That sounds awesome! I'd love to see it when it's ready 🎉",
            sender: 'own',
            time: '10:36 AM'
        }
    ]);

    const [activeContact, setActiveContact] = useState(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (chat.length > 0 && !activeContact) {
            setActiveContact(chat[0]);
        }
    }, [chat, activeContact]);

    const handleSendMessage = () => {
        if (message.trim()) {
            const newMessage = {
                id: messages.length + 1,
                text: message,
                sender: 'own',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages([...messages, newMessage]);
            setMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleAddChat = async () => {
        if (newChatEmail.trim()) {
            console.log('Adding new chat for:', newChatEmail);
            await addchat()
            setNewChatEmail('');
            setShowAddChat(false);
        }
    };

    const getThemePreview = (themeKey) => {
        const theme = themes[themeKey][isDark ? 'dark' : 'light'];
        return (
            <div className="flex gap-1 ">
                <div className={`w-3 h-3 rounded-full ${theme.primary}`}></div>
        <div className={`w-3 h-3 rounded-full ${theme.messageOwn}`}></div>
        <div className={`w-3 h-3 rounded-full ${theme.secondary}`}></div>
            </div>
        );
    };

    return (
        <div className={`h-screen flex ${currentColors.background} ${currentColors.text} transition-colors duration-300`}>
            {/* Sidebar */}
            <div className={`w-full sm:w-80 ${showThemeSelector ? 'hidden sm:flex' : 'flex'} ${currentColors.surface} ${currentColors.border} sm:border-r flex-col`}>
                {/* Header */}
                <div className={`p-4 ${currentColors.secondary} ${currentColors.border} border-b flex items-center justify-between`}>
                    <div className="flex items-center gap-2">
                        <div className="text-2xl">💬</div>
                        <h1 className="text-xl font-semibold">TalkyChats</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setShowAddChat(true);
                            }}
                            className={`p-2 rounded-full ${currentColors.primary} text-white ${currentColors.primaryHover} transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105`}
                            title="Add New Chat"
                        >
                            <Plus size={18} />
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setShowThemeSelector(!showThemeSelector);
                            }}
                            className={`p-2 rounded-full ${currentColors.primary} text-white ${currentColors.primaryHover} transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105`}
                            title="Change Theme"
                        >
                            <Palette size={18} />
                        </button>
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className={`p-2 rounded-full ${currentColors.primaryHover} transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105`}
                            title={isDark ? 'Light Mode' : 'Dark Mode'}
                        >
                            {isDark ? '☀️' : '🌙'}
                        </button>
                    </div>
                </div>

                {/* Add Chat Modal */}
                {showAddChat && (
                    <div className={`p-4 ${currentColors.secondary} ${currentColors.border} border-b animate-slideDown`}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <Plus size={20} />
                                Start New Chat
                            </h3>
                            <button
                                onClick={() => setShowAddChat(false)}
                                className={`p-1 rounded-full ${currentColors.primaryHover} transition-colors text-lg`}
                            >
                                ✕
                            </button>
                        </div>
                        <div className="space-y-3">
                            <input
                                type="email"
                                value={newChatEmail}
                                onChange={(e) => setNewChatEmail(e.target.value)}
                                placeholder="Enter email address..."
                                className={`w-full px-4 py-3 ${currentColors.background} ${currentColors.text} rounded-xl border ${currentColors.border} focus:outline-none focus:ring-2 focus:ring-opacity-50 ${currentColors.primary.replace('bg-', 'focus:ring-')} transition-all duration-200`}
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

                {/* Enhanced Theme Selector */}
                {showThemeSelector && (
                    <div className={`p-4 ${currentColors.secondary} ${currentColors.border} border-b max-h-96 overflow-y-auto`}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <Palette size={20} />
                                Choose Your Theme
                            </h3>
                            <button
                                onClick={() => setShowThemeSelector(false)}
                                className={`p-1 rounded-full ${currentColors.primaryHover} transition-colors sm:hidden text-lg`}
                            >
                                ✕
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {Object.entries(themes).map(([key, theme]) => (
                                <button
                                    key={key}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setCurrentTheme(key);
                                        setShowThemeSelector(false);
                                    }}
                                    className={`group relative p-4 rounded-xl text-left transition-all duration-300 hover:scale-105 transform ${currentTheme === key
                                            ? `${currentColors.primary} text-white shadow-lg ring-2 ring-offset-2 ring-opacity-50 ${currentColors.primary.replace('bg-', 'ring-')}`
                                            : `${currentColors.background} ${currentColors.primaryHover} shadow-md hover:shadow-lg border ${currentColors.border}`
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">{theme.emoji}</span>
                                            <div className="font-semibold text-sm">{theme.name}</div>
                                        </div>
                                        {getThemePreview(key)}
                                    </div>
                                    <div className={`text-xs opacity-75 ${currentTheme === key ? 'text-white' : currentColors.textSecondary}`}>
                                        {key === 'default' ? 'Classic WhatsApp style' :
                                            key === 'ocean' ? 'Cool ocean vibes' :
                                                key === 'sunset' ? 'Warm sunset colors' :
                                                    key === 'purple' ? 'Royal purple theme' :
                                                        key === 'crimson' ? 'Bold red accents' :
                                                            key === 'emerald' ? 'Forest green nature' :
                                                                key === 'midnight' ? 'Dark blue night' :
                                                                    key === 'coral' ? 'Ocean coral colors' :
                                                                        key === 'lavender' ? 'Soft lavender vibes' :
                                                                            key === 'mintGreen' ? 'Fresh mint style' :
                                                                                'Beautiful unique style'}
                                    </div>
                                    {currentTheme === key && (
                                        <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                        <div className={`mt-4 p-3 rounded-lg ${currentColors.primary} bg-opacity-10 text-center`}>
                            <p className={`text-sm ${currentColors.textSecondary}`}>
                                🎨 <strong>{Object.keys(themes).length}+ Beautiful Themes</strong> available!
                            </p>
                        </div>
                    </div>
                )}

                {/* Search */}
                <div className="p-4">
                    <div className={`relative ${currentColors.background} rounded-xl shadow-sm border ${currentColors.border}`}>
                        <Search className={`absolute left-3 top-3 ${currentColors.textSecondary}`} size={18} />
                        <input
                            type="text"
                            placeholder="Search chats..."
                            className={`w-full pl-10 pr-4 py-3 ${currentColors.background} ${currentColors.text} rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50 ${currentColors.primary.replace('bg-', 'focus:ring-')} transition-all duration-200`}
                        />
                    </div>
                </div>

                {/* Contacts List */}
               <div className="flex-1 overflow-y-auto">
  {chat.map((contact) => (
    <div
      key={contact._id}
      onClick={() => setActiveContact(contact)}
      className={`p-4 cursor-pointer transition-all duration-200 hover:transform hover:scale-[1.02] ${
        activeContact?._id === contact._id
          ? currentColors.secondary +
            ' shadow-md border-l-4 ' +
            currentColors.primary.replace('bg-', 'border-')
          : currentColors.primaryHover
      } ${currentColors.border} border-b last:border-b-0`}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={contact.receiver.profileImg}
            alt={contact.receiver.userName}
            className="w-12 h-12 rounded-full shadow-md object-cover"
          />
          {/* Optional online indicator */}
          {contact.online && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-medium truncate">
              {contact.receiver.userName}
            </h3>
            <span className={`text-xs ${currentColors.textSecondary}`}>
              {new Date(contact.updatedAt).toLocaleTimeString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-sm ${currentColors.textSecondary} truncate`}
            >
              Last message placeholder
            </p>
            {contact.unread > 0 && (
              <span
                className={`ml-2 px-2 py-1 ${currentColors.primary} text-white text-xs rounded-full min-w-[20px] text-center shadow-sm animate-bounce`}
              >
                {contact.unread}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

            </div>

            {/* Chat Area */}
            <div className={`flex-1 flex flex-col ${showThemeSelector ? 'hidden sm:flex' : 'flex'}`}>
                {/* Chat Header */}
                <div className={`p-4 ${currentColors.surface} ${currentColors.border} border-b flex items-center justify-between shadow-lg backdrop-blur-sm`}>
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
                                    <img
                                        src={activeContact.receiver.profileImg}
                                        alt={activeContact.receiver.userName}
                                        className="w-10 h-10 rounded-full shadow-md object-cover"
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
                                </div>
                                <div>
                                    <h2 className="font-semibold">{activeContact.receiver.userName}</h2>
                                    <p className={`text-xs ${currentColors.textSecondary} flex items-center gap-1`}>
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        Online
                                    </p>
                                </div>
                            </>
                        )}
                        {!activeContact && (
                            <div>
                                <h2 className="font-semibold">Select a chat</h2>
                                <p className={`text-xs ${currentColors.textSecondary}`}>Choose a conversation to start messaging</p>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <button className={`p-2 rounded-full ${currentColors.primaryHover} transition-all duration-200 hover:scale-105 shadow-sm`}>
                            <Phone size={20} />
                        </button>
                        <button className={`p-2 rounded-full ${currentColors.primaryHover} transition-all duration-200 hover:scale-105 shadow-sm`}>
                            <Video size={20} />
                        </button>
                        
                            <div className="hidden md:flex items-center space-x-4">
                                {isSignedIn ? (
                                    <div className="flex items-center space-x-4">
                                        <div className="scale-110 ">
                                            <UserButton
                                                appearance={{
                                                    elements: {
                                                        avatarBox: "w-10 h-10 rounded-full border-2 border-purple-500/50 hover:border-purple-400 transition-colors"
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                ) : (<Users />)}  
                            </div>
                    </div>
                </div>

                {/* Messages */}
                <div className={`flex-1 overflow-y-auto p-4 ${currentColors.background} relative`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none">
                        <div className="w-full h-full" style={{
                            backgroundImage: `radial-gradient(circle at 20% 50%, ${currentColors.primary.replace('bg-', '')} 0%, transparent 50%), radial-gradient(circle at 80% 50%, ${currentColors.accent.replace('text-', '')} 0%, transparent 50%)`,
                            backgroundSize: '100px 100px'
                        }}></div>
                    </div>

                    <div className="space-y-4 relative z-10">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'own' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                            >
                                <div
                                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] ${msg.sender === 'own'
                                            ? `${currentColors.messageOwn} ml-auto backdrop-blur-sm border ${currentColors.primary.replace('bg-', 'border-').replace('500', '200')}`
                                            : `${currentColors.messageOther} ${currentColors.border} border backdrop-blur-sm`
                                        }`}
                                >
                                    <p className="text-sm leading-relaxed">{msg.text}</p>
                                    <div className="flex items-center justify-end gap-1 mt-2">
                                        <p className={`text-xs ${currentColors.textSecondary}`}>{msg.time}</p>
                                        {msg.sender === 'own' && (
                                            <div className="flex">
                                                <div className={`w-3 h-3 ${currentColors.accent} opacity-60`}>✓</div>
                                                <div className={`w-3 h-3 ${currentColors.accent} -ml-1`}>✓</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Message Input */}
                <div className={`p-4  ${currentColors.surface} ${currentColors.border} border-t shadow-2xl backdrop-blur-lg`}>
                    <div className="flex items-end gap-3">
                        <button className={`p-2  rounded-full ${currentColors.primaryHover} transition-all duration-200 hover:scale-110 shadow-lg`}>
                            <Paperclip size={20} />
                        </button>
                        <div className={`flex-1 ${currentColors.background}  rounded-2xl ${currentColors.border} border shadow-lg backdrop-blur-sm`}>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type a message..."
                                rows="1"
                                className={`w-full px-4 py-3 ${currentColors.background} ${currentColors.text} rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-opacity-50 ${currentColors.primary.replace('bg-', 'focus:ring-')} max-h-32 transition-all duration-200 placeholder-opacity-60`}
                                style={{ minHeight: '48px' }}
                            />
                        </div>
                        <button className={`p-2  rounded-full ${currentColors.primaryHover} transition-all duration-200 hover:scale-110 shadow-lg`}>
                            <Smile size={20} />
                        </button>
                        {message.trim() ? (
                            <button
                                onClick={handleSendMessage}
                                className={`p-3 ${currentColors.primary} text-white rounded-full ${currentColors.primaryHover} transition-all duration-200 hover:scale-110 shadow-xl hover:shadow-2xl transform animate-pulse`}
                            >
                                <Send size={20} />
                            </button>
                        ) : (
                            <button className={`p-3 ${currentColors.primary} text-white rounded-full ${currentColors.primaryHover} transition-all duration-200 hover:scale-110  shadow-xl hover:shadow-2xl transform`}>
                                <Mic size={20} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
        </div>
    );
};

export default Chat;