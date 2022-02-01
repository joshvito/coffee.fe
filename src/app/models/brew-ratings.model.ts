import { ITimestamps } from './common.model';

export enum Flavor {
    Weak,
    JustRight,
    Strong,
}

export enum Aroma {
    None,
    Pleasant,
    Overkill,
}

export interface IBrewRatings extends ITimestamps {
    id: number;
    bean_id: number;
    method_id: number;
    flavor: Flavor;
    aroma: Aroma;
    grams: number;
    notes: string;
}

export interface ICreateBrewRating {
    bean_id: number;
    method_id: number;
    flavor: Flavor;
    aroma: Aroma;
    grams: number;
    notes: string;
}
