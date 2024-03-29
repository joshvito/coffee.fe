import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stars',
  template: `
    <div>
      <i class="fa fa-solid fa-star fs-7 filled" aria-hidden="true" *ngFor="let i of numFilledStars"></i>
      <i class="fa fa-solid fa-star fs-7 unfilled" aria-hidden="true" *ngFor="let i of numUnFilledStars"></i>
    </div>
  `,
  styles: [`
    .unfilled {
      color: lightgray;
    }
    .filled {
      color: brown;
    }
  `]
})
export class StarsComponent implements OnInit {
  @Input() rating: number | undefined = 0;

  maxStars = 5;
  numFilledStars: number[] | null = null;
  numUnFilledStars: number[] | null = null;

  constructor() { }

  ngOnInit(): void {
    const rating = this.rating ?? 0;
    const r = rating > this.maxStars ? this.maxStars : Math.ceil(rating);

    this.numFilledStars = Array(r).fill(null).map((x,i) => i);
    this.numUnFilledStars = Array(this.maxStars - r).fill(null).map((x,i) => i);
  }

}
