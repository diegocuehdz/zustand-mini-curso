import { create } from 'zustand'

interface BearState {
  blackBears: number;
  brownBears: number;
  polarBears: number;

  increaseBlackBears: (by: number) => void;
}

export const useBearStore = create<BearState>()((set) => ({
  blackBears: 0,
  brownBears: 0,
  polarBears: 0,

  increaseBlackBears: (by) => set((state) => ({ blackBears: state.blackBears + by })),
}))
