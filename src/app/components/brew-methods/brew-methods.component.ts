import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IBrewMethod, ICreateBrewMethod } from 'src/app/models/brew-method.model';
import { BrewMethodActions } from 'src/app/state/actions';
import { selectors, State } from 'src/app/state/reducers';
import { NewMethodComponent } from './new-method.component';

@Component({
  selector: 'app-brew-methods',
  template: `
  <p *ngIf="!(methods$ | async)?.length">No Brew Methods</p>
  <div class="row gy-3">
    <div class="col-12" *ngFor="let m of (methods$ | async)">
      <div class="card">
        <div class="card-body">
          <p class="card-title">{{ m.type }} ({{m.volume}} {{m.units}})</p>
          <p class="card-text" *ngIf="m.notes"><small>{{ m.notes }}</small></p>
        </div>
      </div>
    </div>
  </div>

  <div class="position-fixed bottom-0 end-0 h1 m-3 rounded-circle align-items-center justify-content-center d-flex shadow-sm"
    style="height: 55px; width: 55px; cursor: pointer">
    <i class="fas fa-plus-circle d-block" (click)="onAdd()"></i>
  </div>

  `,
  styles: [
  ]
})
export class BrewMethodsComponent implements OnInit {
  methods$: Observable<IBrewMethod[]>;
  constructor(
    private store: Store<State>,
    private modalService: NgbModal,
  ) {
    this.methods$ = this.store.pipe(select(selectors['brew-method'].getAllMethods));
  }

  ngOnInit(): void {
    this.store.dispatch(BrewMethodActions.getMany());
  }

  onAdd(): void {
    this.modalService.open(NewMethodComponent).result.then((query: ICreateBrewMethod) => {
      this.store.dispatch(BrewMethodActions.create({query}));
    }, (reason) => {
      console.log('dismissed');
    });
  }

}
