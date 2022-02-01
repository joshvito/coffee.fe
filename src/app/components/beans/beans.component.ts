import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoffeeBeanActions } from 'src/app/state/actions';
import { State } from 'src/app/state/reducers';

@Component({
  selector: 'app-beans',
  template: `
    <p>
      beans works!!
    </p>
  `,
  styles: [
  ]
})
export class BeansComponent implements OnInit {

  constructor(
    private store: Store<State>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(CoffeeBeanActions.getMany());
  }

}
