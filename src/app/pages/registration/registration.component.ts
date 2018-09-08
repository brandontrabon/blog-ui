import { Component, OnInit } from '@angular/core';
import { FormPageBaseComponent } from '../form.page.base.component';
import { FormControl } from '@angular/forms';
import { CoreFormValidator, FieldMatchPredicate, GeneralValidators, PasswordValidators } from '../../validators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent extends FormPageBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    const passwordEqualValidator = new CoreFormValidator('passwordNotEqual',
      FieldMatchPredicate('password', 'verifyPassword'), 'Password must be equal');

    this.setFormGroup({
      firstName: new FormControl(null, [GeneralValidators.required.validate]),
      lastName: new FormControl(null, [GeneralValidators.required.validate]),
      phoneNumber: new FormControl(null, [GeneralValidators.required.validate]),
      email: new FormControl(null, [
        GeneralValidators.required.validate,
        GeneralValidators.email.validate
      ]),
      username: new FormControl(null, [GeneralValidators.required.validate]),
      password: new FormControl(null, [
        GeneralValidators.required.validate,
        PasswordValidators.lowercase.validate,
        PasswordValidators.uppercase.validate,
        PasswordValidators.numerals.validate,
        PasswordValidators.special.validate,
        PasswordValidators.length.validate
      ]),
      verifyPassword: new FormControl(null, [GeneralValidators.required.validate])
    }, [passwordEqualValidator]);
  }

}
