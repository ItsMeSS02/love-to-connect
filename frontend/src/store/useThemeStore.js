import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("LoveToConnect-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("LoveToConnect-theme", theme);
    set({ theme });
  },
}));
