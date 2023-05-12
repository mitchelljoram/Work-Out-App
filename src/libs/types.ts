import { type } from "os";

export type Lift = {
    id: number;
    name: string;
    type: string;
};

export type RepSet = {
    type: "rep";
    minReps: number;
    maxReps: number;
    weight: number;
    unit: "kg" | "lb";
}

export type TimeSet = {
    type: "time";
    time: number;
}

export type Exercise = {
    id: number;
    lift: Lift;
    sets: (RepSet | TimeSet)[];
};

export type Workout = {
    id: number;
    name: string;
    exercises: Exercise[];
};