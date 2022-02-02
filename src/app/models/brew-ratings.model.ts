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

export interface IBrewRatings extends ITimestamps, ICreateBrewRating {
    id: number;
}

export interface ICreateBrewRating {
    bean_id: number;
    method_id: number;
    flavor: Flavor;
    aroma: Aroma;
    grams: number;
    notes: string;
}

export interface IFilterBrewRatings {
  methods: {[key: number]: boolean},
  beans: {[key: number]: boolean},
}
