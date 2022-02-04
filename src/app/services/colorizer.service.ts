import { Injectable } from '@angular/core';
import { IBrewRatings } from '../models/brew-ratings.model';

@Injectable({
  providedIn: 'root'
})
export class ColorizerService {

  constructor() { }

  color(rating: IBrewRatings): string {
    return this.colorize(this.calculatorize(rating));
  }

  private calculatorize(rating: IBrewRatings): number {
    return 0 + rating.aroma + rating.flavor;
  }
// yellow
  private colorize(score: number): string {
    if (score >= 4) return '#d63384' //red;
    if (score > 2 ) return '#ffc107' //yellow;
    if (score === 2 ) return '#20c997' //green;
    if (score > 0) return '#ffc107';
    return '#d63384';
  }
}
