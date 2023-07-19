import { ExerciseSet } from './exerciseSets';

export type Workout  = {
    id: number;
    name: string;
    exerciseSets: ExerciseSet[];
    notes: string;
};