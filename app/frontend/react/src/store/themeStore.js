import { create } from "zustand";
import { persist } from "zustand/middleware";

const useDarkStore = create(
  persist(
    (set, get) => ({
      isDarkMode: false,
      toggleDarkMode: () => {
        const current = get().isDarkMode;
        set({ isDarkMode: !current });
        console.log("🚀 ~ current:", current);
      },
    }),
    {
      name: "dark-mode-storage",
    }
  )
);

const useThemseStore = create(
  persist((set, get) => ({
    theme: "default",
    changeTheme: (newTheme) => {
      const current_theme = get().theme;
      set({ theme: newTheme });
      console.log("~ current theme:", current_theme);
    },
  }))
);

export { useDarkStore , useThemseStore };
