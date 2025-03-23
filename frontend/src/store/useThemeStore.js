import { create } from "zustand";

export const useThemeStore = create((set) => ({
  primaryColor: "violet",
  mode: "light",

  updatePrimaryColor: (color) => {
    set({ primaryColor: color });
  },
  updateMode: (_mode) => {
    set({ mode: _mode });
  },
}));
