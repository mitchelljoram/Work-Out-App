interface SetInterface {
    id: number;
    weight?: number;
};

export class Set implements SetInterface {
    id: number;
    weight?: number

    constructor(id: number) {
        this.id = id;
        this.weight = 0;
    };

    setWeight = (weight: number): void => {
        this.weight = weight;
    }
};

export class RepSet extends Set {
    minReps: number;
    maxReps: number;

    constructor(id: number, minReps: number, maxReps: number) {
        super(id);
        this.minReps = minReps;
        this.maxReps = maxReps;
    }
};

export class TimeSet extends Set {
    time: string;

    constructor(id: number, time: string) {
        super(id);
        this.time = time;
    }
};

export class CustomSet extends Set {
    custom: string;

    constructor(id: number, custom: string) {
        super(id);
        this.custom = custom;
    }
}