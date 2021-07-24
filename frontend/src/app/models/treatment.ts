import TreatmentPoint from './treatmentPoint';

export default class Treatment {
    _id?: string;
    name: string;
    points: TreatmentPoint[];
    description: string;
}