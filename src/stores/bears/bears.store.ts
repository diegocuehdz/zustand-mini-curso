/* eslint-disable sort-keys */
import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface Bear {
  id: number;
  name: string;
}

interface BearState {
  blackBears: number;
  pandaBears: number;
  polarBears: number;

  bears: Bear[];
  // Esto solo funciona sin el persist, si no lo tiene que cambiar a un arrow que lo jale
  //computed: {
  //  totalBears: number;
  //};

  totalBears: () => number;

  increaseBlackBears: (by: number) => void;
  increasePandaBears: (by: number) => void;
  increasePolarBears: (by: number) => void;

  doNothing: () => void;
  addBear: () => void;
  clearBears: () => void;
}

export const useBearStore = create<BearState>()(persist((set, get) => ({
  bears: [{
    id: 1,
    name: 'Bear #1'
  }],
  blackBears: 10,
  pandaBears: 10,
  polarBears: 10,


  totalBears: () => {
    return get().blackBears + get().pandaBears + get().polarBears + get().bears.length;
  },

  increaseBlackBears: (by) => set((state) => ({ blackBears: state.blackBears + by })),
  increasePandaBears: (by) => set((state) => ({ pandaBears: state.pandaBears + by })),
  increasePolarBears: (by) => set((state) => ({ polarBears: state.polarBears + by })),

  doNothing: () => set((state) => ({ bears: [...state.bears] })),
  addBear: () => set((state) => ({
    bears: [...state.bears, { id: state.bears.length + 1, name: `Bear #${state.bears.length + 1}` }]
  })),
  clearBears: () => set({ bears: [] })
}), { name: 'bear-storage' })); // name of the item in the storage
