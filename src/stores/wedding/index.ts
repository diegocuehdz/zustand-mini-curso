import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { ConfirmationSlice, createConfirmationSlice, } from "./confirmation.slice";
import { createDateSlice, DateSlice } from "./date.slice";
import { createGuestSlice, GuestSlice } from "./guest.slice";
import { createPersonSlice, PersonSlice } from "./person.slice";

type BoundState = PersonSlice & GuestSlice & DateSlice & ConfirmationSlice;

export const useWeddingBoundStore = create<BoundState>()(
  devtools(
    (...a) => ({
      ...createPersonSlice(...a),
      ...createGuestSlice(...a),
      ...createDateSlice(...a),
      ...createConfirmationSlice(...a),
    }),
    { name: "Wedding Store" }
  )
)
