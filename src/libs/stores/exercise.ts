import { create, StateCreator } from "zustand";
import { Exercise } from "../types-interfaces-classes";

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
  exercises: [{id: 1, name: "Bicep Curls"},{id: 2, name: "Chest Press"},{id: 3, name: "Deadlift"},{id: 4, name: "Running"},{id: 5, name: "Shoulder Press"},{id: 1, name: "Squat"}],
  addLift: (excersize) => set((state) => ({ exercises: [...state.exercises, excersize] })),
  removeLift: (exercise) => set((state) => ({ exercises: state.exercises.filter((e) => e.id !== exercise.id) })),
});

export const useExerciseStore = create<ExerciseSlice>()(
    (...a) => ({
      ...createExerciseSlice(...a),
    })
);