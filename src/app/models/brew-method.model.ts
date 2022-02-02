import { ITimestamps } from './common.model';

export interface IBrewMethod extends ITimestamps, ICreateBrewMethod {
    id: number;
}

export interface ICreateBrewMethod {
  type: string;
  volume: number;
  units: string;
  notes: string;
}
