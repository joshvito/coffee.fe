import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LayoutView } from 'src/app/models/layout.model';
import { LayoutActions } from 'src/app/state/actions';
import * as fromReducer from '../../state/reducers';

@Component({
  selector: 'app-nav',
  template: `
    <nav class="navbar navbar-light bg-light fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"><i class="fas fa-coffee"></i> Coffee Friends</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Coffee Friends</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item" *ngFor="let view of [LayoutView.Ratings, LayoutView.Beans, LayoutView.Methods]">
                <a class="nav-link" [class.active]="(currentLayoutView$ | async) === view"
                aria-current="page" data-bs-dismiss="offcanvas" (click)="onViewChange(view)">{{LayoutView[view]}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [
  ]
})
export class NavComponent implements OnInit {
  LayoutView = LayoutView;
  currentLayoutView$!: Observable<LayoutView>;
  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.currentLayoutView$ = this.store.pipe(select(fromReducer.selectors.layout.getCurrentView));
  }

  onViewChange(view: LayoutView) {
    this.store.dispatch(LayoutActions.change({view}));
  }
}
