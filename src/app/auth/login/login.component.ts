import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(private fb: FormBuilder, private router: Router) {
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

    submit(): void {
        this.router.navigate(['/app/home']);
    }
}
