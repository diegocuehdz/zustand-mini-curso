import { createJSONStorage, StateStorage } from "zustand/middleware";

export const storageAPI: StateStorage = {
  getItem: function (name: string): string | null | Promise<string | null> {
    const data = sessionStorage.getItem(name);
    return data;
  },
  removeItem: function (name: string): void | Promise<void> {
    console.log('removeItem', name)
  },
  setItem: function (name: string, value: string): void {
    sessionStorage.setItem(name, value);
  },
}

export const customSessionStorage = createJSONStorage(() => storageAPI);
