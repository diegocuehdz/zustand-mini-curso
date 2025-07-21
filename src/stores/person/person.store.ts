/* eslint-disable jsdoc/require-jsdoc */
import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";

import { customSessionStorage } from "../storages/session-storage.storage";


interface PersonState {
  firstName: string;
  lastName: string;

  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const storeAPI: StateCreator<PersonState> = (set) => ({
  firstName: '',
  lastName: '',

  setFirstName: (value: string) => set((state) => ({ firstName: value })),
  setLastName: (value: string) => set((state) => ({ lastName: value })),
})



export const usePersonStore = create<PersonState>()(
  persist(storeAPI, {
    name: 'person-storage', // unique name for the storage
    storage: customSessionStorage,
  })
);
