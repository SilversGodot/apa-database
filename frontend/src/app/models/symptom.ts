import Treatment from "./treatment";

export default class Symptom {
    _id?: string;
    name: string;
    treatments: Treatment[];
    description: string;
}