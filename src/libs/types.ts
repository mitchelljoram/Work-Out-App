export type Lift = {
    id: number;
    name: string;
    type: string;
};

export type RepSet = {
    minReps: number;
    maxReps: number;
    weight: number;
    unit: "kg" | "lb";
}

export type TimeSet = {
    time: number;
}

export type Exercise = {
    id: number;
    lift: Lift;
    type: "rep" | "time";
    sets: (RepSet[] | TimeSet[]);
};

export type Workout = {
    id: number;
    name: string;
    exercises: Exercise[];
};