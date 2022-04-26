import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { BrewMethodActions, CoffeeBeanActions } from 'src/app/state/actions';
import { selectors, State } from 'src/app/state/reducers';

@Component({
  selector: 'app-edit-rating',
  templateUrl: 'rating-modal.html',
  styles: []
})
export class EditRatingComponent implements OnInit {
  form: FormGroup;

  constructor(
    private store: Store<State>,
    fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
    this.form = fb.group({
      'brew_id': fb.control(null, [Validators.required]),
      'aroma': fb.control(null, [Validators.required, Validators.max(5), Validators.min(1)]),
      'flavor': fb.control(null, [Validators.required, Validators.max(5), Validators.min(1)]),
      'notes': fb.control('', [Validators.max(255)]),
      'id': fb.control(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.store.pipe(
      select(selectors['brew'].getSelectedRating),
      filter(r => !!r)
    ).subscribe(r => {
      if(!!r) {this.form.patchValue(r);}
    });
  }

  onSave(): void {
    this.activeModal.close(this.form.value);
  }

  onClose(): void {
    this.activeModal.dismiss();
  }

}
