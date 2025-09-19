import { StateCreator } from "zustand";

export interface GuestSlice {
  guestCount: number;
  setGuestCount: (count: number) => void;
}


export const createGuestSlice: StateCreator<GuestSlice> = (set) => ({
  guestCount: 0,
  setGuestCount: (guestCount) => set(() => ({
    guestCount: guestCount > 0 ? guestCount : 0
  })),
})
