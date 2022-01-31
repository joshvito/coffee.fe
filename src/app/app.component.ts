import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LayoutView } from './models/layout.model';
import * as fromReducer from './state/reducers';

@Component({
  selector: 'app-root',
  template: `
    <app-nav></app-nav>
    <main class="px-3 my-3" [ngSwitch]="currentLayoutView$ | async">
      <app-beans *ngSwitchCase="LayoutView.Beans"></app-beans>
      <app-brew-methods *ngSwitchCase="LayoutView.Methods"></app-brew-methods>
      <app-ratings *ngSwitchCase="LayoutView.Ratings"></app-ratings>
    </main>
  `,
  styles: []
})
export class AppComponent {
  LayoutView = LayoutView;
  currentLayoutView$!: Observable<LayoutView>;

  constructor(
    private store: Store,
  ) {}
  ngOnInit(){
    this.currentLayoutView$ = this.store.pipe(select(fromReducer.selectors.layout.getCurrentView));
  }
}
