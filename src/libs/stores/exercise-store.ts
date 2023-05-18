import { create, StateCreator } from "zustand";
import { Exercise } from "../interfaces";

interface ExerciseSlice {
    exercises: Exercise[];
    addLift: (excersize: Exercise) => void;
    removeLift: (excersize: Exercise) => void;
}

const createExerciseSlice: StateCreator<
  ExerciseSlice,
  [],
  [],
  ExerciseSlice
> = (set) => ({
  exercises: [{id: 1, name: "Chest Press"},{id: 2, name: "Running"}],
  addLift: (excersize) => set((state) => ({ exercises: [...state.exercises, excersize] })),
  removeLift: (exercise) => set((state) => ({ exercises: state.exercises.filter((e) => e.id !== exercise.id) })),
});

export const useExerciseStore = create<ExerciseSlice>()(
    (...a) => ({
      ...createExerciseSlice(...a),
    })
);