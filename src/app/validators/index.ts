import {AbstractControl, FormGroup, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';
import { default as RegExMap } from './regExMap';

export type ControlValuePredicate = (control: AbstractControl) => boolean;
export type ControlFormPredicate = (form: FormGroup) => boolean;

export interface ValidationErrorMap {
  [key: string]: ValidationError;
}

export interface ValidationError {
  errorMessage: string;
}

export class CoreFormValidator {
  constructor(public name: string, public predicate: ControlFormPredicate, public errorMessage: string) {}

  public validate = (form: FormGroup): {[key: string]: any} => {
    const isValid =  this.predicate(form);
    const returnValue = !isValid && {[this.name]: {errorMessage: this.errorMessage}} || null;
    return returnValue;
  }
}

export class CoreControlValidator implements Validator {
  constructor(public name: string, public predicate: ControlValuePredicate, public errorMessage: string) {}

  public validate = (c: AbstractControl): ValidationErrors | any => {
    console.log('Validator Name ', this.name, ' Abstract Control ', c);
    const isValid = this.predicate(c);
    const returnValue = !isValid && {[this.name]: {errorMessage: this.errorMessage}} || null;
    return returnValue;
  }
}

export const DefinedPredicate = (): ControlValuePredicate => (c: AbstractControl): boolean => typeof c.value !== 'undefined' && c.value !== null && c.value;
export const RegExPredicate = (pattern: RegExp): ControlValuePredicate => (c: AbstractControl): boolean => !!pattern.exec(c.value);
export const RegExNotRequiredPredicate = (pattern: RegExp): ControlValuePredicate => (c: AbstractControl): boolean => typeof c.value === 'undefined' || c.value === null || c.value === '' || !!pattern.exec(c.value);
export const LengthPredicate = (min: number, max: number): ControlValuePredicate => (c: AbstractControl): boolean => c.value !== null && typeof c.value !== 'undefined' && typeof c.value.length !== 'undefined' && c.value.length >= min && c.value.length <= max;
export const FieldMatchPredicate = (leftFieldName: string, rightFieldName: string): ControlFormPredicate => (form: FormGroup) => {
  const leftValue = form.controls[leftFieldName].value;
  const rightValue = form.controls[rightFieldName].value;
  const returnValue = leftValue === rightValue;
  return returnValue;
};
export const SingleItemRequiredPredicate = (validValue: any, fieldNames: string[]): ControlFormPredicate => (form: FormGroup) => {
  for (let i = 0, length = fieldNames.length; i < length; i++) {
    if (form.controls[fieldNames[i]].value != null && form.controls[fieldNames[i]].value === validValue) {
      return true;
    }
  }

  return false;
};
export const OptionallyRequiredPredicate = (selectedFieldName: string, selectedFieldValue: any, requiredFields: string[]): ControlFormPredicate => (form: FormGroup) => {
  if (form.controls[selectedFieldName].value === selectedFieldValue) {
    for (let i = 0, length = requiredFields.length; i < length; i++) {
      const requiredFieldValue = form.controls[requiredFields[i]].value;
      if (requiredFieldValue === null || requiredFieldValue === '') {
        return false;
      }
    }
  }

  return true;
};
export const LessThanComparisonPredicate = (lessThanFieldName: string, greaterThanFieldName: string): ControlFormPredicate => (form: FormGroup) => {
  let lessThanValue: number;
  let greaterThanValue: number;

  try {
    lessThanValue = parseInt(form.controls[lessThanFieldName].value);
    if (isNaN(lessThanValue)) {
      return true;
    }
  } catch (error) {
    // if parseInt fails then the value is not a number and this validation shouldn't run
    return true;
  }
  try {
    greaterThanValue = parseInt(form.controls[greaterThanFieldName].value);
    if (isNaN(greaterThanValue)) {
      return true;
    }
  } catch (error) {
    return true;
  }

  return lessThanValue <= greaterThanValue;
};
export const SingleItemInArrayPredicate = (): ControlValuePredicate => (c: AbstractControl): boolean => Array.isArray(c.value) && c.value.length >= 1;

export const GeneralValidators = {
  hexColor: new CoreControlValidator('hex', RegExPredicate(RegExMap.hexColor), 'A valid hex color is required.'),
  phone: new CoreControlValidator('phone', RegExPredicate(RegExMap.phone), 'A valid phone number is required.'),
  email: new CoreControlValidator('email', RegExPredicate(RegExMap.email), 'A valid email address is required.'),
  required: new CoreControlValidator('required', DefinedPredicate(), 'Field is required'),
  url: new CoreControlValidator('url', RegExPredicate(RegExMap.url), 'A valid URL is required'),
  urlOrEmail: new CoreControlValidator('urlOrEmail', RegExPredicate(RegExMap.urlOrEmail), 'A valid URL or email address is required.'),
  singleItemInArray: new CoreControlValidator('required', SingleItemInArrayPredicate(), 'A single item is required'),
  numeric: new CoreControlValidator('numeric', RegExNotRequiredPredicate(RegExMap.numeric), 'Field must be numeric'),
  decimal: new CoreControlValidator('decimal', RegExNotRequiredPredicate(RegExMap.decimal), 'Field must be decimal')
};

export const PasswordValidators = {
  match: new CoreFormValidator('match', FieldMatchPredicate('newPassword', 'confirmPassword'), 'Both passwords must match.'),
  length: new CoreControlValidator('length', LengthPredicate(8, 24), 'Password must be between 8 and 32 characters long.'),
  lowercase: new CoreControlValidator('lowercase', RegExPredicate(RegExMap.twoLowerCase), '2 lowercase letters required.'),
  uppercase: new CoreControlValidator('uppercase', RegExPredicate(RegExMap.twoUpperCase), '2 uppercase letters required.'),
  numerals: new CoreControlValidator('numerals', RegExPredicate(RegExMap.twoNumerals), '2 numerals required.'),
  special: new CoreControlValidator('special', RegExPredicate(RegExMap.twoSpecial), '2 special characters required.')
};
