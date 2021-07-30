import EarZone from '@app/models/earZone';

export default class Point {
    _id?: string;
    name: string;
    alias: string[];
    earAnatomy: string;
    function: string;
    chineseEarZones: EarZone[];
    europeanEarZones: EarZone[];
    videoLink?: string;
    location: { x: number, y: number, z: number };

    /// to-do: remove
    code: number;
    partOfEar: string;
    bodyParts: string[];

    chineseEarZoneString: string;
}