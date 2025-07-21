/* eslint-disable jsdoc/require-jsdoc */
import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { customSessionStorage } from "../storages/session-storage.storage";


interface PersonState {
  firstName: string;
  lastName: string;

  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const storeAPI: StateCreator<PersonState, [["zustand/devtools", never]]> = (set) => ({
  firstName: '',
  lastName: '',

  setFirstName: (value: string) => set(({ firstName: value }), false, 'setFirstName'),
  setLastName: (value: string) => set(({ lastName: value }), false, 'setLastName'),
})


// Esto es diferente en el curso que en la doc, esto es lo correcto
export const usePersonStore = create<PersonState>()(
  persist(
    devtools(
      storeAPI
    ),
    {
      name: 'person-storage', // unique name for the storage
      storage: customSessionStorage,
    }
  )
);
