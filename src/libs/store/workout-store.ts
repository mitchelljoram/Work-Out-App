import { create, StateCreator } from "zustand";
import { Exercise, Workout, RepSet, TimeSet } from "../types";

interface WorkoutSlice {
  workout: Workout;
  addExercise: (exercise: Exercise) => void;
  removeExercise: (exercise: Exercise) => void;
}

const createWorkoutSlice: StateCreator<
  WorkoutSlice,
  [],
  [],
  WorkoutSlice
> = (set) => ({ 
  workout: { id: 0, name: "Workout A", exercises: [] }, 
  addExercise: (exercise) => set((state) => ({ workout: { ...state.workout, exercises: [...state.workout.exercises, exercise] } })),
  removeExercise: (exercise) => set((state) => ({ workout: { ...state.workout, exercises: state.workout.exercises.filter((e) => e.id !== exercise.id) } })),
});

export const useWorkoutStore = create<WorkoutSlice>()(
  (...a) => ({
    ...createWorkoutSlice(...a),
  })
);