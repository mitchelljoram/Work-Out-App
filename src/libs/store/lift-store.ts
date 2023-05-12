import { create, StateCreator } from "zustand";
import { Lift } from "../types";

interface LiftSlice {
    lifts: Lift[];
    addLift: (excersize: Lift) => void;
    removeLift: (excersize: Lift) => void;
}

const createLiftSlice: StateCreator<
  LiftSlice,
  [],
  [],
  LiftSlice
> = (set) => ({
  lifts: [],
  addLift: (lift) => set((state) => ({ lifts: [...state.lifts, lift] })),
  removeLift: (lift) => set((state) => ({ lifts: state.lifts.filter((e) => e.id !== lift.id) })),
});

export const useLiftStore = create<LiftSlice>()(
    (...a) => ({
      ...createLiftSlice(...a),
    })
);