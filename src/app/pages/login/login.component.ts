import { Component, OnInit } from '@angular/core';
import { FormPageBaseComponent } from '../form.page.base.component';
import { FormControl } from '@angular/forms';
import { GeneralValidators } from '../../validators';
import { Router } from '@angular/router';
import { AuthResponse, AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormPageBaseComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {
    super();
  }

  ngOnInit() {
    this.setFormGroup({
      username: new FormControl(null, [GeneralValidators.required.validate]),
      password: new FormControl(null, [GeneralValidators.required.validate])
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const username = this.form.get('username').value;
      const password = this.form.get('password').value;

      this.authService.login(username, password)
        .subscribe(this.handleSuccess, this.handleFailure, () => {});
    }
  }

  handleSuccess = (response: AuthResponse) => {
    if (this.authService.isAdmin()) {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  handleFailure = (error: HttpErrorResponse) => {
    console.error(error.error);
  }
}
