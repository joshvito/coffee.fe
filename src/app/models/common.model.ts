import { HttpParams } from '@angular/common/http';

interface ITimestamps {
    created_at: string;
    updated_at: string;
}

export interface IPageResult<T> extends IPageMeta  {
  data: T[],
}

export interface IPageMeta {
  total: number,
  current_page: number;
  per_page: number,
  last_page: number,
  first_page_url: string,
  last_page_url: string,
  next_page_url: string,
  prev_page_url: string,
  path: string,
  from: number,
  to: number,
}

export interface IPageRequest {
  page: number,
  limit?: number,
}

interface IStringTMap<T> { [key: string]: T; }
interface INumberTMap<T> { [key: number]: T; }
interface IStringAnyMap extends IStringTMap<any> { }
interface INumberAnyMap extends INumberTMap<any> { }
interface IStringStringMap extends IStringTMap<string> { }
interface INumberStringMap extends INumberTMap<string> { }
interface IStringNumberMap extends IStringTMap<number> { }
interface INumberNumberMap extends INumberTMap<number> { }
interface IStringBooleanMap extends IStringTMap<boolean> { }
interface INumberBooleanMap extends INumberTMap<boolean> { }

function getRandomInteger(max: number = 500) {
  return Math.floor(Math.random() * max) + 1;
}

function guidizer() {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  };
  return `${s4()+s4()}-${s4()}-${s4()}-${s4()}-${s4()+s4()+s4()}`;
}

function izerizer(term: string, hyphenate: boolean): string {
  return !!hyphenate ? `${term}-izer` : `${term}izer`;
}

function addPageParams(params: HttpParams, pagequery: Partial<IPageRequest>): HttpParams {
  if(pagequery?.limit) params = params.set('limit', pagequery.limit);
  if(pagequery?.page) params = params.set('page', pagequery.page);
  return params;
}

export const paramMapper = (parameters: IStringAnyMap): IStringStringMap => {
  return Object.keys(parameters)
      .reduce((accum, key) => {
        if (parameters.hasOwnProperty(key) && parameters[key]) {
          accum[key] = parameters[key].toString();
        }
        return accum;
      }, {} as IStringStringMap);
};

export {
  ITimestamps,
  IStringTMap,
  INumberTMap,
  IStringAnyMap,
  INumberAnyMap,
  IStringStringMap,
  INumberStringMap,
  IStringNumberMap,
  INumberNumberMap,
  IStringBooleanMap,
  INumberBooleanMap,
  getRandomInteger,
  guidizer,
  izerizer,
  addPageParams,
}
