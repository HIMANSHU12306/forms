// name-form.component.ts

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-name-form',
  standalone: true,
  imports: [ ReactiveFormsModule,CommonModule],
  templateUrl: './name-form.component.html',
  styleUrls: ['./name-form.component.css']
})
export class NameFormComponent implements OnInit {
  nameForm: FormGroup | any;
  isFormVisible: boolean | undefined;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.nameForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      address: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  
  }
  toggleFormVisibility() {
    this.isFormVisible = !this.isFormVisible;
  }

   onSubmit() {
    if (this.nameForm.valid) {
      // Your form submission logic goes here
      console.log(this.nameForm.value);
      console.log(alert("you have submitted your form"))
    } else {
      // Mark all fields as touched to display error messages
      this.markFormGroupTouched(this.nameForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (Object as any).values(formGroup.controls).forEach((control: FormGroup<any>) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
