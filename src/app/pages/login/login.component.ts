import { Component, OnInit } from '@angular/core';
import { FormPageBaseComponent } from '../form.page.base.component';
import { FormControl } from '@angular/forms';
import { GeneralValidators } from '../../validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormPageBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    this.setFormGroup({
      username: new FormControl(null, [GeneralValidators.required.validate]),
      password: new FormControl(null, [GeneralValidators.required.validate])
    });
  }

}
