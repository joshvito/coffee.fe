import { ITimestamps } from './common.model';

export interface IUser extends ITimestamps{
  id: number;
  email: string;
  name: string;
}
