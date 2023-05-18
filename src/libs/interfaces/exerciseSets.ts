import { Exercise } from "./exercise";
import { WeightedSet, TimedSet, Set } from "./sets";

interface ExerciseSetInterface {
    id: number;
    exercise: Exercise;
    sets: Set[];
}

export class ExerciseSet implements ExerciseSetInterface {
    id: number;
    type: string;
    exercise: Exercise;
    sets: Set[];

    constructor(id: number, exercise: Exercise, sets: Set[]) {
        this.id = id;
        this.type = "ExerciseSet";
        this.exercise = exercise;
        this.sets = sets;
    }
}

export class RepExerciseSet extends ExerciseSet {
    type: string;
    minReps: number;
    maxReps: number;

    constructor(id: number, exercise: Exercise, sets: Set[], minReps: number, maxReps: number) {
        super(id, exercise, sets);
        this.type = "RepExerciseSet";
        this.minReps = minReps;
        this.maxReps = maxReps;
    }
};