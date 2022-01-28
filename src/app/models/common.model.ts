interface ITimestamps {
    created_at: string;
    updated_at: string;
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
}