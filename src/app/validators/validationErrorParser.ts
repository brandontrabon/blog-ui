import { AbstractControl } from '@angular/forms';
import * as _ from 'lodash';

export interface ValidationErrorMap {
  [key: string]: ValidationError;
}

export interface ValidationError {
  errorMessage: string;
}

// Converts control error maps (and parent error maps if opted) into a flat string array.
export function getErrors(showParentErrors: boolean, control?: AbstractControl): string[] {
  let returnValue = [];

  if (control && control.touched) {
    _.values(control.errors).map((value: ValidationError) => value.errorMessage).forEach(item => returnValue.push(item));

    if (showParentErrors) {
      const controlParentErrors = [];

      // if no errorKeys are defined then take them all
      _.values(control.parent.errors)
        .map((value: ValidationError) => value.errorMessage)
        .forEach(item => controlParentErrors.push(item));

      returnValue = _.concat(returnValue, controlParentErrors);
    }
  }

  return returnValue;
}
