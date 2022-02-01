import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { ICoffeeBean, Roast } from 'src/app/models/bean.model';
import { IBrewMethod } from 'src/app/models/brew-method.model';
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
    this.beans$.pipe(
      tap(b => {
        b.reduce((a, v) => {
          a.addControl(v.id.toString(), this.fb.control(false))
          return a;
        }, this.beans);
      })
    ).subscribe();

    this.methods$.pipe(
      tap(m => {
        m.reduce((a, v) => {
          a.addControl(v.id.toString(), this.fb.control(false))
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
    console.log(this.form.value);
  }

  onClose(): void {
    this.activeModal.dismiss();
  }

}
