import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
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
