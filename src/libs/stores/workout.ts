import { create, StateCreator } from "zustand";
import { Workout, ExerciseSet, Set } from "../types-interfaces-classes";

interface WorkoutSlice {
  workout: Workout;
  addExerciseSet: (newExerciseSet: ExerciseSet) => void;
  removeExerciseSet: (exerciseSet: ExerciseSet) => void;
  addSet: (exerciseSet: ExerciseSet, newSet: Set) => void;
}

const createWorkoutSlice: StateCreator<
  WorkoutSlice,
  [],
  [],
  WorkoutSlice
> = (set) => ({ 
  workout: { id: 0, name: "Workout A", exerciseSets: [], notes: "" },
  addExerciseSet: (newExerciseSet: ExerciseSet) => {
    set((state) => ({
      workout: {
        ...state.workout,
        exerciseSets: [...state.workout.exerciseSets, newExerciseSet],
      },
    }));
  },
  removeExerciseSet: (exerciseSet: ExerciseSet) => {
    set((state) => ({
      workout: {
        ...state.workout,
        exerciseSets: state.workout.exerciseSets.filter((e) => e.id !== exerciseSet.id),
      },
    }));
  },
  addSet: (exerciseSet: ExerciseSet, newSet: Set) => {
    set((state) => ({
      workout: {
        ...state.workout,
        exerciseSets: state.workout.exerciseSets.map((e) => {
          if (e.id === exerciseSet.id) {
            e.sets.push(newSet);
          }
          return e;
        }),
      },
    }));
  }
});

export const useWorkoutStore = create<WorkoutSlice>()(
  (...a) => ({
    ...createWorkoutSlice(...a),
  })
);