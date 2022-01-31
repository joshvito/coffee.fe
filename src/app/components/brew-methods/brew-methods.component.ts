import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BrewMethodActions } from 'src/app/state/actions';
import { State } from 'src/app/state/reducers';

@Component({
  selector: 'app-brew-methods',
  template: `
  <div class="p-1">
    <p>
      brew-methods works!
    </p>
  </div>
    
  `,
  styles: [
  ]
})
export class BrewMethodsComponent implements OnInit {

  constructor(
    private store: Store<State>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(BrewMethodActions.getMany());
  }

}
