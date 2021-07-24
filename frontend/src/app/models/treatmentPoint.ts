import Point from './point';

export default class TreatmentPoint {
    point: Point;
    type: pointType;
    isDeleted: boolean;
};

enum pointType {
    "master",
    "primary",
    "supplemental"
};