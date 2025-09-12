import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { createPersonSlice, PersonSlice } from "./person.slice";

type BoundState = PersonSlice;

export const useWeddingBoundStore = create<BoundState>()(
  devtools(
    (...a) => ({
      ...createPersonSlice(...a),
    }),
    { name: "Wedding Store" }
  )
)
