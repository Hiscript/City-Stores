import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginModel } from '../classes/loginModel';
import { TokenService } from '../../global/token.service';

@Component({
    templateUrl: './login.component.html',
    providers: [AuthService]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loginModel: LoginModel;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private tokenService: TokenService
    ) {
        this.createForm();
    }

    ngOnInit() {
        this.tokenService.logout();
    }

    private createForm(): void {
        this.loginForm = this.fb.group({
            Mobile: [null, Validators.required],
            Password: [null, Validators.required],
            Remember: [true]
        });
    }

    updateModel() {
        const formModel = this.loginForm.getRawValue();
        this.loginModel = new LoginModel();
        this.loginModel.Mobile = formModel.Mobile;
        this.loginModel.Password = formModel.Password;
        this.loginModel.Remember = formModel.Remember;
    }

    submit(): void {
        if (this.loginForm.valid) {
            this.updateModel();
            this.authService.login(this.loginModel).subscribe(tokens => {
                if (tokens.length == 1) {
                    this.tokenService.setToken(tokens[0].token, this.loginModel.Remember);
                    this.router.navigate(['/app/home']);
                }
            });
        }
    }
}
