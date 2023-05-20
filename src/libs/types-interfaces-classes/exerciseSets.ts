import { Exercise } from "./exercise";
import { WeightedSet, TimedSet, Set } from "./sets";

interface ExerciseSetInterface {
    id: number;
    exercise: Exercise;
    sets: Set[];
}

export class ExerciseSet implements ExerciseSetInterface {
    id: number;
    exercise: Exercise;
    sets: Set[];

    constructor(id: number, exercise: Exercise, sets: Set[]) {
        this.id = id;
        this.exercise = exercise;
        this.sets = sets;
    }
}

export class RepExerciseSet extends ExerciseSet {
    minReps: number;
    maxReps: number;

    constructor(id: number, exercise: Exercise, sets: Set[], minReps: number, maxReps: number) {
        super(id, exercise, sets);
        this.minReps = minReps;
        this.maxReps = maxReps;
    }
};