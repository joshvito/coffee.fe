import { ITimestamps } from './common.model';
import { IUser } from './user.model';

export interface IRating extends ITimestamps, ICreateRating {
    id: number;
    user_id: number;
    user: IUser;
}

export interface ICreateRating extends Partial<IRatingOptionals> {
    brew_id: number;
    rating: number;
    notes: string;
}

export interface IRatingOptionals {
  sweetness: number;
  aroma: number;
  body: number;
  acidity: number;
  aftertaste: number;
}

export const OptionalRatingKeys = ['aroma','body','acidity','sweetness','aftertaste'];
