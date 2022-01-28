import { ITimestamps } from './common.model';

export enum Roast {
    Light, Medium, Dark
}

export interface ICoffeeBean extends ITimestamps {
    id: number;
    brand: string;
    origin: string;
    roast: Roast;
    notes: string;
}