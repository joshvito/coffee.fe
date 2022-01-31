import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BrewRatingActions } from 'src/app/state/actions';
import { State } from 'src/app/state/reducers';

@Component({
  selector: 'app-ratings',
  template: `
    <form [formGroup]="form">
      <div class="mb-3">
        <label for="flavor" class="form-label">Flavor</label>
        <select id="flavor" class="form-control" formControlName="flavor"
          [class.is-invalid]="form.get('flavor')?.invalid && form.get('flavor')?.touched">
        </select>
      </div>

      <div class="mb-3">
        <label for="aroma" class="form-label">Aroma</label>
        <select id="aroma" class="form-control" formControlName="aroma"
          [class.is-invalid]="form.get('aroma')?.invalid && form.get('aroma')?.touched">
        </select>
      </div>

      <div class="mb-3">
        <label for="grams" class="form-label">Grams</label>
        <input type="number" id="grams" class="form-control" formControlName="grams"
          [class.is-invalid]="form.get('grams')?.invalid && form.get('grams')?.touched" />
      </div>

      <div class="mb-3">
        <label for="notes" class="form-label">Notes</label>
        <textarea id="notes" class="form-control" formControlName="notes" rows="4"
          [class.is-invalid]="form.get('notes')?.invalid && form.get('notes')?.touched"></textarea>
      </div>

      <div class="d-grid">
        <button class="btn btn-primary" [disabled]="form.invalid">Save</button>
      </div>
    </form>
  `,
  styles: [
  ]
})
export class RatingsComponent implements OnInit {
  form: FormGroup;

  constructor(
    private store: Store<State>,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      'flavor': fb.control('', [Validators.required]),
      'aroma': fb.control('', [Validators.required]),
      'grams': fb.control('', [Validators.required]),
      'notes': fb.control(''),
    });
  }

  ngOnInit(): void {
    this.store.dispatch(BrewRatingActions.getMany());
  }

}
