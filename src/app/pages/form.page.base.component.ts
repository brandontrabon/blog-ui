import {Component} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import { getErrors } from '../validators/validationErrorParser';

export interface VisibilityFields {
  [key: string]: boolean;
}

@Component({
  selector: 'app-form-page-base',
  template: ''
})
export class FormPageBaseComponent {
  form: FormGroup;
  fields: VisibilityFields;

  setFormGroup(group: {[key: string]: AbstractControl}, validators?: any[]) {
    this.form = new FormGroup(group, validators);
  }

  setVisibilityFields(fields: VisibilityFields) {
    this.fields = fields;
  }

  getControlErrors(control: AbstractControl) {
    return getErrors(false, control);
  }
}
