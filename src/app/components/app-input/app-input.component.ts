import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { getErrors } from '../../validators/validationErrorParser';

@Component({
  selector: 'app-input',
  templateUrl: './app-input.component.html',
  styleUrls: ['./app-input.component.scss']
})
export class AppInputComponent implements OnInit {
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() control?: AbstractControl = null;
  @Input() showParentErrors = false;

  constructor() { }

  ngOnInit() {
  }

  errorMessages() {
    return getErrors(this.showParentErrors, this.control);
  }
}
