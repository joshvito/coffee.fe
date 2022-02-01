import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICoffeeBean, Roast } from 'src/app/models/bean.model';
import { IBrewMethod } from 'src/app/models/brew-method.model';
import { Aroma, Flavor } from 'src/app/models/brew-ratings.model';
import { BrewMethodActions, CoffeeBeanActions } from 'src/app/state/actions';
import { selectors, State } from 'src/app/state/reducers';

@Component({
  selector: 'app-new-rating',
  template: `
    <form [formGroup]="form" class="m-4" (ngSubmit)="onSave()">
      <div class="mb-3">
        <label for="bean_id" class="form-label">Bean</label>
        <select id="bean_id" class="form-control" formControlName="bean_id"
          [class.is-invalid]="form.get('bean_id')?.invalid && form.get('bean_id')?.touched">
          <option></option>
          <option *ngFor="let bean of (beans$ | async)" [ngValue]="bean.id">{{ bean.origin }} ({{ Roast[bean.roast] }} Roast)</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="method_id" class="form-label">Method</label>
        <select id="method_id" class="form-control" formControlName="method_id"
          [class.is-invalid]="form.get('method_id')?.invalid && form.get('method_id')?.touched">
          <option></option>
          <option *ngFor="let method of (methods$ | async)" [ngValue]="method.id">{{ method.type }}</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="flavor" class="form-label">Flavor</label>
        <select id="flavor" class="form-control" formControlName="flavor"
          [class.is-invalid]="form.get('flavor')?.invalid && form.get('flavor')?.touched">
          <option></option>
          <option *ngFor="let kvp of (Flavor | enumToArray)" [ngValue]="kvp.key">{{ kvp.value | sentenceCase }}</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="aroma" class="form-label">Aroma</label>
        <select id="aroma" class="form-control" formControlName="aroma"
          [class.is-invalid]="form.get('aroma')?.invalid && form.get('aroma')?.touched">
          <option></option>
          <option *ngFor="let kvp of (Aroma | enumToArray)" [ngValue]="kvp.key">{{ kvp.value | sentenceCase }}</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="grams" class="form-label">Grams</label>
        <input type="number" id="grams" class="form-control" formControlName="grams"
          [class.is-invalid]="form.get('grams')?.invalid && form.get('grams')?.touched" />
      </div>

      <div class="mb-3">
        <label for="notes" class="form-label">Notes</label>
        <textarea id="notes" class="form-control" formControlName="notes" rows="4" maxlength="255"
          [class.is-invalid]="form.get('notes')?.invalid && form.get('notes')?.touched"></textarea>
      </div>

      <div class="d-grid gap-2">
        <button class="btn btn-primary" [disabled]="form.invalid">Save</button>
        <button class="btn btn-outline-primary" (click)="onClose()">Close</button>
      </div>
    </form>
  `,
  styles: [
  ]
})
export class NewRatingComponent implements OnInit {
  form: FormGroup;
  Aroma = Aroma;
  Flavor = Flavor;
  Roast = Roast;
  methods$: Observable<IBrewMethod[]>;
  beans$: Observable<ICoffeeBean[]>;

  constructor(
    private store: Store<State>,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
    this.form = fb.group({
      'bean_id': fb.control(null, [Validators.required]),
      'method_id': fb.control(null, [Validators.required]),
      'flavor': fb.control(null, [Validators.required]),
      'aroma': fb.control(null, [Validators.required]),
      'grams': fb.control(null, [Validators.required]),
      'notes': fb.control('', [Validators.max(255)]),
    });
    this.methods$ = this.store.select(selectors['brew-method'].getAllMethods);
    this.beans$ = this.store.select(selectors['beans'].getAllBeans);
  }

  ngOnInit(): void {
    this.store.dispatch(BrewMethodActions.getMany());
    this.store.dispatch(CoffeeBeanActions.getMany());
  }

  onSave(): void {
    this.activeModal.close(this.form.value);
  }

  onClose(): void {
    this.activeModal.dismiss();
  }

}
