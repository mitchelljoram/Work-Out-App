import { Exercise } from "./exercise";
import { Set, RepSet, TimeSet, CustomSet } from "./sets";

interface ExerciseSetInterface {
    id: number;
    exercise: Exercise;
    usingWeights: boolean;
    sets: Set[];
}

export class ExerciseSet implements ExerciseSetInterface {
    id: number;
    exercise: Exercise;
    usingWeights: boolean;
    sets: Set[];

    constructor(id: number, exercise: Exercise, usingWeight: boolean, sets: Set[]) {
        this.id = id;
        this.exercise = exercise;
        this.usingWeights = usingWeight;
        this.sets = sets;
    }

    addSet = (newSet: Set): void => {
        this.sets = [...this.sets, newSet];
    }

    removeSet = (): void => {
        this.sets.pop();
    }
}