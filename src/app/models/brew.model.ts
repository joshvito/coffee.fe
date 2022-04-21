import { IRatings } from './rating.model';
import { INumberBooleanMap, IPageRequest, ITimestamps } from './common.model';

export enum Grind {
  Fine, MediumFine, Medium, MediumCoarse, Coarse
}

export interface IBrew extends ITimestamps, ICreateBrew {
    id: number;
    user_id: number;
    ratings: IRatings[]
}

export interface ICreateBrew {
    bean_id: number;
    method_id: number;
    grams: number;
    grind?: Grind;
    notes: string;
}

export interface IFilterBrew extends IPageRequest {
  methods: INumberBooleanMap,
  beans: INumberBooleanMap,
}
