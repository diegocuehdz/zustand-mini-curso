import { create } from 'zustand'

interface Bear {
  id: number;
  name: string;
}

interface BearState {
  blackBears: number;
  pandaBears: number;
  polarBears: number;

  bears: Bear[];
  computed: {
    totalBears: number;
  };

  increaseBlackBears: (by: number) => void;
  increasePandaBears: (by: number) => void;
  increasePolarBears: (by: number) => void;

  doNothing: () => void;
  addBear: () => void;
  clearBears: () => void;
}

export const useBearStore = create<BearState>()((set, get) => ({
  blackBears: 10,
  pandaBears: 10,
  polarBears: 10,

  bears: [{
    id: 1,
    name: 'Bear #1'
  }],

  computed: {
    get totalBears(): number {
      return get().blackBears + get().pandaBears + get().polarBears + get().bears.length;
    }
  },

  increaseBlackBears: (by) => set((state) => ({ blackBears: state.blackBears + by })),
  increasePandaBears: (by) => set((state) => ({ pandaBears: state.pandaBears + by })),
  increasePolarBears: (by) => set((state) => ({ polarBears: state.polarBears + by })),

  doNothing: () => set((state) => ({ bears: [...state.bears] })),
  addBear: () => set((state) => ({
    bears: [...state.bears, { id: state.bears.length + 1, name: `Bear #${state.bears.length + 1}` }]
  })),
  clearBears: () => set({ bears: [] })
}))
