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

  private colorize(score: number): string {
    if (score >= 4) return '#198754';
    if (score > 2 ) return '#20c997';
    if (score === 2 ) return '#ffc107';
    if (score > 0) return '#fd7e14';
    return '#dc3545';
  }
}
