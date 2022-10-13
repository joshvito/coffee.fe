import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { OptionalRatingDescriptions, OptionalRatingKeys } from 'src/app/models/rating.model';
import { selectors, State } from 'src/app/state/reducers';

@Component({
  selector: 'app-new-rating',
  templateUrl: 'rating-modal.html',
  styles: []
})
export class NewRatingComponent implements OnInit {
  form: FormGroup;
  optionalKeys = OptionalRatingKeys;
  optionalDescriptions = OptionalRatingDescriptions;

  constructor(
    private store: Store<State>,
    fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
    const optionalFields = this.optionalKeys.reduce((accum, key) => {
      return {
        ...accum,
        [key]: fb.control(null, [Validators.max(5), Validators.min(1)])
      };
    }, {});

    this.form = fb.group({
      'brew_id': fb.control(null, [Validators.required]),
      'rating': fb.control(null, [Validators.required, Validators.max(5), Validators.min(1)]),
      'notes': fb.control('', [Validators.max(255)]),
      ...optionalFields
    });
  }

  ngOnInit(): void {
    this.store.pipe(
      select(selectors['brew'].getSelectedBrew),
      filter(r => !!r)
    ).subscribe(b => {
      if(!!b) {this.form.patchValue({'brew_id': b.id})}
    });
  }

  onSave(): void {
    this.activeModal.close(this.form.value);
  }

  onClose(): void {
    this.activeModal.dismiss();
  }

}
