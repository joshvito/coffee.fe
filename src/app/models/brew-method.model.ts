import { ITimestamps } from './common.model';

export interface IBrewMethod extends ITimestamps {
    id: number;
    type: string;
    volume: number;
    units: string;
    notes: string;
}