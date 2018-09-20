import { Component, OnInit } from '@angular/core';
import { FormPageBaseComponent } from '../form.page.base.component';
import { FormControl } from '@angular/forms';
import { CoreFormValidator, FieldMatchPredicate, GeneralValidators, PasswordValidators } from '../../validators';
import {AuthService, UserResponse} from "../../services/auth.service";
import { Router } from '@angular/router';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent extends FormPageBaseComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {
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

  onSubmit() {
    if (this.form.valid) {
      const data = {
        firstname: this.form.get('firstName').value,
        lastname: this.form.get('lastName').value,
        phonenumber: this.form.get('phoneNumber').value,
        email: this.form.get('email').value,
        username: this.form.get('username').value,
        password: this.form.get('password').value
      };
      console.log('user ', data);

      this.authService.registerUser(data)
        .subscribe(this.handleSuccess, this.handleFailure);
    }
  }

  handleSuccess = (response: UserResponse) => {
    this.router.navigate(['/login']);
  }

  handleFailure = (error: HttpErrorResponse) => {
    console.error(error.error);
  }
}
