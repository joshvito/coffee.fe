import { ITimestamps } from './common.model';

export interface IBrewRatings extends ITimestamps, ICreateBrewRating {
    id: number;
    user_id: number;
}

export interface ICreateBrewRating {
    brew_id: number;
    flavor: number;
    aroma: number;
    notes: string;
}
