import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-method',
  template: `
    <form [formGroup]="form" class="m-4" (ngSubmit)="onSave()">
      <div class="mb-3">
        <label for="type" class="form-label">Type</label>
        <input type="text" id="type" class="form-control" formControlName="type"
          [class.is-invalid]="form.get('type')?.invalid && form.get('type')?.touched" />
      </div>

      <div class="mb-3">
        <label for="volume" class="form-label">Volume</label>
        <input type="number" id="volume" class="form-control" formControlName="volume"
          [class.is-invalid]="form.get('volume')?.invalid && form.get('volume')?.touched" />
      </div>

      <div class="mb-3">
        <label for="units" class="form-label">Units</label>
        <input type="text" id="units" class="form-control" formControlName="units"
          [class.is-invalid]="form.get('units')?.invalid && form.get('units')?.touched" />
      </div>

      <div class="mb-3">
        <label for="notes" class="form-label">Notes</label>
        <textarea id="notes" class="form-control" formControlName="notes" rows="4" maxlength="255"
          [class.is-invalid]="form.get('notes')?.invalid && form.get('notes')?.touched"></textarea>
      </div>

      <div class="d-grid gap-2">
        <button class="btn btn-primary" [disabled]="form.invalid">Save</button>
        <button type="button" class="btn btn-outline-primary" (click)="onClose()">Close</button>
      </div>
    </form>
  `,
  styles: [
  ]
})
export class NewMethodComponent implements OnInit {
  form: UntypedFormGroup;

  constructor(
    fb: UntypedFormBuilder,
    public activeModal: NgbActiveModal
  ) {
    this.form = fb.group({
      'type': fb.control(null, [Validators.required]),
      'volume': fb.control(null, [Validators.required]),
      'units': fb.control(null, [Validators.required]),
      'notes': fb.control(null, [Validators.max(255)]),
    });
  }

  ngOnInit(): void {
  }

  onSave(): void {
    this.activeModal.close(this.form.value);
  }

  onClose(): void {
    this.activeModal.dismiss();
  }

}
