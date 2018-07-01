import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {}

  private createForm(): void {
    this.loginForm = this.fb.group({
      Mobile: [null, Validators.required],
      Password: [null, Validators.required],
      Remember: [true]
    });
  }
}
