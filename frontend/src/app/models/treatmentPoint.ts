import Point from './point';

export class TreatmentPoint {
    point: Point;
    type: pointType;
    isDeleted: boolean;

    constructor(point: Point, type: pointType) {
        this.point = point;
        this.type = type,
        this.isDeleted = false;
    }
};

export enum pointType {
    "master",
    "primary",
    "supplemental"
};