import { create } from "zustand";

export const useThemeStore = create((set) => ({
  primaryColor: localStorage.getItem("color") || "violet",
  primaryTextColor: localStorage.getItem("textColor") || "white",
  mode: localStorage.getItem("mode") || "light",

  updatePrimaryColor: (color) => {
    localStorage.setItem("color", color);
    set({ primaryColor: color });
  },
  updateMode: (_mode) => {
    localStorage.setItem("mode", _mode);
    set({ mode: _mode });
  },
}));
