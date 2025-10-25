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


export default themes;