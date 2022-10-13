import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { IStringStringMap, ITimestamps } from './common.model';
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

export const OptionalRatingKeys:optionalRatingKeysType[] = ['aroma','body','acidity','sweetness','aftertaste'];
export type optionalRatingKeysType = 'aroma' | 'body' | 'acidity' | 'sweetness'| 'aftertaste';

interface IOptionalRatingDescriptions {
  aroma: string,
  body: string,
  acidity: string,
  sweetness: string,
  aftertaste: string,
  referenced?: string[],
}
export const OptionalRatingDescriptions: IOptionalRatingDescriptions = {
  aroma: 'The fragrance produced by hot, freshly brewed coffee. Aroma, along with flavor, acidity, and body, is one of the principal categories used by professional tasters in cupping, or sensory evaluation of coffee.',
  body: 'The sensation of heaviness, richness, or thickness and associated texture when one tastes coffee. Body, along with flavor, acidity, and aroma, is one of the principal categories used by professional tasters cupping, or sensory evaluation of coffee.',
  acidity: 'Usually, the pleasant tartness of a fine coffee. Acidity, along with flavor, aroma, and body, is one of the principal categories used by professional tasters in cupping, or sensory evaluation of coffee. When not used to describe cup characteristics, the term acidity may refer to pH, or literal acidity, or to certain constituents present in coffee that ostensibly produce indigestion or nervousness in some individuals.',
  sweetness: 'The perception of sweetness in a coffee is often associated with the perception of a fruity taste on the palate and on the tip of the tongue. Professional tasters and roasting houses like ours refer to the sweetness of the coffee when we want to describe the intensity of the quantities of sugars perceived during the tasting experience.',
  aftertaste: 'Aftertaste is the sensation that is experienced after the coffee is swallowed.  It is the lingering remnant of the coffee taste that often changes over time.  Record these changes.  Do taste characteristics increase, change, or diminish?  Record the permanence.  The permanence is how long it takes from the initial aromatic sensation on the back of the throat to the loss of this sensation.',
  referenced: ['https://www.coffeereview.com/coffee-glossary/', 'https://www.caffeaiello.it/en/blog-en/curiosities/characteristics-of-coffee-sweetness-and-bitterness/', 'http://www.coffeeresearch.org/coffee/']
}
