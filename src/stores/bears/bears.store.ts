import { create } from 'zustand'

interface BearState {
  blackBears: number;
  pandaBears: number;
  polarBears: number;

  increaseBlackBears: (by: number) => void;
  increasePandaBears: (by: number) => void;
  increasePolarBears: (by: number) => void;
}

export const useBearStore = create<BearState>()((set) => ({
  blackBears: 10,
  pandaBears: 10,
  polarBears: 10,

  increaseBlackBears: (by) => set((state) => ({ blackBears: state.blackBears + by })),
  increasePandaBears: (by) => set((state) => ({ pandaBears: state.pandaBears + by })),
  increasePolarBears: (by) => set((state) => ({ polarBears: state.polarBears + by })),
}))
