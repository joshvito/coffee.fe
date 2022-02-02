import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICoffeeBean, ICreateBean, Roast } from 'src/app/models/bean.model';
import { CoffeeBeanActions } from 'src/app/state/actions';
import { selectors, State } from 'src/app/state/reducers';
import { NewBeanComponent } from './new-bean.component';

@Component({
  selector: 'app-beans',
  template: `
  <p *ngIf="!(beans$ | async)?.length">No Beans</p>
  <div class="row gy-3">
    <div class="col-12" *ngFor="let b of (beans$ | async)">
      <div class="card">
        <div class="card-body">
          <p class="card-title">{{ b.origin }} ({{Roast[b.roast]}})</p>
          <p class="card-text" *ngIf="b.notes"><small>{{ b.notes }}</small></p>
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
export class BeansComponent implements OnInit {
  beans$: Observable<ICoffeeBean[]>;
  Roast = Roast;
  constructor(
    private store: Store<State>,
    private modalService: NgbModal,
  ) {
    this.beans$ = this.store.pipe(select(selectors.beans.getAllBeans));
  }

  ngOnInit(): void {
    this.store.dispatch(CoffeeBeanActions.getMany());
  }

  onAdd(): void {
    this.modalService.open(NewBeanComponent).result.then((query: ICreateBean) => {
      this.store.dispatch(CoffeeBeanActions.create({query}));
    }, (reason) => {
      console.log('dismissed');
    });
  }

}
