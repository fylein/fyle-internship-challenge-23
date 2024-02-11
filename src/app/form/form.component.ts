import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})

export class FormComponent {
  usernameForm = new FormGroup({
    username: new FormControl('', Validators.required),
  });

  @Output() searchUser = new EventEmitter<string>();

  onSubmit() {
    if (this.usernameForm.valid) {
      this.searchUser.emit(this.usernameForm.value.username!);
    }
  }
}