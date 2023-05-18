interface SetInterface {
    id: number;
};

export class Set implements SetInterface {
    id: number;

    constructor(id: number) {
        this.id = id;
    };
};

export class WeightedSet extends Set {
    weight: number;
    unit: string;

    constructor(id: number, weight: number, unit: string) {
        super(id);
        this.weight = weight;
        this.unit = unit;
    }
};

export class TimedSet extends Set {
    time: string;

    constructor(id: number, time: string) {
        super(id);
        this.time = time;
    }
};