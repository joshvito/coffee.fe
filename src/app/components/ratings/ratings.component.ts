import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BrewRatingActions } from 'src/app/state/actions';
import { State } from 'src/app/state/reducers';

@Component({
  selector: 'app-ratings',
  template: `
    <p>
      ratings works!
    </p>
  `,
  styles: [
  ]
})
export class RatingsComponent implements OnInit {

  constructor(
    private store: Store<State>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(BrewRatingActions.getMany());
  }

}
