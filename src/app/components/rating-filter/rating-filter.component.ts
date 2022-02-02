import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, tap } from 'rxjs';
import { ICoffeeBean, Roast } from 'src/app/models/bean.model';
import { IBrewMethod } from 'src/app/models/brew-method.model';
import { BrewRatingActions } from 'src/app/state/actions';
import { selectors, State } from 'src/app/state/reducers';

@Component({
  selector: 'app-rating-filter',
  template: `
  <form [formGroup]="form" (submit)="onSubmit()">
    <div class="modal-body">
      <div *ngIf="beans" formGroupName="beans" class="mb-3">
        <p>Bean:</p>
        <div class="form-check" *ngFor="let b of (beans$ | async); let i = index">
          <input class="form-check-input" type="checkbox" [id]="'bean' + b.id" [formControlName]="b.id">
          <label class="form-check-label" [for]="'bean' + b.id">
            {{ b.origin }} (<em>{{ Roast[b.roast] | sentenceCase }} Roast</em>)
          </label>
        </div>
      </div>
      <div *ngIf="methods" formGroupName="methods" class="mb-3">
        <p>Method:</p>
        <div class="form-check" *ngFor="let m of (methods$ | async); let i = index">
          <input class="form-check-input" type="checkbox" [id]="'method' + m.id" [formControlName]="m.id">
          <label class="form-check-label" [for]="'method' + m.id">
            {{ m.type }} (<em>{{ m.volume }} {{ m.units }}</em>)
          </label>
        </div>
      </div>

      <div class="d-grid gap-2">
        <button class="btn btn-primary" [disabled]="form.invalid">Save</button>
        <button type="button" class="btn btn-outline-primary" (click)="onClose()">Close</button>
      </div>
    </div>
  </form>
  `,
  styles: [
  ]
})
export class RatingFilterComponent implements OnInit {
  methods$: Observable<IBrewMethod[]>;
  beans$: Observable<ICoffeeBean[]>;
  form: FormGroup;
  Roast = Roast;

  constructor(
    public activeModal: NgbActiveModal,
    private store: Store<State>,
    private fb: FormBuilder
  ) {
    this.methods$ = this.store.select(selectors['brew-method'].getAllMethods);
    this.beans$ = this.store.select(selectors['beans'].getAllBeans);
    this.form = this.fb.group({
      'methods': this.fb.group([]),
      'beans': this.fb.group({}),
    });
  }

  ngOnInit(): void {
    combineLatest(
      [this.beans$, this.methods$, this.store.select(selectors['brew-rating'].getFilters)]
    ).pipe(
      tap(([b, m, f]) => {
        b.reduce((a, v) => {
          a.addControl(v.id.toString(), this.fb.control(f?.beans[v.id]))
          return a;
        }, this.beans);
        m.reduce((a, v) => {
          a.addControl(v.id.toString(), this.fb.control(f?.methods[v.id]))
          return a;
        }, this.methods);
      })
    ).subscribe();
  }

  get beans() {
    return this.form.get('beans') as FormGroup
  }

  get methods() {
    return this.form.get('methods') as FormGroup
  }

  onSubmit(): void {
    const filters = this.form.value;
    this.store.dispatch(BrewRatingActions.storeFilters({filters}));
    this.store.dispatch(BrewRatingActions.getMany({filters}));
    this.activeModal.close();
  }

  onClose(): void {
    this.activeModal.dismiss();
  }

}
