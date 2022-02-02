import { ITimestamps } from './common.model';

export enum Roast {
    Light, Medium, Dark
}

export interface ICoffeeBean extends ITimestamps, ICreateBean {
    id: number;
}

export interface ICreateBean {
  brand: string;
  origin: string;
  roast: Roast;
  notes: string;
}
