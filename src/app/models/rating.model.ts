import { ITimestamps } from './common.model';
import { IUser } from './user.model';

export interface IRatings extends ITimestamps, ICreateRating {
    id: number;
    user_id: number;
    user: IUser;
}

export interface ICreateRating {
    brew_id: number;
    flavor: number;
    aroma: number;
    notes: string;
}
